const STEPS = [
  {
    number: '01',
    title: 'Apply for a seat',
    body: 'Choose a course with a real start date. Cohorts are capped, so applying early locks in your seat.',
  },
  {
    number: '02',
    title: 'Learn live each week',
    body: 'Attend weekly live sessions and small-group workshops led by an expert who ships the work.',
  },
  {
    number: '03',
    title: 'Build real projects',
    body: 'Work through practical projects modelled on what teams actually do — not disconnected exercises.',
  },
  {
    number: '04',
    title: 'Graduate with work',
    body: 'Finish with a portfolio project, direct feedback, and a cohort of peers who hold you to it.',
  },
]

export default function HowCohortsWork() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      className="scroll-mt-24 bg-anchor-surface"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-lg bg-anchor-bg px-3 py-1.5 ring-1 ring-anchor-border">
            <span className="h-1.5 w-1.5 rounded-full bg-anchor-accent" aria-hidden="true" />
            <span className="text-sm font-medium text-anchor-text-muted">How it works</span>
          </div>
          <h2
            id="how-heading"
            className="mt-4 text-3xl font-semibold tracking-tight text-anchor-text sm:text-4xl"
          >
            A structured path from day one.
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-anchor-text-muted">
            No self-paced marathons that quietly stall. A cohort gives you a
            schedule, a small group, and a deadline worth showing up for.
          </p>
        </div>

        <ol className="mt-12 grid gap-8 lg:grid-cols-4 lg:gap-6">
          {STEPS.map((step, index) => (
            <li key={step.number} className="relative">
              {index < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-14 top-7 hidden h-px w-[calc(100%-3.5rem)] bg-anchor-border lg:block"
                />
              )}
              <div className="relative">
                <span className="grid h-12 w-12 place-items-center rounded-lg border border-anchor-border bg-anchor-bg text-sm font-bold text-anchor-action">
                  {step.number}
                </span>
                <h3 className="mt-5 text-base font-semibold text-anchor-text">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-anchor-text-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}