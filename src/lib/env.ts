/**
 * Build environment handling (scaffold plan §2, §6.2, §7; [0013]).
 *
 * - SITE_ENV = local | preview | production. **Unset means production rules** (safest default).
 * - SITE_VERIFY_ONLY=1 (production only): a CI verification build. Content is filtered exactly as in
 *   production; only launch-readiness items may be reported as blockers instead of failures.
 * - SITE_URL: never invented. Local and preview get reserved placeholders; a production deployment
 *   must supply the real domain (checked by I23).
 */
export type SiteEnv = 'local' | 'preview' | 'production';

export interface BuildEnv {
  siteEnv: SiteEnv;
  /** True when SITE_ENV was not set and production rules were applied by default. */
  defaulted: boolean;
  /** CI verification build (production rules, not a deployment). */
  verifyOnly: boolean;
  /** A production build that deploys the public site. */
  deployment: boolean;
  siteUrl: string;
  /** True when SITE_URL was not supplied and a placeholder is in use. */
  siteUrlMissing: boolean;
  siteUrlReserved: boolean;
}

const PLACEHOLDERS: Record<SiteEnv | 'verify', string> = {
  local: 'http://localhost:4321',
  preview: 'https://preview.invalid',
  verify: 'https://example.invalid',
  production: 'https://missing-site-url.invalid',
};

const RESERVED_SUFFIXES = ['.invalid', '.test', '.example', '.localhost', '.local'];
const RESERVED_HOSTS = ['localhost', '127.0.0.1', '[::1]', 'example.com', 'example.org', 'example.net'];

export function isReservedHost(url: string): boolean {
  let host: string;
  try {
    host = new URL(url).hostname.toLowerCase();
  } catch {
    return true;
  }
  return RESERVED_HOSTS.includes(host) || RESERVED_SUFFIXES.some((s) => host.endsWith(s));
}

export function readBuildEnv(source: Record<string, string | undefined> = process.env): BuildEnv {
  const raw = source['SITE_ENV']?.trim();
  if (raw !== undefined && raw !== '' && raw !== 'local' && raw !== 'preview' && raw !== 'production') {
    throw new Error(`SITE_ENV must be "local", "preview" or "production" (got "${raw}").`);
  }
  const siteEnv: SiteEnv = raw === 'local' || raw === 'preview' ? raw : 'production';
  const defaulted = raw === undefined || raw === '';
  const verifyFlag = source['SITE_VERIFY_ONLY'] === '1';
  if (verifyFlag && siteEnv !== 'production') {
    throw new Error('SITE_VERIFY_ONLY=1 is only valid with production rules.');
  }
  const verifyOnly = siteEnv === 'production' && verifyFlag;
  const deployment = siteEnv === 'production' && !verifyOnly;

  const supplied = source['SITE_URL']?.trim();
  const placeholderKey = verifyOnly ? 'verify' : siteEnv;
  const siteUrl = (supplied && supplied.length > 0 ? supplied : PLACEHOLDERS[placeholderKey]).replace(/\/+$/, '');
  return {
    siteEnv,
    defaulted,
    verifyOnly,
    deployment,
    siteUrl,
    siteUrlMissing: !supplied,
    siteUrlReserved: isReservedHost(siteUrl),
  };
}

/** Statuses that may be built in each environment ([0013]). */
export function buildableStatuses(env: Pick<BuildEnv, 'siteEnv'>): ReadonlySet<string> {
  switch (env.siteEnv) {
    case 'local':
      return new Set(['draft', 'review', 'published', 'archived']);
    case 'preview':
      return new Set(['review', 'published']);
    case 'production':
      return new Set(['published']);
  }
}

/** Development fixtures are loaded only in local builds (scaffold plan §15.1). */
export function fixturesAllowed(env: Pick<BuildEnv, 'siteEnv'>): boolean {
  return env.siteEnv === 'local';
}
