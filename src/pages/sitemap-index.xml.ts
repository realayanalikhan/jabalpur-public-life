/** Sitemap index pointing to one sitemap per language (scaffold plan §9). */
import type { APIRoute } from 'astro';
import { getSite } from '../lib/site.ts';
import { LANGS } from '../lib/routes.ts';

export const GET: APIRoute = async () => {
  const { env } = await getSite();
  const items = LANGS.map((l) => `  <sitemap><loc>${env.siteUrl}/sitemap-${l}.xml</loc></sitemap>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</sitemapindex>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
