import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import {
  AuthLayout,
  AuthSwitch,
  PasswordField,
  SocialButtons,
  TextField,
} from '../components/auth/AuthFields'
import { useAuth } from '../hooks/useAuth'
import { ROLE_LABELS } from '../utils/auth'
import { showToast } from '../utils/toast'
import { validateSignIn } from '../utils/validateAuth'

const REMEMBER_KEY = 'anchorpoint-remembered-email'

const ROLE_OPTIONS = [
  { role: 'learner', email: 'student@example.com' },
  { role: 'instructor', email: 'instructor@example.com' },
  { role: 'administrator', email: 'admin@example.com' },
]

function roleForEmail(email) {
  const match = ROLE_OPTIONS.find(
    (option) => option.email.toLowerCase() === email?.trim().toLowerCase(),
  )
  return match?.role ?? 'learner'
}

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const [email, setEmail] = useState(
    () => localStorage.getItem(REMEMBER_KEY) ?? '',
  )
  const [role, setRole] = useState(() => roleForEmail(localStorage.getItem(REMEMBER_KEY)))
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(
    () => localStorage.getItem(REMEMBER_KEY) !== null,
  )
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')

  const redirectTo = location.state?.from ?? '/dashboard'

  const selectRole = (nextRole) => {
    setRole(nextRole)
    const option = ROLE_OPTIONS.find((item) => item.role === nextRole)
    setEmail(option?.email ?? '')
    setErrors({})
    setFormError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const validation = validateSignIn({ email, password })
    setErrors(validation)
    setFormError('')
    if (Object.keys(validation).length > 0) return

    const result = login(email, password)
    if (!result.ok) {
      setFormError(result.error)
      return
    }

    if (remember) {
      localStorage.setItem(REMEMBER_KEY, email.trim())
    } else {
      localStorage.removeItem(REMEMBER_KEY)
    }

    showToast("You're logged in.")
    navigate(redirectTo, { replace: true })
  }

  return (
    <AuthLayout
      title="Welcome back."
      subtitle="Sign in to follow your cohorts and pick up where you left off."
    >
      <div className="mb-6">
        <p className="text-sm font-semibold text-anchor-text">Continue as</p>
        <div
          role="group"
          aria-label="Select a demo role"
          className="mt-2 grid grid-cols-3 gap-1 rounded-lg bg-anchor-bg p-1 ring-1 ring-anchor-border"
        >
          {ROLE_OPTIONS.map((option) => {
            const active = role === option.role
            return (
              <button
                key={option.role}
                type="button"
                aria-pressed={active}
                onClick={() => selectRole(option.role)}
                className={`rounded-md px-2 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action ${
                  active
                    ? 'bg-anchor-surface text-anchor-action shadow-sm ring-1 ring-anchor-border'
                    : 'text-anchor-text-muted hover:text-anchor-text'
                }`}
              >
                {ROLE_LABELS[option.role]}
              </button>
            )
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="grid gap-5">
        <TextField
          id="login-email"
          label="Email address"
          type="email"
          value={email}
          onChange={(value) => {
            setEmail(value)
            setFormError('')
          }}
          error={errors.email}
          autoComplete="email"
        />
        <PasswordField
          id="login-password"
          label="Password"
          value={password}
          onChange={(value) => {
            setPassword(value)
            setFormError('')
          }}
          error={errors.password}
          autoComplete="current-password"
        />
        <div className="flex items-center justify-between gap-4">
          <label
            htmlFor="login-remember"
            className="flex cursor-pointer items-center gap-2 text-sm text-anchor-text"
          >
            <input
              id="login-remember"
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
              className="h-4 w-4 rounded accent-anchor-action"
            />
            Remember me
          </label>
          <Link
            to="/forgot-password"
            className="text-sm font-semibold text-anchor-action underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
          >
            Forgot password?
          </Link>
        </div>
        {formError && (
          <p
            role="alert"
            className="rounded-lg border border-anchor-error/30 bg-anchor-error/5 px-4 py-3 text-sm font-medium text-anchor-error"
          >
            {formError}
          </p>
        )}
        <button
          type="submit"
          className="w-full rounded-lg bg-anchor-action px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-anchor-action-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
        >
          Sign in
        </button>
      </form>
      <div
        aria-hidden="true"
        className="my-6 flex items-center gap-3 text-xs text-anchor-text-muted"
      >
        <span className="h-px flex-1 bg-anchor-border" />
        or
        <span className="h-px flex-1 bg-anchor-border" />
      </div>
      <SocialButtons
        onPrototype={(provider) =>
          showToast(`${provider} sign-in is UI only in this prototype.`, 'info')
        }
      />
      <div className="mt-6">
        <AuthSwitch
          prompt="New to Anchorpoint?"
          to="/signup"
          linkLabel="Create an account"
        />
      </div>
      <p className="mt-6 rounded-lg bg-anchor-bg px-4 py-3 text-xs leading-relaxed text-anchor-text-muted ring-1 ring-anchor-border">
        Prototype demo accounts — use the role selector above, or sign in with
        student@example.com / student123.
      </p>
    </AuthLayout>
  )
}
