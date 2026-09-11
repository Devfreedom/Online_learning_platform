import { useState } from 'react'

const FOOTER_COLUMNS = [
  {
    heading: 'Courses',
    links: [
      { label: 'Product & Design', href: '#courses' },
      { label: 'Data & AI', href: '#courses' },
      { label: 'Leadership', href: '#courses' },
      { label: 'Marketing', href: '#courses' },
      { label: 'Engineering', href: '#courses' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
    ],
  },
  {
    heading: 'For Instructors',
    links: [
      { label: 'Teach with us', href: '#instructors' },
      { label: 'Instructor resources', href: '#instructors' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Help center', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
]

function Newsletter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (email.trim() === '') return
    setSubscribed(true)
  }

  return (
    <div>
      <h2 className="text-sm font-semibold text-white">Get the next cohort updates.</h2>
      <p className="mt-2 text-sm leading-relaxed text-blue-100/60">
        Upcoming cohort announcements, a few times a year. No spam.
      </p>
      {subscribed ? (
        <p className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white/5 px-4 py-3 text-sm font-medium text-white ring-1 ring-white/10">
          <span className="h-1.5 w-1.5 rounded-full bg-anchor-success" aria-hidden="true" />
          You&apos;re on the list.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address"
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-blue-100/40 focus:border-anchor-action focus:outline-2 focus:outline-anchor-action"
          />
          <button
            type="submit"
            className="shrink-0 rounded-lg bg-anchor-action px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-anchor-action-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-anchor-primary text-blue-100/60">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div id="about" className="scroll-mt-24">
            <a href="/" className="inline-flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-anchor-action text-sm font-bold text-white">
                A
              </span>
              <span className="text-lg font-semibold tracking-tight text-white">
                Anchorpoint
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Cohort-based, expert-led courses with real start dates, live
              sessions, and practical projects.
            </p>
            <p className="mt-4 text-xs text-blue-100/45">
              Prototype platform — not a real learning provider.
            </p>
          </div>
          <Newsletter />
        </div>

        <div className="mt-12 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 sm:grid-cols-4">
          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="text-sm font-semibold text-white">{column.heading}</h2>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs">© 2026 Anchorpoint Learning, Inc. Prototype — all content is fictional.</p>
          <div className="flex items-center gap-6 text-xs">
            <a href="#" className="transition-colors hover:text-white">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
