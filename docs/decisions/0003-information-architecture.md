# 0003 — Information architecture and conditional sections

- **Status:** Accepted
- **Date:** 2026-10-07
- **Deciders:** Product/technical decision partner (relayed by the project owner)
- **Related:** [Spec B](../spec/02-information-architecture.md); OD-03, OD-14

## Context

The site must hold a profile, a public-service record, an archive and current activities, but the
amount of real content is unknown and will arrive gradually. The structure must be complete enough
to grow into, yet never show empty or placeholder sections to visitors.

## Decision

1. **Structure:**

   ```
   Home
   About          Biography; public-life background and Jabalpur connection where appropriate
   Public Life    Overview · Timeline · Roles & Terms · Work & Initiatives
   Archive        Photographs · Documents · In the Press · Video
   Updates        Current activities · Events · Announcements
   Connect        Contact methods · Social links
   Utility        Press Kit · How We Verify · Corrections & Feedback · Privacy ·
                  Terms / Takedown · Language switch
   ```

2. **No standalone "About Jabalpur" page at launch.** Jabalpur appears throughout the person's
   story, roles, work, archive and updates.
3. **Search** is a future enhancement (see [0017](0017-search-deferred.md)).
4. **Section visibility (OD-03):** the proposed thresholds in spec B §4.1 are accepted as initial
   values. They are **configuration-driven**: defined in one site configuration, never hard-coded
   inside individual components. A section below its threshold is not generated and disappears
   from navigation, footer, breadcrumbs, sitemap and internal links.
5. **Homepage recent updates (OD-14):** the "recent updates" module hides itself when the newest
   update is older than a configurable maximum age, **initially six months**. The homepage must
   feel complete and current without this module; the main homepage experience is timeless.
6. **No placeholders:** empty optional fields and their labels are omitted. Visitors never see
   "Unknown", "N/A", "TBD", "Coming soon" or empty headings.

## Rationale

- Grouping Timeline, Roles and Work under Public Life, and all media under one Archive, avoids
  thin, overlapping top-level pages.
- A standalone Jabalpur page tends towards generic tourism content; weaving place through real
  content is more authentic.
- Configuration-driven thresholds let the team tune visibility as real content arrives without
  code changes.
- A timeless homepage avoids looking abandoned during quiet periods.

## Alternatives considered

- **The original 12-section list** (separate Biography, Timeline, Gallery, Media, Jabalpur, etc.):
  too many thin sections at launch. Rejected.
- **Hard-coded thresholds per component:** simpler at first but scatters policy across code.
  Rejected.
- **Always showing sections with "coming soon" notices:** violates principle 3. Rejected.

## Consequences

- Implementation needs a single site configuration for thresholds and the updates age.
- Preview builds must report which sections are hidden and why (spec A FR-M1).
- Navigation, sitemap and linking must all read from the same visibility logic.
