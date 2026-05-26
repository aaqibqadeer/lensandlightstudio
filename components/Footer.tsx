import Link from 'next/link'
import type { SiteConfig, SocialLink, FooterData, ContactInfo } from '@/lib/types'

interface FooterProps {
  site: SiteConfig
  footer: FooterData
  social: SocialLink[]
  contact: ContactInfo
}

export default function Footer({ site, footer, social, contact }: FooterProps) {
  return (
    <footer className="bg-foreground text-background">
      <div className="container-site pt-16 pb-8">
        {/* Wordmark */}
        <p
          className="text-display font-display leading-none mb-6 overflow-hidden"
          aria-label={site.name}
        >
          {site.name.toUpperCase()}
        </p>

        <div className="border-t border-background/10 pt-8 grid md:grid-cols-3 gap-8 mb-8">
          {/* Tagline */}
          <div className="md:col-span-2">
            <p className="text-background/70 max-w-md leading-relaxed">{footer.tagline}</p>
            <p className="text-label text-background/40 mt-2">{footer.role}</p>
          </div>

          {/* Contact quick links */}
          <div>
            <p className="text-label text-background/40 mb-3">Get in touch</p>
            <a
              href={`mailto:${contact.generalEmail}`}
              className="block text-background/80 hover:text-accent transition-colors mb-1"
            >
              {contact.generalEmail}
            </a>
            <a
              href={`tel:${contact.generalPhone.replace(/\s/g, '')}`}
              className="block text-background/80 hover:text-accent transition-colors"
            >
              {contact.generalPhone}
            </a>
          </div>
        </div>

        <div className="border-t border-background/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Social links */}
          <nav aria-label="Social media links">
            <ul className="flex gap-6" role="list">
              {social.map((s) => (
                <li key={s.platform}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-label text-background/50 hover:text-accent transition-colors"
                  >
                    {s.platform}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-6">
            <p className="text-label text-background/40">{footer.rights}</p>
            <a
              href="#main-content"
              className="text-label text-background/50 hover:text-accent transition-colors"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
