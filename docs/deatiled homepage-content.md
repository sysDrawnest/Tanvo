# TANVO Homepage Content & UI Specification

This document serves as the absolute single source of truth for the **TANVO Homepage** (`Home.tsx`). It outlines every section, its corresponding React component filename, its design aesthetics, content details, and interactive capabilities in their exact render order as of the current implementation.

---

# Homepage Render Flow

The following is the exact top-to-bottom rendering order of components on the homepage:

1. **Hero Section** (`HeroSection`)
2. **Bestsellers Product Grid** (`ProductsGrid` - Bestsellers)
3. **Atmospheric Video Loop Banner** (`VideoBanner`)
4. **Infinitely Moving Marquee Ticker** (`MarqueeTicker`)
5. **Brand Metrics & Pillars** (`PillarsSection`)
6. **New Arrivals Product Grid** (`ProductsGrid` - New Arrivals)
7. **Weave Traditions Category Grid** (`CategoryGrid`)
8. **Handwoven Heritage Story** (`HandwovenHeritage`)
9. **Curated Selection Product Grid** (`ProductsGrid` - Curated Selection)
10. **Ambient Editorial Video Banner** (`EditorialBanner`)
11. **Men's Traditional Attire Campaign Banner** (`MensTraditionalAttireBanner` / `NewArrivalsBanner`)
12. **Modern Muse Campaign** (`ModernMuse`)
13. **The Art of Occasion** (`DrapedEveryMoment`)
14. **"Why Choose Us" Trust Grid** (`WhyChooseUs`)
15. **Trust Signals Media Showcase** (`TrustSignals`)
16. **Brand Story Video Banner** (`BrandStorySection`)
17. **Premium WhatsApp Commerce Section** (`WhatsAppOrder`)
18. **Instagram Social Grid** (`InstagramSection`)
19. **Trust Bar** (`TrustBar`)

---

# FOR EACH HOMEPAGE SECTION

## 1. Hero Section

### Component
`HeroSection`

### File
`frontend/pages/sections/HeroSection.tsx`

### Purpose
Establish a high-end luxury fashion brand tone immediately upon page entry. It serves as a visual hook to captivate visitors, convey the brand core value ("The silent poetry of pure silk"), and route users directly to product discovery (`/shop`).

### Content
- **Main Heading**: "The silent poetry of pure silk." (set in standard display serif, with "of pure silk" in italicized gold color).
- **Branding Header link**: "Fine Silks" text link (top right).
- **Supporting description**: "Experience the timeless elegance and intricate craftsmanship woven into every thread."
- **CTA Link**: "Discover the Collection" with a thin border/underline.
- **Visuals**: Auto-rotating image slideshow using high-resolution assets:
  - Slide 1: `/hero section image/tanvo-herosection-first.png`
  - Slide 2: `/hero section image/A_cinematic_luxury_202604051034.png` (PC) / `/hero section image/Whisk_ec4d14e37ea16d380e848126b16a158ddr.png` (Mobile)
  - Slide 3: `/hero section image/tanvo-royal-heritage-palace.jpeg` (PC) / `/hero section image/tanvo-royal-heritage-palace_mobile.jpeg` (Mobile)
  - Slide 4: `/hero section image/tanvo-silk-duet-editorial.jpeg` (PC) / `/hero section image/tanvo-silk-duet-editorial_mobile.jpeg` (Mobile)
  - Slide 5: `/hero section image/tanvo-couture-heritage-duo.jpeg` (PC) / `/hero section image/tanvo-heritage-lake-elegance_mobile.jpeg` (Mobile)
- **Indicators**:
  - Horizontal slide indicator bars (bottom left) showing slide progress.
  - Scroll text and separator line indicator (bottom right).

### Layout
- **Desktop/Tablet/Mobile**: Full-viewport layout (`min-h-[100vh]`, `width: 100%`) utilizing absolute background positioning and a flex layout column with `justify-between` to separate the header, main text content, and footer indicators. Spaced with `4vw 6vw` padding.
- **Responsive adaptions**: Detects window resize listeners dynamically to swap between desktop and mobile-optimized image urls (e.g. `/tanvo-royal-heritage-palace_mobile.jpeg` on viewports `<= 768px`).

### Styling
- **Background**: Solid `#0A0A0A` base.
- **Overlays**: Dark gradient overlay (`linear-gradient(180deg, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.85) 100%)`) protecting text legibility.
- **Typography**: Display title uses Cormorant/Playfair Display serif (`fontFamily: '"Playfair Display", "Times New Roman", serif'`). Subheading and CTAs use standard sans-serif (`fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'`).
- **Color accents**: White text (`#FFFFFF`), muted text (`rgba(234, 230, 223, 0.75)`), and gold highlights (`#D4AF37`).

### Animations
- **Carousel Slider**: Automatic fade transition every 5 seconds changing background opacity (`transition: 'opacity 1.5s ease-in-out'`).
- **Links**: Smooth color changes and opacity shifts on hover.

### User Interaction
- **Fine Silks Link**: Redirects to `/shop` on click.
- **Discover the Collection Link**: Underlined action redirecting to `/shop`.
- **Slide indicators**: 5 clickable horizontal bars that change active slide on user click.

### Backend Integration Readiness
- **State**: Uses a static constants array (`HERO_SLIDES` from `frontend/constants.tsx`) containing URLs and positions.
- **Props**: None.

### Dependencies
- React (`useState`, `useEffect`)
- React Router Link
- Constants array `HERO_SLIDES`

### Performance Notes
- Auto-slideshow timer cleans up on unmount.
- Mobile and desktop assets separated dynamically to save bandwidth.

---

## 2. Bestsellers Product Grid

### Component
`ProductsGrid` (re-used component)

### File
`frontend/pages/sections/ProductsGrid.tsx`

### Purpose
Expose popular products early to increase conversion rate. Displays the highly curated and most loved "Bestsellers" collection immediately below the hero fold.

