import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { calendarEvents } from '../../data/cohorts'
import { courses } from '../../data/courses'
import { sessionsByCourse } from '../../data/sessions'
import { formatDate } from '../../utils/formatDate'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const TYPE_STYLE = {
  session: 'bg-anchor-action',
  deadline: 'bg-anchor-accent',
  milestone: 'bg-anchor-success',
}

const TYPE_LABEL = {
  session: 'Live session',
  deadline: 'Deadline',
  milestone: 'Milestone',
}

const COURSE_SLUG_BY_COHORT = {
  'Product Strategy': 'product-strategy-in-practice',
  'Applied AI': 'applied-ai-for-product-teams',
  'High-Trust Teams': 'leading-high-trust-teams',
  Marketing: 'marketing-systems-that-scale',
}

function instructorForEvent(event) {
  const slug = COURSE_SLUG_BY_COHORT[event.cohort]
  const session = slug ? sessionsByCourse[slug] : null
  if (session) return session.instructorName
  const course = courses.find((item) => item.slug === slug)
  return course?.instructor ?? null
}

function cohortLinkForEvent(event) {
  const slug = COURSE_SLUG_BY_COHORT[event.cohort]
  if (event.type === 'session' && slug) return { to: `/learn/${slug}`, label: 'View lesson' }
  return { to: '/my-cohorts', label: 'View cohort' }
}
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function toISO(year, month, day) {
  const pad = (value) => String(value).padStart(2, '0')
  return `${year}-${pad(month + 1)}-${pad(day)}`
}

export default function Calendar() {
  const [view, setView] = useState({ year: 2026, month: 9 })
  const [selected, setSelected] = useState('2026-10-13')

  const eventsByDate = useMemo(() => {
    const map = new Map()
    calendarEvents.forEach((event) => {
      const list = map.get(event.date) ?? []
      list.push(event)
      map.set(event.date, list)
    })
    return map
  }, [])

  const firstWeekday = new Date(view.year, view.month, 1).getDay()
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate()
  const cells = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  const shiftMonth = (delta) => {
    setView((prev) => {
      const date = new Date(prev.year, prev.month + delta, 1)
      return { year: date.getFullYear(), month: date.getMonth() }
    })
  }

  const selectedEvents = eventsByDate.get(selected) ?? []

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-anchor-text sm:text-3xl">
          Calendar
        </h1>
        <p className="mt-1.5 text-anchor-text-muted">
          Live sessions, deadlines and milestones in one schedule.
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <section
          aria-label="Monthly calendar"
          className="rounded-xl border border-anchor-border bg-anchor-surface p-5 sm:p-6"
        >
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-anchor-text">
              {MONTH_NAMES[view.month]} {view.year}
            </h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => shiftMonth(-1)}
                aria-label="Previous month"
                className="grid h-9 w-9 place-items-center rounded-lg border border-anchor-border text-anchor-text transition-colors hover:border-anchor-action/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => shiftMonth(1)}
                aria-label="Next month"
                className="grid h-9 w-9 place-items-center rounded-lg border border-anchor-border text-anchor-text transition-colors hover:border-anchor-action/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-7 gap-1" role="row">
            {WEEKDAYS.map((day) => (
              <span
                key={day}
                className="py-1 text-center text-xs font-semibold text-anchor-text-muted"
              >
                {day}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, index) => {
              if (day === null) {
                return <span key={`pad-${index}`} aria-hidden="true" />
              }
              const iso = toISO(view.year, view.month, day)
              const events = eventsByDate.get(iso) ?? []
              const isSelected = iso === selected
              return (
                <button
                  key={iso}
                  type="button"
                  onClick={() => setSelected(iso)}
                  aria-pressed={isSelected}
                  aria-label={`${formatDate(iso)}${events.length > 0 ? `, ${events.length} event${events.length === 1 ? '' : 's'}` : ''}`}
                  className={`flex min-h-11 flex-col items-center justify-center gap-1 rounded-lg px-1 py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action sm:min-h-14 ${
                    isSelected
                      ? 'bg-anchor-action font-semibold text-white'
                      : 'text-anchor-text hover:bg-anchor-bg'
                  }`}
                >
                  <span>{day}</span>
                  {events.length > 0 && (
                    <span className="flex gap-0.5" aria-hidden="true">
                      {events.slice(0, 3).map((event) => (
                        <span
                          key={event.id}
                          className={`h-1.5 w-1.5 rounded-full ${
                            isSelected ? 'bg-white' : TYPE_STYLE[event.type]
                          }`}
                        />
                      ))}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          <ul className="mt-4 flex flex-wrap items-center gap-4 text-xs text-anchor-text-muted">
            <li className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-anchor-action" aria-hidden="true" /> Live session
            </li>
            <li className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-anchor-accent" aria-hidden="true" /> Deadline
            </li>
            <li className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-anchor-success" aria-hidden="true" /> Milestone
            </li>
          </ul>
        </section>

        <section
          aria-label="Selected day events"
          aria-live="polite"
          className="h-fit rounded-xl border border-anchor-border bg-anchor-surface p-5 sm:p-6"
        >
          <h2 className="font-semibold text-anchor-text">{formatDate(selected)}</h2>
          {selectedEvents.length === 0 ? (
            <p className="mt-3 text-sm text-anchor-text-muted">
              Nothing scheduled on this day. Pick a highlighted date to see
              sessions, deadlines and milestones.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {selectedEvents.map((event) => (
                <li
                  key={event.id}
                  className="rounded-lg border border-anchor-border px-4 py-3"
                >
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold text-white ${TYPE_STYLE[event.type]}`}
                  >
                    {TYPE_LABEL[event.type]}
                  </span>
                  <p className="mt-2 text-sm font-semibold text-anchor-text">
                    {event.title}
                  </p>
                  <p className="mt-0.5 text-xs text-anchor-text-muted">
                    {event.cohort}
                    {event.time ? ` · ${event.time}` : ''}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <p className="text-xs text-anchor-text-muted">
        Prototype schedule for demonstration.
      </p>
    </div>
  )
}
