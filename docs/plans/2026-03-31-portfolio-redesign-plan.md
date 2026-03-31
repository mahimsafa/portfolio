# Portfolio Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign the portfolio as a minimal, single-page, recruiter-friendly resume site with responsive design across all devices.

**Architecture:** Single-page Astro site with section-based navigation. Floating side dots navigation on desktop, fixed bottom nav on mobile. Vertical timeline for experience with skill tags per role. All existing content preserved with Field Nation as new current role.

**Tech Stack:** Astro 5.0, Tailwind CSS, TypeScript, astro-icon (Iconify)

---

## Task 1: Update Data Types

**Files:**

- Modify: `src/types/index.ts`

**Step 1: Add Experience type**

Add the following type after the existing types:

```typescript
// Work experience type
export type Experience = {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  logo?: ImageMetadata;
  link?: string;
  achievements: string[];
  skills: string[];
};

// Section for navigation
export type Section = {
  id: string;
  label: string;
  icon: string;
};
```

**Step 2: Verify file saves correctly**

Run: `cat src/types/index.ts | head -60`

---

## Task 2: Update Data File with Field Nation & Experience Data

**Files:**

- Modify: `src/content/data.ts`

**Step 1: Add imports and experience data**

Add at the top of the file after existing imports:

```typescript
import type { Review, External, Brand, SkillCategory, Experience, Section } from '../types/index';

// Import company logos
import FieldNationLogo from '../assets/fieldnation-logo.svg';
import AZGroupLogo from '../assets/azgroup-logo.svg';
import FiverrLogo from '../assets/fiverr-logo.png';
import WellingtonLogo from '../assets/wellington.png';
import ByteCapsuleLogo from '../assets/bytecapsuleit.jpeg';
```

**Step 2: Add experiences array**

Add after the imports:

```typescript
export const experiences: Experience[] = [
  {
    company: 'Field Nation',
    role: 'Software Engineer',
    period: 'Dec 2024 - Present',
    current: true,
    link: 'https://fieldnation.com',
    achievements: [
      'Contributing to the breakfix initiative which is essential for company growth',
      'Delivered crucial features to enterprise clients in their new contract experience, reducing 70% of regular work errors',
      'Significant reduction in manual labor through automation and improved workflows',
    ],
    skills: [
      'PHP',
      'NestJS',
      'MySQL',
      'React Native',
      'Kafka',
      'Logstash',
      'OpenSearch',
      'Kubernetes',
      'Linear',
    ],
  },
  {
    company: 'AZ Group',
    role: 'Lead Software Developer',
    period: 'Nov 2023 - Nov 2024',
    link: 'https://www.az-group.io/butly-ai',
    achievements: [
      'Architected and led full-stack development of Butly AI, an enterprise-grade AI-powered customer support platform',
      'Designed a multi-LLM orchestration layer for contextually accurate, low-latency responses',
      'Established engineering standards, code review processes, and CI/CD pipelines',
    ],
    skills: ['TypeScript', 'AWS', 'LangChain', 'OpenAI', 'Docker', 'CI/CD', 'Node.js'],
  },
  {
    company: 'Fiverr',
    role: 'Level 2 Seller',
    period: 'Sept 2022 - Present',
    link: 'https://fiverr.com/mahimsafa',
    achievements: [
      'Delivered 50+ AWS infrastructure and full-stack engagements as a top-rated freelancer',
      'Maintained consistent 5-star rating across all projects',
      'Architected serverless solutions reducing client infrastructure costs by up to 60%',
    ],
    skills: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'Serverless', 'Node.js', 'MERN Stack'],
  },
  {
    company: 'Wellington In Your Pocket',
    role: 'Cloud Engineer',
    period: 'Jan 2023 - Sept 2023',
    link: 'https://wellingtoninyourpocket.co.nz',
    achievements: [
      'Designed and implemented scalable backend cloud infrastructure on AWS',
      'Introduced automated CI/CD pipelines cutting deployment time by over 80%',
      'Drove cloud cost optimization initiative reducing monthly AWS spend by 40%',
    ],
    skills: ['AWS', 'EC2', 'RDS', 'CloudFront', 'CI/CD', 'Terraform'],
  },
  {
    company: 'Byte Capsule Ltd.',
    role: 'Operations Lead',
    period: 'May 2020 - Nov 2022',
    link: 'https://www.bytecapsuleit.com/',
    achievements: [
      'Led operations and technical service delivery at a cybersecurity startup',
      'Conducted application security assessments and penetration testing for enterprise clients',
      'Designed cybersecurity training curricula educating over 1,000 students',
    ],
    skills: ['Penetration Testing', 'Security Auditing', 'OWASP', 'Training', 'Linux'],
  },
];
```

