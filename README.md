# TextileHub — Business Tracking App

A full-stack business management app for the textile industry, built with Next.js 14, Supabase, TailwindCSS, and TypeScript.

## Features

- **Dashboard** — Live stats: total products, orders, revenue, customers
- **Products** — Add, search, filter by category, and delete products
- **Orders** — Place orders, edit via modal, delete, track revenue
- **Customers** — Register customers with name and phone number
- **Dark Mode** — Full dark/light theme toggle
- **Server Components** — Data fetched server-side, minimal client JS

## Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router, Server Actions, RSC)
- [Supabase](https://supabase.com/) (Postgres database)
- [TailwindCSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/) (accessible dialog primitives)
- [Lucide React](https://lucide.dev/) (icons)
- [next-themes](https://github.com/pacocoursey/next-themes) (dark mode)

---

## Getting Started

### 1. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Open the **SQL Editor** in your Supabase dashboard
3. Copy and run the contents of `src/lib/supabase/schema.sql`

### 2. Configure Environment Variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Find these values in: **Supabase Dashboard → Project Settings → API**

### 3. Install Dependencies & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it will redirect to `/dashboard`.

---

## Updating Product Names & Categories

Edit the enum arrays in `src/lib/types.ts`:

```typescript
export const PRODUCT_NAMES = [
  "Plain Cotton Fabric",
  "Polyester Blend",
  // Add your actual product names here
] as const

export const PRODUCT_CATEGORIES = [
  "Natural Fibers",
  "Synthetic Fibers",
  // Add your actual categories here
] as const
```

These arrays power all dropdowns across the Products and Orders pages.

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/
│   ├── products/
│   ├── orders/
│   └── customers/
├── components/
│   ├── layout/             # Sidebar, StatCard, ThemeToggle, ThemeProvider
│   ├── products/           # Product table, form, toolbar, delete button
│   ├── orders/             # Order form, edit modal, orders list, delete button
│   └── customers/          # Customer table, form, delete button
├── actions/                # Next.js Server Actions (mutations)
└── lib/
    ├── supabase/           # Supabase client + server clients + SQL schema
    ├── types.ts            # Shared TypeScript types + enum arrays
    └── utils.ts            # cn() utility
```

---

## Adding Login (Phase 3)

When ready, Supabase Auth can be added:

1. Enable Email auth in Supabase Dashboard → Authentication
2. Create `src/app/login/page.tsx` with a sign-in form
3. Add `src/middleware.ts` to protect all routes
4. Update RLS policies in `schema.sql` to be user-scoped
