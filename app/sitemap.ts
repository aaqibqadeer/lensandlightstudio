import type { MetadataRoute } from 'next'
import { getSiteConfig } from '@/lib/getContent'

export default function sitemap(): MetadataRoute.Sitemap {
  const { seo } = getSiteConfig()
  const base = seo.url

  const pages = [
    { path: '', priority: 1.0, changeFrequency: 'monthly' as const },
    { path: '/projects', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.8, changeFrequency: 'yearly' as const },
  ]

  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))
}
