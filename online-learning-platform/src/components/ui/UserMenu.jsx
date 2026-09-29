import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../../hooks/useAuth'
import { AVATAR_COLORS, initialsFor, ROLE_HOME, ROLE_LABELS } from '../../utils/auth'
import { showToast } from '../../utils/toast'

export default function UserMenu({ tone = 'light' }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false)
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  if (!user) return null

  const dashboardHome = ROLE_HOME[user.role] ?? '/dashboard'
  const roleLabel = ROLE_LABELS[user.role] ?? 'Learner'
  const triggerTone =
    tone === 'dark'
      ? 'text-white hover:bg-white/5 focus-visible:outline-white/70'
      : 'text-anchor-text hover:bg-anchor-bg focus-visible:outline-anchor-action'

  const handleSignOut = () => {
    setOpen(false)
    logout()
    showToast('Signed out.', 'info')
    navigate('/')
  }

  const links = [
    { label: 'Dashboard', to: dashboardHome },
    { label: 'My Cohorts', to: '/my-cohorts' },
    { label: 'Browse courses', to: '/catalog' },
    { label: 'Profile', to: '/profile' },
  ]

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${triggerTone}`}
      >
        <span
          aria-hidden="true"
          className={`grid h-8 w-8 place-items-center rounded-full text-xs font-bold text-white ${AVATAR_COLORS[user.avatar] ?? AVATAR_COLORS.indigo}`}
        >
          {initialsFor(user)}
        </span>
        <span className="hidden sm:inline">{user.firstName}</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Account menu"
          className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-anchor-border bg-anchor-surface p-1.5 shadow-xl shadow-black/10"
        >
          <div className="border-b border-anchor-border px-3 py-2.5">
            <p className="truncate text-sm font-semibold text-anchor-text">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-anchor-text-muted">{roleLabel}</p>
          </div>
          <div className="py-1">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-anchor-text transition-colors hover:bg-anchor-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="border-t border-anchor-border pt-1">
            <button
              type="button"
              role="menuitem"
              onClick={handleSignOut}
              className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-anchor-error transition-colors hover:bg-anchor-error/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-error"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
