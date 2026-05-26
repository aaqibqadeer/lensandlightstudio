import type { Metadata } from 'next'
import {
  getSiteConfig,
  getHomePage,
  getServicesPage,
  getTestimonials,
  getContactPage,
  getContactInfo,
  getSocial,
  getFeaturedProjects,
} from '@/lib/getContent'
import Hero from '@/components/Hero'
import AboutTeaser from '@/components/AboutTeaser'
import ServicesList from '@/components/ServicesList'
import StatStrip from '@/components/StatStrip'
import TestimonialsMarquee from '@/components/TestimonialsMarquee'
import ProjectGrid from '@/components/ProjectGrid'
import ContactCTA from '@/components/ContactCTA'
import StickyBookingBar from '@/components/StickyBookingBar'

export async function generateMetadata(): Promise<Metadata> {
  const site = getSiteConfig()
  return {
    title: site.seo.title,
    description: site.seo.description,
    openGraph: {
      title: site.seo.title,
      description: site.seo.description,
      type: 'website',
      images: site.seo.ogImage ? [{ url: site.seo.ogImage }] : [],
    },
  }
}

export default function HomePage() {
  const site = getSiteConfig()
  const home = getHomePage()
  const services = getServicesPage()
  const testimonials = getTestimonials()
  const contactPage = getContactPage()
  const contact = getContactInfo()
  const social = getSocial()
  const featuredProjects = getFeaturedProjects()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Person', 'LocalBusiness'],
    '@id': site.seo.url,
    name: site.name,
    jobTitle: site.tagline,
    url: site.seo.url,
    description: site.seo.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.address,
    },
    telephone: contact.generalPhone,
    email: contact.generalEmail,
    sameAs: getSocial().map((s) => s.url),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero hero={home.hero} site={site} />
      <AboutTeaser data={home.aboutTeaser} />
      <ServicesList services={services} preview />
      <StatStrip stats={home.stats} body={home.benefitStatement} />
      <TestimonialsMarquee testimonials={testimonials} />
      <ProjectGrid
        projects={featuredProjects}
        showViewAll
        heading="Recent Portfolio"
        eyebrow="FEATURED WORK"
      />
      <ContactCTA data={contactPage} contact={contact} social={social} />

      {home.mobileBookingBar.enabled && (
        <StickyBookingBar
          label={home.mobileBookingBar.label}
          href={home.mobileBookingBar.href}
        />
      )}
    </>
  )
}
