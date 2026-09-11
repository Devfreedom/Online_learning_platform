const STAGES = [
  {
    title: 'Apply',
    body: 'Choose a cohort that fits your goals and schedule, and reserve your seat.',
  },
  {
    title: 'Cohort begins',
    body: 'Meet your instructor and learning group, and establish a clear starting point.',
  },
  {
    title: 'Weekly live sessions',
    body: 'Learn directly from an expert through structured sessions and real discussion.',
  },
  {
    title: 'Capstone project',
    body: 'Apply everything to a practical project, with feedback as you build.',
  },
  {
    title: 'Certificate',
    body: 'Finish with a completed project, a certificate of completion, and work worth showing.',
  },
]

export default function HowCohortsWork() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      className="scroll-mt-24 bg-anchor-bg"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-lg bg-anchor-surface px-3 py-1.5 ring-1 ring-anchor-border">
            <span className="h-1.5 w-1.5 rounded-full bg-anchor-accent" aria-hidden="true" />
            <span className="text-sm font-medium text-anchor-text-muted">How it works</span>
          </div>
          <h2
            id="how-heading"
            className="mt-4 text-3xl font-semibold tracking-tight text-anchor-text sm:text-4xl"
          >
            How a cohort works.
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-anchor-text-muted">
            You move through the experience together — live instruction,
            practical work, and feedback at every stage. No self-paced
            marathons that quietly stall.
          </p>
        </div>

        <ol className="relative mt-12 grid gap-10 lg:grid-cols-5 lg:gap-6">
          {/* Connecting line: vertical on mobile, horizontal on desktop */}
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[4px] w-px bg-anchor-border lg:top-[4px] lg:right-2 lg:bottom-auto lg:left-2 lg:h-px lg:w-auto"
          />
          {STAGES.map((stage, index) => (
            <li key={stage.title} className="relative pl-8 lg:pl-0 lg:pt-8">
              <span
                aria-hidden="true"
                className={
                  index === 0
                    ? 'absolute top-1 left-0 h-2.5 w-2.5 rounded-full bg-anchor-action ring-4 ring-anchor-action/15 lg:top-0'
                    : 'absolute top-1 left-0 h-2.5 w-2.5 rounded-full border-2 border-anchor-action bg-anchor-surface lg:top-0'
                }
              />
              <h3 className="text-base font-semibold text-anchor-text">{stage.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-anchor-text-muted">
                {stage.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
