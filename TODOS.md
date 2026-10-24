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