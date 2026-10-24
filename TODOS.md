# Project Task Backlog & Todo List

## Phase 1: Core Setup & Public Profile
- [x] **Infrastructure & Configuration**
  - [x] Initialize Next.js 14 (App Router) with TypeScript & Tailwind CSS.
  - [x] Install Shadcn UI and configure `components.json`.
  - [x] Setup Sanity.io client in `lib/sanity/client.ts`.
  - [x] Setup Supabase client in `lib/supabase/client.ts`.
  - [x] Setup `.env.local` environment variable placeholders.

- [x] **CMS Schema & Dynamic Content**
  - [x] Define `siteSettings` schema in Sanity.
  - [x] Define `program` schema in Sanity.
  - [x] Define `facility` schema in Sanity.
  - [x] Define `teacher` schema in Sanity.

- [x] **Frontend Components & Pages**
  - [x] Build Header / Navigation Bar with Glassmorphism & Mobile Drawer.
  - [x] Build Hero Section with playful visual mask and CTA buttons.
  - [x] Build Educational Programs Grid with interactive hover states.
  - [x] Build Facilities & CCTV Safety section.
  - [x] Build Teacher Profiles carousel/grid.
  - [x] Build Interactive Contact Form connected to Supabase & Resend API.
  - [x] Integrate Leaflet/OpenStreetMap for campus location.

- [x] **SEO & Performance**
  - [x] Implement dynamic OpenGraph metadata in `layout.tsx`.
  - [x] Add structured JSON-LD data for Local Educational Institution.
  - [x] Run Lighthouse audit and optimize images via Cloudinary/Sanity.

## Phase 2: Database Setup, Sanity Studio Integration & Dynamic Detail Pages
- [x] **Supabase SQL Migration**
  - [x] Create `inquiries` table migration (`supabase/migrations/01_inquiries.sql`) with UUID, timestamps, form fields, and RLS policies for public INSERT.

- [x] **Sanity Studio Embedded Route**
  - [x] Create `/studio/[[...tool]]` route with `next-sanity/studio` integration.
  - [x] Create Sanity config (`sanity/sanity.config.ts`) with schema types.
  - [x] Configure route group structure to isolate Studio from public layout.

- [x] **Dynamic Detail Pages (RSC with Fallback Data)**
  - [x] Program Detail Page (`src/app/program/[slug]/page.tsx`): RSC, dynamic metadata, generateStaticParams, fallback data.
  - [x] Teacher Detail Page (`src/app/guru/[slug]/page.tsx`): RSC, dynamic metadata, generateStaticParams, fallback data.
  - [x] Fallback data module (`src/lib/fallback-data.ts`) with programs and teachers.

- [x] **Verification & Documentation**
  - [x] TypeScript strict mode (no `any`).
  - [x] `npm run build` passes (SSG/ISR works).
  - [x] Updated TODOS.md and PROGRESS.md.

## Phase 3: Digital Admission (PPDB) & Internal Admin Dashboard
- [x] **Supabase SQL Migration**
  - [x] Create `registrations` table migration (`supabase/migrations/02_ppdb_and_auth.sql`) with UUID, timestamps, registration_number, parent/child fields, program_applied, status enum, and RLS policies for public INSERT.

- [x] **PPDB Registration Form (Public)**
  - [x] Create `/ppdb` page with multi-step form (Parent Data → Child Data → Program Selection → Confirmation).
  - [x] Implement React Hook Form + Zod validation (`src/lib/validations/ppdb.ts`).
  - [x] Build form components with native Select, Input, Textarea, DatePicker.
  - [x] Create API route `/api/ppdb` for Supabase insert + Resend confirmation email.

- [x] **Admin Portal Dashboard**
  - [x] Create isolated `(admin)` route group layout.
  - [x] Build dashboard page with stats cards (Inquiries, PPDB totals, Verified, Accepted).
  - [x] Display Inquiries table with search, filter, and status badge/actions.
  - [x] Display Registrations (PPDB) table with search, filter, and status badge/actions.
  - [x] Use native `<select>` for status dropdowns (consistent with PPDB form).

