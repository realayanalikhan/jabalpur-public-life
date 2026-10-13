/**
 * Demonstration-environment isolation (decision 0028): demo data can appear only in an explicit demo
 * build, and a demo build contains nothing but demo data. Synthetic test data only.
 */
import { afterEach, describe, expect, it } from 'vitest';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import {
  DEMO_CONTENT_ROOT,
  REAL_CONTENT_ROOT,
  buildableStatuses,
  contentRoot,
  demoAllowed,
  fixturesAllowed,
  readBuildEnv,
} from '../../src/lib/env.ts';
import { severityFor } from '../../src/validation/types.ts';
import { DEMO_MARKER, demoOutputIssue, runDemoContentChecks } from '../../src/validation/demo.ts';
import { checkDemoIsolation, readContentSources } from '../../src/validation/source-content.ts';
import { runPostBuildChecks } from '../../src/validation/post-build.ts';
import type { IntegrityManifest } from '../../src/validation/manifest.ts';
import { siteConfig } from '../../site.config.ts';
import { envs } from '../helpers.ts';

const demo = readBuildEnv({ SITE_ENV: 'demo' });
const entry = (data: Record<string, unknown>) => ({
  collection: 'themes',
  id: 'a',
  data: { status: 'published', ...data },
});

describe('demo environment', () => {
  it('is an explicit, separate mode with its own data root and no fixtures', () => {
    expect(demo.siteEnv).toBe('demo');
    expect(demo.deployment).toBe(false);
    expect(demo.siteUrl).toBe('https://demo.invalid');
    expect(demoAllowed(demo)).toBe(true);
    expect(fixturesAllowed(demo)).toBe(false);
    expect(contentRoot(demo)).toBe(DEMO_CONTENT_ROOT);
    expect([...buildableStatuses(demo)]).toEqual(['published']);
  });

  it('never loads demo data in local, preview or production builds', () => {
    for (const env of [envs.local, envs.preview, envs.verify, envs.deploy]) {
      expect(demoAllowed(env)).toBe(false);
      expect(contentRoot(env)).toBe(REAL_CONTENT_ROOT);
    }
    expect(readBuildEnv({}).siteEnv).toBe('production');
  });

  it('cannot be combined with the production verification flag', () => {
    expect(() => readBuildEnv({ SITE_ENV: 'demo', SITE_VERIFY_ONLY: '1' })).toThrow();
  });

  it('applies the preview outcomes of every integrity check (strict, never production)', () => {
    expect(severityFor(demo, siteConfig, { production: 'F', preview: 'W', local: '-' })).toBe('warn');
    expect(severityFor(demo, siteConfig, { production: 'W', preview: 'F', local: '-' })).toBe('fail');
    expect(severityFor(demo, siteConfig, { production: 'B', preview: '-', local: '-' })).toBeNull();
  });
});

describe('D1: demo data only in demo builds, and only demo data there', () => {
  it('fails demo-flagged entries in every other build', () => {
    for (const env of [envs.local, envs.preview, envs.verify, envs.deploy]) {
      const issues = runDemoContentChecks(env, { themes: [entry({ demo: true })] });
      expect(issues.map((i) => [i.check, i.severity])).toEqual([['D1', 'fail']]);
    }
  });

  it('fails unflagged (real or fixture) entries in a demo build', () => {
    expect(runDemoContentChecks(demo, { themes: [entry({})] }).map((i) => i.check)).toEqual(['D1']);
    expect(runDemoContentChecks(demo, { themes: [entry({ devFixture: true })] }).map((i) => i.check)).toEqual(['D1']);
  });

  it('accepts flagged entries in a demo build and unflagged entries elsewhere', () => {
    expect(runDemoContentChecks(demo, { themes: [entry({ demo: true })] })).toEqual([]);
    expect(runDemoContentChecks(envs.preview, { themes: [entry({})] })).toEqual([]);
  });
});

describe('D2: the demonstration marker', () => {
  const page = (body: string) => `<!doctype html><html lang="hi"><body>${body}</body></html>`;
  it('fails in any non-demo output', () => {
    for (const env of [envs.local, envs.preview, envs.verify, envs.deploy]) {
      expect(demoOutputIssue(env, page(`<div ${DEMO_MARKER}>x</div>`), '/hi/')?.check).toBe('D2');
      expect(demoOutputIssue(env, page('x'), '/hi/')).toBeNull();
    }
  });
  it('is required on every demo page', () => {
    expect(demoOutputIssue(demo, page('x'), '/hi/')?.check).toBe('D2');
    expect(demoOutputIssue(demo, page(`<div ${DEMO_MARKER}>x</div>`), '/hi/')).toBeNull();
  });

  let dir = '';
  afterEach(() => dir && rmSync(dir, { recursive: true, force: true }));
  const manifest = (): IntegrityManifest => ({
    nonPublishedMarkers: [],
    internalStrings: [],
    hiddenSectionPaths: [],
    noticePaths: [],
    glossaryIssues: [],
  });
  it('runs in the post-build checks (and therefore in the production output guard)', async () => {
    dir = mkdtempSync(join(tmpdir(), 'jpl-demo-'));
    for (const [p, c] of Object.entries({
      'hi/index.html': page(`<div ${DEMO_MARKER}>banner</div><a href="/en/">en</a>`),
      'en/index.html': page(`<div ${DEMO_MARKER}>banner</div><a href="/hi/">hi</a>`),
    })) {
      mkdirSync(dirname(join(dir, p)), { recursive: true });
      writeFileSync(join(dir, p), c);
    }
    const fails = async (env: typeof demo) =>
      (await runPostBuildChecks(dir, env, siteConfig, manifest())).filter((i) => i.check === 'D2');
    expect(await fails(envs.deploy)).toHaveLength(2);
    expect(await fails(envs.preview)).toHaveLength(2);
    expect(await fails(demo)).toEqual([]);
  });
});

describe('SC2: demonstration data stays in demo/content/', () => {
  const flagged = 'demo: true\nstatus: published\nlabel: { hi: "उदाहरण", en: "Example" }\n';
  it('fails a demo flag anywhere in real content', () => {
    const issues = checkDemoIsolation([{ path: 'src/content/themes/a.yaml', text: flagged }]);
    expect(issues.map((i) => i.rule)).toEqual(['SC2']);
  });
  it('fails demo entries without the flag, and fixture markers in demo data', () => {
    expect(checkDemoIsolation([{ path: 'demo/content/themes/a.yaml', text: 'status: published\n' }])).toHaveLength(1);
    expect(checkDemoIsolation([{ path: 'demo/content/themes/b.yaml', text: `${flagged}# [DEV]\n` }])).toHaveLength(1);
    expect(
      checkDemoIsolation([{ path: 'demo/content/themes/c.yaml', text: `${flagged}devFixture: true\n` }]),
    ).toHaveLength(1);
  });
  it('accepts flagged demo entries, the demo registry and unflagged real content', () => {
    expect(
      checkDemoIsolation([
        { path: 'demo/content/themes/a.yaml', text: flagged },
        { path: 'demo/content/registry/references.yaml', text: 'ABC234: { collection: photos, item: a }\n' },
        { path: 'src/content/themes/a.yaml', text: 'status: published\ndemo: false\n' },
        { path: 'src/content/README.md', text: 'Demo data uses demo: true.' },
      ]),
    ).toEqual([]);
  });
  it('passes on the repository as it stands', () => {
    expect(checkDemoIsolation(readContentSources('.'))).toEqual([]);
  });
});
