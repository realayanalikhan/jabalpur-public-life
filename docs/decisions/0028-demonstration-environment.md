# 0028 — Demonstration environment

- **Status:** Accepted
- **Date:** 2026-10-13
- **Deciders:** Project owner (approved explicitly in the implementation session)
- **Related:** amends [0013](0013-environments-and-deployment.md) (adds a fourth environment);
  [0018](0018-content-integrity-rules.md) and its checks are unchanged; [0012](0012-cloudflare-hosting.md)
  (hosting decision unchanged); scaffold plan §6, §15.1; implementation notes
  [06](../implementation/06-demo-environment-notes.md)

## Context

The owner wants to watch the website take shape on a live URL before any real family information
exists. The accepted rules deliberately prevent fictional or development material from entering the
restricted preview and production:
- 0013: the preview never contains development fixtures;
- 0018 condition 2 and check I2: fixtures fail preview and production builds;
- SC1: `[DEV]` text never in real content.

These rules must not be weakened. GitHub Pages serves one site per repository, and that site
already serves the real preview.

## Decision

1. **A fourth environment, `demo`**, alongside local, preview and production. It is selected only
   explicitly (`SITE_ENV=demo`, `pnpm build:demo`). It is never a preview and never production.

   | Environment | Content | Access | Indexing |
   |---|---|---|---|
   | **Demo** | Fictional demonstration data only, from `demo/content/`; never real content (except the shared glossary), never development fixtures; `published` entries only | Public, clearly marked | `noindex, nofollow`; `robots.txt` disallows all |

2. **Isolated data.** Demonstration data lives only in `demo/content/`, outside `src/content/`. Every
   entry carries `demo: true`, and the demo has its own reference registry. Real builds never read
   that folder; demo builds read only that folder for entity collections.
3. **Integrity in the demo.** Every existing check runs with its **preview** outcomes. Nothing is
   relaxed for the demo; the production-only launch checks do not apply because it is not
   production.
4. **New isolation checks** (implementation-level rules; they fail in every environment and do not
   change I1–I23, SC1 or the route rules):
   - **D1 (content):** a demo-flagged entry in any non-demo build; an unflagged entry in a demo
     build.
   - **D2 (output):** the demonstration marker in any non-demo output, including through the
     production output guard; a demo page without the marker.
   - **SC2 (source):** `demo: true` in `src/content/`; a demo entry without `demo: true`; fixture
     markers in demo data.
5. **Unmistakable marking.** Every demo page carries a permanent bilingual banner ("Demonstration
   version: the person, events, sources and details shown are fictional. This is not the profile of
   any real person."), the demonstration marker, a "प्रदर्शन · / Demo ·" title prefix and
   `noindex, nofollow`.
6. **Separate deployment.** The demo is published from a separate public repository,
   `realayanalikhan/jabalpur-public-life-demo`, with its own GitHub Pages site
   (`https://realayanalikhan.github.io/jabalpur-public-life-demo/`). That repository contains only a
   workflow that checks out this repository, builds it in demo mode and deploys it. The real preview
   deployment of this repository is unchanged.
7. **Content policy for demonstration data:**
   - a generic, explicitly fictional subject ("उदाहरण व्यक्ति / Example Person (demonstration)") in a
     fictional town and fictional wards, with fictional organisations, roles, events and sources
     labelled as examples;
   - no portrait photograph of anyone;
   - real images only if openly licensed, credited with their licence, free of identifiable private
     individuals, and showing places or objects. They are linked **only** to the real places they
     depict, never to the fictional person, roles or events.
   - Nothing may name, imply or resemble the real subject of the site or any other real person,
     political party, ward or event.

## Rationale

- The owner gets a live, visually complete site without any change to what the restricted preview
  and production may contain.
- Separate data, separate deployment and checks in both directions make leaks detectable at three
  stages (source, content, output), not just by convention.
- A separate repository isolates the demo's URL and deployment completely. It can be removed at any
  time without touching the real site.

## Alternatives considered

- **Demo under a sub-path of the existing Pages site:** simpler, but the demo and the real preview
  would share one deployment and URL prefix. Not chosen.
- **Replace the preview with the demo:** loses the trustworthy real preview. Not chosen.
- **Fixtures in the preview:** would weaken 0013 and I2. Rejected.
- **Local builds and screenshots only:** safe, but no live URL. Remains available.

## Consequences

- 0013 is amended (a fourth environment); its existing three rows are unchanged.
- The demo rebuilds from this repository's `main` on a schedule or on request, so it can lag behind a
  merge by up to the schedule interval. A manual run with a branch name deploys that branch for
  review.
- Demo data must keep up with schema changes; CI builds the demo on every pull request to catch
  that.
- When real content arrives, nothing in the demo moves into `src/content/`. Real content is entered
  separately, from family-supplied or sourced material.
