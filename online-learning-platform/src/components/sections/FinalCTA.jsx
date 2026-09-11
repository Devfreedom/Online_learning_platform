export default function FinalCTA() {
  return (
    <section aria-labelledby="final-cta-heading" className="relative overflow-hidden bg-anchor-primary text-white">
      {/* Extremely subtle indigo glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[320px] w-[620px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(129,140,248,0.16),transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
        <h2
          id="final-cta-heading"
          className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
        >
          Find your next cohort.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-blue-100/70">
          Learn live alongside a small group, get direct feedback from an
          expert instructor, and finish with a practical project. Upcoming
          cohorts start soon — pick a date and join in.
        </p>
        <div className="mt-8">
          <a
            href="#courses"
            className="inline-block rounded-lg bg-anchor-action px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-anchor-action-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
          >
            Browse all courses
          </a>
        </div>
      </div>
    </section>
  )
}
