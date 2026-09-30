import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router'
import { assignmentDetails } from '../../data/assignments'
import { courses } from '../../data/courses'
import { flattenLessons, getCurriculum } from '../../data/lessons'
import { sessionsByCourse } from '../../data/sessions'
import { useAuth } from '../../hooks/useAuth'
import { formatDate } from '../../utils/formatDate'
import { completedLessonIds, markLessonComplete } from '../../utils/learningStore'
import { showToast } from '../../utils/toast'

function CurriculumItem({ lessonItem, state, onSelect }) {
  const locked = state === 'locked'
  return (
    <button
      type="button"
      disabled={locked}
      onClick={() => onSelect(lessonItem.id)}
      aria-current={state === 'current' ? 'true' : undefined}
      className={`flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action ${
        state === 'current'
          ? 'bg-anchor-action text-white'
          : state === 'completed'
            ? 'text-anchor-text hover:bg-anchor-bg'
            : locked
              ? 'cursor-not-allowed text-anchor-text-muted/50'
              : 'text-anchor-text hover:bg-anchor-bg'
      }`}
    >
      <span
        aria-hidden="true"
        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-bold ${
          state === 'current'
            ? 'bg-white/20 text-white'
            : state === 'completed'
              ? 'bg-anchor-success/15 text-anchor-success'
              : 'bg-slate-200 text-slate-500'
        }`}
      >
        {state === 'completed' ? '✓' : locked ? '·' : '▸'}
      </span>
      <span className="min-w-0">
        <span className="block truncate font-medium">{lessonItem.title}</span>
        <span
          className={`mt-0.5 block text-xs ${
            state === 'current' ? 'text-white/70' : 'text-anchor-text-muted'
          }`}
        >
          {lessonItem.duration} · {lessonItem.kind}
          {locked ? ' · Locked' : ''}
        </span>
      </span>
    </button>
  )
}

export default function Learn() {
  const { slug } = useParams()
  const { user } = useAuth()
  const course = courses.find((item) => item.slug === slug)

  const weeks = useMemo(
    () => getCurriculum(slug, course?.title ?? 'Course'),
    [slug, course?.title],
  )
  const flat = useMemo(() => flattenLessons(weeks), [weeks])

  const [completed, setCompleted] = useState(() =>
    completedLessonIds(slug, user?.id),
  )
  const [activeId, setActiveId] = useState(null)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    setCompleted(completedLessonIds(slug, user?.id))
    setActiveId(null)
    setMobileNavOpen(false)
  }, [slug, user?.id])

  const completedSet = useMemo(() => new Set(completed), [completed])

  // Sequential unlock: first lesson always open; each next opens after previous completes.
  const unlockedIds = useMemo(() => {
    const ids = new Set()
    for (let i = 0; i < flat.length; i += 1) {
      if (i === 0) ids.add(flat[i].id)
      else if (completedSet.has(flat[i - 1].id)) ids.add(flat[i].id)
      else break
    }
    return ids
  }, [flat, completedSet])

  const currentId = useMemo(() => {
    if (activeId && unlockedIds.has(activeId)) return activeId
    return flat.find((l) => !completedSet.has(l.id) && unlockedIds.has(l.id))?.id ?? flat[0]?.id
  }, [activeId, flat, completedSet, unlockedIds])

  const activeIndex = flat.findIndex((l) => l.id === currentId)
  const active = flat[activeIndex] ?? flat[0]
  const prev = activeIndex > 0 ? flat[activeIndex - 1] : null
  const next = activeIndex >= 0 && activeIndex < flat.length - 1 ? flat[activeIndex + 1] : null
  const nextUnlocked = next ? unlockedIds.has(next.id) || completedSet.has(next.id) : false

  const percent = flat.length === 0 ? 0 : Math.round((completedSet.size / flat.length) * 100)
  const session = sessionsByCourse[slug]
  const linkedAssignment = assignmentDetails.find((a) => a.id === active?.assignmentId)

  if (!course || !active) {
    return (
      <div className="space-y-4">
        <Link
          to="/my-cohorts"
          className="text-sm font-semibold text-anchor-action underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
        >
          ← My Cohorts
        </Link>
        <div className="rounded-xl border border-anchor-border bg-anchor-surface p-6">
          <h1 className="text-xl font-semibold text-anchor-text">Course not found</h1>
          <p className="mt-1 text-sm text-anchor-text-muted">
            This learning prototype supports enrolled cohort slugs only.
          </p>
        </div>
      </div>
    )
  }

  const handleSelect = (id) => {
    setActiveId(id)
    setMobileNavOpen(false)
  }

  const handleComplete = () => {
    if (completedSet.has(active.id)) {
      showToast('Lesson already completed.', 'info')
      return
    }
    const nextCompleted = markLessonComplete(slug, active.id, user?.id)
    setCompleted(nextCompleted)
    showToast('Lesson completed. Next lesson unlocked.')
    if (next) setActiveId(next.id)
  }

  const lessonState = (lessonItem, index) => {
    if (completedSet.has(lessonItem.id)) return 'completed'
    if (lessonItem.id === currentId) return 'current'
    if (unlockedIds.has(lessonItem.id)) return 'upcoming'
    // Allow peeking one ahead label but keep locked
    return index === 0 || unlockedIds.has(lessonItem.id) ? 'upcoming' : 'locked'
  }

  const curriculum = (
    <nav aria-label="Curriculum" className="space-y-4">
      {weeks.map((week) => (
        <div key={week.week}>
          <p className="px-3 text-xs font-semibold uppercase tracking-wide text-anchor-text-muted">
            {week.title}
          </p>
          <div className="mt-1.5 space-y-1">
            {week.lessons.map((lessonItem) => {
              const idx = flat.findIndex((l) => l.id === lessonItem.id)
              return (
                <CurriculumItem
                  key={lessonItem.id}
                  lessonItem={lessonItem}
                  state={lessonState(lessonItem, idx)}
                  onSelect={handleSelect}
                />
              )
            })}
          </div>
        </div>
      ))}
    </nav>
  )

  return (
    <div className="space-y-5">
      <Link
        to="/my-cohorts"
        className="text-sm font-semibold text-anchor-action underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
      >
        ← My Cohorts
      </Link>

      <header className="rounded-xl border border-anchor-border bg-anchor-surface p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-anchor-text-muted">
          {course.category}
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-anchor-text">
          {course.title}
        </h1>
        <div className="mt-3 flex items-center gap-3">
          <div
            className="h-2 flex-1 overflow-hidden rounded-full bg-anchor-bg"
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label={`${course.title} progress`}
          >
            <div className="h-full rounded-full bg-anchor-action" style={{ width: `${percent}%` }} />
          </div>
          <span className="shrink-0 text-sm font-bold text-anchor-text">{percent}%</span>
        </div>
        <p className="mt-1.5 text-xs text-anchor-text-muted">
          {completedSet.size} of {flat.length} lessons complete · progress saved in this browser
        </p>
        <button
          type="button"
          onClick={() => setMobileNavOpen((v) => !v)}
          aria-expanded={mobileNavOpen}
          className="mt-4 w-full rounded-lg border border-anchor-border px-4 py-2.5 text-sm font-semibold text-anchor-action lg:hidden"
        >
          {mobileNavOpen ? 'Hide curriculum' : 'Show curriculum'}
        </button>
      </header>

      <div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)_260px]">
        {/* Left curriculum — desktop */}
        <aside className="hidden rounded-xl border border-anchor-border bg-anchor-surface p-4 lg:block">
          {curriculum}
        </aside>

        {/* Mobile curriculum */}
        {mobileNavOpen && (
          <div className="rounded-xl border border-anchor-border bg-anchor-surface p-4 lg:hidden">
            {curriculum}
          </div>
        )}

        {/* Main content */}
        <article className="min-w-0 space-y-5">
          <section className="rounded-xl border border-anchor-border bg-anchor-surface p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-anchor-text-muted">
              {active.weekTitle} · {active.duration}
            </p>
            <h2 className="mt-1 text-xl font-semibold text-anchor-text">{active.title}</h2>

            <div
              className="mt-4 grid aspect-video place-items-center rounded-xl bg-anchor-primary text-center"
              role="img"
              aria-label={`Video placeholder for ${active.title}`}
            >
              <div className="px-6">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-white/10 text-lg text-white">
                  ▶
                </span>
                <p className="mt-3 text-sm font-semibold text-white">Lesson video placeholder</p>
                <p className="mt-1 text-xs text-blue-100/60">
                  Prototype — replay, transcript and captions would live here.
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-anchor-text">{active.description}</p>

            <h3 className="mt-5 text-sm font-semibold text-anchor-text">Resources</h3>
            <ul className="mt-2 space-y-1.5">
              {active.resources.map((r) => (
                <li key={r.label}>
                  <a
                    href={r.href}
                    onClick={(e) => e.preventDefault()}
                    className="text-sm font-medium text-anchor-action underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
                  >
                    {r.label} →
                  </a>
                </li>
              ))}
            </ul>

            {linkedAssignment && (
              <div className="mt-5 rounded-lg bg-anchor-accent/10 px-4 py-3 ring-1 ring-anchor-accent/30">
                <p className="text-sm font-semibold text-anchor-text">
                  Linked assignment: {linkedAssignment.title}
                </p>
                <p className="mt-0.5 text-xs text-anchor-text-muted">
                  Due {formatDate(linkedAssignment.dueDate)} · {linkedAssignment.effort} ·{' '}
                  <Link to="/assignments" className="font-semibold text-anchor-action underline-offset-4 hover:underline">
                    Open in Assignments
                  </Link>
                </p>
              </div>
            )}

            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={handleComplete}
                disabled={completedSet.has(active.id)}
                className={`flex-1 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action ${
                  completedSet.has(active.id)
                    ? 'cursor-default bg-anchor-success'
                    : 'bg-anchor-action hover:bg-anchor-action-hover'
                }`}
              >
                {completedSet.has(active.id) ? '✓ Completed' : 'Mark as complete'}
              </button>
            </div>

            <div className="mt-3 flex gap-2">
              <button
                type="button"
                disabled={!prev}
                onClick={() => prev && handleSelect(prev.id)}
                className="flex-1 rounded-lg border border-anchor-border px-4 py-2 text-sm font-semibold text-anchor-text transition-colors hover:border-anchor-action/40 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← Previous
              </button>
              <button
                type="button"
                disabled={!next || !nextUnlocked}
                title={next && !nextUnlocked ? 'Complete this lesson to unlock the next one' : undefined}
                onClick={() => next && handleSelect(next.id)}
                className="flex-1 rounded-lg border border-anchor-border px-4 py-2 text-sm font-semibold text-anchor-text transition-colors hover:border-anchor-action/40 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          </section>
        </article>

        {/* Cohort info */}
        <aside className="space-y-4">
          <section className="rounded-xl border border-anchor-border bg-anchor-surface p-5">
            <h3 className="text-sm font-semibold text-anchor-text">Next live session</h3>
            {session ? (
              <div className="mt-3 space-y-1.5 text-sm">
                <p className="font-semibold text-anchor-text">{session.courseTitle}</p>
                <p className="text-xs text-anchor-text-muted">{session.cohort} cohort</p>
                <p className="text-anchor-text">
                  {session.day}, {formatDate(session.date)}
                </p>
                <p className="text-anchor-text-muted">{session.time}</p>
                <p className="text-xs text-anchor-text-muted">
                  Instructor · <span className="font-semibold text-anchor-text">{session.instructorName}</span>
                </p>
                <button
                  type="button"
                  onClick={() => showToast('Meeting link is a prototype placeholder.', 'info')}
                  className="mt-3 w-full rounded-lg bg-anchor-action px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-anchor-action-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
                >
                  Join session
                </button>
              </div>
            ) : (
              <p className="mt-2 text-sm text-anchor-text-muted">No upcoming session for this course.</p>
            )}
          </section>

          <section className="rounded-xl border border-anchor-success/30 bg-anchor-success/5 p-5">
            <h3 className="text-sm font-semibold text-anchor-text">Your pace</h3>
            <p className="mt-1 text-xs leading-relaxed text-anchor-text-muted">
              Finish the current lesson to unlock the next one. Stuck? Bring one
              question to the live session.
            </p>
          </section>
        </aside>
      </div>
    </div>
  )
}
