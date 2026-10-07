# Jabalpur Public Life

A premium bilingual (English and Hindi) public-life profile and archive.

**Status: specification approved; implementation not started. No site code yet.** See
[Project Specification v1](docs/spec/README.md) and the approved
[decision records](docs/decisions/README.md).

Do not add content about any person or organisation until it has been supplied and confirmed.
No fictional or placeholder person-specific content may be committed.

## Repository layout

```
docs/spec/        Project specification (requirements, IA, content, bilingual, design,
                  technical architecture, security/privacy, open decisions)
docs/decisions/   Approved decision records (one file per decision)
```

## Prerequisites

- Git 2.4x+
- Node.js 24 LTS (see `.nvmrc`)
- pnpm 10 (via `corepack enable`)

## Working agreement

- `main` is the default branch; work happens on short-lived branches merged via PR.
- Record stack, hosting, content and design decisions in `docs/decisions/`
  using `docs/decisions/0000-template.md`.
