# 02. Palette validation

- **Date:** 2026-10-07
- **Status:** **Partially validated.** The palette direction holds and the interface contrast is
  validated. Several imagery criteria **cannot yet be validated** because authentic material is not
  available. **Direction accepted** as [0025](../decisions/0025-local-material-visual-palette.md); hex
  values remain **provisional candidates, not design tokens** (exact values: DP-08).
- **Artefact:** [`test-pages/palette-test.html`](test-pages/palette-test.html) ·
  **Screenshot (interface only, no third-party photos):**
  [`screenshots/palette-ui-no-photos.png`](screenshots/palette-ui-no-photos.png)

## 1. Candidates under test (research §13.2)

| Role | Candidate | CIE LCh (L, chroma, hue) | Material referent |
|---|---|---|---|
| Paper (background) | `#F5F3EE` | 96, 2.6, 94° | Marble / lime-plaster white |
| Stone (surfaces, image mats) | `#ECE8E0` | — | Shaded marble |
| Ink (text) | `#1F2627` | 15, 3.3, 211° | Granite |
| Ink-2 (captions, all small Hindi text) | `#4A5355` | — | Grey marble band |
| Muted (English-only metadata ≥ 14 px) | `#5C6568` | — | Bluish-grey marble |
| Rule / rule-strong | `#D6D8D4` / `#7E878A` | — | Veining |
| Narmada (accent: links, focus) | `#1F5357` | 32, 17.4, 206° | Deep river water |
| Narmada-line (river line, non-text) | `#3E7F7A` | — | Shallow water |
| Band (warm surface: citations) | `#F0E6DC` | 92, 6.3, 74° | Pink-cream marble band / brick-lime |
| Band-ink | `#77613F` | — | Monsoon silt |

## 2. Imagery used

Authentic, openly licensed images of Jabalpur from Wikimedia Commons, **hot-linked for testing and
not copied into the repository**. Credits are given in the test page.

