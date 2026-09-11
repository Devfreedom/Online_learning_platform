import { useState } from 'react'
import {
  AuthLayout,
  AuthSwitch,
  PrototypeNotice,
  TextField,
} from '../components/auth/AuthFields'
import { validatePasswordReset } from '../utils/validateAuth'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    const validation = validatePasswordReset({ email })
    setErrors(validation)
    if (Object.keys(validation).length > 0) return
    // Prototype only — no email is sent; show the success state instead.
    setSent(true)
  }

  return (
    <AuthLayout
      title="Reset your password."
      subtitle="Enter the email you signed up with and we'll send you a reset link."
    >
      {sent ? (
        <div className="grid gap-5">
          <p
            role="status"
            className="rounded-lg bg-anchor-bg px-4 py-3 text-sm leading-relaxed text-anchor-text ring-1 ring-anchor-border"
          >
            If an account exists for <strong>{email.trim()}</strong>, a reset
            link is on its way. Check your inbox and spam folder.
          </p>
          <PrototypeNotice message="Prototype only — no email was actually sent. There is no authentication backend yet." />
          <AuthSwitch
            prompt="Remembered it after all?"
            to="/login"
            linkLabel="Back to sign in"
          />
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="grid gap-5">
          <TextField
            id="reset-email"
            label="Email address"
            type="email"
            value={email}
            onChange={setEmail}
            error={errors.email}
            autoComplete="email"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-anchor-action px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-anchor-action-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
          >
            Send reset link
          </button>
          <AuthSwitch
            prompt="Remembered your password?"
            to="/login"
            linkLabel="Back to sign in"
          />
        </form>
      )}
    </AuthLayout>
  )
}
