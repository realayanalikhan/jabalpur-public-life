# 01. Technical scaffold plan

- **Date:** 2026-10-08
- **Status:** **Plan only. Not implemented.** No directories, files, routes, dependencies or tests
  described here exist yet.
- **Authority:** [decision records](../decisions/README.md) › [spec](../spec/README.md) (incl.
  [glossary](../spec/09-language-glossary.md)) › [design brief](../design/07-implementation-brief.md) › this plan.
- **Content rule:** no person-specific values anywhere in the scaffold. Development data is synthetic,
  marked `[DEV]`, and lives only in fixtures that production refuses to build
  ([0018](../decisions/0018-content-integrity-rules.md)).

---

## 1. Principles for the scaffold

1. **Integrity before pages.** Content schemas and build-failing checks are built before styled pages.
2. **Static and portable.** Static output only. No server runtime and no host-specific runtime code
   ([0008](../decisions/0008-astro-and-typescript.md), [0012](../decisions/0012-cloudflare-hosting.md)).
3. **Safe by default.** If the build environment is not stated, the build applies **production**
   rules (the strictest).
4. **Content-driven.** Sections, lenses and modules appear only when content meets configured
   thresholds ([0003](../decisions/0003-information-architecture.md)).
5. **Replaceable values.** Colours (provisional, [0025](../decisions/0025-local-material-visual-palette.md)),
   thresholds and storage locations live in one place each.
6. **Minimal dependencies.** Each dependency is justified in its pull request ([0019](../decisions/0019-runtime-and-package-manager.md)).

## 2. Project setup

| Item | Plan | Source |
|---|---|---|
| Framework | Astro, latest stable major when the scaffold starts (IP-01) | [0008](../decisions/0008-astro-and-typescript.md) |
| Language | TypeScript, strictest preset | 0008 |
| Output | `output: 'static'`; `build.format: 'directory'`; trailing slashes always (`trailingSlash: 'always'`) | 0008 |
| Runtime | Node 24 LTS (`.nvmrc`), `engines.node` set | [0019](../decisions/0019-runtime-and-package-manager.md) |
| Package manager | pnpm via Corepack; `packageManager` field; committed lockfile; frozen installs in CI | 0019 |
| Site URL | `SITE_URL` environment variable (the domain is unknown, FI-01). Production builds **fail** if it is unset; local and preview use a placeholder | — |
| Build mode | `SITE_ENV` = `local` \| `preview` \| `production`. **Unset means production rules** | [0013](../decisions/0013-environments-and-deployment.md) |
| i18n | Astro i18n: `locales: ['hi', 'en']`, `defaultLocale: 'hi'`, `routing.prefixDefaultLocale: true`; `/` redirects to `/hi/` | [0002](../decisions/0002-bilingual-strategy.md), [0021](../decisions/0021-language-switching-and-single-language-content.md) |
| Configuration | One typed `site.config.ts`: visibility thresholds, homepage updates age, provenance display level, analytics switch, media storage mode, decade-merge minimum, lens minimums | [0003](../decisions/0003-information-architecture.md), [0010](../decisions/0010-repository-based-content.md), [0016](../decisions/0016-analytics-strategy.md) |

**Planned dependencies (candidates; each justified at implementation):**
- Core: `astro`, `typescript`, `@astrojs/check`; `sharp` (Astro's image service); Zod (bundled with
  Astro).
- Development only:
  - a formatter (Prettier + Astro plugin) and a linter (ESLint + Astro and TypeScript plugins);
  - a CSS linter to forbid colour literals outside tokens (optional);
  - a unit-test runner (e.g. Vitest);
  - a browser-test runner with axe (e.g. Playwright + axe-core);
  - an internal link checker;
  - Lighthouse CI;
  - an EXIF reader for the GPS check.
- Exact tools are implementation-time choices (IP-07).

## 3. Directory structure (future)

