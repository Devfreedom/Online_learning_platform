import { Link } from 'react-router'
import {
  assignmentDetails,
  cohortDetails,
  learningActivity,
  learningGoal,
  studyTime,
} from '../../data/cohorts'
import { sessionsByCourse } from '../../data/sessions'
import { formatMonthDay } from '../../utils/formatDate'
import { useAuth } from '../../hooks/useAuth'
import {
  getCourseProgress,
  getLessonsCompletedTotal,
  getOverallProgress,
  loadSubmittedAssignmentIds,
} from '../../utils/learningStore'

const ACTIVITY_TONE = {
  0: 'bg-slate-200',
  1: 'bg-anchor-action',
  2: 'bg-anchor-accent',
  3: 'bg-anchor-success',
}

function trailingStreak(activity) {
  let streak = 0
  for (let i = activity.length - 1; i >= 0; i -= 1) {
    if (activity[i] === 0) break
    streak += 1
  }
  return streak
}

function ProgressRing({ percent, size = 144, label }) {
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference
  return (
    <div className="flex items-center gap-5">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg viewBox="0 0 128 128" className="-rotate-90" style={{ width: size, height: size }}>
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            stroke="var(--color-anchor-border)"
            strokeWidth="11"
          />
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            stroke="var(--color-anchor-action)"
            strokeWidth="11"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center text-2xl font-bold text-anchor-text">
          {percent}%
        </span>
      </div>
      {label && <p className="text-sm text-anchor-text-muted">{label}</p>}
    </div>
  )
}

