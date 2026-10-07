/**
 * Interface wording comes only from glossary keys (spec 09 §1; scaffold plan §9).
 *
 * Modes:
 * - strict  (production deployment, or verification after launch.ready): a missing, non-approved or
 *            deprecated key throws, failing the build (I14).
 * - record  (verification build before launch): the problem is recorded as a launch blocker and
 *            the text is still returned.
 * - lenient (preview / local): recorded as a warning; a visible ⟦key⟧ marker is returned when no
 *            text exists, which the post-build scan rejects in production output.
 */
export type Lang = 'hi' | 'en';
export type TranslatorMode = 'strict' | 'record' | 'lenient';

export interface GlossaryValue {
  en?: string | undefined;
  hi?: string | undefined;
  status: string;
  replacedBy?: string | undefined;
}

export interface TranslatorIssue {
  key: string;
  lang: Lang;
  reason: 'missing-key' | 'missing-language' | 'not-approved' | 'deprecated';
}

const APPROVED = new Set(['approved-editorial', 'family-confirmed']);
export const MISSING_MARK = '⟦';

export function createTranslator(
  glossary: ReadonlyMap<string, GlossaryValue>,
  mode: TranslatorMode,
  onIssue: (issue: TranslatorIssue) => void = () => {},
) {
  return function t(key: string, lang: Lang, vars?: Record<string, string>): string {
    const entry = glossary.get(key);
    let reason: TranslatorIssue['reason'] | null = null;
    if (!entry) reason = 'missing-key';
    else if (entry.status === 'deprecated') reason = 'deprecated';
    else if (!APPROVED.has(entry.status)) reason = 'not-approved';
    else if (!entry[lang]) reason = 'missing-language';

    if (reason) {
      const issue = { key, lang, reason };
      if (mode === 'strict') throw new Error(`I14 glossary: "${key}" (${lang}) ${reason}`);
      onIssue(issue);
    }
    const text = entry?.[lang];
    if (!text) return `${MISSING_MARK}${key}⟧`;
    return vars ? text.replace(/\{(\w+)\}/g, (m, name: string) => vars[name] ?? m) : text;
  };
}
