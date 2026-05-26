import FadeIn from './FadeIn'

interface ClientsProps {
  clients: string[]
}

export default function Clients({ clients }: ClientsProps) {
  return (
    <section aria-labelledby="clients-heading" className="section-padding bg-foreground/[0.03]">
      <div className="container-site">
        <FadeIn>
          <p className="text-label text-muted mb-4">TRUSTED BY</p>
          <h2 id="clients-heading" className="text-h1 font-display mb-12">
            Selected Clients
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <ul
            className="flex flex-wrap gap-x-8 gap-y-4 items-center"
            role="list"
            aria-label="Client list"
          >
            {clients.map((client) => (
              <li
                key={client}
                className="font-display font-bold text-2xl md:text-3xl text-foreground/20 hover:text-foreground transition-colors"
                role="listitem"
              >
                {client}
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  )
}
