# H. Open Decisions

**Status:** Living list. When an item is decided, record it in [`../decisions/`](../decisions/)
and move it to the Resolved section with a link.

This list deliberately does **not** ask for the person's actual information. Part 2 only names the
*topics* that will need to be collected later.

## 1. Open decisions

| ID | Decision | Current position | Blocks | Ref |
|---|---|---|---|---|
| OD-16 | Who reviews Hindi and English translations | **Open.** To be determined when actual content is collected. No reviewer is assumed. | Publishing reviewed translations | D §5 |
| OD-17 | Budget (photography, human translation, legal review, domain) | **Open.** Meanwhile: no unnecessary paid services; use the approved low-cost architecture. | Commissioned photography, professional translation | E §3, G |
| OD-18 | Professional legal review of privacy notice, terms and takedown policy | **Open.** To be decided before launch. Legal-page structure is built; its content is not presented as legally approved. | Launch | G |
| OD-19 | Launch date | **Open (date only).** Planning approach resolved: no artificial calendar deadline; **milestone-based planning**. | — | A §5 |
| OD-20 | Romanisation convention for names and recurring terms | **Open (convention only).** Decision to use a single convention is resolved ([0002](../decisions/0002-bilingual-strategy.md)); the convention itself is defined when the glossary is created. | Glossary, slugs, SEO | D §9 |
| OD-21 | Archive storage migration threshold | **Open (operational).** Configurable; set when the actual inventory is known ([0011](../decisions/0011-image-and-media-strategy.md)). | Moving web assets to object storage | F §5 |
| OD-22 | Specific Cloudflare product (Workers static assets or Pages) | **Open (setup detail).** Chosen at setup per Cloudflare's guidance ([0012](../decisions/0012-cloudflare-hosting.md)). | Deployment setup | F §8 |
| OD-23 | Publication policy for personal details (e.g. date of birth, family members) | **Open.** Needs the family's preference (FI-07). | Person entity display | G §3 |

## 2. Requires input from the person or family (later)

**Not being requested now.** Listed only so the architecture leaves room for them.

| ID | Topic | Why it matters |
|---|---|---|
| FI-01 | Domain name and who owns the domain, hosting and repository | Ownership, security, handover (G §11, [0012](../decisions/0012-cloudflare-hosting.md)) |
| FI-02 | Who will maintain content after launch, how often, and their technical comfort | Future CMS need ([0007](../decisions/0007-no-cms-at-mvp.md)), Updates cadence |
| FI-03 | Archive inventory: approximate numbers and types of photos, clippings, documents, videos; whether digitised; who holds originals | Archive scope, storage threshold (OD-21) |
| FI-04 | Where restricted materials and preservation masters will be kept | G §1, §14; [0011](../decisions/0011-image-and-media-strategy.md) |
| FI-05 | Preferences on party affiliation display | Public Life content |
| FI-06 | Preferred public name and spellings in both scripts | Glossary, SEO |
| FI-07 | Policy on personal details such as date of birth and family members | OD-23, G §3 |
| FI-08 | Approved public contact channels and who responds | Connect, Corrections, Press Kit ([0015](../decisions/0015-mvp-contact-strategy.md)) |
| FI-09 | Official social and video channels | Connect, impersonation protection, video ([0011](../decisions/0011-image-and-media-strategy.md)) |
| FI-10 | Topics or materials to avoid or treat with care | Editorial review |
| FI-11 | Consent arrangements for people appearing in photographs | G §6 |

## 3. Resolved

### Product decisions

| Item | Resolution | Record |
|---|---|---|
| Product purpose, posture, core principles | Resolved | [0001](../decisions/0001-product-purpose-and-posture.md) |
| Languages (Hindi + English, first-class) | Resolved | [0002](../decisions/0002-bilingual-strategy.md) |
| Information architecture | Resolved | [0003](../decisions/0003-information-architecture.md) |
| Content model and verification statuses | Resolved | [0004](../decisions/0004-content-and-verification-model.md) |
| Design direction | Resolved | [0005](../decisions/0005-design-direction.md) |
| Archive strategy | Resolved | [0006](../decisions/0006-archive-strategy.md) |
| No CMS at MVP | Resolved | [0007](../decisions/0007-no-cms-at-mvp.md) |
| Content integrity rules | Resolved | [0018](../decisions/0018-content-integrity-rules.md) |

### Open decisions now resolved

