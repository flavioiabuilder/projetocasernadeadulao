---
name: Sacred Liturgy
colors:
  surface: '#f8f9ff'
  surface-dim: '#d8dae0'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3fa'
  surface-container: '#eceef4'
  surface-container-high: '#e6e8ef'
  surface-container-highest: '#e1e2e9'
  on-surface: '#191c21'
  on-surface-variant: '#44474d'
  inverse-surface: '#2e3136'
  inverse-on-surface: '#eff0f7'
  outline: '#75777e'
  outline-variant: '#c5c6ce'
  surface-tint: '#4f5f7c'
  primary: '#04152e'
  on-primary: '#ffffff'
  primary-container: '#1a2a44'
  on-primary-container: '#8291b1'
  inverse-primary: '#b7c7e8'
  secondary: '#755a31'
  on-secondary: '#ffffff'
  secondary-container: '#fdd7a4'
  on-secondary-container: '#785c33'
  tertiary: '#161610'
  on-tertiary: '#ffffff'
  tertiary-container: '#2b2a24'
  on-tertiary-container: '#939188'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#b7c7e8'
  on-primary-fixed: '#0a1b35'
  on-primary-fixed-variant: '#384763'
  secondary-fixed: '#ffddb1'
  secondary-fixed-dim: '#e5c18f'
  on-secondary-fixed: '#291800'
  on-secondary-fixed-variant: '#5b421c'
  tertiary-fixed: '#e6e2d8'
  tertiary-fixed-dim: '#cac6bd'
  on-tertiary-fixed: '#1c1c16'
  on-tertiary-fixed-variant: '#484740'
  background: '#f8f9ff'
  on-background: '#191c21'
  surface-variant: '#e1e2e9'
typography:
  display-lg:
    fontFamily: Libre Caslon Text
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Libre Caslon Text
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Libre Caslon Text
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-main:
    fontFamily: Source Serif 4
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-sm:
    fontFamily: Source Serif 4
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Work Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
  annotation:
    fontFamily: Source Serif 4
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
spacing:
  unit: 8px
  margin-page: 40px
  margin-mobile: 20px
  gutter: 24px
  container-max: 1040px
---

## Brand & Style

This design system is crafted for a scholarly, liturgical, and contemplative experience. It targets an audience seeking depth, tradition, and intellectual rigor, such as students of theology, practitioners of ancient rites, or readers of classical literature. 

The design style is a blend of **Editorial Minimalism** and **Tactile/Skeuomorphic** elements. It draws inspiration from historical manuscript layouts and high-end physical publishing. The emotional response is one of reverence, quietude, and enduring quality. It avoids modern digital tropes in favor of a "digital vellum" aesthetic, emphasizing structured content, generous margins, and an atmosphere of established authority.

## Colors

The palette is rooted in a traditional scholarly spectrum, prioritizing legibility and thematic resonance.

- **Foundational Surfaces:** `Paper` serves as the primary global background. `Cream` is used for inset containers and boxes meant for concentrated reading or prayer.
- **Deep Accents:** `Navy` is reserved for high-impact structural elements like banners, title strips, and lesson covers. `Dark Navy` provides depth for contemplation boxes.
- **Metallic Hierarchy:** `Light Bronze` is strictly for typography appearing on dark navy/navy backgrounds. `Dark Bronze` is used for labels and secondary headers on paper/cream backgrounds. `Base Bronze` is reserved for decorative rules, seals, and frames.
- **Lining:** `Ruler` is the dedicated color for thin dividers and annotation lines, mimicking the guide-lines of a scribe.
- **Typography:** `Ink` is the high-contrast standard for all primary body copy.

## Typography

The typographic system uses a "Serif-First" philosophy to maintain an authoritative, literary tone.

- **Headlines:** Use **Libre Caslon Text** for its historical elegance and high-contrast forms. Large display sizes should use tighter tracking.
- **Body:** **Source Serif 4** provides exceptional readability for long-form text, especially in academic or liturgical contexts.
- **Utility & Labels:** **Work Sans** is used sparingly for labels, metadata, and navigational UI to provide a clean, functional counterpoint to the serif intensity. These should often be set in uppercase with increased letter spacing.
- **Emphasis:** Italicization is preferred over bolding for emphasis within body text to maintain the "printed page" aesthetic.

## Layout & Spacing

The layout is a **Fixed Grid** model that mimics the proportions of a book.

- **Margins:** Large outer margins (40px+) create a sense of luxury and focus. On mobile, these scale down to 20px.
- **The Columnar Rule:** Main reading content is centered with a maximum width of 1040px to ensure optimal line lengths (approx. 65-75 characters).
- **Rhythm:** A strict 8px baseline grid maintains vertical rhythm. Elements like contemplation boxes or lesson covers should always align to this grid.
- **Reflow:** On tablet and desktop, sidebars may appear for annotations or "marginalia," reflecting the scholarly nature of the content. On mobile, these marginalia collapse into expandable accordions below the primary text block.

## Elevation & Depth

This system avoids modern shadows and floating effects. Depth is achieved through **Tonal Layering** and **Structural Framing**.

- **Surfaces:** Depth is suggested by placing `Cream` containers on the `Paper` background. Higher-priority "Contemplation" areas use `Dark Navy` backgrounds to create a "recessed" or "hollowed" visual effect.
- **Outlines:** Instead of shadows, use 1px solid borders in `Base Bronze` or `Ruler` colors to define boundaries.
- **Micro-textures:** UI components may use very subtle grain or parchment-like overlays (opacity 2-3%) to reinforce the tactile feel of physical media.

## Shapes

The design system employs **Sharp (0)** roundedness. 

Corners are kept at 0px to evoke the precision of cut paper and architectural stability. The only exceptions are circular "seals" or icons which represent wax stamps or coins. All buttons, cards, and input fields must maintain 90-degree angles to uphold the formal, traditional aesthetic.

## Components

- **Buttons:** Primary buttons use a `Navy` background with `Light Bronze` text. They are rectangular (0px radius) with a 1px `Base Bronze` inner border for a "framed" effect.
- **Contemplation Boxes:** Containers using `Dark Navy` backgrounds. Headers inside these boxes must be `Light Bronze`.
- **Rules & Dividers:** Use the `Ruler` color for horizontal lines. For ornamental breaks, a 2px `Base Bronze` line with a centered icon/seal is preferred.
- **Input Fields:** Styled as "Underlined only" using the `Ruler` color, mimicking a line on a ledger rather than a digital box.
- **Cards/Lesson Covers:** Large blocks of `Navy` or `Dark Navy`. Titles are centered in `Light Bronze` using `display-lg` typography.
- **Chips/Labels:** Small caps `Work Sans` in `Dark Bronze` when on `Paper`, or `Light Bronze` when on `Navy`.
- **Seals:** Circular decorative elements used for progress or validation, styled in `Base Bronze` with a gold-leaf-like texture or solid fill.