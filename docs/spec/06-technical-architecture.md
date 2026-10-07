# F. Technical Architecture Proposal

**Status: PROPOSED. Not approved. Do not install, scaffold or implement anything in this
document until it is approved and recorded in [`../decisions/`](../decisions/).**

Current preferred direction (from the decision partner): Astro + TypeScript, hosted on
Cloudflare. Both pending final approval.

Vendor terms, pricing and limits change. They must be re-checked at approval time.

## 1. Requirements that drive the architecture

| Requirement | Source |
|---|---|
| Content-first, mostly static, very fast on mid-range Android | A §8 |
| Publish gates: unverified, dev-fixture, translation-parity and reference checks enforced automatically | A FR-C, FR-L; C §3 |
| Bilingual routing with hreflang and equivalent pages | D |
| Sections that hide automatically | B §4 |
| Repository-based content, no CMS initially, CMS possible later | Accepted decision 12 |
| Minimal attack surface and no visitor data at MVP | G |
| Archive that may grow substantially | C §9 |
| Low cost, portable, maintainable by a small team | A §8 |

## 2. Framework

| Option | Assessment |
|---|---|
| **Astro + TypeScript** | Content collections with typed schemas validated at build time, which is exactly how the publish gates can be enforced. Static output with zero JavaScript by default; small interactive "islands" where needed. Built-in i18n routing, image optimisation, sitemap support. Can add server endpoints later (e.g. a form) without changing framework. Deploys to any static host. Astro is MIT-licensed; since January 2026 the Astro project is part of Cloudflare, which supports longevity but should not be allowed to create lock-in. |
| Next.js | Capable, but app-oriented; ships more JavaScript; more complexity than a content site needs; best experience is tied to Vercel. |
| Hugo | Very fast builds and mature multilingual support, but weak typed validation and Go templating; publish gates would be harder to enforce. |
| Eleventy | Simple and flexible; we would have to build schema validation and conventions ourselves. |
| SvelteKit | Good framework, but less content-specific tooling than Astro. |
| WordPress (+ multilingual plugin) | Best ready-made editing UI, but requires a server and database, frequent security patching and plugins; slower; the provenance model fits poorly. |

**Recommendation: Astro (latest stable major at scaffold time) + TypeScript in strict mode,
static output.**

## 3. Styling

| Option | Assessment |
|---|---|
| **Modern CSS with design tokens** (custom properties, cascade layers, container queries, logical properties) + Astro component-scoped styles | No extra dependency. Tokens map directly from the design system. Fine-grained bilingual typography via `:lang(hi)` is natural. Long-term stable. |
| Tailwind CSS v4 | Fast to iterate and widely known; works with Astro. Bespoke editorial typography and per-language rules are more awkward to express as utilities; adds a dependency and a build step. |
| CSS-in-JS / component libraries | Unnecessary runtime or weight for a static content site; generic look. |

**Recommendation: modern CSS with design tokens and Astro scoped styles; no utility framework
or UI kit.** Tailwind remains a reasonable alternative if the decision partner prefers it.
The choice does not affect any other part of the architecture.

## 4. Content storage

**Recommendation: Astro content collections in the repository.**

| Content | Format |
|---|---|
| Structured entities (Role, Place, Photo metadata, Coverage, Source, etc.) | One YAML file per entry, with localised fields side by side (`title.en`, `title.hi`). This keeps both languages of one fact in one record, so parity is visible in review. |
| Long-form prose (biography, initiative bodies, policy pages) | Markdown/MDX, one file per language per entry, sharing an ID (e.g. `biography.en.md`, `biography.hi.md`). |
| Glossary | One structured file. |
| Site configuration (visibility thresholds, feature switches such as provenance display) | One typed configuration file. |

**Build-time validation** (fails the build):

- schema conformance and reference integrity;
- `unverified` status on any published item;
- `devFixture` content in a production build;
- `verified` items without a source;
- core pages missing a reviewed translation, or with a stale one;
- archive images that still contain location (GPS) metadata.

**Build-time warnings:** stale translations on non-core items, missing alt text in one language,
items hidden by visibility rules.

Indicative layout (not to be created until approved):

```
src/content/        entities (one folder per type)
src/content/_dev/   development fixtures (blocked in production)
src/assets/         web-ready images processed at build
docs/               specification, decisions, operations guide
```

## 5. Images, documents and video

**Images**

- Build-time processing with Astro's image pipeline: responsive sizes, AVIF/WebP with fallback,
  explicit dimensions to prevent layout shift, lazy loading below the fold.
- Re-encoding strips embedded metadata. Raw images must never be placed where they are served
  unprocessed, and a CI check scans committed images for GPS metadata.
- **MVP:** web-ready masters (e.g. ≤ 2400 px long edge, already redacted) stored in the repository.
- **When the archive grows** (proposed trigger: repository media exceeding ~500 MB or several
  hundred items): move web masters to object storage (e.g. Cloudflare R2) and use on-demand image
  resizing. The content model is unchanged.
- **Preservation masters** (full-resolution scans) never go in git. They are kept in
  family-controlled storage with backup (see G).

**Documents (PDF)**

- Redacted derivative PDFs served as files, with a generated thumbnail and extracted text stored
  as metadata. Large files move to object storage under the same trigger.

**Video**

- **Recommended:** embed from YouTube (privacy-enhanced domain) behind a lightweight click-to-load
  facade, so no third-party code loads until the visitor chooses to play. This requires an
  official channel owned by the person or family.
