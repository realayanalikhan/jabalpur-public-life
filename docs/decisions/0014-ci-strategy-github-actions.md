# 0014 — CI strategy: GitHub Actions, no branch-protection upgrade for now

- **Status:** Accepted (CI not yet implemented)
- **Date:** 2026-10-07
- **Deciders:** Product/technical decision partner (relayed by the project owner)
- **Related:** [Spec F §10](../spec/06-technical-architecture.md); T-10, OD-15

## Context

The integrity rules ([0018](0018-content-integrity-rules.md)) and quality targets must be checked
automatically. The repository is private on a personal GitHub account, where branch protection
is not available on the free plan.

## Decision

1. **CI runs on GitHub Actions.**
2. CI will eventually enforce:
   - frozen dependency installation;
   - formatting and linting;
   - type and template checking;
   - content schema validation;
   - publish gates;
   - production build;
   - internal-link checking;
   - accessibility checks;
   - performance checks;
   - GPS/image metadata checks;
   - development-fixture protection.
3. **CI is not implemented yet.** This record approves the architecture only.
4. **Branch protection (OD-15):** do not upgrade the GitHub plan or move the repository solely
   for branch protection at this stage. GitHub Actions still runs and reports on pull requests.
   Rely on the project's process and review workflow. Revisit if the team or project risk grows.

## Rationale

- GitHub Actions is integrated with the existing repository and free at this scale.
- Automated checks enforce rules that manual review could miss.
- Paying for branch protection is not justified for a very small team at this stage.

## Alternatives considered

- **Other CI services:** no advantage over GitHub Actions here.
- **Upgrade GitHub plan / move to a paid organisation:** enables enforced protection; deferred
  for cost.
- **No CI:** relies entirely on discipline; unacceptable given the integrity rules.

## Consequences

- Until branch protection exists, merges with failing checks are technically possible; the
  process is to never merge a pull request with failing checks.
- The hosting build must also run the same publish gates, so production is protected even if CI
  is bypassed.
