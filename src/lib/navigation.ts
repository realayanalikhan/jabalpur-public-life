/**
 * Site navigation model (spec B §1; design 04 H0 and H9; decision 0003).
 *
 * An item appears only when its section is visible (hidden sections are removed from navigation
 * entirely, spec B §4) AND its landing page is actually built for that language. A link therefore
 * never points to a page that does not exist (I20) or to a hidden section (I19). Until the pages are
 * built, the lists are simply empty and the header and footer show no navigation.
 */
import type { Lang, RouteDef } from './routes.ts';
import type { SectionKey } from './visibility.ts';

export interface NavDef {
  /** Glossary key for the label. */
  key: string;
  /** Path below /{lang}/, with a trailing slash. */
  path: string;
  /** Visibility gate; undefined for pages that are not person-specific sections (e.g. policies). */
  section?: SectionKey;
}

export interface NavItem {
  key: string;
  /** Root-relative path (without the base path). */
  href: string;
  current: boolean;
}

/** Primary sections, in the order of spec B §1. About has no visibility key: it exists when its page is built. */
export const PRIMARY_NAV: readonly NavDef[] = [
  { key: 'nav.about', path: 'about/' },
  { key: 'nav.public-life', path: 'public-life/', section: 'publicLife' },
  { key: 'nav.archive', path: 'archive/', section: 'archive' },
  { key: 'nav.updates', path: 'updates/', section: 'updates' },
  { key: 'nav.connect', path: 'connect/', section: 'connect' },
];

/** Utility group shown in the mobile menu (spec B §1, "Mobile navigation"). */
export const MENU_UTILITY_NAV: readonly NavDef[] = [
  { key: 'nav.press-kit', path: 'press-kit/', section: 'pressKit' },
  { key: 'nav.how-we-verify', path: 'how-we-verify/' },
];

/** Utility and trust pages in the footer (spec B §1, "Footer"; design 04 H9). */
export const FOOTER_UTILITY_NAV: readonly NavDef[] = [
  { key: 'nav.press-kit', path: 'press-kit/', section: 'pressKit' },
  { key: 'nav.how-we-verify', path: 'how-we-verify/' },
  { key: 'nav.corrections', path: 'corrections/' },
  { key: 'nav.privacy', path: 'privacy/' },
  { key: 'nav.terms', path: 'terms/' },
];

export function buildNav(
  defs: readonly NavDef[],
  lang: Lang,
  routes: readonly Pick<RouteDef, 'path'>[],
  visibility: Partial<Record<SectionKey, boolean>>,
  currentPath: string,
): NavItem[] {
  const built = new Set(routes.map((r) => r.path));
  return defs
    .filter((d) => d.section === undefined || visibility[d.section] === true)
    .map((d) => ({ key: d.key, href: `/${lang}/${d.path}` }))
    .filter((d) => built.has(d.href))
    .map((d) => ({ ...d, current: currentPath === d.href || currentPath.startsWith(d.href) }));
}
