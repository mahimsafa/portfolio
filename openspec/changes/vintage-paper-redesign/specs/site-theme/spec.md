## Purpose

Defines the site-wide "aged paper" vintage visual theme: the color palette, typography, page coverage, decorative details, motion language, and accessibility guarantees that together present a vintage, scholarly, staff-level developer identity in place of the previous dark neon-grid aesthetic.

## ADDED Requirements

### Requirement: Vintage aged-paper visual theme

The site SHALL render in a vintage "aged paper" light theme consisting of: a warm cream/ivory paper background, dark sepia-brown primary text (ink), rust/oxblood primary accents, and muted mustard secondary accents, with a subtle paper-grain texture — replacing the dark slate background, sky-blue neon accents, and grid/scanline background effects.

#### Scenario: Landing page shows paper theme

- **WHEN** a visitor loads the landing page
- **THEN** the page renders with the cream paper background, sepia ink text, and rust/mustard accents, and no neon glow, scanline, or grid-pulse background effects remain

#### Scenario: Dark neon styles fully removed

- **WHEN** the built CSS is inspected
- **THEN** no sky-blue `#38bdf8`-based neon glow, scanline sweep, or animated grid background styles exist

### Requirement: Single forced light theme

The site SHALL present only the aged-paper light theme on every page, regardless of any previously stored theme preference or the visitor's operating-system dark-mode setting. The site SHALL NOT offer a theme toggle control.

#### Scenario: OS dark-mode visitor sees paper theme

- **WHEN** a visitor with their OS set to dark mode loads any page
- **THEN** the page renders in the aged-paper light theme with no dark variant and no theme-switch control anywhere in the UI

#### Scenario: No theme preference logic remains

- **WHEN** any page is loaded
- **THEN** no script reads or writes a stored theme preference

### Requirement: Vintage typography hierarchy

The site SHALL use a three-role typography system: a typewriter-style display typeface for headings, section labels, and display accents; the existing self-hosted monospace typeface (JetBrains Mono) for body text, UI elements, and code; and an old-style serif typeface for long-form article prose in blog posts. All typefaces SHALL be self-hosted.

#### Scenario: Heading typography

- **WHEN** any page heading or section label is displayed
- **THEN** it renders in the typewriter display typeface rather than the monospace body face

#### Scenario: Article prose typography

- **WHEN** a blog article's body content is displayed
- **THEN** the prose renders in the serif typeface while inline code and code blocks remain monospace

#### Scenario: No third-party font requests

- **WHEN** any page is loaded
- **THEN** all fonts are served from the site's own origin with no external font CDN requests

### Requirement: Whole-site page coverage

Every page of the site — landing, blog list, individual blog articles, hireme, external, and the 404 page — and all shared chrome (navigation, mobile navigation, footer) SHALL be presented in the vintage aged-paper theme. No route SHALL retain the previous dark neon styling.

#### Scenario: All routes themed

- **WHEN** each of the routes `/`, `/blog`, any blog article, `/hireme`, `/external`, and an unknown URL (404) is visited
- **THEN** every route renders in the aged-paper theme with themed navigation and footer

### Requirement: Vintage-flavored motion

The site SHALL keep scroll-triggered reveal behavior but express it with vintage-print effects: typewriter-style text reveal for hero/heading text, stamp-like pop-in for badge/card elements, and a blinking typewriter cursor accent. The previous neon motion effects (glow pulses, scanline sweep, grid pulse, neon flicker) SHALL be removed.

#### Scenario: Scroll reveal with vintage effects

- **WHEN** a visitor scrolls a section into view
- **THEN** the section content reveals using a vintage effect (typewriter or stamp style) rather than a neon glow animation

#### Scenario: Reduced motion preference honored

- **WHEN** a visitor has `prefers-reduced-motion: reduce` enabled
- **THEN** all reveal and looping animations are disabled and content is fully visible without motion

### Requirement: Decorative paper details

The site MAY include restrained vintage-print decorations — paper grain, stamp/ink-mark accents, hand-drawn rule or underline accents, and aged-edge details. Any such decoration SHALL be purely decorative (hidden from assistive technology and non-interactive) and SHALL NOT obscure or block readable text or interactive elements.

#### Scenario: Decorations are non-interactive

- **WHEN** decorative paper elements (grain overlay, stamps, drawn rules) are present
- **THEN** they are hidden from screen readers, do not intercept pointer events, and do not overlap text in a way that reduces legibility

### Requirement: Accessibility of the sepia palette

All text in the aged-paper theme SHALL meet WCAG 2.1 AA contrast: at least 4.5:1 for body text and 3:1 for large text (18pt+ or 14pt+ bold) against the paper background. Keyboard focus indicators SHALL remain clearly visible.

#### Scenario: Body text contrast

- **WHEN** body text, navigation links, and footer text are measured against the paper background
- **THEN** each meets a contrast ratio of at least 4.5:1

#### Scenario: Accent text contrast

- **WHEN** accent-colored text (rust or mustard) is used for links, labels, or headings
- **THEN** rust text meets at least 4.5:1 (or 3:1 for large text), and mustard is used only at sizes/weights where it meets 3:1 or is purely decorative

#### Scenario: Visible keyboard focus

- **WHEN** a keyboard user tabs through navigation, links, and interactive elements
- **THEN** a clearly visible focus indicator styled for the paper theme appears on each focused element

### Requirement: Code block presentation on paper

Code blocks in blog articles SHALL use a warm, light syntax-highlighting theme legible on the paper background, replacing the previous dark theme.

#### Scenario: Article code blocks legible

- **WHEN** a blog article containing code fences is rendered
- **THEN** code blocks render with the light warm syntax theme and remain legible on the paper background

### Requirement: No client-side framework introduced

The redesign SHALL NOT introduce client-side framework hydration: pages remain fully static pre-rendered HTML with at most small vanilla scripts (scroll-reveal, mobile navigation). Unused client-side framework dependencies SHALL be removed.

#### Scenario: Static output preserved

- **WHEN** the site is built
- **THEN** the output contains no framework hydration runtime and every page is static HTML
