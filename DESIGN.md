```yaml
name: TANVO
colors:
  background: "#F9F5EE"
  on-background: "#0D0B0A"
  surface: "#FFFFFF"
  on-surface: "#0D0B0A"
  primary: "#780000"
  on-primary: "#FFFFFF"
  primary-container: "#C1121F"
  on-primary-container: "#FFFFFF"
  secondary: "#C9A84C"
  on-secondary: "#0D0B0A"
  secondary-container: "#E8C97A"
  on-secondary-container: "#0D0B0A"
  tertiary: "#669BBC"
  on-tertiary: "#FFFFFF"
  outline: "#E2D9C8"
  outline-variant: "#D2C7B1"
typography:
  display-xl:
    fontFamily: Playfair Display
    fontSize: 72px
    fontWeight: "700"
    lineHeight: 110%
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: "700"
    lineHeight: 120%
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: "700"
    lineHeight: 130%
    letterSpacing: 0em
  body-lg:
    fontFamily: Raleway
    fontSize: 18px
    fontWeight: "400"
    lineHeight: 160%
    letterSpacing: 0.01em
  body-md:
    fontFamily: Raleway
    fontSize: 15px
    fontWeight: "400"
    lineHeight: 165%
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: "700"
    lineHeight: 120%
    letterSpacing: 0.2em
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-edge: 32px
  section-gap: 96px
  radius-small: 6px # Form elements, inputs
  radius-medium: 8px # Buttons, interactive UI controls
  radius-large: 12px # Cards, grids, block containers
  button-py: 14px # Top/Bottom padding for structural height
  button-px: 28px # Left/Right padding for luxury width
```

---

# TANVO — Brand Design System & UI Instructions

This document defines the foundational design tokens, styling rules, and visual guidelines for the **TANVO** premium heritage e-commerce platform. Use these rules to generate and edit consistent, editorial-grade layouts.

---

## 1. Visual Theme & Brand Persona

- **Brand Essence**: Premium Indian heritage, luxury handlooms (Odisha weaves), storytelling, and craftsmanship trust.
- **Aesthetic Tone**: Luxury fashion house interface, editorial, archival, refined, and sophisticated.
- **Background Mood**: Off-white, soft raw-cotton tones instead of stark cold white or dark gray.
- **Structural Philosophy**: Refined rectangular structures with subtle, disciplined corner radii (6px to 12px) to evoke an elite heritage editorial feel. Avoid playful, app-like, or overly rounded UI layouts.

---

## 2. Color Palette & Functional Mapping

The colors match traditional natural dyes (madder red, indigo, turmeric, and brass/gold thread work) and are rigorously mapped to interaction states to ensure absolute system consistency.

- **Traditional Madder Red (`#780000`)**: Primary brand identity, text headers, logo, primary button gradient start, and focused field outlines.
- **Vibrant Vermilion (`#C1121F`)**: Primary button gradient end, CTA highlights, and active elements.
- **Heritage Brass Gold (`#C9A84C`)**: Premium highlights, badges, borders, checkout items.
- **Champagne Gold (`#E8C97A`)**: Soft gold hover states, light decorative borders.
- **Raw Cotton Background (`#F9F5EE`)**: Soft, warm background tint for the entire website.
- **Mineral Charcoal (`#0D0B0A`)**: Typographic body copy, primary labels, maximum readability.
- **Heritage Indigo (`#669BBC`)**: Accent blue-indigo for storytelling tags, secondary banners.
- **Pristine White (`#FFFFFF`)**: Used strictly for structural components, cards, dialogs, and panels to pop out cleanly against the raw cotton background.

---

## 3. Typography

Elegant editorial serif headings paired with clean geometric body text.

- **Primary Headings (`h1`, `h2`, `h3`, `h4`, `h5`, `h6`)**:
- **Font Family**: `'Playfair Display', serif`
- **Weights**: `700` (Bold)
- **Style**: Editorial, sophisticated, high-end luxury.

- **Body & UI Text**:
- **Font Family**: `'Raleway', 'Inter', sans-serif`
- **Weights**: `400` (Regular), `500` (Medium), `700` (Bold)
- **Style**: Balanced spacing, highly readable, contemporary.

- **Labels & Accents**:
- **Style**: Uppercase, tracked out (`tracking-widest` or `tracking-[0.2em]`), bold, small size (e.g., `text-[10px]` or `text-xs`).

