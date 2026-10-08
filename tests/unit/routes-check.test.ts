import { afterEach, describe, expect, it } from 'vitest';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { checkRoutes } from '../../src/validation/routes-check.ts';

const SITE = 'https://example.invalid';
const alternates = (path: string) =>
  `<link rel="alternate" hreflang="hi" href="${SITE}/hi/${path}">` +
  `<link rel="alternate" hreflang="en" href="${SITE}/en/${path}">` +
  `<link rel="alternate" hreflang="x-default" href="${SITE}/hi/${path}">`;
const page = (lang: 'hi' | 'en', path: string, opts: { head?: string; body?: string; hreflang?: boolean } = {}) => {
  const other = lang === 'hi' ? 'en' : 'hi';
  const head =
    opts.head ??
    `<link rel="canonical" href="${SITE}/${lang}/${path}">${opts.hreflang === false ? '' : alternates(path)}`;
  const body = opts.body ?? '';
  return `<!doctype html><html lang="${lang}"><head>${head}</head><body><a href="/${other}/${path}" hreflang="${other}" lang="${other}" translate="no">switch</a>${body}</body></html>`;
};
const notice = (lang: 'hi' | 'en', path: string) =>
  page(lang, path, { head: '<meta name="robots" content="noindex">', body: '<p data-notice-page>n</p>' });
const sitemap = (urls: string[]) => `<urlset>${urls.map((u) => `<url><loc>${SITE}${u}</loc></url>`).join('')}</urlset>`;

const base = (): Record<string, string> => ({
  'index.html': '<!doctype html><html><head><meta http-equiv="refresh" content="0; url=/hi/"></head></html>',
  'hi/index.html': page('hi', ''),
  'en/index.html': page('en', ''),
  'sitemap-index.xml': `<sitemapindex><sitemap><loc>${SITE}/sitemap-hi.xml</loc></sitemap><sitemap><loc>${SITE}/sitemap-en.xml</loc></sitemap></sitemapindex>`,
  'sitemap-hi.xml': sitemap(['/hi/']),
  'sitemap-en.xml': sitemap(['/en/']),
});

let dir = '';
function site(files: Record<string, string>) {
  dir = mkdtempSync(join(tmpdir(), 'jpl-routes-'));
  for (const [p, content] of Object.entries(files)) {
    mkdirSync(dirname(join(dir, p)), { recursive: true });
    writeFileSync(join(dir, p), content);
  }
  return dir;
}
afterEach(() => dir && rmSync(dir, { recursive: true, force: true }));
const rules = async (files: Record<string, string>, production = true) =>
  (await checkRoutes(site(files), SITE, production)).map((i) => i.rule);

describe('bilingual route validation', () => {
  it('passes a correct bilingual site', async () => {
    expect(await rules(base())).toEqual([]);
  });

  it('passes a Hindi-only item with an English notice page (no hreflang, outside sitemaps)', async () => {
    const files = {
      ...base(),
      'hi/updates/a/index.html': page('hi', 'updates/a/', { hreflang: false }),
      'en/updates/a/index.html': notice('en', 'updates/a/'),
      'sitemap-hi.xml': sitemap(['/hi/', '/hi/updates/a/']),
    };
    expect(await rules(files)).toEqual([]);
  });

  it('R1: a page without its other-language counterpart fails', async () => {
    const files = base();
    delete files['en/index.html'];
    expect(await rules(files)).toContain('R1');
  });

  it('R2: a mismatched html lang fails', async () => {
    const files = { ...base(), 'en/index.html': page('en', '').replace('lang="en"', 'lang="hi"') };
    expect(await rules(files)).toContain('R2');
  });

  it('R3: a wrong canonical, or a canonical on a notice page, fails', async () => {
    const wrong = {
      ...base(),
      'hi/index.html': page('hi', '').replace(`canonical" href="${SITE}/hi/`, `canonical" href="${SITE}/en/`),
    };
    expect(await rules(wrong)).toContain('R3');
    const files = {
      ...base(),
      'hi/updates/a/index.html': page('hi', 'updates/a/', { hreflang: false }),
      'en/updates/a/index.html': notice('en', 'updates/a/').replace(
        '<head>',
        `<head><link rel="canonical" href="${SITE}/en/updates/a/">`,
      ),
      'sitemap-hi.xml': sitemap(['/hi/', '/hi/updates/a/']),
    };
    expect(await rules(files)).toContain('R3');
  });

  it('R4: incomplete, non-reciprocal or notice-targeting hreflang fails', async () => {
    const incomplete = {
      ...base(),
      'hi/index.html': page('hi', '', {
        head: `<link rel="canonical" href="${SITE}/hi/"><link rel="alternate" hreflang="en" href="${SITE}/en/">`,
      }),
    };
    expect(await rules(incomplete)).toContain('R4');
    const toNotice = {
      ...base(),
      'hi/updates/a/index.html': page('hi', 'updates/a/'),
      'en/updates/a/index.html': notice('en', 'updates/a/'),
      'sitemap-hi.xml': sitemap(['/hi/', '/hi/updates/a/']),
    };
    expect(await rules(toNotice)).toContain('R4');
  });

  it('R5: sitemaps listing missing, wrong-language or notice pages, or omitting indexable pages, fail', async () => {
    expect(await rules({ ...base(), 'sitemap-hi.xml': sitemap(['/hi/', '/hi/missing/']) })).toContain('R5');
    expect(await rules({ ...base(), 'sitemap-hi.xml': sitemap(['/hi/', '/en/']) })).toContain('R5');
    expect(await rules({ ...base(), 'sitemap-en.xml': sitemap([]) })).toContain('R5');
    const files = base();
    delete files['sitemap-index.xml'];
    expect(await rules(files)).toContain('R5');
  });

  it('R5: noindex pages in sitemaps fail only under production rules', async () => {
    const files = {
      ...base(),
      'hi/index.html': page('hi', '', {
        head: `<meta name="robots" content="noindex"><link rel="canonical" href="${SITE}/hi/">${alternates('')}`,
      }),
    };
    expect(await rules(files, true)).toContain('R5');
    expect(await rules(files, false)).not.toContain('R5');
  });

  it('R6: the root must redirect to /hi/ without scripts', async () => {
    expect(await rules({ ...base(), 'index.html': base()['index.html']!.replace('/hi/', '/en/') })).toContain('R6');
    expect(
      await rules({ ...base(), 'index.html': base()['index.html']!.replace('</head>', '<script>1</script></head>') }),
    ).toContain('R6');
  });

  it('R7: a missing or wrong language switch fails', async () => {
    expect(await rules({ ...base(), 'hi/index.html': page('hi', '').replace(' translate="no"', '') })).toContain('R7');
    expect(
      await rules({ ...base(), 'hi/index.html': page('hi', '').replace('href="/en/"', 'href="/en/other/"') }),
    ).toContain('R7');
  });

  it('R8: language detection or stored preference fails', async () => {
    expect(
      await rules({ ...base(), 'hi/index.html': page('hi', '', { body: '<script>navigator.language</script>' }) }),
    ).toContain('R8');
    expect(await rules({ ...base(), '_astro/a.js': 'localStorage.setItem("lang","en")' })).toContain('R8');
  });
});
