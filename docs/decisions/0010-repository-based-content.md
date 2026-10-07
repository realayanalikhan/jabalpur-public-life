# 0010 — Repository-based content with Astro content collections

- **Status:** Accepted
- **Date:** 2026-10-07
- **Deciders:** Product/technical decision partner (relayed by the project owner)
- **Related:** [Spec F §4](../spec/06-technical-architecture.md), [Spec C](../spec/03-content-architecture.md); T-03

## Context

With no CMS at MVP ([0007](0007-no-cms-at-mvp.md)), content lives in the repository. The format
must support validated structured entities, long-form bilingual prose and the integrity rules.

## Decision

1. Content is stored as **Astro content collections** in the repository, validated by typed schemas.
2. **Structured entities** (Role, Place, Photo metadata, Coverage, Source, etc.) use **YAML**.
   Localised structured fields may live together in one record where appropriate (e.g. `title.en`,
   `title.hi`).
3. **Long-form prose** (biography, initiative bodies, policy pages) uses **Markdown/MDX**.
   Translations may be separate language files sharing a stable ID (e.g. `biography.hi.md`,
   `biography.en.md`).
4. Site-wide configuration (visibility thresholds, homepage updates age, provenance display,
   analytics switch, storage options) lives in one typed configuration file.
5. Development fixtures are stored separately from real content and flagged.
6. **Restricted data is never stored in the repository** (spec G §1).

## Rationale

- Typed schemas make the integrity rules enforceable at build time.
- Keeping both languages of one structured fact in one record makes parity visible in review.
- Separate prose files per language suit translators and keep diffs readable.
- Open formats (YAML, Markdown) are portable and CMS-ready later.

## Alternatives considered

- **JSON for structured entities:** equally valid but less readable for hand editing. Not chosen.
- **One file per language for every entity:** duplicates language-neutral data and hides parity
  gaps. Rejected for structured entities.
- **A database:** unnecessary for a static site; adds hosting and operations. Rejected.

## Consequences

- Content changes go through git and pull requests, with full history.
- Schemas evolve with content in stages ([0004](0004-content-and-verification-model.md)).
- Since the repository could one day become public, internal notes must contain nothing
  restricted.