```
/
├── .nvmrc  package.json  pnpm-lock.yaml  tsconfig.json  astro.config.mjs
├── site.config.ts                 # thresholds, ages, provenance level, analytics, media storage
├── src/
│   ├── content.config.ts          # collection definitions (Astro content layer, glob loaders, Zod)
│   ├── content/
│   │   ├── person/                # one entry (YAML) + biography.hi.md / biography.en.md
│   │   ├── roles/  organisations/  places/  initiatives/
│   │   ├── activities/  timeline-events/  occasions/
│   │   ├── coverage/  sources/  photos/  videos/  documents/  collections/  themes/
│   │   ├── social-links/  contact-methods/
│   │   ├── pages/                 # utility and policy prose, one file per language
│   │   ├── glossary/              # approved glossary entries (from spec 09)
│   │   └── _dev/                  # [DEV] fixtures; excluded from preview and production
│   ├── i18n/                      # t(key, lang), date/number formatting per glossary §5, lang helpers
│   ├── lib/                       # visibility, timeline, archive indexes, related items, citation,
│   │                              # routes/equivalence map, structured data, reference registry
│   ├── validation/                # integrity checks (§6), run as an Astro integration + scripts
│   ├── layouts/                   # BaseLayout, ProseLayout, ArchiveItemLayout, NoticeLayout
│   ├── components/
│   │   ├── site/                  # Header, LanguageSwitch, Menu, Footer, Breadcrumb
│   │   ├── prose/                 # SourceMarker, SourcesAndNotes, Caption, Figure
│   │   ├── verification/          # ProvenanceLabel (Level 1), SourceDetails (Level 2)
│   │   ├── archive/               # ItemDetails, UseAndCite, RelatedItems, LensList, CollectionCard
│   │   ├── timeline/              # Timeline, TimelineEntry, RiverLine
│   │   └── media/                 # Picture, Lightbox, VideoFacade, DocumentPages
│   ├── pages/                     # route files (§8)
│   ├── styles/                    # tokens.css, reset.css, base.css, typography.css, fonts.css
│   └── assets/images/             # web-ready, redacted, GPS-free derivatives only
├── public/
│   ├── fonts/                     # self-hosted WOFF2 (Noto Serif Devanagari, Source Serif 4)
│   └── robots.txt  favicon
├── scripts/                       # repo scans (GPS, restricted files, PII patterns), host-file generation
├── tests/
│   ├── unit/  integration/  e2e/  a11y/
│   └── fixtures/                  # synthetic test content and images (incl. a GPS-tagged image that must fail)
└── .github/workflows/ci.yml
```

Not in the repository, ever:
- preservation masters;
- restricted material;
- consent forms;
- private contact details ([spec G §1](../spec/07-security-privacy-integrity.md)).

## 4. Content model implementation

### 4.1 Shared building blocks (schema helpers)

| Helper | Shape (conceptual) | Notes |
|---|---|---|
| `Localised<T>` | `{ hi?: T, en?: T }` | Per-language text; which languages are required is enforced by publish rules (§6) |
| `ArchiveDate` | `{ value: 'YYYY' \| 'YYYY-MM' \| 'YYYY-MM-DD', approximate?: boolean, qualifier?: 'before' \| 'after', end?: ArchiveDate }` | Displayed per glossary §5 |
| `Status` | `'draft' \| 'review' \| 'published' \| 'archived'` | All entities |
| `Verification` | `'verified' \| 'supplied' \| 'media-reported' \| 'unverified'` | Claim-bearing entities |
| `Translations` | per language: `{ state: 'missing' \| 'machine-draft' \| 'in-review' \| 'reviewed', reviewer?, reviewedAt?, sourceHash? }` | Staleness: the original's hash differs from `sourceHash` |
| Common fields | `status`, `verification?`, `sources: ref(sources)[]`, `originalLanguage`, `translations`, `themes?`, `internalNotes?`, `devFixture?` | `internalNotes` is stripped before rendering |
| `PublicReference` | Short, opaque, non-sequential string | Archive items only ([0023](../decisions/0023-public-reference-identifiers.md)) |
| `Rights` | `{ status: 'family-owned' \| 'licensed' \| 'permission' \| 'public-domain' \| 'citation-only' \| 'unknown', statement: Localised<string>, fullReproductionAllowed: boolean }` | [0006](../decisions/0006-archive-strategy.md) |

### 4.2 Entities

Key:
- **Public:** rendered on the site.
- **Bilingual:** has localised fields.
- **Unpublish:** can be withdrawn by setting `status: archived`.
- **Verification:** what must hold before the entity can be published.

