import {
  cohortDetails,
  learningActivity,
  learningGoal,
  studyTime,
} from '../../data/cohorts'

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
  const overall = Math.round(
    cohortDetails.reduce((sum, cohort) => sum + cohort.progress, 0) /
      cohortDetails.length,
  )
  const maxMinutes = Math.max(...studyTime.map((entry) => entry.minutes))
  const activeDays = learningActivity.filter((value) => value > 0).length
  const streak = trailingStreak(learningActivity)

  const highlights = [
    { label: 'Lessons completed', value: '18' },
    { label: 'Assignments completed', value: '6' },
    { label: 'Live sessions attended', value: '14' },
    { label: 'Day streak', value: `${streak}` },
  ]

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-anchor-text sm:text-3xl">
          Progress
        </h1>
        <p className="mt-1.5 text-anchor-text-muted">
          How far you&apos;ve come across every cohort.
        </p>
      </header>

      <section className="grid gap-5 lg:grid-cols-2">
        <article className="rounded-xl border border-anchor-border bg-anchor-surface p-6">
          <h2 className="font-semibold text-anchor-text">Overall learning progress</h2>
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
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
        <ul className="mt-4 space-y-4">
          {cohortDetails.map((cohort) => (
            <li key={cohort.id}>
              <div className="flex items-center justify-between gap-3 text-sm">
                <p className="truncate font-medium text-anchor-text">
                  {cohort.title}
                </p>
                <p className="shrink-0 font-semibold text-anchor-text">
                  {cohort.progress}%
                </p>
              </div>
              <div
                className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-anchor-bg"
                role="progressbar"
                aria-valuenow={cohort.progress}
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
                  style={{ width: `${cohort.progress}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <article className="rounded-xl border border-anchor-border bg-anchor-surface p-6">
          <h2 className="font-semibold text-anchor-text">Weekly study time</h2>
          <p className="mt-1 text-sm text-anchor-text-muted">Minutes per day</p>
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
            <h2 className="font-semibold text-anchor-text">Activity streak</h2>
            <p className="text-sm text-anchor-text-muted">
              {activeDays} active days · {streak}-day streak
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
