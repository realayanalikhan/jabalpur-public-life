# Project Specification v1

- **Version:** 1.4
- **Date:** 2026-10-07
- **Overall status:** Product and technical architecture decisions approved and recorded in
  [`../decisions/`](../decisions/README.md). v1.2 reconciles the specification with the
  [visual and product research](../research/README.md). v1.3 records the design decisions from
  the [design tests](../design/README.md): typography (0024), palette direction with provisional
  values (0025), verification presentation (0026), public reference IDs (0023) and archive item
  principles (0027). v1.4 completes the [glossary and content conventions](09-language-glossary.md)
  (recommendations awaiting approval) and adds the [technical scaffold plan](../implementation/01-technical-scaffold-plan.md)
  (plan only). Open items are listed in
  [H](08-open-decisions.md). **Implementation has not started.**

This folder is the project specification. Approved decisions are recorded separately in
[`../decisions/`](../decisions/README.md). Where the two differ, the decision record wins.

## Documents

| # | Document | Status | Decision records |
|---|---|---|---|
| A | [Product Requirements](01-product-requirements.md) | Accepted (MVP scope and numeric targets: working direction) | 0001 |
| B | [Information Architecture](02-information-architecture.md) | Accepted | 0003, 0021, 0022 |
| C | [Content Architecture](03-content-architecture.md) | Accepted (entity model as working direction) | 0004, 0006, 0020, 0022 |
| D | [Bilingual Architecture](04-bilingual-architecture.md) | Accepted | 0002, 0018, 0021 |
| E | [Design Brief](05-design-brief.md) | Accepted direction; typography approved; palette direction approved, values **provisional** (DP-08); design system produced in design phase | 0005, 0009, 0024, 0025, 0026 |
| F | [Technical Architecture](06-technical-architecture.md) | **Approved**, with a few setup/operational items open | 0007–0019, 0022 |
| G | [Security, Privacy & Content Integrity](07-security-privacy-integrity.md) | Working direction (principles accepted; legal review open) | 0006, 0015, 0018 |
| H | [Open Decisions](08-open-decisions.md) | Living list | — |
| 09 | [Language Glossary and Content Conventions](09-language-glossary.md) | Version 2: conventions and **Recommended** terminology awaiting approval; romanisation open (OD-20); family-specific terms never inferred | 0002, 0021, 0023, 0024, 0026 |

## Status legend

| Status | Meaning |
|---|---|
| **Accepted** | Approved by the product/technical decision partner. |
| **Working direction** | Direction approved; details may be refined during design or implementation. |
| **Proposed** | A recommendation awaiting approval. Must not be implemented. |
| **Open** | Requires a decision or information. Tracked in [08](08-open-decisions.md). |

## Ground rules for everything in this specification

1. **No person-specific information.** This specification describes structure only. It contains
   no name, party, ward, dates, roles, achievements, quotes or contact details, and none may be
   added to the repository until supplied by the person or family and processed under
   [document G](07-security-privacy-integrity.md).
2. **No fictional demo content.** Development data must be obviously synthetic, marked as a
   development fixture, and blocked from production builds.
