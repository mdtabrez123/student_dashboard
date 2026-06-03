# LearnFlow — Student Learning Dashboard

> **Frontend Intern Assignment Submission**
> A production-ready, futuristic Student Dashboard built with Next.js 16 App Router, Supabase, Framer Motion, Tailwind CSS v4, and Lucide React.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-2-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion)

---

## Live Demo

> Deploy to Vercel following the [Deployment](#-deployment) section below.

---

## Table of Contents

1. [Architecture](#-architecture)
2. [Server Component Strategy](#-server-component-strategy)
3. [Supabase Integration](#-supabase-integration)
4. [Framer Motion Strategy](#-framer-motion-strategy)
5. [Folder Structure](#-folder-structure)
6. [Responsive Design](#-responsive-design)
7. [Challenges Solved](#-challenges-solved)
8. [Local Setup](#-local-setup)
9. [Deployment](#-deployment)

---

## 🏗 Architecture

### The Core Principle: Render What You Can, Stream What You Can't

The dashboard is built around **React Server Components (RSC) with streaming**, the modern Next.js App Router pattern for data-heavy UIs. Rather than blocking the entire page on a database query, the UI is split into two tiers:

```
Request arrives
│
├─ Tier 1: Renders INSTANTLY (no data needed)
│   └─ Sidebar, HeroTile, page chrome
│
└─ Tier 2: Streams in (awaits Supabase)
    └─ <Suspense> → CoursesSection → getCourses() → Supabase
        ├─ While loading: pulsing skeleton cards
        ├─ On success: CourseGrid + ActivityTile with animations
        └─ On error: propagates to app/error.tsx boundary
```

This means users never see a blank screen — the hero tile and sidebar are visible immediately, and courses stream in as soon as the database responds.

### Component Rendering Model

| Layer | Type | Rationale |
|---|---|---|
| `app/layout.tsx` | Server | Static chrome, no client state |
| `app/page.tsx` | Server (sync) | Orchestrates layout without blocking |
| `CoursesSection` | **Async Server** | Owns the `await getCourses()` — data lives here |
| `HeroTile` | Client | Framer Motion entrance animations |
| `CourseTile` | Client | Framer Motion hover + spring interactions |
| `ActivityTile` | Client | `useMemo` seeded data, Framer Motion reveal |
| `ProgressBar` | Client | `useInView` scroll-triggered spring animation |
| `Sidebar` | Client | `matchMedia` hook, `usePathname`, `layoutId` |
| `MobileNav` | Client | Active route, `layoutId` animation |
| `lib/supabase/server.ts` | **Server-only** | `cookies()` — never ships to browser |
| `lib/supabase/client.ts` | Client-only | `createBrowserClient` for future auth |

---

## ⚛️ Server Component Strategy

### Why This Split?

The key insight is keeping **data-fetching as close to the server as possible** while letting Framer Motion (which requires the browser) live in Client Components.

```
app/page.tsx (Server — no async)
│
├── <HeroTile />                    ← "use client" for animations
│
└── <Suspense fallback={<Skeleton/>}>
    └── <CoursesSection />          ← async Server Component
        │   const courses = await getCourses()   ← Supabase query
        │
        ├── <CourseGrid courses={courses} />     ← passes data down
        │   └── <CourseTile />                   ← "use client"
        │
        └── <ActivityTile />                     ← "use client"
```

**`CoursesSection` is the only component that `await`s**. It's an async RSC that owns all database I/O. Once resolved, it passes typed `Course[]` props to Client Components — which never touch Supabase directly.

### Error Boundary

Errors thrown inside `CoursesSection` (e.g., Supabase connection failure) propagate automatically to `app/error.tsx`, which is a `"use client"` boundary required by Next.js. It detects network vs. database errors and provides contextual UI with retry options.

---

## 🗄 Supabase Integration

### Database Schema

```sql
CREATE TABLE courses (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title      TEXT        NOT NULL,
  progress   INTEGER     NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  icon_name  TEXT        NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Seed Data

```sql
INSERT INTO courses (title, progress, icon_name) VALUES
  ('Advanced TypeScript',  78, 'Code2'),
  ('System Design',        45, 'Layers'),
  ('Machine Learning',     62, 'Brain'),
  ('Web Performance',      91, 'Zap');
```

### Client Architecture

Two separate Supabase clients are created for different contexts:

```
lib/supabase/
├── server.ts   → createServerClient (@supabase/ssr)
│                 Uses Next.js cookies() for session handling
│                 Called ONLY in Server Components / Route Handlers
│
├── client.ts   → createBrowserClient (@supabase/ssr)
│                 Safe for "use client" components
│                 Handles auth state automatically
│
└── queries.ts  → getCourses(): Promise<Course[]>
                  Explicit column selection (no SELECT *)
                  Throws on error → caught by error.tsx boundary
```

### Why `@supabase/ssr` over `@supabase/supabase-js`?

`@supabase/ssr` is the official package for Next.js App Router. It properly handles:
- Cookie-based session tokens in Server Components
- Auth state synchronization between server and client
- The `cookies()` API from `next/headers`

### Environment Variables

Only two variables are required. The `NEXT_PUBLIC_` prefix is intentional — Supabase's anon key is designed to be public-safe, with access controlled by Row Level Security (RLS) on the Supabase side.

```env
NEXT_PUBLIC_SUPABASE_URL=       # Your project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=  # Your public anon key (safe to expose)
```

---

## 🎬 Framer Motion Strategy

### Core Principle: GPU-Only Animations

**Zero CSS `transition-*` properties are used for interactive states.** Every animation uses only `transform` (scale, translateY, translateX, scaleX) and `opacity` — the two CSS properties browsers can animate on the GPU compositor thread without triggering layout recalculation or paint.

### Animation Inventory

| Animation | Component | Implementation | Why |
|---|---|---|---|
| Staggered entrance | `AnimatedSection` | `staggerChildren: 0.08` on container, `y: 24→0` + `opacity: 0→1` on items | Tiles appear sequentially, not all at once |
| Tile entrance | `AnimatedItem` | Spring `stiffness:300, damping:20` | Spec requirement — natural deceleration |
| Card hover scale | `GlassCard` | `whileHover={{ scale: 1.02 }}` Spring 300/20 | Premium feel, no jank |
| Card border glow | `GlassCard` | FM variants animate `boxShadow` + `borderColor` | Pure FM, no CSS transition |
| Progress bar fill | `ProgressBar` | `scaleX: 0→value/100` Spring 300/20 | `scaleX` is GPU-only; `width` would cause layout |
| Progress shimmer | `ProgressBar` | `x: -100%→200%` translateX | GPU transform, no layout |
| Streak bar build | `HeroTile` | Per-bar `scaleY: 0→1`, staggered with spring | Visual rhythm |
| Active nav pill | `Sidebar` | `layoutId="activeIndicator"` | Shared layout animation — slides between nav items |
| Active mobile pip | `MobileNav` | `layoutId="mobileActiveIndicator"` | Same pattern as desktop sidebar |
| Activity cell reveal | `ActivityTile` | 364 cells, `opacity+scale`, 0.0008s delay each | Wave effect |
| Activity cell hover | `ActivityTile` | `whileHover={{ scale: 1.25 }}` Spring 300/20 | FM only, no CSS hover |
| Title color shift | `CourseTile` | FM `color` variant on `<motion.span>` | No CSS group-hover |
| Gradient mesh animation | `HeroTile` | Looping `background` keyframes via FM | Ambient life |
| Error entrance | `error.tsx` | `opacity+y` enter, FM spring on buttons | Consistent feel |

### The `layoutId` Pattern

The sidebar's active indicator uses Framer Motion's shared layout animation:

```tsx
// When a nav item becomes active, this div is created with layoutId
// When you navigate to another item, Framer Motion automatically
// MOVES this same element to the new position — not a fade swap.
{isActive && (
  <motion.div
    layoutId="activeIndicator"
    className="absolute inset-0 rounded-xl ..."
    transition={{ type: "spring", stiffness: 400, damping: 30 }}
  />
)}
```

This creates the "pill slides to the new item" effect seen in premium nav menus, without any manual position calculation.

---

## 📁 Folder Structure

```
student_dashboard/
│
├── app/                            # Next.js App Router
│   ├── layout.tsx                  # Root layout: Inter font, Sidebar, MobileNav
│   ├── page.tsx                    # Dashboard (sync Server Component + Suspense)
│   ├── loading.tsx                 # Route-level skeleton loader
│   ├── error.tsx                   # Error boundary ("use client")
│   └── globals.css                 # Design tokens, Tailwind v4 @theme, body bg
│
├── components/
│   ├── layout/                     # Structural chrome
│   │   ├── Sidebar.tsx             # Collapsible sidebar, matchMedia, layoutId
│   │   └── MobileNav.tsx           # Bottom nav (mobile only), layoutId
│   │
│   ├── dashboard/                  # Page-specific tiles
│   │   ├── HeroTile.tsx            # Welcome, streak bar, stat chips, mesh bg
│   │   ├── CoursesSection.tsx      # Async RSC — owns Supabase fetch
│   │   ├── CourseGrid.tsx          # Maps Course[] → CourseTile[]
│   │   ├── CourseTile.tsx          # Individual course card + FM interactions
│   │   ├── ActivityTile.tsx        # 52×7 GitHub-style contribution heatmap
│   │   └── BentoGrid.tsx           # Responsive 1/2/4-col CSS Grid wrapper
│   │
│   └── ui/                         # Reusable primitives
│       ├── GlassCard.tsx           # FM variants: scale + border glow on hover
│       ├── ProgressBar.tsx         # scaleX spring animation (GPU-only)
│       ├── SkeletonCard.tsx        # Pulsing skeleton (hero/course/activity)
│       └── AnimatedSection.tsx     # Stagger container + spring item variants
│
├── lib/
│   ├── supabase/
│   │   ├── server.ts               # @supabase/ssr server client (SSR + cookies)
│   │   ├── client.ts               # @supabase/ssr browser client
│   │   └── queries.ts              # getCourses(): Promise<Course[]>
│   ├── types.ts                    # Course, NavItem, ActivityDay, StreakData
│   └── utils.ts                    # cn() — clsx + tailwind-merge
│
├── public/                         # Static assets
├── .env.example                    # Required env var template ← commit this
├── .env.local                      # Actual credentials ← gitignored
├── vercel.json                     # Vercel deployment config
├── next.config.ts                  # Next.js config (reactStrictMode, images)
├── tsconfig.json                   # TypeScript (strict mode, @/* alias)
├── postcss.config.mjs              # @tailwindcss/postcss
└── README.md                       # This file
```

---

## 📱 Responsive Design

### Three-Tier Breakpoint System

| Breakpoint | Screen | Grid | Navigation |
|---|---|---|---|
| `< 768px` (mobile) | Phones | **1-column** stacked | Bottom navigation bar (`MobileNav`) |
| `768px – 1023px` (tablet) | iPads | **2-column** Bento | **Icon-only sidebar** (auto-collapsed) |
| `≥ 1024px` (desktop) | Laptops+ | **4-column** Bento | **Full sidebar** with labels |

### Sidebar Responsive Logic

The sidebar uses a `matchMedia` hook rather than CSS-only breakpoints because Framer Motion needs to know the current width value to animate smoothly:

```tsx
function useIsTablet() {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px) and (max-width: 1023px)");
    setIsTablet(mql.matches);
    // Live updates when viewport resizes
    mql.addEventListener("change", (e) => setIsTablet(e.matches));
  }, []);

  return isTablet;
}
```

- **Mobile** (`< 768px`): Sidebar is `display: none`. `MobileNav` appears at the bottom.
- **Tablet** (`768–1023px`): Sidebar auto-collapses to 72px (icon-only).
- **Desktop** (`≥ 1024px`): Sidebar expands to 240px (full labels).
- Users can manually override within any breakpoint.

### Key Span Classes

```
HeroTile:      col-span-full           → full width on all screen sizes
ActivityTile:  md:col-span-2 lg:col-span-2  → 2 of 4 cols on desktop
CourseTile:    (implicit 1 col each)
```

---

## 🧩 Challenges Solved

### 1. GPU-Only Animations for Zero Layout Shifts

**Problem**: Progress bars naturally animate `width`, which forces the browser to recalculate layout on every frame (expensive paint + composite cycle).

**Solution**: Animate `scaleX` with `transformOrigin: "left"` instead. `scaleX` is a transform — it runs entirely on the GPU compositor thread, never triggering layout:

```tsx
// ❌ Causes layout recalc every frame
animate={{ width: `${value}%` }}

// ✅ GPU-only — transform, zero layout cost
animate={{ scaleX: value / 100 }}
style={{ transformOrigin: "left" }}
```

---

### 2. Spring Physics for Tile Entrances (not easing curves)

**Problem**: The spec requires spring physics (`stiffness: 300, damping: 20`) for all animations. Standard `ease` curves don't have physical properties.

**Solution**: `itemVariants` in `AnimatedSection.tsx` use `type: "spring"` explicitly:

```tsx
export const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};
```

---

### 3. RSC Streaming Without Blocking the Whole Page

**Problem**: `await getCourses()` (a network request) would block the entire page render if placed in the page component.

**Solution**: The page itself is synchronous. `CoursesSection` is an async RSC wrapped in `<Suspense>`. Next.js streams the Hero immediately and sends the courses once the DB responds — all with no additional client-side JavaScript.

---

### 4. Sidebar Collapse at Tablet Without Hydration Mismatch

**Problem**: `window.matchMedia` doesn't exist on the server. Using it to initialize state would cause a server/client mismatch (hydration error).

**Solution**: Always initialize `collapsed = false` on the server, then update in `useEffect` after hydration. The state change happens before the user can interact, so the visual flash is imperceptible.

---

### 5. Framer Motion `layoutId` Across Navigation

**Problem**: `layoutId="activeIndicator"` requires the element to exist in the React tree simultaneously at old and new positions to animate between them — but with navigation, the component re-renders.

**Solution**: The motion element is rendered conditionally `{isActive && <motion.div layoutId=.../>}`. Framer Motion tracks elements by `layoutId` across conditional renders automatically — the library handles the "remove from A, add to B, animate between positions" logic internally.

---

### 6. Eliminating All CSS `transition-*` for Interactions

**Problem**: Hover effects using Tailwind's `hover:` classes or `transition-colors` bypass Framer Motion, inconsistently mixing animation systems and potentially causing non-GPU-composited transitions.

**Solution**: All interactive states use Framer Motion `variants` with `whileHover`:
- Border glow → `boxShadow` + `borderColor` in FM variants
- Title color change → `motion.span` with `color` variant
- Activity cell scale → `whileHover={{ scale: 1.25 }}`
- Mobile nav color → FM `animate` on icon and label `motion.div`

---

## 🚀 Local Setup

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) account (free tier works)

### 1. Clone

```bash
git clone https://github.com/YOUR_USERNAME/student-dashboard.git
cd student-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

**Create the table** (run in your Supabase SQL Editor):

```sql
CREATE TABLE courses (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title      TEXT        NOT NULL,
  progress   INTEGER     NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  icon_name  TEXT        NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed 4 sample courses
INSERT INTO courses (title, progress, icon_name) VALUES
  ('Advanced TypeScript',  78, 'Code2'),
  ('System Design',        45, 'Layers'),
  ('Machine Learning',     62, 'Brain'),
  ('Web Performance',      91, 'Zap');
```

**Get your credentials**: Supabase Dashboard → Project Settings → API

### 4. Configure Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 5. Run

```bash
npm run dev        # http://localhost:3000
npm run build      # Production build
npm run start      # Serve production build
```

---

## ☁️ Deployment

### Vercel (Recommended)

1. Push your code to a **public GitHub repository**
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your repo
3. Add environment variables in **Project Settings → Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Click **Deploy**

Vercel auto-detects Next.js. The `vercel.json` in this repo explicitly sets the build configuration.

### Important: Do NOT commit `.env.local`

`.env.local` is listed in `.gitignore` and must never be committed. Only `.env.example` (which contains placeholder values, no secrets) is committed.

---

## 🎨 Design System

### Color Palette

| Token | Value | Usage |
|---|---|---|
| `--bg-base` | `#0B0B0F` | Page background |
| `--bg-surface` | `#0D0D12` | Sidebar, card surfaces |
| Glass bg | `rgba(255,255,255,0.04)` | Card fill |
| Glass border | `rgba(255,255,255,0.08)` | Card stroke |
| `--glow-purple` | `#7C3AED` | Primary accent |
| `--glow-cyan` | `#06B6D4` | Secondary accent |
| `--glow-indigo` | `#4F46E5` | Tertiary accent |

### Typography

- **Font**: Inter (Google Fonts, variable font, `display: swap`)
- **Antialiasing**: `-webkit-font-smoothing: antialiased`
- **Size scale**: Tailwind defaults (xs through 4xl)

### Glassmorphism Recipe

```css
background: rgba(255, 255, 255, 0.04);
backdrop-filter: blur(24px);
border: 1px solid rgba(255, 255, 255, 0.08);
border-radius: 16px;
```

---

## 🛠 Tech Stack

| Technology | Version | Role |
|---|---|---|
| [Next.js](https://nextjs.org) | 16.2.7 | Framework (App Router, RSC, Streaming) |
| [React](https://react.dev) | 19.2.4 | UI runtime |
| [TypeScript](https://typescriptlang.org) | 5 | Type safety (strict mode) |
| [Tailwind CSS](https://tailwindcss.com) | v4 | Utility styling, `@theme` tokens |
| [Framer Motion](https://framer.com/motion) | 12 | All animations |
| [Supabase](https://supabase.com) | 2 | PostgreSQL + REST API |
| [@supabase/ssr](https://supabase.com/docs/guides/auth/server-side/nextjs) | 0.10 | Next.js App Router integration |
| [Lucide React](https://lucide.dev) | 1.17 | Icon system |
| [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) | latest | Safe class composition |

---

## 📄 License

MIT © 2024
