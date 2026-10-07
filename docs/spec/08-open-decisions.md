# H. Open Decisions

**Status:** Living list (updated for spec v1.2). When an item is decided, record it in
[`../decisions/`](../decisions/README.md) and move it to the Resolved section with a link.
IDs are never reused.

This list deliberately does **not** ask for the person's actual information. Part 4 only names the
*topics* that will need to be collected later.

| Part | Contents |
|---|---|
| [1](#1-open-product-and-technical-decisions) | Genuinely open product/technical decisions |
| [2](#2-design-phase-decisions) | Decisions to make in the design phase (visual test, palette test, glossary, wireframes) |
| [3](#3-implementation-phase-decisions) | Decisions to make during implementation |
| [4](#4-family-and-budget-input-required) | Decisions and topics that need the person, the family or a budget |
| [5](#5-retired-ids) | Retired or merged IDs |
| [6](#6-resolved) | Resolved items with links to decision records |

## 1. Open product and technical decisions

| ID | Decision | Current position | Blocks | Ref |
|---|---|---|---|---|
| OD-19 | Launch date | **Open (date only).** Planning approach resolved: milestone-based, no artificial calendar deadline. | — | A §5 |
| OD-20 | Romanisation convention for names and recurring terms | **Open.** The decision to use one convention is resolved ([0002](../decisions/0002-bilingual-strategy.md)); the convention itself is chosen through the glossary framework ([09 §8](09-language-glossary.md)). Not resolved here. | Glossary, slugs, English text, SEO | D §9, 09 |
| OD-24 | Corrections response times | **Open.** Spec G §8 proposes "acknowledge within 7 days; resolve or explain within 30 days" as **guidance only**. No response time is published until decided. Depends on who handles corrections (FI-02, FI-08). | Corrections & Feedback page wording | G §8 |
| OD-25 | Performance targets | **Open (confirmation).** The numeric targets in spec A §8 (LCP, INP, CLS, touch targets) are working direction, not formally decided. To be confirmed or tuned in the technical phase, ideally after the bilingual visual test. | CI performance budgets | A §8 |
| OD-26 | Public reference identifiers for archive items | **Proposed** in [0023](../decisions/0023-public-reference-identifiers.md) and awaiting approval. Not to be implemented until accepted. | Item page "About this item" panel, citations | C §2 |

## 2. Design-phase decisions

These need design work (tests, wireframes, wording) but **no family input**, unless noted.

| ID | Decision | Current position | Depends on | Ref |
|---|---|---|---|---|
| DP-01 | Final typography pairing | **Leading candidate (not locked):** Noto Serif Devanagari + Source Serif 4 + system sans for interface text. Alternative: Tiro Devanagari Hindi + Literata. Decided after the **bilingual visual test** on a mid-range Android viewport; then recorded in a decision record. | DP-04 (real interface labels for the test) | E §2, E §11; research §13.3 |
| DP-02 | Palette validation and design tokens | **Provisional:** marble off-white `#F5F3EE`, granite ink `#1F2627`, Narmada blue-green `#1F5357`, one restrained warm tone. **Not tokens yet.** Validated against authentic Jabalpur photography and contrast-checked first. Approved existing imagery can be used if commissioned photography is not available. | Imagery (commissioned photography depends on OD-17 and family approval) | E §4, E §11; research §13.2 |
| DP-03 | Verification label wording and launch display level | Model approved (concise label + optional details + "Sources and notes"; C §3). Draft wording in research §16. **Final Hindi wording needs the translation reviewer** (OD-16). | OD-16 | C §3; research §16 |
| DP-04 | Glossary entries (interface, archive, date, typography conventions) | Framework in [09](09-language-glossary.md). Entries move from *proposed* to *approved* there. Names of the person depend on FI-06. | OD-20, OD-16, FI-06 | 09 |
| DP-05 | Homepage and key page wireframes | Concept in research §14–§16, using placeholders only. | DP-01, DP-02 (provisional), DP-04 | B; research §14–§16 |
| DP-06 | River-line motif execution | Direction approved ([0005](../decisions/0005-design-direction.md)); execution (weight, where it bends, footer use) in the design system. | DP-02 | E §5; research §13.6 |

## 3. Implementation-phase decisions

| ID | Decision | Current position | Ref |
|---|---|---|---|
| OD-21 | Archive storage migration threshold | **Open (operational).** Configurable; set when the actual inventory is known ([0011](../decisions/0011-image-and-media-strategy.md)). | F §5 |
| OD-22 | Cloudflare product (Workers static assets or Pages) | **Open (setup detail).** Chosen at setup per Cloudflare's guidance ([0012](../decisions/0012-cloudflare-hosting.md)). | F §8 |
| IP-01 | Exact Astro version | Latest stable major when implementation begins ([0008](../decisions/0008-astro-and-typescript.md)). | F §2 |
| IP-02 | Security header and Content-Security-Policy values | Set at implementation. | F §13 |
| IP-03 | Dependency-update tool | Set at implementation. | F §10 |
| IP-04 | Preview access mechanism | Restricted preview approved ([0013](../decisions/0013-environments-and-deployment.md)); mechanism (e.g. Cloudflare Access) set at setup. | F §9 |
| IP-05 | Field-level content schemas | Added in stages as real content requires (C §1, §11). | C |
| IP-06 | Configuration values | Visibility thresholds (initial values in B §4.1), homepage updates age, decade-merge minimum and lens-value minimums ([0022](../decisions/0022-archive-browsing-model.md)). | B §4, B §7 |

## 4. Family and budget input required

**Not being requested now.** Nothing here is answered or assumed in this specification.

### 4.1 Decisions that need family or budget input

| ID | Decision | Current position | Ref |
|---|---|---|---|
| OD-16 | Translation reviewer for Hindi and English | **Open.** Determined when actual content is collected. No reviewer is assumed. | D §5 |
| OD-17 | Budget (photography, human translation, legal review, domain, paid fonts if ever needed) | **Open.** Meanwhile: no unnecessary paid services; free-licence typography path. **Commissioned photography** also depends on family approval and availability; it is **not** an implementation prerequisite (brief: [reconciliation Appendix A](../research/02-research-to-spec-reconciliation.md#appendix-a--photography-brief-for-later-use)). | E §3, G |
| OD-18 | Professional legal review of privacy notice, terms and takedown policy | **Open.** Decided before launch. Legal-page structure is built; content is not presented as legally approved. | G |

### 4.2 Topics to collect from the person or family

| ID | Topic | Why it matters |
|---|---|---|
| FI-01 | Domain name and who owns the domain, hosting and repository | Ownership, security, handover (G §11, [0012](../decisions/0012-cloudflare-hosting.md)) |
| FI-02 | Who will maintain content after launch, how often, and their technical comfort | Future CMS need ([0007](../decisions/0007-no-cms-at-mvp.md)), Updates cadence, corrections handling (OD-24) |
| FI-03 | Archive inventory: approximate numbers and types of photos, clippings, documents, videos; whether digitised; who holds originals | Archive scope, storage threshold (OD-21) |
| FI-04 | Where restricted materials and original/master files will be kept | G §1, §14; [0011](../decisions/0011-image-and-media-strategy.md) |
| FI-05 | Whether and how party affiliation is presented | Public Life content |
| FI-06 | Preferred public name, and its spellings in Hindi and in Latin script | Glossary (09 §9), SEO, wordmark |
| FI-07 | **Personal-details policy:** what may be published about the person and family (e.g. date of birth, family members) | G §3; Person entity display. *(Absorbs former OD-23.)* |
| FI-08 | Approved public contact channels and who responds | Connect, Corrections, Press Kit ([0015](../decisions/0015-mvp-contact-strategy.md)) |
| FI-09 | Official social accounts and official video channel | Connect, impersonation protection, video provider ([0011](../decisions/0011-image-and-media-strategy.md)) |
| FI-10 | Topics or materials to avoid or treat with care | Editorial review |
| FI-11 | Consent arrangements for people appearing in photographs | G §6 |

## 5. Retired IDs

| ID | Status | Note |
|---|---|---|
| OD-23 | **Merged into FI-07** (2026-10-07) | It duplicated FI-07 (personal-details policy). Do not reuse the ID. |

## 6. Resolved

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

### Open decisions resolved earlier (spec v1.1)

| ID | Decision | Resolution | Record |
|---|---|---|---|
| OD-01 | Default language at `/` | **Resolved:** Hindi; `/` → `/hi/`; English at `/en/` | [0002](../decisions/0002-bilingual-strategy.md), [0021](../decisions/0021-language-switching-and-single-language-content.md) |
| OD-02 | Public provenance | **Resolved:** concise labels + optional fuller source details; no academic footnotes ("Sources and notes", C §3) | [0004](../decisions/0004-content-and-verification-model.md) |
| OD-03 | Section visibility thresholds | **Resolved:** configuration-driven | [0003](../decisions/0003-information-architecture.md) |
| OD-04 | Digits on Hindi pages | **Resolved:** Western numerals (0–9) | [0002](../decisions/0002-bilingual-strategy.md) |
| OD-05 | Hindi spelling of "Hindi" | **Resolved:** "हिंदी" (romanisation convention: OD-20, open) | [0002](../decisions/0002-bilingual-strategy.md) |
| OD-06 | Newspaper scans / press rights | **Resolved:** citation + excerpt + link by default | [0006](../decisions/0006-archive-strategy.md) |
| OD-07 | Contact at launch | **Resolved:** links only | [0015](../decisions/0015-mvp-contact-strategy.md) |
| OD-08 | Public contributions | **Resolved:** not at launch | [0006](../decisions/0006-archive-strategy.md) |
| OD-09 | Analytics | **Resolved:** Cloudflare Web Analytics, configurable | [0016](../decisions/0016-analytics-strategy.md) |
| OD-10 | Single-language Updates | **Resolved:** allowed with label; behaviour clarified in v1.2 | [0002](../decisions/0002-bilingual-strategy.md), [0021](../decisions/0021-language-switching-and-single-language-content.md) |
| OD-11 | Dark mode | **Resolved:** light mode only at launch | [0005](../decisions/0005-design-direction.md) |
| OD-12 | Jabalpur/Narmada motif | **Resolved:** restrained palette + extremely subtle river line | [0005](../decisions/0005-design-direction.md) |
| OD-13 | Search | **Resolved:** no search at MVP | [0017](../decisions/0017-search-deferred.md) |
| OD-14 | Homepage recent-updates age | **Resolved:** 6 months, configurable | [0003](../decisions/0003-information-architecture.md) |
| OD-15 | Branch protection | **Resolved:** no upgrade for now | [0014](../decisions/0014-ci-strategy-github-actions.md) |

### Technical approvals (spec v1.1)

| ID | Decision | Resolution | Record |
|---|---|---|---|
| T-01 | Framework | Astro + TypeScript strict, static | [0008](../decisions/0008-astro-and-typescript.md) |
| T-02 | Styling | Modern CSS + tokens + scoped styles; no Tailwind | [0009](../decisions/0009-modern-css-and-design-tokens.md) |
| T-03 | Content storage | Content collections; YAML + Markdown/MDX | [0010](../decisions/0010-repository-based-content.md) |
| T-04 | Image strategy | Build-time processing; masters never in git | [0011](../decisions/0011-image-and-media-strategy.md) |
| T-05 | Video | Provider abstraction; conditional YouTube facade | [0011](../decisions/0011-image-and-media-strategy.md) |
| T-06 | Search | None at MVP | [0017](../decisions/0017-search-deferred.md) |
| T-07 | Contact | Links only | [0015](../decisions/0015-mvp-contact-strategy.md) |
| T-08 | Hosting | Cloudflare, portable | [0012](../decisions/0012-cloudflare-hosting.md) |
| T-09 | Environments | Local / restricted preview / production | [0013](../decisions/0013-environments-and-deployment.md) |
| T-10 | CI/CD | GitHub Actions (not yet implemented) | [0014](../decisions/0014-ci-strategy-github-actions.md) |
| T-11 | Analytics tool | Cloudflare Web Analytics | [0016](../decisions/0016-analytics-strategy.md) |
| T-12 | Runtime | Node 24 LTS + pnpm | [0019](../decisions/0019-runtime-and-package-manager.md) |

### Research reconciliation (spec v1.2)

| Item | Resolution | Record / spec |
|---|---|---|
| Typography candidate wording (Tiro has no matching Latin text font) | **Resolved (wording).** Leading candidate recorded; pairing **not locked** (DP-01) | E §2 |
| Web-font family rule | **Resolved:** at most two self-hosted families (Devanagari + Latin) for content; system sans for interface text does not count | E §2 |
| Colour language | **Resolved (wording):** marble / granite / Narmada blue-green / restrained warm tone; hex values provisional (DP-02) | E §4 |
| Sources and notes | **Resolved:** concise markers for specific claims + "Sources and notes" section + optional source details; traceability unchanged | C §3, E §10 |
| `x-default` target | **Resolved:** the `/hi/` equivalent route of each page | [0021](../decisions/0021-language-switching-and-single-language-content.md); D §3 |
| Language switch convention | **Resolved:** a single link showing only the other language, in full, in its own script | [0021](../decisions/0021-language-switching-and-single-language-content.md); B §1, D §4 |
| Remembered language preference | **Resolved:** not persisted at MVP (no cookies or local storage) | [0021](../decisions/0021-language-switching-and-single-language-content.md); D §3–§4 |
| Single-language items | **Resolved:** `noindex` notice page at the counterpart path; no pretend translations; excluded from hreflang/sitemaps | [0021](../decisions/0021-language-switching-and-single-language-content.md); B §8, D §6–§7 |
| Navigation language label | **Resolved:** `[हिंदी \| EN]` sketch removed | [0021](../decisions/0021-language-switching-and-single-language-content.md); B §1 |
| Archive browsing model | **Resolved:** type · time (period/decade) · theme · place, editorial first, no faceted UI | [0022](../decisions/0022-archive-browsing-model.md); A FR-A2, B §7, C §6, F §6 |
| Corrections response times | **Clarified:** guidance only; open as OD-24 | G §8 |
| Performance targets | **Clarified:** working direction; open as OD-25 | A §8 |
| Duplicate OD-23 / FI-07 | **Resolved:** OD-23 merged into FI-07 | Part 5 |