| ID | Decision | Resolution | Record |
|---|---|---|---|
| OD-01 | Default language at `/` | **Resolved:** Hindi; `/` → `/hi/`; English at `/en/`; hreflang + `x-default` | [0002](../decisions/0002-bilingual-strategy.md) |
| OD-02 | Public provenance | **Resolved:** concise labels + optional fuller source details; no academic footnotes | [0004](../decisions/0004-content-and-verification-model.md) |
| OD-03 | Section visibility thresholds | **Resolved:** proposed thresholds accepted; configuration-driven, not hard-coded | [0003](../decisions/0003-information-architecture.md) |
| OD-04 | Digits on Hindi pages | **Resolved:** Western numerals (0–9) | [0002](../decisions/0002-bilingual-strategy.md) |
| OD-05 | Hindi spelling of "Hindi" | **Resolved:** "हिंदी"; single romanisation convention in glossary (convention itself: OD-20) | [0002](../decisions/0002-bilingual-strategy.md) |
| OD-06 | Newspaper scans / press rights | **Resolved:** citation + excerpt + link by default; full scans only with established rights | [0006](../decisions/0006-archive-strategy.md) |
| OD-07 | Contact at launch | **Resolved:** links only; no form; no visitor data through the website | [0015](../decisions/0015-mvp-contact-strategy.md) |
| OD-08 | Public contributions | **Resolved:** not at launch | [0006](../decisions/0006-archive-strategy.md) |
| OD-09 | Analytics | **Resolved:** Cloudflare Web Analytics, configurable; no Google Analytics | [0016](../decisions/0016-analytics-strategy.md) |
| OD-10 | Single-language Updates | **Resolved:** allowed with language label; core pages bilingual | [0002](../decisions/0002-bilingual-strategy.md) |
| OD-11 | Dark mode | **Resolved:** light mode only at launch | [0005](../decisions/0005-design-direction.md) |
| OD-12 | Jabalpur/Narmada motif | **Resolved:** restrained palette + extremely subtle river line; no literal marble texture | [0005](../decisions/0005-design-direction.md) |
| OD-13 | Search | **Resolved:** no search at MVP; taxonomy ready for static search later | [0017](../decisions/0017-search-deferred.md) |
| OD-14 | Homepage recent-updates age | **Resolved:** 6 months, configurable; homepage timeless without it | [0003](../decisions/0003-information-architecture.md) |
| OD-15 | Branch protection | **Resolved:** no upgrade for now; Actions still run; rely on process; revisit if risk grows | [0014](../decisions/0014-ci-strategy-github-actions.md) |

### Technical approvals

| ID | Decision | Resolution | Record |
|---|---|---|---|
| T-01 | Framework | **Resolved:** Astro + TypeScript strict, static output | [0008](../decisions/0008-astro-and-typescript.md) |
| T-02 | Styling | **Resolved:** modern CSS + design tokens + scoped styles; no Tailwind | [0009](../decisions/0009-modern-css-and-design-tokens.md) |
| T-03 | Content storage | **Resolved:** content collections; YAML entities; Markdown/MDX prose | [0010](../decisions/0010-repository-based-content.md) |
| T-04 | Image strategy | **Resolved (modified):** build-time processing; web assets in repo at MVP; masters never in git; configurable migration threshold | [0011](../decisions/0011-image-and-media-strategy.md) |
| T-05 | Video | **Resolved (conditional):** e.g. YouTube facade if an official channel exists and the family chooses it; provider abstraction | [0011](../decisions/0011-image-and-media-strategy.md) |
| T-06 | Search | **Resolved:** none at MVP | [0017](../decisions/0017-search-deferred.md) |
| T-07 | Contact | **Resolved:** links only | [0015](../decisions/0015-mvp-contact-strategy.md) |
| T-08 | Hosting | **Resolved:** Cloudflare, kept portable | [0012](../decisions/0012-cloudflare-hosting.md) |
| T-09 | Environments | **Resolved:** local / restricted preview / production | [0013](../decisions/0013-environments-and-deployment.md) |
| T-10 | CI/CD | **Resolved:** GitHub Actions (not yet implemented) | [0014](../decisions/0014-ci-strategy-github-actions.md) |
| T-11 | Analytics tool | **Resolved:** Cloudflare Web Analytics | [0016](../decisions/0016-analytics-strategy.md) |
| T-12 | Runtime | **Resolved:** Node 24 LTS + pnpm | [0019](../decisions/0019-runtime-and-package-manager.md) |
