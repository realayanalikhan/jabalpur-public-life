/**
 * Content collections (scaffold plan §4; decisions 0004, 0010, 0020, 0023).
 *
 * - Real content lives in `src/content/<collection>/`.
 * - Development fixtures live in `src/content/_dev/<collection>/` and are loaded ONLY when
 *   SITE_ENV=local (scaffold plan §15.1). Preview and production never see them.
 * - Every person-specific field is optional at schema level (spec C §1); publish rules are enforced
 *   by the integrity checks (src/validation), not by making fields required.
 */
import { defineCollection, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';
import { fixturesAllowed, readBuildEnv } from './lib/env.ts';

const env = readBuildEnv();
const withFixtures = fixturesAllowed(env);

/** Glob loader over the real folder, plus the `_dev` folder in local builds only. */
function entries(folder: string, ext: 'yaml' | 'md') {
  const pattern = [`${folder}/**/*.${ext}`];
  if (withFixtures) pattern.push(`_dev/${folder}/**/*.${ext}`);
  return glob({
    base: './src/content',
    pattern,
    // Stable id = file name without extension (Latin slug, permanent once published).
    generateId: ({ entry }) => entry.replace(/^.*\//, '').replace(/\.(yaml|md)$/, ''),
  });
}

/** A loader that loads nothing (used for dev-only registries outside local builds). */
const emptyLoader = { name: 'empty', load: async () => {} };

// ---------- Shared building blocks (scaffold plan §4.1) ----------
const Lang = z.enum(['hi', 'en']);
const Text = z.string().trim().min(1);
const Localised = z.object({ hi: Text.optional(), en: Text.optional() }).strict();
const Status = z.enum(['draft', 'review', 'published', 'archived']);
const Verification = z.enum(['verified', 'supplied', 'media-reported', 'unverified']);
const DateValue = z.string().regex(/^\d{4}(-\d{2}(-\d{2})?)?$/, 'Use YYYY, YYYY-MM or YYYY-MM-DD');
const ArchiveDate = z
  .object({
    value: DateValue,
    approximate: z.boolean().default(false),
    qualifier: z.enum(['before', 'after']).optional(),
    end: DateValue.optional(),
  })
  .strict();
const Translation = z
  .object({
    state: z.enum(['missing', 'machine-draft', 'in-review', 'reviewed']),
    reviewer: z.string().optional(),
    reviewedAt: z.string().optional(),
    sourceHash: z.string().optional(),
  })
  .strict();
const Rights = z
  .object({
    status: z.enum(['family-owned', 'licensed', 'permission', 'public-domain', 'citation-only', 'unknown']),
    statement: Localised.optional(),
    fullReproductionAllowed: z.boolean().default(false),
  })
  .strict();
const Credit = z.object({ name: z.string().optional(), collection: z.string().optional() }).strict();
const OriginalText = z.object({ text: Text, lang: Lang }).strict();

const base = {
  status: Status,
  originalLanguage: Lang.default('hi'),
  translations: z.object({ hi: Translation.optional(), en: Translation.optional() }).strict().default({}),
  themes: z.array(reference('themes')).default([]),
  internalNotes: z.string().optional(),
  devFixture: z.boolean().default(false),
};
const claim = {
  verification: Verification,
  sources: z.array(reference('sources')).default([]),
};
/** Public reference identifier (0023); format and registry checked by I12. */
const publicReference = { reference: z.string().optional() };

// ---------- Collections (scaffold plan §4.2) ----------
const person = defineCollection({
  loader: entries('person', 'yaml'),
  schema: z
    .object({
      ...base,
      ...claim,
      displayName: Localised,
      nameConfirmation: z.enum(['pending', 'family-confirmed']).default('pending'),
      nameVariants: z.array(OriginalText).default([]),
      descriptor: Localised.optional(),
      shortBio: Localised.optional(),
      portrait: reference('photos').optional(),
      publishLifeDates: z.boolean().default(false),
      lifeDates: z.object({ birth: ArchiveDate.optional() }).strict().optional(),
    })
    .strict(),
});

const roles = defineCollection({
  loader: entries('roles', 'yaml'),
  schema: z
    .object({
      ...base,
      ...claim,
      title: Localised,
      organisation: reference('organisations').optional(),
      places: z.array(reference('places')).default([]),
      howObtained: z.enum(['elected', 'appointed', 'nominated', 'other']).optional(),
      period: ArchiveDate.optional(),
      periodTitle: Localised.optional(),
    })
    .strict(),
});

const organisations = defineCollection({
  loader: entries('organisations', 'yaml'),
  schema: z
    .object({
      ...base,
      name: Localised,
      type: z.enum(['municipal-body', 'political-party', 'committee', 'ngo', 'institution', 'media-outlet', 'other']),
    })
    .strict(),
});

const places = defineCollection({
  loader: entries('places', 'yaml'),
  schema: z
    .object({
      ...base,
      name: Localised,
      type: z.enum(['ward', 'locality', 'landmark', 'city', 'district', 'other']),
      parent: reference('places').optional(),
    })
    .strict(),
});

const initiatives = defineCollection({
  loader: entries('initiatives', 'yaml'),
  schema: z
    .object({
      ...base,
      ...claim,
      title: Localised,
      summary: Localised.optional(),
      period: ArchiveDate.optional(),
      places: z.array(reference('places')).default([]),
      roles: z.array(reference('roles')).default([]),
      outcomes: z
        .array(z.object({ text: Localised, sources: z.array(reference('sources')).min(1) }).strict())
        .default([]),
    })
    .strict(),
});

const activities = defineCollection({
  loader: entries('activities', 'yaml'),
  schema: z
    .object({
      ...base,
      ...claim,
      type: z.enum(['event', 'visit', 'announcement', 'appearance', 'community']),
      date: ArchiveDate,
      title: Localised,
      body: Localised.optional(),
      place: reference('places').optional(),
      occasion: reference('occasions').optional(),
      photos: z.array(reference('photos')).default([]),
      videos: z.array(reference('videos')).default([]),
    })
    .strict(),
});

/** Milestones with no connected material (0020). Deliberately has no item or Occasion references. */
const timelineEvents = defineCollection({
  loader: entries('timeline-events', 'yaml'),
  schema: z
    .object({
      ...base,
      ...claim,
      date: ArchiveDate,
      title: Localised,
      summary: Localised.optional(),
      category: z.string().optional(),
      place: reference('places').optional(),
    })
    .strict(),
});

const occasions = defineCollection({
  loader: entries('occasions', 'yaml'),
  schema: z
    .object({
      ...base,
      ...claim,
      title: Localised,
      date: ArchiveDate,
      places: z.array(reference('places')).default([]),
      summary: Localised.optional(),
      onTimeline: z.boolean().default(false),
      role: reference('roles').optional(),
      initiative: reference('initiatives').optional(),
    })
    .strict(),
});

const coverage = defineCollection({
  loader: entries('coverage', 'yaml'),
  schema: z
    .object({
      ...base,
      ...claim,
      ...publicReference,
      outlet: reference('organisations').optional(),
      date: ArchiveDate.optional(),
      headline: OriginalText,
      headlineTranslation: Localised.optional(),
      format: z.enum(['print', 'online', 'tv', 'radio', 'interview']),
      url: z.url().optional(),
      archiveUrl: z.url().optional(),
      page: z.string().optional(),
      excerpt: OriginalText.optional(),
      scanDocument: reference('documents').optional(),
      rights: Rights,
      occasion: reference('occasions').optional(),
    })
    .strict(),
});

const sources = defineCollection({
  loader: entries('sources', 'yaml'),
  schema: z
    .object({
      ...base,
      type: z.enum([
        'official-record',
        'gazette',
        'news-report',
        'interview',
        'family-testimony',
        'personal-document',
        'other',
      ]),
      title: Text,
      titleTranslation: Localised.optional(),
      publisher: z.string().optional(),
      date: ArchiveDate.optional(),
      url: z.url().optional(),
      archiveUrl: z.url().optional(),
      /** Reference into restricted (family-controlled) storage; never a file in git (spec G §1). */
      fileRef: z.string().optional(),
      visibility: z.enum(['public', 'internal']).default('internal'),
    })
    .strict(),
});

const Consent = z
  .object({
    privateIndividuals: z.enum(['none', 'not-identifiable', 'consented', 'unknown']).default('unknown'),
    minors: z.enum(['none', 'not-identifiable', 'guardian-consent', 'unknown']).default('unknown'),
  })
  .strict();

const photos = defineCollection({
  loader: entries('photos', 'yaml'),
  schema: ({ image }) =>
    z
      .object({
        ...base,
        ...claim,
        ...publicReference,
        image: image(),
        alt: Localised,
        caption: Localised.optional(),
        date: ArchiveDate.optional(),
        places: z.array(reference('places')).default([]),
        peopleShown: z.array(Localised).default([]),
        credit: Credit.optional(),
        rights: Rights,
        consent: Consent.default({ privateIndividuals: 'unknown', minors: 'unknown' }),
        pressApproved: z.boolean().default(false),
        originalForm: z.string().optional(),
        occasion: reference('occasions').optional(),
      })
      .strict(),
});

const videos = defineCollection({
  loader: entries('videos', 'yaml'),
  schema: ({ image }) =>
    z
      .object({
        ...base,
        ...claim,
        ...publicReference,
        title: Localised,
        provider: z.enum(['youtube', 'self-hosted']),
        providerId: z.string().optional(),
        file: z.string().optional(),
        poster: image().optional(),
        duration: z.string().optional(),
        captions: z.array(z.object({ lang: Lang, src: z.string() }).strict()).default([]),
        transcript: Localised.optional(),
        chapters: z.array(z.object({ at: z.string(), title: Localised }).strict()).default([]),
        credit: Credit.optional(),
        rights: Rights,
        occasion: reference('occasions').optional(),
      })
      .strict()
      .refine((v) => (v.provider === 'youtube' ? Boolean(v.providerId) : Boolean(v.file)), {
        message: 'youtube needs providerId; self-hosted needs file',
      }),
});

const documents = defineCollection({
  loader: entries('documents', 'yaml'),
  schema: ({ image }) =>
    z
      .object({
        ...base,
        ...claim,
        ...publicReference,
        title: Localised,
        pages: z.array(image()).min(1),
        docType: z.enum(['certificate', 'letter', 'notice', 'report', 'clipping', 'other']),
        transcription: OriginalText.optional(),
        translation: Localised.optional(),
        redactionStatus: z.enum(['redacted', 'not-required', 'pending']).default('pending'),
        rights: Rights,
        occasion: reference('occasions').optional(),
      })
      .strict(),
});

const ArchiveItemRef = z
  .object({ collection: z.enum(['photos', 'documents', 'coverage', 'videos']), id: Text })
  .strict();

const curatedCollections = defineCollection({
  loader: entries('collections', 'yaml'),
  schema: z
    .object({
      ...base,
      title: Localised,
      introduction: Localised.optional(),
      editor: z.string().optional(),
      items: z.array(ArchiveItemRef).default([]),
      cover: reference('photos').optional(),
    })
    .strict(),
});

const themes = defineCollection({
  loader: entries('themes', 'yaml'),
  schema: z.object({ ...base, label: Localised, description: Localised.optional() }).strict(),
});

const socialLinks = defineCollection({
  loader: entries('social-links', 'yaml'),
  schema: z
    .object({
      ...base,
      platform: Text,
      url: z.url(),
      handle: z.string().optional(),
      public: z.boolean().default(false),
      order: z.number().int().default(0),
    })
    .strict(),
});

/** Links-only contact (0015): no "form" type. */
const contactMethods = defineCollection({
  loader: entries('contact-methods', 'yaml'),
  schema: z
    .object({
      ...base,
      type: z.enum(['email', 'phone', 'whatsapp', 'postal']),
      value: Text,
      purpose: z.enum(['general', 'press', 'corrections']).default('general'),
      public: z.boolean().default(false),
      order: z.number().int().default(0),
    })
    .strict(),
});

/** Utility and policy prose, one Markdown file per language: `<key>.<lang>.md`. */
const pages = defineCollection({
  loader: entries('pages', 'md'),
  schema: z
    .object({
      ...base,
      key: z.enum(['how-we-verify', 'corrections', 'privacy', 'terms', 'press-kit']),
      lang: Lang,
      title: Text,
      translation: Translation.optional(),
    })
    .strict(),
});

/** Interface wording (spec 09). Only approved-editorial / family-confirmed keys may ship (I14). */
const glossary = defineCollection({
  loader: file('./src/content/glossary/glossary.yaml'),
  schema: z
    .object({
      en: z.string().optional(),
      hi: z.string().optional(),
      status: z.enum(['proposed', 'recommended', 'approved-editorial', 'family-confirmed', 'deprecated']),
      replacedBy: z.string().optional(),
      notes: z.string().optional(),
    })
    .strict(),
});

/** Issued public references, never reused (0023). id = the reference code. */
const RegistryEntry = z
  .object({
    collection: z.enum(['photos', 'documents', 'coverage', 'videos']),
    item: Text,
    retired: z.boolean().default(false),
  })
  .strict();
const referenceRegistry = defineCollection({
  loader: file('./src/content/registry/references.yaml'),
  schema: RegistryEntry,
});
const devReferenceRegistry = defineCollection({
  loader: withFixtures ? file('./src/content/_dev/registry/references.yaml') : emptyLoader,
  schema: RegistryEntry,
});

export const collections = {
  person,
  roles,
  organisations,
  places,
  initiatives,
  activities,
  'timeline-events': timelineEvents,
  occasions,
  coverage,
  sources,
  photos,
  videos,
  documents,
  collections: curatedCollections,
  themes,
  'social-links': socialLinks,
  'contact-methods': contactMethods,
  pages,
  glossary,
  referenceRegistry,
  devReferenceRegistry,
};
