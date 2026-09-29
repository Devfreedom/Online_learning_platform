import { useState } from 'react'
import { useNavigate } from 'react-router'
import {
  AuthLayout,
  AuthSwitch,
  PasswordField,
  TextField,
} from '../components/auth/AuthFields'
import { useAuth } from '../hooks/useAuth'
import { AVATAR_COLORS } from '../utils/auth'
import { showToast } from '../utils/toast'
import { passwordStrength, validateIdentityStep } from '../utils/validateAuth'

const ROLES = [
  {
    role: 'learner',
    title: 'Learner',
    description:
      'Join cohorts, attend live sessions and complete practical work.',
  },
  {
    role: 'instructor',
    title: 'Instructor',
    description: 'Create cohorts, teach learners and review assignments.',
  },
  {
    role: 'administrator',
    title: 'Administrator',
    description: 'Manage the platform, courses and users.',
  },
]

const EDUCATION_LEVELS = [
  'Junior Secondary',
  'Senior Secondary',
  'Undergraduate',
  'Graduate',
  'Professional',
]

const GOALS = [
  'Build career skills',
  'Learn a new subject',
  'Prepare for exams',
  'Build practical projects',
  'Teach others',
]

const AVATAR_OPTIONS = ['indigo', 'emerald', 'amber', 'rose']

const STRENGTH_BAR = ['bg-anchor-error', 'bg-anchor-error', 'bg-anchor-accent', 'bg-anchor-success', 'bg-anchor-success']

const STEP_LABELS = ['Identity', 'Role', 'Personalize']

function StepIndicator({ step }) {
  return (
    <ol className="mb-6 grid grid-cols-3 gap-2" aria-label="Signup progress">
      {STEP_LABELS.map((label, index) => {
        const number = index + 1
        const state = number === step ? 'current' : number < step ? 'done' : 'todo'
        return (
          <li key={label} className="flex flex-col gap-1.5">
            <span
              className={`h-1.5 rounded-full ${
                state === 'todo' ? 'bg-anchor-border' : 'bg-anchor-action'
              }`}
              aria-hidden="true"
            />
            <span
              className={`text-xs font-semibold ${
                state === 'todo' ? 'text-anchor-text-muted' : 'text-anchor-action'
              }`}
              aria-current={state === 'current' ? 'step' : undefined}
            >
              {number}. {label}
            </span>
          </li>
        )
      })}
    </ol>
  )
}

function PasswordStrength({ password }) {
  if (!password) return null
  const { score, label } = passwordStrength(password)
  return (
    <div aria-live="polite">
      <div className="flex gap-1.5" aria-hidden="true">
        {[0, 1, 2, 3].map((index) => (
          <span
            key={index}
            className={`h-1.5 flex-1 rounded-full ${
              index < score ? STRENGTH_BAR[score] : 'bg-anchor-border'
            }`}
          />
        ))}
      </div>
      <p className="mt-1.5 text-xs text-anchor-text-muted">
        Password strength: <span className="font-semibold">{label}</span>
      </p>
    </div>
  )
}

