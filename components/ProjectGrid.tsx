import Link from 'next/link'
import FadeIn from './FadeIn'
import ProjectTile from './ProjectTile'
import type { Project } from '@/lib/types'

interface ProjectGridProps {
  projects: Project[]
  showViewAll?: boolean
  heading?: string
  eyebrow?: string
}

export default function ProjectGrid({
  projects,
  showViewAll = false,
  heading = 'Selected Works',
  eyebrow = 'PORTFOLIO',
}: ProjectGridProps) {
  if (projects.length === 0) return null

  return (
    <section aria-labelledby="projects-heading" className="section-padding bg-background">
      <div className="container-site">
        <div className="flex items-end justify-between mb-12">
          <FadeIn>
            <p className="text-label text-muted mb-4">{eyebrow}</p>
            <h2 id="projects-heading" className="text-h1 font-display">
              {heading}
            </h2>
          </FadeIn>
          {showViewAll && (
            <FadeIn delay={0.1}>
              <Link
                href="/projects"
                className="hidden md:inline-flex items-center gap-2 text-label border-b-2 border-foreground pb-1 hover:border-accent hover:text-accent transition-colors group"
              >
                VIEW ALL PROJECTS
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </Link>
            </FadeIn>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {projects.map((project, i) => (
            <FadeIn key={project.id} delay={i * 0.08}>
              <ProjectTile project={project} />
            </FadeIn>
          ))}
        </div>

        {showViewAll && (
          <FadeIn delay={0.2}>
            <div className="mt-10 text-center md:hidden">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-label border-b-2 border-foreground pb-1 hover:border-accent hover:text-accent transition-colors"
              >
                VIEW ALL PROJECTS →
              </Link>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  )
}
