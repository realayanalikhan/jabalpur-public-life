# 0011 — Image and media strategy

- **Status:** Accepted (video approved conditionally)
- **Date:** 2026-10-07
- **Deciders:** Product/technical decision partner (relayed by the project owner)
- **Related:** [Spec F §5](../spec/06-technical-architecture.md), [Spec G §4–5, §14](../spec/07-security-privacy-integrity.md); T-04, T-05

## Context

The site is photography-led and the archive may grow substantially. Images must be fast on
mobile, free of hidden metadata such as GPS location, and originals must be preserved safely.
Video hosting needs to be practical without locking the project to one provider.

## Decision

### Images and documents (T-04, approved with modification)

1. **Astro build-time image processing:** responsive sizes, modern formats with fallback,
   explicit dimensions, lazy loading below the fold.
2. **At MVP,** processed web-ready image assets may live in the repository.
3. **Preservation/original masters must never be committed to git.** Original archival material
   remains in separately controlled family storage with backup.
4. **Storage migration threshold is configurable.** There is no hard-coded size trigger. When to
   move web assets to object storage (e.g. Cloudflare R2) is an **operational decision** made
   when the real inventory is known. The content model does not change when storage changes.
5. Published images must not contain GPS metadata ([0018](0018-content-integrity-rules.md)).
6. Documents are published only as redacted derivatives.

### Video (T-05, approved conditionally)

7. Use a provider such as **YouTube behind a click-to-load facade**, **if** an appropriate
   official channel exists **and** the family chooses to use it.
8. The Video entity uses a **provider abstraction** (provider + identifier, or a self-hosted
   file). The content model must not be permanently dependent on YouTube; another hosting
   solution can be added later.
9. Captions and transcripts are stored as content.

## Rationale

- Build-time processing gives fast, metadata-stripped images with no runtime service.
- Keeping masters out of git protects originals and keeps history small and free of sensitive data.
- A configurable threshold avoids guessing at an inventory nobody has measured yet.
- A click-to-load facade means no third-party video code runs until the visitor chooses.
- A provider abstraction protects against lock-in and future policy changes.

## Alternatives considered

- **Fixed ~500 MB migration trigger:** proposed in spec v1; replaced by a configurable
  operational decision.
- **Object storage from day one:** unnecessary complexity before inventory is known. Deferred.
- **Git LFS:** bandwidth quotas and added tooling. Not chosen.
- **Self-hosted video streaming:** paid; only if YouTube is unsuitable. Kept as a future option.
- **Direct YouTube embeds:** load third-party code on every page view. Rejected in favour of a facade.

## Consequences

- An image pipeline and a GPS metadata check are needed at implementation.
- The family needs controlled storage with backup for masters (FI-04, open).
- Video depends on FI-09 (official channels, open).
