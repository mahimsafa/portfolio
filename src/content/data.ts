import type {
  Review,
  External,
  Brand,
  SkillCategory,
  Experience,
  Section,
  YearMonth,
} from '../types/index';

// ─── Period display helper ────────────────────────────────────────────────────
const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function formatPeriod(start: YearMonth, end: YearMonth | null): string {
  const startStr = `${MONTH_NAMES[start[1] - 1]} ${start[0]}`;
  const endStr = end ? `${MONTH_NAMES[end[1] - 1]} ${end[0]}` : 'Present';
  return `${startStr} - ${endStr}`;
}

// ─── Experiences ──────────────────────────────────────────────────────────────
// startDate: [year, month]  (month is 1-indexed)
// endDate:   [year, month] | null  (null = ongoing / Present)

export const experiences: Experience[] = [
  {
    company: 'Field Nation',
    role: 'Software Engineer',
    startDate: [2025, 12],
    endDate: null,
    period: formatPeriod([2025, 12], null),
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
    startDate: [2023, 11],
    endDate: [2025, 11],
    period: formatPeriod([2023, 11], [2025, 11]),
    link: 'https://www.az-group.io/butly-ai',
    achievements: [
      'Architected and led full-stack development of Butly AI, an enterprise-grade AI-powered customer support platform',
      'Designed a multi-LLM orchestration layer for contextually accurate, low-latency responses',
      'Established engineering standards, code review processes, and CI/CD pipelines',
    ],
    skills: ['TypeScript', 'AWS', 'LangChain', 'OpenAI', 'Docker', 'CI/CD', 'Node.js'],
  },
  {
    company: 'Wellington In Your Pocket',
    role: 'Cloud Engineer',
    startDate: [2023, 1],
    endDate: [2023, 9],
    period: formatPeriod([2023, 1], [2023, 9]),
    link: 'https://wellingtoninyourpocket.co.nz',
    achievements: [
      'Designed and implemented scalable backend cloud infrastructure on AWS',
      'Introduced automated CI/CD pipelines cutting deployment time by over 80%',
      'Drove cloud cost optimization initiative reducing monthly AWS spend by 40%',
    ],
    skills: ['AWS', 'EC2', 'RDS', 'CloudFront', 'CI/CD', 'Terraform'],
  },
  {
    company: 'Fiverr',
    role: 'Level 2 Seller',
    startDate: [2022, 9],
    endDate: null,
    period: formatPeriod([2022, 9], null),
    link: 'https://fiverr.com/mahimsafa',
    achievements: [
      'Delivered 50+ AWS infrastructure and full-stack engagements as a top-rated freelancer',
      'Maintained consistent 5-star rating across all projects',
      'Architected serverless solutions reducing client infrastructure costs by up to 60%',
    ],
    skills: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'Serverless', 'Node.js', 'MERN Stack'],
  },
 
  {
    company: 'Byte Capsule Ltd.',
    role: 'Operations Lead',
    startDate: [2020, 5],
    endDate: [2022, 11],
    period: formatPeriod([2020, 5], [2022, 11]),
    link: 'https://www.bytecapsuleit.com/',
    achievements: [
      'Led operations and technical service delivery at a cybersecurity startup',
      'Conducted application security assessments and penetration testing for enterprise clients',
      'Designed cybersecurity training curricula educating over 1,000 students',
    ],
    skills: ['Penetration Testing', 'Security Auditing', 'OWASP', 'Training', 'Linux'],
  },
];

export const sections: Section[] = [
  { id: 'about', label: 'About', icon: 'bi:person' },
  { id: 'experience', label: 'Experience', icon: 'bi:briefcase' },
  { id: 'skills', label: 'Skills', icon: 'bi:code-slash' },
  { id: 'clients', label: 'Clients', icon: 'bi:building' },
  { id: 'testimonials', label: 'Testimonials', icon: 'bi:chat-quote' },
  { id: 'blog', label: 'Blog', icon: 'bi:journal-text' },
  { id: 'contact', label: 'Contact', icon: 'bi:envelope' },
];

