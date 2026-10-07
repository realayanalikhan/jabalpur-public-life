# E. Design Brief

**Status:** Working direction. The design system itself is produced in the design phase. This
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

- **Structure:** a serif for headings and display text paired with a highly legible text face
  for body and interface; both in matched Devanagari + Latin designs.
- **Candidates to evaluate** (open-licence, Devanagari + Latin):
  - Tiro Devanagari Hindi (with its matching Latin): editorial serif
  - Noto Serif Devanagari / Noto Sans Devanagari (with Noto Latin): very broad coverage, neutral
  - Mukta: clean humanist sans
  - Eczar, Martel: characterful Devanagari serifs
  - Final choice is made in the design phase by testing real bilingual text on low-end phones.
- **Rules:**
  - Hindi body text slightly larger than English; Devanagari line height roughly 1.7–1.8, Latin roughly 1.5–1.6.
  - Comfortable line length (about 60–75 characters in English; equivalent width in Hindi).
  - No uppercase transforms, letter-spacing or italics on Devanagari; emphasis by weight.
  - Tabular figures in timelines and data.
  - At most two families, limited weights, subset and self-hosted (performance).

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
  warm secondary taken from local stone (sandstone/basalt tones).
- **Inspiration:** the white and grey marble of Bhedaghat, Narmada water, local stone and brick.
- **Party colours are not used in the interface.** If party affiliation is displayed, it is
  displayed as factual text.
- **Contrast:** all text and interactive elements meet WCAG 2.2 AA in every theme.
- **Dark mode:** open decision (see H). Design tokens should make it possible either way.

## 5. Jabalpur / Narmada references

The rule is **one motif, used sparingly, with meaning**. Candidates for the design phase:

1. A fine flowing river line as the spine of the Timeline (the river as the passage of time).
2. A barely-there marble-grain texture in limited areas (e.g. footer, section dividers).
3. Palette only, with no graphic motif at all.

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
pattern · prose/biography layout with footnotes · timeline · role/term card · initiative
card and detail · archive grid · archive item viewer with metadata, credit, rights and provenance
panel · coverage card (with original-language headline) · collection/story layout · update card
and event (upcoming/past) · contact block · press kit downloads · verification label ·
correction note · "not available in this language" notice · empty-free layouts (how each
component behaves when optional fields are missing) · 404.

## 11. Design phase deliverables (proposed)

1. Moodboard and two or three contrasting visual directions.
2. Type pairing tests with real-length bilingual sample text (synthetic, non-biographical).
3. Colour and token system, including contrast checks.
4. Mobile-first page designs for Home, About, Timeline, an archive item and Updates.
5. Component specifications including missing-field behaviour.
