/**
 * Date and number formatting per glossary §5 (spec 09). Western digits, month names from CLDR
 * hi-IN / en-IN (pinned by tests), no ordinals, no weekdays, never "unknown".
 */
export type Lang = 'hi' | 'en';

export interface ArchiveDateValue {
  value: string;
  approximate?: boolean | undefined;
  qualifier?: 'before' | 'after' | undefined;
  end?: string | undefined;
}

const LOCALE: Record<Lang, string> = { hi: 'hi-IN', en: 'en-IN' };

function formatPoint(value: string, lang: Lang): string {
  const [y, m, d] = value.split('-').map(Number) as [number, number | undefined, number | undefined];
  if (m === undefined) return String(y);
  const date = new Date(Date.UTC(y, m - 1, d ?? 1));
  const opts: Intl.DateTimeFormatOptions =
    d === undefined
      ? { month: 'long', year: 'numeric', timeZone: 'UTC' }
      : { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' };
  return new Intl.DateTimeFormat(LOCALE[lang], { ...opts, numberingSystem: 'latn' }).format(date);
}

/** "1998", "मार्च 1998", "7 अक्टूबर 2026", "लगभग 1998", "c. 1998", "1998–2003", "1998 से पहले"… */
export function formatArchiveDate(date: ArchiveDateValue, lang: Lang): string {
  let text = formatPoint(date.value, lang);
  if (date.end) {
    const end = formatPoint(date.end, lang);
    const single = !text.includes(' ') && !end.includes(' ');
    text = single ? `${text}–${end}` : `${text} – ${end}`;
  }
  if (date.qualifier === 'before') text = lang === 'hi' ? `${text} से पहले` : `before ${text}`;
  if (date.qualifier === 'after') text = lang === 'hi' ? `${text} के बाद` : `after ${text}`;
  if (date.approximate) text = lang === 'hi' ? `लगभग ${text}` : `c. ${text}`;
  return text;
}

/** "1990 का दशक" / "1990s". */
export function formatDecade(startYear: number, lang: Lang): string {
  return lang === 'hi' ? `${startYear} का दशक` : `${startYear}s`;
}

/** Indian digit grouping with Western digits: 2,50,000. */
export function formatNumber(n: number, lang: Lang): string {
  return new Intl.NumberFormat(LOCALE[lang], { numberingSystem: 'latn' }).format(n);
}
