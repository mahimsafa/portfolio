## Why

The portfolio was recently redesigned as a dark "neon grid" cyber aesthetic, but the owner wants the site to present a vintage, scholarly, staff-level developer identity instead. A "aged paper / sepia print" look (warm cream paper, typewriter and mono typography, letterpress-style decoration) better communicates a seasoned, nerdy craftsman persona and differentiates the site from the sea of dark neon developer portfolios.

## What Changes

- Rebrand the entire site from the forced-dark neon-grid theme to a forced-light "aged paper" sepia theme (single mode, no toggle)
- Introduce a vintage design token system: aged cream paper background, sepia-brown ink, rust and muted-mustard accents, paper grain texture
- Introduce a retro display + mono typography mix: a typewriter-style display font for headings, JetBrains Mono retained for body/UI/code, an old-style serif for long-form blog prose (fonts self-hosted, matching the existing pattern)
- Restyle every page: landing (Hero, Timeline, Skills, Clients, Testimonials, Blog list, Contact), blog list, article pages, hireme, external, 404, plus shared chrome (Navbar, MobileNav, Footer, Layout background)
- Restyle motion to vintage-flavored equivalents while keeping the existing scroll-reveal infrastructure: typewriter-style text reveals, "stamp" pop-ins, blinking typewriter cursor; remove neon glow, scanline, and grid-pulse effects
- Swap code-block syntax highlighting from the dark `nord` Shiki theme to a warm light theme suited to paper
- Cleanup: remove the forced dark-mode inline script and unused `ThemeToggle` component; remove the unused Solid.js integration (`@astrojs/solid-js`, `solid-js` dependency)
- Copy/content stays as-is; the owner will rewrite content later. This is a visual/theme change only — routes, content collections, and data are unchanged

## Capabilities

### New Capabilities

- `site-theme`: The site-wide visual theme system — vintage aged-paper color palette and typography tokens, forced light single-theme behavior, page coverage across the whole site, vintage-flavored motion and decoration, and accessibility/reduced-motion guarantees

### Modified Capabilities

<!-- None: openspec/ has no existing capability specs; the current neon-grid theme
     was never captured as a spec. All theme requirements are new. -->

## Impact

- **Code**: `src/layouts/Layout.astro` (global styles, fonts, dark-mode script, background layers), `tailwind.config.cjs` (font/color tokens), `astro.config.mjs` (Shiki theme, Solid integration removal), all components in `src/components/`, all pages in `src/pages/`
- **Assets**: new self-hosted woff2 fonts in `public/fonts/webfonts/`; new SVG paper-grain texture asset
- **Dependencies**: remove `@astrojs/solid-js` and `solid-js`; no additions
- **Risks**: low — visual-only change; no route, data, or build-output (SSG) behavior changes. Accessibility must be verified: sepia palette must maintain WCAG AA contrast and `prefers-reduced-motion` behavior must be preserved
