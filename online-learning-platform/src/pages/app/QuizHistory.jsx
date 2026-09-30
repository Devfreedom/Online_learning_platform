import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { quizAttempts } from '../../data/quizzes'
import { formatDate } from '../../utils/formatDate'
import {
  loadDismissedQuizIds,
  saveDismissedQuizIds,
} from '../../utils/learningStore'
import { showToast } from '../../utils/toast'

function StatusChip({ passed }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        passed
          ? 'bg-anchor-success/10 text-anchor-success'
          : 'bg-anchor-error/10 text-anchor-error'
      }`}
    >
      {passed ? 'Passed' : 'Failed'}
    </span>
  )
}

function ReviewPanel({ attempt }) {
  return (
    <div className="mt-4 rounded-lg bg-anchor-bg px-4 py-3 ring-1 ring-anchor-border">
      <p className="text-sm font-semibold text-anchor-text">Review</p>
      <ul className="mt-2 space-y-1.5">
        {attempt.review.map((item) => (
          <li key={item.question} className="flex items-start gap-2 text-sm">
            <span
              aria-hidden="true"
              className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                item.result === 'correct' ? 'bg-anchor-success' : 'bg-anchor-error'
              }`}
            />
            <span className="text-anchor-text">{item.question}</span>
            <span className="ml-auto shrink-0 pl-3 text-xs font-semibold capitalize text-anchor-text-muted">
              {item.result}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-anchor-text-muted">
        Duration {attempt.duration} · Attempt {attempt.attemptNumber}
      </p>
    </div>
  )
}

