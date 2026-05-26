import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  getSiteConfig,
  getServicesPage,
  getContactPage,
  getContactInfo,
  getSocial,
} from '@/lib/getContent'
import FadeIn from '@/components/FadeIn'
import ContactCTA from '@/components/ContactCTA'
import { BLUR_DATA_URL } from '@/lib/utils'

export async function generateMetadata(): Promise<Metadata> {
  const site = getSiteConfig()
  return {
    title: `Services | ${site.name}`,
    description: `Portrait, engagement & couples, and event photography services by ${site.name}. Packages starting from $299.`,
  }
}

export default function ServicesPage() {
  const services = getServicesPage()
  const contactPage = getContactPage()
  const contact = getContactInfo()
  const social = getSocial()

  return (
    <>
      {/* Hero */}
      <section aria-labelledby="services-page-heading" className="pt-32 pb-20">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <FadeIn>
                <p className="text-label text-muted mb-4">SERVICES</p>
                <h1 id="services-page-heading" className="text-h1 font-display leading-tight mb-6">
                  Capturing Moments,<br />Crafting Memories
                </h1>
                <p className="text-muted text-lg leading-relaxed mb-8">
                  Every service is built around one principle: your images should feel as meaningful
                  in ten years as they do today.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-foreground text-background text-label px-6 py-3.5 rounded-full hover:bg-accent hover:text-foreground transition-colors"
                >
                  Book a Session
                </Link>
              </FadeIn>
            </div>
            <FadeIn delay={0.15} direction="left">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={services[0]?.image ?? '/images/hero.jpg'}
                  alt={services[0]?.imageAlt ?? 'Photography services'}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Individual services */}
      <section aria-label="Service listings" className="pb-20">
        <div className="container-site space-y-24">
          {services.map((service, i) => (
            <FadeIn key={service.id} delay={0.1}>
              <article
                aria-labelledby={`svc-${service.id}`}
                className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${i % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}
              >
                <div className={i % 2 === 1 ? 'lg:[direction:ltr]' : ''}>
                  <p className="text-label text-muted mb-3">{service.category.toUpperCase()}</p>
                  <h2 id={`svc-${service.id}`} className="font-display font-bold text-3xl md:text-4xl mb-4">
                    {service.title}
                  </h2>
                  <p className="text-muted leading-relaxed mb-6">{service.description}</p>

                  <ul className="space-y-2 mb-6" aria-label="Deliverables">
                    {service.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm">
                        <span className="text-foreground mt-0.5" aria-hidden="true">✓</span>
                        {d}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.keywords.map((kw) => (
                      <span key={kw} className="text-label bg-foreground/5 text-muted px-3 py-1 rounded-full">
                        {kw}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-6">
                    <p className="text-2xl font-bold">
                      From <span>{service.priceFrom}</span>
                    </p>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 bg-foreground text-background text-label px-6 py-3.5 rounded-full hover:bg-accent hover:text-foreground transition-colors"
                    >
                      Let&apos;s Collaborate
                    </Link>
                  </div>
                </div>

                <div className={`relative aspect-[4/3] rounded-lg overflow-hidden ${i % 2 === 1 ? 'lg:[direction:ltr]' : ''}`}>
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    className="object-cover"
                  />
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      <ContactCTA data={contactPage} contact={contact} social={social} />
    </>
  )
}
