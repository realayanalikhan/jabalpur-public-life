# F. Technical Architecture

**Status: APPROVED (2026-10-07)**, recorded in decision records
[0008](../decisions/0008-astro-and-typescript.md)–[0019](../decisions/0019-runtime-and-package-manager.md).
A few setup and operational details remain open; they are marked **Open** below and tracked in
[H](08-open-decisions.md).

**Implementation has not started.** Nothing in this document has been installed or scaffolded.
Implementation begins only on a separate instruction.

Vendor terms, pricing and limits change. Re-check them when accounts are set up.

## 1. Requirements that drive the architecture

| Requirement | Source |
|---|---|
| Content-first, mostly static, very fast on mid-range Android | A §8 |
| Publish gates enforced automatically | [0018](../decisions/0018-content-integrity-rules.md) |
| Bilingual routing with hreflang and equivalent pages | [0002](../decisions/0002-bilingual-strategy.md) |
| Sections that hide automatically, configuration-driven | [0003](../decisions/0003-information-architecture.md) |
| Repository-based content, no CMS initially | [0007](../decisions/0007-no-cms-at-mvp.md) |
| Minimal attack surface; no visitor data at MVP | [0015](../decisions/0015-mvp-contact-strategy.md), G |
| Archive that may grow substantially | [0006](../decisions/0006-archive-strategy.md) |
| Low cost, portable, maintainable by a small team | A §8 |

## 2. Framework — Approved ([0008](../decisions/0008-astro-and-typescript.md))

**Decision: Astro + TypeScript (strict), static output initially.** Use the latest stable Astro
major available when implementation begins.

| Option | Assessment |
|---|---|
| **Astro + TypeScript** ✅ | Content collections with typed schemas validated at build time, which is how publish gates are enforced. Zero JavaScript by default; islands where needed. Built-in i18n routing, image optimisation, sitemap support. Static output deploys anywhere. MIT-licensed; part of Cloudflare since January 2026, so avoid lock-in. |
| Next.js | App-oriented; more JavaScript and complexity than needed; best on Vercel. |
| Hugo | Fast, multilingual; weak typed validation; awkward templating. |
| Eleventy | Flexible; validation and conventions would be hand-built. |
| SvelteKit | Capable; less content-specific tooling. |
| WordPress | Server, database and patching; poor fit for provenance. |

## 3. Styling — Approved ([0009](../decisions/0009-modern-css-and-design-tokens.md))

**Decision: modern CSS with design tokens and Astro scoped styles.** Uses CSS custom properties,
cascade layers where appropriate, container queries where useful, logical properties, responsive
typography and language-specific typography rules. **No Tailwind** unless explicitly revisited.
**No generic UI framework.**

| Option | Assessment |
|---|---|
| **Modern CSS + tokens + scoped styles** ✅ | No dependency; tokens map from the design system; `:lang(hi)` rules are natural; stable long term. |
| Tailwind CSS v4 | Not chosen. Fast iteration, but less natural for bespoke editorial and per-language typography; adds a dependency. |
| CSS-in-JS / component libraries | Rejected. Unnecessary weight; generic look. |

## 4. Content storage — Approved ([0010](../decisions/0010-repository-based-content.md))

**Decision: Astro content collections in the repository.**

| Content | Format |
|---|---|
| Structured entities | YAML, one file per entry; localised fields may live together (`title.hi`, `title.en`). |
| Long-form prose | Markdown/MDX; translations may be separate language files sharing a stable ID (`biography.hi.md`, `biography.en.md`). |
| Glossary | One structured file. |
| Site configuration | One typed configuration file: visibility thresholds, homepage updates age, provenance display, analytics switch, storage options. |

**Production build fails** ([0018](../decisions/0018-content-integrity-rules.md)) if:

- an `unverified` item is publishable;
- development fixture data is included;
- a required core translation is missing;
- a required core translation is stale;
- a `verified` item has no source;
- a content reference is broken;
- a published image contains GPS metadata;
- required accessibility metadata is missing where the validation rule applies (e.g. alt text in
  each language the item is published in).

**Build warnings:** stale translations on non-core items; items hidden by visibility rules.

Indicative layout (not created until implementation is instructed):

```
src/content/        entities (one folder per type)
src/content/_dev/   development fixtures (blocked from preview and production)
src/assets/         processed web-ready images
docs/               specification, decisions, operations guide
```

## 5. Images, documents and video — Approved ([0011](../decisions/0011-image-and-media-strategy.md))

**Images and documents (approved with modification)**

- Astro build-time image processing: responsive sizes, modern formats with fallback, explicit
  dimensions, lazy loading below the fold.
- Re-encoding strips embedded metadata. Raw images are never placed where they are served
  unprocessed. A check fails the build if a published image contains GPS metadata.
- **At MVP:** processed web-ready image assets may live in the repository.
- **Preservation/original masters are never committed to git.** Originals remain in separately
  controlled family storage with backup.
- **Storage migration threshold: configurable operational decision, not hard-coded.**
  **Open** (OD-21): set when the actual inventory is known. Object storage (e.g. Cloudflare R2)
  can be introduced later without changing the content model.
- Documents are published only as redacted derivatives, with extracted text generated after
  redaction.

**Video (approved conditionally)**

- Use a provider such as YouTube behind a click-to-load facade **if** an appropriate official
  channel exists **and** the family chooses to use it.
- The Video entity uses a **provider abstraction** (provider + identifier, or self-hosted file),
  so the content model is never permanently dependent on YouTube.
- Captions and transcripts stored as content.

## 6. Search and archive browsing — Approved ([0017](../decisions/0017-search-deferred.md))

