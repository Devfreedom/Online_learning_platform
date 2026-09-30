import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { cohortDetails } from '../../data/cohorts'
import { courseDetails } from '../../data/courseDetails'
import { formatDate, formatMonthDay } from '../../utils/formatDate'
import { useAuth } from '../../hooks/useAuth'
import { getCourseProgress } from '../../utils/learningStore'

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'ongoing', label: 'Ongoing' },
  { id: 'completed', label: 'Completed' },
]

const STATUS_STYLE = {
  ongoing: 'bg-anchor-action/10 text-anchor-action',
  completed: 'bg-anchor-success/10 text-anchor-success',
}

const BAR_STYLE = {
  ongoing: 'bg-anchor-action',
  completed: 'bg-anchor-success',
}

function CohortCard({ cohort, userId }) {
  const details = courseDetails[cohort.courseSlug]
  const isCompleted = cohort.status === 'completed'
  const live = getCourseProgress(cohort.courseSlug, cohort.title, userId)
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-anchor-border bg-anchor-surface">
      <img
        src={cohort.image}
        alt={cohort.imageAlt}
        className="aspect-[16/8] w-full object-cover"
      />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-md bg-anchor-bg px-2 py-0.5 text-xs font-semibold text-anchor-text-muted ring-1 ring-anchor-border">
            {cohort.category}
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${STATUS_STYLE[cohort.status]}`}
          >
            {cohort.status}
          </span>
        </div>

        <h3 className="mt-3 text-base font-semibold text-anchor-text">
          {cohort.title}
        </h3>
        <p className="mt-1 text-sm text-anchor-text-muted">
          Instructor {cohort.instructor}
        </p>

        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-xs text-anchor-text-muted">Starts</dt>
            <dd className="mt-0.5 font-medium text-anchor-text">
              {formatDate(cohort.startDate)}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-anchor-text-muted">Duration</dt>
            <dd className="mt-0.5 font-medium text-anchor-text">
              {details?.duration ?? '—'}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="text-xs text-anchor-text-muted">Next session</dt>
            <dd className="mt-0.5 font-medium text-anchor-text">
              {cohort.nextSession
                ? `${cohort.nextSession.day} · ${formatMonthDay(cohort.nextSession.date)} · ${cohort.nextSession.time}`
                : 'Cohort complete'}
            </dd>
          </div>
        </dl>

        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-anchor-text-muted">
            <span>Progress</span>
            <span className="font-semibold text-anchor-text">{cohort.progress}%</span>
          </div>
          <div
            className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-anchor-bg"
            role="progressbar"
            aria-valuenow={cohort.progress}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label={`${cohort.title} progress`}
          >
            <div
              className={`h-full rounded-full ${BAR_STYLE[cohort.status]}`}
              style={{ width: `${cohort.progress}%` }}
            />
          </div>
        </div>

        <Link
          to={isCompleted ? '/certificates' : `/learn/${cohort.courseSlug}`}
          className="mt-5 rounded-lg bg-anchor-action px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-anchor-action-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
        >
          {isCompleted ? 'View certificate' : 'Continue'}
        </Link>
      </div>
    </article>
  )
}

export default function MyCohorts() {
  const [tab, setTab] = useState('all')

  const filtered = useMemo(() => {
    if (tab === 'all') return cohortDetails
    return cohortDetails.filter((cohort) => cohort.status === tab)
  }, [tab])

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-anchor-text sm:text-3xl">
          My Cohorts
        </h1>
        <p className="mt-1.5 text-anchor-text-muted">
          Every cohort you&apos;re enrolled in, past and present.
        </p>
      </header>

      <div
        role="tablist"
        aria-label="Filter cohorts"
        className="flex gap-1 rounded-lg border border-anchor-border bg-anchor-surface p-1"
      >
        {TABS.map((item) => {
          const active = tab === item.id
          const count =
            item.id === 'all'
              ? cohortDetails.length
              : cohortDetails.filter((cohort) => cohort.status === item.id).length
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(item.id)}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action ${
                active
                  ? 'bg-anchor-action text-white'
                  : 'text-anchor-text-muted hover:text-anchor-text'
              }`}
            >
              {item.label}{' '}
              <span className={active ? 'text-white/70' : 'text-anchor-text-muted'}>
                ({count})
              </span>
            </button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-anchor-border bg-anchor-surface px-6 py-16 text-center">
          <p className="text-sm text-anchor-text-muted">
            No cohorts in this view yet.
          </p>
        </div>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((cohort) => (
            <li key={cohort.id}>
              <CohortCard cohort={cohort} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
