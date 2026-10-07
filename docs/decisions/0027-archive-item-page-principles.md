# 0027 — Archive item page principles

- **Status:** Accepted
- **Date:** 2026-10-07
- **Deciders:** Product/technical decision partner (relayed by the project owner)
- **Related:** [Spec B §3](../spec/02-information-architecture.md), [Spec A FR-A1](../spec/01-product-requirements.md); [0006](0006-archive-strategy.md), [0020](0020-occasion-connective-archive-entity.md), [0022](0022-archive-browsing-model.md), [0023](0023-public-reference-identifiers.md), [0026](0026-verification-and-source-presentation.md); [Design 05](../design/05-archive-item-concept.md), [Design 06 §7–§10](../design/06-key-page-wireframes.md); [Research §16](../research/01-visual-product-research.md#16-archive-ux-concept)

## Context

The archive is the project's long-term differentiator ([0006](0006-archive-strategy.md)). Every
photograph, document, press item and video gets its own page (spec A FR-A1). The research and the
archive-item concept tested how such a page should be ordered so that it feels **editorial and
human rather than database-like**, while carrying full provenance, rights and citation information.

## Decision

1. **Content order on an archive item page:**

   | # | Element | Principle |
   |---|---|---|
   | 1 | **Media first** | The image, document pages or video facade lead. Archival items keep their original proportions and are never cropped |
   | 2 | **Caption** | What · where · when, in a human voice |
   | 3 | **Title** | Editorial title in the page language |
   | 4 | **Date / type / place** | One short line; dates honour their precision ("लगभग", "c.") |
   | 5 | **Source** | Level-1 provenance label ([0026](0026-verification-and-source-presentation.md)) |
   | 6 | **Optional narrative** | Context before metadata, only when written |
   | 7 | **About this item** | The details panel: description, date, place, people depicted (public figures only), original form and language |
   | 8 | **Occasion relationship** | Link to the related Occasion, if any ([0020](0020-occasion-connective-archive-entity.md)) |
   | 9 | **Rights / credit** | Credit and a plain-language rights line; the public reference appears here ([0023](0023-public-reference-identifiers.md)) |
   | 10 | **Use and cite** | Preferred citation and permanent link (with reference), each copyable |
   | 11 | **Related material** | "From the same occasion" first, then same period, theme or place (at most about six) |
   | 12 | **Correction pathway** | "Suggest a correction", quoting the reference where useful |

2. **Type-specific variations:**
   - **Press:** the citation (outlet, date, page, original-script headline, translation, excerpt,
     source and archive links) replaces the media at step 1; a scan appears only where rights
     allow ([0006](0006-archive-strategy.md)).
   - **Document:** page images (redacted derivatives) plus transcription and optional translation.
   - **Video:** click-to-load facade, chapters, captions and transcript.
3. **Empty fields and their labels are omitted.** Never "Unknown", "N/A" or empty headings.
   Elements 6, 8 and 11 appear only when they have content.
4. **Exact visual implementation** (spacing, panel styling, desktop arrangement) belongs to the
   design system. This record fixes order and principles, not CSS.

## Rationale

- Media and caption first make the page human and editorial. Narrative before metadata and one
  details panel keep it from feeling like a database record (research §16; Rijksmuseum, Wellcome).
- Provenance, rights and citation are present and consistent, which makes items citeable and
  correctable (Wellcome, JFK Library, Trove).
- "From the same occasion" gives the archive its connective story ([0020](0020-occasion-connective-archive-entity.md)).

## Alternatives considered

- **Metadata-first record pages** (catalogue style): authoritative but database-like. Rejected.
- **Media-only pages with minimal text:** attractive but not citeable. Rejected.

## Consequences

- Spec A FR-A1 and spec B §3 reference this record.
- The design system must provide the details panel, citation block, related-material groups and
  correction prompt as components.
