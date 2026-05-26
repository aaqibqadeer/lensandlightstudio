import type { ContentJSON, Project, Service } from './types'
import contentJson from '../data/content.json'

// JSON is bundled at build time by Next.js via resolveJsonModule.
// Cast once so every helper below is fully typed.
const raw = contentJson as unknown as ContentJSON

export function getContent(): ContentJSON {
  return raw
}

export const getSiteConfig = () => getContent().site
export const getNavigation = () => getContent().navigation
export const getSocial = () => getContent().social
export const getContactInfo = () => getContent().contact
export const getHomePage = () => getContent().home
export const getServicesPage = () => getContent().services
export const getProjectsPage = () => getContent().projects
export const getTestimonials = () => getContent().testimonials
export const getAboutPage = () => getContent().about
export const getContactPage = () => getContent().contactPage
export const getFooter = () => getContent().footer

export function getProjectById(id: string): Project | undefined {
  return getContent().projects.items.find((p) => p.id === id)
}

export function getFeaturedProjects(): Project[] {
  const { home, projects } = getContent()
  return home.featuredProjectIds
    .map((id) => projects.items.find((p) => p.id === id))
    .filter((p): p is Project => p !== undefined)
}

export function getServiceById(id: string): Service | undefined {
  return getContent().services.find((s) => s.id === id)
}
