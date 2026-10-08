/**
 * CI: bilingual route validation of `dist/` (rules R1–R8 in src/validation/routes-check.ts).
 * Run after a build, with the same environment as that build. Exit code 1 on any issue.
 */
import { readBuildEnv } from '../src/lib/env.ts';
import { checkRoutes } from '../src/validation/routes-check.ts';

const env = readBuildEnv();
const issues = await checkRoutes('dist', env.siteUrl, env.siteEnv === 'production');
if (issues.length) {
  console.error(
    `Bilingual route validation failed:\n${issues.map((i) => `  [${i.rule}] ${i.message}${i.where ? ` (${i.where})` : ''}`).join('\n')}`,
  );
  process.exit(1);
}
console.log(`Bilingual route validation passed (${env.siteEnv}${env.verifyOnly ? ', verification' : ''}).`);
