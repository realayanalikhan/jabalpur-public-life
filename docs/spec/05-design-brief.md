# E. Design Brief

**Status:** Accepted direction ([0005](../decisions/0005-design-direction.md)). The design system itself is produced in the design phase. This
brief sets its constraints.

## 1. Visual character

**In one line:** a premium editorial publication and a well-kept public archive, rooted in
Jabalpur.

| It should feel | It should not feel |
|---|---|
| Premium, dignified, calm | Loud, urgent, promotional |
| Editorial and typographic | Template-driven, banner-heavy |
| Modern and Indian | Generic "global corporate" or nostalgic kitsch |
| Photography-led, documentary | Stock-photo, heavily filtered or AI-generated |
| Spacious and confident | Cluttered or crammed |
| Factual | Campaign-style |

**Reference categories** (for mood, not for copying): online collections of national museums
and archives; long-form editorial magazines; documentary photography books; well-designed
institutional annual reports.

**Explicitly avoid:** outdated politician-website aesthetics, excessive gradients, flashing or
scrolling banners, giant slogans, heavy party colours, generic stock photography, gratuitous
animation, popups, and election-template layouts (e.g. countdowns, vote CTAs, rows of leader
headshots).

## 2. Typography direction

Typography carries most of the design.

- **Structure:**
  - an **editorial serif for content** (headings, body, captions), as a Devanagari face plus a
    Latin face with compatible proportions;
  - the **device's system sans for interface text** (navigation, buttons, labels, filters,
    breadcrumbs, metadata lines), which needs no web-font download.
