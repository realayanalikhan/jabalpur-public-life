/** Synthetic test data builders. All text is [DEV]-free placeholder content that names no real person. */
import { readBuildEnv } from '../src/lib/env.ts';
import { siteConfig } from '../site.config.ts';
import type { CheckContext, Dataset, Entry } from '../src/validation/types.ts';

export const envs = {
  local: readBuildEnv({ SITE_ENV: 'local' }),
  preview: readBuildEnv({ SITE_ENV: 'preview' }),
  verify: readBuildEnv({ SITE_ENV: 'production', SITE_VERIFY_ONLY: '1' }),
  deploy: readBuildEnv({ SITE_ENV: 'production', SITE_URL: 'https://real-domain.in' }),
};

export function entry(collection: string, id: string, data: Record<string, unknown>, body?: string): Entry {
  return {
    collection,
    id,
    data: { status: 'published', originalLanguage: 'hi', translations: {}, themes: [], devFixture: false, ...data },
    body,
  };
}

export function ctx(env: CheckContext['env'], entries: Entry[], extra: Partial<CheckContext> = {}): CheckContext {
  const full: Dataset = {};
  for (const e of entries) (full[e.collection] ??= []).push(e);
  const statuses =
    env.siteEnv === 'production'
      ? ['published']
      : env.siteEnv === 'preview'
        ? ['published', 'review']
        : ['draft', 'review', 'published', 'archived'];
  const built: Dataset = {};
  for (const [k, v] of Object.entries(full)) built[k] = v.filter((e) => statuses.includes(String(e.data['status'])));
  return { env, config: siteConfig, full, built, registry: [], glossary: new Map(), ...extra };
}
