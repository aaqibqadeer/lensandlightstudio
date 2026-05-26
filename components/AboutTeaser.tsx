import Link from 'next/link'
import FadeIn from './FadeIn'
import type { AboutTeaserData } from '@/lib/types'

interface AboutTeaserProps {
  data: AboutTeaserData
}

export default function AboutTeaser({ data }: AboutTeaserProps) {
  return (
    <section aria-labelledby="about-teaser-heading" className="section-padding">
      <div className="container-site">
        <FadeIn>
          <p className="text-label text-muted mb-4">{data.eyebrow.toUpperCase()}</p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <FadeIn delay={0.1}>
            <h2 id="about-teaser-heading" className="text-h1 font-display leading-tight">
              {data.heading}
            </h2>
          </FadeIn>

          <div>
            <FadeIn delay={0.2}>
              <p className="text-muted leading-relaxed text-lg mb-8">{data.body}</p>
              <Link
                href={data.ctaHref}
                className="inline-flex items-center gap-2 text-label border-b-2 border-foreground pb-1 hover:border-accent hover:text-accent transition-colors group"
              >
                {data.ctaLabel.toUpperCase()}
                <span
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </FadeIn>

            <div className="grid sm:grid-cols-2 gap-6 mt-12">
              {data.pillars.map((pillar, i) => (
                <FadeIn key={pillar.title} delay={0.25 + i * 0.1}>
                  <div className="border-t-2 border-foreground pt-4">
                    <h3 className="font-semibold mb-2">{pillar.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{pillar.body}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
