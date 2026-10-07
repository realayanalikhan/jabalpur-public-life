# 0015 — MVP contact strategy: links only

- **Status:** Accepted
- **Date:** 2026-10-07
- **Deciders:** Product/technical decision partner (relayed by the project owner)
- **Related:** [Spec F §7](../spec/06-technical-architecture.md), [Spec G §2](../spec/07-security-privacy-integrity.md); OD-07, T-07

## Context

Visitors need ways to reach the person. Any feature that collects personal data on the website
brings privacy obligations (including under India's DPDP Act), spam and abuse risk, and
operational overhead.

## Decision

1. **Contact at launch is links only.** Potential methods: WhatsApp, phone, email, official social
   profiles. Which are used depends on the family's approved channels (FI-08, open).
2. **No contact form at MVP.** No server-side contact endpoint.
3. **No visitor information passes through or is stored by the website at MVP.**
4. Any future form, registration or submission feature requires a **separate privacy/security
   decision** before it is built.

## Rationale

- Links give visitors familiar channels with zero data handling by the website.
- No forms means no personal-data processing, consent notices for collection, storage or spam
  defences at launch.
- Keeps the site purely static.

## Alternatives considered

- **Serverless contact form with bot protection:** possible later; adds data-protection duties now.
  Deferred.
- **Third-party form services:** introduce a data processor. Rejected for MVP.

## Consequences

- The privacy notice can state that the website itself does not collect visitor personal data
  (aside from approved cookieless analytics, see [0016](0016-analytics-strategy.md)).
- Contact details are content (ContactMethod entries), shown only when marked public.
- Public contributions are also deferred ([0006](0006-archive-strategy.md)).