| # | Image | Type | Licence |
|---|---|---|---|
| 1 | [Marble walls of the gorge, Bhedaghat](https://commons.wikimedia.org/wiki/File:White_Marble_Rocks_at_Bhedaghat.jpg) (Sandyadav080, 2012) | Contemporary colour | CC BY-SA 3.0 |
| 2 | [Marble and river, Bhedaghat](https://commons.wikimedia.org/wiki/File:Marble_Rocks_Bhedaghat_2.jpg) (Ankit Saha, 2012) | Contemporary colour | CC BY-SA 4.0 |
| 3 | [Gwarighat](https://commons.wikimedia.org/wiki/File:Gwarighat.jpg) (Rattna16, 2016) | Contemporary colour | CC BY-SA 4.0 |
| 4 | [Madan Mahal fort](https://commons.wikimedia.org/wiki/File:Madan_Mahal_fort.jpg) ($ri1995, 2022) | Contemporary colour | CC BY-SA 4.0 |
| 5 | [Dhuandhar falls](https://commons.wikimedia.org/wiki/File:Dhuandhar_Falls,_Bhedaghat.jpg) (Kojagiri, 2016) | Contemporary colour | CC BY-SA 4.0 |
| 6 | [Madan Mahal, c. 1865](https://commons.wikimedia.org/wiki/File:Jabalpur,_India_-_Madan_Mahal,_c.1865.jpg) (G. W. Lawrie) | Historical photograph (albumen, sepia) | Public domain |
| 7 | [Marble Rocks on the Narmada, 1860–1890](https://commons.wikimedia.org/wiki/File:Marbles_Rocks_at_Narmada_(Marble_Rocks_at_Nerbudda).jpg) | Historical photograph (albumen, sepia) | CC0 |
| 8 | [Rocks, Jabalpur](https://commons.wikimedia.org/wiki/File:Rocks_Jabalpur_Strahan_2.jpg) (Col. George Strahan, 19th century) | **Historical painting**, not a photograph | Public domain |

**Method.** Each image was reduced to 160 px wide in the browser and converted to CIELAB. Six
dominant colour clusters were found (k-means), and its highlights (L > 82) were averaged. Each was
compared with the candidates by colour difference (ΔE76). Contrast ratios follow WCAG 2.x.

**Not available, so not tested:**
- authentic portraits;
- family archive photographs, black-and-white or colour;
- document scans;
- press clippings;
- photographs of the dry-season (clear) Narmada.

No stock imagery was used as a substitute.

## 3. Results

### 3.1 Text and interface contrast (computed)

| Pair | Ratio | WCAG 2.2 |
|---|---|---|
| Ink on paper | **13.88:1** | AAA |
| Ink-2 on paper | **7.12:1** | AAA (≥ 7, as required for small Hindi text in research §13.2) |
| Muted on paper | 5.39:1 | AA (English-only metadata ≥ 14 px) |
| Narmada on paper (links) | **7.78:1** | AAA |
| Narmada-deep on paper (hover) | 9.96:1 | AAA |
| Ink on stone / ink-2 on stone | 12.59:1 / 6.46:1 | AAA / AA |
| Ink on band / ink-2 on band | 12.50:1 / 6.41:1 | AAA / AA |
| Band-ink on band | 4.78:1 | AA, only just. Use sparingly and not for small text |
| Narmada on band / on stone | 7.01:1 / 7.06:1 | AAA |
| Narmada-line on paper (river line, non-text) | 4.19:1 | Meets 1.4.11 (≥ 3) |
| Rule-strong on paper (button and input borders) | 3.31:1 | Meets 1.4.11 |
| Rule on paper (decorative dividers) | 1.29:1 | Decorative only, never the sole boundary of a control |

### 3.2 Imagery

| Image | Highlights (L, chroma, hue) | ΔE to paper | Notes |
|---|---|---|---|
| 1 Marble gorge | 89, 5.7, 268° (cool) | 10.9 | Sunlit marble under open sky reads slightly **cool**. Paper looks a little warmer, but in harmony |
| 2 Marble and river | 98, 6.8, 200° | 8.2 | Water and rock are greys, olives and browns (clusters at hue 81–92°). **No clear blue-green water** |
| 3 Gwarighat | 85, 1.3, 87° | 11.0 | Neutral, warm-grey stone and sky; brick and fabric accents. Paper sits naturally |
| 4 Madan Mahal fort | 87, 14.5, 249° (sky) | 19.0 | Granite reads warm grey-brown (clusters at hue 85–93°); blue sky |
| 5 Dhuandhar | 87, 4.8, 87° | 8.8 | Spray and rock highlights **closely match the warm-neutral paper**; band is within ΔE 7.1 of a rock cluster |
| 6 Madan Mahal, c. 1865 | 85, 19.5, 96° (yellow) | 20.0 | Albumen print tone is strongly warm. On the stone mat it reads clearly as a print |
| 7 Marble Rocks, 1860–1890 | 83, 24.1, 92° (yellow) | 25.2 | As above; the band is only ΔE 15–20 away, so a band mat would muddy it |
| 8 Strahan painting | 84, 1.3, 98° | 11.7 | Pale greys; sits quietly on paper |

## 4. Conclusions by criterion

| Criterion | Result | Status |
|---|---|---|
| **Text contrast** | All text pairs pass AA; body, captions, links and Hindi small text pass AAA | **Validated** |
| **Background** | Paper (hue 94°, chroma 2.6) is a warm-neutral white. It matches the warm-neutral highlights of Dhuandhar, Gwarighat and the historical paper tones (ΔE 8.8–11.7), and harmonises with cooler sunlit marble | **Validated as direction**; value provisional |
| **Readability** | Ink and ink-2 give strong, calm text in both scripts ([screenshot](screenshots/palette-ui-no-photos.png)) | **Validated** |
| **Archive imagery compatibility** | The neutral palette lets colour photographs carry the colour; nothing in the interface competes with them | **Validated** for landscape and architecture imagery |
| **Black-and-white historical photographs** | Only **sepia albumen prints** were available. They read well on the stone mat. Neutral silver-gelatin black-and-white prints were not tested | **Partially validated** |
| **Colour historical photographs** | None available (the 19th-century painting is a proxy only) | **Not validated** |
| **Documents / scans** | No authentic, legally usable Jabalpur document scan was available | **Not validated** |
| **Portraits** | No authentic portrait; skin tones against the palette are untested. Stock portraits were deliberately not used | **Not validated** |
| **Press clippings** | The citation block (band surface, 0006 default) has good contrast; scans were not tested | **Citation validated**; scans not validated |
| **Hindi typography** | Ink-2 ≥ 7:1 for all small Hindi text; Hindi links with a 0.3 em underline offset are legible | **Validated** |
| **Links** | Narmada 7.78:1, underlined; hover narmada-deep | **Validated** |
| **Buttons** | Transparent, rule-strong border (3.31:1); focus ring 2 px narmada with offset is clearly visible | **Validated** |
| **Borders and dividers** | Hairline rule for decoration; rule-strong for controls | **Validated** |
| **Verification / source UI** | Text labels in ink-2 with a small neutral glyph and bold status word; **no traffic-light colours**; details in a native disclosure. Calm and documentary | **Validated as direction**. Glyph choice to refine (e.g. "¶" may be obscure) |

### Specific findings

1. **Narmada blue-green is not yet evidenced by imagery.** In the available photographs the river
   reads grey, olive or brown, and the blue in the images is sky. The accent works functionally
   (contrast, calm, clearly not a party colour), but its claim to be "the Narmada's colour" needs
   **dry-season photographs of clear water at Bhedaghat** to confirm the hue.
2. **Ink is cooler than the real dark stone.** Dark rock tones in the photographs are warm
   (hue 70–90°), while the ink candidate is cool (211°). It still harmonises. A warmer neutral ink
   should be tested alongside it: e.g. `#242321` (LCh 14, 1.5, 90°; 14.16:1 on paper).
3. **The warm band reads pinker on large areas** than in a swatch. It harmonises with warm-neutral
   stone, but it is too close to sepia prints to be used as their mat.
   - Use it only for small citation surfaces.
   - Test a lighter variant such as `#F3EDE6` (13.24:1 under ink), which is barely distinct from
     paper (1.05:1). The stronger tint, conversely, makes the citation surface more visible.
4. **Historical prints belong on the stone mat**, not on the band.
5. **No colour-coding of statuses**, confirmed: the calm text-label approach reads clearly without
   colour.

## 5. Status and next steps

The palette **direction is confirmed**: cool-neutral marble paper, granite-dark ink, one restrained
Narmada accent, one warm band. **The palette cannot yet be fully validated** for:
- portraits;
- family archive photographs (black-and-white and colour);
- document scans;
- press clippings;
- the specific Narmada hue.

These need authentic material:
- family archive items (FI-03, family input);
- optionally, commissioned photography (OD-17, family approval);
- openly licensed dry-season river photographs.

**Before design tokens are finalised (DP-02):**
1. Re-run this test with authentic family archive samples (with consent) and any commissioned
   portraits.
2. Add dry-season Narmada photographs to test the accent hue.
3. Compare ink `#1F2627` with a warmer neutral (e.g. `#242321`), and band `#F0E6DC` with a lighter
   variant (e.g. `#F3EDE6`).
4. Keep every value provisional until then. The design system may use them as **provisional
   tokens**, clearly marked (reconciliation D-02).