function SuccessScreen({ firstName }) {
  const navigate = useNavigate()
  const summary = [
    { label: 'Cohorts ready', value: '2' },
    { label: 'Lessons available', value: '24' },
    { label: 'Quizzes available', value: '9' },
  ]
  return (
    <AuthLayout
      title="Your learning workspace is ready."
      subtitle="We've prepared a starter learning space so you can begin exploring Anchorpoint."
    >
      <p className="text-sm text-anchor-text-muted">
        Welcome, {firstName}. Here&apos;s what&apos;s waiting for you.
      </p>
      <ul className="mt-5 grid grid-cols-3 gap-3">
        {summary.map((item) => (
          <li
            key={item.label}
            className="rounded-xl border border-anchor-border bg-anchor-bg px-3 py-4 text-center"
          >
            <p className="text-2xl font-bold text-anchor-action">{item.value}</p>
            <p className="mt-1 text-xs font-medium leading-snug text-anchor-text-muted">
              {item.label}
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-6 grid gap-3">
        <button
          type="button"
          onClick={() => navigate('/dashboard', { replace: true })}
          className="w-full rounded-lg bg-anchor-action px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-anchor-action-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
        >
          Go to my dashboard
        </button>
        <button
          type="button"
          onClick={() => navigate('/catalog')}
          className="w-full rounded-lg border border-anchor-border bg-anchor-surface px-5 py-3 text-sm font-semibold text-anchor-text transition-colors hover:border-anchor-action/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
        >
          Browse courses
        </button>
      </div>
    </AuthLayout>
  )
}

export default function Signup() {
  const { signup } = useAuth()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'learner',
    educationLevel: 'Undergraduate',
    avatar: 'indigo',
    goals: [],
    guidedTour: true,
    goalsText: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [created, setCreated] = useState(null)

  const patch = (values) => setForm((prev) => ({ ...prev, ...values }))

  const toggleGoal = (goal) => {
    setForm((prev) => {
      const goals = prev.goals.includes(goal)
        ? prev.goals.filter((item) => item !== goal)
        : [...prev.goals, goal]
      return { ...prev, goals }
    })
  }

  const nextFromIdentity = (event) => {
    event.preventDefault()
    const validation = validateIdentityStep(form)
    setErrors(validation)
    if (Object.keys(validation).length > 0) return
    setStep(2)
  }

  const handleCreate = () => {
    setSubmitting(true)
    window.setTimeout(() => {
      const user = signup({
        fullName: form.fullName,
        email: form.email,
        role: form.role,
        educationLevel: form.educationLevel,
        avatar: form.avatar,
        goals: form.goalsText.trim()
          ? [...form.goals, form.goalsText.trim()]
          : form.goals,
        guidedTour: form.guidedTour,
      })
      setSubmitting(false)
      setCreated(user)
      showToast('Account created.')
    }, 900)
  }

  if (created) return <SuccessScreen firstName={created.firstName} />

  return (
    <AuthLayout
      title="Create your account."
      subtitle="Join a live cohort and learn alongside people doing the work."
    >
      <StepIndicator step={step} />

      {step === 1 && (
        <form onSubmit={nextFromIdentity} noValidate className="grid gap-5">
          <TextField
            id="signup-name"
            label="Full name"
            value={form.fullName}
            onChange={(value) => patch({ fullName: value })}
            error={errors.fullName}
            autoComplete="name"
          />
          <TextField
            id="signup-email"
            label="Email address"
            type="email"
            value={form.email}
            onChange={(value) => patch({ email: value })}
            error={errors.email}
            autoComplete="email"
          />
          <div className="grid gap-2">
            <PasswordField
              id="signup-password"
              label="Password"
              value={form.password}
              onChange={(value) => patch({ password: value })}
              error={errors.password}
              autoComplete="new-password"
            />
            <PasswordStrength password={form.password} />
          </div>
          <PasswordField
            id="signup-confirm"
            label="Confirm password"
            value={form.confirmPassword}
            onChange={(value) => patch({ confirmPassword: value })}
            error={errors.confirmPassword}
            autoComplete="new-password"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-anchor-action px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-anchor-action-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
          >
            Continue
          </button>
        </form>
      )}

      {step === 2 && (
        <div className="grid gap-5">
          <fieldset>
            <legend className="text-base font-semibold text-anchor-text">
              How will you use Anchorpoint?
            </legend>
            <div className="mt-4 grid gap-3" role="radiogroup">
              {ROLES.map((option) => {
                const active = form.role === option.role
                return (
                  <button
                    key={option.role}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => patch({ role: option.role })}
                    className={`rounded-xl border px-4 py-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action ${
                      active
                        ? 'border-anchor-action bg-anchor-action/5'
                        : 'border-anchor-border bg-anchor-surface hover:border-anchor-action/40'
                    }`}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold text-anchor-text">
                        {option.title}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`grid h-5 w-5 place-items-center rounded-full border ${
                          active
                            ? 'border-anchor-action bg-anchor-action text-white'
                            : 'border-anchor-border'
                        }`}
                      >
                        {active && (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3 w-3"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </span>
                    </span>
                    <span className="mt-1.5 block text-sm leading-relaxed text-anchor-text-muted">
                      {option.description}
                    </span>
                  </button>
                )
              })}
            </div>
          </fieldset>

          {form.role === 'learner' && (
            <div>
              <p className="text-sm font-semibold text-anchor-text">
                Where are you learning right now?
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {EDUCATION_LEVELS.map((level) => {
                  const active = form.educationLevel === level
                  return (
                    <button
                      key={level}
                      type="button"
                      aria-pressed={active}
                      onClick={() => patch({ educationLevel: level })}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action ${
                        active
                          ? 'border-anchor-action bg-anchor-action text-white'
                          : 'border-anchor-border bg-anchor-surface text-anchor-text hover:border-anchor-action/40'
                      }`}
                    >
                      {level}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="rounded-lg border border-anchor-border bg-anchor-surface px-5 py-3 text-sm font-semibold text-anchor-text transition-colors hover:border-anchor-action/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="flex-1 rounded-lg bg-anchor-action px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-anchor-action-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="grid gap-6">
          <div>
            <p className="text-sm font-semibold text-anchor-text">Avatar color</p>
            <div className="mt-3 flex gap-3">
              {AVATAR_OPTIONS.map((color) => {
                const active = form.avatar === color
                return (
                  <button
                    key={color}
                    type="button"
                    aria-label={`Avatar color ${color}`}
                    aria-pressed={active}
                    onClick={() => patch({ avatar: color })}
                    className={`h-9 w-9 rounded-full ring-offset-2 transition-shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action ${
                      AVATAR_COLORS[color]
                    } ${active ? 'ring-2 ring-anchor-text' : ''}`}
                  />
                )
              })}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-anchor-text">Learning goal</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {GOALS.map((goal) => {
                const active = form.goals.includes(goal)
                return (
                  <button
                    key={goal}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleGoal(goal)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action ${
                      active
                        ? 'border-anchor-action bg-anchor-action text-white'
                        : 'border-anchor-border bg-anchor-surface text-anchor-text hover:border-anchor-action/40'
                    }`}
                  >
                    {goal}
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <label
              htmlFor="signup-goals-text"
              className="block text-sm font-semibold text-anchor-text"
            >
              Anything else you want to learn? (optional)
            </label>
            <textarea
              id="signup-goals-text"
              rows={2}
              value={form.goalsText}
              onChange={(event) => patch({ goalsText: event.target.value })}
              placeholder="e.g. Get better at product discovery"
              className="mt-1.5 block w-full rounded-lg border border-anchor-border bg-anchor-surface px-4 py-2.5 text-sm text-anchor-text placeholder:text-anchor-text-muted/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
            />
          </div>

          <label
            htmlFor="signup-tour"
            className="flex cursor-pointer items-start gap-3 rounded-xl border border-anchor-border bg-anchor-bg px-4 py-3"
          >
            <input
              id="signup-tour"
              type="checkbox"
              checked={form.guidedTour}
              onChange={(event) => patch({ guidedTour: event.target.checked })}
              className="mt-0.5 h-4 w-4 rounded accent-anchor-action"
            />
            <span>
              <span className="block text-sm font-semibold text-anchor-text">
                Show me around with a guided tour
              </span>
              <span className="mt-0.5 block text-xs leading-relaxed text-anchor-text-muted">
                We&apos;ll point out the important parts after you sign in.
              </span>
            </span>
          </label>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={submitting}
              className="rounded-lg border border-anchor-border bg-anchor-surface px-5 py-3 text-sm font-semibold text-anchor-text transition-colors hover:border-anchor-action/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action disabled:opacity-60"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleCreate}
              disabled={submitting}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-anchor-action px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-anchor-action-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action disabled:opacity-70"
            >
              {submitting && (
                <span
                  aria-hidden="true"
                  className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                />
              )}
              {submitting ? 'Creating account…' : 'Create my account'}
            </button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="mt-6">
          <AuthSwitch
            prompt="Already have an account?"
            to="/login"
            linkLabel="Sign in"
          />
        </div>
      )}

      {step === 1 && (
        <p className="mt-6 rounded-lg bg-anchor-bg px-4 py-3 text-xs leading-relaxed text-anchor-text-muted ring-1 ring-anchor-border">
          Prototype signup — accounts are stored only in your browser. No email
          is sent and no real data leaves this device.
        </p>
      )}
    </AuthLayout>
  )
}
