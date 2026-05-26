import type { Metadata } from 'next'
import {
  getSiteConfig,
  getContactPage,
  getContactInfo,
  getSocial,
} from '@/lib/getContent'
import FadeIn from '@/components/FadeIn'
import ContactForm from '@/components/ContactForm'
import LiveClock from '@/components/LiveClock'

export async function generateMetadata(): Promise<Metadata> {
  const site = getSiteConfig()
  return {
    title: `Contact | ${site.name}`,
    description: `Get in touch with ${site.name} to discuss your photography project. Based in ${site.location}.`,
  }
}

export default function ContactPage() {
  const site = getSiteConfig()
  const contactPage = getContactPage()
  const contact = getContactInfo()
  const social = getSocial()

  return (
    <main>
      <div className="pt-32 section-padding">
        <div className="container-site">
          {/* Page heading */}
          <FadeIn>
            <p className="text-label text-muted mb-4">{contactPage.eyebrow.toUpperCase()}</p>
            <h1 className="text-h1 font-display mb-4">{contactPage.heading}</h1>
            <p className="text-muted text-lg max-w-xl mb-16 leading-relaxed">{contactPage.intro}</p>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Contact info */}
            <FadeIn delay={0.1}>
              <div className="space-y-10">
                {/* General inquiries */}
                <div>
                  <h2 className="font-semibold text-lg mb-4 border-b border-foreground/10 pb-3">
                    General Inquiries
                  </h2>
                  <a
                    href={`mailto:${contact.generalEmail}`}
                    className="block text-muted hover:text-foreground transition-colors mb-2"
                  >
                    {contact.generalEmail}
                  </a>
                  <a
                    href={`tel:${contact.generalPhone.replace(/\s/g, '')}`}
                    className="block text-muted hover:text-foreground transition-colors"
                  >
                    {contact.generalPhone}
                  </a>
                </div>

                {/* Collaborations */}
                <div>
                  <h2 className="font-semibold text-lg mb-4 border-b border-foreground/10 pb-3">
                    Collaborations
                  </h2>
                  <a
                    href={`mailto:${contact.collabEmail}`}
                    className="block text-muted hover:text-foreground transition-colors mb-2"
                  >
                    {contact.collabEmail}
                  </a>
                  <a
                    href={`tel:${contact.collabPhone.replace(/\s/g, '')}`}
                    className="block text-muted hover:text-foreground transition-colors"
                  >
                    {contact.collabPhone}
                  </a>
                </div>

                {/* Address + clock */}
                <div>
                  <h2 className="font-semibold text-lg mb-4 border-b border-foreground/10 pb-3">
                    Studio Address
                  </h2>
                  <address className="not-italic text-muted leading-relaxed">
                    {contact.address}
                  </address>
                  <p className="text-label text-muted mt-3">
                    <LiveClock timezone={site.timezone} location={site.location} />
                  </p>
                </div>

                {/* Social */}
                <div>
                  <h2 className="font-semibold text-lg mb-4 border-b border-foreground/10 pb-3">
                    Follow Along
                  </h2>
                  <nav aria-label="Social media">
                    <ul className="flex flex-col gap-2" role="list">
                      {social.map((s) => (
                        <li key={s.platform}>
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted hover:text-foreground transition-colors"
                          >
                            {s.platform} →
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            </FadeIn>

            {/* Form */}
            <FadeIn delay={0.2}>
              <div>
                <h2 className="font-display font-bold text-2xl mb-2">{contactPage.formHeading}</h2>
                <p className="text-muted mb-8">{contactPage.formIntro}</p>
                <ContactForm data={contactPage} contact={contact} social={social} />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </main>
  )
}
