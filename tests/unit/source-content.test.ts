import { afterEach, describe, expect, it } from 'vitest';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { checkFixtureContamination, readContentSources, type SourceFile } from '../../src/validation/source-content.ts';

// Neutral synthetic data only: no names, places, roles or claims about any person.
const neutral = 'status: published\nlabel: { hi: "परीक्षण विषय", en: "Sample theme" }\n';
const check = (files: SourceFile[]) => checkFixtureContamination(files).map((i) => `${i.where}: ${i.message}`);

let dir = '';
function tree(files: Record<string, string>) {
  dir = mkdtempSync(join(tmpdir(), 'jpl-src-'));
  for (const [p, content] of Object.entries(files)) {
    mkdirSync(dirname(join(dir, p)), { recursive: true });
    writeFileSync(join(dir, p), content);
  }
  return dir;
}
afterEach(() => dir && rmSync(dir, { recursive: true, force: true }));

describe('SC1: development-fixture marker contamination in real content', () => {
  it('allows [DEV] and devFixture: true inside the _dev/ fixture area', () => {
    const fixture = 'devFixture: true\nstatus: published\nlabel: { hi: "[DEV] परीक्षण", en: "[DEV] Test" }\n';
    expect(check([{ path: 'src/content/_dev/themes/a.yaml', text: fixture }])).toEqual([]);
  });

  it('fails on [DEV] anywhere in a real content file: values, comments, Markdown bodies', () => {
    expect(
      check([{ path: 'src/content/themes/a.yaml', text: neutral.replace('Sample theme', '[DEV] Sample theme') }]),
    ).toHaveLength(1);
    expect(check([{ path: 'src/content/themes/b.yaml', text: `# [DEV] note\n${neutral}` }])).toHaveLength(1);
    expect(
      check([{ path: 'src/content/pages/c.md', text: '---\nstatus: draft\n---\nBody text [DEV] here.\n' }]),
    ).toHaveLength(1);
  });

  it('fails on devFixture: true in real content (YAML block and flow, Markdown front matter, JSON)', () => {
    const variants = [
      `devFixture: true\n${neutral}`,
      `{ devFixture: true, status: published }\n`,
      `---\ndevFixture: True\nstatus: draft\n---\nBody.\n`,
      `{"devFixture": true, "status": "published"}`,
    ];
    for (const text of variants) {
      expect(check([{ path: 'src/content/themes/a.yaml', text }]), text).toEqual([
        'src/content/themes/a.yaml: Real content entry marked "devFixture: true".',
      ]);
    }
  });

  it('fails on a nested _dev/ folder inside a real collection (only the top-level fixture area is exempt)', () => {
    expect(check([{ path: 'src/content/themes/_dev/a.yaml', text: `devFixture: true\n${neutral}` }])).toHaveLength(1);
  });

  it('fails on a fixture copied into a real collection, from the file system, with no page rendering it', () => {
    const fixture = readFileSync('src/content/_dev/themes/dev-theme-a.yaml', 'utf8');
    const root = tree({
      'src/content/_dev/themes/dev-theme-a.yaml': fixture,
      'src/content/themes/dev-theme-a.yaml': fixture,
    });
    expect(check(readContentSources(root))).toEqual([
      'src/content/themes/dev-theme-a.yaml: Development-fixture marker "[DEV]" in real content.',
      'src/content/themes/dev-theme-a.yaml: Real content entry marked "devFixture: true".',
    ]);
  });

  it('leaves normal real content and placeholders without [DEV] unaffected', () => {
    const files: SourceFile[] = [
      { path: 'src/content/themes/a.yaml', text: `devFixture: false\n${neutral}` },
      {
        path: 'src/content/themes/b.yaml',
        text: 'status: draft\nlabel: { hi: "प्रतीक्षित", en: "Placeholder — awaiting source" }\n',
      },
      {
        path: 'src/content/pages/c.md',
        text: '---\nstatus: draft\n---\nDEV, dev, development, [TODO], [dev-note] and devFixture: false.\n',
      },
      { path: 'src/content/README.md', text: 'Fixtures use the [DEV] prefix and devFixture: true.' },
    ];
    expect(check(files)).toEqual([]);
  });

  it('passes on the repository as it stands (fixtures stay in _dev/)', () => {
    expect(check(readContentSources('.'))).toEqual([]);
  });
});