- **No search at MVP.**
- Archive browsing via static pages, one lens at a time: type, time (period or decade), theme and
  place ([0022](../decisions/0022-archive-browsing-model.md)). Shareable URLs; no JavaScript
  required; no faceted filter interface.
- Taxonomy and content model designed so that static search (e.g. Pagefind) can be added later
  without restructuring. Adding search requires a future decision; Hindi search quality must be
  tested first.

## 7. Contact — Approved ([0015](../decisions/0015-mvp-contact-strategy.md))

- **Links only at MVP:** potential methods are WhatsApp, phone, email and official social
  profiles, depending on the family's approved channels (FI-08).
- **No server-side contact form.** No visitor information passes through or is stored by the
  website.
- Any future form requires a separate privacy/security decision. (A possible future shape:
  serverless endpoint → privacy-friendly bot protection → validation and rate limiting → forward
  without storage. Not approved.)

## 8. Hosting — Approved ([0012](../decisions/0012-cloudflare-hosting.md))

**Decision: Cloudflare**, while keeping the site a portable static build that does not depend on
proprietary Cloudflare runtime functionality unless needed.

| Option | Assessment |
|---|---|
| **Cloudflare** ✅ | Generous free static hosting; strong presence in India; per-branch previews; access control for previews; optional object storage, analytics and bot protection later. |
| Vercel | Free Hobby plan is non-commercial personal use only; ambiguous for this site. |
| Netlify | Capable; credit-based free tier; no decisive advantage. |
| GitHub Pages | Paid plan needed for private repos; no previews or functions. |

- **Open** (OD-22): specific product (Workers static assets or Pages), chosen at setup.
- **Domain:** ownership should ultimately rest with the person/family, not an individual
  developer. **Open** (FI-01): the actual domain and registrant. DNSSEC when set up.
- No unnecessary paid services (OD-17 budget open).

## 9. Environments — Approved ([0013](../decisions/0013-environments-and-deployment.md))

| Environment | Trigger | Content included | Access |
|---|---|---|---|
| **Local** | Developer machine | All statuses + development fixtures | Developer |
| **Restricted preview** | Each branch / pull request | `published` + `review`; **never development fixtures**; hidden-sections report | Invited reviewers only; `noindex` |
| **Production** | Merge to `main` | `published` only | Public |

## 10. CI/CD — Approved ([0014](../decisions/0014-ci-strategy-github-actions.md)); not yet implemented

GitHub Actions will eventually enforce:

1. Frozen dependency installation (pnpm, Node 24 per `.nvmrc`).
2. Formatting and linting.
3. Type and template checking.
4. Content schema validation.
5. Publish gates (§4).
6. Production build.
7. Internal-link checking.
8. Accessibility checks.
9. Performance checks.
10. GPS/image metadata checks.
11. Development-fixture protection.

Dependency updates via a reviewed, automated update tool (to be chosen at implementation).

**Branch protection (resolved):** no GitHub upgrade or repository move solely for branch
protection at this stage. Actions still run; merges follow the review process (never merge with
failing checks). Revisit if team or project risk grows. The production hosting build runs the
same publish gates.

## 11. Analytics — Approved ([0016](../decisions/0016-analytics-strategy.md))

**Decision: Cloudflare Web Analytics**, configurable and disableable without architectural
changes. **No Google Analytics.**

## 12. Runtime and dependencies — Approved ([0019](../decisions/0019-runtime-and-package-manager.md))

- Node 24 LTS (existing `.nvmrc`) and pnpm with a committed lockfile.
- As few dependencies as possible; each new dependency justified in its pull request.
- No third-party scripts on public pages other than approved ones (analytics; video only after
  the visitor clicks).

## 13. Security headers (static configuration)

Content-Security-Policy (strict; only approved origins), Strict-Transport-Security,
Referrer-Policy, Permissions-Policy, X-Content-Type-Options, frame-ancestors restrictions.
Detailed values to be set at implementation.

## 14. Approval status

| ID | Decision | Status | Record |
|---|---|---|---|
| T-01 | Astro + TypeScript strict, static | Approved | [0008](../decisions/0008-astro-and-typescript.md) |
| T-02 | Modern CSS + tokens + scoped styles; no Tailwind | Approved | [0009](../decisions/0009-modern-css-and-design-tokens.md) |
| T-03 | Content collections; YAML + Markdown/MDX | Approved | [0010](../decisions/0010-repository-based-content.md) |
| T-04 | Build-time images; masters never in git; configurable migration threshold | Approved with modification | [0011](../decisions/0011-image-and-media-strategy.md) |
| T-05 | Video via provider abstraction (e.g. YouTube facade) | Approved conditionally | [0011](../decisions/0011-image-and-media-strategy.md) |
| T-06 | No search at MVP | Approved | [0017](../decisions/0017-search-deferred.md) |
| T-07 | Links-only contact | Approved | [0015](../decisions/0015-mvp-contact-strategy.md) |
| T-08 | Cloudflare hosting, portable | Approved | [0012](../decisions/0012-cloudflare-hosting.md) |
| T-09 | Local / restricted preview / production | Approved | [0013](../decisions/0013-environments-and-deployment.md) |
| T-10 | GitHub Actions CI | Approved (not implemented) | [0014](../decisions/0014-ci-strategy-github-actions.md) |
| T-11 | Cloudflare Web Analytics, configurable | Approved | [0016](../decisions/0016-analytics-strategy.md) |
| T-12 | Node 24 LTS + pnpm | Approved | [0019](../decisions/0019-runtime-and-package-manager.md) |

**Still open within this document:** OD-21 (storage migration threshold), OD-22 (Cloudflare
product), FI-01 (domain), and implementation-time details (exact security header values,
dependency-update tool).
