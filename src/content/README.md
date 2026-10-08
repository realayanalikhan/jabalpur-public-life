# Content

Repository-based content (decisions 0010, 0004, 0020, 0023). Schemas: `src/content.config.ts`.

## Rules

- **Real content only from family-supplied or sourced material.** Never invent or infer names,
  spellings, parties, wards, roles, dates, organisations, achievements, initiatives, quotations,
  contacts, accounts, photographs or activities.
- **Restricted material never enters git** (spec G §1): masters, unredacted scans, ID documents,
  consent forms, private contact details. `pnpm check:repo` scans for these.
- **Status:** `draft → review → published → archived`. Production builds `published` only; preview
  builds `review` + `published`.
- **Verification:** `verified` needs at least one source; `unverified` is never published.
- **Slugs** are the file names (Latin, lowercase, hyphenated), identical in both languages and
  permanent once published.
- **Archive items** (photos, documents, coverage, videos) need a public `reference` from
  `pnpm ref:new`, registered in `registry/references.yaml` and never reused.
- **Interface wording** lives only in `glossary/glossary.yaml`.

## `_dev/`: development fixtures

- Synthetic `[DEV]` data for testing infrastructure; it describes no real person.
- Loaded **only** in local builds (`SITE_ENV=local`).
- Any fixture that reaches a preview or production build fails it (check I2).
- `[DEV]` or `devFixture: true` anywhere in real content outside `_dev/` fails every build and
  `pnpm check:repo` (source-content check SC1), even if no page renders the entry.
- Never edit a fixture into real content.
