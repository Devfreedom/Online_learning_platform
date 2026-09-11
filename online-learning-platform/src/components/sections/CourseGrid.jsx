import { courses } from '../../data/courses'
import CourseCard from '../ui/CourseCard'

export default function CourseGrid() {
  return (
    <section
      id="courses"
      aria-labelledby="courses-heading"
      className="scroll-mt-24 border-y border-anchor-border bg-anchor-surface"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-lg bg-anchor-bg px-3 py-1.5 ring-1 ring-anchor-border">
            <span className="h-1.5 w-1.5 rounded-full bg-anchor-accent" aria-hidden="true" />
            <span className="text-sm font-medium text-anchor-text-muted">Featured cohorts</span>
          </div>
          <h2
            id="courses-heading"
            className="mt-4 text-3xl font-semibold tracking-tight text-anchor-text sm:text-4xl"
          >
            Cohorts starting soon.
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-anchor-text-muted">
            Upcoming live learning experiences with capped cohorts, weekly
            sessions, and practical projects. Pick a start date that works for
            you and learn with a small group.
          </p>
        </div>

        <ul className="mt-12 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {courses.slice(0, 4).map((course, index) => (
            <li key={course.id} className={index === 3 ? 'lg:col-start-2' : ''}>
              <CourseCard course={course} />
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-anchor-action transition-colors hover:text-anchor-action-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-anchor-action"
          >
            Browse all cohorts
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}