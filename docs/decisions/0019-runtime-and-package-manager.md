# 0019 — Runtime and package manager: Node 24 LTS + pnpm

- **Status:** Accepted
- **Date:** 2026-10-07
- **Deciders:** Product/technical decision partner (relayed by the project owner)
- **Related:** [Spec F §12](../spec/06-technical-architecture.md); T-12

## Context

Builds must be reproducible locally, in CI and on the hosting platform.

## Decision

1. **Node.js 24 LTS**, as specified in the existing `.nvmrc`.
2. **pnpm** as the package manager, with a committed lockfile and frozen installs in CI.
3. Minimal dependencies; each new dependency is justified in its pull request.

## Rationale

- Node 24 is the current LTS line and already installed in the development environment.
- pnpm is fast, disk-efficient and strict about dependencies; already available.
- A lockfile with frozen installs makes builds reproducible.

## Alternatives considered

- **npm:** works, but less strict and slower. Not chosen.
- **Yarn / Bun:** no advantage for this project. Not chosen.

## Consequences

- CI and hosting builds must be configured for Node 24 and pnpm.
- Upgrading Node major versions requires updating `.nvmrc` and this record.
