/**
 * CI: summarise Lighthouse results (scaffold plan §13 step 10).
 * Accessibility is enforced by the Lighthouse assertions (WCAG 2.2 AA target, 0005). Performance is
 * REPORT-ONLY: the numeric targets (OD-25) are working direction and not yet decided, so nothing here
 * fails on performance (plan §13 step 10: "Warn until OD-25 confirms targets").
 * The mobile profile is compared with the spec A §8 working-direction values (LCP ≤ 2.5 s, CLS ≤ 0.1);
 * a miss is a GitHub warning annotation, never a failure. INP needs real interaction and is not
 * measurable in a lab run. Writes a Markdown table to the GitHub step summary when available.
 */
import { appendFileSync, existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

interface ManifestEntry {
  url: string;
  jsonPath: string;
  summary: Record<string, number>;
}

// Spec A §8 working direction (OD-25 open). Not final targets; warnings only.
const WORKING_DIRECTION = { lcpMs: 2500, cls: 0.1 };

const rows: string[] = [];
const warnings: string[] = [];
for (const profile of ['mobile', 'desktop']) {
  const manifest = join('lighthouse-reports', profile, 'manifest.json');
  if (!existsSync(manifest)) continue;
  for (const e of JSON.parse(readFileSync(manifest, 'utf8')) as ManifestEntry[]) {
    const lhr = JSON.parse(readFileSync(e.jsonPath, 'utf8')) as {
      audits: Record<string, { numericValue?: number }>;
    };
    const ms = (id: string) => {
      const v = lhr.audits[id]?.numericValue;
      return v === undefined ? '–' : `${Math.round(v)} ms`;
    };
    const cls = lhr.audits['cumulative-layout-shift']?.numericValue;
    const path = new URL(e.url).pathname;
    const lcp = lhr.audits['largest-contentful-paint']?.numericValue;
    if (profile === 'mobile' && lcp !== undefined && lcp > WORKING_DIRECTION.lcpMs) {
      warnings.push(`${path}: LCP ${Math.round(lcp)} ms exceeds the 2.5 s working direction (OD-25 open).`);
    }
    if (profile === 'mobile' && cls !== undefined && cls > WORKING_DIRECTION.cls) {
      warnings.push(`${path}: CLS ${cls.toFixed(3)} exceeds the 0.1 working direction (OD-25 open).`);
    }
    const score = (k: string) => (e.summary[k] === undefined ? '–' : String(Math.round((e.summary[k] ?? 0) * 100)));
    rows.push(
      `| ${profile} | ${path} | ${score('accessibility')} | ${score('performance')} | ${ms('largest-contentful-paint')} | ${cls === undefined ? '–' : cls.toFixed(3)} | ${ms('total-blocking-time')} |`,
    );
  }
}

const table = [
  '### Lighthouse (production-rules build)',
  '',
  'Accessibility must score 100 (enforced). Performance is **report-only** until OD-25 targets are confirmed;',
  'mobile results are compared with the spec A §8 working direction (LCP ≤ 2.5 s, CLS ≤ 0.1) as warnings only.',
  '',
  '| Profile | Page | Accessibility | Performance | LCP | CLS | TBT |',
  '|---|---|---|---|---|---|---|',
  ...rows,
  '',
].join('\n');
console.log(table);
for (const w of warnings) console.log(`::warning title=Performance (report-only)::${w}`);
const summary = process.env['GITHUB_STEP_SUMMARY'];
if (summary) appendFileSync(summary, table + '\n');
if (!rows.length) {
  console.error('No Lighthouse results found.');
  process.exit(1);
}
