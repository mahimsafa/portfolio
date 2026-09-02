## Context

See proposal.md — Why. Current technical state (verified in repo):

- Astro 5 static build (`astro build`, no adapter) + Tailwind 3 (`@astrojs/tailwind`, `@tailwindcss/typography`)
- Theme lives in two places: `tailwind.config.cjs` (fonts only) and global styles in `src/layouts/Layout.astro` (neon keyframes, `.neon-bg` background layers, forced-dark inline script, scroll-reveal IntersectionObserver)
- Accent color `#38bdf8` is hard-coded across ~20 components in `src/components/` and pages in `src/pages/`
- Fonts: JetBrains Mono self-hosted at `public/fonts/webfonts/` via `@font-face` in Layout.astro
- Zero `client:` hydration directives anywhere; `@astrojs/solid-js` + `solid-js` in package.json are unused
- Shiki syntax theme: `nord` (dark) in `astro.config.mjs`
- Pages: `index`, `blog`, `article/[...slug]`, `hireme`, `external`, `404`; content collections for blog are unchanged by this work

## Goals / Non-Goals

**Goals:**

- A coherent vintage "aged paper" design system (tokens → base styles → components → pages) that can be applied page by page
- Keep the existing motion infrastructure (`[data-animate]` + IntersectionObserver) and re-skin its effects
- Maintain WCAG AA contrast and reduced-motion behavior throughout
- Leave routes, content collections, data files, and SSG output shape untouched

**Non-Goals:**

- Copywriting/rewrite of content (owner will do later)
- Dark/light theming system, theme toggle, or `darkMode` variants
- Layout restructuring of pages (section order and information architecture stay)
- Migrating Tailwind versions or changing the build pipeline

## Decisions

### D1 — Palette tokens (design tokens in Tailwind config)

Define semantic color tokens in `tailwind.config.cjs` instead of continuing to hard-code hexes in components:

| Token         | Candidate value | Role                                                                             |
| ------------- | --------------- | -------------------------------------------------------------------------------- |
| `paper`       | `#f1e9d4`       | page background (warm cream)                                                     |
| `paper-deep`  | `#e7dcc0`       | card/panel background, wells                                                     |
| `paper-edge`  | `#d8caa6`       | borders, deckle edges                                                            |
| `ink`         | `#33291d`       | primary text (sepia brown-black)                                                 |
| `ink-soft`    | `#5c4d3a`       | secondary text, captions                                                         |
| `rust`        | `#8c3a1e`       | primary accent: links, headings accents, active states (AA-safe on `paper`)      |
| `rust-bright` | `#a9492a`       | hover state of rust                                                              |
| `mustard`     | `#b08a2e`       | secondary accent: borders, stamps, large display text only (not AA at body size) |
| `stamp`       | `#7d3a30`       | faded red-ink stamp color                                                        |

Values are starting points to be visually tuned during apply; the spec constrains only the vintage feel + AA contrast. **Alternative considered:** olive/forest secondary accent — rejected, mustard better delivers the requested "yellowish vibe".

### D2 — Typography: Special Elite + JetBrains Mono + IBM Plex Serif

- **Display/headings/labels:** _Special Elite_ (typewriter, Google Font, OFL) — single 400 weight is authentic to typewriters; used for `h1–h6`, section labels, stamps, nav wordmark.
- **Body/UI/code:** _JetBrains Mono_ stays (already self-hosted, matches developer identity).
- **Article prose:** _IBM Plex Serif_ (400/400i/600) for `.prose` content in blog articles — long-form mono is fatiguing; serif keeps the print feel readable.
- All three self-hosted as woff2 in `public/fonts/webfonts/` with `font-display: swap`, following the existing `@font-face` pattern in Layout.astro. Download woff2 files during apply (fontsource packages or google-webfonts-helper are equally fine — file origin is what matters).
- `tailwind.config.cjs` gains `font-display`, `font-serif` families; `font-mono`/`font-sans` stay mapped to JetBrains Mono.

**Alternative considered:** full-typewriter body text — rejected (readability, single weight); VT323 display — rejected (CRT/pixel vibe clashes with paper print).

### D3 — Paper texture: inline SVG noise, no raster assets

Paper grain as a tiled data-URI SVG using `feTurbulence` + low opacity, plus two CSS radial-gradients for corner vignette/aging. No photograph textures (bloat, licensing). Replaces `.neon-bg` layers in Layout with a single `.paper-bg` fixed layer (`aria-hidden`, `pointer-events: none`).

### D4 — Decoration kit (small, reusable)

