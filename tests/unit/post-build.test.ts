import { afterEach, describe, expect, it } from 'vitest';
import { copyFileSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { runPostBuildChecks } from '../../src/validation/post-build.ts';
import type { IntegrityManifest } from '../../src/validation/manifest.ts';
import { siteConfig } from '../../site.config.ts';
import { envs } from '../helpers.ts';

const page = (lang: string, body: string, head = '') =>
  `<!doctype html><html lang="${lang}"><head>${head}</head><body>${body}</body></html>`;
const emptyManifest = (): IntegrityManifest => ({
  nonPublishedMarkers: [],
  internalStrings: [],
  hiddenSectionPaths: [],
  noticePaths: [],
  glossaryIssues: [],
});

let dir = '';
function site(files: Record<string, string>) {
  dir = mkdtempSync(join(tmpdir(), 'jpl-dist-'));
  for (const [p, content] of Object.entries(files)) {
    mkdirSync(dirname(join(dir, p)), { recursive: true });
    writeFileSync(join(dir, p), content);
  }
  return dir;
}
afterEach(() => dir && rmSync(dir, { recursive: true, force: true }));

const base = {
  'hi/index.html': page('hi', '<a href="/en/">English</a>'),
  'en/index.html': page('en', '<a href="/hi/">हिंदी</a>'),
};
const failures = (issues: { severity: string; check: string }[]) =>
  issues.filter((i) => i.severity === 'fail').map((i) => i.check);

describe('post-build output checks', () => {
  it('passes a clean production site', async () => {
    const issues = await runPostBuildChecks(site(base), envs.deploy, siteConfig, emptyManifest());
    expect(failures(issues)).toEqual([]);
  });

  it('I2: fixture text in preview or production output fails', async () => {
    const files = { ...base, 'hi/x/index.html': page('hi', '[DEV] fixture') };
    expect(failures(await runPostBuildChecks(site(files), envs.preview, siteConfig, emptyManifest()))).toContain('I2');
    expect(failures(await runPostBuildChecks(site(files), envs.verify, siteConfig, emptyManifest()))).toContain('I2');
  });

  it('I10: preview markers and unpublished text in production fail', async () => {
    const files = { ...base, 'hi/y/index.html': page('hi', '<div data-preview-only>p</div><p>Draft title text</p>') };
    const m = { ...emptyManifest(), nonPublishedMarkers: ['Draft title text'] };
    const f = failures(await runPostBuildChecks(site(files), envs.deploy, siteConfig, m));
    expect(f.filter((c) => c === 'I10').length).toBeGreaterThanOrEqual(2);
  });

  it('I11: internal notes in output fail', async () => {
    const files = { ...base, 'hi/z/index.html': page('hi', 'secret internal note') };
    const m = { ...emptyManifest(), internalStrings: ['secret internal note'] };
    expect(failures(await runPostBuildChecks(site(files), envs.preview, siteConfig, m))).toContain('I11');
  });

  it('I18: notice pages must be noindex and outside sitemaps', async () => {
    const files = {
      ...base,
      'en/updates/a/index.html': page('en', '<p data-notice-page>n</p>'),
      'sitemap-en.xml': '<urlset><url><loc>https://real-domain.in/en/updates/a/</loc></url></urlset>',
    };
    const m = { ...emptyManifest(), noticePaths: ['/en/updates/a/'] };
    const f = failures(await runPostBuildChecks(site(files), envs.deploy, siteConfig, m));
    expect(f.filter((c) => c === 'I18').length).toBe(2);
  });

  it('I19 and I20: hidden sections and broken links fail', async () => {
    const files = { ...base, 'hi/updates/a/index.html': page('hi', '<a href="/hi/missing/">x</a>') };
    const m = { ...emptyManifest(), hiddenSectionPaths: ['/hi/updates/'] };
    const f = failures(await runPostBuildChecks(site(files), envs.deploy, siteConfig, m));
    expect(f).toContain('I19');
    expect(f).toContain('I20');
  });

  it('I7: GPS metadata in output images fails in every environment', async () => {
    const d = site(base);
    copyFileSync('tests/fixtures/images/gps-tagged.jpg', join(d, 'photo.jpg'));
    for (const env of [envs.local, envs.preview, envs.deploy]) {
      expect(failures(await runPostBuildChecks(d, env, siteConfig, emptyManifest()))).toContain('I7');
    }
  });

  it('I14: missing glossary markers in production output fail', async () => {
    const files = { ...base, 'hi/q/index.html': page('hi', '⟦nav.missing⟧') };
    expect(failures(await runPostBuildChecks(site(files), envs.deploy, siteConfig, emptyManifest()))).toContain('I14');
  });
});
