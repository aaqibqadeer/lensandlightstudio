'use client'
import Image from 'next/image'
import { BLUR_DATA_URL } from '@/lib/utils'
import type { Project } from '@/lib/types'

interface ProjectTileProps {
  project: Project
}

export default function ProjectTile({ project }: ProjectTileProps) {
  return (
    <article
      aria-labelledby={`project-${project.id}-title`}
      className="group relative overflow-hidden rounded-lg aspect-[4/3] cursor-default"
    >
      <Image
        src={project.cover}
        alt={project.coverAlt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/50 transition-colors duration-300" />

      {/* Info — visible on hover */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
        <h3
          id={`project-${project.id}-title`}
          className="font-display font-bold text-2xl text-background"
        >
          {project.title}
        </h3>
        <p className="text-label text-background/70 mt-1">{project.year}</p>
      </div>

      {/* Always-visible title on mobile (no hover) */}
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-foreground/70 to-transparent md:hidden">
        <h3
          className="font-display font-bold text-xl text-background"
          aria-hidden="true"
        >
          {project.title}
        </h3>
        <p className="text-label text-background/70">{project.year}</p>
      </div>
    </article>
  )
}
