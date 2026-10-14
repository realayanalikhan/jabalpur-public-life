/**
 * Demonstration-environment isolation (decision 0028). Fictional demonstration data must never reach
 * a real build, and a demo build must contain nothing but demonstration data. Both checks fail in
 * every environment; they are additional to I1–I23 and SC1, which are unchanged.
 *
 *  D1 (content stage) — an entry flagged `demo: true` loaded outside a demo build; or, in a demo build,
 *     an entry that is not flagged (real content or fixtures in the demo).
 *  D2 (output stage) — the demonstration marker in non-demo output; or a demo page without it. The
 *     marker sits only on the visible banner, so every demo page must show the bilingual warning.
 *  SC2 (source stage, src/validation/source-content.ts) — demo flags in `src/content/`; unflagged or
 *     `[DEV]` files in `demo/content/`.
 */
import type { BuildEnv } from '../lib/env.ts';
import type { Dataset, Issue } from './types.ts';

/**
 * Attribute carried only by the visible demonstration banner (DemoBanner.astro), so D2 can pass only
 * when the bilingual warning is actually on the page.
 */
export const DEMO_MARKER = 'data-demo-only';

export function runDemoContentChecks(env: Pick<BuildEnv, 'siteEnv'>, full: Dataset): Issue[] {
  const issues: Issue[] = [];
  const demo = env.siteEnv === 'demo';
  for (const entries of Object.values(full)) {
    for (const e of entries) {
      const flagged = e.data['demo'] === true;
      const where = `${e.collection}/${e.id}`;
      if (flagged && !demo) {
        issues.push({ check: 'D1', severity: 'fail', message: 'Demonstration content outside the demo build.', where });
      } else if (!flagged && demo) {
        issues.push({
          check: 'D1',
          severity: 'fail',
          message: 'Unflagged (real or fixture) content in the demo build.',
          where,
        });
      }
    }
  }
  return issues;
}

/** D2 for one HTML page of the output. */
export function demoOutputIssue(env: Pick<BuildEnv, 'siteEnv'>, html: string, path: string): Issue | null {
  const marked = html.includes(DEMO_MARKER);
  if (env.siteEnv !== 'demo' && marked) {
    return { check: 'D2', severity: 'fail', message: 'Demonstration marker in non-demo output.', where: path };
  }
  if (env.siteEnv === 'demo' && !marked) {
    return { check: 'D2', severity: 'fail', message: 'Demo page without the demonstration marker.', where: path };
  }
  return null;
}