### Content
- **Eyebrow Label**: "Most Loved"
- **Heading**: "Bestsellers"
- **CTA Link**: "All Bestsellers" (pointing to `/shop?isBestSeller=true`).
- **Product Tiles**: Up to 4 cards containing product image, badge tag, name, rating, price, and add-to-cart/wishlist quick actions.

### Layout
- **Grid Layout**: Responsive grid utilizing `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-12`.
- **Container**: Section spaced with `px-4 py-16 md:px-[6vw] md:py-24`. Flexbox header row splits title content on the left and the CTA link on the right.

### Styling
- **Background**: Solid Warm Ivory `#F9F5EE` (Cream background passed as prop).
- **Typography**: Title styled in classic light Serif (`font-display`, `fontSize: 'clamp(32px, 4.5vw, 60px)'`, weight `300`).
- **Colors**: Underlined link and texts styled in primary ink (`var(--ink)`).

### Animations
- **Skeleton Shimmer**: While products are loading, 4 grey shimmer boxes load sequentially.
- **ProductCard transitions**: Detailed card zoom and icon reveals on hover.

### User Interaction
- **All Bestsellers Link**: Clickable link to search results page `/shop?isBestSeller=true`.
- **Product Cards**: Click opens detail page, quick add-to-cart button adds to cart, and wishlist button toggles item bookmark.

### Backend Integration Readiness
- **API integration**: Dynamically receives `products` array prop. In `Home.tsx`, this data is fetched from the backend via `API.get('/products?limit=4&isBestSeller=true')` and handled with a loading state.

### Dependencies
- React
- React Router Link
- `ProductCard` (reusable component)

### Performance Notes
- Skeletons handle non-blocking asynchronous data fetching, preventing cumulative layout shift (CLS).

---

## 3. Atmospheric Video Loop Banner

### Component
`VideoBanner`

### File
`frontend/pages/sections/VideoBanner.tsx`

### Purpose
Act as an editorial breathing space or pacing break between heavy product grids, visually reinforcing handloom craft heritage and elegance.

### Content
- **Slow-motion Video**: Close-up details of weaving or silk draping (`/Woman_wearing_silk_saree_202606221155.mp4`).
- **Text overlay**: "Timeless Heritage. Modern Elegance."
- **Control icon**: Play/Pause button on the bottom right.

### Layout
- **Dimensions**: Constrained to a standard widescreen aspect ratio (`aspect-[16/9]`) spanning full width.
- **Overlay alignment**: Centered overlay flexbox.

### Styling
- **Video filter**: `brightness(0.85) saturate(1.1)` for high clarity.
- **Overlay**: Soft double gradient (`bg-gradient-to-b from-black/20 via-transparent to-black/30`).
- **Text**: White light sans-serif with gold highlight (`#C9A84C`).
- **Button**: Half-transparent white circle with material symbols font icon.

### Animations
- **Video loop**: Continuous autoplay loop.
- **Icon transitions**: Smooth scale and color swap on hover.

### User Interaction
- **Play/Pause Button**: Click toggles video state.

### Backend Integration Readiness
- **Asset**: Fully static video file path.

### Dependencies
- React `useRef`, `useState`
- Google Material Icons / Symbols

### Performance Notes
- Autoplays muted, looped, and playsinline to ensure browser autoplay permissions succeed and prevent blocking main thread execution.
- Aspect ratio constraint prevents layout shifts during load.

---

## 4. Infinitely Moving Marquee Ticker

### Component
`MarqueeTicker`

### File
`frontend/pages/sections/MarqueeTicker.tsx`

### Purpose
Expose strong trust tags and product category keywords ("Sambalpuri", "Bomkai", "Ikat", "GI Tagged") in a continuous, active ticker.

### Content
- **Repeating Text**: `✦ Handwoven Sarees ✦ GI Tagged Heritage ✦ Direct from Master Weavers ✦ Sambalpuri · Bomkai · Ikat ` repeated 6 times.

### Layout
- **Dimensions**: Full-bleed horizontal ribbon (`padding: '14px 0'`, overflow hidden).

### Styling
- **Background**: Solid gold color (`var(--gold)` / Terracotta `#B5502B`).
- **Typography**: Small uppercase sans-serif (`fontFamily: "'Inter', sans-serif"`, size `9px`, weight `700`, letter spacing `0.2em`, color `var(--ink)`).

### Animations
- **CSS Keyframes**: Infinite loop marquee animation translating from `translateX(0)` to `translateX(-50%)` linearly over 30 seconds.

### User Interaction
- None.

### Backend Integration Readiness
- **State**: Fully static.

### Dependencies
- React

### Performance Notes
- Uses CSS 3D hardware-accelerated transforms (`translateX`) for ultra-smooth rendering.

---

## 5. Brand Metrics & Pillars

### Component
`PillarsSection`

### File
`frontend/pages/sections/PillarsSection.tsx`

### Purpose
Establish immediate authority and brand credibility by displaying verified metrics about the craft collective.

### Content
- **Metrics**:
  - **7+ Generations** of master craft
  - **15 Days** per single saree
  - **200+ Weavers** in our collective
  - **100% Authentic** GI certified

### Layout
- **Grid Layout**: Responsive 2-column grid on mobile, transforming into 4 columns on desktop inside a max-width container (`max-w-7xl mx-auto`).
- **Borders**: Divided by thin borders (`border-y` and `md:border-r` with color `rgba(237,227,208,0.1)`).

### Styling
- **Background**: Solid ink (`var(--ink)` / `#1C1612`).
- **Typography**: Numbers styled in large terracotta serif (`var(--terra)`, `text-4xl md:text-5xl`). Labels in ivory serif (`var(--ivory)`, `fontFamily: "'Playfair Display', serif"`, size `text-[10px] md:text-xs`). Subtexts in muted ivory (`rgba(249,245,238,0.4)`, Raleway).

### Animations
- None.

### User Interaction
- None.

### Backend Integration Readiness
- **State**: Static array.

### Dependencies
- React

### Performance Notes
- Minimal markup and zero runtime JavaScript triggers.

---

## 6. New Arrivals Product Grid

### Component
`ProductsGrid` (re-used component)

### File
`frontend/pages/sections/ProductsGrid.tsx`

