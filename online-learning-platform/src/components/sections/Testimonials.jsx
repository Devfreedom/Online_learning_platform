import { testimonials } from '../../data/testimonials'

export default function Testimonials() {
  return (
    <section aria-labelledby="testimonials-heading" className="bg-anchor-bg">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-lg bg-anchor-surface px-3 py-1.5 ring-1 ring-anchor-border">
            <span className="h-1.5 w-1.5 rounded-full bg-anchor-accent" aria-hidden="true" />
            <span className="text-sm font-medium text-anchor-text-muted">
              Student experience
            </span>
          </div>
          <h2
            id="testimonials-heading"
            className="mt-4 text-3xl font-semibold tracking-tight text-anchor-text sm:text-4xl"
          >
            What students say.
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-anchor-text-muted">
            Honest accounts of learning alongside experienced practitioners —
            and a small group that keeps you accountable.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <li key={testimonial.id}>
              <figure className="flex h-full flex-col rounded-xl border border-anchor-border bg-anchor-surface p-8 shadow-sm">
                <blockquote className="flex-1 font-serif text-lg leading-relaxed text-anchor-text">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-anchor-border pt-4">
                  <p className="text-sm font-semibold text-anchor-text">
                    {testimonial.name}
                  </p>
                  <p className="mt-0.5 text-xs text-anchor-text-muted">
                    {testimonial.course}
                  </p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-xs text-anchor-text-muted">
          Prototype testimonials written for demonstration.
        </p>
      </div>
    </section>
  )
}
