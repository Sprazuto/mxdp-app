# 03. System Architecture & Tech Stack

## 1. Architectural Pattern: Decoupled / Composable Jamstack
The system completely separates the presentation layer from content management and backend data processing.
+-------------------------------------------------------------------+
|                        CLIENT / VISITOR                           |
+-------------------------------------------------------------------+
|
v
+-------------------------------------------------------------------+
|                  FRONTEND LAYER (Vercel Edge)                     |
|  - Next.js 14+ (App Router, Server Components, TypeScript)        |
|  - Tailwind CSS + Shadcn UI + Lucide Icons                        |
+-------------------------------------------------------------------+
|                          |                        |
(GROQ Queries)             (Form Submit)           (Media Fetch)
v                          v                        v
+---------------+        +------------------+     +-----------------+
| Sanity.io CMS |        | Supabase DB      |     | Cloudinary CDN  |
| (Public Text/ |        | (Inquiries Data) |     | (Optimized      |
|  Structure)   |        +--------+---------+     |  Images)        |
+---------------+                 |               +-----------------+
(Trigger Notification)
v
+------------------+
| Resend Email API |
| (Auto-Notif)     |
+------------------+

## 2. Technology Stack & Free-Tier Limits

| Layer | Service / Tech | Role | Free Tier Capacity |
| :--- | :--- | :--- | :--- |
| **Hosting & Edge** | **Vercel** | Next.js Hosting & Serverless Functions | 100GB Bandwidth / Unlimited Deployments |
| **Framework** | **Next.js 14+** | App Router, Server Actions, Dynamic Metadata | Open Source |
| **Styling & UI** | **Tailwind CSS + Shadcn UI** | UI Primitives & Design System | Open Source |
| **Content CMS** | **Sanity.io** | Headless Content Studio (Programs, Teachers) | 3 Admin Users, 100K API requests/mo |
| **Database & API** | **Supabase** | PostgreSQL DB for Lead Forms & Inquiries | 500MB DB, 50,000 Monthly Active Users |
| **Email Service** | **Resend** | Transactional email notifications on form submit | 3,000 emails/month (100/day) |
| **Media CDN** | **Cloudinary** | Image/Video hosting & auto WebP formatting | 25GB Credits / Month |
| **Map Engine** | **Leaflet / OpenStreetMap** | Interactive school campus map | 100% Free / No API Key required |

## 3. Performance & SEO Rules
- **Target Metrics:** 100/100 Lighthouse score on Mobile and Desktop.
- **Image Optimization:** All images served via `next/image` with Cloudinary/Sanity image pipeline (WebP/AVIF auto-format).
- **SEO Strategy:** Full OpenGraph tags, JSON-LD Structured Data for Local Business/School, and automated `sitemap.ts`.