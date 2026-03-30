# Portfolio Modernization Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the portfolio into a modern, developer-centric site with Astro v5, strict TypeScript, full SEO, dark mode, JetBrains Mono typography, and polished subtle animations.

**Architecture:** Full Astro v5 migration with built-in image optimization, strict TypeScript (no `any`, no `ts-ignore`), comprehensive SEO (OpenGraph, Twitter, JSON-LD, sitemap), dark mode via Tailwind `class` strategy, CSS-based animations with `prefers-reduced-motion` support.

**Tech Stack:** Astro v5, Solid.js, Tailwind CSS v3, TypeScript strict mode, ESLint v9 flat config, Prettier, astro-icon v1, JetBrains Mono font

---

## Phase 1: Foundation & Code Quality

### Task 1: Dependency Migration to Astro v5

**Files:**

- Modify: `package.json`
- Modify: `astro.config.mjs`
- Modify: `tsconfig.json`

**Steps:**

1. Remove deprecated packages: `@astrojs/image`, `@astrojs/markdown-remark`, `babel-eslint`, `stylelint`, `stylelint-config-recommended-scss`, `stylelint-config-standard`
2. Update to: `astro@5`, `@astrojs/solid-js@5`, `@astrojs/tailwind@6` (or use `@astrojs/tailwind` compatible with Astro v5), `solid-js@1.9+`, `sharp@latest`
3. Install: `astro-icon@1` (breaking API change from v0.x)
4. Install: `@astrojs/sitemap` (new, needed for Task 13)
5. Update `astro.config.mjs` for v5 syntax:
   - Remove the old `markdown.render` array format
   - Use new markdown config: `markdown: { syntaxHighlight: 'shiki', shikiConfig: { theme: 'nord' } }`
   - Remove `image()` integration (built into Astro v5 core)
   - Keep `tailwind()` and `solidJs()` integrations
   - Add `sitemap()` integration
6. Update `tsconfig.json`:
   - Remove `@astrojs/image/client` from `types` array (no longer needed)
   - Extend from `astro/tsconfigs/strictest` instead of `astro/tsconfigs/base`

**Verify:** Run `pnpm install && pnpm build` - build should complete without errors.

---

### Task 2: Strict TypeScript Configuration

**Files:**

- Modify: `tsconfig.json`
- Create: `src/types/index.ts`
- Modify: `src/content/data.ts`
- Modify: `src/content/config.ts`

**Steps:**

1. Update `tsconfig.json` compilerOptions:
   ```json
   {
     "extends": "astro/tsconfigs/strictest",
     "compilerOptions": {
       "strictNullChecks": true,
       "noImplicitAny": true,
       "noUncheckedIndexedAccess": true,
       "allowJs": false,
       "jsx": "preserve",
       "jsxImportSource": "solid-js"
     }
   }
   ```
2. Create `src/types/index.ts` with all shared type definitions:
   - `Review`, `External`, `Brand`, `Skill`, `SkillCategory`
   - `SEOProps` (for SEO component, used in Task 13)
   - `NavLink`
3. Update `src/content/data.ts` to import types from `src/types/index.ts`
4. Remove any `// @ts-ignore` comments in codebase (check `Brands.astro`, `Testimonials.astro`)
5. Run `pnpm build` to surface type errors - fix any that appear

**Verify:** `pnpm build` passes with zero TypeScript errors.

---

### Task 3: ESLint v9 Flat Config + Prettier

**Files:**

- Delete: `.eslintrc.cjs`
- Create: `eslint.config.js`
- Modify: `package.json` (add lint scripts)
- Modify: `.prettierrc` or create it

**Steps:**

1. Install devDependencies:
   - `eslint@9`
   - `@typescript-eslint/eslint-plugin@8`
   - `@typescript-eslint/parser@8`
   - `eslint-plugin-astro@latest`
   - `prettier@3`
   - `prettier-plugin-astro@latest`
   - `prettier-plugin-tailwindcss@latest`
