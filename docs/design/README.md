# Design

- **Phase:** design definition complete; design decisions formalised (2026-10-07).
- **Start here:** [07 Design implementation brief](07-implementation-brief.md). It is a concise
  summary of what is approved.
- **Not production code.** Test pages are design artefacts. Nothing in this folder is permission to
  start implementation; that follows glossary work and technical-scaffold planning.

## How this folder relates to the rest of the repository

| Folder | Role | Authority |
|---|---|---|
| [`docs/decisions/`](../decisions/README.md) | Decision records | **Highest.** If anything here disagrees with a record, the record wins |
| [`docs/spec/`](../spec/README.md) | Specification (requirements, IA, content model, bilingual, design brief, security, open decisions, glossary) | Normative, kept in line with the records |
| [`docs/research/`](../research/README.md) | Research and its reconciliation with the spec | Evidence; changes nothing by itself |
| `docs/design/` (this folder) | Design tests, visual direction, wireframes, implementation brief | Evidence and design direction. Approved outcomes are recorded in `docs/decisions/` |

## Research

| Document | Use |
|---|---|
| [Research 01: visual and product research](../research/01-visual-product-research.md) | Benchmarks, patterns, thesis (about 21,000 words; read the brief instead) |
| [Research 02: reconciliation with the spec](../research/02-research-to-spec-reconciliation.md) | How research findings were mapped to decisions; photography brief (Appendix A) |

## Design tests

| Document | Result | Artefact |
|---|---|---|
| [01 Bilingual typography test](01-bilingual-typography-test.md) | Direction A recommended, then **accepted (0024)** | [`test-pages/typography-test.html`](test-pages/typography-test.html), [`screenshots/`](screenshots/) |
| [02 Palette validation](02-palette-validation.md) | Direction confirmed; values provisional, then **accepted with provisional values (0025)** | [`test-pages/palette-test.html`](test-pages/palette-test.html) (hot-links openly licensed images; not copied) |
| [05 Archive-item concept](05-archive-item-concept.md) | Restrained reference ID justified, then **0023 accepted**; page order, then **0027** | [`test-pages/archive-item-concept.html`](test-pages/archive-item-concept.html) |

## Approved design decisions

| Decision | Record | Notes |
|---|---|---|
| Typography: Noto Serif Devanagari + Source Serif 4 + system sans UI | [0024](../decisions/0024-typography-system.md) | Physical Android QA required before launch |
| Local-material palette (direction) | [0025](../decisions/0025-local-material-visual-palette.md) | **Exact values provisional** (DP-08) |
| Verification and source presentation | [0026](../decisions/0026-verification-and-source-presentation.md) | 0018 integrity rules unchanged |
| Public reference identifiers (restrained) | [0023](../decisions/0023-public-reference-identifiers.md) | Details, citation and correction only; opaque, non-sequential |
| Archive item page principles | [0027](../decisions/0027-archive-item-page-principles.md) | Order fixed; visual implementation in the design system |
| Design direction, river line, light mode | [0005](../decisions/0005-design-direction.md) | River line: Timeline spine, optional footer rule (DP-06 execution) |
| Archive browsing model | [0022](../decisions/0022-archive-browsing-model.md) | Type · time · theme · place |
| Occasion as connective entity | [0020](../decisions/0020-occasion-connective-archive-entity.md) | No standalone pages yet (DP-07) |
| **Homepage principle** | This folder ([07](07-implementation-brief.md#homepage)) and spec B §4.2 | identity → context → public record → archive → timeline/places → current activity → connect; content-driven; no empty modules |

## Proposed design decisions (not approved)

| ID | Proposal | Analysis |
|---|---|---|
| HP-01 | Homepage site statement | [08](08-homepage-additions-analysis.md#hp-01--site-statement): recommended as an optional module |
| HP-02 | Homepage "places in the record" | [08](08-homepage-additions-analysis.md#hp-02--places-in-the-record): conditional; wait for the inventory |

## Conceptual direction (not decisions)

| Document | Status |
|---|---|
| [03 Visual direction](03-visual-direction.md) | Visual brief. Its typography and palette sections are now governed by 0024/0025 |
| [04 Homepage wireframe](04-homepage-wireframe.md) | Conceptual. H2/H6 are proposals (HP-01/HP-02) |
| [06 Key page wireframes](06-key-page-wireframes.md) | Conceptual system for 12 page types (DP-05 open) |

## Open design questions

Listed in full in the [implementation brief](07-implementation-brief.md#genuinely-unresolved-design-questions)
and [spec H](../spec/08-open-decisions.md):
- DP-04 glossary;
- OD-20 romanisation;
- DP-05 wireframes;
- HP-01 / HP-02;
- DP-07 Occasion pages;
- DP-08 exact palette values;
- DP-06 river-line execution;
- OD-24 corrections response times;
- OD-25 performance targets.

Family-input items (spec H §4) are not decided here.

## Rules for artefacts in this folder

- **Neutral test content only.** Nothing names, depicts or makes claims about the person. Use
  placeholders such as ‹public name›.
- **Fonts** load from Google Fonts in test pages only. Production self-hosts ([0024](../decisions/0024-typography-system.md)).
- **Third-party images** are hot-linked with credits and licences, never copied. Committed
  screenshots contain no third-party photographs.
- **Family-dependent decisions are never made here** (spec H §4).
