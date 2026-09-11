import { instructors } from '../../data/instructors'

export default function InstructorSpotlight() {
  return (
    <section
      id="instructors"
      aria-labelledby="instructors-heading"
      className="scroll-mt-24 border-y border-anchor-border bg-anchor-surface"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-lg bg-anchor-bg px-3 py-1.5 ring-1 ring-anchor-border">
            <span className="h-1.5 w-1.5 rounded-full bg-anchor-accent" aria-hidden="true" />
            <span className="text-sm font-medium text-anchor-text-muted">Instructors</span>
          </div>
          <h2
            id="instructors-heading"
            className="mt-4 text-3xl font-semibold tracking-tight text-anchor-text sm:text-4xl"
          >
            Taught by people who&apos;ve actually done it.
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-anchor-text-muted">
            Every Anchorpoint instructor brings real professional experience
            into the cohort — live examples, honest feedback, and judgement
            earned from doing the work.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {instructors.map((instructor) => (
            <li key={instructor.id}>
              <article className="flex h-full flex-col overflow-hidden rounded-xl border border-anchor-border bg-anchor-surface shadow-sm">
                <div className="aspect-[4/5] overflow-hidden bg-anchor-bg">
                  <img
                    src={instructor.photo}
                    alt={instructor.photoAlt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-base font-semibold text-anchor-text">
                    {instructor.name}
                  </h3>
                  <p className="mt-0.5 text-sm text-anchor-text-muted">
                    {instructor.credential}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-anchor-text-muted">
                    {instructor.bio}
                  </p>
                  <a
                    href={instructor.courseHref}
                    className="mt-4 text-sm font-semibold text-anchor-action underline-offset-4 transition-colors hover:text-anchor-action-hover hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
                  >
                    View courses
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-xs text-anchor-text-muted">
          Prototype instructor profiles created for demonstration.
        </p>
      </div>
    </section>
  )
}
