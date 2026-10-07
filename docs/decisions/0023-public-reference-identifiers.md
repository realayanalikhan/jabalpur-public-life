# 0023 — Public reference identifiers for archive items

- **Status:** Accepted (restrained form)
- **Date:** 2026-10-07 (proposed and accepted)
- **Deciders:** Product/technical decision partner (relayed by the project owner), after reviewing
  the [archive-item concept](../design/05-archive-item-concept.md)
- **Related:** [Spec C §2](../spec/03-content-architecture.md#2-common-fields-all-entities), [Spec A FR-A7](../spec/01-product-requirements.md), [Spec B §3](../spec/02-information-architecture.md), [Spec G §8](../spec/07-security-privacy-integrity.md); [0006](0006-archive-strategy.md), [0015](0015-mvp-contact-strategy.md), [0018](0018-content-integrity-rules.md), [0027](0027-archive-item-page-principles.md); [Research §16, §19 item 5](../research/01-visual-product-research.md); closes OD-26

## Context

The research recommended a short public reference identifier for each archive item, shown on the
item page and in citations (JFK Library digital identifiers, MAP Bengaluru catalogue numbers). Each
item already has a stable internal `id` behind its Latin-script URL slug (spec C §2). The question
was whether a separate public identifier improves citation and provenance without making the
interface feel like a database.

### Analysis (at proposal)

| Question | Assessment |
|---|---|
| **Citation and provenance** | **Improves moderately.** URLs identify items on screen. A short opaque reference also survives title corrections, is identical in Hindi and English, and works in print, press copy and speech |
| **Corrections** | **Improves.** With links-only contact ([0015](0015-mvp-contact-strategy.md)), a reference makes email and WhatsApp correction requests unambiguous (spec G §8) |
| **Visual noise** | **Only if shown everywhere.** Confined to the item's details and citation, it is invisible to casual visitors |
| **Internal-only alternative** | Gives none of the citation or press benefit |
| **Cost** | Low: one field, a uniqueness check, a never-reuse rule |

### Evidence from the design test

The [archive-item concept](../design/05-archive-item-concept.md) rendered three variants at 360 px:
no reference, restrained, and everywhere. The restrained variant added about two lines on a long page,
in exactly the places a researcher or journalist would look. Showing the reference on cards and
header lines made the page read like a catalogue database.

## Decision

1. **A permanent, short reference identifier exists for each archive item** (Photo, Video,
   Document, Coverage). Collections and Occasions do not have one unless a later decision extends
   this.
2. **It appears only:**
   - in the item's details and provenance area ("About this item");
   - in the citation ("Use and cite") area;
   - where useful in the correction workflow (e.g. "quote this reference when suggesting a
     correction").
3. **It must not appear:**
   - on archive cards or in listings;
   - in homepage grids or modules;
   - as a visual headline;
   - in captions, unless genuinely needed;
   - as a dominant metadata element (e.g. in the header line beside date, type and place).
4. **It must not encode:**
   - dates;
   - political claims, names or places;
   - categories that could change (e.g. media type, theme, collection);
   - an ordering that creates a misleading chronology. Sequential numbers can be read as "oldest
     first", so the reference is **non-sequential**.
5. **Form.** Short and opaque: for example a few characters from an unambiguous alphabet (avoiding
   0/O and 1/I/l), optionally with a fixed site-wide prefix. Identical in both languages. The exact
   format is set at implementation, within these constraints. "P-0042" in the design concept was
   illustrative only and is superseded by point 4.
6. **Permanence.**
   - Assigned when an item is first published.
   - Never changed, and never reused, even if the item is later unpublished or corrected.
   - Uniqueness is validated at build time (an extension of [0018](0018-content-integrity-rules.md)'s
     reference-integrity rule).
7. **Purpose:** durable citation and unambiguous correction and reference. Not navigation, not
   decoration.

## Rationale

- Makes the archive citeable and correctable in the way the strongest archives are, at very low
  cost.
- The design test showed the restrained placement adds negligible visual weight. The prohibited
  placements are the ones that made the test page feel database-like.
- Excluding dates, categories and sequence keeps the identifier true when facts are corrected or
  items reclassified.

## Alternatives considered

- **No public identifier (URL only):** fragile in print and speech; tied to wording.
- **Internal-only identifier:** no citation or correction benefit.
- **Use the slug as the reference:** long, Latin-only, wording-dependent.
- **Type-prefixed or sequential identifiers (e.g. `P-0042`, `1998-P-12`):** encode a category or
  imply chronology. Rejected by point 4.
- **Show the reference on every card and caption:** database feel. Rejected by point 3.

## Consequences

- Spec C §2 gains a `reference` field for archive items. Spec A gains FR-A7. Spec B §3 describes
  where it appears. OD-26 is closed.
- The glossary needs a label entry ("Reference" and its Hindi form; [spec 09](../spec/09-language-glossary.md)).
- How We Verify and Corrections & Feedback may mention quoting the reference.
- An optional short redirect route (e.g. `/r/‹ref›`) is **not** part of this decision.
