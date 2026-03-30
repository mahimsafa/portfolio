// Review type for testimonials
export type Review = {
  name: string;
  gender: "F" | "M";
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
  image?: string;
  type?: "website" | "article";
  publishedDate?: Date;
  tags?: string[];
};

// Navigation link type
export type NavLink = {
  href: string;
  label: string;
};