| Entity (collection) | Purpose | Key fields | Relationships | Public | Bilingual | Unpublish | Verification |
|---|---|---|---|---|---|---|---|
| **Person** (`person`, single) | The subject | `displayName: Localised` (**family-confirmed**), `nameVariants[]`, `descriptor: Localised`, `shortBio: Localised`, long biography (Markdown per language), `portrait?`, `lifeDates?` + `publishLifeDates` (FI-07) | → Photo (portrait) | Yes | Yes (core: both required) | No (required for launch) | Names family-confirmed; biography `supplied`, with source markers on specific claims |
| **Role** (`roles`) | A position held | `title: Localised`, `organisation`, `places[]`, `howObtained`, `period: ArchiveDate`, `periodTitle?: Localised` (optional editor-supplied period name) | → Organisation, Place, Source; ← Initiative, Occasion | Yes | Yes | Yes | Claim-bearing: verified (source) / supplied / media-reported |
| **Organisation** (`organisations`) | A body | `name: Localised` (official), `type` | ← Role, Coverage (outlet), Initiative | When referenced | Yes | Yes | Names from official sources; party name and display per FI-05 |
| **Place** (`places`) | A location | `name: Localised` (official), `type`, `parent?`, `coordinates?` (not displayed at MVP) | Hierarchy; ← most entities | Yes (place lens) | Yes | Yes | Official spellings; romanisation per OD-20 |
| **Initiative** (`initiatives`) | Sustained programme of work | `title`, `summary`, body (Markdown per language), `period`, `places[]`, `roles[]`, `outcomes[]` (each with its own sources) | → Role, Place, Theme, Source; ← Occasion | Yes | Yes | Yes | Claim-bearing; **outcomes require sources** |
| **Activity** (`activities`) | An update post | `type` (event, visit, announcement, appearance, community), `date`, `place?`, body per language, `availableLanguages`, `occasion?`, `media[]` | → Place, Theme, Occasion, Photo/Video | Yes | **Single-language allowed** ([0021](../decisions/0021-language-switching-and-single-language-content.md)) | Yes | First-party content: normally `supplied` |
| **TimelineEvent** (`timeline-events`) | Milestone with **no** Occasion | `date`, `title`, `summary`, `category`, `place?` | → Place, Source | Via Timeline | Yes | Yes | Claim-bearing. **Must not duplicate an Occasion** (check I9) |
| **Occasion** (`occasions`) | Real-world event or episode connecting material | `title`, `date` (range allowed), `places[]`, `summary?`, `onTimeline`, `role?`, `initiative?` | → Place, Theme, Source, Role, Initiative; ← Photo/Video/Document/Coverage, Activity | Via relations (**no page**, DP-07) | Yes | Yes | Claim-bearing ([0020](../decisions/0020-occasion-connective-archive-entity.md)) |
| **Coverage** (`coverage`) | Media item | `outlet`, `date`, `headline: { text, lang }` (original script), `headlineTranslation?: Localised`, `format`, `url`, `archiveUrl?`, `page?`, `excerpt`, `scan?`, `rights`, `occasion?`, `reference` | → Organisation, Document/Photo (scan), Occasion, Theme | Yes | Metadata bilingual; original text single-language | Yes | Existence verified by URL/archive; claims inside attributed (`media-reported`) |
| **Source** (`sources`) | Evidence | `type`, `title`, `publisher?`, `date?`, `url?`, `archiveUrl?`, `fileRef?` (restricted storage reference, never a file in git), `visibility: public \| internal` | ← any claim-bearing entity | Only if `public` | Title as published | Yes | Internal sources never rendered (I11) |
| **Photo** (`photos`) | Photograph | `image` (Astro `image()`), `alt: Localised` (required per published language), `caption: Localised`, `date?`, `places[]`, `peopleShown[]` (public figures only), `credit`, `rights`, `consent: { privateIndividuals, minors }`, `pressApproved`, `originalForm`, `collections[]`, `occasion?`, `reference` | → Place, Theme, Collection, Occasion, Source | Yes | Yes | Yes | Claim-bearing (date, place, who); consent and rights gates (I16, I17) |
| **Video** (`videos`) | Video | `provider: 'youtube' \| 'self-hosted' \| …`, `providerId?` / `file?`, `poster`, `duration`, `captions[]`, transcript per language, `chapters[]`, `credit`, `rights`, `occasion?`, `reference` | → Place, Theme, Collection, Occasion | Yes | Yes | Yes | Claim-bearing; captions required (I8) |
| **Document** (`documents`) | Scanned or digital document | `pages[]` (redacted derivatives), `docType`, transcription (original language), `translation?`, `redactionStatus: 'redacted' \| 'not-required' \| 'pending'`, `rights`, `occasion?`, `reference` | → Place, Theme, Collection, Occasion, Source | Yes | Metadata bilingual; transcription in its original language | Yes | Claim-bearing; **redaction must be complete** (I15) |
| **Collection** (`collections`) | Curated story or set | `title`, introduction (Markdown per language), `editor`, `items[]` (ordered), `cover` | → Photo/Video/Document/Coverage | Yes | Yes | Yes | Introduction uses source markers for specific claims |
| **Theme** (`themes`) | Controlled vocabulary | `label: Localised`, `description?` | ← most entities | Yes (theme lens) | Yes | Yes | — |
| **SocialLink** (`social-links`) | Official profile | `platform`, `url`, `handle`, `public`, `order` | ← Person | If `public` | Labels via glossary | Yes | Official profiles only (FI-09) |
| **ContactMethod** (`contact-methods`) | Contact channel | `type`, `value`, `purpose`, `public`, `order` | ← Person | If `public` | Labels via glossary | Yes | Approved channels only (FI-08) |
| **GlossaryTerm** (`glossary`) | Interface wording | `key`, `en`, `hi`, `romanised?`, `status` (proposed / recommended / approved-editorial / family-confirmed / deprecated), `replacedBy?`, `notes?` | Used by `t()` | Yes (as interface text) | Yes | Deprecate only | Only approved or family-confirmed keys allowed in production (I14) |

No person-specific values are written by the scaffold. Real entries are created only from
family-supplied or sourced material.

## 5. Content lifecycle and verification

**Lifecycle:** `draft → review → published → archived`.

