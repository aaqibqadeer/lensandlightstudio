'use client'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { BLUR_DATA_URL } from '@/lib/utils'
import type { HeroData, SiteConfig } from '@/lib/types'

interface HeroProps {
  hero: HeroData
  site: SiteConfig
}

export default function Hero({ hero, site }: HeroProps) {
  const prefersReduced = useReducedMotion()

  const variants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 32 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay, ease: [0.19, 1, 0.22, 1] },
    }),
  }

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative h-screen min-h-[600px] flex flex-col overflow-hidden"
    >
      {/* Background image */}
      <Image
        src={hero.image}
        alt={hero.imageAlt}
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        className="object-cover object-center"
      />

      {/* Main gradient — dark at bottom for text, gentle in middle */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/80" />
      {/* Top vignette — dedicated dark band for nav legibility */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 to-transparent" />

      {/* Top bar — role label */}
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        custom={0}
        className="relative z-10 container-site pt-28 md:pt-36 flex items-center justify-between"
      >
        <span className="text-label text-background/80">{hero.role.toUpperCase()}</span>
        <span className="hidden md:block text-label text-background/80">
          {site.location.toUpperCase()}
        </span>
      </motion.div>

      {/* Main display name */}
      <div className="relative z-10 flex-1 flex flex-col justify-end container-site pb-6">
        <motion.h1
          id="hero-heading"
          variants={variants}
          initial="hidden"
          animate="visible"
          custom={0.15}
          className="text-display text-background font-display select-none"
        >
          {hero.displayName}
        </motion.h1>

        {/* Tags row */}
        <motion.div
          variants={variants}
          initial="hidden"
          animate="visible"
          custom={0.3}
          className="flex flex-wrap gap-2 mt-4 mb-8"
          role="list"
          aria-label="Photography specialties"
        >
          {hero.tags.map((tag) => (
            <span
              key={tag}
              role="listitem"
              className="text-label text-background border border-background/40 px-3 py-1 rounded-full"
            >
              {tag.toUpperCase()}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="relative z-10 container-site pb-8 flex justify-center"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-1">
          <span className="text-label text-background/50">SCROLL</span>
          <div className="w-px h-8 bg-background/30 animate-pulse" />
        </div>
      </motion.div>
    </section>
  )
}
