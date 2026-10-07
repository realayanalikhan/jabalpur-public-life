# 0018 — Translation and content integrity rules (build-failing safeguards)

- **Status:** Accepted
- **Date:** 2026-10-07
- **Deciders:** Product/technical decision partner (relayed by the project owner)
- **Related:** [Spec C §3](../spec/03-content-architecture.md), [Spec D §5–6](../spec/04-bilingual-architecture.md), [Spec F §4](../spec/06-technical-architecture.md), [Spec G](../spec/07-security-privacy-integrity.md); [0002](0002-bilingual-strategy.md), [0004](0004-content-and-verification-model.md)

## Context

The site's credibility and the family's privacy depend on rules that are easy to break by
accident: publishing an unconfirmed claim, leaving test data in, letting a translation drift,
or leaking location metadata. Relying on reviewers alone is not enough.

## Decision

These are **architecture requirements**. A **production build must fail** if any of the
following is true:

1. An `unverified` item is publishable.
2. Development fixture data is included.
3. A required core translation is missing.
4. A required core translation is stale (its original text changed after review).
5. A `verified` item has no source.
6. A content reference is broken.
7. A published image contains GPS metadata.
8. Required accessibility metadata is missing where the validation rule applies (e.g. image alt
   text in the languages the item is published in).

Supporting rules:

- Translations are human-reviewed; `machine-draft` translations cannot be published.
- Translation staleness is detected automatically by comparing the original text with a
  fingerprint stored at review time.
- Core pages (as defined in [0002](0002-bilingual-strategy.md)) must be bilingual; single-language
  updates and archive items are allowed with a clear language label.
- Internal notes and internal-only sources are never rendered or shipped.
- **These safeguards must not be weakened for convenience.** Changing them requires a new
  decision record that supersedes this one.

## Rationale

- Automated, build-failing checks make the core principles (evidence before claims, no invented
  information, bilingual equality, privacy) structural rather than dependent on memory.
- Failing the build is safer than warnings that can be ignored.

## Alternatives considered

- **Warnings only:** easy to ignore under time pressure. Rejected.
- **Manual review only:** error-prone and does not scale with the archive. Rejected.

## Consequences

- Content cannot go live until it meets the rules, which may slow publishing; this is intended.
- Preview builds should report the same problems clearly so maintainers can fix them before
  production.
- The same checks run in CI ([0014](0014-ci-strategy-github-actions.md)) and in the production
  hosting build.
- Non-blocking issues (e.g. stale translations of non-core items) are reported as warnings.
