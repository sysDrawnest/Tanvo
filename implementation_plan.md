# TANVO Homepage Codebase Audit Remediation Plan

This plan addresses all 16 issues raised in the detailed homepage audit, focusing on brand consistency, performance optimization, and customer experience.

## Open Questions
> [!WARNING]
> For the `ProductsGrid` differentiation (Issue 5), I plan to pass `background="#0D0B0A"` to the "Curated Selection" grid and invert its text colors so it stands out visually from the Bestsellers and New Arrivals grids. Does this align with your design vision?

## Proposed Changes

### Component Rewrites & Standardization

#### [MODIFY] `frontend/components/WhatsAppOrder.tsx`
- **Rewrite**: Remove `styled-components` completely and replace with Tailwind CSS and inline styles.
- **Brand Alignment**: Replace off-brand colors (`#FF8225`, `#173B45`, `#F8EDED`) with the official TANVO palette (`#F9F5EE`, `#0D0B0A`, `#C9A84C`).
- **Shapes**: Remove pill-shapes (`border-radius: 50px/60px`) and enforce `radius-md` (8px).

#### [MODIFY] Typography Across Components
- Replace non-standard fonts (`Cinzel`, `Montserrat`, `Helvetica`) with the core three: `Playfair Display`, `Raleway`, `Inter`.
- Affected components: `PillarsSection.tsx`, `ProductsGrid.tsx`, `TrustBar.tsx`, `MarqueeTicker.tsx`.

#### [MODIFY] Colors Across Components
- Enforce exact hex codes: `#F9F5EE` (Warm Ivory), `#FFFFFF` (White), `#0D0B0A` (Ink).
- Fix `EditorialBanner.tsx` background from `#F9F6F0` to `#F9F5EE`.
- Fix `TrustSignals.tsx` card backgrounds to avoid off-brand dark browns.

---

### UI & Performance Fixes

#### [MODIFY] `frontend/pages/sections/ProductsGrid.tsx`
- **Visual Differentiation**: Add logic to handle dark backgrounds (`#0D0B0A`) by inverting text colors to white/gold.
- **Empty State**: Add a skeleton loading state or premium placeholder cards when `products.length === 0` instead of a blank text message.

#### [MODIFY] `frontend/pages/sections/HeroSection.tsx`
- Change the static "Fine Silks" text in the top navigation bar into a functional `<Link to="/shop">` to repair the trust micro-fracture.

#### [MODIFY] `frontend/pages/sections/TrustBar.tsx`
- Replace Unicode placeholder symbols (`✓`, `⟶`, `◈`, `↺`) with `Lucide` icons (`ShieldCheck`, `Globe`, `Gem`, `RotateCcw`).

#### [MODIFY] `frontend/pages/sections/WhyChooseUs.tsx`
- Update the icon container's `borderRadius` from `0px` to `8px` (`radius-md`).

#### [MODIFY] `frontend/pages/sections/MarqueeTicker.tsx`
- Inject CSS `@keyframes` and apply the `animation` property to make the ticker actually scroll infinitely.

#### [MODIFY] `frontend/pages/sections/TrustSignals.tsx`
- Remove the heavy `transition: all 0.3s ease` applied via CSS wildcard `*`.
- Apply targeted `transition: transform 0.3s ease, box-shadow 0.3s ease` to fix scrolling jank.

#### [MODIFY] `frontend/pages/sections/InstagramSection.tsx`
- Move `onMouseEnter` and `onMouseLeave` handlers from the inner overlay `div` to the parent `<a>` tag so hovering the image itself triggers the effect.

#### [MODIFY] `frontend/pages/sections/EditorialBanner.tsx`
- Add an `IntersectionObserver` to the video so it only auto-plays when it enters the viewport, saving mobile data and reducing simultaneous video playback load.

---

### Homepage Assembly

#### [MODIFY] `frontend/pages/Home.tsx`
- Update the `ProductsGrid` props for "Curated Selection" to use `background="#0D0B0A"` and a dark mode variant.

## Verification Plan

### Automated Tests
- Run `npm run build` to ensure no TypeScript or CSS errors were introduced during the styled-components removal.

### Manual Verification
- Visual inspection of the homepage at different breakpoints.
- Scroll through the homepage to verify the `EditorialBanner` video only plays when visible.
- Ensure the `MarqueeTicker` moves automatically.
- Check the hover effect on `InstagramSection` and `TrustSignals`.
