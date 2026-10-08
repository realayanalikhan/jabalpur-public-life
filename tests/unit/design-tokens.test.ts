/**
 * Design-foundation guards (decisions 0009, 0024, 0025; scaffold plan §12; design 03 §3–§9).
 * Keeps every visual value in src/styles/tokens.css, the palette accessible, and the typography
 * within the approved fonts, weights and rules.
 */
import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const read = (p: string) => readFileSync(p, 'utf8');
const walk = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? walk(join(dir, d.name)) : [join(dir, d.name).split('\\').join('/')],
  );

const TOKENS = 'src/styles/tokens.css';
const tokens = read(TOKENS);
const stripComments = (css: string) => css.replace(/\/\*[\s\S]*?\*\//g, '');
/** @font-face descriptors are font metadata, checked separately below. */
const stripFontFaces = (css: string) => css.replace(/@font-face\s*\{[^}]*\}/g, '');

/** CSS authored outside the token file: style sheets, <style> blocks and style attributes. */
const authoredCss: Array<{ file: string; css: string }> = walk('src')
  .filter((f) => (f.endsWith('.css') && f !== TOKENS) || f.endsWith('.astro'))
  .map((file) => {
    const text = read(file);
    if (file.endsWith('.css')) return { file, css: stripFontFaces(stripComments(text)) };
    const blocks = [...text.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1] ?? '');
    const attrs = [...text.matchAll(/\sstyle=(?:"([^"]*)"|\{`([^`]*)`\})/g)].map((m) => m[1] ?? m[2] ?? '');
    return { file, css: stripComments([...blocks, ...attrs].join('\n')) };
  });
const allCss = [{ file: TOKENS, css: stripComments(tokens) }, ...authoredCss];

// ---- WCAG 2.2 contrast -------------------------------------------------------------------------
const palette = Object.fromEntries(
  [...tokens.matchAll(/(--palette-[\w-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], (m[2] ?? '').toLowerCase()]),
);
function role(name: string): string {
  const m = new RegExp(`${name}:\\s*var\\((--[\\w-]+)\\)`).exec(tokens);
  if (!m?.[1]) throw new Error(`Role ${name} not found`);
  return m[1].startsWith('--palette-') ? (palette[m[1]] ?? '') : role(m[1]);
}
const luminance = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a: string, b: string) => {
  const [l1, l2] = [luminance(role(a)), luminance(role(b))].sort((x, y) => y - x) as [number, number];
  return (l1 + 0.05) / (l2 + 0.05);
};

describe('design tokens: palette (provisional values, 0025)', () => {
  it('defines every palette value once, in tokens.css, marked provisional', () => {
    expect(Object.keys(palette)).toHaveLength(11);
    expect(tokens).toMatch(/PROVISIONAL VALUES \(0025 §2; DP-08 open\)/);
  });

  // Targets: AA everywhere; AAA for body text, links and small Hindi text (0025 §3).
  const pairs: Array<[string, string, number]> = [
    ['--color-text', '--color-background', 7],
    ['--color-text-secondary', '--color-background', 7],
    ['--color-link', '--color-background', 7],
    ['--color-text-muted', '--color-background', 4.5],
    ['--color-text', '--color-surface', 7],
    ['--color-text-secondary', '--color-surface', 4.5],
    ['--color-link', '--color-surface', 4.5],
    ['--color-citation-text', '--color-citation-surface', 4.5],
    // Non-text: control borders, focus ring and the river line need 3:1 (WCAG 1.4.11).
    ['--color-border-control', '--color-background', 3],
    ['--color-focus', '--color-background', 3],
    ['--color-focus', '--color-surface', 3],
    ['--color-river-line', '--color-background', 3],
  ];
  for (const [fg, bg, min] of pairs) {
    it(`${fg} on ${bg} meets ${min}:1`, () => {
      expect(contrast(fg, bg)).toBeGreaterThanOrEqual(min);
    });
  }
});

