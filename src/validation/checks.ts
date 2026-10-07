/**
 * Content-level integrity checks run before pages are generated (scaffold plan §6, "V" checks).
 * Traceability (§6.1): I1–I8 = 0018 core; I11, I13 = 0018 supporting rules; others = binding
 * implementation rules from the decisions/spec named beside each check.
 *
 * Output-level checks (I2/I7/I10/I11/I14/I18/I19/I20 on the built site) live in post-build.ts;
 * repository checks (I7/I21/I22 on committed files) live in scripts/check-repo.ts.
 */
import { sourceFingerprint } from '../lib/hash.ts';
import { isValidReference } from '../lib/reference.ts';
import { computeVisibility } from '../lib/visibility.ts';
import type { CheckContext, Entry, Issue, Outcome, Ref } from './types.ts';
import { severityFor } from './types.ts';

type Lang = 'hi' | 'en';
const LANGS: Lang[] = ['hi', 'en'];
const CLAIM_COLLECTIONS = [
  'person',
  'roles',
  'initiatives',
  'activities',
  'timeline-events',
  'occasions',
  'coverage',
  'photos',
  'videos',
  'documents',
];
const ARCHIVE_ITEMS = ['photos', 'videos', 'documents', 'coverage'];

const where = (e: Entry) => `${e.collection}/${e.id}`;
const isObj = (v: unknown): v is Record<string, unknown> => Boolean(v) && typeof v === 'object' && !Array.isArray(v);

function* allEntries(d: Record<string, Entry[]>): Generator<Entry> {
  for (const list of Object.values(d)) yield* list;
}

/** Every {collection, id} reference inside an entry's data (Astro reference() output and item refs). */
export function findRefs(value: unknown, out: Ref[] = []): Ref[] {
  if (Array.isArray(value)) value.forEach((v) => findRefs(v, out));
  else if (isObj(value)) {
    const keys = Object.keys(value);
    if (keys.length === 2 && typeof value['collection'] === 'string' && typeof value['id'] === 'string') {
      out.push({ collection: value['collection'], id: value['id'] });
    } else for (const k of keys) findRefs(value[k], out);
  }
  return out;
}

function localised(v: unknown): { hi?: string; en?: string } | undefined {
  return isObj(v) ? (v as { hi?: string; en?: string }) : undefined;
}

/** Languages in which an item has editorial text (its "published languages"). */
export function publishedLanguages(e: Entry): Lang[] {
  const d = e.data;
  const field =
    localised(d['title']) ??
    localised(d['caption']) ??
    localised(d['displayName']) ??
    localised(d['label']) ??
    localised(d['name']);
  if (e.collection === 'pages') return [d['lang'] as Lang];
  if (!field) return [...LANGS];
  const langs = LANGS.filter((l) => Boolean(field[l]));
  return langs.length ? langs : [...LANGS];
}