- [x] **Verification & Documentation**
  - [x] TypeScript strict mode (no `any`).
  - [x] `npm run build` passes — all routes compile: `/`, `/ppdb`, `/dashboard`, `/studio`, `/program/[slug]`, `/guru/[slug]`, API routes.
  - [x] Updated TODOS.md and PROGRESS.md.

## Phase 4: Enterprise Playful-Luxury Visual Overhaul (DESIGN-POLICY.md)
- [x] **Design System Foundation**
  - [x] Create `FloatingOrnaments.tsx` component with stars, clouds, bubbles, and doodle animations.
  - [x] Add custom animations to `globals.css` (float, float-slow, pulse-slow, doodle).
  - [x] Define color palette: Minty Emerald, Bubblegum Pink, Butter Yellow, Peach Coral, Lavender Purple.
  - [x] Establish claymorphism & 3D depth patterns (border-b-4 buttons, thick borders, layered shadows).

- [x] **HeroSection.tsx** - Complete redesign
  - [x] Multi-tone diagonal gradient background with polka-dot texture.
  - [x] Giant H1 with font-black and gradient text highlights.
  - [x] 3D Push Buttons (primary: amber/orange, secondary: emerald glassmorphic).
  - [x] Stats cards with tilt angles, 3D icons, floating star ornaments.
  - [x] FloatingOrnaments integration (30 particles).

- [x] **ProgramsSection.tsx** - Complete redesign
  - [x] 4 program cards with distinct themes (Emerald, Pink, Amber, Purple).
  - [x] Alternating tilt angles (rotate-1, -rotate-1, etc.).
  - [x] 3D checkmark bullets, claymorphic cards with thick borders.
  - [x] 3D Push Button CTAs with border-b-4 and glow shadows.
  - [x] FloatingOrnaments per card (6 particles each).

- [x] **FacilitiesSection.tsx** - Complete redesign
  - [x] Polaroid-style facility cards with 6 distinct color themes.
  - [x] CCTV LIVE badge with pulsing animation.
  - [x] Safety section in dark playful mode (slate-900) with glowing shields.
  - [x] FloatingOrnaments throughout both sections.

- [x] **TeachersSection.tsx** - Complete redesign
  - [x] Teacher cards with thick patterned pastel border circles.
  - [x] Speech bubble micro-interaction on hover ("Halo! Mari Belajar Bersama 👋").
  - [x] Pastel pill specialty tags with icons.
  - [x] 3D Push Button "Lihat Profil" with theme-matched colors.
  - [x] FloatingOrnaments per card.

- [x] **ContactSection.tsx** - Complete redesign
  - [x] White Clay Container form (bg-white border-4 border-amber-200 rounded-[40px]).
  - [x] Jumbo inputs (h-16, rounded-[16px], thick borders, pastel bg).
  - [x] Focus states with purple/pink glow rings.
  - [x] Labels with emoji prefixes (👤, 👶, 📱, 📅, 📧).
  - [x] Campus Map in giant rounded frame (rounded-[36px] border-8).
  - [x] 3D Push Buttons for submit and WhatsApp CTAs.

- [x] **PPDBForm.tsx** - Complete redesign
  - [x] Multi-step form with themed progress indicators.
  - [x] Native select dropdowns with 3D styling.
  - [x] Form inputs matching ContactSection design language.
  - [x] Success/Error states with claymorphic containers.
  - [x] FloatingOrnaments throughout.

- [x] **CampusMap.tsx** - Updated styling
  - [x] Rounded-[24px] container with enhanced shadow.
  - [x] Updated control buttons with new design language.

- [x] **Home Page (/(public)/page.tsx)** - CTA section redesign
  - [x] Consistent gradient background, 3D buttons, floating ornaments.
  - [x] Trust indicators with Shield/Sparkles icons.