| Status | Local | Restricted preview | Production |
|---|---|---|---|
| `draft` | Shown | Not built | Not built |
| `review` | Shown | Shown, with a visible "review" banner on the page | Not built |
| `published` | Shown | Shown | Shown |
| `archived` | Shown (marked) | Not built | Not built. The public reference stays reserved and is never reused |

**Verification:**

| Status | Production rule |
|---|---|
| `verified` | Must have at least one source (I5) |
| `supplied` | Allowed, with attribution wording ([0026](../decisions/0026-verification-and-source-presentation.md)) |
| `media-reported` | Must link a Coverage item or Source |
| `unverified` | **Never published.** A production build fails if an unverified item is publishable (I1). In preview, `review` + `unverified` may appear with a visible "unverified, preview only" marker |

**Never in production output:**
- unverified content;
- development fixtures;
- internal notes and internal-only sources;
- restricted data;
- draft, review or archived content;
- machine-draft translations.

Enforcement is by schema, filters and a post-build scan (§6).

## 6. Build-failing integrity checks

This translates [0018](../decisions/0018-content-integrity-rules.md) into engineering checks, plus
the rules the spec makes binding. **None of these may be weakened without a superseding decision.**

**When each check runs:**
- **S, schema:** when content is loaded (`astro sync` and the build).
- **V, validation integration:** before pages are generated.
- **P, post-build scan:** of the generated output.
- **R, repository scan:** a CI script over committed files.

**Result columns:** F = fail · W = warning (reported, also in the preview banner) · — = not applicable.

| # | Check | Runs | Production | Preview | Local |
|---|---|---|---|---|---|
| I1 | **Unverified content publishable**: `status: published` with `verification: unverified` | V | F | F (published); `review` allowed with marker | W |
| I2 | **Development fixtures**: any `devFixture: true` entry or `_dev/` content in the build | V + P | F | F | allowed |
| I3 | **Missing required core translation**: core pages (Home, About, Public Life, Connect, utility pages) not `reviewed` in both languages | V | F | W + banner | W |
| I4 | **Stale required core translation**: `sourceHash` ≠ hash of the original | V | F | W + banner | W |
| I5 | **Verified without a source** | S | F | F | F |
| I6 | **Broken references**: a reference to a non-existent entity, or a published entity referencing a non-published one | S + V | F | F (non-existent); `review` targets allowed | W |
| I7 | **GPS metadata in images**: any committed image under `src/assets/` or `public/` containing GPS EXIF, and any output image with GPS | R + P | F | F | F |
| I8 | **Required accessibility metadata missing**: alt text for each language a photo is published in; video captions; `lang` on mixed-language fields | V | F | W | W |
| I9 | **Invalid relationships**: more than one Occasion per item; a TimelineEvent describing an Occasion that is `onTimeline`; a Coverage item without an outlet; a Role without a period; a Collection listing an item that doesn't exist or isn't published | V | F | F | W |
| I10 | **Unpublished content leaking**: any draft, review or archived entity's URL, title or reference present in production output | P | F | — | — |
| I11 | **Internal notes or internal sources leaking**: any `internalNotes` text or internal Source title found in output | P | F | F | W |
| I12 | **Reference identifiers**: missing on a published archive item; duplicate; wrong format (sequential pattern, date-like, type prefix); reuse of a retired reference (checked against a committed registry) | V | F | F | W |
| I13 | **Machine-draft translation published** | V | F | W | W |
| I14 | **Glossary**: a production page uses a key that isn't approved or family-confirmed, or an English interface string appears on a Hindi page | V + P | F | W | W |
| I15 | **Document redaction incomplete** (`redactionStatus: pending`) on a published or review document | V | F | F | W |
| I16 | **Consent**: an identifiable minor or private individual without a recorded consent flag | V | F | F | W |
| I17 | **Rights**: full reproduction rendered when `fullReproductionAllowed` is false (renders as a citation instead); `rights.status: unknown` with media displayed | V | F | F | W |
| I18 | **Single-language notice pages**: missing `noindex`, present in a sitemap, or part of an hreflang pair; or an untranslated body rendered at a counterpart path | P | F | F | — |
| I19 | **Hidden sections generated**: a page, navigation link or sitemap entry for a section below its visibility threshold | P | F | W | — |
| I20 | **Internal link integrity**: any internal link that does not resolve in the output | P | F | F | W |
| I21 | **Personal-data patterns** in content text: ID-number-like or phone-number-like strings, except approved public contact methods | R + V | F | F | W |
| I22 | **Restricted files in the repository**: forbidden paths or types (e.g. a `restricted/` folder, master-format TIFF/RAW, consent-form names) | R | F | F | F |
| I23 | **Production configuration**: `SITE_URL` unset; `SITE_ENV` not production on the production branch; analytics enabled without the privacy notice | V | F | — | — |

**Warnings only (never failures):**
- stale non-core translations;
- the hidden-sections report (spec A FR-M1);
- missing optional fields;
- performance budgets until OD-25 is confirmed.

The **hosting build runs the same checks** as CI, so production stays protected even without
branch protection ([0014](../decisions/0014-ci-strategy-github-actions.md)).

