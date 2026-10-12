import { describe, expect, it } from 'vitest';
import { FOOTER_UTILITY_NAV, PRIMARY_NAV, buildNav } from '../../src/lib/navigation.ts';

const routes = (paths: string[]) => paths.map((path) => ({ path }));

describe('navigation model', () => {
  it('is empty when no section pages are built (the current state)', () => {
    expect(buildNav(PRIMARY_NAV, 'hi', routes(['/hi/', '/en/']), {}, '/hi/')).toEqual([]);
  });

  it('lists only sections that are visible AND built, in spec order', () => {
    const r = routes(['/hi/', '/hi/archive/', '/hi/updates/', '/hi/about/', '/hi/connect/']);
    const items = buildNav(PRIMARY_NAV, 'hi', r, { archive: true, updates: true, connect: false }, '/hi/');
    expect(items.map((i) => i.key)).toEqual(['nav.about', 'nav.archive', 'nav.updates']);
    expect(items.map((i) => i.href)).toEqual(['/hi/about/', '/hi/archive/', '/hi/updates/']);
  });

  it('drops a visible section whose page is not built, and a built page whose section is hidden', () => {
    expect(buildNav(PRIMARY_NAV, 'en', routes(['/en/']), { archive: true }, '/en/')).toEqual([]);
    expect(buildNav(PRIMARY_NAV, 'en', routes(['/en/archive/']), { archive: false }, '/en/')).toEqual([]);
  });

  it('marks the current section, including pages inside it', () => {
    const r = routes(['/en/archive/', '/en/updates/']);
    const v = { archive: true, updates: true };
    const inside = buildNav(PRIMARY_NAV, 'en', r, v, '/en/archive/photographs/x/');
    expect(inside.filter((i) => i.current).map((i) => i.key)).toEqual(['nav.archive']);
  });

  it('shows policy pages in the footer only once they exist', () => {
    expect(buildNav(FOOTER_UTILITY_NAV, 'hi', routes(['/hi/']), {}, '/hi/')).toEqual([]);
    const items = buildNav(FOOTER_UTILITY_NAV, 'hi', routes(['/hi/privacy/', '/hi/terms/']), {}, '/hi/');
    expect(items.map((i) => i.key)).toEqual(['nav.privacy', 'nav.terms']);
  });
});