2. Delete `.eslintrc.cjs`
3. Create `eslint.config.js` as ESLint v9 flat config:

   ```js
   import tseslint from "@typescript-eslint/eslint-plugin";
   import tsParser from "@typescript-eslint/parser";
   import astro from "eslint-plugin-astro";
   import astroParser from "astro-eslint-parser";

   export default [
     // TypeScript files
     {
       files: ["**/*.{ts,tsx}"],
       plugins: { "@typescript-eslint": tseslint },
       parser: tsParser,
       rules: {
         "@typescript-eslint/no-explicit-any": "error",
         "@typescript-eslint/no-unused-vars": "error",
         "@typescript-eslint/consistent-type-imports": "error",
         "no-console": "warn",
       },
     },
     // Astro files
     {
       files: ["**/*.astro"],
       plugins: { astro },
       parser: astroParser,
       parserOptions: { parser: tsParser, extraFileExtensions: [".astro"] },
       rules: {
         ...astro.configs.recommended.rules,
       },
     },
   ];
   ```

4. Create `.prettierrc`:
   ```json
   {
     "semi": true,
     "singleQuote": true,
     "tabWidth": 2,
     "trailingComma": "es5",
     "plugins": ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
     "overrides": [{ "files": "*.astro", "options": { "parser": "astro" } }]
   }
   ```
5. Add to `package.json` scripts:
   - `"lint": "eslint ."`
   - `"lint:fix": "eslint . --fix"`
   - `"format": "prettier --write ."`
   - `"typecheck": "astro check"`

**Verify:** `pnpm lint` runs without crashing (some errors expected until code cleanup).

---

### Task 4: Code Cleanup & Typo Fixes

**Files:**

- Rename: `src/components/Involvment.astro` → `src/components/Involvement.astro`
- Delete: `src/components/CardV2.astro`
- Delete: `src/components/SolidContact.tsx`
- Modify: `src/components/Testimonials.astro` (fix duplicate `id="contact"`)
- Modify: `src/components/Footer.astro` (add `rel="noopener noreferrer"`)
- Modify: `src/components/Experience.astro` (add `rel="noopener noreferrer"`)
- Modify: `src/pages/index.astro` (update Involvment import, remove commented code)
- Modify: `src/pages/hireme.astro` (remove SolidContact import)

**Steps:**

1. Rename `Involvment.astro` to `Involvement.astro`; update import in `index.astro`
2. Fix the heading typo inside the component: "Involvment" → "Involvement"
3. Delete `CardV2.astro` (unused, has placeholder content)
4. Delete `SolidContact.tsx` (contact form being removed in Task 10)
5. In `Testimonials.astro`: remove duplicate `id="contact"` from inner `<div>`
6. In `Footer.astro`: add `rel="noopener noreferrer"` to all `target="_blank"` links
7. In `Experience.astro`: add `rel="noopener noreferrer"` to all `target="_blank"` links
8. Remove the commented-out `<img>` tag in `index.astro` (line 16)
9. Remove the commented-out description block in `Experience.astro`
10. Run `pnpm build` to verify no broken imports

**Verify:** `pnpm build` passes. No references to deleted files remain.

---

## Phase 2: Design System & Typography

### Task 5: JetBrains Mono Font Integration

**Files:**

- Modify: `src/layouts/Layout.astro` (add `@font-face` styles)
- Modify: `tailwind.config.cjs` (add font family)

**Steps:**