- [x] **PPDB Page (/(public)/ppdb/page.tsx)** - Full page redesign
  - [x] Hero header with themed gradient, floating ornaments.
  - [x] Info cards with distinct themes and hover effects.
  - [x] Form container matching new design language.

- [x] **Verification**
  - [x] TypeScript strict mode (no `any`).
  - [x] `npm run build` passes — all 19 routes compile successfully.
  - [x] Zero sharp corners (minimum rounded-[16px] to rounded-[40px]).
  - [x] All buttons are 3D Push Buttons with depth.
  - [x] Rich floating ornaments on every section.
  - [x] Playful typography with font-black and gradient highlights.
  - [x] Updated TODOS.md and PROGRESS.md.

## Phase 5: V3.0 HIGH-GLOSS LUXURY OVERHAUL (SYSTEM DIRECTIVE V3.0)
- [x] **Design System Foundation - V3.0 Upgrade**
  - [x] Enhanced `FloatingOrnaments.tsx` with 6 ornament types (stars, clouds, bubbles, doodles, badges, sparkles).
  - [x] Added 9 custom animations to `globals.css`: float-rotate, wiggle, pulse-glow, bounce-slow, shimmer, plus existing float, float-slow, pulse-slow, doodle.
  - [x] Upgraded color palette to HIGH-SATURATION glossy gradients: Vivid Mint, Candy Pink, Vibrant Amber, Royal Lavender, Vivid Sky, Electric Purple, Golden Amber, Peach Coral.
  - [x] Established Glossy Claymorphic Card pattern: `bg-gradient-to-br from-white via-[color]-50 to-[color]-100`, `border-4 border-[color]-200/60`, `border-t-2 border-white/40`, multi-layered shadows with colored glows.
  - [x] Established High-End 3D Tactile Push Button: `bg-gradient-to-r from-[color]-400 via-[color]-500 to-[color]-400`, `border-b-8`, `border-t-2`, shimmer overlay, physics-based spring press effect.

- [x] **HeroSection.tsx** - V3.0 Luxury Redesign
  - [x] Multi-blob animated background with float-rotate, shimmer polka-dot texture.
  - [x] Floating 3D decorative icons (Balloon, Crown, Zap, Heart) with drop-shadows.
  - [x] Top badge with animate-bounce-slow, gradient border, shimmer.
  - [x] H1 with high-saturation gradient (amber→orange→pink), drop-shadow glow.
  - [x] Primary CTA: 3D push button with border-b-8, border-t-2, shimmer, animate-bounce-slow, spring press.
  - [x] Secondary CTA: Glassmorphic with emerald border-t-2, shimmer, hover lift.
  - [x] Stats cards: glossy claymorphism (border-t-2, inset highlight), tilt ±1.5°, floating stars/sparkles, animated icon containers.

- [x] **ProgramsSection.tsx** - V3.0 Luxury Redesign
  - [x] 4 cards with saturated gradient themes (Vivid Mint, Candy Pink, Vibrant Amber, Royal Lavender).
  - [x] Glossy highlight overlays (white/40 top, shimmer gradient, colored glow).
  - [x] Image containers with white/30 glossy overlay on hover.
  - [x] Badges: gradient bg, white text, shadow.
  - [x] Feature bullets: accentColor dots with animate-bounce-slow + drop-shadow.
  - [x] CTAs: 3D push buttons with border-b-8, shimmer, colored glow shadows.
  - [x] FloatingOrnaments per card (8 particles).

- [x] **FacilitiesSection.tsx** - V3.0 Luxury Redesign
  - [x] 6 polaroid cards with saturated themes (Vivid Sky, Electric Purple, Vivid Emerald, Golden Amber, Candy Pink, Peach Coral).
  - [x] CCTV LIVE badge: gradient red→pink, animate-pulse-glow.
  - [x] Safety section: dark mode with 4 premium themes (Crimson, Golden, Emerald, Royal), 3D icon containers with glossy highlights.
  - [x] Feature checkmarks: accentColor + animate-bounce-slow + drop-shadow.
  - [x] FloatingOrnaments throughout.

