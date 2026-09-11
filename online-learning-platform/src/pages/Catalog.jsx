import { Link } from 'react-router'

// Placeholder route shell for Phase 2. Search, filters, the cohort grid,
// the empty state, and the mobile filter drawer land here in units 2–5.
export default function Catalog() {
  return (
    <main className="bg-anchor-bg">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <h1 className="text-3xl font-semibold tracking-tight text-anchor-text sm:text-4xl">
          Browse all cohorts.
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-anchor-text-muted">
          Search, category filters, and start-date filters are on the way.
          Until then, the featured cohorts on the homepage are the full list.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block text-sm font-semibold text-anchor-action underline-offset-4 transition-colors hover:text-anchor-action-hover hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
        >
          Back to homepage
        </Link>
      </div>
    </main>
  )
}
