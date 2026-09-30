import { useMemo, useState } from 'react'
import { assignmentDetails } from '../../data/cohorts'
import { courses } from '../../data/courses'
import { formatDate } from '../../utils/formatDate'
import {
  loadSubmittedAssignmentDates,
  loadSubmittedAssignmentIds,
  saveSubmittedAssignmentDate,
  saveSubmittedAssignmentIds,
  todayISO,
} from '../../utils/learningStore'
import { useAuth } from '../../hooks/useAuth'
import { showToast } from '../../utils/toast'

const TABS = [
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'submitted', label: 'Submitted' },
  { id: 'completed', label: 'Completed' },
]

const STATE_STYLE = {
  upcoming: 'bg-anchor-action/10 text-anchor-action',
  submitted: 'bg-anchor-accent/15 text-amber-700',
  completed: 'bg-anchor-success/10 text-anchor-success',
}

function instructorFor(assignment) {
  const course = courses.find((item) => item.slug === assignment.courseSlug)
  return course?.instructor ?? 'Instructor'
}

function loadSubmittedIds() {
  return loadSubmittedAssignmentIds()
}

function saveSubmittedIds(ids) {
  saveSubmittedAssignmentIds(undefined, ids)
}

function effectiveState(assignment, submittedIds) {
  if (assignment.seededState === 'completed') return 'completed'
  if (submittedIds.includes(assignment.id) || assignment.seededState === 'submitted') {
    return 'submitted'
  }
  return 'upcoming'
}

function submittedOnFor(assignment, submittedDates) {
  if (assignment.submittedDate) return assignment.submittedDate
  return submittedDates[assignment.id] ?? null
}

