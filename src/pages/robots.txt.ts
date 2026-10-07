/**
 * robots.txt (scaffold plan §7): production allows indexing and lists the sitemap index;
 * preview and local disallow everything.
 */
import type { APIRoute } from 'astro';
import { getSite } from '../lib/site.ts';

export const GET: APIRoute = async () => {
  const { env } = await getSite();
  const body =
    env.siteEnv === 'production'
      ? `User-agent: *\nAllow: /\n\nSitemap: ${env.siteUrl}/sitemap-index.xml\n`
      : 'User-agent: *\nDisallow: /\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
