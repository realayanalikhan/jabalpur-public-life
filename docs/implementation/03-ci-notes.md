# 03. Continuous integration: implementation notes

- **Date:** 2026-10-08
- **Scope:** scaffold plan §18 sequence step 4: the GitHub Actions CI workflow (§13), running against
  the technical foundation ([02](02-foundation-notes.md)). **Validation only.** The workflow builds
  nothing for deployment, needs no secrets, and adds no visual design, components, pages, fonts,
  images or tokens.
- **Follows:** [01 technical scaffold plan](01-technical-scaffold-plan.md) §6.2 and §13, and decisions
  [0013](../decisions/0013-environments-and-deployment.md), [0014](../decisions/0014-ci-strategy-github-actions.md)
  and [0018](../decisions/0018-content-integrity-rules.md). No decision was changed.

## Workflow

`.github/workflows/ci.yml` runs on every pull request and on pushes to `main`. The numbered step names
match the plan's §13 table.

| Job | Step (§13) | Command | Validates | Result |
|---|---|---|---|---|
| **quality** | 1 | `pnpm install --frozen-lockfile` | Node from `.nvmrc`, pnpm from `packageManager`; lockfile drift | Fail |
| | 2 | `pnpm format:check` | Prettier formatting | Fail |
| | 3 | `pnpm lint` | ESLint, TypeScript and Astro rules, jsx-a11y accessibility rules | Fail |
| | 3, 4 | `pnpm typecheck` | `astro check` (strictest TypeScript, templates and content schemas, including the fixtures) and `tsc --noEmit` | Fail |
| | 4, 5 | `pnpm test` | Unit tests: environments, formatting, routing, every integrity check I1–I23 against synthetic data, route rules R1–R8, source-content check SC1 | Fail |
| | 4, 9 | `pnpm check:repo` | Repository scan: I7 GPS metadata, I21 personal-data patterns, I22 restricted paths and file types, **SC1 fixture-marker contamination in real content** (before any build) | Fail |
| **build** | 5 | `pnpm build:preview` | Preview rules: review and published content, no fixtures, integrity checks with preview outcomes. SC1 runs first, at configuration time | Fail |
| | §15 | `check-routes` (preview) | Bilingual route rules R1–R8 on the preview output | Fail |
| | 5, 6, 7, 11 | `pnpm build:verify` | CI verification build (§6.2): SC1 at configuration time; production rules, `SITE_URL=https://example.invalid`; all integrity and leakage checks (I1–I23, I20 internal links, I2 fixtures, I10 unpublished, I18, I19, I14); launch-readiness items listed as blockers | Fail; launch blockers listed until `launch.ready` |
| | §15 | `pnpm verify:routes` | Bilingual route rules R1–R8 on production-rules output | Fail |
| | 11 | `pnpm verify:output` | Final production output guard (below) | Fail |
| | §6.2 | Deployment guard | A production **deployment** build without the real domain and launch prerequisites must fail (I3, I23) | Fail if the deployment build succeeds before launch |
| **browser** | 8 | Lighthouse CI, mobile and desktop | Accessibility on both languages | Fail below 100 |
| | 10 | `pnpm lighthouse:summary` | Performance figures in the job summary | Report and warn only (OD-25 open) |

`pnpm check` runs the same checks locally, except the preview build, the deployment guard and
Lighthouse.

### Environments in CI

| Build | Settings | Content | Purpose |
|---|---|---|---|
| Preview rules | `SITE_ENV=preview`, `SITE_URL=https://preview.invalid` | Review and published; no fixtures; everything noindex | Proves preview never loads fixtures and preview output is consistent |
| CI verification | `SITE_ENV=production`, `SITE_VERIFY_ONLY=1`, `SITE_URL=https://example.invalid` | Published only | Production rules on every pull request (§6.2) |
| Deployment guard | `SITE_ENV=production`, no verification flag, no `SITE_URL` | Published only | Proves the real deployment build stays fully strict |

