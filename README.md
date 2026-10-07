# Jabalpur Public Life

Website project. **Status: repository and environment set up only — no site code yet.**

The subject, content, scope and stack are still to be decided. Do not add content
about any person or organisation until it has been supplied and confirmed.

## Repository layout

```
docs/decisions/   Architecture/product decision records (one file per decision)
```

## Prerequisites

- Git 2.4x+
- Node.js 24 LTS (see `.nvmrc`)
- pnpm 10 (via `corepack enable`)

## Working agreement

- `main` is the default branch; work happens on short-lived branches merged via PR.
- Record stack, hosting, content and design decisions in `docs/decisions/`
  using `docs/decisions/0000-template.md`.
