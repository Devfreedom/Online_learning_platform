import { useEffect, useState } from 'react'
import imgStudents from '../../assets/hero/students-collab.jpg'
import imgInstructor from '../../assets/hero/instructor.jpg'
import imgTeam from '../../assets/hero/team-meeting.jpg'

const FEATURES = [
  { title: 'Live sessions', description: 'Expert-led weekly learning' },
  { title: 'Small cohorts', description: 'Focused group learning' },
  { title: 'Practical projects', description: 'Build while you learn' },
]

const COHORT_START = new Date('2026-10-05T00:00:00Z')

function useCountdown(target) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 60000)
    return () => clearInterval(timer)
  }, [])

  const remaining = Math.max(0, target.getTime() - now)
  const days = Math.floor(remaining / 86400000)
  const hours = Math.floor((remaining % 86400000) / 3600000)

  return { days, hours }
}

export default function Hero() {
  const { days, hours } = useCountdown(COHORT_START)

  return (
    <section className="relative overflow-hidden bg-[#0b1220] text-white">
      {/* Atmospheric background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-anchor-primary)_0%,#101b36_45%,#0b1220_100%)]" />
        <div className="absolute -top-32 right-[-8%] h-[440px] w-[580px] rounded-full bg-[radial-gradient(closest-side,rgba(79,70,229,0.28),transparent_70%)]" />
        <div className="absolute bottom-[-22%] left-[-6%] h-[400px] w-[540px] rounded-full bg-[radial-gradient(closest-side,rgba(79,70,229,0.14),transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* Left — copy */}
          <div className="min-w-0 space-y-8">
            <span className="inline-flex items-center gap-2.5 rounded-lg bg-white/[0.06] px-3.5 py-1.5 ring-1 ring-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-anchor-accent" aria-hidden="true" />
              <span className="text-sm font-medium text-blue-100/85">Expert-led cohorts</span>
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

          {/* Right — photo collage */}
          <div className="min-w-0">
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-12 lg:gap-5">
                {/* Main — students collaborating */}
                <figure className="col-span-2 min-w-0 lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:mt-8 lg:-rotate-2">
                  <img
                    src={imgStudents}
                    alt="Students collaborating on a group project around a laptop and notebooks."
                    className="aspect-[16/10] w-full rounded-xl object-cover shadow-2xl shadow-black/40 ring-1 ring-white/10 sm:aspect-[5/3] lg:aspect-[4/3]"
                    loading="eager"
                  />
                </figure>

                {/* Instructor teaching */}
                <figure className="col-span-1 min-w-0 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:-ml-10 lg:rotate-2">
                  <img
                    src={imgInstructor}
                    alt="An instructor leading a live session in a classroom."
                    className="aspect-[4/3] w-full rounded-lg object-cover shadow-xl shadow-black/40 ring-1 ring-white/10 lg:aspect-[3/4] lg:rounded-xl"
                    loading="lazy"
                  />
                </figure>

                {/* Professionals collaborating */}
                <figure className="col-span-1 min-w-0 lg:col-span-5 lg:col-start-3 lg:-ml-8 lg:-mt-16 lg:rotate-1">
                  <img
                    src={imgTeam}
                    alt="A small group of professionals collaborating around a table during a project workshop."
                    className="aspect-[4/3] w-full rounded-lg object-cover shadow-xl shadow-black/40 ring-1 ring-white/10 lg:rounded-xl"
                    loading="lazy"
                  />
                </figure>
              </div>

              {/* Floating cohort card */}
              <aside
                aria-label="Next cohort"
                className="absolute right-2 top-2 z-40 -rotate-1 rounded-lg bg-white px-3.5 py-3 shadow-xl shadow-black/40 ring-1 ring-black/5 lg:right-1 lg:top-4 lg:rotate-1"
              >
                <p className="text-[10px] font-semibold text-anchor-text-muted">Next cohort</p>
                <p className="mt-0.5 flex items-center gap-1.5 whitespace-nowrap text-sm font-bold text-anchor-text">
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-anchor-accent"
                    aria-hidden="true"
                  />
                  <span>
                    Starts <span className="font-extrabold">Oct 5, 2026</span>
                  </span>
                </p>
                <p className="mt-1 text-[11px] font-medium text-anchor-text-muted">
                  {days > 0 ? `In ${days} day${days === 1 ? '' : 's'} · ${hours}h` : 'Applications now open'}
                </p>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}