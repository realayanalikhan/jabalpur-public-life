/**
 * Source-text fingerprint for translation staleness (spec D §5; [0018] I4).
 * A translation records the fingerprint of the original-language text it was reviewed against.
 */
import { createHash } from 'node:crypto';

type Lang = 'hi' | 'en';

function isLocalised(v: unknown): v is { hi?: unknown; en?: unknown } {
  if (!v || typeof v !== 'object' || Array.isArray(v)) return false;
  const keys = Object.keys(v);
  return keys.length > 0 && keys.every((k) => k === 'hi' || k === 'en');
}

/** Collect the original-language strings of every localised field, in a stable order. */
export function collectLanguageText(value: unknown, lang: Lang, path = '', out: string[] = []): string[] {
  if (isLocalised(value)) {
    const text = value[lang];
    if (typeof text === 'string') out.push(`${path}=${text}`);
    return out;
  }
  if (Array.isArray(value)) {
    value.forEach((v, i) => collectLanguageText(v, lang, `${path}[${i}]`, out));
    return out;
  }
  if (value && typeof value === 'object') {
    for (const key of Object.keys(value).sort()) {
      if (key === 'translations' || key === 'translation' || key === 'internalNotes') continue;
      collectLanguageText((value as Record<string, unknown>)[key], lang, path ? `${path}.${key}` : key, out);
    }
  }
  return out;
}

export function fingerprint(parts: string[]): string {
  return createHash('sha256').update(parts.join('\n'), 'utf8').digest('hex').slice(0, 16);
}

/** Fingerprint of an entry's original-language text (localised fields + optional body). */
export function sourceFingerprint(data: Record<string, unknown>, originalLanguage: Lang, body?: string): string {
  const parts = collectLanguageText(data, originalLanguage);
  if (body !== undefined) parts.push(`body=${body.trim()}`);
  return fingerprint(parts);
}
