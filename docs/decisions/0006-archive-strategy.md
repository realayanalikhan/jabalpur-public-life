# 0006 — Archive strategy

- **Status:** Accepted
- **Date:** 2026-10-07
- **Deciders:** Product/technical decision partner (relayed by the project owner)
- **Related:** [Spec C](../spec/03-content-architecture.md), [Spec G §4, §10, §14](../spec/07-security-privacy-integrity.md); OD-06, OD-08

## Context

The archive is the project's main long-term differentiator. Its size and composition are unknown.
Archive material raises rights, privacy and preservation issues, especially newspaper clippings,
press photographs and personal documents.

## Decision

1. **Scope:** the archive will eventually support photographs, newspaper coverage, documents,
   interviews, video, events, historical material and collections/stories.
2. **No over-engineering:** archive features and entity fields are built in stages as the real
   inventory justifies them (spec C §11).
3. **Rights default (OD-06): citation + excerpt + link.** Permission to reproduce complete
   newspaper scans is **not** assumed. Full scans are published only where appropriate rights or
   permission have been established and recorded.
4. **Every archive item records** provenance, credit and rights status. Items with unknown or
   unclear rights appear as citations, not reproductions.
5. **Public contributions (OD-08): not at launch.** No public memory or photo submission system.
   It may become a future feature once moderation, privacy and rights workflows are designed and
   approved in a new decision.
6. **Preservation:** the website is a presentation layer, not the archive of record. Original and
   preservation masters stay in separately controlled family storage with backup and are never
   committed to git (see [0011](0011-image-and-media-strategy.md)).
7. **Intake:** every item passes through catalogue → rights check → personal-data check →
   destructive redaction (on a copy) → review → approval before a web derivative enters the
   repository.

## Rationale

- Citation-first respects copyright held by newspapers and photographers while still documenting
  coverage.
- Building in stages avoids complex features for material that may never exist.
- Keeping masters outside the website protects irreplaceable originals and keeps sensitive data
  out of git history.
- Public submissions bring moderation, consent and rights risks that need their own design.

## Alternatives considered

- **Full scans by default:** copyright and reputational risk. Rejected.
- **Case-by-case only, no default:** inconsistent and slow. Rejected in favour of a safe default
  with recorded exceptions.
- **Public contributions at launch:** valuable for growth but unready workflows. Deferred.
- **Website as primary archive storage:** risks loss of originals and leakage of sensitive data.
  Rejected.

## Consequences

- Coverage pages are designed around citations and excerpts, with full scans as an exception.
- Rights and permission records are required to publish a full reproduction.
- Digitisation guidance (spec G §14) should be issued before mass scanning.
- Archive inventory (FI-03) remains to be collected.