Local builds, the only builds that load `[DEV]` fixtures, **never run in CI.** Production rules are not
weakened anywhere: the CI verification build differs from a deployment build only in the
launch-readiness items that §6.2 already defines.

## New files

| File | Purpose |
|---|---|
| `.github/workflows/ci.yml` | The workflow |
| `.github/lighthouse/mobile.json`, `desktop.json` | Lighthouse CI profiles |
| `src/validation/routes-check.ts` | Bilingual route rules R1–R8 |
| `src/validation/source-content.ts` | Source-content check SC1 (fixture-marker contamination in real content) |
| `scripts/check-routes.ts` | Runs R1–R8 on `dist/` with the build's environment |
| `scripts/check-output.ts` | Final production output guard |
| `scripts/lighthouse-summary.ts` | Lighthouse table for the job summary; performance warnings |
| `tests/unit/routes-check.test.ts` | Tests for every route rule |
| `tests/unit/source-content.test.ts` | Tests for SC1 |

## Implementation-time choices

| Item | Choice | Why |
|---|---|---|
| Action versions | `actions/checkout` v7.0.1, `pnpm/action-setup` v6.1.0, `actions/setup-node` v7.0.0, `actions/upload-artifact` v7.0.2, each **pinned to its full commit SHA** | A tag can be moved; a SHA cannot |
| Token permissions | `contents: read` for the whole workflow; no job widens it; `persist-credentials: false` on checkout | Least privilege. The workflow only reads the repository |
| Browser checks | **Lighthouse CI** (`@lhci/cli` 0.15.1, development dependency, exact version). It runs Lighthouse's accessibility audits, which use axe-core, on `/hi/` and `/en/` at **360 px** (mobile emulation and Lighthouse's default mobile throttling) and **1280 px** (desktop preset). Chrome is the runner's preinstalled browser; nothing is downloaded at install time | Plan §2 lists Lighthouse CI. One tool covers both §13 step 8 and step 10 while only two templates exist |
| Performance | Report-only. `pnpm lighthouse:summary` writes LCP, CLS and TBT to the job summary. Mobile results above the spec A §8 working direction (LCP 2.5 s, CLS 0.1) produce warning annotations, never failures. INP is not measurable in a lab run | §13 step 10: warn until OD-25 confirms targets. No new numbers are introduced |
| Route validation | New rules R1–R8 in `src/validation/routes-check.ts` (below) | §15 test list; 0002 and 0021 |
| Final output guard | `scripts/check-output.ts` refuses to run outside production rules. It requires `dist/` and the build manifest, fails on any `_dev` or `.integrity` path in `dist/`, and re-runs the post-build checks (I2, I7, I10, I11, I14, I18, I19, I20) independently of the build | A second, independent line of defence (§13 step 11) |
| Deployment guard | Runs while `launch.ready` is `false`: a production deployment build must fail with "Integrity checks failed". The job fails if it succeeds, or if it fails for any other reason. When `launch.ready` becomes `true`, the step is skipped | Proves a misconfigured deployment cannot ship. It flips with `launch.ready`, so no workflow edit is needed at launch |
| Artifacts | Only `lighthouse-reports/`, kept 7 days. The reports come from the production-rules build. No `dist/` and no preview output are uploaded | Nothing unpublished can leave the runner |
| Concurrency | One run per branch; a newer push cancels the older run | Saves runner time |

## Bilingual route rules (R1–R8)

| Rule | Check |
|---|---|
| R1 | Every `/hi/` page has an `/en/` page at the same path, and vice versa (the real page or its notice page) |
| R2 | `<html lang>` matches the path prefix |
| R3 | Indexable pages have one canonical link, pointing to themselves. Notice pages have none and are noindex |
| R4 | hreflang is either absent or exactly `hi`, `en` and `x-default`; reciprocal; `x-default` equals the Hindi URL; never points to or from a notice page |
| R5 | The sitemap index lists both language sitemaps. Listed URLs exist, are in the sitemap's language and are not notice pages. Every indexable page is listed. Under production rules, noindex pages must not be listed (outside production every page is noindex by design, 0013) |
| R6 | `/` redirects to `/hi/` without scripts |
| R7 | Exactly one language switch (`translate="no"`) linking to the same path in the other language |
| R8 | No language detection or stored preference: no `navigator.language`, cookies, `localStorage` or `sessionStorage` |