- `Stamp.astro`: rotated, double-bordered uppercase label ("EST. 2019", "OPEN TO WORK") in `stamp` color with slight ink-texture via `mix-blend-mode: multiply`.
- `.rule-handdrawn`: SVG squiggle underline replacing the neon `.section-heading::after` glow line.
- Deckle-edge divider: repeating SVG scallop between major sections (optional, use sparingly).
- All decorations `aria-hidden="true"`, `pointer-events: none`. Density: moderate — one decoration moment per section, not per element.

### D5 — Motion: same observer, vintage effects

Keep `[data-animate]` + IntersectionObserver wiring in Layout.astro exactly as-is. Swap keyframes:

- `typewriterIn`: reveal via `clip-path: inset()` stepping (or `ch`-width steps) — used for hero title and section headings.
- `stampIn`: `scale(1.5) rotate(6deg) opacity 0 → scale(1) rotate(-2deg) opacity 1` with slight overshoot — for Stamp/badges/cards.
- Keep `cursorBlink` (recolor to `ink`), `fadeInUp`, `underlineDraw` (recolored).
- Delete `gridPulse`, `scanline`, `glowDrift`, `neonFlicker`, `cardGlowIn` and all `#38bdf8` shadows/glows.
- Extend the existing `prefers-reduced-motion` block to cover the new effects.

### D6 — Forced light: delete, don't toggle

Remove the inline `localStorage` theme script and `dark` classes from `<html>`/`<body>`; delete `ThemeToggle.astro` (unused by current chrome, but purge it so no dark path lingers). `darkMode: 'class'` can stay in Tailwind config harmlessly — no `dark:` variants will exist. Ship exactly one theme.

### D7 — Shiki theme: `vitesse-light`

`astro.config.mjs`: `shikiConfig.theme: 'vitesse-light'` — warm-toned, low-chroma, reads as "printed" on cream. **Alternative:** `gruvbox-light-medium` (better AA contrast for code, but busier palette); `vitesse-light` first, revisit if code contrast disappoints. Block background gets `paper-deep` + thin `paper-edge` border via prose styles.

### D8 — Remove unused Solid.js integration

Delete `solidJs()` from `astro.config.mjs` integrations and drop `@astrojs/solid-js` + `solid-js` from package.json. Verified unused (no `client:` directives, no `.tsx/.jsx` files). Reduces install size; no behavior change.

### D9 — Component restyle order follows dependency: chrome first

Restyle `Layout` (tokens/bg/fonts) → `Navbar`/`MobileNav`/`Footer`/`Button`/`SEO`(untouched) → page sections (`Hero`, `Timeline`, `SkillsGrid`, `Clients`, `TestimonialsGrid`, `BlogList`, `Contact`) → secondary pages (`blog`, `article`, `hireme`, `external`, `404`). Chrome-first means pages restyled later already inherit themed surroundings. Legacy variants (`Card.astro`, `CardV3.astro`, `SideNav.astro`, `Skills.astro`, `Testimonials.astro`, `Experience.astro`, `Involvement.astro`, `Brands.astro` — unused by current pages) get deleted rather than restyled, matching D8's cleanup spirit.

## Risks / Trade-offs

- [Mustard accent fails AA at body size] → Use mustard only for borders/large display text (≥3:1) or decoration; body-size accents use `rust`.
- [Special Elite is decorative and only has 400 weight] → Restrict it to headings/labels; body stays mono. Faux-bold prohibited.
- [SVG grain over full viewport could cost paint time] → Tiled data-URI (few KB), `position: fixed`, `pointer-events: none`; validate on dev profile.
- [Vintage "faded" palette drifts below AA] → Every text token pair is checked with a contrast tool during apply; adjust `ink`/`ink-soft` darkening before shipping.
- [Deleting unused components could break imports not caught by astro check] → Run `pnpm build` (catches unresolved imports) and `pnpm typecheck` after cleanup.
- [Sepia theme shifts brand identity sharply] → Single-commit cutover via one PR; rollback is `git revert` — no persisted state involved.

## Migration Plan

1. Land tokens + fonts + Layout base styles (site is transitional but buildable)
2. Restyle chrome, then sections, then secondary pages (component order in D9)
3. Cleanup commit: remove dark-mode script, ThemeToggle, unused components, solid deps, swap Shiki theme
4. Verify: `pnpm build`, `pnpm lint`, `pnpm typecheck`, manual contrast pass, reduced-motion pass
5. Deploy via existing Vercel pipeline; rollback = revert the merge commit

## Open Questions

- Exact hex values for the palette tokens (D1) — tuned visually during apply; the spec's vintage-feel + AA constraints are the acceptance criteria, so this does not block implementation.
