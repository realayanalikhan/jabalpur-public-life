# 0023 — Public reference identifiers for archive items

- **Status:** **Proposed** (awaiting approval; not to be implemented until accepted)
- **Date:** 2026-10-07
- **Deciders:** For decision by the product/technical decision partner
- **Related:** [Spec C §2](../spec/03-content-architecture.md), [Spec G §8](../spec/07-security-privacy-integrity.md); [0006](0006-archive-strategy.md), [0021](0021-language-switching-and-single-language-content.md); [Research §16, §19 item 5](../research/01-visual-product-research.md)

## Context

The research recommends a short public reference identifier for each archive item, shown on the
item page and in citations (JFK Library digital identifiers, MAP Bengaluru catalogue numbers). Each
item already has a stable internal `id` that is the basis of its Latin-script URL slug (spec C §2).
The question is whether a separate public identifier is worth adding.

### Analysis

| Question | Assessment |
|---|---|
| **Does it improve citation and provenance?** | **Yes, moderately.** A URL already identifies an item, but slugs are long and Latin-only, and they are usually derived from wording that may later be corrected. A short opaque reference does not depend on content wording, so it survives title corrections. It is identical in Hindi and English, and it can be cited in print, in press copy and in speech. |
| **Does it help corrections?** | **Yes.** Contact at MVP is links only ([0015](0015-mvp-contact-strategy.md)), so correction requests arrive by email or WhatsApp. A short reference ("about item ‹ref›") identifies the item unambiguously (spec G §8). |
| **Does it add visual noise?** | **Only if shown everywhere.** On cards, grids or captions it would add database texture. Shown only in the item page's "About this item" panel and in the copyable citation, it is invisible to casual visitors and useful to people who need it. |
| **Should it be internal-only?** | **No.** An internal-only identifier gives none of the citation or press benefit, and the internal `id` already serves internal purposes. |
| **Is it useful for press and archive references?** | **Yes.** Journalists can cite "‹ref›" alongside a Press Kit photo. Researchers can cite items stably. |
| **Cost** | Low: one field per archive item, a uniqueness check, and a rule never to reuse identifiers. |

## Decision (proposed)

1. Each **archive item** (Photo, Document, Coverage, Video) gets a **public reference identifier**.
   Collections and Occasions do not, unless a later decision extends it.
2. The identifier is **short, opaque and permanent**:
   - it never encodes a date, place, name or claim;
   - it is never reused, even if the item is unpublished;
   - it is assigned when the item is first published.
3. The exact format is set at implementation, e.g. a short prefix plus a zero-padded sequence.
4. **Display:** only in the item page's "About this item" panel and in the "Use and cite" citation.
   **Not** on cards, listings, homepage modules or captions.
5. The label wording ("Reference" and its Hindi form) is a glossary entry
   ([spec 09](../spec/09-language-glossary.md)).
6. Uniqueness is validated at build time (an extension of the reference-integrity rule in
   [0018](0018-content-integrity-rules.md)).

## Rationale

The identifier makes the archive citeable and correctable in the way the strongest references are,
at very low cost. Restricting where it is displayed avoids the database feel the research warns
against.

## Alternatives considered

- **No public identifier (URL only):** simplest, but fragile in print and speech, and ties citation
  to wording that may be corrected.
- **Internal-only identifier:** no citation or press benefit; duplicates the internal `id`.
- **Show the slug as the reference:** long, Latin-only, wording-dependent.
- **Date- or type-encoded identifiers (e.g. `1998-P-12`):** break when dates are corrected. Rejected.
- **Show the reference on every card and caption:** adds visual noise. Rejected.

## Consequences (if accepted)

- Spec C gains a `reference` field on archive item types, and spec B's item-page description shows
  it in the item panel.
- An optional short redirect route (e.g. `/r/‹ref›`) could be considered later; it is not part of
  this proposal.
- Until accepted, nothing is added to the model. This is tracked as OD-26 in
  [spec H](../spec/08-open-decisions.md).
