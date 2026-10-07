import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { generateReference, isValidReference } from '../../src/lib/reference.ts';
import { createTranslator, type GlossaryValue, type TranslatorIssue } from '../../src/i18n/glossary.ts';
import { siteConfig } from '../../site.config.ts';

const fmt = siteConfig.reference;

describe('public reference identifiers (0023)', () => {
  it('accepts opaque codes and rejects number-like, wrong-length or ambiguous ones', () => {
    expect(isValidReference('K7QM4X', fmt)).toBe(true);
    expect(isValidReference('234567', fmt)).toBe(false); // number-like
    expect(isValidReference('K7QM4', fmt)).toBe(false); // length
    expect(isValidReference('K0QM4X', fmt)).toBe(false); // 0 is not in the alphabet
    expect(isValidReference('KIQM4X', fmt)).toBe(false); // I is not in the alphabet
  });

  it('generates unused valid codes', () => {
    const taken = new Set(['K7QM4X']);
    for (let i = 0; i < 200; i++) {
      const ref = generateReference(fmt, taken);
      expect(isValidReference(ref, fmt)).toBe(true);
      expect(taken.has(ref)).toBe(false);
      taken.add(ref);
    }
  });
});

describe('glossary translator (spec 09; I14)', () => {
  const g = new Map<string, GlossaryValue>([
    ['ok', { en: 'Archive', hi: 'अभिलेखागार', status: 'approved-editorial' }],
    ['rec', { en: 'X', hi: 'Y', status: 'recommended' }],
    ['tpl', { en: 'Reference {ref}', hi: 'संदर्भ {ref}', status: 'approved-editorial' }],
    ['enonly', { en: 'English', status: 'approved-editorial' }],
  ]);

  it('returns approved wording and interpolates templates', () => {
    const t = createTranslator(g, 'strict');
    expect(t('ok', 'hi')).toBe('अभिलेखागार');
    expect(t('tpl', 'en', { ref: 'K7QM4X' })).toBe('Reference K7QM4X');
  });

  it('strict mode throws for missing, unapproved or untranslated keys', () => {
    const t = createTranslator(g, 'strict');
    expect(() => t('nope', 'hi')).toThrow(/I14/);
    expect(() => t('rec', 'hi')).toThrow(/not-approved/);
    expect(() => t('enonly', 'hi')).toThrow(/missing-language/);
  });

  it('record/lenient modes report issues and mark missing text', () => {
    const issues: TranslatorIssue[] = [];
    const t = createTranslator(g, 'lenient', (i) => issues.push(i));
    expect(t('nope', 'hi')).toContain('⟦nope⟧');
    expect(issues).toEqual([{ key: 'nope', lang: 'hi', reason: 'missing-key' }]);
  });

  it('every shipped glossary entry is approved editorial', () => {
    const lines = readFileSync('src/content/glossary/glossary.yaml', 'utf8')
      .split('\n')
      .filter((l) => /^[a-z].*:\s*\{/.test(l));
    expect(lines.length).toBeGreaterThan(80);
    for (const l of lines) expect(l).toContain('status: approved-editorial');
  });

  it('keeps the terminology fixed in the final review', () => {
    const y = readFileSync('src/content/glossary/glossary.yaml', 'utf8');
    for (const term of [
      'गतिविधियाँ',
      'हम जानकारी कैसे जाँचते हैं',
      'मीडिया में',
      'उपयोग की शर्तें और सामग्री हटाने का अनुरोध',
      'अभिलेखागार',
      'साक्षात्कार',
      'स्रोत से पुष्ट',
    ]) {
      expect(y).toContain(term);
    }
  });
});
