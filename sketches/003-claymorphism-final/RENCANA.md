# Rencana Perubahan Menyeluruh: Claymorphism Organik + Scroll-Craft

## Ringkasan
Menerapkan estetika **claymorphism organik** (bentuk blob asimetris, bayangan berlapis, gradien warna-warni) ke seluruh aplikasi MXDP, mempertahankan struktur **scroll-craft** yang sudah ada di homepage.

---

## 1. Design System Tokens (globals.css)

### Perubahan Utama
| Aspek | Sebelum | Sesudah (Claymorphism Organik) |
|-------|---------|-------------------------------|
| **Radius** | `--sc-r-xl: 40px` (kotak bulat) | 8 varian blob asimetris via `border-radius: 60% 40% 70% 30% / 60% 40% 30% 70%` dll |
| **Bayangan** | `--sc-e1/e2/e3` standar | `clay-shadow-out` + `clay-shadow-in` (inner + outer) untuk kesan 3D kenyal |
| **Warna** | 8 aksen (orange, teal, pink, sky, lime, amber, violet, rose) | Palet clay yang lebih lembut + varian `clay-*` untuk card |
| **Bentuk Card** | `border-radius: var(--sc-r-xl)` + border gradient | `.clay-blob` dengan radius organik, background gradient, bayangan dalam/luar |

### Token Baru yang Ditambahkan
```css
/* Organic blob radius variants */
--blob-1: 60% 40% 70% 30% / 60% 40% 30% 70%;
--blob-2: 55% 45% 65% 35% / 40% 60% 55% 45%;
--blob-3: 50% 50% 50% 50% / 60% 40% 60% 40%;
--blob-4: 45% 55% 35% 65% / 70% 30% 70% 30%;
--blob-5: 65% 35% 55% 45% / 50% 50% 50% 50%;
--blob-6: 40% 60% 50% 50% / 45% 55% 45% 55%;
--blob-7: 70% 30% 60% 40% / 55% 45% 55% 45%;
--blob-8: 50% 50% 50% 50% / 65% 35% 65% 35%;

/* Clay shadows */
--clay-shadow-out: 14px 14px 28px rgba(120,95,70,0.15), -14px -14px 28px rgba(255,255,255,0.95);
--clay-shadow-in: inset 5px 5px 10px rgba(120,95,70,0.08), inset -5px -5px 10px rgba(255,255,255,0.6);
--clay-shadow-deep: 20px 20px 40px rgba(120,95,70,0.18), -10px -10px 20px rgba(255,255,255,0.9);
--clay-shadow-press: inset 8px 8px 16px rgba(120,95,70,0.12), inset -4px -4px 8px rgba(255,255,255,0.7);
```

---

## 2. Homepage (src/app/(public)/page.tsx)

### Perubahan Visual per Act
| Act | Komponen | Perubahan Claymorphism |
|-----|----------|------------------------|
| **Act 1 (Hero)** | Hero image + copy | Container `.clay-blob blob-1 clay-peach` dengan ornamen blob di dalam |
| **Act 2 (Tension)** | Tension cards | Setiap card `.clay-blob` dengan radius unik, icon di dalam blob warna |
| **Act 3 (Turn)** | Split layout + figure | Figure dalam blob organik, copy container blob |
| **Act 4 (Substance)** | Poster + trail copy | Stage sebagai blob besar, copy floating di atas |
| **Act 5 (Range)** | Program rail cards | Setiap program card = `.clay-blob` radius berbeda |
| **Act 6 (Facilities)** | Facility rail cards | Sama, blob organik per fasilitas |
| **Act 7 (Teachers)** | Teacher showcase cards | Avatar = blob warna, card = blob organik |
| **Act 8 (Safety)** | Safety cards | Blob organik dengan icon di dalam blob |

### Signature Moves (Dipertahankan + Diperbaiki)
- **Growth Compass** → Ring gradient clay, tooltip pakai clay-pill
- **Confetti** → Lucide icons (bukan emoji), warna clay palette
- **Sparkle bursts** → Partikel bulat clay warna
- **Page ornaments** → SVG blob organik (bukan bentuk geometri kaku)

---

## 3. UI Components (src/components/ui/)

