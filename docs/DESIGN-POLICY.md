---

```markdown
# 🏛️ SYSTEM DIRECTIVE: ENTERPRISE PLAYFUL-LUXURY DESIGN BLUEPRINT
> **Role:** Senior UI/UX Engineer & Creative Front-End Architect  
> **Core Objective:** Design and build a world-class digital platform tailored for young children (playgroup/preschool) and high-value parents.  
> **Design Philosophy:** *"High-End Apple-like Precision meets Toca Boca / Duolingo Playfulness"* — VIBRANT, EXUBERANT, HYPER-DETAILED, & CHILD-FRIENDLY, executed with pristine SaaS enterprise quality.

---

## 🛑 SECTION 0: STRICT BANNED PATTERNS (DO NOT VIOLATE)

1. **NO SHARP EDGES:** NEVER use `rounded-none`, `rounded-sm`, `rounded-md`, or `rounded-lg`. Minimum allowed border radius is `rounded-2xl` (for micro elements) up to `rounded-[40px]` or `rounded-full`.
2. **NO CORPORATE GRAY/WHITE WALLS:** NEVER leave sections or containers with plain white (`bg-white`) or corporate gray (`bg-slate-50`, `bg-gray-100`) backgrounds. Every inch must have depth, subtle gradient warmth, or floating textures.
3. **NO FLAT 2D BUTTONS:** EVERY button must feel like a physical 3D toy/block with depth (`border-b-4`, shadow glows, and active press-down states).
4. **NO THIN 1PX BORDER LINES:** NEVER use neutral 1px borders (`border-gray-200`). Use thick pastel borders (2px to 4px) or glassmorphic borders with alpha opacity.
5. **NO EMPTY SPACES:** Empty space must be decorated with subtle floating micro-ornaments (sparkles, clouds, bubbles, doodle strokes, and floating badges).

---

## 🎨 SECTION 1: VISUAL DESIGN SYSTEM & TOKENS

### A. Color Palette Matrix (Tailwind CSS)
Combine high-contrast, energetic pastel tones with rich dark text for crisp readability:

- **Canvas Background (Warm Multi-Gradient):**  
  `bg-gradient-to-b from-[#FFFDF9] via-[#FFF8F0] to-[#F0F9FF]`
- **Creamy Vanilla Base Container:**  
  `bg-[#FFFBEB]`
- **Theme 1: Minty Teal (Toddler / STEAM / Success):**  
  `bg-[#E6FFFA] text-[#047857] border-[#A7F3D0]`
- **Theme 2: Bubblegum Pink (Playgroup / Art & Play):**  
  `bg-[#FDF2F8] text-[#BE185D] border-[#FBCFE8]`
- **Theme 3: Butter Yellow (Badges / Stars / Highlights):**  
  `bg-[#FEFCE8] text-[#A16207] border-[#FEF08A]`
- **Theme 4: Peach Coral (TK A / Primary Actions):**  
  `bg-[#FFF7ED] text-[#C2410C] border-[#FFEDD5]`
- **Theme 5: Lavender Purple (TK B / Security / Tech):**  
  `bg-[#F5F3FF] text-[#6D28D9] border-[#DDD6FE]`
- **Text Primary:**  
  `text-slate-900` or `text-gray-900` (Always bold and high-contrast).

### B. Claymorphism & 3D Layered Depth
Use custom layered shadows and borders to simulate tactile 3D physical objects:

- **3D Push-Button Class Structure:**
  ```tsx
  className="bg-amber-400 text-amber-950 font-black px-8 py-4 rounded-full border-b-4 border-amber-600 active:translate-y-1 active:border-b-0 shadow-lg shadow-amber-200/50 hover:bg-amber-300 transition-all duration-150"

```

* **Claymorphic Glass Card Structure:**
```tsx
className="bg-white/90 backdrop-blur-md border-4 border-white rounded-[36px] shadow-[0_16px_32px_-8px_rgba(255,182,193,0.3)] hover:shadow-[0_24px_48px_-12px_rgba(255,182,193,0.45)] hover:-translate-y-2 transition-all duration-300"

```



### C. Expressive & Bold Typography

* **Headings (H1, H2, H3):** Use `font-black` or `font-extrabold` with `tracking-tight`.
* **Text Gradients:** Use rich multi-color gradient clips for primary keywords:
```tsx
<span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
  Text Highlight Here
</span>

```



---

## 🧸 SECTION 2: MANDATORY MICRO-DETAILS & ORNAMENTS

Every page section MUST incorporate the following micro-visuals:

1. **Floating Background Ornaments (`FloatingOrnaments.tsx`):**
* **Sparkles / Stars:** 4-point SVG stars in yellow/pink with pulsing animations (`animate-pulse`).
* **Soft Clouds:** Floating SVG cloud curves with slow horizontal drift (`animate-float`).
* **Bubble Dots:** Translucent colored circles (`w-3 h-3 bg-pink-300/40 rounded-full blur-[1px]`) positioned absolutely.
* **Doodle Path Strokes:** Curved SVG dashed lines connecting section blocks.


2. **3D Micro-Badges & Pills:**
Labels must be styled as 3D capsule pills with tilt angles:
```tsx
<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border-2 border-amber-300 text-amber-900 font-extrabold text-xs shadow-sm rotate-[-1deg]">
  <span className="animate-bounce">✨</span> Program Unggulan
</div>

```



---

## 📐 SECTION 3: SECTION-BY-SECTION IMPLEMENTATION BLUEPRINT

### 1. Hero Section (`HeroSection.tsx`)

* **Background:** Multi-tone diagonal gradient with subtle polka-dot grid texture (`bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]`).
* **Typography:** Giant H1 heading (`text-5xl lg:text-7xl font-black`) accompanied by an expressive top ribbon/badge ("Sekolah Terbaik untuk Si Kecil 🎈").
* **Hero Floating Cards:**
* *Rating Card:* Displays 3D star icons, parent avatars, and "4.9/5 Rating".
* *Safety Card:* Glowing green shield icon with "CCTV 24/7 & Standar SNI" text.


* **CTAs:** Primary 3D Push Button in bright coral/orange + Secondary glassmorphic button with thick pastel border.

### 2. Programs Section (`ProgramsSection.tsx`)

* **Grid Layout:** 4 Program cards with slight alternating tilt angles (`rotate-1`, `-rotate-1`, `rotate-2`, `-rotate-2`) to eliminate rigid alignment.
* **Individual Card Styling:**
* *Toddler:* Mint Teal (`bg-[#E6FFFA]`), Emerald border, 3D block icon.
* *Playgroup:* Bubblegum Pink (`bg-[#FDF2F8]`), Magenta border, 3D rocket/brush icon.
* *TK A:* Butter Yellow (`bg-[#FEFCE8]`), Amber border, 3D star icon.
* *TK B:* Lavender (`bg-[#F5F3FF]`), Purple border, 3D graduation/telescope icon.


* **Card Content:** Age group capsule pill, 3D colored checkmark bullet points, and slide-arrow hover interaction on detail buttons.

### 3. Facilities & Safety Section (`FacilitiesSection.tsx`)

* **Layer 1 (Facilities Grid):** Polaroid-style white framed cards with playful tilted angles.
* **Layer 2 (CCTV & Security Block):** Dedicated dark playful mode container (`bg-slate-900 text-white rounded-[40px] p-8 relative overflow-hidden`).
* Features a pulsing red dot badge ("LIVE MONITORING 🔴") and 3D golden shield badges for safety features.



### 4. Teachers Section (`TeachersSection.tsx`)

* **Avatar Frames:** Teacher photos enclosed in thick patterned pastel border circles.
* **Micro-Interaction:** Hovering over a teacher card triggers a slight scale animation (`scale-105`) and reveals a friendly speech bubble ("Halo! Mari Belajar Bersama 👋").
* **Specialty Tags:** Pastel pill tags (`#KonselingAnak`, `#Seni&Musik`, `#STEAMExpert`) below each teacher profile.

### 5. Contact & PPDB Form (`ContactSection.tsx` & `PPDBForm.tsx`)

* **Form Container:** White Clay Container (`bg-white border-4 border-amber-200 rounded-[40px] p-8 md:p-12 shadow-2xl`).
* **Input Fields:** Jumbo height (`h-14`), rounded corners (`rounded-2xl`), thick border (`border-2 border-amber-100`), and soft pastel bg (`bg-amber-50/30`).
* Focus state: Purple/pink glow ring (`focus:ring-4 focus:ring-purple-200 focus:border-purple-500`).
* Labels: Prepend with mini emojis ("👤 Nama Orang Tua", "👶 Nama & Usia Si Kecil", "📱 Nomor WhatsApp").


* **Campus Map Container:** Leaflet Map wrapped inside a giant rounded frame (`rounded-[36px] overflow-hidden border-8 border-white shadow-xl`) with a floating "Buka di Google Maps 🗺️" CTA overlay.

---

## ⚙️ SECTION 4: AGENT EXECUTION & QUALITY CHECKLIST

Before marking any UI task as completed, the AI Agent MUST verify:

* [ ] **Zero Sharp Corners:** Are all borders rounded with at least `rounded-2xl` up to `rounded-[40px]`?
* [ ] **Rich Floating Ornaments:** Does every section include background floating elements (stars, clouds, bubbles)?
* [ ] **3D Push Buttons:** Are all interactive buttons styled with depth (`border-b-4`), color glows, and press active states?
* [ ] **Playful Typography:** Are main titles using `font-black` with multi-color/gradient highlights?
* [ ] **Build Validation:** Does `npm run build` pass strictly without any TypeScript compilation errors or breaking existing API/database integrations?

```

```