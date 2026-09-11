export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#0b1220] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-anchor-primary)_0%,#101b36_60%,#0b1220_100%)]" />
        <div className="absolute -top-24 left-1/2 h-[320px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(79,70,229,0.22),transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
        <div className="inline-flex items-center gap-2 rounded-lg bg-white/[0.06] px-3.5 py-1.5 ring-1 ring-white/10">
          <span className="h-1.5 w-1.5 rounded-full bg-anchor-accent" aria-hidden="true" />
          <span className="text-sm font-medium text-blue-100/85">Fall 2026 cohorts</span>
        </div>

        <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Your next cohort has a start date.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-blue-100/70">
          Pick a course, apply for a seat, and show up ready to build. The
          schedule, the group, and the deadline are already set.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#courses"
            className="rounded-lg bg-anchor-action px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-anchor-action-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-anchor-accent"
          >
            Explore Courses
          </a>
          <a
            href="#"
            className="rounded-lg border border-white/15 bg-transparent px-6 py-3 text-sm font-semibold text-white/90 transition-colors hover:border-white/30 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
          >
            Talk to our team
          </a>
        </div>
      </div>
    </section>
  )
}