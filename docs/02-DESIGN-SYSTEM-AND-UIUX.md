# 02. Design System & UI/UX Guidelines

## 1. Brand Identity & Aesthetic Positioning
- **Primary Vibe:** Vibrant, standout, and playful (to captivate children and young parents) balanced with a clean, high-end, and ultra-professional finish (to convey premium quality and trust).
- **Design Tokens:** Rounded corners (`rounded-2xl`, `rounded-3xl`), soft shadows (`shadow-md`, `shadow-lg`), and smooth micro-interactions.

## 2. Color Palette Specs
- **Primary / Brand:** Soft Teal / Mint (`#0D9488` / `#14B8A6`) — Represents freshness, growth, and stability.
- **Accent / Energy:** Coral / Warm Pastel Orange (`#FF6B6B` / `#F97316`) — Highlights key CTAs, buttons, and badges to capture attention.
- **Secondary / Playful:** Pastel Yellow (`#FDE047`) — Used for subtle card backgrounds, highlights, and icons.
- **Neutrals & Canvas:** Warm Off-White (`#FAFAFA` / `#F5F5F4`) for backgrounds; Deep Slate (`#0F172A`) for high-contrast, crystal-clear typography.

## 3. Typography
- **Primary / Heading & Body Font:** `Nunito` (via `next/font/google`).
  - *Rationale:* Rounded typography that feels friendly and approachable for early education while remaining highly legible across all screen resolutions.

## 4. Layout Structure & Landing Page Modules
1. **Header / Navigation:** Sticky glassmorphism navbar with Logo, Menu items, and a prominent "Jadwalkan Kunjungan" CTA.
2. **Hero Section:** Eye-catching typography, playful illustration/image mask, short value proposition, and primary action buttons.
3. **About & Educational Philosophy:** Clean grid showcasing core values (Safety, Creativity, Character Building).
4. **Programs Grid:** Card layout detailing age groups (e.g., Playgroup, TK A, TK B) with soft background colors and hover animations.
5. **Facilities & Safety Showcase:** Visual gallery emphasizing CCTV security, safe play zones, and child-friendly amenities.
6. **Teacher & Educator Profiles:** Friendly bio cards highlighting teacher qualifications and warmth.
7. **Activities Gallery:** Responsive image grid powered by Cloudinary.
8. **Parent Testimonials:** Social proof slider/grid.
9. **Interactive Contact & Location Section:**
   - Inquiry & Visit Form (connected to Supabase & Resend).
   - Interactive Leaflet/OpenStreetMap embeds.
   - Floating WhatsApp Direct Button.
10. **Footer:** Quick links, operating hours, social media links, and copyright info.