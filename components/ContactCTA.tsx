import FadeIn from './FadeIn'
import ContactForm from './ContactForm'
import type { ContactPageData, ContactInfo, SocialLink } from '@/lib/types'

interface ContactCTAProps {
  data: ContactPageData
  contact: ContactInfo
  social: SocialLink[]
}

export default function ContactCTA({ data, contact, social }: ContactCTAProps) {
  return (
    <section aria-labelledby="cta-heading" className="section-padding bg-foreground text-background">
      <div className="container-site max-w-3xl">
        <FadeIn>
          <p className="text-label text-background/50 mb-4">{data.eyebrow.toUpperCase()}</p>
          <h2 id="cta-heading" className="text-h1 font-display mb-4">
            {data.formHeading}
          </h2>
          <p className="text-background/70 mb-10 text-lg">{data.formIntro}</p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <ContactForm data={data} contact={contact} social={social} compact />
        </FadeIn>
      </div>
    </section>
  )
}