### Purpose
Commercial section to showcase the latest sarees added to the catalog, encouraging repeat buyers to explore the newest creations.

### Content
- **Eyebrow Label**: "Just Arrived"
- **Heading**: "New Arrivals" (renders as "New *Arrivals*")
- **CTA Link**: "View Newest Drops" (pointing to `/shop?sort=-createdAt`).
- **Product Tiles**: Up to 4 product cards.

### Layout
- **Grid Layout**: Responsive grid `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-12`.
- **Spacing**: Section spaced with `px-4 py-16 md:px-[6vw] md:py-24`.

### Styling
- **Background**: `transparent` (reveals global warm ivory background `#F9F5EE`).
- **Colors**: Primary ink (`var(--ink)`) for text and border links.

### Animations
- **Skeleton Shimmer**: Sequential gray boxes load during API fetching.
- **ProductCard transitions**: Detailed card zoom and icon reveals on hover.

### User Interaction
- **View Newest Drops Link**: Navigates to `/shop?sort=-createdAt`.
- **Product Cards**: Click opens detail page, quick add-to-cart, wishlist toggle.

### Backend Integration Readiness
- **API integration**: Dynamically receives `products` array prop. In `Home.tsx`, this data is fetched from the backend via `API.get('/products?limit=4&sort=-createdAt')` and handled with a loading state.

### Dependencies
- React
- React Router Link
- `ProductCard` (reusable component)

### Performance Notes
- Skeletons handle non-blocking asynchronous data fetching, preventing layout shifts.

---

## 7. Weave Traditions Category Grid

### Component
`CategoryGrid`

### File
`frontend/pages/sections/CategoryGrid.tsx`

### Purpose
Route traffic into specific collection silos based on weave techniques (e.g. Sambalpuri, Bomkai, Ikat).

### Content
- **Eyebrow Label**: "Explore By Weave"
- **Heading**: "Seven Ancient Traditions" (renders as "Seven Ancient *Traditions*")
- **CTA Link**: "View All Collections" (pointing to `/shop`).
- **Category Links**:
  1. Sambalpuri (01 - "GI Tagged" - `/Sambalpuri saree.png` / `/Sambalpuri-mobile.png`)
  2. Bomkai (02 - "Temple Weave" - `/Bomkai saree.png` / `/Bomkai-mobile.png`)
  3. Ikat (03 - "Tie & Dye" - `/Ikat saree.png` / `/Ikat-mobile.png`)
  4. Silk (04 - "Pure Mulberry" - `/silk saree.png` / `/silk-mobile.png`)
  5. Cotton (05 - "Handspun" - `/cotton saree.png` / `/cotton-mobile.png`)
  6. Fancy (06 - "For Modern Girls" - `/Fancy saree.png` / `/Fancy-mobile.png`)
  7. Khandua (07 - "Sacred Weave" - `/Khandua saree.png` / `/Khandua-mobile.png`)

### Layout
- **Desktop Layout**: 
  - **Fancy Category Banner**: Sits above the grid as a full-width header block (`height: 200px`).
  - **Asymmetric Grid**: 3-column layout (`1.2fr 0.9fr 0.9fr`).
    - Sambalpuri: Spans 2 rows (`grid-column: 1; grid-row: 1 / 3;`).
    - Bomkai: Row 1, Col 2.
    - Ikat: Row 1, Col 3.
    - Silk: Row 2, Col 2.
    - Cotton: Row 2, Col 3.
    - Khandua: Spans full width at the bottom of the grid (`grid-column: 1 / -1; grid-row: 3; height: 160px;`).
- **Tablet Layout (769px – 1024px)**: 
  - Fancy banner hidden from header. Renders in the grid.
  - Grid turns into 2 columns.
  - Categories 1-6 display as block items with aspect ratio 4/5.
  - Khandua spans full-width bottom row (`height: 140px`).
- **Mobile Layout (<= 768px)**:
  - Grid is 2 columns. Categories 1-6 aspect ratio 3/4.
  - Khandua spans full-width bottom row (`height: 130px`, drops to `110px` on viewports `<= 400px`).

### Styling
- **Base Background**: `#F9F5EE` (Ivory).
- **Typography**: Header uses Playfair Display with italicized terracotta (`#B5502B`) emphasis. Labels and subtitles use DM Sans. Numbers use terracotta.
- **Card Surfaces**: Light surface base `#EDE3D0` with dark gradient veils (`cg-veil`) and terracotta top border lines (`#B5502B`).
- **Badges**: White arrow badges (`#F9F5EE`) revealing only on hover. Fancy banner has a custom semi-transparent top-right badge ("New Arrivals").

### Animations
- **Scroll Reveal**: Uses `IntersectionObserver` to trigger a clean translate slide-up transition when entering the viewport.
- **Hover Transitions**:
  - Image scales down slightly (`scale(1.05)` to `scale(1.0)`).
  - Terracotta top border line slides out (`scaleX(0)` to `scaleX(1)`).
  - Arrow badge slides down and scales up on hover.
  - Content details rise up by `4px` (`translateY(4px)` to `translateY(0)`).

### User Interaction
- **CTA Button**: Navigates to `/shop`.
- **Category Cards**: Hover triggers multiple transitions. Click navigates to respective filter query (e.g. `/shop?weave=Sambalpuri`).

### Backend Integration Readiness
- **State**: Static array.

### Dependencies
- React (`useRef`, `useEffect`, `useState`)
- React Router Link
- Lucide React `ArrowUpRight`

### Performance Notes
- Preloads first grid image with `eager` loading flag, while other cards use standard browser `lazy` loading.
- Separate desktop and mobile image tags (`cg-img-desk`, `cg-img-mob`) dynamically switch assets based on viewport CSS queries.

---

## 8. Handwoven Heritage Story

### Component
`HandwovenHeritage`

### File
`frontend/pages/sections/HandwovenHeritage.tsx`

### Purpose
Reinforce authenticity by introducing the artisan aspect behind the weaving process, emphasizing ethical labor.

