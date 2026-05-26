import FadeIn from './FadeIn'
import type { Tool } from '@/lib/types'

const categoryOrder = ['Camera', 'Lens', 'Software', 'Lighting', 'Support']

interface ToolsProps {
  tools: Tool[]
}

export default function Tools({ tools }: ToolsProps) {
  const grouped = categoryOrder.reduce<Record<string, Tool[]>>((acc, cat) => {
    const items = tools.filter((t) => t.category === cat)
    if (items.length) acc[cat] = items
    return acc
  }, {})

  const uncategorized = tools.filter((t) => !categoryOrder.includes(t.category))
  if (uncategorized.length) grouped['Other'] = uncategorized

  return (
    <section aria-labelledby="tools-heading" className="section-padding">
      <div className="container-site">
        <FadeIn>
          <p className="text-label text-muted mb-4">GEAR & SOFTWARE</p>
          <h2 id="tools-heading" className="text-h1 font-display mb-12">
            Tools I Use
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {Object.entries(grouped).map(([category, items], gi) => (
            <FadeIn key={category} delay={gi * 0.1}>
              <div>
                <h3 className="text-label text-muted mb-4 border-b border-foreground/10 pb-2">
                  {category.toUpperCase()}
                </h3>
                <ul className="space-y-4">
                  {items.map((tool) => (
                    <li key={tool.name}>
                      <p className="font-semibold">{tool.name}</p>
                      <p className="text-muted text-sm mt-0.5">{tool.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
