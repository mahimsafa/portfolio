# Portfolio Redesign - Design Document

**Date:** March 31, 2026  
**Goal:** Redesign portfolio as a minimal, recruiter-friendly resume site with responsive design

---

## Overview

A single-page, minimal & clean portfolio optimized for recruiter scanning. Maintains existing sky blue accent (`#38bdf8`) on slate backgrounds with JetBrains Mono typography.

**Target Audience:** Recruiters and hiring managers  
**Primary Role:** Software Engineer  
**Current Company:** Field Nation (Dec 2024 - Present)

---

## Tech Stack (Unchanged)

- Astro 5.0
- Tailwind CSS
- TypeScript
- astro-icon (Iconify)

---

## Color Palette (Unchanged)

| Usage        | Light Mode  | Dark Mode   | Hex                   |
| ------------ | ----------- | ----------- | --------------------- |
| Background   | `slate-50`  | `slate-950` | `#f8fafc` / `#020617` |
| Cards        | `white`     | `slate-900` | `#ffffff` / `#0f172a` |
| Accent       | `sky-400`   | `sky-400`   | `#38bdf8`             |
| Primary Text | `slate-900` | `slate-200` | `#0f172a` / `#e2e8f0` |
| Muted Text   | `gray-500`  | `slate-400` | `#6b7280` / `#94a3b8` |

---

## Typography

- **Font Family:** JetBrains Mono (monospace)
- **Headings:** Bold, large sizes
- **Body:** Regular weight

---

## Responsive Breakpoints

| Device  | Width      | Columns     |
| ------- | ---------- | ----------- |
| Mobile  | < 640px    | 1 column    |
| Tablet  | 640-1024px | 2 columns   |
| Desktop | > 1024px   | Full layout |

---

## Section Structure

### 1. Navigation - Floating Side Dots

**Desktop (> 1024px):**

- Fixed position on right side, vertically centered
- Small dots indicating sections
- Sky blue for active section
- Labels appear on hover
- Smooth scroll on click

**Tablet/Mobile (< 1024px):**

- Fixed bottom navbar with section icons
- Horizontal layout
- Current section highlighted

### 2. Hero/About Section

**Content:**

- Profile photo (existing mahim-dp.jpg)
- Name: "Mahim Safa"
- Title: "Software Engineer"
- Bio paragraph (existing content)
- Social icons: LinkedIn, GitHub, Email, Twitter

**Desktop Layout:**

- 2 columns: Photo left (40%), Text right (60%)
- Photo max-width: 280px

**Mobile Layout:**

- Single column, stacked
- Photo centered, max-width: 200px
- Text centered below

### 3. Experience Section - Vertical Timeline

**Content per role:**

1. **Field Nation** - Software Engineer (Dec 2024 - Present)
   - Contributing to breakfix initiative essential for company growth
   - Delivered crucial features to enterprise clients reducing 70% errors
   - Significant reduction in manual labor through automation
   - Skills: PHP, NestJS, MySQL, React Native, Kafka, OpenSearch, Kubernetes, Linear

2. **AZ Group** - Lead Software Developer (Nov 2023 - Nov 2024)
   - Led development of Butly AI (AI-powered customer support)
   - Designed multi-LLM orchestration layer
   - Established CI/CD pipelines and engineering standards
   - Skills: TypeScript, AWS, LangChain, OpenAI, Docker, CI/CD

3. **Fiverr** - Level 2 Seller (Sept 2022 - Present)
   - 50+ AWS infrastructure and full-stack engagements
   - 5-star rating with serverless solutions
   - Skills: AWS Lambda, API Gateway, DynamoDB, Serverless, Node.js

4. **Wellington In Your Pocket** - Cloud Engineer (Jan 2023 - Sept 2023)
   - Backend cloud infrastructure on AWS
   - 80% deployment time reduction via CI/CD
   - 40% cloud cost optimization
   - Skills: AWS, CI/CD, Terraform, Cost Optimization

