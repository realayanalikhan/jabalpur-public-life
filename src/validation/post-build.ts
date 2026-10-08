/**
 * Output-level integrity checks on the generated site (scaffold plan §6, "P" checks):
 * I2 fixtures, I7 GPS in output images, I10 unpublished/preview leaks, I11 internal leaks,
 * I14 glossary markers, I18 notice pages, I19 hidden sections, I20 internal links.
 */
import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import exifr from 'exifr';
import type { BuildEnv } from '../lib/env.ts';
import type { SiteConfig } from '../../site.config.ts';
import type { Issue, Outcome } from './types.ts';
import { severityFor } from './types.ts';
import { MISSING_MARK } from '../i18n/glossary.ts';
import type { IntegrityManifest } from './manifest.ts';

export const PREVIEW_MARKER = 'data-preview-only';
export const NOTICE_MARKER = 'data-notice-page';
export const DEV_MARKER = '[DEV]';

async function walk(dir: string, out: string[] = []): Promise<string[]> {
  for (const d of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, d.name);
    if (d.isDirectory()) await walk(p, out);
    else out.push(p);
  }
  return out;
}

const toSitePath = (root: string, file: string) => '/' + relative(root, file).split(sep).join('/');
const pageUrl = (sitePath: string) => sitePath.replace(/index\.html$/, '');
const hasNoindex = (html: string) => /<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html);