### Content
- **Main Heading**: "EVERY THREAD CARRIES A STORY" (renders as "EVERY THREAD *CARRIES A STORY*")
- **Main Image**: `/Saree Creator Man 202606280804.jpeg`
- **Stats Overlay Strip**:
  - **15 Days**
  - **7 Gen**
  - **100% Hand**
  - **GI Cert.**
- **Artisan Quote**: "Handwoven over 15 days by artisans whose families have woven for seven generations."
- **CTA Link**: "Discover the Craft" with an arrow icon.

### Layout
- **Structure**: Center-aligned flexbox column with max-width `1440px`.
- **Overlay**: Stats strip is absolutely positioned at the bottom of the image frame, split into 4 equal columns divided by thin lines (`divide-x`).

### Styling
- **Background**: Solid white (`bg-white`).
- **Colors**: Heading uses primary ink (`#0D0B0A`) and dark terracotta (`#780000`) for the italicized line.
- **Stats strip**: Semitransparent white background `bg-white/85` with backdrop blur (`backdrop-blur-md`). Bold dark sans-serif text.
- **Typography**: Quote styled in a large serif font (`text-xl md:text-3xl lg:text-4xl`).

### Animations
- **Image Hover**: Hovering on the image container zooms the image (`scale-105` over a 1.5s transition).
- **CTA Hover**: Hovering on the link slides the arrow icon right.

### User Interaction
- **CTA Link**: Navigates to `/about` on click.

### Backend Integration Readiness
- **State**: Fully static.

### Dependencies
- React
- React Router Link
- Google Material Icons font

### Performance Notes
- Hardware-accelerated image scaling and CSS transitions.

---

## 9. Curated Selection Product Grid

### Component
`ProductsGrid` (re-used component)

### File
`frontend/pages/sections/ProductsGrid.tsx`

### Purpose
Expose premium or exclusive hand-picked selections. The dark, high-contrast palette creates a "boutique capsule" aesthetic.

### Content
- **Eyebrow Label**: "Direct from the Loom"
- **Heading**: "Curated Selection" (renders as "Curated *Selection*")
- **CTA Link**: "Explore All Sarees" (pointing to `/shop`).
- **Product Tiles**: Up to 4 product cards.

### Layout
- **Grid Layout**: Responsive grid `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-12`.
- **Spacing**: Section spaced with `px-4 py-16 md:px-[6vw] md:py-24`.

### Styling
- **Background**: Solid Obsidian Black `#0D0B0A` (passed as prop).
- **Theme**: High-contrast dark theme (`inverse={true}`). Title, view-all links, and card text adapt using CSS variables to display white text/muted grays.
- **Gold accents**: Gold tags and italic fonts (`var(--gold)` / Terracotta `#B5502B`).

### Animations
- **Skeleton Shimmer**: Shimmer boxes load sequentially with dark opacities (`rgba(255,255,255,0.05)`).
- **ProductCard transitions**: Detailed card zoom and icon reveals on hover.

### User Interaction
- **Explore All Sarees Link**: Navigates to `/shop`.
- **Product Cards**: Click opens detail page, quick add-to-cart, wishlist toggle.

### Backend Integration Readiness
- **API integration**: Dynamically receives `products` array prop. In `Home.tsx`, this data is fetched from the backend via `API.get('/products?limit=4')` (fallback array) and handled with a loading state.

### Dependencies
- React
- React Router Link
- `ProductCard` (reusable component)

### Performance Notes
- Skeletons handle non-blocking asynchronous data fetching.

---

## 10. Ambient Editorial Video Banner

### Component
`EditorialBanner`

### File
`frontend/pages/sections/EditorialBanner.tsx`

### Purpose
Create a high-end magazine feel on the homepage, blending clean typography with ambient, atmospheric lifestyle video to elevate brand value.

### Content
- **Left Panel (Text)**:
  - Brand Identifier: "The TANVO Experience"
  - Editorial Title: "Beyond A Saree"
  - Prose Narrative: "A piece of heritage. A story of craftsmanship. A connection between artisan and wearer."
  - Link CTA: "Explore the Collection" with ArrowRight.
- **Right Panel (Video)**:
  - Widescreen loop video: `/A_cinematic_couture_beauty_fil.mp4`

### Layout
- **Structure**: Split row layout (`flexDirection: 'row'`). Left panel and right panel each take up 50% width on a container with height `85vh` (minimum height `600px`).
- **Alignment**: Left panel centers text vertically with padding `0 max(60px, 6vw)`. Right panel acts as an absolute mask for the video.

### Styling
- **Background**: Premium Ivory `#F9F5EE` for left panel and page canvas base.
- **Typography**: Minimalist sans-serif title `#1C1B1A` and dark gray prose `#4A4640`.
- **Overlays**: Video has a subtle vignette overlay (`rgba(0, 0, 0, 0.04)`) to maintain editorial coloring.

### Animations
- **Video Playback**: Controlled by a native `IntersectionObserver` — video autoplays when inside the user viewport and pauses when out of view, saving CPU overhead.
- **CTA Link**: Fades opacity on hover (`opacity: 0.7`).

### User Interaction
- **CTA Link**: Navigates to `/shop` on click.

### Backend Integration Readiness
- **State**: Fully static.

### Dependencies
- React (`useRef`, `useEffect`)
- React Router Link
- Lucide React `ArrowRight`

### Performance Notes
- Video playback is fully optimized via IntersectionObserver, preventing performance drops on slow computers.
- Autoplay is muted and playsinline.

---

## 11. Men's Traditional Attire Campaign Banner

### Component
`NewArrivalsBanner` (imported as `MensTraditionalAttireBanner`)

### File
`frontend/pages/sections/MensTraditionalAttireBanner.tsx`

### Purpose
Promote the men's traditional handloom collections using a dedicated, high-impact campaign layout.

### Content
- **Main Image**: `/Mens Collection Banner.png`
- **Badge**: "Handloom Collection"
- **Heading**: "Men's Traditional"
- **Description**: "Discover the latest masterpieces from our looms."
- **CTA Button**: "Shop Now" (pointing to `/shop?sort=-createdAt`).

