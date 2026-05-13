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

**Next.js App Router** project. All routes live under `app/` as `page.tsx` files. Shared UI is in `app/components/` (split into `layout/`, `ui/`, and `content/`).

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

### Pages

- `/` — Home (`app/page.tsx`): full landing page with hero, latest newspaper card, about section, historical articles grid, chapters list, membership CTA
- `/about` — About page (`app/about/page.tsx`)
- `/events` — Events listing (`app/events/page.tsx`): grid of event cards fetched from Sanity
- `/events/[slug]` — Event detail (`app/events/[slug]/page.tsx`): uses `ContentPageLayout` + `ContentBlocks`
- `/history/[slug]` — History article detail (`app/history/[slug]/page.tsx`): same layout pattern as events
- `/newspaper-catalog` — Archive browser (`app/newspaper-catalog/page.tsx`): decade filter + issues grid
- `/newspaper/[slug]` — PDF viewer (`app/newspaper/[slug]/page.tsx`): full-screen standalone page, **no Navbar/Footer**, client component using `pdfjs-dist`. Fetches PDF via `/api/newspaper/[slug]`
- `/studio/[[...tool]]` — Embedded Sanity Studio
- `/api/newspaper/[slug]` — API route that redirects to the Sanity-hosted PDF URL; falls back to a local file at `/Users/adtimokhin/Desktop/newspaper.pdf` during development (FIXME: remove once CMS is populated)

Every page except the newspaper viewer wraps content in `<Navbar /> … <Footer />`.

### Content pages

Detail pages (`/events/[slug]`, `/history/[slug]`) share a layout: `ContentPageLayout` (hero + narrow content column, first 6 of 12 cols on desktop) and `ContentBlocks` for the body. `ContentBlocks` dispatches on `_type` to one of five block renderers:

| `_type` | Component |
|---|---|
| `sectionTitle` | `SectionHeading` |
| `paragraph` | `ParagraphView` |
| `quote` | `QuoteView` |
| `pictureBig` | `PictureBigView` |
| `pictureTwoPictures` | `TwoPicturesView` |

When adding a new block type, add it to the schema (`sanity/schemaTypes/`), the union type in `ContentBlocks.tsx`, the `renderBlock` switch, and a new UI component in `app/components/ui/`.

### Sanity CMS

The CMS client is in `sanity/lib/client.ts` (CDN-cached, for page fetching) and instantiated directly in the API route without CDN for always-fresh data. Config: `sanity.config.ts`, CLI: `sanity.cli.ts`.

Schema types in `sanity/schemaTypes/`:
- `currentNewspaper` — singleton; holds a `file` asset (PDF). Served via `/api/newspaper/[slug]`.
- `event` — `title`, `slug`, `subtitle`, `pictureUrl` (raw URL string), `card` (listing preview object), `content` array
- `historyPage` — `title`, `slug`, `subtitle`, `pictureUrl` (raw URL string), `content` array
- `homePage` — drives home page content

**Images in CMS content use plain URL strings** (`type: "url"`), not Sanity's native `image` type with asset references. Do not add `sanity/lib/image.ts` URL builders for these fields.

Pages that fetch from Sanity use `export const revalidate = 60` (ISR, 60-second TTL).

### Language toggle

The Navbar includes a cookie-based language switcher cycling through `english → serbian_cyrilics → serbian_latin`. Cookie name: `lang`. The toggle is UI-only on this branch — content translations are not yet wired up. The `HISTORY_LINKS` array in `Navbar.tsx` must stay in sync with the equivalent array in `Footer.tsx` (see the `FIXME` comment).

### Assets

All images and icons are **Figma MCP asset URLs** stored in `app/components/assets.ts` and imported by pages. These URLs expire 7 days after generation. Per-page assets are declared as a local `const A = { … }` at the top of the page file with a comment noting the expiry.

The Logo component (`app/components/Logo.tsx`) is assembled from ~8 layered image slices using absolute positioning with percentage insets. It has two variants: `LogoBlack` and `LogoWhite`.
