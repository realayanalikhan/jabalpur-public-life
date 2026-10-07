/**
 * Build-time site loader. Loads every collection, filters it for the environment, runs the
 * content-level integrity checks (failing the build on any failure), and writes the manifest used
 * by the post-build checks. Memoised: runs once per build.
 */
import { getCollection } from 'astro:content';
import { mkdirSync, writeFileSync } from 'node:fs';
import { siteConfig } from '../../site.config.ts';
import { buildableStatuses, readBuildEnv, type BuildEnv } from './env.ts';
import { computeVisibility, SECTION_PATHS, type SectionKey } from './visibility.ts';
import { buildRoutes, LANGS, type Lang, type RouteDef } from './routes.ts';
import { runContentChecks } from '../validation/checks.ts';
import { reportIssues } from '../validation/report.ts';
import type { Dataset, Entry, RegistryRecord } from '../validation/types.ts';
import { MANIFEST_DIR, MANIFEST_FILE, type IntegrityManifest } from '../validation/manifest.ts';
import { createTranslator, type GlossaryValue, type TranslatorMode } from '../i18n/glossary.ts';

const CONTENT_COLLECTIONS = [
  'person',
  'roles',
  'organisations',
  'places',
  'initiatives',
  'activities',
  'timeline-events',
  'occasions',
  'coverage',
  'sources',
  'photos',
  'videos',
  'documents',
  'collections',
  'themes',
  'social-links',
  'contact-methods',
  'pages',
] as const;

export interface Site {
  env: BuildEnv;
  config: typeof siteConfig;
  built: Dataset;
  visibility: Record<SectionKey, boolean>;
  routes: RouteDef[];
  person: Entry | undefined;
  t: ReturnType<typeof createTranslator>;
}

let cached: Promise<Site> | undefined;
export function getSite(): Promise<Site> {
  return (cached ??= loadSite());
}

async function loadSite(): Promise<Site> {
  const env = readBuildEnv();
  const full: Dataset = {};
  for (const name of CONTENT_COLLECTIONS) {
    const items = await getCollection(name);
    full[name] = items.map((e) => ({
      collection: name,
      id: e.id,
      data: e.data as Record<string, unknown>,
      body: 'body' in e ? (e.body as string | undefined) : undefined,
    }));
  }
  const statuses = buildableStatuses(env);
  const built: Dataset = {};
  for (const [name, items] of Object.entries(full)) {
    built[name] = items.filter(
      (e) => statuses.has(String(e.data['status'])) && (env.siteEnv === 'local' || e.data['devFixture'] !== true),
    );
  }

  const glossary = new Map<string, GlossaryValue>();
  for (const g of await getCollection('glossary')) glossary.set(g.id, g.data);
  const registry: RegistryRecord[] = [];
  for (const name of ['referenceRegistry', 'devReferenceRegistry'] as const) {
    for (const r of await getCollection(name)) registry.push({ reference: r.id, ...r.data });
  }

  const issues = runContentChecks({ env, config: siteConfig, full, built, registry, glossary });
  const visibility = computeVisibility(built, siteConfig);
  const routes = buildRoutes(built, visibility);

  const manifest: IntegrityManifest = {
    nonPublishedMarkers: markersOfUnbuilt(full, built),
    internalStrings: internalStrings(full),
    hiddenSectionPaths: (Object.keys(visibility) as SectionKey[])
      .filter((k) => !visibility[k])
      .flatMap((k) => LANGS.map((l) => `/${l}/${SECTION_PATHS[k]}`)),
    noticePaths: routes.filter((r) => r.kind === 'notice').map((r) => r.path),
    glossaryIssues: [],
  };
  const writeManifest = () => {
    mkdirSync(MANIFEST_DIR, { recursive: true });
    writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2));
  };
  writeManifest();
  reportIssues(`content (${env.siteEnv}${env.verifyOnly ? ', verification' : ''})`, issues);

  const mode: TranslatorMode = env.deployment
    ? 'strict'
    : env.verifyOnly
      ? siteConfig.launch.ready
        ? 'strict'
        : 'record'
      : 'lenient';
  const seen = new Set<string>();
  const t = createTranslator(glossary, mode, (issue) => {
    const key = `${issue.key}|${issue.lang}|${issue.reason}`;
    if (seen.has(key)) return;
    seen.add(key);
    manifest.glossaryIssues.push(issue);
    writeManifest();
  });

  return { env, config: siteConfig, built, visibility, routes, person: (built['person'] ?? [])[0], t };
}

function strings(v: unknown, out: string[] = []): string[] {
  if (typeof v === 'string') out.push(v);
  else if (Array.isArray(v)) v.forEach((x) => strings(x, out));
  else if (v && typeof v === 'object') Object.values(v).forEach((x) => strings(x, out));
  return out;
}

/** Distinctive text of entries that are not built here, for the I10 leak scan. */
function markersOfUnbuilt(full: Dataset, built: Dataset): string[] {
  const builtKeys = new Set(
    Object.values(built)
      .flat()
      .map((e) => `${e.collection}/${e.id}`),
  );
  const out = new Set<string>();
  for (const e of Object.values(full).flat()) {
    if (builtKeys.has(`${e.collection}/${e.id}`)) continue;
    for (const field of ['title', 'displayName', 'caption', 'headline']) {
      for (const s of strings(e.data[field])) if (s.length >= 8) out.add(s);
    }
    const ref = e.data['reference'];
    if (typeof ref === 'string') out.add(ref);
  }
  return [...out];
}

/** internalNotes and internal source titles, for the I11 leak scan. */
function internalStrings(full: Dataset): string[] {
  const out = new Set<string>();
  for (const e of Object.values(full).flat()) {
    const note = e.data['internalNotes'];
    if (typeof note === 'string' && note.trim().length >= 8) out.add(note.trim());
    if (e.collection === 'sources' && e.data['visibility'] === 'internal') {
      const title = e.data['title'];
      if (typeof title === 'string' && title.length >= 8) out.add(title);
    }
  }
  return [...out];
}

export function routesOf(site: Site, kinds: RouteDef['kind'][]): RouteDef[] {
  return site.routes.filter((r) => kinds.includes(r.kind));
}

export type { Lang };