### Layout
- **Dimensions & Responsive Stack**:
  - **Mobile/Tablet**: Fully stacked layout (`flex flex-col`). The groom background image is set to a fixed height (`h-[320px] sm:h-[400px]`) and placed on top. The text panel sits directly underneath, and the bottom section padding is removed (`pb-0`) to eliminate blank gaps.
  - **Desktop**: Returns to an absolute-positioned float layout. The groom image covers the entire background. The content panel floats on the left (`md:w-[48%] lg:w-[42%]`).
- **Rounded Corners**: None. All components have sharp architectural edges (`rounded-none`).
- **Shadows**: Mobile card shadow is removed (`shadow-none`) to blend flat with the background; desktop card has `md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)]`.

### Styling
- **Overlays**: Top-to-bottom dark gradient on mobile (`bg-gradient-to-b from-black/20 via-black/10 to-black/60`) and right-aligned vignette on desktop (`md:bg-gradient-to-r md:from-black/45 md:via-black/10 md:to-transparent`).
- **Theme & Colors**:
  - **Mobile**: Light-themed panel (`bg-[#F9F5EE]`) with dark stone typography (`text-stone-500` for badges, `text-stone-950` for headings, `text-stone-700` for description). Button is styled with a dark stone outline (`border-stone-900 text-stone-900`) and dark hover fill. Panel border is hidden (`border-0`).
  - **Desktop**: Dark glassmorphic panel (`md:bg-black/25 md:backdrop-blur-md md:border md:border-white/10`) with white text (`md:text-white/70`, `md:text-white`, `md:text-white/80`). Button is styled with gold outline (`md:border-[#C9A84C]/60 md:text-[#C9A84C]`) and gold hover fill.
- **Typography**: Title in large display serif (`text-3xl md:text-5xl lg:text-7xl`).

### Animations
- Scale hover effect on CTA button.

### User Interaction
- **Shop Now Button**: Navigates to `/shop?sort=-createdAt`.

### Backend Integration Readiness
- **State**: Fully static campaign link.

### Dependencies
- React
- React Router Link

### Performance Notes
- Mobile and desktop responsive layouts are purely CSS/Tailwind based for instant responsiveness.

---

## 12. Modern Muse Campaign

### Component
`ModernMuse`

### File
`frontend/pages/sections/ModernMuse.tsx`

### Purpose
Position the brand at the intersection of ancestral handloom craft and contemporary silhouettes.

### Content
- **Background Image**: `/IMG202606240805.jpeg`
- **Branding labels**:
  - Center label: "TANVO PRESENTS"
  - Right vertical label: "TRADITION | CRAFT | SOUL" (hidden on mobile/tablet)
- **Main Heading**: "THE MODERN MUSE"
- **Description**: "Where heritage weaving meets contemporary elegance. A curated dialogue between ancestral craft and modern silhouette."
- **CTA Button**: "Explore Collection" with ArrowRight.

### Layout
- **Dimensions**: Full-bleed section with height `h-[600px] md:h-[80vh] lg:h-[90vh]`.
- **Card Placement & Responsiveness**:
  - **Mobile/Tablet**: Glassmorphic panel is anchored to the bottom (`absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%]`) so that the model's face in the upper part of the image is completely visible.
  - **Desktop**: Glassmorphic panel floats on the left (`md:top-1/2 md:left-[8%] lg:left-[12%] md:-translate-y-1/2 md:translate-x-0`).
- **Rounded Corners**: None. Glass panel (`rounded-none`) and button (`rounded-none`) have sharp corners.

### Styling
- **Overlays**:
  - **Top**: Seamless blend overlay gradient (`h-32 sm:h-40 md:h-24 lg:h-28 bg-gradient-to-b from-[#F9F5EE] via-[#F9F5EE]/70 to-transparent`) which matches the `#F9F5EE` background from the section above.
  - **Bottom**: Black gradient overlay (`h-1/2 bg-gradient-to-t from-black/90 to-transparent`) for typography readability.
- **Colors**: White text. CTA button uses deep red background (`#5A040B`).
- **Typography**: Title in Playfair Display serif (`text-3xl sm:text-4xl md:text-5xl lg:text-7xl`).

### Animations
- **Framer Motion Viewport Reveals**:
  - Image zooms out slowly from `1.15` to `1.0` on load.
  - Text contents fade up with staggered delays (0.2s, 0.4s).
  - Floating branding labels fade in (0.6s).
- **Button Hover**: Shifts the arrow icon right.

### User Interaction
- **Explore Collection Button**: Navigates to `/shop?style=Modern,Designer`.

### Backend Integration Readiness
- **State**: Fully static.

### Dependencies
- React
- Framer Motion
- React Router Link

### Performance Notes
- Viewport scroll reveals run once (`once: true`) to prevent continuous DOM recalculations.

---

## 13. The Art of Occasion

### Component
`DrapedEveryMoment`

### File
`frontend/pages/sections/DrapedEveryMoment.tsx`

### Purpose
Route traffic to occasion-specific shopping categories (e.g., weddings, gifting, daily wear), simplifying purchase decisions.

### Content
- **Eyebrow Label**: "Draped For Every Moment" (gold).
- **Heading**: "The Art of Occasion" (centered, uppercase).
- **Staggered Cards**:
  1. Bridal Collection (Wedding Elegance - `/The Art of Occasion Wedding .jpeg` - query: `wedding`)
  2. Celebration (Golden Beginnings - `/The Art of Occasion Ring Ceremony .jpeg` - query: `celebration`, staggered)
  3. Daily Heritage (Effortless Grace - `/The Art of Occasion Efferlatly garce .jpeg` - query: `daily`)
  4. Thoughtful Gifts (A Gift Of Tradition - `/The Art of Occasion Daily Use .jpeg` - query: `gifting`, staggered)

### Layout
- **Grid Layout**: Responsive grid `grid grid-cols-2 md:grid-cols-4 gap-6`.
- **Staggering**: Cards 2 and 4 have the class `md:mt-8` which shifts them downwards on desktop, creating a staggered grid layout.
- **Cards**: Fixed aspect ratio `aspect-[9/16]`.

