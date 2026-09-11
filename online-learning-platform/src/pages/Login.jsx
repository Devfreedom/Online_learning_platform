import { useState } from 'react'
import { Link } from 'react-router'
import {
  AuthLayout,
  AuthSwitch,
  PasswordField,
  PrototypeNotice,
  SocialButtons,
  TextField,
} from '../components/auth/AuthFields'
import { validateSignIn } from '../utils/validateAuth'

const REMEMBER_KEY = 'anchorpoint-remembered-email'

export default function Login() {
  const [email, setEmail] = useState(
    () => localStorage.getItem(REMEMBER_KEY) ?? '',
  )
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(
    () => localStorage.getItem(REMEMBER_KEY) !== null,
  )
  const [errors, setErrors] = useState({})
  const [notice, setNotice] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const validation = validateSignIn({ email, password })
    setErrors(validation)
    if (Object.keys(validation).length > 0) return
    if (remember) {
      localStorage.setItem(REMEMBER_KEY, email.trim())
    } else {
      localStorage.removeItem(REMEMBER_KEY)
    }
    setNotice(
      'Prototype only — no real sign-in happened. There is no authentication backend yet.',
    )
  }

  return (
    <AuthLayout
      title="Welcome back."
      subtitle="Sign in to follow your cohorts and pick up where you left off."
    >
      <form onSubmit={handleSubmit} noValidate className="grid gap-5">
        <TextField
          id="login-email"
          label="Email address"
          type="email"
          value={email}
          onChange={setEmail}
          error={errors.email}
          autoComplete="email"
        />
        <PasswordField
          id="login-password"
          label="Password"
          value={password}
          onChange={setPassword}
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
        <PrototypeNotice message={notice} />
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
          setNotice(
            `${provider} sign-in is UI only in this prototype — no account was connected.`,
          )
        }
      />
      <div className="mt-6">
        <AuthSwitch
          prompt="New to Anchorpoint?"
          to="/signup"
          linkLabel="Create an account"
        />
      </div>
    </AuthLayout>
  )
}