export function runContentChecks(ctx: CheckContext): Issue[] {
  const issues: Issue[] = [];
  const { env, config, full, built } = ctx;
  const add = (
    check: Issue['check'],
    o: { production: Outcome; preview: Outcome; local: Outcome },
    message: string,
    w?: string,
  ) => {
    const severity = severityFor(env, config, o);
    if (severity) issues.push(w === undefined ? { check, severity, message } : { check, severity, message, where: w });
  };
  const index = new Map<string, Entry>();
  for (const e of allEntries(full)) index.set(`${e.collection}/${e.id}`, e);
  const builtKeys = new Set([...allEntries(built)].map((e) => `${e.collection}/${e.id}`));
  const isPublished = (e: Entry) => e.data['status'] === 'published';

  // I2 — 0018: development fixture data must not be included at all in preview/production — checked on
  // every loaded entry (not just buildable ones), so a misplaced fixture fails loudly instead of being
  // silently filtered out.
  for (const e of allEntries(full)) {
    if (e.data['devFixture'] === true) {
      add('I2', { production: 'F', preview: 'F', local: '-' }, 'Development fixture data included.', where(e));
    }
  }

  for (const e of allEntries(built)) {
    const d = e.data;
    const status = d['status'];
    const verification = d['verification'];

    // I1 — 0018: unverified content must never be publishable.
    if (CLAIM_COLLECTIONS.includes(e.collection) && verification === 'unverified') {
      if (status === 'published')
        add('I1', { production: 'F', preview: 'F', local: 'W' }, 'Unverified item has status "published".', where(e));
      else if (status === 'review')
        add(
          'I1',
          { production: '-', preview: 'W', local: 'W' },
          'Unverified item in review (preview only, shown with marker).',
          where(e),
        );
    }

    // I5 — 0018: verified requires a source.
    if (verification === 'verified' && (!Array.isArray(d['sources']) || d['sources'].length === 0)) {
      add('I5', { production: 'F', preview: 'F', local: 'F' }, '"verified" without any source.', where(e));
    }

    // I6 — 0018: broken references; published items may only reference published entries.
    for (const r of findRefs(d)) {
      const target = index.get(`${r.collection}/${r.id}`);
      if (!target)
        add(
          'I6',
          { production: 'F', preview: 'F', local: 'W' },
          `Reference to missing ${r.collection}/${r.id}.`,
          where(e),
        );
      else if (!builtKeys.has(`${r.collection}/${r.id}`)) {
        add(
          'I6',
          { production: 'F', preview: 'F', local: 'W' },
          `Reference to ${r.collection}/${r.id}, which is not buildable here (status ${String(target.data['status'])}).`,
          where(e),
        );
      } else if (isPublished(e) && !isPublished(target)) {
        add(
          'I6',
          { production: 'F', preview: '-', local: 'W' },
          `Published item references unpublished ${r.collection}/${r.id}.`,
          where(e),
        );
      }
    }

    // I8 — 0018: accessibility metadata.
    if (e.collection === 'photos') {
      const alt = localised(d['alt']) ?? {};
      const langs = localised(d['caption']) ? publishedLanguages(e) : LANGS;
      for (const l of langs)
        if (!alt[l])
          add('I8', { production: 'F', preview: 'W', local: 'W' }, `Photo lacks alt text in "${l}".`, where(e));
    }
    if (e.collection === 'videos' && (!Array.isArray(d['captions']) || d['captions'].length === 0)) {
      add('I8', { production: 'F', preview: 'W', local: 'W' }, 'Video has no captions.', where(e));
    }

    // I13 — 0018 supporting rule: machine-draft translations never published.
    const tr = isObj(d['translations']) ? (d['translations'] as Record<string, { state?: string }>) : {};
    for (const l of publishedLanguages(e)) {
      if (l !== d['originalLanguage'] && tr[l]?.state === 'machine-draft' && status === 'published') {
        add(
          'I13',
          { production: 'F', preview: 'W', local: 'W' },
          `Machine-draft "${l}" translation published.`,
          where(e),
        );
      }
    }

    // I15 — spec G §4: unredacted documents cannot be published or reviewed.
    if (e.collection === 'documents' && d['redactionStatus'] === 'pending') {
      add('I15', { production: 'F', preview: 'F', local: 'W' }, 'Document redaction incomplete.', where(e));
    }

    // I16 — spec G §6: consent for minors and private individuals must be recorded.
    if (e.collection === 'photos') {
      const c = isObj(d['consent']) ? d['consent'] : {};
      if (c['minors'] === 'unknown' || c['privateIndividuals'] === 'unknown') {
        add(
          'I16',
          { production: 'F', preview: 'F', local: 'W' },
          'Consent for minors/private individuals not recorded.',
          where(e),
        );
      }
    }

    // I17 — 0006: no full reproduction without established rights.
    if (['photos', 'documents', 'videos'].includes(e.collection)) {
      const r = isObj(d['rights']) ? d['rights'] : {};
      if (r['status'] === 'unknown' || r['status'] === 'citation-only' || r['fullReproductionAllowed'] !== true) {
        add(
          'I17',
          { production: 'F', preview: 'F', local: 'W' },
          'Media shown without rights allowing reproduction.',
          where(e),
        );
      }
    }
    if (e.collection === 'coverage' && d['scanDocument']) {
      const r = isObj(d['rights']) ? d['rights'] : {};
      if (r['fullReproductionAllowed'] !== true)
        add(
          'I17',
          { production: 'F', preview: 'F', local: 'W' },
          'Coverage scan without reproduction rights (show as citation).',
          where(e),
        );
    }

    // I21 — spec G §4: personal-data patterns in content text (contact values excluded).
    if (e.collection !== 'contact-methods') {
      const text =
        JSON.stringify(d, (k, v) =>
          k === 'internalNotes' || k === 'image' || k === 'pages' || k === 'poster' ? undefined : v,
        ) + (e.body ?? '');
      const aadhaar = /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/;
      const mobile = /(?:\+91[\s-]?)?\b[6-9]\d{9}\b/;
      const pan = /\b[A-Z]{5}\d{4}[A-Z]\b/;
      if (aadhaar.test(text) || mobile.test(text) || pan.test(text)) {
        add(
          'I21',
          { production: 'F', preview: 'F', local: 'W' },
          'Text contains an ID- or phone-number-like pattern.',
          where(e),
        );
      }
    }
  }

  // I9 — 0020: a TimelineEvent must not duplicate an Occasion that is on the Timeline.
  const onTimeline = (built['occasions'] ?? []).filter((o) => o.data['onTimeline'] === true);
  for (const te of built['timeline-events'] ?? []) {
    const teDate = (te.data['date'] as { value?: string } | undefined)?.value;
    const teTitle = localised(te.data['title']) ?? {};
    for (const o of onTimeline) {
      const oTitle = localised(o.data['title']) ?? {};
      if (
        (o.data['date'] as { value?: string } | undefined)?.value === teDate &&
        LANGS.some((l) => teTitle[l] && teTitle[l] === oTitle[l])
      ) {
        add(
          'I9',
          { production: 'F', preview: 'F', local: 'W' },
          `TimelineEvent duplicates on-timeline Occasion ${o.id}; use the Occasion only.`,
          where(te),
        );
      }
    }
  }

  // I12 — 0023: reference identifiers.
  const seen = new Map<string, string>();
  const registry = new Map(ctx.registry.map((r) => [r.reference, r]));
  for (const c of ARCHIVE_ITEMS) {
    for (const e of built[c] ?? []) {
      const ref = e.data['reference'];
      if (typeof ref !== 'string' || ref === '') {
        if (isPublished(e))
          add(
            'I12',
            { production: 'F', preview: 'F', local: 'W' },
            'Published archive item has no public reference.',
            where(e),
          );
        continue;
      }
      if (!isValidReference(ref, config.reference))
        add(
          'I12',
          { production: 'F', preview: 'F', local: 'F' },
          `Reference "${ref}" has an invalid format.`,
          where(e),
        );
      const dup = seen.get(ref);
      if (dup)
        add('I12', { production: 'F', preview: 'F', local: 'F' }, `Reference "${ref}" also used by ${dup}.`, where(e));
      seen.set(ref, where(e));
      const reg = registry.get(ref);
      if (!reg)
        add(
          'I12',
          { production: 'F', preview: 'F', local: 'W' },
          `Reference "${ref}" is not in the registry (pnpm ref:new).`,
          where(e),
        );
      else if (reg.retired)
        add(
          'I12',
          { production: 'F', preview: 'F', local: 'F' },
          `Reference "${ref}" is retired and must not be reused.`,
          where(e),
        );
      else if (reg.collection !== c || reg.item !== e.id)
        add(
          'I12',
          { production: 'F', preview: 'F', local: 'F' },
          `Reference "${ref}" is registered to ${reg.collection}/${reg.item}.`,
          where(e),
        );
    }
  }

  // I14 — spec 09: glossary hygiene (usage is enforced at render time by the translator).
  for (const [key, g] of ctx.glossary) {
    if (g.status === 'deprecated' && !g.replacedBy)
      add(
        'I14',
        { production: 'F', preview: 'W', local: 'W' },
        `Deprecated glossary key "${key}" names no replacement.`,
      );
  }

  // I3 / I4 — 0018: core translations present, reviewed and not stale.
  const pages = built['pages'] ?? [];
  for (const key of config.corePageKeys) {
    const byLang = new Map(pages.filter((p) => p.data['key'] === key).map((p) => [p.data['lang'] as Lang, p]));
    if (byLang.size === 0) {
      add(
        'I3',
        { production: 'B', preview: 'W', local: 'W' },
        `Core page "${key}" does not exist yet (launch readiness).`,
      );
      continue;
    }
    const original =
      [...byLang.values()].find((p) => p.data['lang'] === p.data['originalLanguage']) ?? [...byLang.values()][0];
    if (!original) continue;
    for (const l of LANGS) {
      const p = byLang.get(l);
      if (!p) {
        add('I3', { production: 'F', preview: 'W', local: 'W' }, `Core page "${key}" is missing its "${l}" version.`);
        continue;
      }
      if (p === original) continue;
      const t = isObj(p.data['translation']) ? (p.data['translation'] as { state?: string; sourceHash?: string }) : {};
      if (t.state !== 'reviewed')
        add(
          'I3',
          { production: 'F', preview: 'W', local: 'W' },
          `Core page "${key}" (${l}) translation is not reviewed.`,
          where(p),
        );
      const expected = sourceFingerprint(
        { title: { [original.data['lang'] as Lang]: original.data['title'] } },
        original.data['lang'] as Lang,
        original.body ?? '',
      );
      if (t.sourceHash !== expected)
        add(
          'I4',
          { production: 'F', preview: 'W', local: 'W' },
          `Core page "${key}" (${l}) translation is stale (expected sourceHash ${expected}).`,
          where(p),
        );
    }
  }
  const person = (built['person'] ?? [])[0];
  if (person) {
    const orig = (person.data['originalLanguage'] as Lang) ?? 'hi';
    const other: Lang = orig === 'hi' ? 'en' : 'hi';
    for (const field of ['displayName', 'shortBio']) {
      const v = localised(person.data[field]);
      if (v && (!v.hi || !v.en))
        add(
          'I3',
          { production: 'F', preview: 'W', local: 'W' },
          `Person ${field} is not present in both languages.`,
          where(person),
        );
    }
    const tr = isObj(person.data['translations'])
      ? (person.data['translations'] as Record<string, { state?: string; sourceHash?: string }>)
      : {};
    if (tr[other]?.state !== 'reviewed')
      add(
        'I3',
        { production: 'F', preview: 'W', local: 'W' },
        `Person "${other}" translation is not reviewed.`,
        where(person),
      );
    const expected = sourceFingerprint(person.data, orig);
    if (tr[other]?.sourceHash !== expected)
      add(
        'I4',
        { production: 'F', preview: 'W', local: 'W' },
        `Person "${other}" translation is stale (expected sourceHash ${expected}).`,
        where(person),
      );
  }

  // I23 — production configuration and launch prerequisites (spec A FR-S2, §5.2; 0013; 0016).
  if (env.siteEnv === 'production') {
    if (env.deployment && env.defaulted)
      add(
        'I23',
        { production: 'F', preview: '-', local: '-' },
        'SITE_ENV must be set explicitly to "production" for a deployment build.',
      );
    if (env.siteUrlMissing || env.siteUrlReserved)
      add(
        'I23',
        { production: 'B', preview: '-', local: '-' },
        `SITE_URL must be the real configured domain (now "${env.siteUrl}").`,
      );
    if (config.analytics.enabled && !pages.some((p) => p.data['key'] === 'privacy')) {
      add('I23', { production: 'F', preview: '-', local: '-' }, 'Analytics enabled without a privacy notice page.');
    }
    const vis = computeVisibility(built, config);
    const bio = person ? localised(person.data['shortBio']) : undefined;
    const launch: Array<[boolean, string]> = [
      [Boolean(person), 'No published person entry.'],
      [person?.data['nameConfirmation'] === 'family-confirmed', 'Public name is not family-confirmed.'],
      [Boolean(person?.data['portrait']), 'No approved portrait.'],
      [Boolean(bio?.hi && bio?.en), 'Short biography missing in a language.'],
      [vis.connect, 'No public contact method or official profile.'],
      [vis.roles || vis.photographs, 'No substantive section (roles or photographs).'],
    ];
    for (const [ok, msg] of launch)
      if (!ok) add('I23', { production: 'B', preview: '-', local: '-' }, `Launch prerequisite (spec A §5.2): ${msg}`);
  }

  return issues;
}