### Styling
- **Background**: Solid white (`bg-white`).
- **Overlays**: Dark bottom-to-top gradient overlays (`from-black/90 via-black/40 to-transparent`).
- **Typography**: Titles in serif font, labels in bold gold.

### Animations
- **Card Hover**:
  - Image zooms (`scale-110` over 700ms).
  - Overlays darken.
  - Description slides up and fades in (`opacity-0 group-hover:opacity-100`, `max-h-0 group-hover:max-h-20`).

### User Interaction
- **Clickable Cards**: Navigates to respective occasion filter (e.g. `/shop?occasion=wedding`).

### Backend Integration Readiness
- **State**: Static array.

### Dependencies
- React
- React Router `useNavigate`

### Performance Notes
- Uses CSS transitions and GPU-accelerated transforms.

---

## 14. "Why Choose Us" Trust Grid

### Component
`WhyChooseUs`

### File
`frontend/pages/sections/WhyChooseUs.tsx`

### Purpose
Build customer confidence by emphasizing verified trust metrics, fair price sourcing, and textile certifications.

### Content
- **Eyebrow Label**: "The TANVO Promise" (gold).
- **Heading**: "Why Choose TANVO" (with gold italic "TANVO").
- **Grid Cards**:
  1. Weaver Collectives: Direct collaboration with 200+ artisan families in Maniabandha, Nuapatna, Barpali. (Icon: ShieldCheck)
  2. Fair Price Sourcing: Eliminating 2-3x retail markup, routing 70% value to weavers. (Icon: Tag)
  3. Registered GI Tagging: Audited Geographical Indication tags (Sambalpuri Ikat GI No. 22, Khandua Silk GI No. 132). (Icon: Award)
  4. Handloom Mark Certified: Ministry of Textiles validated manual shuttle operation. (Icon: Heart)

### Layout
- **Grid Layout**: Responsive `grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10` on a max-width container (`1200px`).
- **Spacing**: Padded with `100px max(48px, 6vw)`.

### Styling
- **Background**: Solid white (`#FFFFFF`).
- **Cards**: Outlined in light gold borders (`border: '1px solid rgba(201,168,76,0.1)'`).
- **Icon Boxes**: Gold circular backgrounds (`#C9A84C10`), gold icons, thin borders.
- **Typography**: Playfair Display for headers, Raleway for card descriptions.

### Animations
- **Scroll Reveal**: Staggered entry animation using Framer Motion (`initial={{ opacity: 0, y: 20 }}`) delayed by `idx * 0.1`.
- **Hover Transitions**: Cards lift by `10px` and borders turn gold.

### User Interaction
- **Card Hover**: lifts card, glows border, triggers soft gold shadow (`0 20px 40px rgba(201,168,76,0.08)`).

### Backend Integration Readiness
- **State**: Static array.

### Dependencies
- React
- Framer Motion
- Lucide React `ShieldCheck`, `Tag`, `Award`, `Heart`

### Performance Notes
- Staggered animation triggers only once when scroll position enters the viewport.

---

## 15. Trust Signals Media Showcase

### Component
`TrustSignals`

### File
`frontend/pages/sections/TrustSignals.tsx`

### Purpose
Provide verifiable multimedia proof (video logs and certificate images) showcasing weaver stories and authenticity certifications.

### Content
- **Eyebrow Label**: "Worn Across Generations" (gold).
- **Heading**: "The Story Behind Every Saree" (underlined gold).
- **Description**: "We believe in honest craftsmanship. Explore our process..."
- **Visual panels**:
  1. The Loom Journey (video loop `/saree quality 2.mp4` showing dye/shuttle, badge: "Behind The Craft", stats: "Handwoven Heritage", icon: Play)
  2. The Weaver Stories (image `/weaver-story.png`, badge: "Meet The Makers", stats: "Generations Of Craft", icon: Users)
  3. Authenticity Promise (image `/certificate.png`, badge: "Certified Heritage", stats: "Craft You Can Trust", icon: Shield)
- **Trust Badges Row**:
  - Authenticity Guaranteed (Shield)
  - Free Shipping Worldwide (Truck)
  - 24/7 Customer Support (Users)
  - Handcrafted with Love (Award)

### Layout
- **Grid Layout**: Responsive grid `grid-template-columns: repeat(3, 1fr)` (3 columns on desktop, 2 on tablet, 1 on mobile).
- **Dimensions**: Cards fixed at `480px` height (440px on mobile, 400px on small mobile).
- **Bottom row**: Centered flexbox row with spacing.

### Styling
- **Background**: Solid Black `#0D0B0A` with a subtle radial gradient `radial-gradient(circle at 20% 40%, rgba(201, 168, 76, 0.03) 0%, transparent 50%)`.
- **Card Overlays**: Dark overlays (`linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.75) 100%)`).
- **Badges**: White/gold text tags. Bottom badges have circular gold-tint boxes.

### Animations
- **Framer Motion reveals**: Staggered slide up on viewport entry (`idx * 0.15` delay) and scale-in for bottom badges.
- **Card Hover**: 
  - Card translates y by `-8px` and shadow intensifies.
  - Loom Journey card: Autoplays video loop. Pauses when mouse leaves.
  - Weaver Stories / Authenticity cards: Scales background images (`scale: 1.08`).

### User Interaction
- **Click Cards**: Clicking toggles play/pause on the video.
- **Hover**: Plays video loop or zooms images, reveals play/pause button states.

### Backend Integration Readiness
- **State**: Static array.

### Dependencies
- React (`useRef`, `useState`)
- Framer Motion
- Lucide React

### Performance Notes
- Video loop uses `preload="metadata"` and `#t=0.001` to prevent fetching the full video payload on page load.
- Video only plays on hover/click to reduce GPU and memory usage.

---

## 16. Brand Story Video Banner

### Component
`BrandStorySection`

### File
`frontend/pages/sections/BrandStorySection.tsx`

### Purpose
Reintroduce the human history behind the brand using a full-screen ambient video background.