export async function runPostBuildChecks(
  distDir: string,
  env: BuildEnv,
  config: SiteConfig,
  manifest: IntegrityManifest,
): Promise<Issue[]> {
  const issues: Issue[] = [];
  const add = (
    check: Issue['check'],
    o: { production: Outcome; preview: Outcome; local: Outcome },
    message: string,
    where?: string,
  ) => {
    const severity = severityFor(env, config, o);
    if (severity) issues.push(where === undefined ? { check, severity, message } : { check, severity, message, where });
  };

  const files = await walk(distDir);
  const textFiles = files.filter((f) => /\.(html|xml|txt|json|js|css)$/i.test(f));
  const images = files.filter((f) => /\.(jpe?g|png|webp|avif|tiff?|heic)$/i.test(f));
  const htmlPages = new Map<string, string>();
  const sitemaps: string[] = [];

  for (const f of textFiles) {
    const text = await readFile(f, 'utf8');
    const path = toSitePath(distDir, f);
    if (f.endsWith('.html')) htmlPages.set(path, text);
    if (/sitemap.*\.xml$/.test(f)) sitemaps.push(text);

    // I2 — no fixture data in preview/production output.
    if (text.includes(DEV_MARKER))
      add('I2', { production: 'F', preview: 'F', local: '-' }, 'Development fixture text in output.', path);
    // I14 — no missing-glossary markers in production output.
    if (text.includes(MISSING_MARK))
      add('I14', { production: 'F', preview: 'W', local: 'W' }, 'Missing glossary text in output.', path);
    // I10 — production: no non-published content and no preview-only behaviour.
    if (env.siteEnv === 'production') {
      if (text.includes(PREVIEW_MARKER))
        add('I10', { production: 'F', preview: '-', local: '-' }, 'Preview-only marker in production output.', path);
      for (const m of manifest.nonPublishedMarkers) {
        if (text.includes(m))
          add('I10', { production: 'F', preview: '-', local: '-' }, `Unpublished content leaked: "${m}".`, path);
      }
    }
    // I11 — internal notes and internal sources never rendered.
    for (const s of manifest.internalStrings) {
      if (text.includes(s))
        add('I11', { production: 'F', preview: 'F', local: 'W' }, 'Internal note or internal source leaked.', path);
    }
    // I20 — under a base path, root-relative asset references (src/srcset/poster attributes, CSS
    // url()) must stay inside it, like links (checked per page below).
    if (env.basePath && /\.(html|css)$/i.test(f)) {
      const refs = [
        ...[...text.matchAll(/\s(?:src|srcset|poster)="(\/[^"]*)"/g)].map((m) => m[1] ?? ''),
        ...[...text.matchAll(/url\(\s*['"]?(\/[^'")]*)/g)].map((m) => m[1] ?? ''),
      ];
      for (const ref of refs) {
        if (!ref.startsWith('//') && !ref.startsWith(env.basePath + '/'))
          add('I20', { production: 'F', preview: 'F', local: 'W' }, `Asset path outside the base path "${ref}".`, path);
      }
    }
  }

  for (const [path, html] of htmlPages) {
    const url = pageUrl(path);
    const isNotice = html.includes(NOTICE_MARKER);
    // I10 — production pages carry no noindex except notice pages.
    if (env.siteEnv === 'production' && !isNotice && hasNoindex(html) && path !== '/index.html') {
      add(
        'I10',
        { production: 'F', preview: '-', local: '-' },
        'Preview noindex policy present in production page.',
        path,
      );
    }
    // I18 — notice pages are noindex.
    if (isNotice && !hasNoindex(html))
      add('I18', { production: 'F', preview: 'F', local: 'W' }, 'Notice page is not noindex.', path);

    // I20 — internal links resolve.
    for (const m of html.matchAll(/\shref="([^"]+)"/g)) {
      let href = m[1] ?? '';
      if (href.startsWith(env.siteUrl)) href = href.slice(env.siteUrl.length) || '/';
      else if (env.basePath && href.startsWith('/') && !href.startsWith('//')) {
        // Under a base path, a root-relative link outside it leaves the site.
        if (!href.startsWith(env.basePath + '/')) {
          add('I20', { production: 'F', preview: 'F', local: 'W' }, `Link outside the base path "${href}".`, path);
          continue;
        }
        href = href.slice(env.basePath.length);
      }
      if (!href.startsWith('/') || href.startsWith('//')) continue;
      const clean = decodeURI(href.split(/[?#]/)[0] ?? '');
      const target = clean.endsWith('/') ? join(distDir, clean, 'index.html') : join(distDir, clean);
      if (!existsSync(target))
        add('I20', { production: 'F', preview: 'F', local: 'W' }, `Broken internal link "${href}".`, path);
    }
    // I18 — notice pages are never hreflang targets.
    for (const m of html.matchAll(/<link\s+rel="alternate"\s+hreflang="[^"]+"\s+href="([^"]+)"/g)) {
      const target = (m[1] ?? '').replace(env.siteUrl, '');
      if (manifest.noticePaths.includes(target))
        add('I18', { production: 'F', preview: 'F', local: 'W' }, `hreflang points to notice page ${target}.`, url);
    }
  }

  // I18 — notice pages never in sitemaps.
  for (const notice of manifest.noticePaths) {
    if (sitemaps.some((s) => s.includes(`${env.siteUrl}${notice}<`)))
      add('I18', { production: 'F', preview: 'F', local: 'W' }, 'Notice page listed in a sitemap.', notice);
  }

  // I19 — hidden sections are not generated or linked.
  for (const hidden of manifest.hiddenSectionPaths) {
    for (const [path, html] of htmlPages) {
      if (pageUrl(path).startsWith(hidden))
        add(
          'I19',
          { production: 'F', preview: 'W', local: '-' },
          `Page generated inside hidden section ${hidden}.`,
          path,
        );
      if (html.includes(`href="${env.basePath}${hidden}`) || html.includes(`href="${env.siteUrl}${hidden}`)) {
        add('I19', { production: 'F', preview: 'W', local: '-' }, `Link to hidden section ${hidden}.`, path);
      }
    }
  }

  // I7 — no GPS metadata in output images.
  for (const img of images) {
    if (await hasGps(img))
      add(
        'I7',
        { production: 'F', preview: 'F', local: 'F' },
        'Output image contains GPS metadata.',
        toSitePath(distDir, img),
      );
  }

  // I14 — glossary problems recorded while rendering.
  for (const g of manifest.glossaryIssues) {
    add('I14', { production: 'B', preview: 'W', local: 'W' }, `Glossary "${g.key}" (${g.lang}): ${g.reason}.`);
  }
  return issues;
}

export async function hasGps(file: string): Promise<boolean> {
  try {
    const gps = await exifr.gps(file);
    return Boolean(gps && (gps.latitude !== undefined || gps.longitude !== undefined));
  } catch {
    return false;
  }
}
