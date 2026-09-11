const COURSES = [
  {
    title: 'Full-Stack JavaScript in Practice',
    category: 'Engineering',
    level: 'Intermediate',
    instructor: 'Aisha Bello',
    initials: 'AB',
    tone: 'bg-anchor-action',
    starts: 'Oct 5',
    duration: '8 weeks',
    seatsFilled: 18,
    seatsTotal: 25,
  },
  {
    title: 'Product Design for Developers',
    category: 'Design',
    level: 'Foundation',
    instructor: 'Marcus Webb',
    initials: 'MW',
    tone: 'bg-anchor-accent',
    starts: 'Sep 22',
    duration: '6 weeks',
    seatsFilled: 32,
    seatsTotal: 40,
  },
  {
    title: 'AI Product Foundations',
    category: 'Data & AI',
    level: 'Beginner',
    instructor: 'Dr. Lena Okafor',
    initials: 'LO',
    tone: 'bg-anchor-success',
    starts: 'Oct 13',
    duration: '6 weeks',
    seatsFilled: 11,
    seatsTotal: 20,
  },
  {
    title: 'Data Storytelling that Lands',
    category: 'Data & AI',
    level: 'Intermediate',
    instructor: 'Priya Raman',
    initials: 'PR',
    tone: 'bg-[#0d9488]',
    starts: 'Oct 27',
    duration: '5 weeks',
    seatsFilled: 9,
    seatsTotal: 16,
  },
  {
    title: 'Building Design Systems at Scale',
    category: 'Design',
    level: 'Advanced',
    instructor: 'Elena Marsh',
    initials: 'EM',
    tone: 'bg-[#7c3aed]',
    starts: 'Nov 3',
    duration: '6 weeks',
    seatsFilled: 14,
    seatsTotal: 24,
  },
  {
    title: 'Cloud Architecture in Practice',
    category: 'Engineering',
    level: 'Advanced',
    instructor: 'Tomás Herrera',
    initials: 'TH',
    tone: 'bg-[#b91c1c]',
    starts: 'Nov 10',
    duration: '8 weeks',
    seatsFilled: 21,
    seatsTotal: 30,
  },
]

export default function CourseGrid() {
  return (
    <section id="courses" aria-labelledby="courses-heading" className="scroll-mt-24 bg-anchor-bg">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-lg bg-anchor-surface px-3 py-1.5 ring-1 ring-anchor-border">
            <span className="h-1.5 w-1.5 rounded-full bg-anchor-accent" aria-hidden="true" />
            <span className="text-sm font-medium text-anchor-text-muted">Browse courses</span>
          </div>
          <h2
            id="courses-heading"
            className="mt-4 text-3xl font-semibold tracking-tight text-anchor-text sm:text-4xl"
          >
            Cohorts with real start dates.
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-anchor-text-muted">
            Every course runs on a live schedule with a capped cohort. Pick a
            start date that works, learn in a small group, and build something
            you can show.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((course) => {
            const pct = Math.round((course.seatsFilled / course.seatsTotal) * 100)
            return (
              <li key={course.title}>
                <article className="group flex h-full flex-col rounded-xl border border-anchor-border bg-anchor-surface p-5 transition-shadow hover:shadow-md">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-md bg-anchor-bg px-2 py-1 text-xs font-semibold text-anchor-text-muted ring-1 ring-anchor-border">
                      {course.category}
                    </span>
                    <span className="text-xs font-medium text-anchor-text-muted">
                      {course.level}
                    </span>
                  </div>

                  <h3 className="mt-4 text-base font-semibold leading-snug text-anchor-text">
                    {course.title}
                  </h3>

                  <div className="mt-4 flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className={`grid h-8 w-8 place-items-center rounded-full text-xs font-bold text-white ${course.tone}`}
                    >
                      {course.initials}
                    </span>
                    <span className="text-sm font-medium text-anchor-text-muted">
                      {course.instructor}
                    </span>
                  </div>

                  <dl className="mt-5 flex items-center justify-between border-t border-anchor-border pt-4 text-sm">
                    <div className="flex items-center gap-1.5">
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
                      <dt className="sr-only">Start date</dt>
                      <dd className="font-semibold text-anchor-text">{course.starts}</dd>
                      <dt className="sr-only">Duration</dt>
                      <dd className="text-anchor-text-muted"> · {course.duration}</dd>
                    </div>
                  </dl>

                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-anchor-text-muted">
                        {course.seatsFilled} of {course.seatsTotal} seats
                      </span>
                      <span className="font-semibold text-anchor-action">{pct}%</span>
                    </div>
                    <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-anchor-border">
                      <div
                        className="h-full rounded-full bg-anchor-action"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>

        <p className="mt-10 text-center text-sm text-anchor-text-muted">
          Cohort seats are capped to keep every group focused. 6 more courses
          open for applications soon.
        </p>
      </div>
    </section>
  )
}