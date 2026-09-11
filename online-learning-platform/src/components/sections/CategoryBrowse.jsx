const CATEGORIES = [
  {
    name: 'Engineering',
    description: 'Build and ship production software',
    cohortCount: 8,
  },
  {
    name: 'Data & AI',
    description: 'Work confidently with data and models',
    cohortCount: 6,
  },
  {
    name: 'Design',
    description: 'Craft interfaces and design systems',
    cohortCount: 5,
  },
  {
    name: 'Product',
    description: 'Lead outcomes, not just backlogs',
    cohortCount: 4,
  },
]

export default function CategoryBrowse() {
  return (
    <section
      aria-labelledby="categories-heading"
      className="border-y border-anchor-border bg-anchor-surface"
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="flex items-baseline justify-between gap-6">
          <h2 id="categories-heading" className="text-lg font-semibold tracking-tight text-anchor-text">
            Browse by discipline
          </h2>
          <a
            href="#courses"
            className="text-sm font-medium text-anchor-action transition-colors hover:text-anchor-action-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-anchor-action"
          >
            View all courses
          </a>
        </div>

        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((category) => (
            <li key={category.name}>
              <a
                href="#courses"
                className="group flex items-center justify-between gap-4 rounded-lg border border-anchor-border bg-anchor-bg px-4 py-3.5 transition-colors hover:border-anchor-action/40 hover:bg-anchor-surface"
              >
                <span>
                  <span className="block text-sm font-semibold text-anchor-text">
                    {category.name}
                  </span>
                  <span className="mt-0.5 block text-xs text-anchor-text-muted">
                    {category.description}
                  </span>
                </span>
                <span className="shrink-0 rounded-md bg-anchor-surface px-2 py-1 text-xs font-semibold text-anchor-text-muted ring-1 ring-anchor-border group-hover:text-anchor-action">
                  {category.cohortCount} cohorts
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}