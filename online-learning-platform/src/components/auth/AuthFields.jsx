import { useState } from 'react'
import { Link } from 'react-router'

export function FieldError({ id, message }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-anchor-error">
      {message}
    </p>
  )
}

const inputClass = (error) =>
  `mt-1.5 block w-full rounded-lg border bg-anchor-surface px-4 py-2.5 text-sm text-anchor-text placeholder:text-anchor-text-muted/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action ${
    error ? 'border-anchor-error' : 'border-anchor-border'
  }`

export function TextField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  autoComplete,
}) {
  const errorId = `${id}-error`
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-anchor-text">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={inputClass(error)}
      />
      <FieldError id={errorId} message={error} />
    </div>
  )
}

export function PasswordField({ id, label, value, onChange, error, autoComplete }) {
  const [shown, setShown] = useState(false)
  const errorId = `${id}-error`
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-anchor-text">
        {label}
      </label>
      <div className="relative mt-1.5">
        <input
          id={id}
          type={shown ? 'text' : 'password'}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`block w-full rounded-lg border bg-anchor-surface py-2.5 pr-20 pl-4 text-sm text-anchor-text placeholder:text-anchor-text-muted/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action ${
            error ? 'border-anchor-error' : 'border-anchor-border'
          }`}
        />
        <button
          type="button"
          onClick={() => setShown((prev) => !prev)}
          aria-pressed={shown}
          aria-label={shown ? 'Hide password' : 'Show password'}
          className="absolute inset-y-0 right-0 rounded-r-lg px-4 text-sm font-semibold text-anchor-action hover:text-anchor-action-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
        >
          {shown ? 'Hide' : 'Show'}
        </button>
      </div>
      <FieldError id={errorId} message={error} />
    </div>
  )
}

export function PrototypeNotice({ message }) {
  if (!message) return null
  return (
    <p
      role="status"
      className="rounded-lg bg-anchor-bg px-4 py-3 text-sm leading-relaxed text-anchor-text-muted ring-1 ring-anchor-border"
    >
      {message}
    </p>
  )
}

export function SocialButtons({ onPrototype }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <button
        type="button"
        onClick={() => onPrototype('Google')}
        className="rounded-lg border border-anchor-border bg-anchor-surface px-4 py-2.5 text-sm font-semibold text-anchor-text transition-colors hover:border-anchor-action/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
      >
        Continue with Google
      </button>
      <button
        type="button"
        onClick={() => onPrototype('GitHub')}
        className="rounded-lg border border-anchor-border bg-anchor-surface px-4 py-2.5 text-sm font-semibold text-anchor-text transition-colors hover:border-anchor-action/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
      >
        Continue with GitHub
      </button>
    </div>
  )
}

export function AuthSwitch({ prompt, to, linkLabel }) {
  return (
    <p className="text-center text-sm text-anchor-text-muted">
      {prompt}{' '}
      <Link
        to={to}
        className="font-semibold text-anchor-action underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
      >
        {linkLabel}
      </Link>
    </p>
  )
}

export function AuthLayout({ title, subtitle, children }) {
  return (
    <main className="bg-anchor-bg">
      <div className="mx-auto max-w-md px-4 py-12 sm:px-6 lg:py-16">
        <h1 className="text-3xl font-semibold tracking-tight text-anchor-text">
          {title}
        </h1>
        <p className="mt-2 leading-relaxed text-anchor-text-muted">{subtitle}</p>
        <div className="mt-8 rounded-xl border border-anchor-border bg-anchor-surface p-6 shadow-sm sm:p-8">
          {children}
        </div>
      </div>
    </main>
  )
}