### Content
- **Background Video**: `/VID02606251815.mp4`
- **Label**: "THE TANVO STORY" (gold).
- **Heading**: "The Real Stories Behind Our Brand" (ivory).
- **Paragraph**: "Every saree carries the hands, heritage, and patience of the artisans who create it."
- **CTA Button**: "Discover Our Heritage" (linking to `/story`).

### Layout
- **Dimensions**: Relative container with height `80vh` (minimum height `600px`).
- **Alignment**: Flex container with vertical center alignment. Left-aligned text on desktop, center-aligned on mobile.

### Styling
- **Overlays**: Bottom-to-top gradient on mobile, left-to-right gradient overlay `from-[#0D0B0A]/50 via-[#0D0B0A]/20 to-transparent` on desktop.
- **Colors**: Ivory text `#F9F5EE`, gold highlights `#C9A84C`.
- **Typography**: Title in Playfair Display serif.

### Animations
- **Framer Motion reveals**: Viewport slide up staggered (0s, 0.2s, 0.4s, 0.6s).
- **Button Hover**: CTA button sweeps background to solid terracotta red `#780000`.

### User Interaction
- **CTA Button**: Click navigates to `/story`.

### Backend Integration Readiness
- **State**: Fully static.

### Dependencies
- React
- Framer Motion
- React Router Link

### Performance Notes
- Autoplays muted, looped, and playsinline background video.

---

## 17. Premium WhatsApp Commerce Section

### Component
`WhatsAppOrder`

### File
`frontend/components/WhatsAppOrder.tsx`

### Purpose
Offer a high-touch, direct-to-artisan ordering alternative (concierge service) via WhatsApp, ideal for custom orders, bridal collections, or users preferring personal chat over standard checkout.

### Content
- **Left Panel (Image)**:
  - Main photo: `/Indian bride wearing silk saree.jpeg`
  - Badge: "Personal Assistance" (green).
  - Floating note: "Handloom Heritage · Est. 2020".
- **Right Panel (Content)**:
  - Subtitle: "TANVO CONCIERGE" (green).
  - Heading: "Order Directly via WhatsApp" (where "via WhatsApp" is green italicized).
  - Description: "For traditional buyers and high-value purchases — simply message us..."
  - 3-Step Guide list:
    - 01: Send a screenshot or product name.
    - 02: Share your delivery address.
    - 03: Confirm via chat or call · Pay COD or online.
  - Occasion chips: "Wedding", "Engagement", "Festivals", "Gifting" linking to specific pre-filled messages on WhatsApp.
  - Main Button CTA: "Order via WhatsApp" (renders from `WhatsAppConcierge` component).
  - Bottom Trust Note: "Trusted by families choosing heritage handloom for special occasions" with a gold star.

### Layout
- **Structure**: Grid container `grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20` (minimum height `580px`).
- **Responsive details**: Image is ordered below content on mobile (`order-2 lg:order-1`).
- **Spacing**: Padded with `py-20 lg:py-28`.

### Styling
- **Background**: Solid Ivory `#F9F5EE`.
- **Accents**: Green `#1A6634`, Gold `#C9A84C`.
- **Borders**: Golden wireframes and underlines.

### Animations
- **Framer Motion reveals**: Slide-in from left/right (`initial={{ opacity: 0, x: -30 }}`).
- **Image Hover**: Zooms image (`scale-105` over 700ms).
- **Occasion Underline**: Slides out on hover.
- **Button Sweep**: White shine sweep slides across the CTA button on hover.

### User Interaction
- **Occasion Chips**: Click opens WhatsApp window with pre-filled messages tailored to that occasion.
- **Order via WhatsApp Button**: Click opens WhatsApp conversation with generic message.
- **Hover**: Triggers image zoom, chip underlines, button shine sweep.

### Backend Integration Readiness
- **URL-ready parameters**: Uses static telephone number `919876543210`. The occasion buttons and checkout details open direct WhatsApp Web links (`wa.me/919876543210`) with URL encoded messages.

### Dependencies
- React
- Framer Motion
- `WhatsAppConcierge` (sub-component)

### Performance Notes
- Lightweight asset load. Simple image fallback triggers if local image load fails.

---

## 18. Instagram Social Grid

### Component
`InstagramSection`

### File
`frontend/pages/sections/InstagramSection.tsx`

### Purpose
Expose social proof by showing real-world customers and influencers styling TANVO products under the `#Tanvo` tag.

### Content
- **Eyebrow Label**: "Community"
- **Heading**: "Wear it · Share it #Tanvo"
- **Grid Photos**: 6 square images.
- **CTA Button**: "Follow on Instagram" with an ArrowUpRight icon.

### Layout
- **Grid Layout**: 6 columns (`gridTemplateColumns: 'repeat(6, 1fr)', gap: 2`), displaying square 1:1 image items.
- **Spacing**: Section spaced with `100px max(48px, 6vw)`.

### Styling
- **Background**: Solid Ink (`var(--ink)`).
- **Gold Accent**: Title handle in gold (`var(--gold)` / Terracotta `#B5502B`).
- **Button**: Styled as gold outline button (`btn-outline-gold`).

### Animations
- **Image Hover**:
  - Image opacity increases from 75% to 100%.
  - Gold tint overlay (`rgba(201,168,76,0.25)`) and Instagram icon fades in.
- **Button Hover**: Colors swap.

### User Interaction
- **Grid images**: Hovering displays overlay/icon, clicking opens the Instagram feed link.
- **Follow Button**: Navigates to Instagram profile URL.

### Backend Integration Readiness
- **Mock Fallback**: Renders static mock array using `picsum.photos` if no posts prop is supplied. Ready for API integration.

### Dependencies
- React
- Lucide React `Instagram`, `ArrowUpRight`

### Performance Notes
- Dynamic pictures can be lazy-loaded on mount.

---

## 19. Trust Bar

### Component
`TrustBar`

### File
`frontend/pages/sections/TrustBar.tsx`

### Purpose
Provide a final set of checkout reassurances (authenticity, shipping, returns, fabric quality) immediately above the global site footer.

