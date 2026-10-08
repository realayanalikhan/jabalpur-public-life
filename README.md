# Jabalpur Public Life

A premium bilingual (English and Hindi) public-life profile and archive.

**Status: technical foundation in progress (scaffold plan §18). No visual design or real content yet.**
See the [specification](docs/spec/README.md), the [decision records](docs/decisions/README.md), the
[design brief](docs/design/07-implementation-brief.md), the
[technical scaffold plan](docs/implementation/01-technical-scaffold-plan.md) and the
[foundation notes](docs/implementation/02-foundation-notes.md).

Do not add content about any person or organisation until it has been supplied and confirmed.
No fictional or placeholder person-specific content may be committed.

## Repository layout

```
docs/spec/        Project specification (requirements, IA, content, bilingual, design,
                  technical architecture, security/privacy, open decisions)
docs/decisions/   Decision records (one file per decision)
docs/research/    Design and product research (inputs, not decisions)
docs/design/      Design tests, visual direction, wireframes, implementation brief
docs/implementation/  Technical scaffold plan and implementation notes
src/              Astro site (content schemas, integrity checks, bilingual routing)
site.config.ts    All tunable configuration in one place
scripts/          Repository checks and helpers
tests/            Unit tests and test fixtures
```

## Prerequisites

- Git 2.4x+
- Node.js 24 LTS (see `.nvmrc`)
- pnpm 10 (via `corepack enable`)

## Commands

```
pnpm install --frozen-lockfile
pnpm dev              # local development (synthetic [DEV] fixtures on)
pnpm check            # format, lint, types, tests, repo scan, CI verification build,
                      # route validation (R1–R8), production output guard
pnpm build:preview    # restricted-preview build (review + published, no fixtures)
pnpm build            # production deployment build (fails until launch prerequisites exist)
```

CI (`.github/workflows/ci.yml`) runs these checks plus a preview build, a deployment guard and
Lighthouse accessibility checks on every pull request; see
[docs/implementation/03-ci-notes.md](docs/implementation/03-ci-notes.md).

## Working agreement

- `main` is the default branch; work happens on short-lived branches merged via PR.
- Record stack, hosting, content and design decisions in `docs/decisions/`
  using `docs/decisions/0000-template.md`.