3. **Evidence before claims.** See principle 1 in [document A](01-product-requirements.md#4-product-principles).

## Terms used in this specification

| Term | Meaning |
|---|---|
| **The person** | The public figure the website is about. |
| **The family** | The person and/or family members who supply and approve content. |
| **Maintainer** | Whoever adds and edits content after launch (to be decided). |
| **Decision partner** | The product/technical decision maker who approves this specification. |
| **Provenance** | Where an item or claim came from, and the evidence for it. |
| **Verification status** | One of `verified`, `supplied`, `media-reported`, `unverified` (see C §3). |
| **Publish gate** | An automated rule that blocks content from the public site if requirements are unmet. |
| **Section visibility** | The rule that a section appears only when it has enough published content. |

## Change log

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-10-07 | First specification from accepted product decisions and the initial architecture analysis. |
| 1.1 | 2026-10-07 | Approved decisions recorded (0001–0019). F marked approved. H restructured into open / family input / resolved. Resolved items updated in A, B, C, D, E and G. Image storage threshold made configurable; video given a provider abstraction; accessibility metadata added to build-failing checks. |
| 1.2 | 2026-10-07 | **Reconciliation with the visual and product research** ([research 02](../research/02-research-to-spec-reconciliation.md)). Changes are listed below. |
| 1.3 | 2026-10-07 | **Design decisions formalised** from the [design tests](../design/README.md). Changes are listed below. |
| 1.4 | 2026-10-08 | **Glossary and content conventions completed; technical scaffold plan added.** Changes are listed below. |

### v1.4 changes in detail

| Change | Sections changed | Decision record |
|---|---|---|
| Glossary rewritten as **version 2**: status system (Proposed / Recommended / Approved editorial / Family-confirmed / Deprecated); recommended Hindi navigation labels; "Archive" → अभिलेखागार (collections संग्रह, items सामग्री); date, number and month-name conventions (CLDR `hi-IN`: अक्टूबर, फ़रवरी, सितंबर…); nuqta and spelling rules; bilingual punctuation; captions; verification wording (स्रोत से पुष्ट); metadata labels; romanisation documented but **open**; family-specific terms listed | 09 | 0002, 0021, 0023, 0024, 0026 (applied, unchanged) |
| Technical scaffold plan added (**plan only**) | [implementation/01](../implementation/01-technical-scaffold-plan.md) | Applies 0003–0027; no new decision |
| DP-04 status updated; IP-07 added | H | — |

### v1.3 changes in detail

| Change | Sections changed | Decision record |
|---|---|---|
| Typography approved: Noto Serif Devanagari + Source Serif 4 + system sans UI; rendered 360/412 px test basis; physical Android QA required | E §2, E §11; D §8 | [0024](../decisions/0024-typography-system.md) |
| Palette direction approved (marble / granite / Narmada blue-green / restrained warm tone); exact values provisional (DP-08) | E §4, E §11 | [0025](../decisions/0025-local-material-visual-palette.md) |
| Verification and source presentation: short markers, "Sources and notes", Level-1 label + optional details; no badges or traffic-light colours | C §3, E §10 | [0026](../decisions/0026-verification-and-source-presentation.md) |
| Public reference identifiers **accepted** (restrained; opaque, non-sequential; details, citation and correction only) | A FR-A7 (new); B §3; C §2; 09 §6 | [0023](../decisions/0023-public-reference-identifiers.md) |
| Archive item page principles (12-step order) | A FR-A1; B §3 | [0027](../decisions/0027-archive-item-page-principles.md) |
| Homepage principle recorded; site statement (HP-01) and places section (HP-02) left **proposed** | B §4.2 | — ([design 08](../design/08-homepage-additions-analysis.md)) |
| River line: tested direction recorded (DP-06) | E §5 | [0005](../decisions/0005-design-direction.md) (unchanged) |
| Occasion standalone pages left open with recommendation (DP-07); DP-08 opened; H updated | H | — |

### v1.2 changes in detail

| Change | Sections changed | Decision record |
|---|---|---|
| Typography wording corrected: Tiro Devanagari Hindi does **not** include a matching Latin text font; leading candidate recorded (Noto Serif Devanagari + Source Serif 4 + system sans for interface text); pairing **not locked** pending the bilingual visual test | E §2, E §11 item 2; D §8 (pairing need not come from one family) | — (DP-01 open) |
| Web-font rule clarified: at most two self-hosted families (Devanagari + Latin) for content; system sans for interface text does not count; no third web font | E §2 | — |
| Colour language: "sandstone/basalt" replaced by marble / granite / Narmada blue-green / restrained warm tone (marble, brick, lime plaster); research hex values explicitly provisional, not tokens; no colour-coding of statuses | E §4, E §11 item 3 | — (DP-02 open) |
| "Sources and notes" replaces footnotes: concise markers for specific claims, a "Sources and notes" section on longer pages, optional source details; traceability unchanged | C §3, E §10 | [0004](../decisions/0004-content-and-verification-model.md) (unchanged) |
| `x-default` points to the `/hi/` equivalent route of each page | D §3, D §7 | [0021](../decisions/0021-language-switching-and-single-language-content.md) |
| One language-switch convention: a single link showing only the other language in full, in its own script, on desktop and mobile | B §1, D §4, D §10 | [0021](../decisions/0021-language-switching-and-single-language-content.md) |
| No remembered language preference at MVP (no cookies or local storage) | D §3, D §4 | [0021](../decisions/0021-language-switching-and-single-language-content.md) |
| Single-language items: `noindex` notice page at the counterpart path; no pretend translations; excluded from hreflang and sitemaps; section visibility counts items once | B §8 (new), D §4, D §6, D §7 | [0021](../decisions/0021-language-switching-and-single-language-content.md) |
| `[हिंदी \| EN]` navigation sketch removed | B §1 | [0021](../decisions/0021-language-switching-and-single-language-content.md) |
| Archive browsing model: type · time (period/decade) · theme · place; editorial first; no faceted UI; no search | A FR-A2, B §7 (new), C §6, F §6 | [0022](../decisions/0022-archive-browsing-model.md) |
| **Occasion** added as the connective archive entity: archive items and updates may reference the real-world occasion they document; `onTimeline` flag; TimelineEvent limited to milestones without material; Occasion vs TimelineEvent vs Activity vs Initiative vs archive item distinguished | A FR-A6 (new), FR-N4; B §3, §6; C §4, §4.1 (new), §5, §6, §11 | [0020](../decisions/0020-occasion-connective-archive-entity.md) (amends [0004](../decisions/0004-content-and-verification-model.md)) |
| Public reference identifiers analysed and **proposed** (not adopted) | — | [0023](../decisions/0023-public-reference-identifiers.md) (Proposed) |
| Corrections response times marked as proposed guidance; open as OD-24 | G §8 | — |
| Performance targets explicitly marked working direction; open as OD-25 | A §8 | — |
| OD-23 merged into FI-07; H restructured into open / design-phase / implementation-phase / family-input / retired / resolved | G §3, H | — |
| **Language glossary framework** added: status system (proposed / approved / family-confirmed / deprecated), entry format, and categories to resolve (navigation, public-life terms, archive terms, dates, typography and punctuation, romanisation, names and places), with no final wording invented | 09 (new); D §9 | [0002](../decisions/0002-bilingual-strategy.md), [0021](../decisions/0021-language-switching-and-single-language-content.md) |
