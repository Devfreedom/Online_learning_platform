const COHORTS = [
  {
    title: 'Full-Stack JavaScript in Practice',
    instructor: 'Aisha Bello',
    date: 'Starts Sep 22',
    pct: 72,
    seats: '18 of 25 seats',
  },
  {
    title: 'Product Design for Developers',
    instructor: 'Marcus Webb',
    date: 'Starts Oct 6',
    pct: 80,
    seats: '32 of 40 seats',
  },
  {
    title: 'AI Product Foundations',
    instructor: 'Dr. Lena Okafor',
    date: 'Starts Oct 13',
    pct: 55,
    seats: '11 of 20 seats',
  },
]

const STATS = [
  { value: '12,000+', label: 'Active learners' },
  { value: '90%', label: 'Cohort completion' },
  { value: '4.8/5', label: 'Average rating' },
]

export default function Hero() {
  return (
    <section className="bg-anchor-primary">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Left — copy */}
          <div className="space-y-8 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-lg bg-anchor-accent/10 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-anchor-accent" aria-hidden="true" />
              <span className="text-sm font-medium text-amber-300">
                Fall 2026 cohorts now open
              </span>
            </div>

            <div className="space-y-5">
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Learn from experts who&apos;ve done the work.
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-blue-100/70">
                Anchorpoint runs expert-led, cohort-based courses on a live
                schedule. Learn alongside a small group, attend weekly live
                sessions, and graduate with real projects to show for it.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#courses"
                className="rounded-lg bg-anchor-action px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-anchor-action-hover"
              >
                Get started
              </a>
              <a
                href="#how-it-works"
                className="rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Browse courses
              </a>
            </div>

            <dl className="flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pt-8">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-2xl font-semibold text-white">{stat.value}</dd>
                  <dd className="mt-0.5 text-sm text-blue-100/60">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right — upcoming cohorts preview */}
          <div className="lg:col-span-5">
            <div className="mx-auto max-w-md rounded-xl bg-anchor-surface p-6 shadow-xl shadow-black/20 ring-1 ring-white/10">
              <div className="flex items-center justify-between border-b border-anchor-border pb-4">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-anchor-text-muted">
                  Upcoming cohorts
                </h2>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-anchor-success/10 px-2 py-1 text-xs font-semibold text-anchor-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-anchor-success" aria-hidden="true" />
                  Live in 6 days
                </span>
              </div>

              <ul className="divide-y divide-anchor-border">
                {COHORTS.map((cohort) => (
                  <li key={cohort.title} className="py-4">
                    <p className="text-sm font-semibold text-anchor-text">
                      {cohort.title}
                    </p>
                    <p className="mt-1 text-xs text-anchor-text-muted">
                      {cohort.instructor} · {cohort.date}
                    </p>
                    <div className="mt-3">
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-anchor-border">
                        <div
                          className="h-full rounded-full bg-anchor-action"
                          style={{ width: `${cohort.pct}%` }}
                        />
                      </div>
                      <p className="mt-1.5 text-xs text-anchor-text-muted">
                        {cohort.seats} enrolled
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <a
                href="#courses"
                className="mt-2 inline-block rounded-lg border border-anchor-border px-4 py-2 text-sm font-semibold text-anchor-action transition-colors hover:border-anchor-action hover:bg-anchor-action/5"
              >
                Browse all cohorts
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}