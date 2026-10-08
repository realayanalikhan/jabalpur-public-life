# Implementation

- **Status:** Implementation in progress. The technical foundation (PR A) is described in
  [02-foundation-notes.md](02-foundation-notes.md); continuous integration in
  [03-ci-notes.md](03-ci-notes.md).

## Documents

| # | Document | Purpose |
|---|---|---|
| 01 | [Technical scaffold plan](01-technical-scaffold-plan.md) | The plan Claude follows when implementation begins: setup, directory structure, content model, integrity checks (with traceability, §6.1), routes, bilingual routing, media, archive, CSS boundaries, CI/CD, hosting portability, tests, exclusions, family-input dependencies, final checkpoint, consistency review (§19) and readiness assessment (§20) |
| 02 | [Foundation notes (PR A)](02-foundation-notes.md) | What the technical foundation implements, the implementation-time choices, unavoidable decisions and commands |
| 03 | [CI notes](03-ci-notes.md) | The GitHub Actions workflow: jobs, environments, route rules R1–R8, output and deployment guards, browser checks, implementation-time choices |

## Authority

1. [Decision records](../decisions/README.md) win over everything.
2. [Specification](../spec/README.md), including the [glossary](../spec/09-language-glossary.md).
3. [Design implementation brief](../design/07-implementation-brief.md).
4. This plan, which turns 1–3 into engineering steps. If it ever disagrees with them, they win and
   the plan is corrected.

Changes to anything marked **Approved** in the plan's checkpoint (§18) need a decision record.
Items marked **Implementation-time** can be chosen during implementation and noted in the pull
request.
