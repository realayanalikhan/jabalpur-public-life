# 0012 — Hosting on Cloudflare

- **Status:** Accepted
- **Date:** 2026-10-07
- **Deciders:** Product/technical decision partner (relayed by the project owner)
- **Related:** [Spec F §8](../spec/06-technical-architecture.md), [Spec G §11](../spec/07-security-privacy-integrity.md); T-08, OD-17

## Context

The site is a static build that must be fast in India, low-cost, support restricted previews,
and leave room for later features (object storage, an endpoint if ever approved).

## Decision

1. **Hosting and deployment on Cloudflare.** The specific Cloudflare product (Workers static
   assets or Pages) is chosen at setup according to Cloudflare's guidance at that time.
2. **Portability:** the site remains a standard static build and does not depend on proprietary
   Cloudflare runtime functionality unless a later decision requires it.
3. **Domain ownership** should ultimately rest with the person/family, not an individual
   developer. DNS on Cloudflare with DNSSEC when the domain is set up.
4. **Cost:** use free or low-cost tiers; do not introduce unnecessary paid services (OD-17 budget
   remains open).

## Rationale

- Generous free tier for static sites, with strong presence in India.
- Per-branch preview deployments and access control for restricted previews
  ([0013](0013-environments-and-deployment.md)).
- Optional services on the same platform later (object storage, cookieless analytics, bot
  protection) without new vendors.
- A static build can move to another host with little effort.

## Alternatives considered

- **Vercel:** excellent developer experience, but the free Hobby plan is restricted to
  non-commercial personal use, which is ambiguous for this site; paid plans are per member.
- **Netlify:** capable; credit-based free tier; no decisive advantage.
- **GitHub Pages:** requires a paid plan for private repositories; no previews or functions.

## Consequences

- Cloudflare account ownership and 2FA are needed before deployment (spec G §11).
- The actual domain and its registrant remain open (FI-01).
- Pricing and terms must be re-checked when the account is set up.
