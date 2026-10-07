/**
 * One sitemap per language (scaffold plan §9; [0021]): only pages genuinely published in that
 * language, with alternates for genuine equivalents. Notice pages are never listed.
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import { getSite } from '../lib/site.ts';
import { LANGS, hreflangLinks, type Lang } from '../lib/routes.ts';

export const getStaticPaths: GetStaticPaths = () => LANGS.map((lang) => ({ params: { lang } }));

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

export const GET: APIRoute = async ({ params }) => {
  const site = await getSite();
  const lang = params['lang'] as Lang;
  const urls = site.routes
    .filter((r) => r.lang === lang && r.inSitemap && !r.noindex)
    .map((r) => {
      const alts = hreflangLinks(r, site.env.siteUrl)
        .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${esc(a.href)}"/>`)
        .join('\n');
      return `  <url>\n    <loc>${esc(site.env.siteUrl + r.path)}</loc>\n${alts}\n  </url>`;
    })
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
