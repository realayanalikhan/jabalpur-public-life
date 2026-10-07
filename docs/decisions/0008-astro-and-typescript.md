# 0008 — Framework: Astro + TypeScript (strict), static output

- **Status:** Accepted
- **Date:** 2026-10-07
- **Deciders:** Product/technical decision partner (relayed by the project owner)
- **Related:** [Spec F §2](../spec/06-technical-architecture.md); T-01

## Context

The site is content-first and mostly static. It must be very fast on mid-range Android phones,
support bilingual routing, and enforce publish gates (verification, fixtures, translation parity,
references) automatically at build time.

## Decision

1. **Framework:** Astro.
2. **Language:** TypeScript in strict mode.
3. **Output:** static output initially. Server endpoints are added only if a later decision
   requires them.
4. **Version:** the latest stable Astro major available when implementation begins, pinned via
   the lockfile.

## Rationale

- Content collections with typed schemas validate content at build time, which is how the publish
  gates in [0018](0018-content-integrity-rules.md) are enforced.
- Ships no JavaScript by default; interactive islands only where needed. This suits the
  performance budget.
- Built-in i18n routing, image processing and sitemap support fit the bilingual and archive needs.
- Static output deploys to any host, which keeps the project portable.

## Alternatives considered

- **Next.js:** app-oriented, more JavaScript and complexity than needed; best experience tied to Vercel.
- **Hugo:** fast and multilingual, but weak typed validation and awkward templating.
- **Eleventy:** flexible, but schema validation and conventions would need to be built by hand.
- **SvelteKit:** capable, less content-specific tooling.
- **WordPress:** server, database, patching; poor fit for provenance and publish gates.

## Consequences

- Developers need familiarity with Astro and TypeScript.
- Astro is now part of Cloudflare; the project avoids Cloudflare-specific runtime features unless
  needed so that it stays portable ([0012](0012-cloudflare-hosting.md)).
- Runtime and package manager are set in [0019](0019-runtime-and-package-manager.md).