---

## 4. Corner Radius & Shape Tokens

TANVO implements a sharp, architectural geometry. Absolute numerical constraints must be enforced across all components. Avoid excessive rounded corners, pill shapes, or glassmorphism.

- **Inputs & Fields**: Fixed 6px radius (`rounded-md` / `spacing.radius-small`).
- **Buttons (All Variants)**: Fixed 8px radius (`rounded-lg` / `spacing.radius-medium`).
- **Product Cards, Category Grids, & Modals**: Fixed 12px radius (`rounded-xl` / `spacing.radius-large`). Hard maximum boundary.

---

## 5. Buttons

TANVO uses refined luxury button shapes that emulate high-fashion digital lookbooks rather than mobile shopping apps.

### Primary Buttons

- **Dimensions**: Vertical padding `14px` (`py-3.5`), Horizontal padding `28px` (`px-7`). Minimum height constraint of exact `48px`.
- **Border Radius**: Fixed 8px (`rounded-lg`).
- **Typography**: Uppercase, `font-family: Inter`, weight `700`, font size `11px`, letter spacing `0.2em` (`tracking-[0.2em]`).
- **Background**: Linear gradient (to right / 90deg) from `#780000` to `#C1121F`.
- **Text Color**: Pure White (`#FFFFFF`).
- **Hover State**: Slow transition (`duration-500` ease-in-out), subtle brightness increase (`hover:brightness-110`).

### Secondary Buttons

- **Dimensions**: Matches primary layout exactly (`py-[14px] px-[28px] h-[48px]`).
- **Border Radius**: Fixed 8px (`rounded-lg`).
- **Background**: Transparent background (`bg-transparent`).
- **Border**: Thin, crisp 1px solid border utilizing `#780000`.
- **Text Color**: Traditional Madder Red (`#780000`).
- **Hover State**: Slow transition, minimal luxury focus shift.

### Explicitly Avoid

- Pill-shaped buttons (`rounded-full`).
- Overly rounded, playful UI components.
- Casual, mobile-first app-like padding and button heights.

---

## 6. Shadows, Elevation, & Borders

- **Borders over Blurs**: Favor crisp, thin borders (`border-outline` or `border-outline-variant`) and flat structural separations over heavy glassmorphism.
- **Soft Shadows**:
- **Base**: Flat or ultra-subtle, soft minimalist drop shadows (`shadow-sm` or low-opacity `shadow-md`).
- **Hover**: Subtle, sharp lift (`-translate-y-1`) with high duration transitions (`duration-500`) to sustain an elite, slow-paced luxury atmosphere.

---

## 7. Layout & UI Components

### A. Cards & Grids

- **Product Card**: Pristine White background, fixed 12px radius (`rounded-xl`), thin structural outline border, soft minimalist shadow. Hover state transforms with an elegant frame lift (`-translate-y-1`) and clean internal image zoom scale (`hover:scale-105` with `duration-500`).
- **Weaver Card**: Framed like a gallery painting. Clear grid lines, raw canvas text blocks, localized typography badges, and an integrated artisan provenance block.

### B. Forms & Inputs

- **Input Fields**: Vertical padding `12px`, horizontal padding `16px`, standard height `46px`. Background tone `#F9F5EE` inside cards, or `#FFFFFF` against the main layout.
- **Corner Radius**: Fixed 6px radius (`rounded-md`).
- **Focused State**: Swaps default border to a clean, non-blurry 1.5px solid border using Traditional Madder Red (`#780000`). No heavy outer glow or drop shadows allowed.

---

## 8. Instructions for Stitch AI Generator

1. **Strict Color & Shape Compliance**: Do not use generic bright accents or rounded pill structures. All button shapes must abide by the fixed 8px luxury rectangular constraint. Cards must never exceed a 12px radius (`rounded-xl`).
2. **Typography Consistency**: Every header requires `Playfair Display` serif styling. Action components, buttons, and system tags must feature tracked-out, capitalized `Raleway`/`Inter` labels.
3. **High-End Animation Pace**: Micro-animations must feel grand and slow (`duration-500` or higher). Avoid quick, snappy, or bouncy application transitions.
4. **Premium Storytelling Focus**: Dedicate structural grid space to heritage metadata: "Weaver Story", "Weave Origin", and clean, rectangular "Artisan Badges".
