'use client'
import { useRef } from 'react'
import type { Testimonial } from '@/lib/types'

interface TestimonialsMarqueeProps {
  testimonials: Testimonial[]
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="flex-shrink-0 w-80 md:w-96 bg-background border border-foreground/10 rounded-lg p-6 mx-4">
      {/* Stars */}
      <div className="flex gap-1 mb-4" aria-label={`${t.rating} out of 5 stars`} role="img">
        {Array.from({ length: t.rating }).map((_, i) => (
          <span key={i} className="text-foreground text-lg" aria-hidden="true">
            ★
          </span>
        ))}
      </div>
      <blockquote className="text-sm leading-relaxed mb-5">
        <p>&ldquo;{t.quote}&rdquo;</p>
      </blockquote>
      <footer className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full bg-foreground/10 flex-shrink-0 overflow-hidden"
          aria-hidden="true"
        />
        <div>
          <cite className="not-italic font-semibold text-sm block">{t.name}</cite>
          <span className="text-muted text-xs">{t.role}</span>
        </div>
      </footer>
    </div>
  )
}

export default function TestimonialsMarquee({ testimonials }: TestimonialsMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Duplicate for seamless loop
  const doubled = [...testimonials, ...testimonials]

  return (
    <section aria-labelledby="testimonials-heading" className="section-padding bg-foreground/[0.03] overflow-hidden">
      <div className="container-site mb-10">
        <p className="text-label text-muted mb-4">TESTIMONIALS</p>
        <h2 id="testimonials-heading" className="text-h1 font-display">
          What Clients Say
        </h2>
      </div>

      <div
        ref={containerRef}
        className="relative"
        onMouseEnter={() => {
          if (containerRef.current) {
            const track = containerRef.current.querySelector<HTMLDivElement>('.marquee-track')
            if (track) track.style.animationPlayState = 'paused'
          }
        }}
        onMouseLeave={() => {
          if (containerRef.current) {
            const track = containerRef.current.querySelector<HTMLDivElement>('.marquee-track')
            if (track) track.style.animationPlayState = 'running'
          }
        }}
      >
        <div
          className="marquee-track flex animate-marquee"
          style={{ width: 'max-content' }}
          aria-hidden="false"
        >
          {doubled.map((t, i) => (
            <TestimonialCard key={`${t.id}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
