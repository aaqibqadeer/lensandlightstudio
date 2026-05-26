import FadeIn from './FadeIn'
import type { Award } from '@/lib/types'

interface AwardsProps {
  awards: Award[]
}

export default function Awards({ awards }: AwardsProps) {
  return (
    <section aria-labelledby="awards-heading" className="section-padding">
      <div className="container-site">
        <FadeIn>
          <p className="text-label text-muted mb-4">RECOGNITION</p>
          <h2 id="awards-heading" className="text-h1 font-display mb-12">
            Awards
          </h2>
        </FadeIn>

        <ul className="divide-y divide-foreground/10" role="list">
          {awards.map((award, i) => (
            <FadeIn key={`${award.title}-${award.year}`} delay={i * 0.08}>
              <li className="grid sm:grid-cols-[1fr_auto] items-baseline gap-4 py-5" role="listitem">
                <div>
                  <p className="font-semibold text-lg">{award.title}</p>
                  <p className="text-muted text-sm mt-1">
                    {award.organization} — <em>{award.project}</em>
                  </p>
                </div>
                <time
                  dateTime={String(award.year)}
                  className="text-label text-muted flex-shrink-0"
                >
                  {award.year}
                </time>
              </li>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  )
}
