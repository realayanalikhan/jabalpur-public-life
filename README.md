# Jabalpur Public Life

A premium bilingual (English and Hindi) public-life profile and archive.

**Status: specification, design decisions and scaffold plan complete; implementation not started.
No site code yet.** See the [specification](docs/spec/README.md), the
[decision records](docs/decisions/README.md), the [design brief](docs/design/07-implementation-brief.md)
and the [technical scaffold plan](docs/implementation/01-technical-scaffold-plan.md).

Do not add content about any person or organisation until it has been supplied and confirmed.
No fictional or placeholder person-specific content may be committed.

## Repository layout

```
docs/spec/        Project specification (requirements, IA, content, bilingual, design,
                  technical architecture, security/privacy, open decisions)
docs/decisions/   Decision records (one file per decision)
docs/research/    Design and product research (inputs, not decisions)
docs/design/      Design tests, visual direction, wireframes, implementation brief
docs/implementation/  Technical scaffold plan (plan only)
```

## Prerequisites

- Git 2.4x+
- Node.js 24 LTS (see `.nvmrc`)
- pnpm 10 (via `corepack enable`)

## Working agreement

- `main` is the default branch; work happens on short-lived branches merged via PR.
- Record stack, hosting, content and design decisions in `docs/decisions/`
  using `docs/decisions/0000-template.md`.
