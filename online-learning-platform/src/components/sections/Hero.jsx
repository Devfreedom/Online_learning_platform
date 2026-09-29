import imgStudents from '../../assets/hero/students-collab.jpg'
import imgInstructor from '../../assets/hero/instructor.jpg'

const FEATURES = [
  { title: 'Live sessions', description: 'Expert-led weekly learning' },
  { title: 'Small cohorts', description: 'Focused group learning' },
  { title: 'Practical projects', description: 'Build while you learn' },
]

function StarRating() {
  return (
    <span
      className="text-[11px] tracking-tight text-amber-500"
      role="img"
      aria-label="Rated 5 out of 5 stars"
    >
      ★★★★★
    </span>
  )
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0b1220] text-white">
      {/* Restrained single glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-anchor-primary)_0%,#0e1230_45%,#0a0d24_100%)]" />
        <div className="absolute -top-32 right-[-8%] h-[440px] w-[580px] rounded-full bg-[radial-gradient(closest-side,rgba(123,91,254,0.30),transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* Left — copy */}
          <div className="min-w-0 space-y-8">
            <span className="inline-flex items-center gap-2 rounded-lg bg-white/[0.06] px-3.5 py-1.5 ring-1 ring-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-anchor-accent" aria-hidden="true" />
              <span className="text-sm font-medium text-blue-100/85">
                Expert-led cohort learning
              </span>
            </span>

            <div className="space-y-5">
              <h1 className="max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl xl:text-6xl">
                Learn from people actually doing the work.
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-blue-100/70">
                Anchorpoint runs expert-led, cohort-based courses on a real
                schedule. You&apos;ll learn alongside a small group, attend
                weekly live sessions with working experts, and build practical
                projects — so you finish with work, not just certificates.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#courses"
                className="rounded-lg bg-anchor-action px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-anchor-action-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-anchor-accent"
              >
                Explore Courses
              </a>
              <a
                href="#how-it-works"
                className="rounded-lg border border-white/15 bg-transparent px-6 py-3 text-sm font-semibold text-white/90 transition-colors hover:border-white/30 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
              >
                How It Works
              </a>
            </div>

            {/* Product characteristics */}
            <ul className="grid gap-x-6 gap-y-5 border-t border-white/10 pt-8 sm:grid-cols-3">
              {FEATURES.map((feature) => (
                <li key={feature.title} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-anchor-accent/80"
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">{feature.title}</p>
                    <p className="mt-0.5 text-sm leading-snug text-blue-100/55">
                      {feature.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — editorial two-photo composition */}
          <div className="min-w-0">
            <div className="relative mx-auto w-full max-w-lg pb-8 sm:pb-10 lg:max-w-none lg:pb-12">
              {/* Subtle lavender backing shape */}
              <div
                aria-hidden="true"
                className="absolute -top-5 right-6 h-36 w-36 rotate-3 rounded-2xl bg-indigo-300/10 sm:h-44 sm:w-44"
              />

              {/* Primary photo */}
              <figure className="relative">
                <img
                  src={imgStudents}
                  alt="Students collaborating on a group project around a laptop and notebooks."
                  className="aspect-[4/3] w-full rounded-xl object-cover shadow-2xl shadow-black/40 ring-1 ring-white/10"
                  loading="eager"
                />
                {/* Contextual chip */}
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-lg shadow-black/20 ring-1 ring-black/5 sm:left-4 sm:top-4">
                  Live cohort
                  <span className="text-amber-500" aria-hidden="true">
                    •
                  </span>
                  <span className="font-medium text-slate-600">6 weeks</span>
                </span>
              </figure>

              {/* Second photo — offset overlap, different proportion */}
              <figure className="relative z-10 -mt-10 ml-auto w-[74%] sm:-mt-14 sm:w-[68%]">
                <img
                  src={imgInstructor}
                  alt="An instructor leading a live session in a classroom."
                  className="aspect-[16/10] w-full rounded-xl object-cover shadow-xl shadow-black/40 ring-1 ring-white/10"
                  loading="lazy"
                />
              </figure>

              {/* Floating instructor card */}
              <aside
                aria-label="Featured instructor"
                className="absolute bottom-0 left-2 z-20 flex w-[216px] items-center gap-3 rounded-xl bg-white px-3.5 py-3 text-left shadow-xl shadow-black/30 ring-1 ring-black/5 sm:left-4 sm:w-[232px]"
              >
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-anchor-action text-xs font-bold text-white"
                  aria-hidden="true"
                >
                  MC
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-slate-900">
                    Maya Chen
                  </span>
                  <span className="block truncate text-xs text-slate-500">
                    AI Product Strategist
                  </span>
                  <StarRating />
                </span>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
