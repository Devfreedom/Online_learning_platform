import aishaBello from '../../assets/instructors/aisha-bello.jpg'
import lenaOkafor from '../../assets/instructors/lena-okafor.jpg'
import marcusWebb from '../../assets/instructors/marcus-webb.jpg'
import priyaRaman from '../../assets/instructors/priya-raman.jpg'

const INSTRUCTORS = [
  {
    name: 'Aisha Bello',
    role: 'Senior Engineer, Stripe',
    specialty: 'Full-Stack JavaScript',
    photo: aishaBello,
    alt: 'Aisha Bello, senior engineer at Stripe, teaching full-stack JavaScript.',
  },
  {
    name: 'Dr. Lena Okafor',
    role: 'ML Lead, Hugging Face',
    specialty: 'AI Product Foundations',
    photo: lenaOkafor,
    alt: 'Dr. Lena Okafor, machine learning lead, teaching AI product foundations.',
  },
  {
    name: 'Marcus Webb',
    role: 'Design Director, Figma',
    specialty: 'Product Design',
    photo: marcusWebb,
    alt: 'Marcus Webb, design director at Figma, teaching product design.',
  },
  {
    name: 'Priya Raman',
    role: 'Editorial Data Lead, The Times',
    specialty: 'Data Storytelling',
    photo: priyaRaman,
    alt: 'Priya Raman, editorial data lead, teaching data storytelling.',
  },
]

export default function InstructorSpotlight() {
  return (
    <section
      id="instructors"
      aria-labelledby="instructors-heading"
      className="scroll-mt-24 bg-anchor-bg"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-lg bg-anchor-surface px-3 py-1.5 ring-1 ring-anchor-border">
              <span className="h-1.5 w-1.5 rounded-full bg-anchor-accent" aria-hidden="true" />
              <span className="text-sm font-medium text-anchor-text-muted">For instructors</span>
            </div>
            <h2
              id="instructors-heading"
              className="mt-4 text-3xl font-semibold tracking-tight text-anchor-text sm:text-4xl"
            >
              Learn from people shipping the work.
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-anchor-text-muted">
              Every Anchorpoint instructor works in the field they teach. They
              bring live examples, real judgement, and honest feedback.
            </p>
          </div>
          <a
            href="#"
            className="shrink-0 text-sm font-semibold text-anchor-action transition-colors hover:text-anchor-action-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-anchor-action"
          >
            Teach at Anchorpoint
          </a>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {INSTRUCTORS.map((instructor) => (
            <li key={instructor.name}>
              <article className="group overflow-hidden rounded-xl border border-anchor-border bg-anchor-surface">
                <div className="aspect-[4/5] overflow-hidden bg-anchor-bg">
                  <img
                    src={instructor.photo}
                    alt={instructor.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-semibold text-anchor-text">{instructor.name}</h3>
                  <p className="mt-0.5 text-sm text-anchor-text-muted">{instructor.role}</p>
                  <p className="mt-2 inline-block rounded-md bg-anchor-bg px-2 py-1 text-xs font-semibold text-anchor-action ring-1 ring-anchor-border">
                    {instructor.specialty}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}