**Step 3: Add sections for navigation**

Add after experiences:

```typescript
export const sections: Section[] = [
  { id: 'about', label: 'About', icon: 'bi:person' },
  { id: 'experience', label: 'Experience', icon: 'bi:briefcase' },
  { id: 'skills', label: 'Skills', icon: 'bi:code-slash' },
  { id: 'clients', label: 'Clients', icon: 'bi:building' },
  { id: 'testimonials', label: 'Testimonials', icon: 'bi:chat-quote' },
  { id: 'blog', label: 'Blog', icon: 'bi:journal-text' },
  { id: 'contact', label: 'Contact', icon: 'bi:envelope' },
];
```

**Step 4: Update skillCategories to include PHP and new skills**

Update the Languages category:

```typescript
{
  name: 'Languages',
  skills: ['TypeScript', 'JavaScript', 'Node.js', 'Python', 'PHP', 'Bash'],
},
```

Add NestJS and MySQL to Backend:

```typescript
{
  name: 'Backend',
  skills: ['Express.js', 'NestJS', 'MongoDB', 'PostgreSQL', 'MySQL', 'REST APIs', 'GraphQL'],
},
```

Add Kubernetes to DevOps:

```typescript
{
  name: 'DevOps & Infrastructure',
  skills: ['Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions', 'Terraform', 'Linux'],
},
```

**Step 5: Commit changes**

```bash
git add src/types/index.ts src/content/data.ts
git commit -m "feat: add experience data structure with Field Nation role"
```

---

## Task 3: Create Field Nation Logo Asset

**Files:**

- Create: `src/assets/fieldnation-logo.svg`

**Step 1: Create a simple Field Nation logo placeholder**

Create an SVG placeholder (user can replace with actual logo):

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
</svg>
```

---

## Task 4: Create Floating Side Navigation Component

**Files:**

- Create: `src/components/SideNav.astro`

**Step 1: Create the SideNav component**

```astro
---
import { Icon } from 'astro-icon/components';
import { sections } from '../content/data';
---

<nav
  id="side-nav"
  class="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 lg:flex lg:flex-col lg:gap-3"
  aria-label="Section navigation"
>
  {
    sections.map((section) => (
      <a
        href={`#${section.id}`}
        class="group relative flex h-3 w-3 items-center justify-center"
        aria-label={`Go to ${section.label} section`}
        data-section={section.id}
      >
        <span class="absolute h-3 w-3 rounded-full border-2 border-slate-400 bg-transparent transition-all duration-200 group-hover:border-sky-400 group-hover:bg-sky-400 dark:border-slate-600 dark:group-hover:border-sky-400 dark:group-hover:bg-sky-400" />
        <span class="pointer-events-none absolute right-6 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:bg-slate-700">
          {section.label}
        </span>
      </a>
    ))
  }
</nav>

<style>
  [data-section].active span:first-child {
    @apply border-sky-400 bg-sky-400;
  }
</style>

<script>
  const sideNav = document.getElementById('side-nav');
  const navLinks = sideNav?.querySelectorAll('a[data-section]');
  const sectionIds = Array.from(navLinks || []).map((link) => link.getAttribute('data-section'));

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks?.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('data-section') === id);
        });
      }
    });
  }, observerOptions);

  sectionIds.forEach((id) => {
    const section = document.getElementById(id!);
    if (section) observer.observe(section);
  });
</script>
```

---

## Task 5: Create Mobile Bottom Navigation Component

**Files:**

- Create: `src/components/MobileNav.astro`

**Step 1: Create the MobileNav component**

```astro
---
import { Icon } from 'astro-icon/components';
import { sections } from '../content/data';
---