1. In `Layout.astro`, add a `<style is:global>` block with `@font-face` declarations using the woff2 files already present in `public/fonts/webfonts/`:
   ```css
   @font-face {
     font-family: "JetBrains Mono";
     src: url("/fonts/webfonts/JetBrainsMono-Regular.woff2") format("woff2");
     font-weight: 400;
     font-style: normal;
     font-display: swap;
   }
   @font-face {
     font-family: "JetBrains Mono";
     src: url("/fonts/webfonts/JetBrainsMono-Medium.woff2") format("woff2");
     font-weight: 500;
     font-style: normal;
     font-display: swap;
   }
   @font-face {
     font-family: "JetBrains Mono";
     src: url("/fonts/webfonts/JetBrainsMono-SemiBold.woff2") format("woff2");
     font-weight: 600;
     font-style: normal;
     font-display: swap;
   }
   @font-face {
     font-family: "JetBrains Mono";
     src: url("/fonts/webfonts/JetBrainsMono-Bold.woff2") format("woff2");
     font-weight: 700;
     font-style: normal;
     font-display: swap;
   }
   @font-face {
     font-family: "JetBrains Mono";
     src: url("/fonts/webfonts/JetBrainsMono-Italic.woff2") format("woff2");
     font-weight: 400;
     font-style: italic;
     font-display: swap;
   }
   ```
2. In `tailwind.config.cjs`, extend `fontFamily`:
   ```js
   fontFamily: {
     mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
     sans: ['"JetBrains Mono"', 'ui-monospace', 'monospace'], // Use mono as primary
   }
   ```
3. Apply `font-mono` (or remove `font-sans` default) so JetBrains Mono is the default body font

**Verify:** Build + preview shows JetBrains Mono rendering in browser.

---

### Task 6: Developer-Centric Color Palette & Tailwind Config

**Files:**

- Modify: `tailwind.config.cjs`
- Modify: All components using `text-red-400`, `bg-red-*` (search and replace)

**Color Design:**

- **Primary accent:** `#38BDF8` (sky-400) — a developer-friendly muted cyan
- **Primary dark:** `#0EA5E9` (sky-500) for hover states
- **Light surface:** `#F8FAFC` (slate-50)
- **Dark surface:** `#0F172A` (slate-950)
- **Text primary light:** `#1E293B` (slate-800)
- **Text muted light:** `#64748B` (slate-500)
- **Text primary dark:** `#E2E8F0` (slate-200)
- **Text muted dark:** `#94A3B8` (slate-400)
- **Border light:** `#E2E8F0` (slate-200)
- **Border dark:** `#1E293B` (slate-800)
- **Accent green** (for tags/skills): `#34D399` (emerald-400)

**Steps:**

1. Update `tailwind.config.cjs`:
   - Change `primary` from `#FF5D01` to `#38BDF8`
   - Add `surface`, `muted` color tokens
   - Keep `darkMode: 'class'` (added in Task 14 but set config here)
2. Global search for `text-red-400` / `bg-red-` / `text-red-` → replace with `text-sky-400` / `bg-sky-` / `text-sky-`
3. Update hero pattern background color to match new palette
4. Remove the unused `primary` orange color token and all its references

**Verify:** Build passes. Site renders with new color scheme.

---

### Task 7: Developer Aesthetic Polish

**Files:**

- Modify: `src/layouts/Layout.astro`
- Modify: `src/components/Navbar.astro`
- Modify: `src/components/Experience.astro`
- Modify: `src/components/Card.astro`

**Steps:**

1. In `Layout.astro` global styles, add subtle developer details:
   - Selection color: `::selection { background: #38BDF8; color: #0F172A; }`
   - Scrollbar styling (webkit) matching dark/light theme
2. In `Navbar.astro`:
   - Add a subtle `border-b border-slate-200/50 dark:border-slate-800/50` underline
   - Ensure logo uses JetBrains Mono font weight
3. In `Experience.astro`:
   - Add a more prominent left border accent using new primary color
   - Use subtle `bg-slate-50 dark:bg-slate-900/50` card backgrounds
4. In `Card.astro` (blog cards):
   - Add hover state with subtle lift: `hover:-translate-y-1 transition-transform duration-200`
   - Use new color palette

**Verify:** Build passes. Visual check in preview.

---

## Phase 3: Image & Component Updates

### Task 8: Migrate Images to Astro v5 Built-in

**Files:**

- Modify: `src/pages/index.astro`
- Modify: `src/components/Experience.astro`
- Modify: `src/components/Card.astro`
- Modify: `src/components/CardV3.astro`
- Modify: `src/pages/article/[...slug].astro`