- **Leading candidate (not locked)** ([research §13.3](../research/01-visual-product-research.md#133-typography)):
  - **Noto Serif Devanagari** (Hindi) + **Source Serif 4** (English) for content;
  - **system sans** for interface text;
  - both faces are OFL; about 125 KB of fonts on a Hindi page (research estimate).
- **Alternative to test against it:** **Tiro Devanagari Hindi** (Hindi) + **Literata** (English).
  - Tiro Devanagari Hindi has only Regular and Italic: **no bold**.
  - **Tiro Devanagari Hindi does not include a matching Latin text font.** Its Latin characters are
    a transliteration subset, so English needs a separate Latin face.
- **Not chosen as core faces:**
  - Noto Sans Devanagari, Mukta and Hind (sans; the system sans covers interface text);
  - Eczar and Martel (display or very tall vowel marks);
  - Murty Hindi (its free licence does not permit web use).
- **The final pairing is not decided.** It is chosen after a **bilingual visual test** (§11) on a
  mid-range Android viewport, then recorded in a decision record.
- **Rules:**
  - Hindi body text slightly larger than English; Devanagari line height roughly 1.7–1.8, Latin roughly 1.5–1.6.
  - Comfortable line length (about 60–75 characters in English; equivalent width in Hindi).
  - No uppercase transforms, letter-spacing or italics on Devanagari; emphasis by weight.
  - Tabular figures in timelines and data.
  - **Web fonts:** at most **two self-hosted font families**: one Devanagari and one Latin, both
    used for content. The **device's system sans** used for interface text is not a web font and
    does not count towards this limit. No third web font is added for interface text. Weights are
    limited, subset by script, and self-hosted (performance).

## 3. Photography

- **Real and documentary.** Real people, real places, real events. No stock photography of
  people. No AI-generated imagery, ever.
- **Archival photos presented honestly.** No fake colourisation, sepia filters or "vintage"
  effects. Any restoration (dust removal, contrast) is disclosed if it goes beyond basic cleanup;
  AI upscaling or reconstruction is not used on historical images.
- **Contemporary portraiture.** Commissioning a professional photographer for portraits and
  Jabalpur locations in natural light is strongly recommended. Budget is an open decision.
- **Captions and credits are always shown.** Images without known credit say so only internally.
  The public caption omits the credit line rather than printing "unknown".
- **Placeholders in development:** neutral grey blocks or abstract shapes. Never stock people or
  real-looking fake photos.
- **Crops:** a small set of standard aspect ratios (e.g. 3:2, 4:5, 1:1, 16:9) chosen in design;
  focal points preserved for archival material.

## 4. Colour direction

- **Base:** paper-like off-white and deep ink near-black. Mostly typographic and neutral, so
  photographs carry the colour.
- **Accent:** one restrained accent taken from the Narmada (deep blue-green), plus at most one
  restrained warm tone. The warm tone is inspired by local marble, brick and lime-plaster imagery
  where appropriate, for example the pink-cream bands of the Bhedaghat marble.
- **Material direction** ([research §7, §13.2](../research/01-visual-product-research.md#132-colour)):
  - **marble** (white, grey, pink and bluish-grey Bhedaghat marble) for paper and surfaces;
  - **granite** (Madan Mahal, Balancing Rock) for ink and text;
  - **Narmada blue-green** for the accent;
  - one **restrained warm tone** from marble, brick and lime plaster.
  The earlier "sandstone/basalt" wording is withdrawn: the research found no Jabalpur source for it.
- **Provisional values:** the research proposes approximately marble off-white `#F5F3EE`, granite
  ink `#1F2627` and Narmada blue-green `#1F5357`, plus a warm tint. **These are estimates. They are
  not design tokens.** They become tokens only after visual validation against authentic Jabalpur
  photography and contrast checks (§11).
- **No colour-coding of verification statuses or media types.** Use text labels (see §8).
- **Party colours are not used in the interface.** If party affiliation is displayed, it is
  displayed as factual text.
- **Contrast:** all text and interactive elements meet WCAG 2.2 AA in every theme.
- **Light mode only at launch** ([0005](../decisions/0005-design-direction.md)). Dark mode may be
  reconsidered later; colours are design tokens so it can be added without restructuring.

## 5. Jabalpur / Narmada references

The rule is **one motif, used sparingly, with meaning**.

**Decision** ([0005](../decisions/0005-design-direction.md)): **restrained palette + an extremely
subtle river-line motif** (e.g. as the spine of the Timeline: the river as the passage of time).
A literal marble texture is **not** used as a major design element. Decorative regional motifs are
not used purely for decoration.

Not acceptable: clip-art of monuments or waterfalls; decorative patterns used as wallpaper;
regional or tribal art styles (e.g. Gond art) unless commissioned from and credited to an artist.

The strongest Jabalpur signal is **real local photography and real place names**, used
throughout the content.

## 6. Spacing and layout

- 4 px base unit with an 8 px rhythm; generous vertical spacing between sections.
- Responsive editorial grid: 4 columns on mobile, 8 on tablet, 12 on desktop.
- Readable maximum text width; images may break out to full width sparingly for emphasis.
- Clear hierarchy through size, weight and space rather than boxes, borders and shadows.
- Consistent design tokens (space, type, colour, radius) defined once and reused.

## 7. Interaction philosophy

- **Calm.** Motion is used only to help orientation (e.g. a subtle transition when a filter
  changes), never for decoration.
- `prefers-reduced-motion` is respected everywhere.
- No auto-advancing carousels, autoplaying video or audio, popups, interstitials or marketing modals.
- Archive browsing uses pagination with shareable URLs, not infinite scroll.
- **Progressive enhancement:** all content and navigation work without JavaScript; JavaScript
  only enhances (e.g. image lightbox, filters).
- Links look like links; buttons look like buttons; focus is always visible.

## 8. Accessibility

- Target **WCAG 2.2 AA**.
- Touch targets ≥ 44 × 44 px.
- Visible focus indicators and logical focus order.
- Correct `lang` on pages and inline phrases (see D §8).
- Alt text and captions in both languages; captions and transcripts for video.
- Information (e.g. verification status) never conveyed by colour alone. Labels use text, with
  an icon if wanted.
- Readable Devanagari at small sizes on low-resolution screens.
- Tested with screen readers in both English and Hindi.

## 9. Mobile-first requirements

- Designed at 360 px width first, then scaled up.
- Header remains compact; language switch always visible.
- Key actions (contact links, language switch, navigation) reachable with one hand.
- Images served at sizes and formats appropriate to the device; nothing large above the fold
  except the primary image.
- Works well on mid-range Android over 4G and degrades gracefully on slower connections.
- Contact links use native handlers where approved (phone, email, WhatsApp).

## 10. Components the design system must cover

Header and navigation · language switch · footer · homepage introduction · section landing
pattern · prose/biography layout with a "Sources and notes" section (no academic-style footnotes;
see [C §3](03-content-architecture.md#3-verification-model)) · timeline · role/term card · initiative
card and detail · archive grid · archive item viewer with metadata, credit, rights and provenance
panel · coverage card (with original-language headline) · collection/story layout · update card
and event (upcoming/past) · contact block · press kit downloads · verification label ·
correction note · "not available in this language" notice · empty-free layouts (how each
component behaves when optional fields are missing) · 404.

## 11. Design phase deliverables (proposed)

1. Moodboard and two or three contrasting visual directions.
2. **Bilingual visual test page** comparing the leading typography candidate with the alternative
   (§2). Viewed on a mid-range Android viewport, it uses:
   - real representative Hindi and English text (non-biographical);
   - navigation labels;
   - dates in each precision;
   - archive metadata;
   - captions;
   - mixed-language lines.
   The result is recorded as the typography decision.
3. **Palette test** of the provisional colours (§4) against authentic Jabalpur imagery, with contrast
   checks. Only then is the colour and token system finalised.
4. Mobile-first page designs for Home, About, Timeline, an archive item and Updates.
5. Component specifications including missing-field behaviour.