### Content
- **Columns**:
  1. 100% Authentic (Direct from Loom) - ShieldCheck
  2. Global Shipping (Fast & Insured) - Globe
  3. Premium Fabrics (Hand-picked) - Gem
  4. 7-Day Returns (Hassle Free) - RotateCcw

### Layout
- **Structure**: Gold strip containing a responsive grid `gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))'`. Columns separated by fine vertical lines.
- **Spacing**: Padded with `0 max(48px, 6vw)`.

### Styling
- **Background**: Solid gold (`var(--gold)` / Terracotta `#B5502B`).
- **Typography**: Small uppercase sans-serif (`fontFamily: "'Inter', sans-serif"`, size `9px` and `8px`, color `var(--ink)`).
- **Icons**: Dark color, size `20px` with a stroke width of `1.5`.

### Animations
- None.

### User Interaction
- None.

### Backend Integration Readiness
- **State**: Hardcoded static array.

### Dependencies
- React
- Lucide React `ShieldCheck`, `Globe`, `Gem`, `RotateCcw`

### Performance Notes
- Extremely lightweight static footer banner.

---

# HOMEPAGE ARCHITECTURE SUMMARY

## Component Hierarchy

The homepage structure (`Home.tsx`) maintains the following nested component hierarchy:

```
Home
├── HeroSection
├── ProductsGrid (Bestsellers)
│   └── ProductCard
├── VideoBanner
├── MarqueeTicker
├── PillarsSection
├── ProductsGrid (New Arrivals)
│   └── ProductCard
├── CategoryGrid
├── HandwovenHeritage
├── ProductsGrid (Curated Selection)
│   └── ProductCard
├── EditorialBanner
├── MensTraditionalAttireBanner (NewArrivalsBanner)
├── ModernMuse
├── DrapedEveryMoment
├── WhyChooseUs
├── TrustSignals
│   └── TrustCard
├── BrandStorySection
├── WhatsAppOrder
│   └── WhatsAppConcierge
├── InstagramSection
└── TrustBar
```

---

## Inactive & Draft Components

The codebase includes several inactive sections. These files exist in the file system but are completely un-imported or commented out in `Home.tsx`:

- **Interactive Ikat Deep-Dive** (`frontend/pages/sections/IkatDeepDive.tsx`): Left-side hotspots detailing double-Ikat weave preparation, right-side typography.
- **Journal Hint (The TANVO Chronicles)** (`frontend/pages/sections/JournalHint.tsx`): Magazine-style list pointing to three articles (Craft, Heritage, Process) on a black background.
- **Heritage Meets Modern** (`frontend/pages/sections/HeritageModern.tsx`): Editorial section featuring a grayscale-to-color transition image.
- **Six Ancient Traditions** (`frontend/pages/sections/SixTraditions.tsx`): Grid displaying six traditional weaves with numbered indicators.
- **Other Drafts**: `CultureParallax.tsx`, `DualFeatureSection.tsx`, `FeaturedCollections.tsx`, `FounderSection.tsx`, `MasterWeaverSection.tsx`.

---

## Current Homepage Philosophy

The homepage layout is structured to execute a specific customer acquisition funnel, combining luxury storytelling with friction-free commerce:

- **Brand Positioning (Calm Luxury)**: Establishes a premium brand identity through large editorial images, high-contrast dark segments, and muted color palettes (Warm Ivory `#F9F5EE`, Charcoal `#1C1612`, and Terracotta `#B5502B` accents).
- **Editorial Storytelling**: Intersperses commercial grids with cinematic video blocks (`VideoBanner`, `EditorialBanner`, `BrandStorySection`) to tell the weaver's history, building a heritage connection.
- **Product Discovery**: Segments products by popularity (`Bestsellers`), freshness (`New Arrivals`), premium quality (`Curated`), weave technique (`CategoryGrid`), and occasion (`The Art of Occasion`).
- **Trust Building**: Employs multiple credibility grids (`PillarsSection`, `WhyChooseUs`, `TrustSignals`, `TrustBar`) explaining registered GI tagging, textiles certifications, and direct-weaver sourcing.
- **Conversion Flow**: Ends with a premium WhatsApp commerce checkout option (`WhatsAppOrder`) to capture customers who prefer direct messaging and personal assistance.

---

## Future Backend Readiness

The homepage sections are divided into three backend integration states:

| Section Name | Current State | Future Integration Path |
|---|---|---|
| **Hero Section** | Static Slide Array | Can be migrated to a Hero Banner CMS schema to let admins swap marketing slides. |
| **Bestsellers Grid** | **API-ready** | Dynamically queries `/products?isBestSeller=true` database records. |
| **Video Banner** | Static Asset | Video file path can be managed via a CMS. |
| **Marquee Ticker** | Static Text | No integration required. |
| **Pillars Section** | Static Metrics | No integration required. |
| **New Arrivals Grid** | **API-ready** | Dynamically queries `/products?sort=-createdAt` database records. |
| **Category Grid** | Static Category Array | Can be linked to database category lists. |
| **Handwoven Heritage** | Static Story | Can be migrated to an Artisan CMS schema. |
| **Curated Grid** | **API-ready** | Dynamically queries general database product records. |
| **Editorial Banner** | Static Video / Text | Left panel prose can be customized in a CMS. |
| **Men's Attire Banner** | Static Campaign | Banner image and link can be managed in a CMS. |
| **Modern Muse** | Static Campaign | Campaign assets can be managed in a CMS. |
| **Art of Occasion** | Static Occasions | Occasion categories can be mapped to database taxonomy. |
| **Why Choose Us** | Static Metrics | Can remain static or reside in an admin configurations page. |
| **Trust Signals** | Static Stories Array | Video files and story text can be migrated to Weaver/Process CMS collections. |
| **Brand Story Section** | Static Video / Text | Video background and prose can reside in a CMS. |
| **WhatsApp Order** | Static Phone / Messages | Phone numbers and pre-filled strings can be loaded from environment config files. |
| **Instagram Grid** | Static Mock Images | Can be connected to the Instagram Graph API to display live feeds. |
| **Trust Bar** | Static Guarantees | Can remain static or reside in admin configuration schema. |
