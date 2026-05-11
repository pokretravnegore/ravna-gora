# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Warning: Non-standard Next.js version

This project uses **Next.js 16.2.6** with **React 19** and **Tailwind CSS v4** — all versions with breaking changes that differ significantly from training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # Run ESLint (v9, flat config in eslint.config.mjs)
```

No test suite is configured.

## Architecture

**Next.js App Router** project. All routes live under `app/` as `page.tsx` files. Shared UI is in `app/components/`.

### Pages

- `/` — Home (`app/page.tsx`): full landing page with hero, latest newspaper card, about section, historical articles grid, chapters list, membership CTA
- `/about` — About page (`app/about/page.tsx`)
- `/events` — Events listing (`app/events/page.tsx`): grid of event cards with dummy data, intended for CMS replacement
- `/newspaper-catalog` — Archive browser (`app/newspaper-catalog/page.tsx`): decade filter bar + issues grid with dummy data, intended for CMS replacement

Every page wraps content in `<Navbar /> … <Footer />` from `app/components/`.

### Design system

All design tokens are **CSS custom properties** defined in `app/globals.css`, not in a `tailwind.config.*` file. Tailwind v4 picks them up via `@theme` / `@theme inline` blocks.

**Typography** — use the `@utility` composite classes, not raw Tailwind text utilities:

| Class | Font | Role |
|---|---|---|
| `type-display` | Cormorant Garamond 600 | Page titles |
| `type-h1` – `type-h4` | Cormorant Garamond | Headings |
| `type-large` | Inter 400 | Prominent labels/dates |
| `type-body` | Inter 400 | Body copy |
| `type-ui-medium` | Inter 500 | UI elements |
| `type-caption`, `type-label`, `type-micro` | Inter | Small text |

Token sizes are responsive — defined at three breakpoints (phone default, `768px`, `1280px`) inside `@media` blocks in `globals.css`.

**Spacing** — use `var(--space-N)` CSS variables (e.g. `gap-[var(--space-4)]`), not raw pixel values. These are also responsive via `@media` breakpoints.

**Colors** — defined in the `@theme` block:
- `offwhite-1` (`#faf4eb`) — default page background
- `blue-2` (`#153c8c`) — CTAs, navbar/footer accent, links
- `blue-1` (`#000a1e`) — dark navy
- `gray-1/2/3` — text hierarchy

**Breakpoints**: phone (default) → tablet `md` (768px) → desktop `xl` (1280px). The codebase uses `md:` and `xl:` variants; `lg:` is not used.

### Assets

All images and icons are **Figma MCP asset URLs** stored in `app/components/assets.ts` and imported by pages. These URLs expire 7 days after generation. Per-page assets are declared as a local `const A = { … }` at the top of the page file with a comment noting the expiry.

The Logo component (`app/components/Logo.tsx`) is assembled from ~8 layered image slices using absolute positioning with percentage insets. It has two variants: `LogoBlack` and `LogoWhite`.
