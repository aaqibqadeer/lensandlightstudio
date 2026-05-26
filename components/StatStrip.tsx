import FadeIn from './FadeIn'
import type { StatItem } from '@/lib/types'

interface StatStripProps {
  stats: StatItem[]
  body: string
}

export default function StatStrip({ stats, body }: StatStripProps) {
  return (
    <section aria-labelledby="stats-heading" className="section-padding">
      <div className="container-site">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Stats */}
          <div>
            <FadeIn>
              <p className="text-label text-muted mb-8">BY THE NUMBERS</p>
            </FadeIn>
            <ul className="grid grid-cols-3 gap-6" role="list">
              {stats.map((stat, i) => (
                <FadeIn key={stat.label} delay={i * 0.1} direction="up">
                  <li className="text-center md:text-left" role="listitem">
                    <p className="font-display font-bold text-4xl md:text-5xl leading-none mb-2">
                      {stat.value}
                    </p>
                    <p className="text-label text-muted">{stat.label}</p>
                  </li>
                </FadeIn>
              ))}
            </ul>
          </div>

          {/* Body */}
          <FadeIn delay={0.2}>
            <p
              id="stats-heading"
              className="text-xl md:text-2xl leading-relaxed text-muted font-light"
            >
              {body}
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
