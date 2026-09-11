export default function CourseCard({ course, className = '' }) {
  const pct = Math.round((course.seatsFilled / course.seatsTotal) * 100)

  return (
    <article
      className={`group flex h-full flex-col rounded-xl border border-anchor-border bg-anchor-surface p-5 transition-[border-color,box-shadow] hover:border-anchor-action/30 hover:shadow-md ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-md bg-anchor-bg px-2 py-1 text-xs font-semibold text-anchor-text-muted ring-1 ring-anchor-border">
          {course.category}
        </span>
        <span className="text-xs font-medium text-anchor-text-muted">{course.level}</span>
      </div>

      <h3 className="mt-3.5 text-base font-semibold leading-snug text-anchor-text">
        {course.title}
      </h3>

      <div className="mt-3.5 flex items-center gap-2.5">
        <span
          aria-hidden="true"
          className={`grid h-8 w-8 place-items-center rounded-full text-xs font-bold ${course.avatarClass}`}
        >
          {course.initials}
        </span>
        <span className="text-sm font-medium text-anchor-text-muted">{course.instructor}</span>
      </div>

      <div className="mt-4 flex items-center gap-1.5 border-t border-anchor-border pt-3.5 text-sm">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="h-4 w-4 text-anchor-text-muted"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
        <span className="font-semibold text-anchor-text">{course.starts}</span>
        <span className="text-anchor-text-muted">· {course.duration} · live</span>
      </div>

      <div className="mt-auto pt-4">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-anchor-text-muted">
            {course.seatsFilled} of {course.seatsTotal} seats
          </span>
          <span className="font-semibold text-anchor-action">{pct}%</span>
        </div>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-anchor-border">
          <div
            className="h-full rounded-full bg-anchor-action"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </article>
  )
}