**Steps:**

1. In all files, replace:
   ```astro
   import { Image } from "@astrojs/image/components";
   ```
   with:
   ```astro
   import { Image } from "astro:assets";
   ```
2. Update `<Image>` props for Astro v5 API:
   - Remove `fit`, `format`, `aspectRatio` props (use `width`/`height` instead)
   - Add explicit `width` and `height` integers to all local Image usages
3. For remote images in `CardV3.astro` (testimonials):
   - Add `loading="lazy"` to `<img>` tags
   - Add explicit `width` and `height` attributes
   - Add meaningful `alt` text using the reviewer's name: `alt="{review.name} profile photo"`
4. In `Experience.astro`, verify each `<Image>` has proper `width` and `height`

**Verify:** `pnpm build` passes. No image import errors.

---

### Task 9: Update astro-icon to v1

**Files:**

- Modify: `src/components/Experience.astro`
- Modify: `src/components/Footer.astro`
- Modify: `src/components/Button.astro`

**Steps:**

1. In every file using `<Icon>`, update the import:
   ```astro
   // OLD
   import { Icon } from "astro-icon";
   // NEW
   import { Icon } from "astro-icon/components";
   ```
2. Check if icon names need updating for astro-icon v1 (icon sets may have changed)
3. In `Footer.astro`, add `aria-label` to every icon-only social link:
   ```astro
   <a href="..." aria-label="GitHub profile" target="_blank" rel="noopener noreferrer">
     <Icon name="bi:github" />
   </a>
   ```
4. In `Experience.astro`, add `aria-label` to external link icons

**Verify:** Build passes. Icons render correctly.

---

### Task 10: Refactor HireMe Page to Contact Links

**Files:**

- Modify: `src/pages/hireme.astro`
- Modify: `src/pages/index.astro` (update "contact me" link text if needed)

**Steps:**

1. Remove all Solid.js imports and usage from `hireme.astro`
2. Rewrite the page as static Astro with contact information:
   - Page heading: "Get in Touch" or "Let's Work Together"
   - Short intro text about availability
   - Email link: `mailto:` with the user's email
   - List of links with icons: LinkedIn, GitHub, Twitter/X, Fiverr
   - Style with new developer palette
3. Use `astro-icon` for platform icons
4. Ensure links have `rel="noopener noreferrer"` and `aria-label`
5. Update `index.astro` bio text if it references the contact form

**Verify:** `/hireme` page renders. No Solid.js imports remain.

---

## Phase 4: New Features

### Task 11: Skills Section Component

**Files:**

- Modify: `src/types/index.ts` (add Skill types)
- Modify: `src/content/data.ts` (add skills data)
- Create: `src/components/Skills.astro`
- Modify: `src/pages/index.astro` (import and use Skills)

**Skills data to add (inferred from content):**

```ts
export type SkillCategory = {
  name: string;
  skills: string[];
};
```

Categories and skills:

- **Cloud & Infrastructure:** AWS EC2, AWS ECS, AWS Lambda, API Gateway, DynamoDB, S3, CloudFront, Serverless Architecture
- **Languages:** TypeScript, JavaScript, Node.js, Python
- **Frontend:** React, Next.js, Astro, HTML5, CSS3, Tailwind CSS
- **Backend:** Express.js, MongoDB, PostgreSQL, REST APIs
- **DevOps:** Docker, CI/CD, GitHub Actions, Terraform
- **Security:** Application Security, Penetration Testing, Security Auditing
- **AI / LLM:** LLM Integration, Prompt Engineering, OpenAI API, RAG Systems

**Steps:**

1. Add `SkillCategory` type to `src/types/index.ts`
2. Add skills data array to `src/content/data.ts`
3. Create `Skills.astro`:
   - Section heading styled like Experience/Involvement
   - Categories as collapsible or grid layout
   - Individual skill as a badge/tag: `<span class="px-2 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-700">TypeScript</span>`
   - Subtle hover animation on badges
