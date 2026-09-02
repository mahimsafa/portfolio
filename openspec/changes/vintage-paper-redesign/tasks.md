## 1. Design tokens & fonts (design D1, D2)

- [x] 1.1 Add vintage palette tokens (`paper`, `paper-deep`, `paper-edge`, `ink`, `ink-soft`, `rust`, `rust-bright`, `mustard`, `stamp`) to `tailwind.config.cjs` theme colors and add `font-display` (Special Elite) and `font-serif` (IBM Plex Serif) families; verify `pnpm build` still passes with tokens unused
- [x] 1.2 Download woff2 files for Special Elite (400) and IBM Plex Serif (400, 400 italic, 600) and place them in `public/fonts/webfonts/`; verify files exist and are valid woff2 (`file` command)
- [x] 1.3 Add `@font-face` declarations for the new fonts in `src/layouts/Layout.astro` alongside the existing JetBrains Mono block, with `font-display: swap`; verify DevTools Network shows fonts loading from same origin only (no CDN)

## 2. Base layout & shared chrome (design D3, D6; specs: theme, forced light, coverage)

- [x] 2.1 In `Layout.astro`: remove the forced-dark inline `localStorage` script, remove `dark` classes from `<html>`/`<body>`, and recolor base background/text to `paper`/`ink`; verify landing page renders light with sepia text
- [x] 2.2 Replace the `.neon-bg` layers (grid lines, glow orbs, scanline) with a single `.paper-bg` fixed layer using the tiled SVG `feTurbulence` grain + corner vignette gradients, `aria-hidden`, `pointer-events: none`; verify grain is visible, page is scrollable/interactive everywhere, and no scanline/grid remains
- [x] 2.3 Delete `gridPulse`, `scanline`, `glowDrift`, `neonFlicker`, `cardGlowIn` keyframes and all `#38bdf8` glow/shadow/selection/scrollbar/focus styling from Layout global styles; recolor selection, scrollbar, focus ring, and `.section-heading::after` to the new palette; verify `grep -r "38bdf8" src` returns no matches
- [x] 2.4 Restyle `Navbar.astro` and `MobileNav.astro` as a vintage paper masthead (typewriter wordmark, ink links, rust active state, hand-drawn underline hover); verify nav is themed and mobile nav still opens/closes
- [x] 2.5 Restyle `Footer.astro` as a letterpress colophon (paper-deep band, ink-soft text, rust links); verify footer themed and links meet 4.5:1 contrast on paper
- [x] 2.6 Restyle `Button.astro` (and any button-like links) as letterpress buttons: paper-deep fill, ink text, rust hover, pressed shadow; verify both variants visible and legible

## 3. Decoration kit & motion (design D4, D5; specs: motion, decorations)

- [x] 3.1 Create `src/components/Stamp.astro` (rotated double-bordered uppercase label, `stamp` color, `mix-blend-mode: multiply`, `aria-hidden` slot) and a `.rule-handdrawn` SVG squiggle underline utility in Layout globals; verify component renders on a test placement without intercepting pointer events
- [x] 3.2 Add `typewriterIn` (clip-path/step reveal) and `stampIn` (overshoot pop) keyframes to Layout globals, extend the existing `prefers-reduced-motion` block to disable them; verify reveals play normally and are fully skipped with reduced motion enabled
- [x] 3.3 Keep `[data-animate]` IntersectionObserver wiring unchanged and keep the blinking cursor effect recolored to `ink`; verify scroll-reveal still triggers on landing sections

## 4. Landing page sections (specs: theme, coverage, typography)

- [x] 4.1 Restyle `Hero.astro`: typewriter display name, mono intro, rust accent title with blinking cursor, `Stamp.astro` badge (e.g., "OPEN TO WORK"), aged-photo treatment for the profile image (sepia-tinted border/frame); verify hero themed on desktop and mobile
- [x] 4.2 Restyle `Timeline.astro` as an ink-drawn timeline (rust nodes, paper-edge line, typewriter dates); verify timeline legible and themed
- [x] 4.3 Restyle `SkillsGrid.astro` as typewritten index cards (paper-deep cards, mono tags, stamp pop-in on reveal); verify grid themed and hover states AA-safe
- [x] 4.4 Restyle `Clients.astro` and `TestimonialsGrid.astro` as clipped print clippings / typed testimonial cards; verify both sections themed, logos remain legible on paper
- [x] 4.5 Restyle `BlogList.astro` and the shared `Card`-style presentation used by it as aged journal entries (typewriter title, ink-soft excerpt, rust read link); verify cards themed
- [x] 4.6 Restyle `Contact.astro` as a telegram/letter form (paper-deep inputs with paper-edge borders, typewriter labels, letterpress submit); verify form fields remain focusable with visible focus rings
- [x] 4.7 Verify full landing page: every section in paper theme, no `#38bdf8` remnants, decorations present but restrained (`pnpm dev` visual pass)

## 5. Secondary pages (specs: coverage, typography, code blocks)

- [x] 5.1 Restyle `blog.astro` (blog index) to match the journal-entry card style from 4.5; verify themed
- [x] 5.2 Restyle `src/pages/article/[...slug].astro` and prose styles: IBM Plex Serif body, typewriter headings, paper-deep code blocks with `paper-edge` border; verify a sample article reads well on paper
- [x] 5.3 Switch Shiki theme to `vitesse-light` in `astro.config.mjs`; verify code blocks in an article render light/warm and are legible
- [x] 5.4 Restyle `hireme.astro` and `external.astro` (paper panels, rust accents, typewriter headings); verify both themed
- [x] 5.5 Restyle `404.astro` as a "file not found" vintage memo (stamped "MISSING"); verify 404 themed by visiting an unknown route in `pnpm preview`

## 6. Cleanup (design D6, D8, D9; specs: forced light, no framework)

- [x] 6.1 Delete `src/components/ThemeToggle.astro`; verify no imports reference it (`grep -r ThemeToggle src`)
- [x] 6.2 Delete unused legacy components (`Card.astro`, `CardV3.astro`, `CardV4.astro`, `SideNav.astro`, `Skills.astro`, `Testimonials.astro`, `Experience.astro`, `Involvement.astro`, `Brands.astro`) after confirming zero imports; verify `grep` finds no references and build succeeds
- [x] 6.3 Remove `solidJs()` from `astro.config.mjs` and remove `@astrojs/solid-js` + `solid-js` from `package.json`; run `pnpm install` and verify `pnpm build` passes without the integration

## 7. Verification (specs: accessibility, coverage, static output)

- [x] 7.1 Run `pnpm lint`, `pnpm typecheck`, and `pnpm build`; all three pass with no errors
- [x] 7.2 Contrast audit: check body text, nav/footer links, rust accents, and article prose against paper background with a contrast tool; all meet WCAG 2.1 AA (4.5:1 body, 3:1 large); adjust `ink`/`rust` hexes if needed
- [x] 7.3 Reduced-motion pass: with OS reduced-motion enabled, verify all reveals/animations disabled and content fully visible on every page
- [x] 7.4 Static-output check: inspect `dist/` for no hydration runtime and no external font requests (grep dist HTML for `fonts.googleapis`/`fonts.gstatic` returns nothing)
- [x] 7.5 Full-route walkthrough in `pnpm preview`: `/`, `/blog`, one article, `/hireme`, `/external`, 404 — every route in aged-paper theme with themed nav/footer (spec: Whole-site page coverage)
