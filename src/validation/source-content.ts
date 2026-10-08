/**
 * SC1 — development-fixture marker contamination in real content (source-content check).
 *
 * Implementation-level integrity rule. It supports I2 and the synthetic-data rules of scaffold plan
 * §15.1 ("every visible text field begins with [DEV]"; fixtures are never edited into real content),
 * but it is NOT part of decision 0018 and does not change I2. I2 keeps its meaning: fixture entries in
 * the loaded content and `[DEV]` in the output.
 *
 * SC1 inspects the SOURCE files themselves, before and independently of content loading and page
 * rendering, so a contaminated entry fails even if no page renders it:
 *  - `[DEV]` anywhere in a real content file fails;
 *  - `devFixture: true` in a real content file fails.
 * Exempt: the fixture area `src/content/_dev/` (top level only) and the editor documentation
 * `src/content/README.md`, which no collection loads. Fails in every environment.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

export const CONTENT_ROOT = 'src/content/';
export const FIXTURE_AREA = 'src/content/_dev/';
export const CONTENT_DOCS: readonly string[] = ['src/content/README.md'];
export const FIXTURE_MARKER = '[DEV]';

const TEXT_FILE = /\.(ya?ml|md|mdx|json|csv|txt|svg)$/i;
/** YAML (block or flow), Markdown front matter and JSON forms of `devFixture: true`. */
const FIXTURE_FLAG = /(^|[\s{,])["']?devFixture["']?\s*:\s*["']?true\b/im;

export interface SourceFile {
  /** Repository-relative POSIX path, e.g. `src/content/themes/a.yaml`. */
  path: string;
  text: string;
}

export interface SourceIssue {
  rule: 'SC1';
  message: string;
  where: string;
}

export function isFixtureArea(path: string): boolean {
  return path.startsWith(FIXTURE_AREA);
}

export function checkFixtureContamination(files: readonly SourceFile[]): SourceIssue[] {
  const issues: SourceIssue[] = [];
  for (const f of files) {
    if (!f.path.startsWith(CONTENT_ROOT) || isFixtureArea(f.path) || CONTENT_DOCS.includes(f.path)) continue;
    if (f.text.includes(FIXTURE_MARKER)) {
      issues.push({
        rule: 'SC1',
        message: `Development-fixture marker "${FIXTURE_MARKER}" in real content.`,
        where: f.path,
      });
    }
    if (FIXTURE_FLAG.test(f.text)) {
      issues.push({ rule: 'SC1', message: 'Real content entry marked "devFixture: true".', where: f.path });
    }
  }
  return issues;
}

/** Reads every text file under `<root>/src/content/` from the file system (not from git or the content layer). */
export function readContentSources(root = '.'): SourceFile[] {
  const out: SourceFile[] = [];
  const walk = (dir: string) => {
    for (const d of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, d.name);
      if (d.isDirectory()) walk(p);
      else if (TEXT_FILE.test(d.name))
        out.push({ path: relative(root, p).split(sep).join('/'), text: readFileSync(p, 'utf8') });
    }
  };
  walk(join(root, CONTENT_ROOT));
  return out;
}

export function formatSourceIssues(issues: readonly SourceIssue[]): string {
  return issues.map((i) => `  [${i.rule}] ${i.message} (${i.where})`).join('\n');
}
