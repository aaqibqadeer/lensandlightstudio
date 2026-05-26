import type { Metadata, Viewport } from 'next'
import { Playfair_Display } from 'next/font/google'
import { GeistSans } from 'geist/font/sans'
import { Analytics } from '@vercel/analytics/react'
import { getSiteConfig, getNavigation, getSocial, getFooter, getContactInfo } from '@/lib/getContent'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '700', '900'],
  preload: true,
})

export async function generateMetadata(): Promise<Metadata> {
  const site = getSiteConfig()
  return {
    metadataBase: new URL(site.seo.url),
    title: {
      default: site.seo.title,
      template: `%s | ${site.name}`,
    },
    description: site.seo.description,
    openGraph: {
      siteName: site.name,
      locale: 'en_US',
      type: 'website',
      images: site.seo.ogImage ? [{ url: site.seo.ogImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#F5F1E6',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const site = getSiteConfig()
  const nav = getNavigation()
  const social = getSocial()
  const footer = getFooter()
  const contact = getContactInfo()

  return (
    <html lang="en" className={`${playfair.variable} ${GeistSans.variable}`}>
      <body className="bg-background text-foreground font-body antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-foreground focus:rounded text-sm font-medium"
        >
          Skip to main content
        </a>
        <Nav site={site} nav={nav} social={social} />
        <main id="main-content">{children}</main>
        <Footer site={site} footer={footer} social={social} contact={contact} />
        <Analytics />
      </body>
    </html>
  )
}
