# 0016 — Analytics: Cloudflare Web Analytics, configurable

- **Status:** Accepted
- **Date:** 2026-10-07
- **Deciders:** Product/technical decision partner (relayed by the project owner)
- **Related:** [Spec F §11](../spec/06-technical-architecture.md); OD-09, T-11

## Context

Basic usage insight helps decide what to improve, but analytics must not compromise visitor
privacy, add consent banners or slow the site.

## Decision

1. Use **Cloudflare Web Analytics**.
2. Analytics is **configurable and can be disabled** through site configuration without
   architectural changes.
3. **No Google Analytics.**
4. The privacy notice describes the analytics in use.

## Rationale

- Cookieless, so no consent banner is needed; minimal script; free; same platform as hosting.
- A configuration switch keeps the option of running with no analytics at all.

## Alternatives considered

- **Google Analytics:** cookies, consent requirements, heavier script, more data shared. Rejected.
- **Plausible or similar:** privacy-friendly but paid or self-hosted. Not needed.
- **No analytics:** most private, but loses useful insight. Available via the switch.

## Consequences

- Analytics loads only in production and only when enabled.
- The Content Security Policy must allow only the approved analytics endpoint.
