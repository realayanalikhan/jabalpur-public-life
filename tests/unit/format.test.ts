import { describe, expect, it } from 'vitest';
import { formatArchiveDate, formatDecade, formatNumber } from '../../src/i18n/format.ts';

describe('glossary §5 date and number conventions', () => {
  it('pins the CLDR hi-IN month names approved in the glossary (§5.1)', () => {
    const months = Array.from({ length: 12 }, (_, i) =>
      formatArchiveDate({ value: `2026-${String(i + 1).padStart(2, '0')}` }, 'hi').replace(/ 2026$/, ''),
    );
    expect(months).toEqual([
      'जनवरी',
      'फ़रवरी',
      'मार्च',
      'अप्रैल',
      'मई',
      'जून',
      'जुलाई',
      'अगस्त',
      'सितंबर',
      'अक्टूबर',
      'नवंबर',
      'दिसंबर',
    ]);
  });

  it('formats each precision with Western digits and no ordinals', () => {
    expect(formatArchiveDate({ value: '1998' }, 'hi')).toBe('1998');
    expect(formatArchiveDate({ value: '1998-03' }, 'hi')).toBe('मार्च 1998');
    expect(formatArchiveDate({ value: '2026-10-07' }, 'hi')).toBe('7 अक्टूबर 2026');
    expect(formatArchiveDate({ value: '2026-10-07' }, 'en')).toBe('7 October 2026');
  });

  it('formats approximate, before, after and ranges', () => {
    expect(formatArchiveDate({ value: '1998', approximate: true }, 'hi')).toBe('लगभग 1998');
    expect(formatArchiveDate({ value: '1998', approximate: true }, 'en')).toBe('c. 1998');
    expect(formatArchiveDate({ value: '1998', qualifier: 'before' }, 'hi')).toBe('1998 से पहले');
    expect(formatArchiveDate({ value: '1998', qualifier: 'after' }, 'en')).toBe('after 1998');
    expect(formatArchiveDate({ value: '1998', end: '2003' }, 'en')).toBe('1998–2003');
    expect(formatArchiveDate({ value: '1998-03-07', end: '1998-04-12' }, 'en')).toBe('7 March 1998 – 12 April 1998');
  });

  it('formats decades and Indian digit grouping', () => {
    expect(formatDecade(1990, 'hi')).toBe('1990 का दशक');
    expect(formatDecade(1990, 'en')).toBe('1990s');
    expect(formatNumber(250000, 'hi')).toBe('2,50,000');
    expect(formatNumber(250000, 'en')).toBe('2,50,000');
  });
});