describe('design tokens: values live only in tokens.css', () => {
  const COLOUR_LITERAL =
    /#[0-9a-f]{3,8}\b|\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\(|:\s*(?:white|black|red|green|blue|orange|yellow|gray|grey|silver|maroon|navy|teal|olive|purple|fuchsia|lime|aqua)\b/i;
  it('has no colour literals outside the token file', () => {
    const offenders = authoredCss.filter(({ css }) => COLOUR_LITERAL.test(css)).map((x) => x.file);
    expect(offenders).toEqual([]);
  });

  it('has no gradients anywhere (0025 §3)', () => {
    expect(allCss.filter(({ css }) => /gradient\(/i.test(css)).map((x) => x.file)).toEqual([]);
  });

  it('sets font sizes, weights and families only through tokens', () => {
    const bad: string[] = [];
    for (const { file, css } of authoredCss) {
      for (const m of css.matchAll(/(font-size|font-weight|font-family|line-height)\s*:\s*([^;}]+)/g)) {
        const value = (m[2] ?? '').trim();
        if (!/^(var\(--[\w-]+\)|inherit)$/.test(value)) bad.push(`${file}: ${m[1]}: ${value}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('uses spacing tokens (or 0 / auto) for margins, paddings, gaps and offsets', () => {
    const bad: string[] = [];
    const prop = /(?:^|[;{\s])((?:margin|padding|inset)[\w-]*|gap|row-gap|column-gap)\s*:\s*([^;}]+)/g;
    for (const { file, css } of authoredCss) {
      for (const m of css.matchAll(prop)) {
        const literal = (m[2] ?? '').replace(/var\(--[\w-]+\)/g, '').match(/\b\d*\.?\d+(px|rem|em|vw|vh|%)/);
        if (literal) bad.push(`${file}: ${m[1]}: ${(m[2] ?? '').trim()}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('uses only the approved breakpoints (25rem, 48rem, 64rem) in media and container queries', () => {
    const bad: string[] = [];
    for (const { file, css } of allCss) {
      for (const m of css.matchAll(/@(?:media|container)[^{]*\{/g)) {
        for (const w of m[0].matchAll(/(?:min-|max-)?width\s*[:<>=]+\s*([\d.]+[a-z]+)/g)) {
          if (!['25rem', '48rem', '64rem'].includes(w[1] ?? '')) bad.push(`${file}: ${m[0]}`);
        }
      }
    }
    expect(bad).toEqual([]);
  });
});

describe('typography rules (0024; design 03 §3)', () => {
  it('never uppercases, tracks or animates text', () => {
    const bad = allCss.filter(({ css }) =>
      /text-transform\s*:\s*(uppercase|capitalize)|letter-spacing\s*:(?!\s*(?:normal|0)\b)|@keyframes|animation\s*:/i.test(
        css,
      ),
    );
    expect(bad.map((x) => x.file)).toEqual([]);
  });

  it('disables synthetic bold and italic', () => {
    expect(stripComments(read('src/styles/base.css'))).toMatch(/html\s*\{[^}]*font-synthesis:\s*none/);
  });

  it('keeps Hindi upright, with weight 600 for emphasis', () => {
    const css = stripComments(read('src/styles/typography.css'));
    expect(css).toMatch(/:is\(em, i, cite, dfn, var, address\):lang\(hi\)\s*\{\s*font-style:\s*normal/);
    expect(css).toMatch(/:is\(em, i\):lang\(hi\)\s*\{\s*font-weight:\s*var\(--weight-semibold\)/);
  });

  it('puts the Latin family first in the content stack', () => {
    expect(tokens).toMatch(/--font-content:\s*'Source Serif 4', 'Noto Serif Devanagari'/);
  });

  it('turns all motion durations to zero for reduced motion', () => {
    const block = /@media \(prefers-reduced-motion: reduce\)\s*\{\s*:root\s*\{([^}]*)\}/.exec(tokens)?.[1] ?? '';
    const durations = [...tokens.matchAll(/(--duration-[\w-]+):/g)].map((m) => m[1]);
    for (const d of new Set(durations)) expect(block).toMatch(new RegExp(`${d}:\\s*0ms`));
    expect(read('src/styles/reset.css')).toMatch(/prefers-reduced-motion: reduce/);
  });
});

describe('self-hosted fonts (0024)', () => {
  const APPROVED = [
    'noto-serif-devanagari-devanagari-400-normal.woff2',
    'noto-serif-devanagari-devanagari-600-normal.woff2',
    'source-serif-4-latin-400-italic.woff2',
    'source-serif-4-latin-400-normal.woff2',
    'source-serif-4-latin-600-normal.woff2',
    'source-serif-4-latin-ext-400-italic.woff2',
    'source-serif-4-latin-ext-400-normal.woff2',
    'source-serif-4-latin-ext-600-normal.woff2',
  ];
  const fontsCss = stripComments(read('src/styles/fonts.css'));
  const faces = [...fontsCss.matchAll(/@font-face\s*\{([^}]*)\}/g)].map((m) => m[1] ?? '');
  const prop = (face: string, name: string) => new RegExp(`${name}:\\s*([^;]+);`).exec(face)?.[1]?.trim();

  it('ships exactly the approved files, with their licences', () => {
    const files = readdirSync('public/fonts').sort();
    expect(files.filter((f) => f.endsWith('.woff2'))).toEqual(APPROVED);
    expect(files).toContain('OFL-noto-serif-devanagari.txt');
    expect(files).toContain('OFL-source-serif-4.txt');
  });

  it('declares only the two content families, weights 400/600, italic only in Source Serif 4', () => {
    const web = faces.filter((f) => /url\(/.test(f));
    expect(web).toHaveLength(APPROVED.length);
    for (const face of web) {
      const family = prop(face, 'font-family');
      expect(["'Source Serif 4'", "'Noto Serif Devanagari'"]).toContain(family);
      expect(['400', '600']).toContain(prop(face, 'font-weight'));
      if (prop(face, 'font-style') === 'italic') {
        expect(family).toBe("'Source Serif 4'");
        expect(prop(face, 'font-weight')).toBe('400');
      }
      expect(prop(face, 'font-display')).toBe('swap');
      expect(prop(face, 'unicode-range')).toBeTruthy();
      const url = /url\('\/fonts\/([^']+)'\)/.exec(face)?.[1] ?? '';
      expect(APPROVED).toContain(url);
    }
  });

  it('uses only local platform fonts for the metric-matched fallbacks', () => {
    const fallbacks = faces.filter((f) => !/url\(/.test(f));
    expect(fallbacks.length).toBeGreaterThan(0);
    for (const face of fallbacks) {
      expect(prop(face, 'src')).toMatch(/^local\(/);
      expect(prop(face, 'size-adjust')).toMatch(/%$/);
    }
  });
});
