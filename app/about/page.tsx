import type { Metadata } from 'next'
import Image from 'next/image'
import {
  getSiteConfig,
  getAboutPage,
  getTestimonials,
  getContactPage,
  getContactInfo,
  getSocial,
} from '@/lib/getContent'
import FadeIn from '@/components/FadeIn'
import Tools from '@/components/Tools'
import Clients from '@/components/Clients'
import Awards from '@/components/Awards'
import ContactCTA from '@/components/ContactCTA'
import { BLUR_DATA_URL } from '@/lib/utils'

export async function generateMetadata(): Promise<Metadata> {
  const site = getSiteConfig()
  return {
    title: `About | ${site.name}`,
    description: `Learn about ${site.name} — ${site.tagline} based in ${site.location}.`,
  }
}

export default function AboutPage() {
  const about = getAboutPage()
  const testimonials = getTestimonials()
  const contactPage = getContactPage()
  const contact = getContactInfo()
  const social = getSocial()

  return (
    <>
      {/* Bio */}
      <section aria-labelledby="about-heading" className="pt-32 pb-20 bg-background">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <FadeIn>
                <p className="text-label text-muted mb-4">{about.eyebrow.toUpperCase()}</p>
                <h1 id="about-heading" className="text-h1 font-display leading-tight mb-6">
                  {about.headline}
                </h1>
                <p className="text-muted text-lg leading-relaxed">{about.body}</p>
              </FadeIn>
            </div>
            <FadeIn delay={0.15}>
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                <Image
                  src={about.image}
                  alt={about.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover object-top"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* What I Do */}
      <section aria-labelledby="what-i-do-heading" className="section-padding bg-foreground text-background">
        <div className="container-site">
          <FadeIn>
            <p className="text-label text-background/50 mb-4">WHAT I DO</p>
            <h2 id="what-i-do-heading" className="text-h1 font-display mb-6">{about.whatIDo.title}</h2>
            <p className="text-background/70 text-lg leading-relaxed max-w-2xl mb-12">
              {about.whatIDo.body}
            </p>
          </FadeIn>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-8" role="list">
            {about.whatIDo.stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1}>
                <li className="border-t border-background/20 pt-5" role="listitem">
                  <p className="font-display font-bold text-4xl md:text-5xl text-accent mb-2">
                    {stat.value}
                  </p>
                  <p className="text-background/60 text-sm">{stat.label}</p>
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      <Tools tools={about.tools} />

      <Clients clients={about.clients} />

      {/* Brand testimonials */}
      <section aria-labelledby="brand-testimonials-heading" className="section-padding bg-background">
        <div className="container-site">
          <FadeIn>
            <p className="text-label text-muted mb-4">WHAT BRANDS ARE SAYING</p>
            <h2 id="brand-testimonials-heading" className="text-h1 font-display mb-12">
              Client Voices
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {about.brandTestimonials.map((bt, i) => (
              <FadeIn key={bt.name} delay={i * 0.1}>
                <figure className="bg-foreground/[0.03] rounded-lg p-6">
                  <blockquote className="text-sm leading-relaxed mb-6">
                    <p>&ldquo;{bt.quote}&rdquo;</p>
                  </blockquote>
                  <figcaption>
                    <p className="font-semibold">{bt.name}</p>
                    <p className="text-muted text-xs mt-0.5">{bt.role}</p>
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Awards awards={about.awards} />

      <ContactCTA data={contactPage} contact={contact} social={social} />
    </>
  )
}