## 7. Environments

| Environment | Trigger | Content shown | Indexing | Access |
|---|---|---|---|---|
| **Local** | Developer machine (`SITE_ENV=local`) | All statuses + `_dev` fixtures | n/a | Developer |
| **Restricted preview** | Each branch or pull request (`SITE_ENV=preview`) | `published` + `review`; **never fixtures**; banners for review, unverified and stale items; hidden-sections report | `noindex` on every page; `robots.txt` disallow all | Invited reviewers only (mechanism IP-04, e.g. Cloudflare Access) |
| **Production** | `main` (`SITE_ENV=production`, the default) | `published` only | Indexed; sitemaps | Public |

([0013](../decisions/0013-environments-and-deployment.md))

## 8. Routes and URLs

Rules:
- All routes are prefixed with `/hi/` or `/en/`.
- Section path segments are English in both languages.
- Item slugs are Latin, lowercase, hyphenated, taken from the entry `id`, and identical in both
  languages.
- Trailing slash always.
- Canonical URL = `SITE_URL` + the page's own language path (never cross-language).
- **Slugs are permanent once published.** A changed slug needs a redirect entry.
- Romanisation of new slugs follows OD-20 once decided.

| Page | Hindi route | English route | Notes |
|---|---|---|---|
| Root | `/` → `/hi/` | — | Static redirect + meta-refresh fallback; no language detection, no storage |
| Home | `/hi/` | `/en/` | |
| About (Biography) | `/hi/about/` | `/en/about/` | |
| Public Life overview | `/hi/public-life/` | `/en/public-life/` | Visible when any child is visible |
| Timeline | `/hi/public-life/timeline/` | `/en/public-life/timeline/` | Type filters as static subpages if needed: `…/timeline/{type}/` |
| Roles & Terms | `/hi/public-life/roles/` | `/en/public-life/roles/` | |
| Work & Initiatives | `/hi/public-life/work/` | `/en/public-life/work/` | |
| Initiative | `/hi/public-life/work/{id}/` | `/en/public-life/work/{id}/` | |
| Archive hub | `/hi/archive/` | `/en/archive/` | |
| Type lists | `/hi/archive/{photographs\|documents\|press\|video}/` | same in `/en/` | |
| Archive item | `/hi/archive/{type}/{id}/` | `/en/archive/{type}/{id}/` | [0027](../decisions/0027-archive-item-page-principles.md) order |
| Collection | `/hi/archive/collections/{id}/` | `/en/archive/collections/{id}/` | |
| Lens pages | `/hi/archive/{period\|decade\|theme\|place}/{value}/` | same in `/en/` | One lens at a time ([0022](../decisions/0022-archive-browsing-model.md)) |
| Updates | `/hi/updates/` · `…/events/` · `…/announcements/` · `…/{id}/` | same in `/en/` | Single-language items: counterpart = notice page |
| Connect | `/hi/connect/` | `/en/connect/` | |
| Press Kit | `/hi/press-kit/` | `/en/press-kit/` | |
| How We Verify | `/hi/how-we-verify/` | `/en/how-we-verify/` | |
| Corrections & Feedback | `/hi/corrections/` | `/en/corrections/` | |
| Privacy | `/hi/privacy/` | `/en/privacy/` | |
| Terms / Takedown | `/hi/terms/` | `/en/terms/` | |
| 404 | `/hi/404.html`, `/en/404.html`, bilingual root `/404.html` | | Host serves the nearest 404 where supported; the root one is bilingual |
| **Occasion pages** | *(none)* | *(none)* | **Only if DP-07 is accepted**; then `/{lang}/archive/occasions/{id}/` |
| Reference redirect `/r/{ref}` | *(none)* | *(none)* | Not part of 0023 |

**Language switching:** on every page, the switch links to the same path in the other language. That
path is either the equivalent page or the notice page (§9).

## 9. Bilingual routing and strings

| Concern | Plan |
|---|---|
| `/` | Static redirect to `/hi/` (host redirect file + meta refresh + `<link rel="canonical">`); never `Accept-Language`; never cookies or local storage |
| `/hi/` and `/en/` | Generated from the same route files with `lang` parameters; `<html lang>` set per page |
| Equivalence map | Built at build time: for each entity, the languages in which it is genuinely published |
| `hreflang` | Reciprocal `hi` ↔ `en` **only** between pages in the equivalence map |
| `x-default` | The page's `/hi/` route ([0021](../decisions/0021-language-switching-and-single-language-content.md)) |
| Single-language content | Counterpart path renders the **notice page** (glossary `notice.not-available`): localised chrome, link to the available version, `noindex`, excluded from sitemaps, hreflang and the search-ready index. Listings show the item with `meta.only-in` and link straight to the available version |
| Missing translation of a core page | Production build fails (I3) |
| Language switch | `LanguageSwitch` component: one plain link to the other language's path, endonym label (`lang.switch.*`), `lang` + `hreflang` + `translate="no"`, accessible name `lang.switch.a11y`; in the header, outside the menu |
| Memory | **None at MVP.** No cookie, no local storage. The URL alone sets the language |
| Interface strings | `t(key, lang)` reads the glossary collection. Production fails on a missing or non-approved key (I14). No string literals for UI text in components |
| Formatting | `i18n/format.ts` implements glossary §5 (dates with precision, ranges, before/after, decades, Indian grouping) on top of `Intl` (`hi-IN`, `en-IN`). A unit test pins CLDR month strings |
| Mixed-language text | Localised fields render with their `lang`; inline other-language spans carry `lang` |
| Sitemaps | One per language, listing only pages published in that language, with alternates from the equivalence map |

