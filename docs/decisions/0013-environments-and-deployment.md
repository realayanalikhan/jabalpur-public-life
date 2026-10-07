# 0013 — Environments and deployment model

- **Status:** Accepted
- **Date:** 2026-10-07
- **Deciders:** Product/technical decision partner (relayed by the project owner)
- **Related:** [Spec F §9](../spec/06-technical-architecture.md); T-09

## Context

The family needs to review content before it is public. Developers need realistic test data.
Neither draft content nor development fixtures may ever reach the public site.

## Decision

Three environments:

| Environment | Content included | Access | Indexing |
|---|---|---|---|
| **Local** | All statuses + development fixtures | Developer | n/a |
| **Restricted preview** | `published` + `review`; **never development fixtures** | Invited reviewers only | `noindex` |
| **Production** | `published` only | Public | Indexed |

- Production deploys from `main`.
- Previews deploy per branch or pull request.
- Preview builds include the maintainer-only hidden-sections report (spec A FR-M1).

## Rationale

- Restricted previews let the family review real content in context before publishing.
- Excluding fixtures from previews ensures what reviewers see is real.
- `noindex` plus access restriction prevents previews from leaking into search results.

## Alternatives considered

- **Public previews:** risk exposing unreviewed content. Rejected.
- **Two environments (local + production):** no safe way for the family to review. Rejected.
- **Fixtures in previews:** confuses reviewers about what is real. Rejected.

## Consequences

- Preview access control must be configured (e.g. Cloudflare Access) before any real content is
  previewed.
- The build must know which environment it is building for, and apply content filters accordingly.
