import { afterEach, describe, expect, it } from 'vitest';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { basePathOf, readBuildEnv, withBase } from '../../src/lib/env.ts';
import { runPostBuildChecks } from '../../src/validation/post-build.ts';
import { checkRoutes } from '../../src/validation/routes-check.ts';
import type { IntegrityManifest } from '../../src/validation/manifest.ts';
import { siteConfig } from '../../site.config.ts';

// Neutral synthetic site under a sub-path, as on a GitHub project site.
const SITE = 'https://example.github.io/sample-repo';
const BASE = '/sample-repo';
const env = readBuildEnv({ SITE_ENV: 'preview', SITE_URL: SITE });

let dir = '';
function site(files: Record<string, string>) {
  dir = mkdtempSync(join(tmpdir(), 'jpl-base-'));
  for (const [p, content] of Object.entries(files)) {
    mkdirSync(dirname(join(dir, p)), { recursive: true });
    writeFileSync(join(dir, p), content);
  }
  return dir;
}
afterEach(() => dir && rmSync(dir, { recursive: true, force: true }));

const manifest = (): IntegrityManifest => ({
  nonPublishedMarkers: [],
  internalStrings: [],
  hiddenSectionPaths: [],
  noticePaths: [],
  glossaryIssues: [],
});
const alternates = `<link rel="alternate" hreflang="hi" href="${SITE}/hi/"><link rel="alternate" hreflang="en" href="${SITE}/en/"><link rel="alternate" hreflang="x-default" href="${SITE}/hi/">`;
const page = (lang: 'hi' | 'en', switchHref: string, extra = '') => {
  const other = lang === 'hi' ? 'en' : 'hi';
  return `<!doctype html><html lang="${lang}"><head><link rel="canonical" href="${SITE}/${lang}/">${alternates}</head><body><a href="${switchHref}" hreflang="${other}" lang="${other}" translate="no">x</a>${extra}</body></html>`;
};
const good = () => ({
  'index.html': `<html><head><meta http-equiv="refresh" content="0; url=${BASE}/hi/"></head></html>`,
  'hi/index.html': page('hi', `${BASE}/en/`),
  'en/index.html': page('en', `${BASE}/hi/`),
  'sitemap-index.xml': `<sitemapindex><loc>${SITE}/sitemap-hi.xml</loc><loc>${SITE}/sitemap-en.xml</loc></sitemapindex>`,
  'sitemap-hi.xml': `<urlset><url><loc>${SITE}/hi/</loc></url></urlset>`,
  'sitemap-en.xml': `<urlset><url><loc>${SITE}/en/</loc></url></urlset>`,
});

describe('base path (sub-path hosting)', () => {
  it('is derived from the path of SITE_URL, and empty at the domain root', () => {
    expect(env.basePath).toBe(BASE);
    expect(basePathOf('https://example.github.io/sample-repo/')).toBe(BASE);
    expect(readBuildEnv({ SITE_ENV: 'preview' }).basePath).toBe('');
    expect(readBuildEnv({ SITE_ENV: 'local' }).basePath).toBe('');
    expect(readBuildEnv({ SITE_ENV: 'production', SITE_URL: 'https://real-domain.in' }).basePath).toBe('');
  });

  it('prefixes root-relative links only when a base path is set', () => {
    expect(withBase(env, '/hi/')).toBe('/sample-repo/hi/');
    expect(withBase(readBuildEnv({ SITE_ENV: 'local' }), '/hi/')).toBe('/hi/');
  });

  it('I20: resolves prefixed links and fails links that leave the base path', async () => {
    const ok = await runPostBuildChecks(site(good()), env, siteConfig, manifest());
    expect(ok.filter((i) => i.check === 'I20')).toEqual([]);
    const files = { ...good(), 'hi/index.html': page('hi', `${BASE}/en/`, '<a href="/en/">unprefixed</a>') };
    const bad = await runPostBuildChecks(site(files), env, siteConfig, manifest());
    expect(bad.filter((i) => i.check === 'I20' && i.severity === 'fail')).toHaveLength(1);
  });

  it('I20: fails asset paths (src, CSS url) that leave the base path', async () => {
    const asset = (check: string) => (i: { check: string; message: string }) =>
      i.check === 'I20' && i.message.startsWith('Asset path') && i.message.includes(check);
    const inside = { ...good(), '_astro/a.css': `@font-face{src:url(${BASE}/fonts/a.woff2)}` };
    expect((await runPostBuildChecks(site(inside), env, siteConfig, manifest())).filter(asset(''))).toEqual([]);
    const outside = {
      ...good(),
      '_astro/a.css': "@font-face{src:url('/fonts/a.woff2')}",
      'hi/index.html': page('hi', `${BASE}/en/`, '<img src="/images/x.png" alt="">'),
    };
    const issues = await runPostBuildChecks(site(outside), env, siteConfig, manifest());
    expect(issues.some(asset('/fonts/a.woff2'))).toBe(true);
    expect(issues.some(asset('/images/x.png'))).toBe(true);
  });

  it('I19: catches prefixed links to hidden sections', async () => {
    const files = { ...good(), 'hi/index.html': page('hi', `${BASE}/en/`, `<a href="${BASE}/hi/updates/">u</a>`) };
    const m = { ...manifest(), hiddenSectionPaths: ['/hi/updates/'] };
    const issues = await runPostBuildChecks(site(files), env, siteConfig, m);
    expect(issues.some((i) => i.check === 'I19' && i.message.startsWith('Link to hidden section'))).toBe(true);
  });

  it('R1–R8 pass with prefixed links; R6 and R7 fail without the prefix', async () => {
    expect(await checkRoutes(site(good()), SITE, false)).toEqual([]);
    const unprefixed = {
      ...good(),
      'index.html': '<html><head><meta http-equiv="refresh" content="0; url=/hi/"></head></html>',
      'hi/index.html': page('hi', '/en/'),
    };
    const rules = (await checkRoutes(site(unprefixed), SITE, false)).map((i) => i.rule);
    expect(rules).toContain('R6');
    expect(rules).toContain('R7');
  });
});
