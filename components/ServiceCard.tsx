import Link from 'next/link'
import Image from 'next/image'
import { BLUR_DATA_URL } from '@/lib/utils'
import type { Service } from '@/lib/types'

interface ServiceCardProps {
  service: Service
  preview?: boolean
}

export default function ServiceCard({ service, preview = false }: ServiceCardProps) {
  return (
    <article
      aria-labelledby={`service-${service.id}-title`}
      className="group border border-foreground/10 rounded-lg overflow-hidden flex flex-col bg-background hover:border-foreground/30 transition-colors"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 text-label bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full">
          {service.category}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-6">
        <h3 id={`service-${service.id}-title`} className="font-display font-bold text-2xl mb-3">
          {service.title}
        </h3>

        {!preview && (
          <p className="text-muted text-sm leading-relaxed mb-5">{service.description}</p>
        )}

        {/* Deliverables */}
        <ul className="space-y-2 mb-5 flex-1" aria-label="What's included">
          {service.deliverables.map((d) => (
            <li key={d} className="flex items-start gap-2 text-sm">
              <span className="text-accent mt-0.5" aria-hidden="true">
                ✓
              </span>
              {d}
            </li>
          ))}
        </ul>

        {/* Keywords */}
        <div className="flex flex-wrap gap-2 mb-5" role="list" aria-label="Keywords">
          {service.keywords.slice(0, preview ? 4 : service.keywords.length).map((kw) => (
            <span
              key={kw}
              role="listitem"
              className="text-label bg-foreground/5 px-2 py-1 rounded text-muted"
            >
              {kw}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-foreground/10">
          <span className="font-semibold">
            Starts from{' '}
            <span className="text-xl font-bold">{service.priceFrom}</span>
          </span>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-foreground text-background text-label px-4 py-2.5 rounded-full hover:bg-accent hover:text-foreground transition-colors min-h-[44px]"
          >
            Let&apos;s Collaborate
          </Link>
        </div>
      </div>
    </article>
  )
}
