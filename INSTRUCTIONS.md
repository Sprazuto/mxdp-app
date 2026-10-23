# 🤖 AI Agent System Instructions & Guidelines

## 1. IDENTITY & BEHAVIOR
- You are a Senior Principal Engineer and System Architect specializing in Next.js 14+, Decoupled Jamstack, and High-Performance Frontend Architectures.
- Always write **TypeScript-first**, clean, modular, and fully typed code. Never use `any`.
- Strictly adhere to the Vercel $0 Free Tier boundaries for all libraries and external service usage.

## 2. CODEWRITING RULES
- **App Router First:** Use Next.js 14 App Router standards (`app/` directory).
- **Server Components by Default:** Fetch data inside Server Components (RSC).Langkah ini sangat tepat dan matang! Dalam *AI-assisted software development* skala enterprise (khususnya jika menggunakan tool seperti **Cursor**, **Claude Code**, atau **Windsurf**), melengkapi repositori dengan file-file spesifik seperti `.clauderc`, `agent.md`, `TODOS.md`, hingga `WORKFLOW.md` akan membuat AI Agent bekerja secara jauh lebih presisi, tidak mudah lupa konteks, dan tidak "liar" menulis kode yang merusak struktur.

Berikut adalah susunan **Arsitektur File `.md` Lengkap (Dokumentasi & Instruksi Agent)** yang ideal untuk disimpan di dalam repositori proyek Anda:

---

## 📁 Struktur Dokumen Perencanaan & Agent (.md)

```text
mxdp-app/
├── .clauderc.md                 # Konstruksi rules & pembatasan khusus untuk Agent AI
├── AGENTS.md                    # Panduan konteks & peran Agent saat berinteraksi
├── TODOS.md                     # Tracking progress & daftar tugas yang belum/sudah selesai
├── WORKFLOW.md                  # Standard Operating Procedure (SOP) cara AI menulis & testing kode
├── docs/
│   ├── PRD.md                   # Product Requirement Document (Kebutuhan Bisnis & Produk)
│   ├── SRS.md                   # Software Requirements Specification (Spesifikasi Fungsional/Teknis)
│   ├── ARCHITECTURE.md          # Cetak Biru Arsitektur & Diagram Sistem
│   ├── TECH-STACK.md            # Batasan Library, SDK, & Aturan $0 Free Tier
│   ├── PROGRESS.md              # Catatan histori pencapaian & log perubahan fitur
│   ├── SANITY-FREE-SPEC.md       
│   ├── SUPABASE-FREE-SPEC.md       
│   ├── RESEND-FREE-SPEC.md       
│   ├── CLOUDINARY-FREE-SPEC.md       
│   ├── LEAFLET-OSM-SPEC.md       
│   ├── VERCEL-HOBBY-SPEC.md       
│   ├── 01-PROJECT-OVERVIEW-AND-ROADMAP.md       
│   ├── 02-DESIGN-SYSTEM-AND-UIUX.md     
│   ├── 03-SYSTEM-ARCHITECTURE-AND-TECH-STACK.md    
│   └── 04-CMS-AND-DATABASE-SCHEMA.md   