function StatusChip({ state }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${STATE_STYLE[state]}`}
    >
      {state}
    </span>
  )
}

function DetailView({ assignment, state, submittedOn, onBack, onSubmit }) {
  const [draft, setDraft] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!draft.trim()) {
      setError('Add your submission link or notes before submitting.')
      return
    }
    onSubmit(assignment.id)
  }

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="text-sm font-semibold text-anchor-action underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
      >
        ← All assignments
      </button>

      <header className="rounded-xl border border-anchor-border bg-anchor-surface p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-anchor-text-muted">
            {assignment.cohort} · Instructor {instructorFor(assignment)} · Due{' '}
            {formatDate(assignment.dueDate)}
          </p>
          <StatusChip state={state} />
        </div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-anchor-text">
          {assignment.title}
        </h1>
        <p className="mt-2 leading-relaxed text-anchor-text-muted">
          {assignment.overview}
        </p>
        <p className="mt-3 text-sm text-anchor-text-muted">
          {assignment.points} points · About {assignment.effort}
        </p>
      </header>

      <section className="rounded-xl border border-anchor-border bg-anchor-surface p-6">
        <h2 className="font-semibold text-anchor-text">Instructions</h2>
        <ol className="mt-3 grid gap-2.5">
          {assignment.instructions.map((step, index) => (
            <li key={step} className="flex items-start gap-3 text-sm leading-relaxed">
              <span
                aria-hidden="true"
                className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-anchor-action/10 text-xs font-bold text-anchor-action"
              >
                {index + 1}
              </span>
              <span className="text-anchor-text">{step}</span>
            </li>
          ))}
        </ol>
        <p className="mt-4 rounded-lg bg-anchor-bg px-4 py-3 text-sm text-anchor-text ring-1 ring-anchor-border">
          <span className="font-semibold">Deliverable: </span>
          {assignment.deliverable}
        </p>
      </section>

      {state === 'upcoming' && (
        <section className="rounded-xl border border-anchor-border bg-anchor-surface p-6">
          <h2 className="font-semibold text-anchor-text">Submit your work</h2>
          <p className="mt-1 text-sm text-anchor-text-muted">
            Paste a link to your work or add submission notes. Prototype only —
            nothing leaves your browser.
          </p>
          <label htmlFor="submission-draft" className="sr-only">
            Submission link or notes
          </label>
          <textarea
            id="submission-draft"
            rows={3}
            value={draft}
            onChange={(event) => {
              setDraft(event.target.value)
              setError('')
            }}
            placeholder="e.g. https://docs.example.com/my-brief"
            className="mt-3 block w-full rounded-lg border border-anchor-border bg-anchor-surface px-4 py-2.5 text-sm text-anchor-text placeholder:text-anchor-text-muted/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
          />
          {error && (
            <p role="alert" className="mt-1.5 text-sm text-anchor-error">
              {error}
            </p>
          )}
          <button
            type="button"
            onClick={handleSubmit}
            className="mt-4 rounded-lg bg-anchor-action px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-anchor-action-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
          >
            Submit assignment
          </button>
        </section>
      )}

      {state === 'submitted' && (
        <section className="rounded-xl border border-anchor-accent/40 bg-anchor-accent/5 p-6">
          <h2 className="font-semibold text-anchor-text">Submitted</h2>
          <p className="mt-1 text-sm text-anchor-text-muted">
            {submittedOn
              ? `Submitted on ${formatDate(submittedOn)}. Awaiting instructor feedback.`
              : 'Submitted. Awaiting instructor feedback.'}
          </p>
        </section>
      )}

      {state === 'completed' && (
        <section className="rounded-xl border border-anchor-success/30 bg-anchor-success/5 p-6">
          <h2 className="font-semibold text-anchor-text">
            Completed · {assignment.score}/{assignment.points}
          </h2>
          {assignment.feedback && (
            <p className="mt-2 text-sm leading-relaxed text-anchor-text">
              <span className="font-semibold">Instructor feedback: </span>
              {assignment.feedback}
            </p>
          )}
        </section>
      )}
    </div>
  )
}

export default function Assignments() {
  const { user } = useAuth()
  const [tab, setTab] = useState('upcoming')
  const [selectedId, setSelectedId] = useState(null)
  const [submittedIds, setSubmittedIds] = useState(() =>
    loadSubmittedAssignmentIds(user?.id),
  )
  const [submittedDates, setSubmittedDates] = useState(() =>
    loadSubmittedAssignmentDates(user?.id),
  )

  const withState = useMemo(
    () =>
      assignmentDetails.map((assignment) => ({
        ...assignment,
        state: effectiveState(assignment, submittedIds),
        submittedOn: submittedOnFor(assignment, submittedDates),
      })),
    [submittedIds, submittedDates],
  )

  const filtered = withState.filter((assignment) => assignment.state === tab)
  const selected = withState.find((assignment) => assignment.id === selectedId)

  const handleSubmit = (id) => {
    const next = [...submittedIds, id]
    const iso = todayISO()
    setSubmittedIds(next)
    saveSubmittedAssignmentIds(user?.id, next)
    saveSubmittedAssignmentDate(user?.id, id, iso)
    setSubmittedDates((prev) => ({ ...prev, [id]: iso }))
    showToast('Assignment submitted successfully.')
    setTab('submitted')
  }

  if (selected) {
    return (
      <DetailView
        assignment={selected}
        state={selected.state}
        submittedOn={selected.submittedOn}
        onBack={() => setSelectedId(null)}
        onSubmit={handleSubmit}
      />
    )
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-anchor-text sm:text-3xl">
          Assignments
        </h1>
        <p className="mt-1.5 text-anchor-text-muted">
          Keep track of your cohort work, deadlines and feedback.
        </p>
      </header>

      <div
        role="tablist"
        aria-label="Filter assignments"
        className="flex gap-1 rounded-lg border border-anchor-border bg-anchor-surface p-1"
      >
        {TABS.map((item) => {
          const active = tab === item.id
          const count = withState.filter(
            (assignment) => assignment.state === item.id,
          ).length
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
          <p className="text-sm font-semibold text-anchor-text">
            You&apos;re all caught up.
          </p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-anchor-text-muted">
            Nothing in this view right now. Check another tab or open a lesson
            to keep momentum.
          </p>
        </div>
      ) : (
        <ul className="grid gap-4">
          {filtered.map((assignment) => (
            <li
              key={assignment.id}
              className="flex flex-col gap-4 rounded-xl border border-anchor-border bg-anchor-surface p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-anchor-text">
                  {assignment.title}
                </p>
                <p className="mt-0.5 text-xs text-anchor-text-muted">
                  {assignment.cohort} · Instructor {instructorFor(assignment)} ·
                  Due {formatDate(assignment.dueDate)} · {assignment.points}{' '}
                  points
                </p>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-anchor-text-muted">
                  {assignment.overview}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <StatusChip state={assignment.state} />
                  {assignment.state === 'submitted' && assignment.submittedOn && (
                    <span className="text-xs font-medium text-anchor-text-muted">
                      Submitted on {formatDate(assignment.submittedOn)}
                    </span>
                  )}
                  {assignment.state === 'completed' && assignment.score != null && (
                    <span className="text-xs font-semibold text-anchor-text-muted">
                      {assignment.score}/{assignment.points}
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedId(assignment.id)}
                className="shrink-0 rounded-lg border border-anchor-border bg-anchor-surface px-5 py-2.5 text-sm font-semibold text-anchor-action transition-colors hover:border-anchor-action/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action sm:self-center"
              >
                Open assignment
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="text-xs text-anchor-text-muted">
        Prototype assignments for demonstration. Submissions are stored only in
        your browser.
      </p>
    </div>
  )
}
