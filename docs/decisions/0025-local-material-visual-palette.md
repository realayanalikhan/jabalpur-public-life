# 0025 — Local-material visual palette

- **Status:** Accepted with provisional values
- **Date:** 2026-10-07
- **Deciders:** Product/technical decision partner (relayed by the project owner)
- **Related:** [Spec E §4](../spec/05-design-brief.md#4-colour-direction); refines the colour direction of [0005](0005-design-direction.md); [Design test 02](../design/02-palette-validation.md); [Research §7, §13.2](../research/01-visual-product-research.md#132-colour); closes DP-02 (direction); opens DP-08 (exact values)

## Context

[0005](0005-design-direction.md) set a restrained palette with a Narmada-derived accent and at most
one warm secondary. The research proposed a palette derived from Jabalpur's materials. The palette
test ([design 02](../design/02-palette-validation.md)) checked it against eight authentic, openly
licensed Jabalpur images and against interface elements. The test validated the direction and the
interface contrast. It **could not validate** the Narmada hue, portraits, family archive photographs,
document scans or press clippings, because no authentic material of those kinds was available.

## Decision

1. **The conceptual palette is accepted:**

   | Role | Concept | Use |
   |---|---|---|
   | Paper | **Marble off-white** (warm-neutral, very low chroma) | Page background |
   | Stone | Shaded marble | Item panels, image mats, facts blocks |
   | Ink | **Granite ink** (near-black, low chroma) | Text |
   | Secondary inks | Grey-marble tones | Captions, metadata, small Hindi text, control borders, hairlines |
   | Accent | **Narmada blue-green** (deep, desaturated, blue-leaning) | The only accent: links, focus, active state, the river line |
   | Warm tone | **Restrained warm local-material tone** (marble band, brick, lime plaster) | Small citation and press surfaces only |

2. **The exact values are provisional.** These candidates stay documented but are **not production
   design tokens**:

   | Role | Candidate | Note |
   |---|---|---|
   | Paper | `#F5F3EE` | Direction validated against imagery |
   | Stone | `#ECE8E0` | — |
   | Ink | `#1F2627` | Test against a warmer neutral (`#242321`) |
   | Ink-2 / muted | `#4A5355` / `#5C6568` | 7.12:1 / 5.39:1 on paper |
   | Rule / rule-strong | `#D6D8D4` / `#7E878A` | Decorative / control borders (3.31:1) |
   | Narmada | `#1F5357` | **Hue not yet validated** against the river; 7.78:1 on paper |
   | Narmada-line | `#3E7F7A` | Non-text, 4.19:1 |
   | Warm band / band-ink | `#F0E6DC` / `#77613F` | Reads pinker on large areas; test a lighter variant (`#F3EDE6`) |

3. **Usage rules (accepted):**
   - Photographs carry the colour; the interface stays neutral.
   - The accent never appears as a large fill.
   - **No colour-coding of verification statuses or media types**
     ([0026](0026-verification-and-source-presentation.md)).
   - No party colours, saffron, tricolour combinations, gradients, sepia or parchment backgrounds,
     or pure black on pure white.
   - Historical prints sit on stone mats, never on the warm band.
   - All text meets WCAG 2.2 AA. Body text, links and small Hindi text target AAA, as the candidates
     already achieve.
4. **Validation before final tokens (DP-08).** Values become production tokens only after they have
   been tested against:
   - authentic project material: family archive samples (FI-03, with consent) and any commissioned
     photography (OD-17);
   - dry-season photographs of the Narmada, to check the accent hue;
   - the ink and warm-band variants named above;
   - a full contrast check.

   The result updates this record.
5. **Until then:** implementation may reference the candidates only as clearly marked **provisional
   values**, defined in one place so they can be replaced without code changes. They are not
   declared final tokens.

## Rationale

- Each role has a physical Jabalpur referent, so the palette is local and factual, and explains why
  saffron and party colours are absent (research §7, §13.2).
- The test confirmed the direction: paper matches the warm-neutral highlights in the imagery
  (ΔE 8.8–11.7); historical prints read well on stone; text contrast passes AA, mostly AAA; and the
  text-only verification labels read calmly.
- Accepting the concept now lets design and scaffolding proceed. Keeping the values provisional
  avoids locking unvalidated colours, especially the Narmada hue.

## Alternatives considered

- **Accept the exact values now.** Rejected: the accent hue and several imagery types are
  unvalidated.
- **Postpone all colour decisions.** Rejected: it would block the design system unnecessarily.
- **Party or saffron-led palettes.** Rejected by [0001](0001-product-purpose-and-posture.md) and
  [0005](0005-design-direction.md).
- **Validate with stock imagery.** Rejected: it would not test the real material.

## Consequences

- Spec E §4 references this record. DP-02 (direction) is closed. **DP-08** (validate exact values)
  is opened and depends on authentic material.
- 0005 stays accepted; its status notes "clarified by 0025".
- The design system must keep colours replaceable from a single source.
