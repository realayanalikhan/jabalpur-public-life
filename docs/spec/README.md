# Project Specification v1

- **Version:** 1.2
- **Date:** 2026-10-07
- **Overall status:** Product and technical architecture decisions approved and recorded in
  [`../decisions/`](../decisions/README.md). v1.2 reconciles the specification with the
  [visual and product research](../research/README.md). Typography and palette remain
  **provisional** until the design-phase visual tests. Open items are listed in
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
| E | [Design Brief](05-design-brief.md) | Accepted direction; typography and palette **provisional** pending visual tests; design system produced in design phase | 0005, 0009 |
| F | [Technical Architecture](06-technical-architecture.md) | **Approved**, with a few setup/operational items open | 0007–0019, 0022 |
| G | [Security, Privacy & Content Integrity](07-security-privacy-integrity.md) | Working direction (principles accepted; legal review open) | 0006, 0015, 0018 |
| H | [Open Decisions](08-open-decisions.md) | Living list | — |
| 09 | [Language Glossary](09-language-glossary.md) | **Framework** (no entries approved except those marked); future source of truth for bilingual content | 0002, 0021 |

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