## Source-content check SC1: fixture-marker contamination in real content

Added after review of the first CI run's intentional-failure cases. A real content entry carrying
`[DEV]` text **without** `devFixture: true` passed the build while no page rendered it: I2 checks the
fixture flag on loaded entries, `_dev/` content and `[DEV]` in the **output**, as plan §6.1 defines.
SC1 closes that gap at the source. **I2 is unchanged** in meaning, implementation and traceability.

| | |
|---|---|
| **Rule** | A file under `src/content/` outside the fixture area must not contain the development-fixture marker `[DEV]` (anywhere: values, comments, Markdown bodies) or `devFixture: true` (YAML block or flow, Markdown front matter, JSON; any capitalisation of `true`) |
| **Exempt** | `src/content/_dev/` (the top-level fixture area only; a nested `_dev/` inside a real collection is not exempt) and `src/content/README.md` (editor documentation, loaded by no collection) |
| **Inspects** | The source files on the file system (`.yaml`, `.yml`, `.md`, `.mdx`, `.json`, `.csv`, `.txt`, `.svg`), not the content layer and not the output. An entry fails even if no page renders it |
| **Outcome** | Fail in every environment (local, preview, production; verification and deployment) |
| **Runs** | 1. `pnpm check:repo` (CI quality job; `pnpm check`), before any build. 2. Every `astro build` and `astro dev`, through the integrity integration's `astro:config:setup` hook: before the content layer loads any entry and before any page renders. Hosting builds are therefore covered too |
| **Code and tests** | `src/validation/source-content.ts`; `tests/unit/source-content.test.ts` |
| **Traceability** | **Implementation-level integrity rule.** It supports I2 (0018 condition 2) and the synthetic-data rules of plan §15.1 ("every visible text field begins with `[DEV]`"; "never by editing a fixture into a real record"). It is **not** claimed as part of decision 0018, which defines no source-text check |

Relation to I2:

| Situation | I2 | SC1 |
|---|---|---|
| Fixture in `_dev/`, local build | Allowed | Allowed |
| Fixture in `_dev/`, preview or production | Not loaded (loader); I2 is the second line of defence | Allowed (fixture area) |
| `devFixture: true` entry in a real collection | Fails when loaded (all entries are checked) | Fails at source |
| `[DEV]` text in a real entry, rendered | Fails in the output | Fails at source |
| `[DEV]` text in a real entry, not rendered, no flag | Not covered (by definition) | **Fails at source** |

## Unavoidable implementation decisions (for review)

