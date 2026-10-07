import { describe, expect, it } from 'vitest';
import { buildRoutes, hreflangLinks } from '../../src/lib/routes.ts';
import { computeVisibility } from '../../src/lib/visibility.ts';
import { siteConfig } from '../../site.config.ts';
import { ctx, entry, envs } from '../helpers.ts';

const both = entry('activities', 'both', {
  verification: 'supplied',
  type: 'event',
  date: { value: '1999' },
  title: { hi: 'शीर्षक', en: 'Title' },
});
const hiOnly = entry('activities', 'hi-only', {
  verification: 'supplied',
  type: 'event',
  date: { value: '1999' },
  title: { hi: 'शीर्षक' },
});

describe('bilingual routing (0002, 0021)', () => {
  const c = ctx(envs.deploy, [both, hiOnly]);
  const routes = buildRoutes(c.built, computeVisibility(c.built, siteConfig));
  const find = (path: string) => routes.find((r) => r.path === path);

  it('generates prefixed homes with x-default pointing to /hi/', () => {
    const hi = find('/hi/');
    expect(hi?.switchTo).toBe('/en/');
    expect(hreflangLinks(hi!, 'https://real-domain.in')).toEqual([
      { hreflang: 'hi', href: 'https://real-domain.in/hi/' },
      { hreflang: 'en', href: 'https://real-domain.in/en/' },
      { hreflang: 'x-default', href: 'https://real-domain.in/hi/' },
    ]);
  });

  it('pairs genuine equivalents with the same Latin slug', () => {
    expect(find('/hi/updates/both/')?.alternates).toEqual({ hi: '/hi/updates/both/', en: '/en/updates/both/' });
    expect(find('/en/updates/both/')?.kind).toBe('update');
  });

  it('serves a noindex notice page for a missing translation, outside hreflang and sitemaps', () => {
    const notice = find('/en/updates/hi-only/');
    expect(notice).toMatchObject({
      kind: 'notice',
      noindex: true,
      inSitemap: false,
      availableIn: 'hi',
      switchTo: '/hi/updates/hi-only/',
    });
    expect(hreflangLinks(notice!, 'https://real-domain.in')).toEqual([]);
    const original = find('/hi/updates/hi-only/');
    expect(original?.alternates).toEqual({ hi: '/hi/updates/hi-only/' });
    expect(hreflangLinks(original!, 'https://real-domain.in')).toEqual([]);
  });

  it('generates no item routes for a hidden section', () => {
    const empty = ctx(envs.deploy, []);
    const r = buildRoutes(empty.built, computeVisibility(empty.built, siteConfig));
    expect(r.map((x) => x.path)).toEqual(['/hi/', '/en/']);
  });
});
