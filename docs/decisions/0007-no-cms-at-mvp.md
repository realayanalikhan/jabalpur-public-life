# 0007 — No CMS at MVP

- **Status:** Accepted
- **Date:** 2026-10-07
- **Deciders:** Product/technical decision partner (relayed by the project owner)
- **Related:** [Spec F §4](../spec/06-technical-architecture.md); [0010](0010-repository-based-content.md)

## Context

Content could be managed by a CMS (Git-based or headless) or directly in the repository. Who will
maintain content after launch, and how often, is not yet known (FI-02).

## Decision

1. **No CMS at MVP.** Content is repository-based ([0010](0010-repository-based-content.md)).
2. A **Git-based CMS** may be introduced later **only if** the real maintenance workflow shows
   it is needed (e.g. non-technical maintainers posting updates frequently). This requires a new
   decision record.
3. The content schema is the contract, so a future CMS must work with the existing content
   model rather than replace it.

## Rationale

- Adding a CMS before knowing the maintainers and cadence risks choosing the wrong tool.
- No CMS means no extra service, cost, login surface or vendor dependency at launch.
- Repository content keeps full history and review through git.

## Alternatives considered

- **Git-based CMS now** (e.g. Keystatic, Sveltia CMS, Decap): good later candidates; premature now.
- **Headless CMS** (e.g. Sanity, Payload): justified only for many editors, workflows or very
  large media libraries. Rejected for now.
- **WordPress:** server, patching and plugin overhead; poor fit for the provenance model. Rejected.

## Consequences

- At launch, content edits are made by someone comfortable with files and pull requests.
- An operations guide (spec A FR-M2) must explain how to add each content type.
- Revisit when FI-02 (maintainer and cadence) is known.
