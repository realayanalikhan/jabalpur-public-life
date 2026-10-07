/** Read a language value from a localised field ({ hi?, en? }) without guessing a fallback. */
export function localisedText(value: unknown, lang: 'hi' | 'en'): string | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;
  const v = (value as Record<string, unknown>)[lang];
  return typeof v === 'string' && v.length > 0 ? v : undefined;
}