## 10. Image and media pipeline

| Concern | Plan |
|---|---|
| Processing | Astro image service (sharp): AVIF + WebP + JPEG fallback; explicit `widths`/`sizes`; dimensions always set (no layout shift); lazy below the fold |
| Inputs | Only **web-ready, redacted, GPS-free derivatives** (≤ about 2400 px long edge) in `src/assets/images/`. **Originals never in git** ([0011](../decisions/0011-image-and-media-strategy.md)) |
| Metadata | Re-encoding strips EXIF/XMP/IPTC; a test confirms this. I7 scans committed and output images for GPS |
| Alt text and captions | From schema (`alt`, `caption`, per language); captions formatted per glossary §8; alt is separate from caption |
| Credits and rights | From `credit` and `rights`. Citation-only items show no reproduction (I17). Credit lines omitted when unknown |
| Archival treatment | Original proportions on a stone mat in fixed-ratio slots (never cropped); contemporary images may use standard ratios with focal points |
| Storage mode | `site.config.ts → media.storage: 'repo' \| 'object-storage'` with a base-URL resolver, so moving to object storage (OD-21) changes configuration, not the content model |
| Video | `VideoFacade` with provider adapters (`youtube` via the privacy-enhanced domain; `self-hosted`). Self-hosted poster; **click to load**, no third-party script before interaction; captions and transcript always; Content-Security-Policy allows the provider frame only on video pages. The provider depends on FI-09 |
| Documents | `DocumentPages`: redacted page images + accessible transcription (text) + optional reviewed translation; I15 gate |
| Fonts | Self-hosted WOFF2 in `public/fonts/`: Noto Serif Devanagari 400/600 (Devanagari subset), Source Serif 4 400/400 italic/600 (Latin subset); `font-display: swap`; preload only the page script's body file; metric-matched fallbacks ([0024](../decisions/0024-typography-system.md)) |
| Production media | **None is added by the scaffold.** Fixtures use synthetic grey images |

## 11. Archive architecture

