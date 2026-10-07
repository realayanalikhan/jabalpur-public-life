# Decision records

Approved product and architecture decisions, one per file, using
[`0000-template.md`](0000-template.md). The specification is in [`../spec/`](../spec/README.md).

To change a decision, add a new record that supersedes the old one and update the old record's
status. Do not rewrite accepted records.

Relationship conventions:
- **Supersedes:** replaces an earlier decision. The old record's status becomes "Superseded by NNNN".
- **Amends / clarifies:** refines an earlier decision without replacing it. The old record stays
  accepted, and its status line notes "amended by NNNN" or "clarified by NNNN".
- **Proposed:** awaiting approval. It must not be implemented until accepted.

| # | Decision | Status | Date |
|---|---|---|---|
| [0001](0001-product-purpose-and-posture.md) | Product purpose and political posture | Accepted | 2026-10-07 |
| [0002](0002-bilingual-strategy.md) | Bilingual strategy (Hindi default, English fully supported) | Accepted; clarified by 0021 | 2026-10-07 |
| [0003](0003-information-architecture.md) | Information architecture and conditional sections | Accepted | 2026-10-07 |
| [0004](0004-content-and-verification-model.md) | Content model and verification model | Accepted; amended by 0020 | 2026-10-07 |
| [0005](0005-design-direction.md) | Design direction | Accepted | 2026-10-07 |
| [0006](0006-archive-strategy.md) | Archive strategy | Accepted | 2026-10-07 |
| [0007](0007-no-cms-at-mvp.md) | No CMS at MVP | Accepted | 2026-10-07 |
| [0008](0008-astro-and-typescript.md) | Framework: Astro + TypeScript (strict), static output | Accepted | 2026-10-07 |
| [0009](0009-modern-css-and-design-tokens.md) | Styling: modern CSS, design tokens, Astro scoped styles | Accepted | 2026-10-07 |
| [0010](0010-repository-based-content.md) | Repository-based content with Astro content collections | Accepted | 2026-10-07 |
| [0011](0011-image-and-media-strategy.md) | Image and media strategy | Accepted (video conditional) | 2026-10-07 |
| [0012](0012-cloudflare-hosting.md) | Hosting on Cloudflare | Accepted | 2026-10-07 |
| [0013](0013-environments-and-deployment.md) | Environments and deployment model | Accepted | 2026-10-07 |
| [0014](0014-ci-strategy-github-actions.md) | CI strategy: GitHub Actions; no branch-protection upgrade for now | Accepted | 2026-10-07 |
| [0015](0015-mvp-contact-strategy.md) | MVP contact strategy: links only | Accepted | 2026-10-07 |
| [0016](0016-analytics-strategy.md) | Analytics: Cloudflare Web Analytics, configurable | Accepted | 2026-10-07 |
| [0017](0017-search-deferred.md) | Search deferred; archive browsing by taxonomy | Accepted; clarified by 0022 | 2026-10-07 |
| [0018](0018-content-integrity-rules.md) | Translation and content integrity rules | Accepted | 2026-10-07 |
| [0019](0019-runtime-and-package-manager.md) | Runtime and package manager: Node 24 LTS + pnpm | Accepted | 2026-10-07 |
| [0020](0020-occasion-connective-archive-entity.md) | Occasion as the connective archive entity (amends 0004) | Accepted | 2026-10-07 |
| [0021](0021-language-switching-and-single-language-content.md) | Language switching, `x-default` and single-language content (clarifies 0002) | Accepted | 2026-10-07 |
| [0022](0022-archive-browsing-model.md) | Archive browsing model (clarifies 0017) | Accepted | 2026-10-07 |
| [0023](0023-public-reference-identifiers.md) | Public reference identifiers for archive items | **Proposed** | 2026-10-07 |