### Button (button.tsx)
- Base: `.clay-pill` (fully rounded, gradient bg, inner+outer shadow)
- Variants: `primary` (clay-orange), `secondary` (clay-surface + border), `ghost` (transparent + hover clay)
- Hover: `translateY(-4px) scale(1.05)`, Active: `scale(0.95)` + pressed shadow

### Card (akan dibuat/updated)
- Base: `.clay-blob` dengan 8 varian radius
- Color variants: `clay-pink`, `clay-peach`, `clay-mint`, `clay-lavender`, `clay-sand`, `clay-blue`, `clay-rose`, `clay-palemint`
- Hover: lift + scale, Active: press

### Badge (badge.tsx)
- `.clay-pill` kecil, gradient bg sesuai warna

### Input/Textarea/Select
- Clay inset shadow saat focus, border clay-color, rounded pill

### Avatar
- Blob bulat dengan gradient clay, bukan circle kaku

---

## 4. Section Components

### ProgramsSection.tsx
- Grid program cards → `.clay-blob` masing-masing radius berbeda
- Media image di dalam blob dengan overflow hidden

### FacilitiesSection.tsx
- Sama, blob organik per card

### TeachersSection.tsx
- Teacher cards → `.clay-blob`, avatar = blob gradient
- Stagger reveal dipertahankan

### ContactSection.tsx
- Form dalam clay-blob container
- Input fields clay style

---

## 5. Navbar & Footer

### Navbar.tsx
- Background: clay-surface dengan blur
- Wordmark: gradient text clay
- CTA: clay-pill
- Mobile sheet: clay-blob container

### Footer.tsx
- Background: clay-canvas
- Links: clay-pill hover
- Social icons: clay-blob kecil

---

## 6. Scroll-Craft Engine (public/scrollcraft/)
- Engine JS **tidak diubah** (hanya config via data attributes)
- CSS engine di globals.css sudah inline, tidak perlu @import

---

## 7. Implementation Order

### Phase 1: Design Tokens (globals.css)
1. Tambahkan token blob radius, clay shadows, clay color palette
2. Update component utilities (`.clay-blob`, `.clay-pill`, `.clay-badge`)
3. Update reduced motion overrides

### Phase 2: Homepage
1. Wrap setiap act/section dengan `.clay-blob` container
2. Update tension cards, program cards, facility cards, teacher cards, safety cards
3. Update signature moves (compass, confetti, sparkles, ornaments)

### Phase 3: UI Components
1. Button, Badge, Input, Textarea, Select, Avatar
2. Buat Card component baru (clay-blob based)

### Phase 4: Section Components
1. ProgramsSection, FacilitiesSection, TeachersSection, ContactSection

### Phase 5: Navbar & Footer

### Phase 6: Verification
- `npm run build` - zero TS errors
- `npm run lint` - zero errors
- Dev server 200 OK
- Visual check: mobile (390px), desktop, reduced motion

---

## 8. File yang Akan Diubah

### Core
- `src/app/globals.css` — Design tokens + utilities
- `src/app/(public)/page.tsx` — Homepage acts

### UI Components
- `src/components/ui/button.tsx`
- `src/components/ui/badge.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/textarea.tsx`
- `src/components/ui/select.tsx`
- `src/components/ui/Avatar.tsx`
- `src/components/ui/card.tsx` (baru)

### Sections
- `src/components/sections/ProgramsSection.tsx`
- `src/components/sections/FacilitiesSection.tsx`
- `src/components/sections/TeachersSection.tsx`
- `src/components/sections/ContactSection.tsx`

### Layout
- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`

---

## 9. Catatan Penting

1. **Zero emoji** — Semua ikon pakai Lucide React
2. **Reduced motion** — Semua animasi decorative dihentikan via `@media (prefers-reduced-motion: reduce)`
3. **Mobile** — Fixed decorative layers (atmosphere, floaties, confetti, ornaments, compass) `display: none` di ≤860px
4. **Header** — `position: relative` (bukan fixed) agar flow natural dengan scroll-craft
5. **TypeScript** — No `any`, explicit types, CSS custom properties cast as `React.CSSProperties`
6. **Build verification** — `npm run build` + `npm run lint` wajib pass sebelum selesai