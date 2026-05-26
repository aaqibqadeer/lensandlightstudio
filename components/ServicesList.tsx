import FadeIn from './FadeIn'
import ServiceCard from './ServiceCard'
import type { Service } from '@/lib/types'

interface ServicesListProps {
  services: Service[]
  preview?: boolean
}

export default function ServicesList({ services, preview = false }: ServicesListProps) {
  return (
    <section aria-labelledby="services-heading" className="section-padding bg-foreground/3">
      <div className="container-site">
        <FadeIn>
          <p className="text-label text-muted mb-4">SERVICES</p>
          <h2 id="services-heading" className="text-h1 font-display mb-12">
            What I Offer
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <FadeIn key={service.id} delay={i * 0.1}>
              <ServiceCard service={service} preview={preview} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