- [x] **TeachersSection.tsx** - V3.0 Luxury Redesign
  - [x] 6 teacher cards with saturated themes (Vivid Teal, Electric Emerald, Vivid Sky, Royal Purple, Golden Amber, Candy Pink).
  - [x] Avatar frames: thick gradient borders, white/50 border, inset highlight.
  - [x] Speech bubble micro-interaction: animate-bounce-in, gradient border.
  - [x] Specialty pills: gradient bg, white text, border-2, shadow.
  - [x] Social links: shimmer overlay, scale+rotate on hover.
  - [x] Profile CTAs: 3D push buttons with border-b-8, shimmer, theme-matched glows.
  - [x] FloatingOrnaments per card (6 particles).

- [x] **ContactSection.tsx** - V3.0 Luxury Redesign
  - [x] Form container: rounded-[40px], border-4 amber, border-t-2, multi-layered shadow.
  - [x] Jumbo inputs: h-14→h-16 (py-5), rounded-[16px], border-2, focus glow rings (color-matched), focus-within shimmer rings.
  - [x] Labels: emoji icons (User, Baby, Calendar, Phone, Mail, Sparkles) with color accents.
  - [x] Info cards: gradient icon containers with glossy highlights, hover lift + colored shadows.
  - [x] Campus Map: rounded-[40px], border-8, enhanced shadow.
  - [x] Submit button: 3D push with border-b-4→border-b-8 on press, triple gradient, inset highlight.
  - [x] WhatsApp button: gradient with border-t-2, shimmer.

- [x] **PPDBForm.tsx** - V3.0 Luxury Redesign
  - [x] Progress steps: 3D indicators with gradient, ring-4, shadows, animate-bounce-slow on current.
  - [x] Form container: saturated gradient themes per step, glossy overlays, shimmer.
  - [x] Inputs: color-matched focus glow rings, focus-within shimmer rings.
  - [x] Selects: glossy dropdown arrows, focus shimmer.
  - [x] Nav buttons: 3D push with border-b-4→border-b-8, shimmer, spring press.
  - [x] Success/Error states: claymorphic with FloatingOrnaments, animated icons.

- [x] **CampusMap.tsx** - V3.0 Luxury Update
  - [x] Rounded-[28px] container with enhanced layered shadows.
  - [x] Control buttons: group-hover scale+rotate, shimmer overlay.
  - [x] Address card: FloatingOrnaments, animate-bounce-slow MapPin.

- [x] **PPDB Page (/(public)/ppdb/page.tsx)** - V3.0 Full Redesign
  - [x] Hero: 3D icon container with glossy highlight, high-saturation gradient title.
  - [x] Info cards: 3D gradient icon containers with glossy highlights, Star + Sparkle ornaments.
  - [x] Form integration matching new design language.
  - [x] Footer info items: FloatingOrnaments per item, glossy overlays, animate-pulse-glow dots.

- [x] **Verification**
  - [x] TypeScript strict mode (no `any`).
  - [x] `npm run build` passes — all 19 routes compile successfully.
  - [x] Zero sharp corners (minimum rounded-[16px] to rounded-[40px]).
  - [x] All buttons are 3D Push Buttons with physics-based spring press (border-b-8, active:translate-y-1.5).
  - [x] Continuous motion everywhere: float-rotate, wiggle, pulse-glow, bounce-slow, shimmer.
  - [x] High-saturation glossy gradients replacing flat pastels.
  - [x] Glassmorphism glossy highlights (white/30-40 top overlays) on all cards/containers.
  - [x] 3D bevel borders (border-t-2 white/40, border-b-4-8 colored).
  - [x] Multi-layered ambient shadows with colored glows (shadow-[0_20px_50px_rgba(color,0.3)]).
  - [x] All backend integrations intact (Next.js, Supabase, Sanity, Resend).
  - [x] Updated TODOS.md and PROGRESS.md.