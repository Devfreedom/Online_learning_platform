import categories from '../../data/categories'

export default function CategoryBrowse() {
  return (
    <section aria-labelledby="categories-heading" className="bg-anchor-bg">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div>
          <h2
            id="categories-heading"
            className="text-2xl font-semibold tracking-tight text-anchor-text sm:text-3xl"
          >
            Explore by category.
          </h2>
          <p className="mt-2 max-w-2xl text-anchor-text-muted">
            Browse structured, cohort-based programs by discipline and find
            live-led learning that fits the way you work.
          </p>
        </div>

        <div className="mt-6 flex gap-2.5 overflow-x-auto pb-2 scroll-smooth [scrollbar-width:thin] [scrollbar-color:var(--color-anchor-border)_transparent] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-anchor-border [&::-webkit-scrollbar-track]:bg-transparent md:flex-wrap md:overflow-visible">
          {categories.map((category) => (
            <a
              key={category.slug}
              href="#courses"
              className="group inline-flex shrink-0 items-center gap-2 rounded-lg bg-anchor-surface px-4 py-2.5 text-sm font-medium text-anchor-text ring-1 ring-anchor-border transition-colors hover:bg-anchor-action hover:text-white hover:ring-anchor-action focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
            >
              {category.name}
              <span className="text-xs font-medium text-anchor-text-muted transition-colors group-hover:text-white/80">
                {category.cohortCount} cohorts
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}