5. **Byte Capsule Ltd.** - Operations Lead (May 2020 - Nov 2022)
   - Cybersecurity startup leadership
   - Application security assessments
   - Trained 1,000+ students
   - Skills: Penetration Testing, Security Auditing, OWASP, Training

**Desktop Layout:**

- Timeline line on left with sky blue dots
- Cards on right with company, role, dates, bullets, skill tags

**Mobile Layout:**

- No timeline line
- Full-width cards with left border accent (sky blue)
- Stacked vertically

### 4. Skills Section - Icon Grid

**Categories:**

- Cloud & AWS: EC2, Lambda, S3, DynamoDB, ECS, CloudFront, API Gateway
- Languages: TypeScript, JavaScript, Python, Node.js, PHP, Bash
- Frontend: React, Next.js, Tailwind CSS, Astro, HTML5, CSS3
- Backend: Express.js, NestJS, MongoDB, PostgreSQL, MySQL, REST, GraphQL
- DevOps: Docker, Kubernetes, CI/CD, GitHub Actions, Terraform, Linux
- Security: Penetration Testing, Security Auditing, OWASP
- AI & LLM: LangChain, OpenAI API, RAG Systems, Prompt Engineering

**Desktop Layout:** 4 columns  
**Tablet Layout:** 3 columns  
**Mobile Layout:** 2 columns

### 5. Clients/Projects Section

**Clients:**

- MathPlusKids (https://www.mathpluskids.com/)
- Neithedu (https://neithedu.com/)
- Impactoverse (https://www.impactoverse.com/)
- Naila Store Paris (https://nailastoreparis.com/)
- Abaya Dress Paris (https://abayadressparis.com/)

**Desktop Layout:** 5 logos in a row  
**Tablet Layout:** 3 logos per row  
**Mobile Layout:** 2-3 logos per row

### 6. Testimonials Section

**Content:** 4 existing testimonials with avatar, quote, name, title

**Desktop Layout:** 2-column grid  
**Mobile Layout:** Single column, full-width cards

### 7. Blog Section

**Content:** Existing blog posts with title and date

**Layout:** Simple list or 2-column cards (responsive)

### 8. Contact Section

**Content:**

- Email: hello@mahimsafa.com
- Social links: LinkedIn, GitHub, Twitter, Fiverr

**Layout:** Centered on all devices

---

## Animations

- Fade-in-up on scroll for sections (Intersection Observer)
- Hover effects on cards, buttons, social icons
- Smooth scroll for navigation
- Respects `prefers-reduced-motion`

---

## Accessibility

- Semantic HTML structure
- Skip-to-content link
- Aria labels on all interactive elements
- Keyboard navigation support
- Focus-visible outlines
- Sufficient color contrast

---

## Files to Modify/Create

1. `src/pages/index.astro` - Complete rewrite as single-page
2. `src/components/SideNav.astro` - New floating side navigation
3. `src/components/MobileNav.astro` - New mobile bottom navigation
4. `src/components/Hero.astro` - New hero/about section
5. `src/components/Timeline.astro` - New experience timeline
6. `src/components/SkillsGrid.astro` - New skills grid
7. `src/components/Clients.astro` - Simplified clients section
8. `src/components/TestimonialsGrid.astro` - New testimonials grid
9. `src/components/BlogList.astro` - New blog section
10. `src/components/Contact.astro` - New contact section
11. `src/content/data.ts` - Update with Field Nation experience
12. `src/layouts/Layout.astro` - Update for new navigation

---

## Pages to Keep

- `/blog` - Blog listing page
- `/article/[slug]` - Individual blog posts
- `/hireme` - Can redirect to contact section or keep
- `/external` - Speaking engagements (keep as separate page)
- `/404` - Error page

---

## Success Criteria

1. Single-page scrollable portfolio
2. Fully responsive on mobile, tablet, desktop
3. Floating side nav on desktop, bottom nav on mobile
4. Vertical timeline for experience with skill tags
5. Clean, minimal design optimized for recruiter scanning
6. All existing information preserved
7. Field Nation added as current role
8. Fast loading, accessible, SEO-friendly
