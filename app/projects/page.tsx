import type { Metadata } from 'next'
import { getSiteConfig, getProjectsPage, getContactPage, getContactInfo, getSocial } from '@/lib/getContent'
import ProjectTile from '@/components/ProjectTile'
import ContactCTA from '@/components/ContactCTA'
import FadeIn from '@/components/FadeIn'

export async function generateMetadata(): Promise<Metadata> {
  const site = getSiteConfig()
  return {
    title: `Projects | ${site.name}`,
    description: `A selection of portrait, editorial, commercial and documentary photography projects by ${site.name}.`,
  }
}

export default function ProjectsPage() {
  const projectsConfig = getProjectsPage()
  const contactPage = getContactPage()
  const contact = getContactInfo()
  const social = getSocial()

  return (
    <>
      {/* Page header */}
      <section aria-labelledby="projects-page-heading" className="pt-32 pb-16 bg-background">
        <div className="container-site">
          <FadeIn>
            <p className="text-label text-muted mb-4">PORTFOLIO</p>
            <h1 id="projects-page-heading" className="text-h1 font-display max-w-2xl">
              Featured Works
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-muted text-lg mt-4 max-w-xl leading-relaxed">
              A curated selection of projects spanning portraiture, editorial, commercial campaigns,
              and documentary photography.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Grid */}
      <section aria-label="Project grid" className="pb-20 bg-background">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {projectsConfig.items.map((project, i) => (
              <FadeIn key={project.id} delay={Math.min(i * 0.06, 0.4)}>
                <ProjectTile project={project} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA data={contactPage} contact={contact} social={social} />
    </>
  )
}
