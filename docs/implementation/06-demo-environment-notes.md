# 06. Demonstration environment: implementation notes

- **Date:** 2026-10-13
- **Decision:** [0028](../decisions/0028-demonstration-environment.md), approved by the project owner:
  - an isolated `demo` environment;
  - a separate demo repository;
  - a generic fictional subject plus openly licensed images of places.
- **Unchanged:**
  - 0013's three environments;
  - 0018, I1–I23, SC1 and the route rules R1–R8;
  - the real preview deployment (`pages.yml`) and production safeguards.

## 1. How it works

| Part | Implementation |
|---|---|
| Mode | `SITE_ENV=demo` (`pnpm build:demo`; `scripts/with-env.ts demo`). Not combinable with `SITE_VERIFY_ONLY`. Placeholder URL `https://demo.invalid` |
| Data | `src/lib/env.ts` `contentRoot()`: demo builds load entity collections from `demo/content/` only (with their own reference registry); all other builds only from `src/content/`. The glossary is shared. `fixturesAllowed()` is false in demo |
| Status | `published` entries only, as in production |
| Checks | `severityFor()` applies the **preview** outcomes of every existing check to demo builds |
| Schema | `demo: boolean` (default false) on every entity |
| Marking | `DemoBanner.astro` on **every** page, including the root redirect and the 404 page: the bilingual warning, carrying the `data-demo-only` marker (only the banner emits it, enforced by a test, so D2 passes only when the warning is shown). A "प्रदर्शन · / Demo ·" title prefix, `noindex, nofollow`; `robots.txt` disallows all (not production) |
| Canonical links | **Intentional:** demo pages keep a self-referencing canonical link to their own demo URL (e.g. `…/jabalpur-public-life-demo/hi/`). It never points to the real preview or production, and with `noindex, nofollow` it has no indexing effect. It is kept so the bilingual route rules (R3, R4) verify the demo exactly as they verify real builds |
| Isolation checks | D1 and D2 in `src/validation/demo.ts`; SC2 in `src/validation/source-content.ts` (see 0028 §4). D1 runs at the content stage; D2 in the post-build checks, so also in the production output guard; SC2 in `pnpm check:repo` and before every build/dev start |
| Personal-data scan | I21's pattern scan now covers `demo/content/` too |
| CI | The build job also runs `pnpm build:demo` and `pnpm verify:demo-routes` on every pull request |
| Deployment | Separate repository `realayanalikhan/jabalpur-public-life-demo` (section 3) |

## 2. Demonstration data (`demo/content/`)

All data is fictional except the seven images and their Commons source entries. Rules: `demo/README.md`.
Image licences: `demo/ASSETS.md`.

| Collection | Entries |
|---|---|
| person | "उदाहरण व्यक्ति (प्रदर्शन) / Example Person (demonstration)", no portrait |
| places | Example Town (fictional), Example Ward 1 and 2; Jabalpur, Bhedaghat and Madan Mahal (real, only for the real images) |
| organisations | Example Town Council, Example News (both fictional) |
| roles | Elected member, Example Ward 1 (1995–2000); Chair, Example Water Supply Committee (2000–2005) |
| timeline-events | Three milestones (1995, 2000, 2005) |
| occasions | Example ward meeting, 2003 |
| activities | Two bilingual updates and one Hindi-only update (exercises notice pages) |
| coverage | One fictional press item (Example News), citation-only |
| sources | Two fictional sources; seven real Commons file pages |
| photos | Seven openly licensed images of real places (credited, licensed, no identifiable people) |
| collections | "Example collection: views of Jabalpur" (the seven images) |
| themes | Two example themes |
| contact-methods | `contact@example.invalid` (reserved, non-routable) |

The real images are never connected to the fictional person, roles, occasions or activities.

## 3. Demo deployment (separate repository)

- **Repository:** `realayanalikhan/jabalpur-public-life-demo` (public). It contains only
  `.github/workflows/deploy-demo.yml` and a README.
- **Workflow:**
  1. check out this repository (public; no secrets);
  2. frozen install;
  3. `pnpm build:demo` with the demo Pages URL as `SITE_URL`;
  4. demo route validation;
  5. a guard that every page carries the demonstration marker and `noindex`;
  6. `upload-pages-artifact` and `deploy-pages`.
- **Triggers:** hourly schedule (`main`) and manual runs. A manual run can name a branch of this
  repository to preview a pull request.
- **URL:** `https://realayanalikhan.github.io/jabalpur-public-life-demo/` (base path from `SITE_URL`,
  as for the preview).
- **Limits:**
  - The demo can lag a merge by up to an hour unless run manually. Instant updates would need a token
    created by the owner (not set up).
  - GitHub disables scheduled workflows in a public repository after 60 days without activity in
    that repository; a manual run re-enables them.

## 4. What the demo shows today

The demo renders whatever templates exist on `main` (or the chosen branch):
- today, the home page (name, descriptor, short introduction) and the update pages (including a
  notice page for the Hindi-only update), with the banner;
- with PR #12 merged, also the header and footer.

The data already covers the homepage modules, public-life, archive, timeline and occasion templates,
so those pages show realistic content as soon as PR B and PR C add them.

## 5. Known limitations

- Until this pull request is merged, the hourly scheduled demo build runs against `main`, which does
  not yet have `build:demo`, so those runs fail ("Command build:demo not found"). The live demo stays
  on the last successful manual build of the branch. The schedule works from the first run after the
  merge.
- Image credits and licences are recorded in each demo photo entry and in `demo/ASSETS.md`. They are
  not displayed on the live demo yet, because no page renders the images. Any template that shows an
  image must render its credit and licence (CC BY-SA requires attribution).

## 6. Verification

- **Unit tests:** `tests/unit/demo-isolation.test.ts` covers the environment model, the severity
  mapping, D1, D2 (including through the post-build checks), SC2 and the repository state.
- **Builds:** the demo build contains only demo data and the marker on every page. The preview,
  verification and local builds contain no demo marker, text or images.
- **Intentional-failure cases:** demo data copied into `src/content/` (SC2, D1); a missing flag in
  demo data (SC2, D1); the demo marker in production-rules output (D2 through the output guard); a
  `[DEV]` fixture in demo data (SC2).
