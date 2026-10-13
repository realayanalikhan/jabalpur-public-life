/**
 * Cross-platform helper: run an Astro command with an explicit build environment.
 *   node scripts/with-env.ts <local|preview|verify|demo> <astro args...>
 * "verify" = production rules + SITE_VERIFY_ONLY=1 (CI verification build, scaffold plan §6.2).
 * "demo" = the isolated demonstration build (decision 0028).
 */
import { spawnSync } from 'node:child_process';

const [mode, ...args] = process.argv.slice(2);
const modes: Record<string, Record<string, string>> = {
  local: { SITE_ENV: 'local' },
  preview: { SITE_ENV: 'preview' },
  verify: { SITE_ENV: 'production', SITE_VERIFY_ONLY: '1' },
  demo: { SITE_ENV: 'demo' },
};
const extra = mode ? modes[mode] : undefined;
if (!extra || args.length === 0) {
  console.error('Usage: node scripts/with-env.ts <local|preview|verify|demo> <command...>');
  process.exit(2);
}
const env: NodeJS.ProcessEnv = { ...process.env, ...extra };
if (mode !== 'verify') delete env['SITE_VERIFY_ONLY'];
const result = spawnSync(args.join(' '), { stdio: 'inherit', shell: true, env });
process.exit(result.status ?? 1);
