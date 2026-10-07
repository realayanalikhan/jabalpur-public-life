/**
 * Central site configuration. Every tunable value lives here (scaffold plan §2).
 * Values marked "initial" are implementation-time choices (spec H IP-06/IP-07) and may be tuned
 * in a reviewed pull request. Nothing here is person-specific.
 */
export const siteConfig = {
  locales: ['hi', 'en'] as const,
  /** Hindi is the default language ([0002]). `/` redirects to `/hi/` ([0021]). */
  defaultLocale: 'hi' as const,

  /** Minimum published items for a section to exist (spec B §4.1, [0003]); counted once per item ([0021] point 8). */
  visibility: {
    timeline: 5,
    roles: 1,
    work: 1,
    photographs: 6,
    documents: 3,
    press: 3,
    video: 1,
    updates: 1,
    events: 1,
    announcements: 1,
    collectionMinItems: 3,
  },

  /** Homepage "recent updates" module hides when the newest update is older than this ([0003]). */
  homepage: { recentUpdatesMaxAgeMonths: 6 },

  /** Level-1 labels always; Level-2 details on demand ([0026]). */
  provenance: { displayLevel: 'label-and-details' as 'label-only' | 'label-and-details' },

  /**
   * Cloudflare Web Analytics ([0016]). Off until a privacy notice page exists; I23 fails a production
   * deployment if this is enabled without one.
   */
  analytics: { enabled: false },

  /** Media storage ([0011], OD-21). Switching to object storage changes configuration only. */
  media: { storage: 'repo' as 'repo' | 'object-storage', objectStorageBaseUrl: null as string | null },

  /** Archive browsing ([0022]); initial values (IP-06). */
  archive: { decadeMergeMinimum: 3, lensValueMinimum: 2 },

  /**
   * Public reference identifiers ([0023]): opaque, non-sequential. The alphabet avoids 0/O and
   * 1/I/L; length is an initial choice (IP-07).
   */
  reference: { alphabet: '23456789ABCDEFGHJKMNPQRSTVWXYZ', length: 6 },

  /**
   * Launch readiness (scaffold plan §6.2). While false, CI verification builds list launch blockers
   * instead of failing on them. Deployment builds are always strict. Change only in a reviewed PR.
   */
  launch: { ready: false },

  /** Core pages that must be bilingual and reviewed (spec D §6; [0018]). Keys of the `pages` collection. */
  corePageKeys: ['how-we-verify', 'corrections', 'privacy', 'terms'] as const,
} as const;

export type SiteConfig = typeof siteConfig;
export type Lang = (typeof siteConfig.locales)[number];
