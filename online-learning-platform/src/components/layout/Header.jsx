import { useState } from 'react'
import { Link } from 'react-router'

const NAV_LINKS = [
  { label: 'Browse Courses', to: '/catalog' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'For Instructors', href: '#instructors' },
  { label: 'About', href: '#about' },
]

function NavItem({ link, className }) {
  if (link.to) {
    return (
      <Link key={link.to} to={link.to} className={className}>
        {link.label}
      </Link>
    )
  }
  return (
    <a key={link.href} href={link.href} className={className}>
      {link.label}
    </a>
  )
}

function MobileMenu({ open }) {
  return (
    <div
      id="mobile-menu"
      className={`${
        open ? '' : 'hidden '
      }border-t border-white/10 bg-anchor-primary lg:hidden`}
    >
      <nav className="mx-auto max-w-7xl space-y-1 px-4 pt-3 pb-4 sm:px-6">
        {NAV_LINKS.map((link) => (
          <NavItem
            key={link.to ?? link.href}
            link={link}
            className="block rounded-lg px-3 py-2 text-sm font-medium text-blue-100/75 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
          />
        ))}
        <div className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-3">
          <a
            href="#"
            className="rounded-lg px-3 py-2 text-sm font-medium text-blue-100/75 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
          >
            Log in
          </a>
          <a
            href="#"
            className="rounded-lg bg-anchor-action px-3 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-anchor-action-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-accent"
          >
            Get started
          </a>
        </div>
      </nav>
    </div>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)

  const toggle = () => setOpen((prev) => !prev)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-anchor-primary">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
        {/* Logo / wordmark */}
        <a href="/" className="flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-anchor-action text-sm font-bold text-white">
            A
          </span>
          <span className="text-lg font-semibold tracking-tight text-white">
            Anchorpoint
          </span>
        </a>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavItem
              key={link.to ?? link.href}
              link={link}
              className="rounded-md text-sm font-medium text-blue-100/75 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
            />
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <a
            href="#"
            className="rounded-lg px-3 py-2 text-sm font-medium text-blue-100/75 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
          >
            Log in
          </a>
          <a
            href="#"
            className="rounded-lg bg-anchor-action px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-anchor-action-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-anchor-accent"
          >
            Get started
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          className="grid h-10 w-10 place-items-center rounded-lg text-blue-100/75 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70 lg:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      <MobileMenu open={open} />
    </header>
  )
}