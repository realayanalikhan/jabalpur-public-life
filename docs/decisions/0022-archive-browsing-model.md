# 0022 — Archive browsing model

- **Status:** Accepted (clarifies [0017](0017-search-deferred.md))
- **Date:** 2026-10-07
- **Deciders:** Product/technical decision partner (relayed by the project owner)
- **Related:** [Spec A FR-A2](../spec/01-product-requirements.md), [Spec B §2, §6](../spec/02-information-architecture.md), [Spec C §6](../spec/03-content-architecture.md), [Spec F §6](../spec/06-technical-architecture.md); [Research §5, §16](../research/01-visual-product-research.md); [Reconciliation C-08](../research/02-research-to-spec-reconciliation.md)

## Context

[0017](0017-search-deferred.md) deferred search and set archive browsing through static
taxonomy pages "(type, decade, theme)". The research found that:

- the best archives combine **curated entry points** with a few clear **browse lenses**;
- periods that follow a life read better than raw decades;
- place is a natural lens for a civic life (research §5, §16; Churchill Archive, Densho, Willy
  Brandt biography).

Spec B already treats Place as a filter within Archive. This record states the complete browsing
model, so that the archive stays editorial and human rather than database-like.

## Decision

1. **Editorial first.** The Archive hub leads with curated material (a featured collection, named
   collections, a few hand-picked items). Browse lenses are secondary entry points, each with a
   one-line definition.
2. **Four lenses:**

   | Lens | Values | Notes |
   |---|---|---|
   | **Type** | Photographs, Documents, In the Press, Video | The existing Archive sub-sections |
   | **Time** | **Periods** where available; **decades** otherwise | Periods are named phases derived from Roles (role terms), with an optional editor-supplied title. Decades are generated from item dates. Sparse decades are merged (e.g. "1960s–70s") below a configurable minimum. |
   | **Theme** | Controlled vocabulary (Theme entity) | No free tags, no tag clouds |
   | **Place** | Place entities (ward, locality, landmark…) | No map at MVP |

3. **One lens at a time.** Each lens value is a static, shareable page within Archive (e.g. a theme
   or place filter page), which may group items by type. Lens values are filters within Archive,
   not standalone sections ([spec B §2](../spec/02-information-architecture.md)).
4. **No database-style interface.** No multi-select facet panels, no sort/filter toolbars, no
   visible item counts, no "1 of N" pagination on small sets. Everything works without JavaScript.
5. **Visibility rules apply.** Lenses and lens values appear only when they meet configuration-driven
   minimums, as for sections ([0003](0003-information-architecture.md)).
6. **No search at MVP** (unchanged from 0017). The taxonomy stays search-ready.

## Rationale

- Curated entry points, then a small set of defined lenses, is the pattern that makes small archives
  feel substantial (research §16: Churchill "Topic in Focus", Densho's defined browse routes,
  Indian Memory Project's decade and event buckets).
- Periods carry meaning for a public life; decades alone do not (research §16, §19).
- Place makes Jabalpur present through content rather than decoration
  ([0005](0005-design-direction.md); research §13.6).
- Avoiding faceted UI and counts prevents thin categories from being exposed and keeps the tone
  editorial.

## Alternatives considered

- **Type, decade and theme only (0017 as worded):** omits place and period, the two lenses most
  specific to a civic life. Superseded by this clarification.
- **Faceted multi-filter interface:** database-like; needs JavaScript or an explosion of static
  combinations; exposes empty or near-empty results. Rejected.
- **Map-based browsing:** attractive but heavy, and premature without inventory. Deferred.

## Consequences

- Spec A FR-A2, spec B §2/§6, spec C §6 and spec F §6 are updated to "type · time (period/decade) ·
  theme · place" (spec v1.2).
- Configuration gains a minimum for decade merging and lens-value visibility (values set at
  implementation).
- Hindi labels for lenses are glossary entries ([spec 09](../spec/09-language-glossary.md)).
