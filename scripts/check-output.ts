/**
 * CI: final production / unpublished-content guard on `dist/` (scaffold plan §13 step 11).
 * Re-runs the output-level integrity checks (I2, I7, I10, I11, I14, I18, I19, I20) under production
 * rules and refuses to run on a non-production build, so the guard always checks what production
 * would publish. Also rejects fixture paths and build internals in the output. Exit code 1 on failure.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { readBuildEnv } from '../src/lib/env.ts';
import { siteConfig } from '../site.config.ts';
import { runPostBuildChecks } from '../src/validation/post-build.ts';
import { MANIFEST_FILE, type IntegrityManifest } from '../src/validation/manifest.ts';

const env = readBuildEnv();
if (env.siteEnv !== 'production') {
  console.error(`Output guard must run on a production-rules build (SITE_ENV is "${env.siteEnv}").`);
  process.exit(1);
}
if (!existsSync('dist') || !existsSync(MANIFEST_FILE)) {
  console.error('Output guard: dist/ or the integrity manifest is missing; run the verification build first.');
  process.exit(1);
}

const failures: string[] = [];
const walk = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? walk(join(dir, d.name)) : [join(dir, d.name)],
  );
for (const f of walk('dist')) {
  const p = f.split(/[\\/]/).join('/');
  if (/(^|\/)(_dev|\.integrity)(\/|$)/.test(p)) failures.push(`Build internal or fixture path in output: ${p}`);
}

const manifest = JSON.parse(readFileSync(MANIFEST_FILE, 'utf8')) as IntegrityManifest;
const issues = await runPostBuildChecks('dist', env, siteConfig, manifest);
for (const i of issues.filter((i) => i.severity === 'fail')) {
  failures.push(`[${i.check}] ${i.message}${i.where ? ` (${i.where})` : ''}`);
}

if (failures.length) {
  console.error(`Production output guard failed:\n  ${failures.join('\n  ')}`);
  process.exit(1);
}
console.log('Production output guard passed: no fixtures, unpublished, internal or preview material in dist/.');
