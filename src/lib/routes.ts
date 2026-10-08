/**
 * Route registry (scaffold plan §8–§9; [0002], [0021]). Pages, sitemaps and the language switch all
 * read from this one list, so equivalence, hreflang, notice pages and sitemaps stay consistent.
 *
 * - All routes are prefixed /hi/ or /en/; slugs are Latin entry ids shared by both languages.
 * - An equivalent route exists only where a real translation exists; otherwise the counterpart path
 *   is a noindex notice page, excluded from hreflang and sitemaps.
 */
import type { Dataset, Entry } from '../validation/types.ts';
import type { SectionKey } from './visibility.ts';
import { publishedLanguages } from '../validation/checks.ts';

export type Lang = 'hi' | 'en';
export const LANGS: readonly Lang[] = ['hi', 'en'];
export const otherLang = (l: Lang): Lang => (l === 'hi' ? 'en' : 'hi');

export const homePath = (lang: Lang) => `/${lang}/`;
export const updatePath = (lang: Lang, id: string) => `/${lang}/updates/${id}/`;

/** `dev`: local-only development pages (design specimen); never built for preview or production. */
export type RouteKind = 'home' | 'update' | 'notice' | 'dev';

export interface RouteDef {
  path: string;
  lang: Lang;
  kind: RouteKind;
  /** Entry id for item routes. */
  id?: string;
  /** Genuinely equivalent published pages, by language (used for hreflang). */
  alternates: Partial<Record<Lang, string>>;
  noindex: boolean;
  inSitemap: boolean;
  /** Target of the language switch: always the same path in the other language. */
  switchTo: string;
  /** For notice pages: the language the item is available in. */
  availableIn?: Lang;
}

export function buildRoutes(built: Dataset, visibility: Record<SectionKey, boolean>): RouteDef[] {
  const routes: RouteDef[] = [];
  for (const lang of LANGS) {
    routes.push({
      path: homePath(lang),
      lang,
      kind: 'home',
      alternates: { hi: homePath('hi'), en: homePath('en') },
      noindex: false,
      inSitemap: true,
      switchTo: homePath(otherLang(lang)),
    });
  }
  if (visibility.updates) {
    for (const e of built['activities'] ?? []) routes.push(...itemRoutes(e, updatePath));
  }
  return routes;
}

function itemRoutes(e: Entry, pathFor: (l: Lang, id: string) => string): RouteDef[] {
  const available = publishedLanguages(e);
  const alternates: Partial<Record<Lang, string>> = {};
  for (const l of available) alternates[l] = pathFor(l, e.id);
  return LANGS.map((lang) => {
    const path = pathFor(lang, e.id);
    const switchTo = pathFor(otherLang(lang), e.id);
    if (available.includes(lang)) {
      return { path, lang, kind: 'update' as const, id: e.id, alternates, noindex: false, inSitemap: true, switchTo };
    }
    const availableIn = available[0] ?? otherLang(lang);
    return {
      path,
      lang,
      kind: 'notice' as const,
      id: e.id,
      alternates: {},
      noindex: true,
      inSitemap: false,
      switchTo,
      availableIn,
    };
  });
}

/** hreflang links only for genuine equivalents; x-default points to the Hindi route ([0021]). */
export function hreflangLinks(route: RouteDef, siteUrl: string): Array<{ hreflang: string; href: string }> {
  const { hi, en } = route.alternates;
  if (!hi || !en || route.noindex) return [];
  return [
    { hreflang: 'hi', href: siteUrl + hi },
    { hreflang: 'en', href: siteUrl + en },
    { hreflang: 'x-default', href: siteUrl + hi },
  ];
}
