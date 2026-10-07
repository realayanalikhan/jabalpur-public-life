# 0017 — Search deferred; archive browsing by taxonomy

- **Status:** Accepted
- **Date:** 2026-10-07
- **Deciders:** Product/technical decision partner (relayed by the project owner)
- **Related:** [Spec F §6](../spec/06-technical-architecture.md); OD-13, T-06

## Context

Search is useful for a large archive, but the archive size is unknown and may be small at launch.

## Decision

1. **No search at MVP.**
2. Archive browsing works through **static pages and filters by taxonomy** (type, decade, theme),
   with shareable URLs and no JavaScript required.
3. The archive taxonomy and content model are designed so that **static search (e.g. Pagefind)
   can be added later without restructuring the content model.**
4. Adding search requires a future decision, triggered when the archive is large enough to
   justify it. Hindi search quality must be tested before adoption.

## Rationale

- Search on a small archive adds weight and maintenance with little benefit.
- Taxonomy browsing works well for small and medium collections and is fully static.
- Planning for static search keeps the option open at low cost.

## Alternatives considered

- **Pagefind at launch:** premature without content.
- **Hosted search services:** cost and third-party data. Rejected.

## Consequences

- Themes must be a controlled vocabulary, and archive items must carry consistent type, date and
  theme metadata.
- Pages should use semantic markup with correct `lang` attributes, which later static indexing
  relies on.
