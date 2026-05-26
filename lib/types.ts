// ─── Site ─────────────────────────────────────────────────────────────────────

export interface SeoMeta {
  title: string
  description: string
  url: string
  ogImage?: string
}

export interface SiteTheme {
  background: string
  foreground: string
  accent: string
  muted: string
}

export interface SiteConfig {
  name: string
  tagline: string
  location: string
  timezone: string
  logoText: string
  seo: SeoMeta
  theme: SiteTheme
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export interface NavItem {
  label: string
  href: string
}

// ─── Social ───────────────────────────────────────────────────────────────────

export interface SocialLink {
  platform: string
  url: string
}

// ─── Contact ──────────────────────────────────────────────────────────────────

export interface ContactInfo {
  generalEmail: string
  generalPhone: string
  collabEmail: string
  collabPhone: string
  address: string
  budgetOptions: string[]
}

// ─── Home ─────────────────────────────────────────────────────────────────────

export interface HeroData {
  image: string
  imageAlt: string
  displayName: string
  tags: string[]
  role: string
}

export interface Pillar {
  title: string
  body: string
}

export interface AboutTeaserData {
  eyebrow: string
  heading: string
  body: string
  ctaLabel: string
  ctaHref: string
  pillars: Pillar[]
}

export interface StatItem {
  value: string
  label: string
}

export interface HomeData {
  hero: HeroData
  aboutTeaser: AboutTeaserData
  stats: StatItem[]
  benefitStatement: string
  featuredProjectIds: string[]
  mobileBookingBar: {
    enabled: boolean
    label: string
    href: string
  }
}

// ─── Services ─────────────────────────────────────────────────────────────────

export interface Service {
  id: string
  title: string
  category: string
  description: string
  deliverables: string[]
  priceFrom: string
  keywords: string[]
  image: string
  imageAlt: string
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export interface Project {
  id: string
  title: string
  year: number
  cover: string
  coverAlt: string
  gallery: string[]
  description: string
  featured: boolean
}

export interface ProjectsConfig {
  enableLightbox: boolean
  items: Project[]
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export interface Testimonial {
  id: string
  rating: number
  quote: string
  name: string
  role: string
  avatar: string
}

// ─── About ────────────────────────────────────────────────────────────────────

export interface WhatIDo {
  title: string
  body: string
  stats: StatItem[]
}

export interface Tool {
  name: string
  description: string
  category: string
}

export interface Award {
  title: string
  organization: string
  project: string
  year: number
}

export interface BrandTestimonial {
  quote: string
  name: string
  role: string
}

export interface AboutData {
  eyebrow: string
  headline: string
  body: string
  image: string
  imageAlt: string
  whatIDo: WhatIDo
  tools: Tool[]
  clients: string[]
  brandTestimonials: BrandTestimonial[]
  awards: Award[]
}

// ─── Contact Page ─────────────────────────────────────────────────────────────

export interface ContactPageData {
  eyebrow: string
  heading: string
  intro: string
  formHeading: string
  formIntro: string
  fields: {
    name: string
    email: string
    budget: string
    description: string
    submit: string
  }
  successMessage: string
  successSubMessage: string
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export interface FooterData {
  tagline: string
  role: string
  rights: string
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export interface ContentJSON {
  site: SiteConfig
  navigation: NavItem[]
  social: SocialLink[]
  contact: ContactInfo
  home: HomeData
  services: Service[]
  projects: ProjectsConfig
  testimonials: Testimonial[]
  about: AboutData
  contactPage: ContactPageData
  footer: FooterData
}
