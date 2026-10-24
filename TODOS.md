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