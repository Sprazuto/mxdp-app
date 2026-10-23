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

- [ ] **SEO & Performance**
  - [x] Implement dynamic OpenGraph metadata in `layout.tsx`.
  - [x] Add structured JSON-LD data for Local Educational Institution.
  - [x] Run Lighthouse audit and optimize images via Cloudinary/Sanity.