- Alternative: self-hosted streaming (e.g. Cloudflare Stream) is paid and only justified if
  YouTube is unsuitable for rights or privacy reasons.
- Captions and transcripts stored as content.

## 6. Search and archive browsing

- **MVP:** no search. Archive browsing via pre-rendered pages by type, decade and theme
  (static, shareable URLs, no JavaScript required).
- **Later:** Pagefind, a static search index generated at build time with no server and no
  third-party service. Triggered when the archive is large enough to justify it (open: proposed
  around 100 published archive items). Hindi search quality must be tested before adoption.

## 7. Forms and contact

- **MVP:** links only: `mailto:`, `tel:`, WhatsApp click-to-chat, social profiles. No visitor
  data passes through the website.
- **If a contact form is approved later:** a single serverless endpoint (Cloudflare Worker or
  equivalent) → Cloudflare Turnstile (privacy-friendly bot protection) → server-side validation
  and rate limiting → forward to an approved inbox via a transactional email provider (to be
  selected) → **no storage by default**. Requires a privacy notice and the review in G.
- Event registration, newsletters and public submissions each require separate privacy review
  and approval.

## 8. Hosting

| Option | Assessment |
|---|---|
| **Cloudflare (Workers static assets or Pages)** | Free tier generous for static sites; strong presence in India; preview deployments per branch; R2 object storage with no egress fees; Turnstile; Workers for future endpoints; free cookieless analytics; Access to protect previews. Cloudflare currently steers new projects towards Workers with static assets; choose the product per its guidance at setup time. |
| Vercel | Excellent developer experience, but the free Hobby plan is for non-commercial personal use; whether this site qualifies is ambiguous. Paid plans are priced per team member. |
| Netlify | Capable; built-in form handling. Free tier is credit-based; check limits. |
| GitHub Pages | Requires a paid GitHub plan for a private repository; no serverless functions or per-PR previews. Not recommended. |

**Recommendation: Cloudflare.** The site remains a standard static build, so moving hosts later
is straightforward.

**Domain and DNS:** domain registered in the name of the person/family (open decision);
DNS on Cloudflare with DNSSEC enabled.

## 9. Deployment and environments

| Environment | Trigger | Content included | Access |
|---|---|---|---|
| **Local** | Developer machine | All statuses + dev fixtures | Developer |
| **Preview** | Every pull request / branch | `published` + `review` items, no dev fixtures; hidden-sections report | **Restricted** (e.g. Cloudflare Access) and `noindex`. Used for family review. |
| **Production** | Merge to `main` | `published` only | Public |

## 10. CI/CD

GitHub Actions on every pull request:

1. Install with the frozen lockfile (pnpm, Node 24 per `.nvmrc`).
2. Formatting and linting.
3. Type and template checking (`astro check`).
4. Content validation and publish gates (§4).
5. Production build.
6. Internal link check.
7. Automated accessibility checks (e.g. axe) on built pages.
8. Performance budgets (Lighthouse CI) on key templates.
9. Image metadata/GPS scan; dev-fixture guard.

Dependency updates via Dependabot or Renovate, grouped and reviewed.

**Note:** branch protection rules on **private** repositories require a paid GitHub plan. On the
free plan, CI still runs and reports on pull requests but cannot block merges. Options: upgrade,
move the repository to an organisation on a paid plan, or rely on process. This is an open
decision (see H).

## 11. Analytics

| Option | Assessment |
|---|---|
| **Cloudflare Web Analytics** | Free, cookieless, no consent banner needed, minimal script. **Recommended** if analytics are wanted. |
| Plausible / similar | Cookieless and privacy-focused; paid (or self-hosted). |
| Google Analytics | Cookies, consent requirements, heavier script, more data shared with a third party. Not recommended. |
| None | Simplest and most private; loses insight into what visitors use. |

Whether to have analytics at all is an open decision (see H).

## 12. Dependency policy

- As few runtime and build dependencies as possible; each new dependency is justified in a
  pull request.
- Exact versions locked by `pnpm-lock.yaml`; Node 24 LTS.
- No third-party scripts on public pages other than those approved (analytics, video facade on
  click, Turnstile only on a form page).

## 13. Security headers (static configuration)

Content-Security-Policy (strict, no inline scripts where possible), Strict-Transport-Security,
Referrer-Policy, Permissions-Policy, X-Content-Type-Options, frame-ancestors restrictions.

## 14. Approvals requested

| ID | Decision | Recommendation |
|---|---|---|
| T-01 | Framework | Astro + TypeScript (strict), static output |
| T-02 | Styling | Modern CSS + design tokens + scoped styles (Tailwind as acceptable alternative) |
| T-03 | Content storage | Content collections; YAML for structured entities, Markdown per language for prose |
| T-04 | Image strategy | Build-time processing; repo masters at MVP; object storage at growth trigger |
| T-05 | Video | YouTube embeds behind click-to-load facade |
| T-06 | Search | None at MVP; Pagefind later |
| T-07 | Contact | Links only at MVP; serverless form + Turnstile if approved |
| T-08 | Hosting | Cloudflare |
| T-09 | Environments | Local / restricted preview / production as in §9 |
| T-10 | CI/CD | GitHub Actions with the checks in §10 |
| T-11 | Analytics | Cloudflare Web Analytics, or none |
| T-12 | Package manager / runtime | pnpm, Node 24 LTS |
