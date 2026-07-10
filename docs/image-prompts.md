# TANVO — Image Generation Prompts

> Replace placeholder assets with the final AI-generated or photographed images below.
> Each entry lists: the **file path** to drop the final asset into, the full **generation prompt**, and **usage notes**.

---

## 1. Flowing Silk Fabric — Both Sections

| Property | Value |
|---|---|
| **File Path** | `/public/flowing-silk-fabric.png` |
| **Current Placeholder** | ✅ AI-generated temp file in place |
| **Used In** | `MensTraditionalAttireBanner.tsx`, `ModernMuse.tsx` |
| **Format** | PNG with transparency preferred (or JPG with dark bg) |
| **Aspect Ratio** | 3:1 wide landscape |

**Generation Prompt:**
```
Luxury fashion editorial photograph of flowing peach-copper-golden silk fabric caught dramatically mid-air, billowing in elegant waves and deep folds against a very dark warm chocolate-brown background. The silk has a rich high-luster sheen with subtle iridescent highlights. Cinematic studio lighting with a single warm key light source from above-left creating depth in the folds. No people, no text. Isolate the fabric against the dark background. The fabric should fill approximately 70-80% of the frame. Ultra high resolution, luxury fabric photography, shallow depth of field, warm amber and peach tones. Aspect ratio 3:1, landscape orientation.
```

---

## 2. Handloom Loom Close-Up (Thumbnail 1 — Top Left)

| Property | Value |
|---|---|
| **File Path** | `/public/thumb-loom-weave.jpg` |
| **Used In** | `MensTraditionalAttireBanner.tsx` (2×2 thumbnail grid, slot 1) |
| **Format** | JPG |
| **Aspect Ratio** | 1:1 square |

**Generation Prompt:**
```
Extreme close-up macro photograph of a traditional Indian handloom in operation. Warm amber and ivory cotton or silk warp threads stretched tightly across the loom frame, with ikat-dyed thread patterns visible in the weave. Warm natural window light, shallow depth of field, warm tones of honey, amber, and rust. Craft heritage photography. Square aspect ratio 1:1. No people visible, just the loom and the textile in progress.
```

---

## 3. Silk Thread Roll Close-Up (Thumbnail 2 — Top Right)

| Property | Value |
|---|---|
| **File Path** | `/public/thumb-silk-thread-roll.jpg` |
| **Used In** | `MensTraditionalAttireBanner.tsx` (2×2 thumbnail grid, slot 2) |
| **Format** | JPG |
| **Aspect Ratio** | 1:1 square |

**Generation Prompt:**
```
Close-up macro photograph of a rolled bolt or spool of shimmering copper-gold silk thread or fabric on a dark wooden surface. The silk gleams with high luster, showing fine thread detail. Warm candlelight-quality lighting with a subtle dramatic shadow. Luxury craft photography. Square 1:1 aspect ratio. Tones: warm gold, copper, amber. No people, no text.
```

---

## 4. Nehru Jacket Fabric Detail (Thumbnail 3 — Bottom Left)

| Property | Value |
|---|---|
| **File Path** | `/public/thumb-jacket-fabric-detail.jpg` |
| **Used In** | `MensTraditionalAttireBanner.tsx` (2×2 thumbnail grid, slot 3) |
| **Format** | JPG |
| **Aspect Ratio** | 1:1 square |

**Generation Prompt:**
```
Close-up detail photograph of the front panel of a dark navy-blue Indian Nehru jacket / Modi jacket made from handloom ikat fabric. The fabric surface shows subtle geometric ikat pattern weaving in lighter blue and grey threads against the dark navy base. Crisp styling, soft directional lighting highlighting the fabric texture. Flat lay or draped on a form. Luxury menswear craft photography. Square 1:1 aspect ratio. Cool deep blue tones with subtle warm highlights.
```

---

## 5. Draped Silk Fabric Close-Up (Thumbnail 4 — Bottom Right)

| Property | Value |
|---|---|
| **File Path** | `/public/thumb-draped-silk-detail.jpg` |
| **Used In** | `MensTraditionalAttireBanner.tsx` (2×2 thumbnail grid, slot 4) |
| **Format** | JPG |
| **Aspect Ratio** | 1:1 square |

**Generation Prompt:**
```
Close-up macro photograph of a section of draped peach-rose-copper silk saree or fabric, softly folded to reveal its sheen and the fine texture of the weave. The folds create elegant curves and highlights. Warm golden-hour quality lighting, luxurious and soft. The tones should be warm peach, blush rose, and soft copper with creamy highlights. No people. Square 1:1 aspect ratio. Ultra crisp fabric texture detail.
```

---

## 6. Man's Portrait — Men's Traditional (Main Background Hero)

| Property | Value |
|---|---|
| **File Path** | `/public/Mens Collection Banner.png` *(EXISTING — may need reshoot)* |
| **Used In** | `MensTraditionalAttireBanner.tsx` (full right panel background) |
| **Format** | PNG or JPG |
| **Aspect Ratio** | 2:3 portrait |

> **Note:** The existing `/Mens Collection Banner.png` is currently used as the background. In the reference design, the man's portrait is the dominant right-side visual. If the current image doesn't feature a clear well-lit portrait of a man in a dark blue/navy ikat Nehru jacket, commission a replacement shoot.

**Generation Prompt (if reshoot needed):**
```
Portrait photograph of a handsome Indian man in his late 20s to 35, wearing a dark navy-blue ikat handloom Nehru jacket over a cream/white kurta, standing in the courtyard of a traditional Indian palace or haveli with ornate stone columns. He looks slightly off-camera with a confident, contemplative expression. Warm golden-hour late afternoon lighting, soft bokeh background. The composition should show him from waist-up, slightly right of center. Luxury heritage fashion photography. Warm earthy tones.
```

---

## 7. Modern Muse Woman — Background (EXISTING)

| Property | Value |
|---|---|
| **File Path** | `/public/IMG202606240805.jpeg` *(EXISTING — in use)* |
| **Used In** | `ModernMuse.tsx` (full-bleed background) |

> ✅ Asset already exists. No replacement needed unless the styling/crop needs adjustment.

---

## Replacement Workflow

1. Generate each image using the prompts above (or commission photography).
2. Drop the final file at the specified **File Path**.
3. Update the `src` attribute in the component accordingly (thumbnail slots use named paths).
4. The components' layout, sizing, and positioning are already correct — only the image asset changes.