export default function QuizHistory() {
  const [dismissedIds, setDismissedIds] = useState(loadDismissedQuizIds)
  const [expandedId, setExpandedId] = useState(null)
  const [filter, setFilter] = useState('all')

  const visible = useMemo(() => {
    const base = quizAttempts.filter((a) => !dismissedIds.includes(a.id))
    if (filter === 'passed') return base.filter((a) => a.passed)
    if (filter === 'failed') return base.filter((a) => !a.passed)
    return base
  }, [dismissedIds, filter])

  const handleClear = () => {
    const allIds = quizAttempts.map((a) => a.id)
    setDismissedIds(allIds)
    saveDismissedQuizIds(allIds)
    setExpandedId(null)
    showToast('Quiz history cleared for this prototype.', 'info')
  }

  const handleReset = () => {
    setDismissedIds([])
    saveDismissedQuizIds([])
    showToast('Demo quiz attempts restored.')
  }

  if (quizAttempts.filter((a) => !dismissedIds.includes(a.id)).length === 0) {
    return (
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight text-anchor-text sm:text-3xl">
            Quiz history
          </h1>
          <p className="mt-1.5 text-anchor-text-muted">
            Review your attempts and results across your learning journey.
          </p>
        </header>
        <div className="rounded-xl border border-dashed border-anchor-border bg-anchor-surface px-6 py-16 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-anchor-action/10 text-xl font-bold text-anchor-action">
            ?
          </span>
          <p className="mt-4 text-sm font-semibold text-anchor-text">
            No quiz attempts yet.
          </p>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-anchor-text-muted">
            Complete a lesson and take your first quiz to see your results
            here.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row">
            <Link
              to="/my-cohorts"
              className="rounded-lg bg-anchor-action px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-anchor-action-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
            >
              Go to My Cohorts
            </Link>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-lg border border-anchor-border px-5 py-2.5 text-sm font-semibold text-anchor-text-muted transition-colors hover:text-anchor-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
            >
              Restore demo attempts
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-anchor-text sm:text-3xl">
            Quiz history
          </h1>
          <p className="mt-1.5 text-anchor-text-muted">
            Review your attempts and results across your learning journey.
          </p>
        </div>
        <button
          type="button"
          onClick={handleClear}
          className="rounded-lg border border-anchor-border bg-anchor-surface px-4 py-2 text-sm font-semibold text-anchor-text-muted transition-colors hover:text-anchor-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
        >
          Clear demo data
        </button>
      </header>

      <div
        role="tablist"
        aria-label="Filter quiz attempts"
        className="flex gap-1 rounded-lg border border-anchor-border bg-anchor-surface p-1"
      >
        {[
          { id: 'all', label: 'All' },
          { id: 'passed', label: 'Passed' },
          { id: 'failed', label: 'Failed' },
        ].map((item) => {
          const active = filter === item.id
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(item.id)}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action ${
                active
                  ? 'bg-anchor-action text-white'
                  : 'text-anchor-text-muted hover:text-anchor-text'
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      {visible.length === 0 ? (
        <div className="rounded-xl border border-dashed border-anchor-border bg-anchor-surface px-6 py-12 text-center">
          <p className="text-sm text-anchor-text-muted">
            No {filter} attempts. Try a different filter.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-x-auto rounded-xl border border-anchor-border bg-anchor-surface md:block">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-anchor-border bg-anchor-bg/60 text-xs uppercase tracking-wide text-anchor-text-muted">
                  <th scope="col" className="px-5 py-3 font-semibold">Quiz</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Course / cohort</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Date</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Score</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Status</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Attempt</th>
                  <th scope="col" className="px-5 py-3 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((attempt) => (
                  <tr key={attempt.id} className="border-b border-anchor-border last:border-0">
                    <td className="px-5 py-3.5 font-semibold text-anchor-text">{attempt.quizTitle}</td>
                    <td className="px-5 py-3.5 text-anchor-text-muted">
                      {attempt.courseTitle}
                      <span className="block text-xs">{attempt.cohort}</span>
                    </td>
                    <td className="px-5 py-3.5 text-anchor-text-muted">{formatDate(attempt.attemptDate)}</td>
                    <td className="px-5 py-3.5 font-semibold text-anchor-text">
                      {attempt.score}/{attempt.total}
                    </td>
                    <td className="px-5 py-3.5"><StatusChip passed={attempt.passed} /></td>
                    <td className="px-5 py-3.5 text-anchor-text-muted">#{attempt.attemptNumber}</td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => setExpandedId(expandedId === attempt.id ? null : attempt.id)}
                        aria-expanded={expandedId === attempt.id}
                        className="rounded-lg border border-anchor-border px-3.5 py-1.5 text-xs font-semibold text-anchor-action transition-colors hover:border-anchor-action/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
                      >
                        {expandedId === attempt.id ? 'Hide review' : 'View review'}
                      </button>
                      {expandedId === attempt.id && (
                        <div className="mt-2 text-left"><ReviewPanel attempt={attempt} /></div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile stacked cards */}
          <ul className="grid gap-4 md:hidden">
            {visible.map((attempt) => {
              const expanded = expandedId === attempt.id
              return (
                <li key={attempt.id} className="rounded-xl border border-anchor-border bg-anchor-surface p-5">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold text-anchor-text">{attempt.quizTitle}</p>
                    <StatusChip passed={attempt.passed} />
                  </div>
                  <p className="mt-1 text-xs text-anchor-text-muted">
                    {attempt.courseTitle} · {attempt.cohort}
                  </p>
                  <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-lg bg-anchor-bg px-2 py-2 ring-1 ring-anchor-border">
                      <dt className="text-[11px] text-anchor-text-muted">Score</dt>
                      <dd className="text-sm font-bold text-anchor-text">{attempt.score}/{attempt.total}</dd>
                    </div>
                    <div className="rounded-lg bg-anchor-bg px-2 py-2 ring-1 ring-anchor-border">
                      <dt className="text-[11px] text-anchor-text-muted">Attempt</dt>
                      <dd className="text-sm font-bold text-anchor-text">#{attempt.attemptNumber}</dd>
                    </div>
                    <div className="rounded-lg bg-anchor-bg px-2 py-2 ring-1 ring-anchor-border">
                      <dt className="text-[11px] text-anchor-text-muted">Date</dt>
                      <dd className="text-xs font-bold text-anchor-text">{formatDate(attempt.attemptDate)}</dd>
                    </div>
                  </dl>
                  <button
                    type="button"
                    onClick={() => setExpandedId(expanded ? null : attempt.id)}
                    aria-expanded={expanded}
                    className="mt-4 w-full rounded-lg border border-anchor-border px-4 py-2 text-sm font-semibold text-anchor-action transition-colors hover:border-anchor-action/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
                  >
                    {expanded ? 'Hide review' : 'View review'}
                  </button>
                  {expanded && <ReviewPanel attempt={attempt} />}
                </li>
              )
            })}
          </ul>
        </>
      )}

      <p className="text-xs text-anchor-text-muted">
        Prototype quiz data for demonstration. Stored only in your browser.
      </p>
    </div>
  )
}
