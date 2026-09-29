import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router'
import { useAuth } from '../../hooks/useAuth'
import { showToast } from '../../utils/toast'

const ICON_PATHS = {
  dashboard: 'M4 13h6V4H4v9Zm0 7h6v-5H4v5Zm10 0h6V11h-6v9Zm0-16v5h6V4h-6Z',
  cohorts: 'M12 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-6 12a6 6 0 0 1 12 0M4 8h2M4 12h2M4 16h2',
  assignments: 'M9 5h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm3 4h0m-3 4h6m-6 4h4',
  progress: 'M4 19V5m0 14h16M8 19v-6m4 6V9m4 10v-4',
  calendar: 'M7 3v3m10-3v3M4 8h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z',
  certificates: 'M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm-3 0-1 6 4-2 4 2-1-6',
  quiz: 'M12 17h.01M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2-3 4M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z',
  profile: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-8 8a8 8 0 0 1 16 0',
  settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8.4-3a8.4 8.4 0 0 0-.1-1.3l2-1.5-2-3.4-2.3 1a8.3 8.3 0 0 0-2.2-1.3L15.4 3h-4l-.4 2.5a8.3 8.3 0 0 0-2.2 1.3l-2.3-1-2 3.4 2 1.5a8.4 8.4 0 0 0 0 2.6l-2 1.5 2 3.4 2.3-1a8.3 8.3 0 0 0 2.2 1.3l.4 2.5h4l.4-2.5a8.3 8.3 0 0 0 2.2-1.3l2.3 1 2-3.4-2-1.5c.1-.4.1-.9.1-1.3Z',
}

const SECTIONS = [
  {
    heading: 'Learning',
    items: [
      { label: 'Dashboard', to: '/dashboard', icon: 'dashboard' },
      { label: 'My Cohorts', to: '/my-cohorts', icon: 'cohorts' },
      { label: 'Assignments', to: '/assignments', icon: 'assignments' },
      { label: 'Progress', to: '/progress', icon: 'progress' },
      { label: 'Calendar', to: '/calendar', icon: 'calendar' },
    ],
  },
  {
    heading: 'Records',
    items: [
      { label: 'Certificates', to: '/certificates', icon: 'certificates' },
      { label: 'Quiz History', to: '/quiz-history', icon: 'quiz' },
    ],
  },
  {
    heading: 'Account',
    items: [
      { label: 'Profile', to: '/profile', icon: 'profile' },
      { label: 'Settings', to: '/settings', icon: 'settings' },
    ],
  },
]

function Icon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4.5 w-4.5 shrink-0"
      aria-hidden="true"
    >
      <path d={ICON_PATHS[name] ?? ICON_PATHS.dashboard} />
    </svg>
  )
}

function NavItem({ item, onNavigate }) {
  return (
    <NavLink
      to={item.to}
      onClick={onNavigate}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70 ${
          isActive
            ? 'bg-anchor-action text-white'
            : 'text-blue-100/60 hover:bg-white/5 hover:text-white'
        }`
      }
    >
      <Icon name={item.icon} />
      {item.label}
    </NavLink>
  )
}

function SidebarContent({ onNavigate }) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = () => {
    logout()
    showToast('Signed out.', 'info')
    navigate('/')
  }

  return (
    <div className="flex h-full flex-col">
      <div className="px-4 py-5">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-anchor-action text-sm font-bold text-white">
            A
          </span>
          <span className="text-base font-semibold tracking-tight text-white">
            Anchorpoint
          </span>
        </Link>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 pb-4" aria-label="Learner">
        {SECTIONS.map((section) => (
          <div key={section.heading}>
            <p className="px-3 text-xs font-semibold uppercase tracking-wide text-blue-100/40">
              {section.heading}
            </p>
            <div className="mt-2 space-y-1">
              {section.items.map((item) => (
                <NavItem key={item.to} item={item} onNavigate={onNavigate} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 p-3">
        <button
          type="button"
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-blue-100/60 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4.5 w-4.5 shrink-0"
            aria-hidden="true"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
          Sign out
        </button>
      </div>
    </div>
  )
}

export default function LearnerShell() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!drawerOpen) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setDrawerOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [drawerOpen])

  return (
    <div className="min-h-screen bg-anchor-bg lg:flex">
      {/* Desktop sidebar */}
      <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 bg-anchor-primary lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-black/50"
            onClick={() => setDrawerOpen(false)}
          />
          <div
            id="learner-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Learner navigation"
            className="absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-anchor-primary shadow-xl"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close navigation"
              className="absolute right-3 top-4 grid h-9 w-9 place-items-center rounded-lg text-blue-100/70 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
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
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
            <SidebarContent onNavigate={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}

      {/* Main column */}
      <div className="min-w-0 flex-1">
        <div className="sticky top-16 z-30 flex h-12 items-center gap-3 border-b border-anchor-border bg-anchor-surface/95 px-4 backdrop-blur lg:hidden">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-expanded={drawerOpen}
            aria-controls="learner-drawer"
            aria-label="Open navigation"
            className="grid h-9 w-9 place-items-center rounded-lg text-anchor-text transition-colors hover:bg-anchor-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
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
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
          <span className="text-sm font-semibold text-anchor-text">
            Learning workspace
          </span>
        </div>

        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
