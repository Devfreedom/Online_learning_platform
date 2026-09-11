import { useState } from 'react'
import {
  AuthLayout,
  AuthSwitch,
  PasswordField,
  PrototypeNotice,
  SocialButtons,
  TextField,
} from '../components/auth/AuthFields'
import { validateSignUp } from '../utils/validateAuth'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [notice, setNotice] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const validation = validateSignUp({ name, email, password })
    setErrors(validation)
    if (Object.keys(validation).length > 0) return
    setNotice(
      'Prototype only — no account was created. There is no authentication backend yet.',
    )
  }

  return (
    <AuthLayout
      title="Create your account."
      subtitle="Join a live cohort and learn alongside people doing the work."
    >
      <form onSubmit={handleSubmit} noValidate className="grid gap-5">
        <TextField
          id="signup-name"
          label="Full name"
          value={name}
          onChange={setName}
          error={errors.name}
          autoComplete="name"
        />
        <TextField
          id="signup-email"
          label="Email address"
          type="email"
          value={email}
          onChange={setEmail}
          error={errors.email}
          autoComplete="email"
        />
        <PasswordField
          id="signup-password"
          label="Password"
          value={password}
          onChange={setPassword}
          error={errors.password}
          autoComplete="new-password"
        />
        <PrototypeNotice message={notice} />
        <button
          type="submit"
          className="w-full rounded-lg bg-anchor-action px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-anchor-action-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
        >
          Create account
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
            `${provider} sign-up is UI only in this prototype — no account was connected.`,
          )
        }
      />
      <div className="mt-6">
        <AuthSwitch
          prompt="Already have an account?"
          to="/login"
          linkLabel="Sign in"
        />
      </div>
    </AuthLayout>
  )
}
