import { Link } from 'react-router'
import { useAuth } from '../../hooks/useAuth'
import { showToast } from '../../utils/toast'
import { formatMonthDay } from '../../utils/formatDate'
import {
  cohortDetails,
  learningActivity,
  learningGoal,
  nextLiveSession,
  prototypeInstructors,
  studyTime,
  upcomingAssignments,
} from '../../data/cohorts'
import {
  getCourseProgress,
  getLessonsCompletedTotal,
  getOverallProgress,
} from '../../utils/learningStore'

const ACTIVITY_TONE = {
  0: 'bg-slate-200',
  1: 'bg-anchor-action',
  2: 'bg-anchor-accent',
  3: 'bg-anchor-success',
}

const ASSIGNMENT_TONE = {
  'In progress': 'bg-anchor-action/10 text-anchor-action',
  'Not started': 'bg-slate-100 text-anchor-text-muted',
  Completed: 'bg-anchor-success/10 text-anchor-success',
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-xl border border-anchor-border bg-anchor-surface p-5">
      <p className="text-2xl font-bold text-anchor-text">{value}</p>
      <p className="mt-1 text-sm text-anchor-text-muted">{label}</p>
    </div>
  )
}

function LearningGoalRing() {
  const radius = 34
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (learningGoal.percent / 100) * circumference
  return (
    <div className="flex items-center gap-5 rounded-xl border border-anchor-border bg-anchor-surface p-5">
      <div className="relative h-24 w-24 shrink-0">
        <svg viewBox="0 0 80 80" className="h-24 w-24 -rotate-90">
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="var(--color-anchor-border)"
            strokeWidth="8"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="var(--color-anchor-action)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center text-lg font-bold text-anchor-text">
          {learningGoal.percent}%
        </span>
      </div>
      <div>
        <p className="font-semibold text-anchor-text">Learning goal</p>
        <p className="mt-1 text-sm text-anchor-text-muted">{learningGoal.label}</p>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { user } = useAuth()
  const primaryCohort = cohortDetails.find((cohort) => cohort.status === 'ongoing')
  const primaryProgress = primaryCohort
    ? getCourseProgress(primaryCohort.courseSlug, primaryCohort.title, user?.id)
    : null
  const overall = getOverallProgress(cohortDetails, user?.id)
  const lessonsCompleted = getLessonsCompletedTotal(cohortDetails, user?.id)
  const activeCohorts = cohortDetails.filter((c) => c.status === 'ongoing').length
  const dashboardStats = [
    { id: 'active-cohorts', label: 'Active cohorts', value: `${activeCohorts}` },
    { id: 'average-progress', label: 'Average progress', value: `${overall}%` },
    { id: 'lessons-completed', label: 'Lessons completed', value: `${lessonsCompleted}` },
    { id: 'upcoming-sessions', label: 'Upcoming sessions', value: '3' },
  ]
  const maxMinutes = Math.max(...studyTime.map((entry) => entry.minutes))
  const activeDays = learningActivity.filter((value) => value > 0).length

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-anchor-text sm:text-3xl">
          Welcome back, {user?.firstName} 👋
        </h1>
        <p className="mt-1.5 text-anchor-text-muted">
          Track your learning and jump back into your cohorts.
        </p>
      </header>

      {/* Stat cards */}
      <section aria-label="Learning summary">
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {dashboardStats.map((stat) => (
            <li key={stat.id}>
              <StatCard label={stat.label} value={stat.value} />
            </li>
          ))}
        </ul>
      </section>

      {/* Next live session + continue learning */}
      <section className="grid gap-5 lg:grid-cols-2">
        <article className="relative overflow-hidden rounded-xl border border-anchor-border bg-anchor-primary p-6 text-white">
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[radial-gradient(closest-side,rgba(123,91,254,0.45),transparent_70%)]"
          />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-anchor-accent" aria-hidden="true" />
              Next live session
            </span>
            <h2 className="mt-4 text-xl font-semibold">{nextLiveSession.title}</h2>
            <p className="mt-2 text-sm text-blue-100/75">
              {nextLiveSession.day} · {formatMonthDay(nextLiveSession.date)} ·{' '}
              {nextLiveSession.time}
            </p>
            <p className="mt-1 text-sm text-blue-100/60">
              {prototypeInstructors.find((i) => i.id === nextLiveSession.instructorId)?.name}
            </p>
            <Link
              to={`/learn/${primaryCohort?.courseSlug ?? ''}`}
              className="mt-5 inline-block rounded-lg bg-anchor-action px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-anchor-action-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
            >
              View session
            </Link>
          </div>
        </article>

        {primaryCohort && (
          <article className="flex flex-col overflow-hidden rounded-xl border border-anchor-border bg-anchor-surface">
            <img
              src={primaryCohort.image}
              alt={primaryCohort.imageAlt}
              className="aspect-[16/7] w-full object-cover"
            />
            <div className="flex flex-1 flex-col p-6">
              <p className="inline-flex items-center gap-2 text-xs font-semibold text-anchor-text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-anchor-success" aria-hidden="true" />
                Continue learning
              </p>
              <h2 className="mt-2 text-lg font-semibold text-anchor-text">
                {primaryCohort.title}
              </h2>
              <p className="mt-1 text-sm text-anchor-text-muted">
                {primaryCohort.instructor} · {primaryProgress?.percent ?? primaryCohort.progress}% complete ·{' '}
                {primaryProgress?.completed ?? 0} of {primaryProgress?.total ?? 0} lessons
              </p>
              <p className="mt-3 text-sm text-anchor-text">
                Next:{' '}
                <span className="font-medium">
                  {primaryProgress?.firstIncomplete?.title ?? primaryCohort.nextLesson}
                </span>
              </p>
              <div
                className="mt-4 h-2 w-full overflow-hidden rounded-full bg-anchor-bg"
                role="progressbar"
                aria-valuenow={primaryProgress?.percent ?? primaryCohort.progress}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label={`${primaryCohort.title} progress`}
              >
                <div
                  className="h-full rounded-full bg-anchor-action"
                  style={{ width: `${primaryProgress?.percent ?? primaryCohort.progress}%` }}
                />
              </div>
              <Link
                to={`/learn/${primaryCohort.courseSlug}`}
                className="mt-5 inline-block rounded-lg bg-anchor-action px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-anchor-action-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
              >
                Continue learning
              </Link>
            </div>
          </article>
        )}
      </section>

      {/* Activity, study time, goal */}
      <section className="grid gap-5 lg:grid-cols-2">
        <article className="rounded-xl border border-anchor-border bg-anchor-surface p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-semibold text-anchor-text">Learning activity</h2>
            <p className="text-sm text-anchor-text-muted">{activeDays} active days this month</p>
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
          <ul className="mt-4 flex flex-wrap items-center gap-3 text-xs text-anchor-text-muted">
            <li className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-slate-200" aria-hidden="true" /> Inactive
            </li>
            <li className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-anchor-action" aria-hidden="true" /> Active
            </li>
            <li className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-anchor-accent" aria-hidden="true" /> High
            </li>
            <li className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-anchor-success" aria-hidden="true" /> Milestone
            </li>
          </ul>
        </article>

        <div className="grid gap-5">
          <article className="rounded-xl border border-anchor-border bg-anchor-surface p-5">
            <h2 className="font-semibold text-anchor-text">Study time</h2>
            <p className="mt-1 text-sm text-anchor-text-muted">Minutes this week</p>
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

          <LearningGoalRing />
        </div>
      </section>

      {/* Assignments + instructors */}
      <section className="grid gap-5 lg:grid-cols-2">
        <article className="rounded-xl border border-anchor-border bg-anchor-surface p-5">
          <h2 className="font-semibold text-anchor-text">Upcoming assignments</h2>
          <ul className="mt-4 space-y-3">
            {upcomingAssignments.map((assignment) => (
              <li
                key={assignment.id}
                className="flex items-start justify-between gap-4 rounded-lg border border-anchor-border px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-anchor-text">
                    {assignment.title}
                  </p>
                  <p className="mt-0.5 text-xs text-anchor-text-muted">
                    {assignment.cohort} · Due{' '}
                    {formatMonthDay(assignment.dueDate)}
                  </p>
                  <span
                    className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${ASSIGNMENT_TONE[assignment.status] ?? ASSIGNMENT_TONE['Not started']}`}
                  >
                    {assignment.status}
                  </span>
                </div>
                <Link
                  to="/assignments"
                  className="shrink-0 text-xs font-semibold text-anchor-action underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
                >
                  Open assignment
                </Link>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-xl border border-anchor-border bg-anchor-surface p-5">
          <h2 className="font-semibold text-anchor-text">Your instructors</h2>
          <ul className="mt-4 space-y-3">
            {prototypeInstructors.slice(0, 2).map((instructor) => (
              <li key={instructor.id} className="flex items-center gap-3">
                <span className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-anchor-action">
                  <img
                    src={instructor.photo}
                    alt={instructor.photoAlt}
                    className="h-full w-full object-cover"
                  />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-anchor-text">
                    {instructor.name}
                  </p>
                  <p className="truncate text-xs text-anchor-text-muted">
                    {instructor.credential} · {instructor.course}
                  </p>
                </div>
                <Link
                  to="/profile"
                  className="shrink-0 text-xs font-semibold text-anchor-action underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
                >
                  View profile
                </Link>
              </li>
            ))}
          </ul>
        </article>
      </section>

      {/* Community CTA */}
      <section className="rounded-xl border border-anchor-border bg-anchor-surface p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
        <div>
          <h2 className="text-lg font-semibold text-anchor-text">
            Learn better together.
          </h2>
          <p className="mt-1 text-sm text-anchor-text-muted">
            Connect with your cohort, share work and keep the momentum going.
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            showToast('Community access is available in this prototype.', 'info')
          }
          className="mt-4 shrink-0 rounded-lg bg-anchor-action px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-anchor-action-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action sm:mt-0"
        >
          Join cohort community
        </button>
      </section>

      <p className="text-xs text-anchor-text-muted">
        Dashboard figures are prototype values for demonstration.
      </p>
    </div>
  )
}