1. **Lighthouse covers the browser checks** (approved in review of PR #9).
   - Plan §13 step 8 says "axe on key templates … fail on serious or critical issues"; plan §2 lists
     both Playwright with axe and Lighthouse CI as candidates.
   - Lighthouse runs axe-core, so one dependency covers steps 8 and 10 without a browser download.
   - The assertion is **stricter** than the plan: any failed accessibility audit fails CI, not only
     serious or critical ones.
   - Future consideration only, not a current requirement or a decision: once page templates exist,
     a template-level axe browser test could be useful.
2. **`pnpm typecheck` now also runs `tsc --noEmit`** after `astro check`, as §13 step 3 lists both.
3. **`pnpm check` was extended** with `verify:routes` and `verify:output`, so the local check matches
   the CI build job.
4. **The preview build runs in CI with route validation,** although §13 does not list it. It proves on
   every pull request that the preview rules load no fixtures.
5. **Source-content check SC1** (above), an implementation-level rule separate from I2.
6. **No automatic fixing.** GitHub pull-request Auto-fix is not enabled: CI stays deterministic and
   reviewable, and failures are corrected manually.

## GitHub Pages deployment (`pages.yml`)

Added on request of the project owner (2026-10-08), after GitHub Pages had been enabled with the
legacy "Deploy from a branch" source, which ran Jekyll over the raw repository and failed on the
`.astro` files. The repository's Pages source is now **GitHub Actions**.

| Step | What |
|---|---|
| Trigger | Push to `main`; manual run |
| Build | `actions/configure-pages` reads the Pages URL; `pnpm install --frozen-lockfile`; `pnpm build:preview` with `SITE_URL` = that URL; route validation R1–R8; a `[DEV]` guard on `dist/` |
| Artifact | `dist/` only, via `actions/upload-pages-artifact` |
| Deploy | `actions/deploy-pages` to the `github-pages` environment |
| Permissions | `contents: read` by default; `pages: read` for the build job; `pages: write` and `id-token: write` for the deploy job only |

- **What is deployed:** the **preview** build: published and in-review content, never fixtures,
  `noindex` on every page, `robots.txt` disallowing crawling, preview banner. A production build is
  not deployed: it fails by design until the launch prerequisites exist (I3, I23), and those gates
  are unchanged.
- **Base path:** a GitHub project site lives under `/<repository>/`. The path of `SITE_URL` becomes
  Astro's `base` (`src/lib/env.ts` `basePath` / `withBase`, `astro.config.ts`). Root-relative links
  (language switch, notice-page link, 404 links, root redirect) are prefixed; canonical, hreflang,
  sitemaps and robots already use `SITE_URL`; the body-font preload is prefixed, and Vite prefixes
  the `@font-face` URLs and the stylesheet. I19, I20 and R6/R7 are base-aware; I20 also fails any
  root-relative link or asset reference (`src`, `srcset`, `poster`, CSS `url()`) that leaves the base
  path. Without a path in `SITE_URL` the base is `/` and the
  output is unchanged (verified byte-for-byte against `main`).
- **The original failure** (`pages-build-deployment` run 37707697958 on `170dfd0`): GitHub's legacy
  branch build ran Jekyll (`jekyll-build-pages`, Jekyll 3.10.0) with the repository root as its
  source. Jekyll read the `---` frontmatter of the `.astro` files as YAML and stopped with "Invalid
  YAML front matter in src/pages/404.astro". It came from the Pages configuration, not from any code
  change; switching the Pages source to GitHub Actions stops that build.
- **Known limits:** `robots.txt` is only honoured at a domain root, so on a project site the
  `noindex` meta on every page is what keeps the preview out of search results. The project has no
  favicon yet, so browsers' automatic `/favicon.ico` request returns 404.
- **Relation to decisions:** 0012 names Cloudflare as the host (product open, OD-22), and 0013
  defines the preview as restricted to invited reviewers. A public, `noindex` preview on github.io
  differs from both and should be recorded by the decision partner (an amendment or a new record).
  The build stays a portable static build, so Cloudflare remains possible.

## Local verification

GitHub's runner cannot be reproduced exactly on Windows without extra tools (`act` requires Docker), so
the workflow's `run:` steps were extracted from `ci.yml` and run in order on a clean tree. Lighthouse
used the local Chrome through `CHROME_PATH`. See the pull request for the results and the intentional
failure cases.

## Commands

| Command | What |
|---|---|
| `pnpm check` | Format, lint, types, tests, repository scan, CI verification build, route validation, output guard |
| `pnpm verify:routes` | R1–R8 on the current `dist/` (run after `pnpm build:verify`) |
| `pnpm verify:output` | Final production output guard on the current `dist/` (run after `pnpm build:verify`) |
| `pnpm exec lhci collect --config=.github/lighthouse/mobile.json` (then `upload`, `assert`) | Lighthouse locally; set `CHROME_PATH` if Chrome is not found |
| `pnpm lighthouse:summary` | Summary of the latest Lighthouse reports |
