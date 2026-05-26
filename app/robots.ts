import type { MetadataRoute } from 'next'
import { getSiteConfig } from '@/lib/getContent'

export default function robots(): MetadataRoute.Robots {
  const { seo } = getSiteConfig()
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${seo.url}/sitemap.xml`,
  }
}