<nav
  id="mobile-nav"
  class="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-slate-200 bg-white/95 backdrop-blur-lg dark:border-slate-800 dark:bg-slate-900/95 lg:hidden"
  aria-label="Mobile section navigation"
>
  {
    sections.slice(0, 5).map((section) => (
      <a
        href={`#${section.id}`}
        class="flex flex-col items-center justify-center gap-1 px-3 py-2 text-slate-500 transition-colors duration-150 hover:text-sky-400 dark:text-slate-400 dark:hover:text-sky-400"
        aria-label={`Go to ${section.label} section`}
        data-mobile-section={section.id}
      >
        <Icon name={section.icon} class="h-5 w-5" />
        <span class="text-[10px] font-medium">{section.label}</span>
      </a>
    ))
  }
</nav>

<style>
  [data-mobile-section].active {
    @apply text-sky-400;
  }
</style>

<script>
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = mobileNav?.querySelectorAll('a[data-mobile-section]');
  const mobileSectionIds = Array.from(mobileLinks || []).map((link) =>
    link.getAttribute('data-mobile-section')
  );

  const mobileObserverOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0,
  };

  const mobileObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        mobileLinks?.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('data-mobile-section') === id);
        });
      }
    });
  }, mobileObserverOptions);

  mobileSectionIds.forEach((id) => {
    const section = document.getElementById(id!);
    if (section) mobileObserver.observe(section);
  });
</script>
```

---

## Task 6: Create Hero Section Component

**Files:**

- Create: `src/components/Hero.astro`

**Step 1: Create the Hero component**

```astro
---
import { Image } from 'astro:assets';
import { Icon } from 'astro-icon/components';
import DP from '../assets/mahim-dp.jpg';
---

<section
  id="about"
  class="flex min-h-[70vh] w-full flex-col items-center justify-center py-16 lg:flex-row lg:gap-16 lg:py-24"
>
  <div class="mb-8 flex-shrink-0 lg:mb-0">
    <Image
      src={DP}
      alt="Mahim Safa profile photo"
      class="h-48 w-48 rounded-2xl shadow-lg ring-4 ring-sky-400/20 transition-transform duration-300 hover:scale-105 sm:h-56 sm:w-56 lg:h-64 lg:w-64"
      width={256}
      height={256}
      format="avif"
    />
  </div>

  <div class="flex max-w-xl flex-col text-center lg:text-left">
    <h1 class="mb-2 text-3xl font-bold text-slate-900 dark:text-slate-100 sm:text-4xl lg:text-5xl">
      Mahim Safa
    </h1>
    <p class="mb-6 text-lg font-medium text-sky-400 sm:text-xl">Software Engineer</p>
    <p class="mb-8 text-sm leading-relaxed text-gray-600 dark:text-slate-400 sm:text-base">
      I'm a highly skilled developer, DevOps, and security professional with extensive experience in
      Amazon Web Services (AWS), MERN stack, React JS, and serverless architecture. My technical
      expertise, problem-solving aptitude, and adherence to industry standards enable me to provide
      exceptional service and deliver top-notch results. I'm a dedicated lifelong learner who stays
      up-to-date with the latest technologies and best practices.
    </p>

    <div class="flex items-center justify-center gap-4 lg:justify-start">
      <a
        href="https://www.linkedin.com/in/mahimsafa/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn profile"
        class="rounded-full p-2 text-slate-600 transition-colors duration-150 hover:bg-sky-100 hover:text-sky-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-sky-400"
      >
        <Icon name="bi:linkedin" class="h-6 w-6" />
      </a>
      <a
        href="https://github.com/mahimsafa"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub profile"
        class="rounded-full p-2 text-slate-600 transition-colors duration-150 hover:bg-sky-100 hover:text-sky-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-sky-400"
      >
        <Icon name="bi:github" class="h-6 w-6" />
      </a>
      <a
        href="mailto:hello@mahimsafa.com"
        aria-label="Email me"
        class="rounded-full p-2 text-slate-600 transition-colors duration-150 hover:bg-sky-100 hover:text-sky-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-sky-400"
      >
        <Icon name="bi:envelope" class="h-6 w-6" />
      </a>
      <a
        href="https://twitter.com/mahim_safa"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Twitter profile"
        class="rounded-full p-2 text-slate-600 transition-colors duration-150 hover:bg-sky-100 hover:text-sky-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-sky-400"
      >
        <Icon name="bi:twitter-x" class="h-6 w-6" />
      </a>
    </div>
  </div>
