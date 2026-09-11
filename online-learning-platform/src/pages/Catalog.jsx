import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router'
import { courses } from '../data/courses'
import { courseCategories, filterCourses } from '../utils/filterCourses'
import CourseCard from '../components/ui/CourseCard'
import FilterPanel from '../components/catalog/FilterPanel'

const DEFAULT_FILTERS = {
  query: '',
  categories: [],
  availability: 'all',
  startAfter: '',
}

function activeFilterCount(filters) {
  return (
    (filters.query.trim() === '' ? 0 : 1) +
    filters.categories.length +
    (filters.availability === 'all' ? 0 : 1) +
    (filters.startAfter === '' ? 0 : 1)
  )
}

function EmptyState({ onClear }) {
  return (
    <div className="rounded-xl border border-dashed border-anchor-border bg-anchor-surface px-6 py-16 text-center">
      <h2 className="text-lg font-semibold text-anchor-text">
        No cohorts match those filters.
      </h2>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-anchor-text-muted">
        Try a different search term, fewer categories, or a wider date range.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-6 rounded-lg bg-anchor-action px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-anchor-action-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
      >
        Clear all filters
      </button>
    </div>
  )
}

export default function Catalog() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const closeButtonRef = useRef(null)

  const categories = useMemo(() => courseCategories(courses), [])
  const results = useMemo(() => filterCourses(courses, filters), [filters])
  const activeCount = activeFilterCount(filters)

  const patchFilters = (patch) => setFilters((prev) => ({ ...prev, ...patch }))
  const clearFilters = () => setFilters(DEFAULT_FILTERS)

  useEffect(() => {
    if (!drawerOpen) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setDrawerOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [drawerOpen])

  return (
    <main className="bg-anchor-bg">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight text-anchor-text sm:text-4xl">
            Browse all cohorts.
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-anchor-text-muted">
            Every upcoming cohort in one place. Search, filter, and pick a
            start date that works for you.
          </p>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <p className="text-sm text-anchor-text-muted" role="status" aria-live="polite">
            {results.length === 1 ? '1 cohort' : `${results.length} cohorts`}
            {activeCount > 0 && ` matching ${activeCount} active filter${activeCount === 1 ? '' : 's'}`}
          </p>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-anchor-border bg-anchor-surface px-4 py-2.5 text-sm font-semibold text-anchor-text transition-colors hover:border-anchor-action/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action lg:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M4 6h16M7 12h10M10 18h4" />
            </svg>
            Filters
            {activeCount > 0 && (
              <span className="grid h-5 w-5 place-items-center rounded-full bg-anchor-action text-[11px] font-bold text-white">
                {activeCount}
              </span>
            )}
          </button>
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-10">
          <aside
            aria-label="Cohort filters"
            className="hidden shrink-0 lg:block"
          >
            <div className="sticky top-24 rounded-xl border border-anchor-border bg-anchor-surface p-6">
              <FilterPanel
                filters={filters}
                categories={categories}
                onChange={patchFilters}
                onClear={clearFilters}
                idPrefix="desktop"
              />
            </div>
          </aside>

          <div>
            {results.length === 0 ? (
              <EmptyState onClear={clearFilters} />
            ) : (
              <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((course) => (
                  <li key={course.id}>
                    <CourseCard course={course} />
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-10 text-sm text-anchor-text-muted">
              Can&apos;t find the right fit?{' '}
              <Link
                to="/"
                className="font-semibold text-anchor-action underline-offset-4 transition-colors hover:text-anchor-action-hover hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
              >
                Back to homepage
              </Link>
            </p>
          </div>
        </div>
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-anchor-text/40"
            onClick={() => setDrawerOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Cohort filters"
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-anchor-bg shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-anchor-border px-5 py-4">
              <h2 className="text-base font-semibold text-anchor-text">Filters</h2>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close filters"
                className="grid h-10 w-10 place-items-center rounded-lg text-anchor-text-muted transition-colors hover:bg-anchor-border/50 hover:text-anchor-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M6 18L18 6" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-6">
              <FilterPanel
                filters={filters}
                categories={categories}
                onChange={patchFilters}
                onClear={clearFilters}
                idPrefix="mobile"
              />
            </div>
            <div className="border-t border-anchor-border px-5 py-4">
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="w-full rounded-lg bg-anchor-action px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-anchor-action-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
              >
                Show {results.length === 1 ? '1 cohort' : `${results.length} cohorts`}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