export default function Progress() {
  const { user } = useAuth()
  const overall = getOverallProgress(cohortDetails, user?.id)
  const maxMinutes = Math.max(...studyTime.map((entry) => entry.minutes))
  const totalMinutes = studyTime.reduce((sum, entry) => sum + entry.minutes, 0)
  const totalHours = Math.floor(totalMinutes / 60)
  const totalRemainder = totalMinutes % 60
  const activeDays = learningActivity.filter((value) => value > 0).length
  const streak = trailingStreak(learningActivity)
  const lessonsCompleted = getLessonsCompletedTotal(cohortDetails, user?.id)
  const submittedCount =
    assignmentDetails.filter((a) => a.seededState !== 'upcoming').length +
    loadSubmittedAssignmentIds(user?.id).filter((id) =>
      assignmentDetails.some(
        (a) => a.id === id && a.seededState === 'upcoming',
      ),
    ).length
  const completedCohorts = cohortDetails.filter(
    (cohort) => cohort.status === 'completed',
  ).length

  const highlights = [
    { label: 'Lessons completed', value: `${lessonsCompleted}` },
    { label: 'Assignments submitted', value: `${submittedCount}` },
    { label: 'Live sessions attended', value: '14' },
    { label: 'Current learning streak', value: `${streak} days` },
    { label: 'Completed cohorts', value: `${completedCohorts}` },
  ]

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-anchor-text sm:text-3xl">
          Your progress
        </h1>
        <p className="mt-1.5 text-anchor-text-muted">
          See how your learning is progressing across cohorts, lessons and
          projects.
        </p>
      </header>

      <section className="grid gap-5 lg:grid-cols-2">
        <article className="rounded-xl border border-anchor-border bg-anchor-surface p-6">
          <h2 className="font-semibold text-anchor-text">Overall progress</h2>
          <p className="mt-1 text-sm text-anchor-text-muted">
            Overall learning progress
          </p>
          <div className="mt-4">
            <ProgressRing percent={overall} label="Average completion across your enrolled cohorts." />
          </div>
        </article>

        <article className="rounded-xl border border-anchor-border bg-anchor-surface p-6">
          <h2 className="font-semibold text-anchor-text">Learning goal</h2>
          <div className="mt-4">
            <ProgressRing
              percent={learningGoal.percent}
              size={120}
              label={learningGoal.label}
            />
          </div>
        </article>
      </section>

      <section aria-label="Progress highlights">
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {highlights.map((item) => (
            <li
              key={item.label}
              className="rounded-xl border border-anchor-border bg-anchor-surface p-5"
            >
              <p className="text-2xl font-bold text-anchor-text">{item.value}</p>
              <p className="mt-1 text-sm text-anchor-text-muted">{item.label}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-anchor-border bg-anchor-surface p-6">
        <h2 className="font-semibold text-anchor-text">Cohort progress</h2>
        <ul className="mt-4 space-y-5">
          {cohortDetails.map((cohort) => {
            const live = getCourseProgress(cohort.courseSlug, cohort.title, user?.id)
            const session = sessionsByCourse[cohort.courseSlug]
            return (
              <li key={cohort.id} className="rounded-lg border border-anchor-border p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-anchor-text">
                      {cohort.title}
                    </p>
                    <p className="mt-0.5 text-xs text-anchor-text-muted">
                      Instructor {cohort.instructor} · {live.completed} of{' '}
                      {live.total} lessons completed · {live.remaining}{' '}
                      remaining
                    </p>
                  </div>
                  <p className="shrink-0 text-sm font-bold text-anchor-text">
                    {live.percent}% complete
                  </p>
                </div>
                <div
                  className="mt-2.5 h-2.5 w-full overflow-hidden rounded-full bg-anchor-bg"
                  role="progressbar"
                  aria-valuenow={live.percent}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-label={`${cohort.title} progress`}
                >
                  <div
                    className={`h-full rounded-full ${
                      cohort.status === 'completed'
                        ? 'bg-anchor-success'
                        : 'bg-anchor-action'
                    }`}
                    style={{ width: `${live.percent}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-anchor-text-muted">
                  {session
                    ? `Next session: ${session.day} · ${formatMonthDay(session.date)} · ${session.time} · ${session.instructorName}`
                    : 'Cohort complete'}
                  {' · '}
                  <Link
                    to={`/learn/${cohort.courseSlug}`}
                    className="font-semibold text-anchor-action underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
                  >
                    Continue learning
                  </Link>
                </p>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <article className="rounded-xl border border-anchor-border bg-anchor-surface p-6">
          <h2 className="font-semibold text-anchor-text">Study time</h2>
          <p className="mt-1 text-sm text-anchor-text-muted">
            {totalHours}h {totalRemainder}m this week
          </p>
          <div className="mt-5 grid grid-cols-7 items-end gap-2">
            {studyTime.map((entry) => (
              <div key={entry.day} className="flex flex-col items-center gap-2">
                <div className="flex h-28 w-full items-end overflow-hidden rounded-md bg-slate-100">
                  <div
                    className="w-full rounded-md bg-anchor-action"
                    style={{ height: `${(entry.minutes / maxMinutes) * 100}%` }}
                    title={`${entry.minutes} minutes`}
                  />
                </div>
                <span className="text-xs font-medium text-anchor-text-muted">
                  {entry.day}
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-xl border border-anchor-border bg-anchor-surface p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-semibold text-anchor-text">Learning activity</h2>
            <p className="text-sm text-anchor-text-muted">
              {activeDays} active days this month
            </p>
          </div>
          <div
            className="mt-5 grid grid-flow-col grid-rows-7 gap-1.5"
            aria-label={`${activeDays} active days this month`}
          >
            {learningActivity.map((level, index) => (
              <span
                key={index}
                title={level === 0 ? 'No activity' : 'Active day'}
                className={`aspect-square w-full rounded-sm ${ACTIVITY_TONE[level] ?? ACTIVITY_TONE[0]}`}
              />
            ))}
          </div>
          <p className="mt-4 text-sm text-anchor-text-muted">
            Live-session participation:{' '}
            <span className="font-semibold text-anchor-text">14 of 16 sessions</span>
          </p>
        </article>
      </section>

      <p className="text-xs text-anchor-text-muted">
        Progress figures are prototype values for demonstration.
      </p>
    </div>
  )
}