4. Add `<Skills />` to `index.astro` between Involvement and Brands

**Verify:** Skills section renders on homepage with all categories.

---

### Task 12: Enhanced Experience Descriptions

**Files:**

- Modify: `src/components/Experience.astro`

**Rewrite each role with senior-level impact framing:**

**AZ Group — Lead Software Developer (Nov 2023 – Present):**

> Architected and led the full-stack development of Butly AI, an enterprise-grade AI-powered customer support platform. Designed a multi-LLM orchestration layer that intelligently routes queries across multiple Large Language Models to deliver contextually accurate, low-latency responses. Established engineering standards, code review processes, and CI/CD pipelines that reduced deployment friction across the team. Collaborated directly with stakeholders to translate product vision into scalable technical architecture, owning both infrastructure and core application development.

**Fiverr — Level 2 Seller (Sept 2022 – Present):**

> Delivered 50+ AWS infrastructure and full-stack engagements as a top-rated Level 2 freelancer, maintaining a consistent 5-star rating. Architected serverless solutions on AWS—leveraging Lambda, API Gateway, DynamoDB, and ECS—that reduced client infrastructure costs by up to 60% compared to traditional server setups. Specialized in end-to-end MERN stack application delivery, from database schema design through production deployment, while consistently exceeding client expectations on performance and security benchmarks.

**Wellington In Your Pocket — Cloud Engineer (Jan 2023 – Sept 2023):**

> Designed and implemented the scalable backend cloud infrastructure on AWS supporting the Wellington In Your Pocket platform. Architected multi-region, high-availability solutions using EC2, RDS, and CloudFront, ensuring the platform could handle peak traffic reliably. Introduced automated CI/CD pipelines that cut deployment time by over 80%, and drove a cloud cost optimization initiative that reduced monthly AWS spend by 40%. Worked cross-functionally with product, design, and QA teams to translate business requirements into robust, production-ready cloud solutions.

**Byte Capsule Ltd. — Operations Lead (May 2020 – Nov 2022):**

> Led operations and technical services delivery at a fast-growing cybersecurity startup. Conducted application security assessments and penetration testing for enterprise clients, identifying and remediating critical vulnerabilities before production exposure. Designed and delivered cybersecurity training curricula that educated over 1,000 students across multiple universities, establishing the company as a credible security education provider. Represented the organization as a keynote speaker at industry conferences and university webinars, strengthening brand visibility. Streamlined internal workflows and cross-team collaboration processes, improving operational efficiency across the organization.

**Steps:**

1. Replace the text content of each experience entry in `Experience.astro`
2. Keep all existing HTML structure, classes, and company logos
3. Remove the old commented-out description block (cleanup from Task 4 if not done)
4. Improve the `alt` text on company logos (correct current "Fiverr Logo" alt on AZ Group icon)

**Verify:** `pnpm build` passes. Preview shows updated descriptions.

---

### Task 13: Full SEO Implementation

**Files:**

- Create: `src/components/SEO.astro`
- Modify: `src/layouts/Layout.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/pages/blog.astro`
- Modify: `src/pages/hireme.astro`
- Modify: `src/pages/external.astro`
- Modify: `src/pages/article/[...slug].astro`
- Modify: `astro.config.mjs` (add site URL for sitemap)
- Create: `public/robots.txt`

**Steps:**

1. Create `src/components/SEO.astro` with props:
   ```ts
   interface Props {
     title: string;
     description: string;
     image?: string;
     type?: "website" | "article";
     publishedDate?: Date;
     tags?: string[];
   }
   ```
   Include:
   - `<meta name="description" content={description} />`
   - `<meta property="og:title" />`, `og:description`, `og:image`, `og:url`, `og:type`
   - `<meta name="twitter:card" content="summary_large_image" />`
   - `<meta name="twitter:title" />`, `twitter:description`, `twitter:image`
   - `<link rel="canonical" href={canonicalUrl} />`
   - JSON-LD `<script type="application/ld+json">`:
     - Person schema on homepage
     - Article schema on blog post pages
