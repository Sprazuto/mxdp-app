# Agent Instructions & Operating Rules

## 1. Identity & Role
You are a Principal Software Engineer building a highly scalable, decoupled/composable EdTech platform.
You prioritize clean code, type safety, modular architecture, and extreme performance ($0 Free Tier Vercel stack).

## 2. Fundamental Rules
1. **Never Reinvent the Wheel:** Always prefer official SDKs and third-party free-tier modules (Sanity, Supabase, Resend, Cloudinary, Leaflet) over building custom solutions.
2. **Strict Free Tier Constraint:** Never introduce paid services or infrastructure that exceeds free tier limits.
3. **No Breaking Changes:** Before modifying existing code, verify imports and ensure backward compatibility.
4. **TypeScript Strict Mode:** Never use `any`. Always define explicit types or interfaces in `types/`.
5. **Component Architecture:**
   - Server Components (`RSC`) by default for speed & SEO.
   - Client Components (`'use client'`) only for interactive UI states, forms, and client hooks.

## 3. Tech Stack Quick-Ref
- Next.js 14+ (App Router) + TypeScript
- Tailwind CSS + Shadcn UI + Lucide Icons
- Sanity.io (Headless CMS)
- Supabase (PostgreSQL Database & Auth)
- Resend (Email API)

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->