</section>
```

---

## Task 7: Create Timeline Experience Component

**Files:**

- Create: `src/components/Timeline.astro`

**Step 1: Create the Timeline component**

```astro
---
import { Icon } from 'astro-icon/components';
import { experiences } from '../content/data';
---

<section id="experience" class="w-full py-16" data-animate>
  <h2 class="mb-12 text-center text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl">
    Experience
  </h2>

  <div class="relative">
    <!-- Timeline line - hidden on mobile -->
    <div
      class="absolute left-0 top-0 hidden h-full w-0.5 bg-gradient-to-b from-sky-400 via-sky-400/50 to-transparent lg:left-8 lg:block"
    >
    </div>

    <div class="flex flex-col gap-8">
      {
        experiences.map((exp, index) => (
          <div class="relative flex flex-col lg:flex-row lg:gap-8">
            {/* Timeline dot - hidden on mobile */}
            <div class="absolute left-0 top-6 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-sky-400 bg-white dark:bg-slate-900 lg:left-8 lg:block" />

            {/* Card */}
            <div class="w-full rounded-lg border-l-4 border-sky-400 bg-slate-50 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md dark:bg-slate-800/50 lg:ml-16">
              <div class="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div class="mb-1 flex items-center gap-2">
                    <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {exp.company}
                    </h3>
                    {exp.current && (
                      <span class="rounded-full bg-sky-100 px-2 py-0.5 text-xs font-medium text-sky-600 dark:bg-sky-900/50 dark:text-sky-400">
                        Current
                      </span>
                    )}
                    {exp.link && (
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${exp.company} website`}
                        class="text-sky-400 transition-colors hover:text-sky-500"
                      >
                        <Icon name="gridicons:external" class="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  <p class="text-sm font-medium text-slate-600 dark:text-slate-400">{exp.role}</p>
                </div>
                <p class="text-sm text-slate-500 dark:text-slate-500">{exp.period}</p>
              </div>

              <ul class="mb-4 space-y-2">
                {exp.achievements.map((achievement) => (
                  <li class="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <span class="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sky-400" />
                    {achievement}
                  </li>
                ))}
              </ul>

              <div class="flex flex-wrap gap-2">
                {exp.skills.map((skill) => (
                  <span class="rounded-md bg-slate-200/70 px-2 py-1 text-xs font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))
      }
    </div>
  </div>
</section>
```

---

## Task 8: Create Skills Grid Component

**Files:**

- Create: `src/components/SkillsGrid.astro`

**Step 1: Create the SkillsGrid component**

```astro
---
import { skillCategories } from '../content/data';
---

<section id="skills" class="w-full py-16" data-animate>
  <h2 class="mb-12 text-center text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl">
    Skills
  </h2>

  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {
      skillCategories.map((category) => (
        <div class="rounded-lg bg-slate-50 p-5 transition-shadow duration-200 hover:shadow-md dark:bg-slate-800/50">
          <h3 class="mb-4 text-sm font-semibold uppercase tracking-wider text-sky-500 dark:text-sky-400">
            {category.name}
          </h3>
          <div class="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <span class="cursor-default rounded border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 transition-colors duration-150 hover:border-sky-400 hover:text-sky-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-sky-400 dark:hover:text-sky-400">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))
    }
  </div>
</section>
```

---

## Task 9: Create Clients Section Component

**Files:**

- Create: `src/components/Clients.astro`

**Step 1: Create the Clients component**

```astro
---
import { brands } from '../content/data';
---

<section id="clients" class="w-full py-16" data-animate>
  <h2 class="mb-4 text-center text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl">
    Clients
  </h2>
  <p class="mb-12 text-center text-sm text-slate-500 dark:text-slate-400">
    Trusted by clients from around the world
  </p>

  <div class="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
    {
      brands.map((brand) => (
        <a
          href={brand.link}
          target="_blank"
          rel="noopener noreferrer"
          class="group flex h-16 w-24 items-center justify-center grayscale transition-all duration-200 hover:grayscale-0 sm:h-20 sm:w-32"
        >
          <img
            src={brand.logo}
            alt="Client logo"
            class="max-h-full max-w-full object-contain opacity-60 transition-opacity duration-200 group-hover:opacity-100 dark:opacity-40 dark:group-hover:opacity-90"
            loading="lazy"
          />
        </a>
      ))
    }
  </div>
</section>
```

---

## Task 10: Create Testimonials Grid Component

**Files:**

- Create: `src/components/TestimonialsGrid.astro`

**Step 1: Create the TestimonialsGrid component**

```astro
---
import { Icon } from 'astro-icon/components';
import { review } from '../content/data';
import MaleAvatar from '../assets/avatar.svg';
import FemaleAvatar from '../assets/female-avatar.svg';
---

<section id="testimonials" class="w-full py-16" data-animate>
  <h2 class="mb-12 text-center text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl">
    Testimonials
  </h2>

  <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
    {
      review.map((item) => (
        <div class="flex flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-800/50">
          <Icon name="bi:quote" class="mb-4 h-8 w-8 text-sky-400/50 dark:text-sky-400/30" />
          <p class="mb-6 flex-grow text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            "{item.body}"
          </p>
          <div class="flex items-center gap-3">
            <img
              src={item.img || (item.gender === 'F' ? FemaleAvatar.src : MaleAvatar.src)}
              alt={`${item.name} avatar`}
              class="h-10 w-10 rounded-full object-cover"
              loading="lazy"
            />
            <div>
              <p class="font-medium text-slate-900 dark:text-slate-100">{item.name}</p>
              {(item.role || item.company) && (
                <p class="text-xs text-slate-500 dark:text-slate-400">
                  {item.role}
                  {item.role && item.company && ', '}
                  {item.company && (
                    <a
                      href={item.ref}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-sky-400 hover:underline"
                    >
                      {item.company}
                    </a>
                  )}
                </p>
              )}
            </div>
          </div>
        </div>
      ))
    }
  </div>
</section>
```

---

## Task 11: Create Blog List Component

**Files:**

- Create: `src/components/BlogList.astro`

**Step 1: Create the BlogList component**

```astro
---
import { getCollection } from 'astro:content';
import { format } from 'date-fns';

const posts = (await getCollection('blog'))
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
  .slice(0, 4);
---

<section id="blog" class="w-full py-16" data-animate>
  <h2 class="mb-4 text-center text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl">
    Latest Articles
  </h2>
  <p class="mb-12 text-center text-sm text-slate-500 dark:text-slate-400">
    Thoughts on development, cloud, and security
  </p>

  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
    {
      posts.map((post) => (
        <a
          href={`/article/${post.slug}`}
          class="group flex flex-col rounded-lg border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-sky-400 hover:shadow-md dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-sky-400"
        >
          <h3 class="mb-2 font-medium text-slate-900 transition-colors duration-150 group-hover:text-sky-400 dark:text-slate-100 dark:group-hover:text-sky-400">
            {post.data.title}
          </h3>
          <p class="mb-3 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
            {post.data.description}
          </p>
          <p class="mt-auto text-xs text-slate-400 dark:text-slate-500">
            {format(post.data.pubDate, 'MMM d, yyyy')}
          </p>
        </a>
      ))
    }
  </div>

  <div class="mt-8 text-center">
    <a
      href="/blog"
      class="inline-flex items-center gap-2 text-sm font-medium text-sky-400 transition-colors duration-150 hover:text-sky-500"
    >
      View all articles
      <span>&rarr;</span>
    </a>
  </div>
</section>
```

---

## Task 12: Create Contact Section Component

**Files:**

- Create: `src/components/Contact.astro`

**Step 1: Create the Contact component**

```astro
---
import { Icon } from 'astro-icon/components';
---

<section id="contact" class="w-full py-16" data-animate>
  <h2 class="mb-4 text-center text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl">
    Let's Connect
  </h2>
  <p class="mb-8 text-center text-sm text-slate-500 dark:text-slate-400">
    Available for freelance work and full-time opportunities
  </p>

  <div class="flex flex-col items-center">
    <a
      href="mailto:hello@mahimsafa.com"
      class="mb-8 flex items-center gap-2 rounded-lg bg-sky-400 px-6 py-3 font-medium text-white transition-colors duration-150 hover:bg-sky-500"
    >
      <Icon name="bi:envelope" class="h-5 w-5" />
      hello@mahimsafa.com
    </a>

    <div class="flex items-center gap-6">
      <a
        href="https://www.linkedin.com/in/mahimsafa/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn profile"
        class="rounded-full p-3 text-slate-500 transition-colors duration-150 hover:bg-sky-100 hover:text-sky-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-sky-400"
      >
        <Icon name="bi:linkedin" class="h-6 w-6" />
      </a>
      <a
        href="https://github.com/mahimsafa"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub profile"
        class="rounded-full p-3 text-slate-500 transition-colors duration-150 hover:bg-sky-100 hover:text-sky-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-sky-400"
      >
        <Icon name="bi:github" class="h-6 w-6" />
      </a>
      <a
        href="https://twitter.com/mahim_safa"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Twitter profile"
        class="rounded-full p-3 text-slate-500 transition-colors duration-150 hover:bg-sky-100 hover:text-sky-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-sky-400"
      >
        <Icon name="bi:twitter-x" class="h-6 w-6" />
      </a>
      <a
        href="https://www.fiverr.com/mahimsafa"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fiverr profile"
        class="rounded-full p-3 text-slate-500 transition-colors duration-150 hover:bg-sky-100 hover:text-sky-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-sky-400"
      >
        <Icon name="simple-icons:fiverr" class="h-6 w-6" />
      </a>
    </div>
  </div>
</section>
```

---

## Task 13: Update Layout for New Navigation

**Files:**

- Modify: `src/layouts/Layout.astro`

**Step 1: Import new navigation components**

Add imports after existing imports:

```astro
import SideNav from '../components/SideNav.astro'; import MobileNav from
'../components/MobileNav.astro';
```

**Step 2: Add navigation components to body**

After `<Navbar />`, add:

```astro
<SideNav />
```

Before `</body>`, add:

```astro
<MobileNav />
```

**Step 3: Add bottom padding for mobile nav**

Update the main content container to have bottom padding for mobile:

```astro
<div
  id="main-content"
  class="-mt-16 flex min-h-full max-w-5xl flex-col space-y-10 bg-white/95 px-5 pb-20 pt-16 shadow dark:bg-slate-900/95 dark:shadow-slate-800/20 md:mx-auto lg:pb-10"
>
</div>
```

---

## Task 14: Rewrite Index Page

**Files:**

- Modify: `src/pages/index.astro`

**Step 1: Complete rewrite of index page**

```astro
---
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';
import Timeline from '../components/Timeline.astro';
import SkillsGrid from '../components/SkillsGrid.astro';
import Clients from '../components/Clients.astro';
import TestimonialsGrid from '../components/TestimonialsGrid.astro';
import BlogList from '../components/BlogList.astro';
import Contact from '../components/Contact.astro';
---

<Layout
  title="About"
  description="Mahim Safa — Software Engineer specializing in AWS, DevOps, full-stack development, and AI systems. Available for freelance and full-time opportunities."
  type="website"
>
  <main class="animate-fade-in">
    <Hero />
    <Timeline />
    <SkillsGrid />
    <Clients />
    <TestimonialsGrid />
    <BlogList />
    <Contact />
  </main>
</Layout>
```

---

## Task 15: Update Navbar for Single Page

**Files:**

- Modify: `src/components/Navbar.astro`

**Step 1: Update navigation links**

Replace existing navigation links with:

```astro
---
import { Image } from 'astro:assets';
import Logo from '../assets/mahim-logo.png';
import ThemeToggle from './ThemeToggle.astro';

const isHomePage = Astro.url.pathname === '/';
---

<nav
  class="sticky top-0 z-40 h-16 max-w-5xl rounded-sm border-transparent bg-white/30 px-5 text-black shadow-sm backdrop-blur-lg dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-200 md:mx-auto"
>
  <ul class="flex h-full items-center justify-between">
    <li>
      <a href="/" class="transition-colors duration-150 ease-in hover:text-sky-400">
        <Image src={Logo} width={50} height={50} alt="Mahim Logo" />
      </a>
    </li>
    <li class="flex items-center space-x-4">
      {
        isHomePage ? (
          <>
            <a
              href="#about"
              class="hidden transition-colors duration-150 ease-in hover:text-sky-400 dark:text-slate-300 dark:hover:text-sky-400 sm:inline"
            >
              About
            </a>
            <a
              href="#experience"
              class="hidden transition-colors duration-150 ease-in hover:text-sky-400 dark:text-slate-300 dark:hover:text-sky-400 sm:inline"
            >
              Experience
            </a>
          </>
        ) : (
          <a
            href="/"
            class="transition-colors duration-150 ease-in hover:text-sky-400 dark:text-slate-300 dark:hover:text-sky-400"
          >
            Home
          </a>
        )
      }
      <a
        href="/blog"
        class="transition-colors duration-150 ease-in hover:text-sky-400 dark:text-slate-300 dark:hover:text-sky-400"
      >
        Blog
      </a>
      <a
        href="/external"
        class="transition-colors duration-150 ease-in hover:text-sky-400 dark:text-slate-300 dark:hover:text-sky-400"
      >
        External
      </a>
      <a
        href="#contact"
        class="rounded px-3 py-2 text-sky-400 ring-2 ring-sky-400 transition-all duration-150 ease-in hover:bg-sky-400 hover:text-white"
      >
        Contact
      </a>
      <ThemeToggle />
    </li>
  </ul>
</nav>
```

---

## Task 16: Update Footer

**Files:**

- Modify: `src/components/Footer.astro`

**Step 1: Simplify footer**

```astro
---

---

<footer
  class="mx-auto flex w-full max-w-5xl flex-col items-center border-t bg-white py-8 dark:border-slate-800 dark:bg-slate-900"
>
  <p class="text-sm text-slate-500 dark:text-slate-400">
    Made with <span class="text-sky-500">&hearts;</span> by Mahim Safa
  </p>
  <p class="mt-2 text-xs text-slate-400 dark:text-slate-500">
    &copy; {new Date().getFullYear()} All rights reserved.
  </p>
</footer>
```

---

## Task 17: Test and Verify

**Step 1: Run development server**

```bash
pnpm dev
```

**Step 2: Test responsiveness**

- Open browser at http://localhost:4321
- Test on mobile viewport (< 640px)
- Test on tablet viewport (640-1024px)
- Test on desktop viewport (> 1024px)
- Verify side nav appears on desktop only
- Verify bottom nav appears on mobile/tablet only
- Test smooth scrolling between sections
- Verify active section highlighting in navigation

**Step 3: Test dark mode**

- Toggle theme and verify all sections display correctly
- Check color contrast and readability

**Step 4: Run build**

```bash
pnpm build
```

Expected: Build succeeds without errors.

---

## Task 18: Final Commit

```bash
git add -A
git commit -m "feat: complete portfolio redesign with responsive single-page layout

- Add floating side navigation for desktop
- Add fixed bottom navigation for mobile
- Create vertical timeline for experience with skill tags
- Add Field Nation as current role
- Redesign all sections: Hero, Skills, Clients, Testimonials, Blog, Contact
- Fully responsive across mobile, tablet, and desktop
- Maintain existing color scheme and typography"
```

---

## Summary

This plan creates a complete redesign of the portfolio with:

1. **Single-page layout** with 7 sections
2. **Floating side dots navigation** on desktop
3. **Fixed bottom navigation** on mobile
4. **Vertical timeline** for work experience with skill tags per role
5. **Field Nation** as current role (Dec 2024 - Present)
6. **Responsive design** across all breakpoints
7. **Same colors and typography** as existing site
8. **Clean, minimal design** optimized for recruiter scanning