2. In `Layout.astro`, accept SEO props and render `<SEO />` in `<head>`
3. Add unique `description` props to each page
4. In `astro.config.mjs`, add `site: 'https://mahimsafa.com'` (or correct URL)
5. Create `public/robots.txt`:
   ```
   User-agent: *
   Allow: /
   Sitemap: https://mahimsafa.com/sitemap-index.xml
   ```

**Verify:** `pnpm build` generates `sitemap-index.xml`. Head tags visible in page source.

---

### Task 14: Dark Mode Implementation

**Files:**

- Modify: `tailwind.config.cjs` (add `darkMode: 'class'`)
- Create: `src/components/ThemeToggle.astro`
- Modify: `src/components/Navbar.astro` (add toggle)
- Modify: `src/layouts/Layout.astro` (add theme init script)
- Modify: All components with hardcoded light-only colors

**Steps:**

1. In `tailwind.config.cjs`, add `darkMode: 'class'`
2. In `Layout.astro`, add an inline `<script>` in `<head>` that runs before render:
   ```js
   const theme =
     localStorage.getItem("theme") ??
     (window.matchMedia("(prefers-color-scheme: dark)").matches
       ? "dark"
       : "light");
   document.documentElement.classList.toggle("dark", theme === "dark");
   ```
3. Create `ThemeToggle.astro` — a button that:
   - Toggles `dark` class on `<html>`
   - Saves preference to `localStorage`
   - Shows sun/moon icon (SVG inline or via astro-icon)
   - Accessible: has `aria-label="Toggle dark mode"`
4. Add `<ThemeToggle />` to `Navbar.astro`
5. Update component dark variants:
   - `Layout.astro` body: add `dark:bg-slate-950`
   - Main content wrapper: add `dark:bg-slate-900 dark:shadow-slate-800/20`
   - `Navbar.astro`: add `dark:bg-slate-900/80 dark:border-slate-800`
   - `Experience.astro`: add dark variants for text, border, background
   - `Card.astro`: add dark card background
   - `CardV3.astro`: add dark variants
   - `Footer.astro`: add dark background and text
   - `Involvement.astro`: add dark variants
   - `Skills.astro`: already uses dark variants (from Task 11)

**Verify:** Toggle works. Both modes look correct in preview.

---

### Task 15: Enhanced Animations

**Files:**

- Modify: `src/components/Brands.astro` (fix infinite carousel)
- Modify: `src/layouts/Layout.astro` (add global animation CSS)
- Modify: `src/components/Skills.astro` (staggered fade-in)
- Modify: `src/components/Experience.astro` (scroll reveal)
- Modify: `src/components/Card.astro` (hover transitions)

**Steps:**

1. Fix `Brands.astro` infinite carousel:
   - In the template, duplicate the list of brand logos (render them twice)
   - Update SCSS: `$items: 5` → calculate based on actual count
   - Animation: translate from `0` to `-50%` (not `-100%`) so the duplicate seamlessly loops
2. In `Layout.astro` global styles, add:
   ```css
   @keyframes fadeInUp {
     from {
       opacity: 0;
       transform: translateY(16px);
     }
     to {
       opacity: 1;
       transform: translateY(0);
     }
   }
   .animate-fade-in-up {
     animation: fadeInUp 0.5s ease-out both;
   }
   @media (prefers-reduced-motion: reduce) {
     .animate-fade-in-up {
       animation: none;
     }
   }
   ```
3. Add scroll-triggered reveal using `IntersectionObserver` in a `<script>` in `Layout.astro`:
   ```js
   const observer = new IntersectionObserver(
     (entries) =>
       entries.forEach((e) =>
         e.target.classList.toggle("opacity-100", e.isIntersecting)
       ),
     { threshold: 0.1 }
   );
   document
     .querySelectorAll("[data-animate]")
     .forEach((el) => observer.observe(el));
   ```
