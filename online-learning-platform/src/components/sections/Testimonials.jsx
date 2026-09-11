const TESTIMONIALS = [
  {
    quote:
      'The live sessions made the difference. I got honest feedback on real work from someone who ships production code every day — not generic video lessons.',
    name: 'Jordan Cole',
    context: 'Completed Full-Stack JavaScript · Oct 2025',
  },
  {
    quote:
      'With a small cohort, my questions actually got answered. Eight weeks later we had shipped a real product together, which is more than any course I took before.',
    name: 'Maya Patel',
    context: 'Completed Product Design · Jun 2025',
  },
  {
    quote:
      'I came for the curriculum and stayed for the people. The schedule kept me honest, and our cohort still meets monthly to review each other\u2019s work.',
    name: 'Sam Rivera',
    context: 'Completed Data Storytelling · Mar 2025',
  },
]

export default function Testimonials() {
  return (
    <section aria-labelledby="testimonials-heading" className="bg-anchor-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-lg bg-anchor-bg px-3 py-1.5 ring-1 ring-anchor-border">
            <span className="h-1.5 w-1.5 rounded-full bg-anchor-accent" aria-hidden="true" />
            <span className="text-sm font-medium text-anchor-text-muted">From our alumni</span>
          </div>
          <h2
            id="testimonials-heading"
            className="mt-4 text-3xl font-semibold tracking-tight text-anchor-text sm:text-4xl"
          >
            What learners say after the cohort.
          </h2>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <li key={testimonial.name}>
              <figure className="flex h-full flex-col rounded-xl border border-anchor-border bg-anchor-bg p-6">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6 text-anchor-action/30"
                  aria-hidden="true"
                >
                  <path d="M9.6 5C6 7.2 4 10.2 4 14.2 4 17 5.8 18.7 7.8 18.7c1.7 0 3-1.2 3-2.8 0-1.5-1-2.6-2.5-2.6-.3 0-.7.1-.8.1.3-1.6 1.7-3.7 3.6-5.1L9.6 5zm10 0C16 7.2 14 10.2 14 14.2c0 2.8 1.8 4.5 3.8 4.5 1.7 0 3-1.2 3-2.8 0-1.5-1-2.6-2.5-2.6-.3 0-.7.1-.8.1.3-1.6 1.7-3.7 3.6-5.1L19.6 5z" />
                </svg>
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-anchor-text">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-anchor-border pt-4">
                  <p className="text-sm font-semibold text-anchor-text">{testimonial.name}</p>
                  <p className="mt-0.5 text-xs text-anchor-text-muted">{testimonial.context}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}