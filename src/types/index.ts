// Review type for testimonials
export type Review = {
  name: string;
  gender: 'F' | 'M';
  role?: string;
  ref?: string;
  body: string;
  img?: string;
  company?: string;
};

// External appearance type
export type External = {
  text: string;
  link: string;
  location?: string;
  date?: string;
};

// Brand/client logo type
export type Brand = {
  link: string;
  logo: string;
};

// Individual skill
export type SkillCategory = {
  name: string;
  skills: string[];
};

// SEO component props (for Task 13)
export type SEOProps = {
  title: string;
  description: string;
  image?: string | undefined;
  type?: 'website' | 'article' | undefined;
  publishedDate?: Date | undefined;
  tags?: string[] | undefined;
};

// Navigation link type
export type NavLink = {
  href: string;
  label: string;
};

// Structured date as [year, month] where month is 1-indexed (1 = January)
export type YearMonth = [year: number, month: number];

// Work experience type
export type Experience = {
  company: string;
  role: string;
  /** Structured start date as [year, month] — single source of truth */
  startDate: YearMonth;
  /** Structured end date as [year, month], or null for current/ongoing */
  endDate: YearMonth | null;
  /** Display string derived from startDate/endDate — generated in data.ts */
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