export const review: Review[] = [
  {
    name: 'Adrienginesty',
    gender: 'M',
    img: 'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/f32a8711abdd34c703676b626769ac99-1662107048358/a741f295-2c50-4b7b-ae80-e9089b0fd44a.jpg',
    body: 'Amazing experience! Mahim did an excellent job at designing a serverless architecture for an existing front-end and back-end project and migrate it to AWS. I really appreciated his expertise, communication skills and willingness to help even more by offering a Zoom session to help configure and answer my questions. Highly recommended!',
  },
  {
    name: 'James Sheen',
    gender: 'M',
    img: 'https://avatars.githubusercontent.com/u/3286804?v=4',
    ref: 'https://impactoverse.com',
    body: 'Mahim worked closely with me to understand my needs and deliver a working solution. Very impressed and recommended!',
  },
  {
    name: 'Melkyas',
    gender: 'M',
    body: 'Very professional and helpful. He has excellent knowledge and experience on all AWS services. He did full stack serverless app for me on AWS and its amazing and he communicated with every step, will work with him again!',
  },
  {
    name: 'Noleen Mariappen',
    gender: 'F',
    img: 'https://www.impactoverse.com/assets/advisor1-d574f9b2.png',
    role: 'Co-Founder/CEO',
    ref: 'https://impactoverse.com',
    company: 'Impactoverse',
    body: 'Really skilled, committed and hard working. Highly recommended. Will continue to work together',
  },
];

export const external: External[] = [
  {
    text: 'Speaker at Bangladesh University ob Business and Technology webinar on Linux',
    link: 'https://www.facebook.com/BUBTOfficial/posts/pfbid0c6txg7vJZHcZpufhofziYQC4PtsWz5i9mN7965C6SXec2sTP387JFyLFpSB5L3Gal',
    location: 'Online',
    date: '10-07-2021',
  },
  {
    text: 'Speaker at Brac University webinar on Cyber Security',
    link: 'https://www.bracu.ac.bd/news/webinar-fundamentals-cyber-security',
    location: 'Online',
    date: '30-06-2021',
  },
];

export const brands: Brand[] = [
  {
    link: 'https://www.mathpluskids.com/',
    logo: 'https://www.mathpluskids.com/images/logo.svg',
  },
  {
    link: 'https://neithedu.com/',
    logo: 'https://www.neithedu.com/neitheduLogo.png',
  },
  {
    link: 'https://www.impactoverse.com/',
    logo: 'https://www.impactoverse.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fblack.453c9090.png&w=256&q=75',
  },
  {
    link: 'https://nailastoreparis.com/',
    logo: 'https://nailastoreparis.com/wp-content/uploads/2023/01/Naila-Store-1024x797.png',
  },
  {
    link: 'https://abayadressparis.com/',
    logo: 'https://abayadressparis.com/wp-content/uploads/2021/12/Logo-simple-website.jpg',
  },
];

export const skillCategories: SkillCategory[] = [
  {
    name: 'Cloud & AWS',
    skills: [
      'EC2',
      'ECS',
      'Lambda',
      'API Gateway',
      'DynamoDB',
      'S3',
      'CloudFront',
      'Serverless Architecture',
      'IAM',
      'VPC',
    ],
  },
  {
    name: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'Node.js', 'Python', 'PHP', 'Bash'],
  },
  {
    name: 'Frontend',
    skills: ['React', 'Next.js', 'Astro', 'HTML5', 'CSS3', 'Tailwind CSS'],
  },
  {
    name: 'Backend',
    skills: ['Express.js', 'NestJS', 'MongoDB', 'PostgreSQL', 'MySQL', 'REST APIs', 'GraphQL'],
  },
  {
    name: 'DevOps & Infrastructure',
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions', 'Terraform', 'Linux'],
  },
  {
    name: 'Security',
    skills: ['Application Security', 'Penetration Testing', 'Security Auditing', 'OWASP'],
  },
  {
    name: 'AI & LLM',
    skills: ['LLM Integration', 'Prompt Engineering', 'OpenAI API', 'RAG Systems', 'LangChain'],
  },
];
