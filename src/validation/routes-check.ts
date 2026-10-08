/**
 * Bilingual route validation of the built site (scaffold plan §15; decisions 0002, 0021).
 * Runs in CI after the verification build. Rules:
 *  R1 every /hi/ page has an /en/ counterpart at the same path, and vice versa (page or notice page)
 *  R2 <html lang> matches the path prefix
 *  R3 canonical: indexable pages point to themselves; notice pages have none and are noindex
 *  R4 hreflang: none, or exactly hi + en + x-default; reciprocal; x-default = the Hindi URL; never a notice page
 *  R5 sitemaps: listed URLs exist, match the sitemap language, exclude notice pages; indexable pages are listed
 *  R6 `/` redirects to /hi/ without scripts
 *  R7 language switch: exactly one link (translate="no") to the same path in the other language
 *  R8 no language detection or stored preference (navigator.language, cookies, localStorage)
 */
import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { basePathOf } from '../lib/env.ts';

export interface RouteIssue {
  rule: string;
  message: string;
  where?: string;
}

async function walk(dir: string, out: string[] = []): Promise<string[]> {
  for (const d of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, d.name);
    if (d.isDirectory()) await walk(p, out);
    else out.push(p);
  }
  return out;
}

const urlOf = (root: string, file: string) =>
  ('/' + relative(root, file).split(sep).join('/')).replace(/index\.html$/, '');
const attr = (tag: string, name: string) => new RegExp(`\\s${name}="([^"]*)"`).exec(tag)?.[1];
const tags = (html: string, re: RegExp) => [...html.matchAll(re)].map((m) => m[0]);

/**
 * @param production  true for production-rules output. Outside production every page is noindex by
 *                    design (0013), so sitemap/noindex consistency is only enforced for production.
 */
export async function checkRoutes(distDir: string, siteUrl: string, production: boolean): Promise<RouteIssue[]> {
  const issues: RouteIssue[] = [];
  // Links are emitted with the base path (sub-path hosting); output files and route paths are not.
  const base = basePathOf(siteUrl);
  const add = (rule: string, message: string, where?: string) =>
    issues.push(where === undefined ? { rule, message } : { rule, message, where });

  const files = await walk(distDir);
  const pages = new Map<string, string>();
  for (const f of files.filter((f) => f.endsWith('index.html')))
    pages.set(urlOf(distDir, f), await readFile(f, 'utf8'));
  const isNotice = (html: string) => html.includes('data-notice-page');
  const noindex = (html: string) => /<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html);

  for (const [url, html] of pages) {
    const m = /^\/(hi|en)\//.exec(url);
    if (!m) continue;
    const lang = m[1] as 'hi' | 'en';
    const other = lang === 'hi' ? 'en' : 'hi';
    const counterpart = `/${other}/${url.slice(4)}`;

    // R1
    if (!pages.has(counterpart)) add('R1', `No ${other} counterpart (${counterpart}).`, url);
    // R2
    const htmlLang = /<html[^>]*\slang="([^"]+)"/.exec(html)?.[1];
    if (htmlLang !== lang) add('R2', `<html lang="${htmlLang}"> does not match /${lang}/.`, url);
    // R3
    const canon = tags(html, /<link\s+rel="canonical"[^>]*>/g);
    if (isNotice(html)) {
      if (canon.length) add('R3', 'Notice page has a canonical link.', url);
      if (!noindex(html)) add('R3', 'Notice page is not noindex.', url);
    } else if (canon.length !== 1 || attr(canon[0] ?? '', 'href') !== siteUrl + url) {
      add('R3', `Canonical must be ${siteUrl + url}.`, url);
    }
    // R4
    const alts = tags(html, /<link\s+rel="alternate"\s+hreflang="[^"]+"[^>]*>/g).map((t) => ({
      hreflang: attr(t, 'hreflang') ?? '',
      href: attr(t, 'href') ?? '',
    }));
    if (alts.length) {
      const set = alts
        .map((a) => a.hreflang)
        .sort()
        .join(',');
      if (set !== 'en,hi,x-default') add('R4', `hreflang set is "${set}", expected en,hi,x-default.`, url);
      const hi = alts.find((a) => a.hreflang === 'hi')?.href;
      const xd = alts.find((a) => a.hreflang === 'x-default')?.href;
      if (xd !== hi) add('R4', 'x-default must equal the Hindi URL.', url);
      for (const a of alts) {
        const target = a.href.replace(siteUrl, '');
        const t = pages.get(target);
        if (!t) add('R4', `hreflang target ${target} does not exist.`, url);
        else if (isNotice(t)) add('R4', `hreflang target ${target} is a notice page.`, url);
        else if (!t.includes(`href="${siteUrl + url}"`)) add('R4', `hreflang not reciprocal from ${target}.`, url);
      }
      if (isNotice(html)) add('R4', 'Notice page carries hreflang.', url);
    }
    // R7
    const switches = tags(html, /<a\s[^>]*translate="no"[^>]*>/g);
    if (switches.length !== 1) add('R7', `Expected one language switch, found ${switches.length}.`, url);
    else {
      const s = switches[0] ?? '';
      if (attr(s, 'href') !== base + counterpart || attr(s, 'hreflang') !== other || attr(s, 'lang') !== other) {
        add('R7', `Language switch must link to ${base + counterpart} (hreflang/lang "${other}").`, url);
      }
    }
  }

  // R5
  const sitemapLangs: Array<'hi' | 'en'> = ['hi', 'en'];
  const index = existsSync(join(distDir, 'sitemap-index.xml'))
    ? await readFile(join(distDir, 'sitemap-index.xml'), 'utf8')
    : '';
  for (const l of sitemapLangs) {
    if (!index.includes(`${siteUrl}/sitemap-${l}.xml`)) add('R5', `Sitemap index does not list sitemap-${l}.xml.`);
    const file = join(distDir, `sitemap-${l}.xml`);
    if (!existsSync(file)) {
      add('R5', `sitemap-${l}.xml missing.`);
      continue;
    }
    const xml = await readFile(file, 'utf8');
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => (m[1] ?? '').replace(siteUrl, ''));
    for (const loc of locs) {
      const html = pages.get(loc);
      if (!loc.startsWith(`/${l}/`)) add('R5', `URL ${loc} in sitemap-${l}.xml has the wrong language.`);
      if (!html) add('R5', `Sitemap URL ${loc} does not exist.`);
      else if (isNotice(html) || (production && noindex(html)))
        add('R5', `Sitemap lists a noindex/notice page ${loc}.`);
    }
    for (const [url, html] of pages) {
      if (url.startsWith(`/${l}/`) && !isNotice(html) && !(production && noindex(html)) && !locs.includes(url)) {
        add('R5', `Indexable page ${url} missing from sitemap-${l}.xml.`);
      }
    }
  }

  // R6
  const root = pages.get('/');
  if (!root) add('R6', 'Root page missing.');
  else {
    const redirect = new RegExp(`http-equiv="refresh"\\s+content="0;\\s*url=${base}/hi/"`);
    if (!redirect.test(root)) add('R6', `\`/\` must redirect to ${base}/hi/.`);
    if (/<script/i.test(root)) add('R6', '`/` must not run scripts (no language detection).');
  }

  // R8
  for (const f of files.filter((f) => /\.(html|js)$/.test(f))) {
    const text = await readFile(f, 'utf8');
    if (/navigator\.languages?\b|localStorage|sessionStorage|document\.cookie/.test(text)) {
      add('R8', 'Language detection or stored preference found.', urlOf(distDir, f));
    }
  }
  return issues;
}
