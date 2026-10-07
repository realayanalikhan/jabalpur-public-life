/**
 * Shared types for the integrity checks (scaffold plan §6). Plain data only, so the checks can be
 * unit-tested without Astro.
 */
import type { BuildEnv } from '../lib/env.ts';
import type { SiteConfig } from '../../site.config.ts';
import type { GlossaryValue } from '../i18n/glossary.ts';

export type CheckId =
  | 'I1'
  | 'I2'
  | 'I3'
  | 'I4'
  | 'I5'
  | 'I6'
  | 'I7'
  | 'I8'
  | 'I9'
  | 'I10'
  | 'I11'
  | 'I12'
  | 'I13'
  | 'I14'
  | 'I15'
  | 'I16'
  | 'I17'
  | 'I18'
  | 'I19'
  | 'I20'
  | 'I21'
  | 'I22'
  | 'I23';

/** fail = stops the build; warn = reported; blocker = launch-readiness item reported in CI verification builds before launch (§6.2). */
export type Severity = 'fail' | 'warn' | 'blocker';

export interface Issue {
  check: CheckId;
  severity: Severity;
  message: string;
  where?: string;
}

export interface Ref {
  collection: string;
  id: string;
}

export interface Entry {
  collection: string;
  id: string;
  data: Record<string, unknown>;
  body?: string | undefined;
}

export type Dataset = Record<string, Entry[]>;

export interface RegistryRecord {
  reference: string;
  collection: string;
  item: string;
  retired: boolean;
}

export interface CheckContext {
  env: BuildEnv;
  config: SiteConfig;
  /** Every loaded entry, regardless of status (fixtures only in local builds). */
  full: Dataset;
  /** Entries buildable in this environment. */
  built: Dataset;
  registry: RegistryRecord[];
  glossary: ReadonlyMap<string, GlossaryValue>;
}

/**
 * Per-environment outcome of a check (scaffold plan §6 table).
 * 'F' fail, 'W' warn, '-' not applicable, 'B' launch-readiness blocker (fail in deployment builds,
 * blocker in verification builds until launch.ready, warn in preview/local).
 */
export type Outcome = 'F' | 'W' | '-' | 'B';

export function severityFor(
  env: BuildEnv,
  config: SiteConfig,
  outcome: { production: Outcome; preview: Outcome; local: Outcome },
): Severity | null {
  const o = outcome[env.siteEnv];
  if (o === '-') return null;
  if (o === 'W') return 'warn';
  if (o === 'F') return 'fail';
  // 'B'
  if (env.siteEnv !== 'production') return 'warn';
  if (env.deployment || config.launch.ready) return 'fail';
  return 'blocker';
}