| Concern | Plan |
|---|---|
| Indexes | Built in `lib/archive.ts`: by type, time (periods from Roles' `periodTitle`/period, decades with merge rule), theme, place |
| Visibility | Lenses and lens values follow `site.config.ts` minimums. Counts are never displayed |
| Hub | Featured collection (configured), lens list with one-line glossary definitions, named collections, hand-picked items |
| Collections | Ordered items + authored introduction with Sources and notes |
| Occasion relations | Reverse index `occasion → items/activities`. Feeds "From the same occasion" and the Timeline (occasions with `onTimeline`). **No occasion route** (DP-07) |
| Related items | Same occasion first, then same period, theme or place, scored; at most 6; excludes the item itself and non-published items |
| Reference identifiers | Generated once (opaque, non-sequential) and committed in a **reference registry** (id → reference, including retired ones). Validated by I12. Displayed only in `ItemDetails`, `UseAndCite` and the correction prompt |
| Citation | `lib/citation.ts` builds the glossary-based citation (site name placeholder until FI-06, title, date, reference, permanent URL); copy buttons are progressive enhancement |
| Provenance | `ProvenanceLabel` (Level 1) and `SourceDetails` (Level 2 disclosure); `SourcesAndNotes` for prose; wording from glossary §9 |
| Future search | No search at MVP ([0017](../decisions/0017-search-deferred.md)). Pages are search-ready: `data-pagefind-body` only on item and prose content, correct `lang`, chrome excluded; notice pages excluded. Pagefind is added only by a later decision |

## 12. Design implementation boundary

| Layer | Contains | Rules |
|---|---|---|
| **Design tokens** (`styles/tokens.css`, `@layer tokens`) | Colour roles (**provisional values**, single source, [0025](../decisions/0025-local-material-visual-palette.md)); font families; type scale (fluid `clamp()`); spacing scale (4 px base); widths (frame/media/text-en/text-hi); motion durations; border widths; radius 0 | Only place colour and size values are defined. Values marked provisional in comments until DP-08 |
| **Global CSS** (`reset`, `base`, `typography`, `fonts`) | Reset; element defaults; `:lang(hi)` and `:lang(en)` typography rules (line height, sizes, no synthetic styles, underline offsets); `@font-face`; focus ring; `prefers-reduced-motion`; layer order `reset, tokens, base, layout, components, utilities` | No component styling; no colour literals |
| **Component CSS** | Astro scoped styles per component; container queries; logical properties | Uses tokens only; no global selectors; no colour or size literals |
| **Page-specific CSS** | Rare composition rules in layouts | No new tokens; never overrides component internals |
| **River line** | One `RiverLine` component used by the Timeline (and optionally once above the footer) | No other usage, no animation, not a logo (DP-06) |

**Not allowed:**
- Tailwind;
- UI frameworks or component kits;
- CSS-in-JS;
- dark-mode styles (light only, [0005](../decisions/0005-design-direction.md));
- gradients;
- additional web fonts ([0024](../decisions/0024-typography-system.md)).

## 13. CI/CD plan (future GitHub Actions)

`ci.yml` runs on every pull request and on pushes to `main`:

| Step | What | Result |
|---|---|---|
| 1 | **Frozen install**: Node 24, pnpm via Corepack, `pnpm install --frozen-lockfile` | Fail on lockfile drift |
| 2 | **Formatting check** | Fail |
| 3 | **Lint + type/template checks** (linter, `astro check`, `tsc --noEmit`) | Fail |
| 4 | **Content validation**: schema load (S checks) and unit tests | Fail |
| 5 | **Integrity checks**: V checks in production mode (I1–I23 as applicable) | Fail |
| 6 | **Production build** (`SITE_ENV=production`, test `SITE_URL`) | Fail |
| 7 | **Internal link check** on the output (I20) | Fail |
| 8 | **Accessibility checks**: axe on key templates, both languages, at 360 px and 1280 px | Fail on serious or critical issues |
| 9 | **Image/GPS checks**: repository + output (I7, I22) | Fail |
| 10 | **Performance checks**: Lighthouse CI on key templates | **Warn** until OD-25 confirms targets; then fail |
| 11 | **Production fixture and content guard**: post-build scans (I2, I10, I11, I14, I18, I19) | Fail |

Deployment:
- The host's Git integration builds previews per branch (`SITE_ENV=preview`) and production from
  `main` (`SITE_ENV=production`), running the same validation.
- No secrets are needed for the build.
- Process rule: never merge with failing checks ([0014](../decisions/0014-ci-strategy-github-actions.md)).

## 14. Hosting portability (OD-22 open)

- Static output only. **No Astro server adapter and no Workers or Functions code.**
- Host-specific files (`_redirects`, `_headers`) are **generated** from host-neutral definitions
  (`lib/redirects.ts`, `lib/headers.ts`) by a small script. Switching between Cloudflare Workers
  static assets and Pages, or leaving Cloudflare, changes only that generator.
- Security headers (CSP, HSTS, Referrer-Policy, Permissions-Policy, X-Content-Type-Options,
  frame-ancestors) are defined host-neutrally. Values are set at implementation (IP-02).
- Analytics (Cloudflare Web Analytics) is a configuration switch; when off, no beacon and no CSP
  entry ([0016](../decisions/0016-analytics-strategy.md)).
- Preview access control (IP-04) is configured on the host, not in the repository.

## 15. Testing strategy (future)

| Area | Tests |
|---|---|
| Content schemas | Valid and invalid synthetic fixtures per collection; required-field and enum enforcement; `internalNotes` stripping |
| Bilingual routes | Both languages generated for core pages; route parity; trailing slashes; canonicals |
| Language switching | Switch target equals the same path in the other language on every page type, including notice pages; label and attributes |
| hreflang / x-default / sitemaps | Pairs only for equivalents; x-default → `/hi/`; notice pages absent |
| Verification rules | I1, I5, I13 behaviour across local, preview and production; preview markers present |
| Archive relationships | Lens indexes, decade merging, thresholds, related-item ordering, collections |
| Occasion relationships | Reverse index; "From the same occasion"; `onTimeline` handling; I9 duplicates |
| Reference IDs | Format (opaque, non-sequential, no date or type), uniqueness, registry non-reuse, display placement (never on cards) |
| Formatting | Date precision, approximate, ranges, before/after, decades, Indian grouping; **CLDR month strings pinned** |
| Accessibility | axe on templates in both languages at 360 and 1280 px; keyboard paths (menu, switch, disclosures, lightbox); `lang` attributes |
| Image metadata | A GPS-tagged fixture must fail I7; processed output carries no EXIF |
| Production-build integrity | Fixture content, unverified, draft and internal-note fixtures must be absent from production output (I2, I10, I11) |
| Internal links | Whole-output link check |
| Glossary | Production rejects unapproved keys; no English interface strings on Hindi pages |

All test data is synthetic, marked `[DEV]`, and never resembles the person.

## 16. Not built yet (explicit exclusions)

- CMS ([0007](../decisions/0007-no-cms-at-mvp.md))
- Search ([0017](../decisions/0017-search-deferred.md))
- Contact form ([0015](../decisions/0015-mvp-contact-strategy.md))
- Public submissions or contributions ([0006](../decisions/0006-archive-strategy.md))
- Comments
- User accounts or login
- Database
- Server-side application or runtime functions
- Analytics beyond the approved, switchable Cloudflare Web Analytics
- Party campaign features: donation, volunteer, membership, party branding
- Election features: countdowns, vote calls to action, candidate pages
- Invented content of any kind
- Automatic public machine translation (machine translation only as an unpublished draft aid)
- Standalone Occasion pages (DP-07)
- Dark mode
- `/r/{ref}` redirects

## 17. Family-input dependencies

The scaffold must accept the following later **as content or configuration**, without architectural
change:

| Input | Where it plugs in | Built without it |
|---|---|---|
| Public name (FI-06) | `person.displayName` (family-confirmed), glossary | Placeholder only in local fixtures; production fails without it |
| Hindi spelling (FI-06) | `person.displayName.hi`, glossary family-confirmed entries | — |
| Roles (and how they are named) | `roles/` entries, glossary | Roles section hidden |
| Dates | `ArchiveDate` fields | Fields omitted |
| Party presentation (FI-05) | `organisations/` entry + display flag on Role | Not shown |
| Archive inventory (FI-03) | Content entries; `media.storage`; thresholds | Archive sections hidden |
| Contacts (FI-08) | `contact-methods/` | Connect hidden (launch requires one) |
| Social accounts (FI-09) | `social-links/` | Not shown |
| Video channel (FI-09) | `videos.provider` | Video section hidden |
| Personal-details policy (FI-07) | `person.publishLifeDates` and related flags | Personal details not shown |
| Domain (FI-01) | `SITE_URL` | Production build fails until set |
| Maintenance (FI-02) | Operations guide; possible future CMS decision | Repository workflow |
| Translation reviewer (OD-16) | `translations.*.reviewer`; glossary approval | Nothing can be marked reviewed, so core pages cannot ship (I3) |

## 18. Final architecture checkpoint

### Approved (locked today)

- Astro + TypeScript strict, static output; Node 24 + pnpm (0008, 0019).
- Modern CSS with tokens and scoped styles; no Tailwind or UI framework; light only (0009, 0005).
- Repository content collections; no CMS (0010, 0007).
- Content model incl. Occasion and the reference field (0004, 0020, 0023); lifecycle and
  verification (0004); integrity checks I1–I23 (0018, plus spec G gates).
- Bilingual routing: `/hi/` default, `/en/`, x-default → `/hi/`, endonym switch, notice pages, no
  language memory (0002, 0021).
- IA and section visibility (0003); archive browsing model (0022); item page principles (0027).
- Typography (0024); verification presentation (0026); palette direction (0025).
- Image and media strategy; originals outside git; video provider abstraction (0011).
- Environments (0013); CI on GitHub Actions (0014); Cloudflare hosting, kept portable (0012).
- Links-only contact (0015); Cloudflare Web Analytics, switchable (0016); no search at MVP (0017).

### Open (needs a decision)

- **DP-04 / glossary:** approval of the Recommended entries; reviewer confirmation (OD-16).
- **OD-20:** romanisation (affects slugs for real content).
- **DP-05:** final wireframes.
- **HP-01 / HP-02:** homepage site statement and places section.
- **DP-07:** Occasion pages.
- **DP-08:** exact palette values.
- **DP-06:** river-line execution details.
- **OD-24:** corrections response times.
- **OD-25:** performance targets.
- **OD-19:** launch date.

### Family input (spec H §4)

FI-01 domain · FI-02 maintenance · FI-03 archive inventory · FI-04 master storage · FI-05 party
presentation · FI-06 public name and spellings · FI-07 personal-details policy · FI-08 contacts ·
FI-09 social and video channels · FI-10 topics to avoid · FI-11 consent · OD-16 translation reviewer ·
OD-17 budget · OD-18 legal review.

### Implementation-time (choose during implementation; record in the pull request)

- IP-01 exact Astro version.
- IP-02 header and CSP values.
- IP-03 dependency-update tool.
- IP-04 preview access mechanism.
- IP-05 field-level schema details within §4.
- IP-06 configuration values.
- IP-07 test, lint and format tooling.
- OD-21 storage threshold (when inventory is known).
- OD-22 Cloudflare product.
- Reference-ID alphabet and length (within 0023).
- 404 handling per host.

### Not in MVP

See §16.

### Sequence when implementation is approved

1. Repository setup: Node, pnpm, Astro, TypeScript, lint and format, `site.config.ts`.
2. Content schemas, synthetic `[DEV]` fixtures, and the integrity checks (§4–§6), with unit tests.
3. Routing and i18n skeleton (§8–§9) with notice pages, equivalence map and sitemaps.
4. CI workflow (§13) running against the fixtures.
5. Tokens and global CSS (§12) with provisional colours; fonts.
6. Components and layouts, then pages.
7. Preview environment on the host (OD-22, IP-04).