4. Add `data-animate` and initial `opacity-0` class to section elements in Experience, Skills, Involvement, Brands, Testimonials
5. Add staggered animation delays to Skills badges using `style="animation-delay: {i * 50}ms"`
6. Card hover: ensure `hover:-translate-y-1 transition-transform duration-200` on all cards

**Verify:** Animations play on scroll. Brands carousel loops seamlessly. Reduced motion respected.

---

## Phase 5: Final Polish

### Task 16: Custom 404 Page

**Files:**

- Create: `src/pages/404.astro`

**Steps:**

1. Create `404.astro` using `Layout` with SEO props
2. Content:
   - Large "404" in monospace font with accent color
   - Message: "Page not found" or a developer-flavored message
   - Short description
   - Links back to Home, Blog, Hire Me
3. Dark mode support via Tailwind dark variants
4. Subtle animation (fade-in)

**Verify:** Navigate to `/nonexistent` in preview and see custom 404.

---

### Task 17: Accessibility Improvements

**Files:**

- Modify: `src/components/Navbar.astro`
- Modify: `src/layouts/Layout.astro` (add skip link)

**Steps:**

1. In `Navbar.astro`, fix the invalid `<button>` wrapping `<a>`:
   - If there's a `<button><a href="...">...</a></button>`, convert to just `<a href="...">` styled as a button
2. In `Layout.astro`, add a skip navigation link as the very first element in `<body>`:
   ```html
   <a
     href="#main-content"
     class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 ..."
   >
     Skip to main content
   </a>
   ```
3. Add `id="main-content"` to the main content wrapper `<div>` in `Layout.astro`
4. Ensure all interactive elements have visible focus styles (add `focus:ring-2 focus:ring-sky-400` where missing)

**Verify:** Tab navigation works. Skip link appears on focus.

---

### Task 18: Final Lint, Build & Verify

**Steps:**

1. Run `pnpm lint:fix` — auto-fix all linting issues
2. Run `pnpm typecheck` — verify zero TypeScript errors
3. Run `pnpm format` — format all files
4. Run `pnpm build` — full production build must succeed
5. Run `pnpm preview` and manually check:
   - [ ] All pages render (/, /blog, /hireme, /external, /article/[slug])
   - [ ] JetBrains Mono font loads correctly
   - [ ] Dark mode toggle works, persists on refresh
   - [ ] Animations play on scroll, brands carousel loops seamlessly
   - [ ] SEO tags visible in page source (`<head>`)
   - [ ] `sitemap-index.xml` accessible at `/sitemap-index.xml`
   - [ ] `robots.txt` accessible at `/robots.txt`
   - [ ] Custom 404 page shows for unknown routes
   - [ ] No broken icons, images, or links
   - [ ] All `target="_blank"` links have `rel="noopener noreferrer"`
6. Commit everything with message: `feat: portfolio modernization - Astro v5, dark mode, SEO, JetBrains Mono, dev aesthetic`

---

## Dependency Reference

### Final `package.json` dependencies target:

```json
{
  "dependencies": {
    "@astrojs/solid-js": "^5.0.0",
    "@astrojs/tailwind": "^6.0.0",
    "@vercel/analytics": "^1.4.0",
    "@vercel/speed-insights": "^1.1.0",
    "astro": "^5.0.0",
    "astro-icon": "^1.0.0",
    "date-fns": "^3.0.0",
    "sharp": "^0.33.0",
    "solid-js": "^1.9.0",
    "tailwindcss": "^3.4.0"
  },
  "devDependencies": {
    "@astrojs/sitemap": "^3.0.0",
    "@tailwindcss/typography": "^0.5.0",
    "@typescript-eslint/eslint-plugin": "^8.0.0",
    "@typescript-eslint/parser": "^8.0.0",
    "eslint": "^9.0.0",
    "eslint-plugin-astro": "^1.0.0",
    "prettier": "^3.0.0",
    "prettier-plugin-astro": "^0.14.0",
    "prettier-plugin-tailwindcss": "^0.6.0",
    "sass": "^1.80.0"
  }
}
```
