# H. Open Decisions

**Status:** Living list (updated for spec v1.3). When an item is decided, record it in
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

## 2. Design-phase decisions

These need design work (tests, wireframes, wording) but **no family input**, unless noted.

| ID | Decision | Current position | Depends on | Ref |
|---|---|---|---|---|
| DP-04 | Glossary entries (interface, archive, verification labels, date, typography conventions) | **Open.** Framework in [09](09-language-glossary.md); entries move from *proposed* to *approved* there. Includes final wording of verification labels ([0026](../decisions/0026-verification-and-source-presentation.md)) and the reference label ([0023](../decisions/0023-public-reference-identifiers.md)). Names of the person depend on FI-06. | OD-20, OD-16, FI-06 | 09 |
| DP-05 | Homepage and key page wireframes | **Open.** Conceptual wireframes exist ([design 04](../design/04-homepage-wireframe.md), [06](../design/06-key-page-wireframes.md)); they are design direction, not permission to code. Finalised after DP-04 and the homepage decisions HP-01/HP-02. | DP-04, HP-01, HP-02 | B; design 04, 06 |
| DP-06 | River-line motif execution | **Direction tested and settled** ([0005](../decisions/0005-design-direction.md); [design 03 §8](../design/03-visual-direction.md#8-the-river-line)): primarily the **Timeline spine**; at most one restrained rule above the footer; never decorative elsewhere, never animated, never a logo, never competing with photography or typography; the site must work perfectly without it. **Open:** execution details (stroke weight, where it bends) in the design system. | Design system | E §5 |
| DP-07 | Whether Occasions get standalone public pages | **Open.** The model is approved ([0020](../decisions/0020-occasion-connective-archive-entity.md)): Occasions connect material, and archive items, the Timeline and updates can reference them. **Recommendation:** an Occasion should receive a standalone public page **only when it has enough related material for the page to be editorially useful**; otherwise it remains a relationship/metadata layer. No route is created until decided, informed by the archive inventory. | FI-03, DP-05 | C §4.1; B §3 |
| DP-08 | Exact palette values | **Open.** Direction accepted ([0025](../decisions/0025-local-material-visual-palette.md)). Candidate values stay provisional until validated against authentic project imagery (family archive samples, any commissioned photography), dry-season Narmada photographs (accent hue), the ink and warm-band variants, and contrast checks. | FI-03, OD-17 | E §4; design 02 |
| HP-01 | Homepage site statement | **Proposed** (not approved; not a launch requirement). Analysis: recommended as an optional module ([design 08](../design/08-homepage-additions-analysis.md#hp-01--site-statement)). | Decision partner | B §4.2 |
| HP-02 | Homepage "places in the record" | **Proposed** (not approved; not a launch requirement). Analysis: conditional and threshold-governed; decide once the inventory is known ([design 08](../design/08-homepage-additions-analysis.md#hp-02--places-in-the-record)). | FI-03 | B §4.2 |

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
| Material about one real-world occasion | **Resolved:** Occasion entity connects archive items and updates; `onTimeline` flag; TimelineEvent only for milestones without material | [0020](../decisions/0020-occasion-connective-archive-entity.md) (amends 0004); A FR-A6, FR-N4; B §3, §6; C §4, §4.1, §5, §6, §11 |
| Corrections response times | **Clarified:** guidance only; open as OD-24 | G §8 |
| Performance targets | **Clarified:** working direction; open as OD-25 | A §8 |
| Duplicate OD-23 / FI-07 | **Resolved:** OD-23 merged into FI-07 | Part 5 |

### Design decisions (spec v1.3)

| ID | Decision | Resolution | Record |
|---|---|---|---|
| DP-01 | Typography | **Resolved:** Noto Serif Devanagari + Source Serif 4 + system sans UI; based on the rendered 360/412 px test; physical Android QA required | [0024](../decisions/0024-typography-system.md) |
| DP-02 | Palette direction | **Resolved (direction):** marble / granite / Narmada blue-green / restrained warm tone. Exact values: DP-08 (open) | [0025](../decisions/0025-local-material-visual-palette.md) |
| DP-03 | Verification presentation | **Resolved:** short source markers, "Sources and notes", Level-1 labels with optional details; no badges or traffic-light colours. Label wording: DP-04 | [0026](../decisions/0026-verification-and-source-presentation.md) |
| OD-26 | Public reference identifiers | **Resolved:** accepted in restrained form (details, citation, correction only; opaque, non-sequential) | [0023](../decisions/0023-public-reference-identifiers.md) |
| — | Archive item page principles | **Resolved:** media → caption → title → date/type/place → source → narrative → details → occasion → rights/credit → use and cite → related → correction | [0027](../decisions/0027-archive-item-page-principles.md) |
| — | Homepage principle | **Resolved:** identity → context → public record → archive → timeline/places → current activity → connect; content-driven; no empty modules, placeholder cards, fake activity or invented content | B §4.2; [design 07](../design/07-implementation-brief.md#homepage) |
