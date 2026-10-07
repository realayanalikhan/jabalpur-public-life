# 02. Technical foundation (PR A): implementation notes

- **Date:** 2026-10-08
- **Scope:** scaffold plan §18 steps 1–3 (infrastructure only): project setup, configuration,
  environment handling, content schemas, development fixtures, integrity checks I1–I23, bilingual
  routing foundation, production/preview/local rules. **No visual design, components beyond the
  language switch, or real content.**
- **Follows:** [01 technical scaffold plan](01-technical-scaffold-plan.md) and decision records
  0001–0027. No decision was changed.

## Implementation-time choices (scaffold plan §18: "Implementation-time")

| Item | Choice | Why |
|---|---|---|
| IP-01 Astro version | **Astro 7.3.7** (latest stable major at start) | 0008 |
| TypeScript | **6.0.3**, strictest preset (`astro/tsconfigs/strictest`) | TypeScript 7.x is not yet supported by `@astrojs/check` (^5 \|\| ^6) or `typescript-eslint` (< 6.1) |
| IP-07 tooling | Prettier + `prettier-plugin-astro`; ESLint 10 (flat config) + `typescript-eslint` + `eslint-plugin-astro` + `eslint-plugin-jsx-a11y`; Vitest 5; `exifr` for GPS checks | Plan §2 candidates; minimal set |
| IP-07 reference format | Alphabet `23456789ABCDEFGHJKMNPQRSTVWXYZ` (no 0/O/1/I/L), length 6, at least two letters, random (non-sequential) | 0023 points 4–5 |
| IP-06 configuration | Initial values in `site.config.ts`: spec B §4.1 thresholds; homepage updates age 6 months; decade-merge minimum 3; lens-value minimum 2; analytics **off** until a privacy notice exists | 0003, 0016, 0022 |
| Script runner | Node 24's built-in TypeScript type stripping (`node scripts/*.ts`); no extra runner dependency | Fewer dependencies (0019) |
| pnpm build scripts | `esbuild` install script left disabled (`pnpm.ignoredBuiltDependencies`); the build does not need it | pnpm 10 default; no change in behaviour |

## Unavoidable implementation decisions

1. **Astro's built-in i18n routing is not used.** Astro 7's `routing: 'manual'` requires runtime
   middleware, and its automatic modes generate their own `/` redirect. Routing is therefore explicit:
   - `src/lib/routes.ts`;
   - `src/pages/[lang]/…`;
   - `src/pages/index.astro` for `/` → `/hi/`.

   This implements 0002/0021 exactly; the plan's mention of the Astro i18n configuration is
   superseded by this equivalent explicit implementation.
2. **`astro.config.ts`** instead of `astro.config.mjs`, so the configuration can import the typed
   environment and integrity modules.
3. **`SITE_VERIFY_ONLY=1`** is the explicit switch for CI verification builds (plan §6.2).
   - Without it, `SITE_ENV=production` (or unset) is treated as a **deployment** build and is fully
     strict.
   - This is the safe default: a forgotten flag makes the build stricter, never looser.
4. **Translation fingerprints:** the integrity check prints the expected `sourceHash` when a
   translation is stale or unreviewed. Reviewers copy it into the translation record when they
   confirm a translation (spec D §5). A dedicated helper command can follow if needed.
5. **Fixtures load only in local builds.**
   - The content loader includes `src/content/_dev/` only when `SITE_ENV=local`.
   - Preview and production cannot load fixtures at all.
   - I2 (fixture flag, and `[DEV]` text in the output) is the second line of defence.
6. **Empty content folders** contain `.gitkeep`. Astro logs "no files found / collection is empty"
   warnings for them; these are expected until real content exists.
7. **Interface text** comes only from `src/content/glossary/glossary.yaml` (approved editorial,
   2026-10-08). The one exception is the preview-only banner. It is internal tooling text, never in
   production, and the I10 check enforces that.

## What exists now

| Area | Files |
|---|---|
| Setup | `package.json`, `pnpm-lock.yaml`, `tsconfig.json`, `astro.config.ts`, `eslint.config.js`, `.prettierrc.json`, `.prettierignore`, `vitest.config.ts`, `.gitignore` (+ `.integrity/`) |
| Configuration | `site.config.ts` (all tunable values in one place) |
| Environment | `src/lib/env.ts` (local / preview / production; verification vs deployment; domain placeholders; never an invented domain); `scripts/with-env.ts` |
| Content model | `src/content.config.ts` (all 17 entity types + pages, glossary, reference registries); `src/content/<collection>/` (empty) |
| Glossary | `src/content/glossary/glossary.yaml` |
| Reference registry | `src/content/registry/references.yaml` (empty) |
| Fixtures | `src/content/_dev/` (`[DEV]` only; local builds only) |
| Integrity | `src/validation/` (content checks, post-build checks, report, integration, manifest); `src/lib/hash.ts`, `reference.ts`, `visibility.ts`; `scripts/check-repo.ts`, `scripts/new-reference.ts` |
| Bilingual routing | `src/lib/routes.ts`, `src/lib/site.ts`, `src/i18n/` (glossary translator, formatting, text), `src/layouts/BaseLayout.astro`, `src/components/site/LanguageSwitch.astro`, `src/pages/` (root redirect, home, update items with notice pages, sitemaps, robots, 404) |
| Tests | `tests/unit/` (42 tests), `tests/helpers.ts`, `tests/fixtures/images/` |

## Commands

| Command | Purpose |
|---|---|
| `pnpm dev` | Local development (fixtures on) |
| `pnpm build:local` / `build:preview` / `build:verify` | Builds in each environment; `build:verify` is the CI verification build |
| `pnpm build` | Production deployment build. **Fails until launch prerequisites and the real domain exist** (by design) |
| `pnpm check` | Format check, lint, type check, tests, repository scan, verification build |
| `pnpm ref:new` | Print an unused public reference identifier |

## Not in this PR (later PRs, per plan §18)

- **Step 4:** the CI workflow (`.github/workflows/ci.yml`), plus accessibility (axe), link and
  performance jobs.
- **Step 5:** design tokens, fonts and global CSS.
- **Steps 6–7:** components, layouts and pages beyond the routing foundation.
- **Host files:** `_redirects` and `_headers` generation (OD-22 stays open).
