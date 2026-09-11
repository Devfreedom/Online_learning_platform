const FOOTER_COLUMNS = [
  {
    heading: 'Courses',
    links: [
      { label: 'Full-Stack JavaScript', href: '#courses' },
      { label: 'Product Design', href: '#courses' },
      { label: 'AI Product Foundations', href: '#courses' },
      { label: 'View all cohorts', href: '#courses' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Careers', href: '#' },
      { label: 'For instructors', href: '#instructors' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Help centre', href: '#' },
      { label: 'Community', href: '#' },
      { label: 'Refund policy', href: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-anchor-primary text-blue-100/70">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div id="about" className="scroll-mt-24">
            <a href="/" className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-anchor-action text-sm font-bold text-white">
                A
              </span>
              <span className="text-lg font-semibold tracking-tight text-white">Anchorpoint</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Anchorpoint runs cohort-based, expert-led courses with real start
              dates, live sessions, and practical projects. Learn in a small
              group and leave with work to show for it.
            </p>
          </div>

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
          <p className="text-xs">© 2026 Anchorpoint Learning, Inc. All rights reserved.</p>
          <div className="flex items-center gap-6 text-xs">
            <a href="#" className="transition-colors hover:text-white">Privacy</a>
            <a href="#" className="transition-colors hover:text-white">Terms</a>
            <a href="#" className="transition-colors hover:text-white">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  )
}