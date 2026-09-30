import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import {
  AVATAR_OPTIONS,
  EDUCATION_OPTIONS,
  educationLabelFor,
  normalizeEducationLevel,
} from '../../data/profileOptions'
import { AVATAR_COLORS, initialsFor } from '../../utils/auth'
import { showToast } from '../../utils/toast'

const GOAL_SUGGESTIONS = [
  'Build career skills',
  'Switch roles',
  'Lead a team',
  'Ship a portfolio project',
  'Learn AI workflows',
]

const inputClass =
  'mt-1.5 block w-full rounded-lg border border-anchor-border bg-anchor-surface px-4 py-2.5 text-sm text-anchor-text placeholder:text-anchor-text-muted/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action'

function buildForm(source) {
  return {
    firstName: source?.firstName ?? '',
    lastName: source?.lastName ?? '',
    email: source?.email ?? '',
    educationLevel: source?.educationLevel ?? 'undergraduate',
    goals: Array.isArray(source?.goals) ? source.goals : [],
    avatar: source?.avatar ?? 'indigo',
    goalInput: '',
  }
}

export default function Profile() {
  const { user, updateUser } = useAuth()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState(() => buildForm(user))
  const [errors, setErrors] = useState({})

  const startEditing = () => {
    setForm(buildForm(user))
    setErrors({})
    setEditing(true)
  }

  if (!user) {
    return (
      <div className="rounded-xl border border-anchor-border bg-anchor-surface p-6 text-sm text-anchor-text-muted">
        Sign in to view your profile.
      </div>
    )
  }

  const set = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  const toggleGoalSuggestion = (goal) => {
    setForm((prev) => {
      const has = prev.goals.includes(goal)
      return {
        ...prev,
        goals: has ? prev.goals.filter((g) => g !== goal) : [...prev.goals, goal],
      }
    })
  }

  const addGoal = () => {
    const value = form.goalInput.trim()
    if (!value) return
    if (form.goals.includes(value)) {
      setForm((prev) => ({ ...prev, goalInput: '' }))
      return
    }
    setForm((prev) => ({ ...prev, goals: [...prev.goals, value], goalInput: '' }))
  }

  const removeGoal = (goal) => {
    setForm((prev) => ({ ...prev, goals: prev.goals.filter((g) => g !== goal) }))
  }

  const handleSave = () => {
    const nextErrors = {}
    if (!form.firstName.trim()) nextErrors.firstName = 'First name is required.'
    if (!form.lastName.trim()) nextErrors.lastName = 'Last name is required.'
    if (!form.email.trim() || !form.email.includes('@'))
      nextErrors.email = 'Enter a valid email address.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    updateUser({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim().toLowerCase(),
      educationLevel: form.educationLevel,
      avatar: form.avatar,
      goals: form.goals,
    })
    setEditing(false)
    showToast('Profile updated successfully.')
  }

  const avatarTone = AVATAR_COLORS[form.avatar] ?? AVATAR_COLORS.indigo
  const displayInitials = initialsFor({
    firstName: form.firstName,
    lastName: form.lastName,
    email: form.email,
  })

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-anchor-text sm:text-3xl">
            My profile
          </h1>
          <p className="mt-1.5 text-anchor-text-muted">
            Manage how you appear across Anchorpoint.
          </p>
        </div>
        {!editing && (
          <button
            type="button"
            onClick={startEditing}
            className="rounded-lg bg-anchor-action px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-anchor-action-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
          >
            Edit profile
          </button>
        )}
      </header>

      <section className="rounded-xl border border-anchor-border bg-anchor-surface p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <span
            role="img"
            aria-label={`${form.firstName} ${form.lastName} avatar`}
            className={`grid h-20 w-20 shrink-0 place-items-center rounded-full text-xl font-bold text-white ${avatarTone}`}
          >
            {displayInitials}
          </span>
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-anchor-text">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-sm text-anchor-text-muted">{user.email}</p>
            <p className="mt-1 text-xs text-anchor-text-muted">
              {EDUCATION_OPTIONS.find((o) => o.id === user.educationLevel)?.label ??
                user.educationLevel}
              {user.goals?.length > 0 && ` · ${user.goals.length} learning goal${user.goals.length > 1 ? 's' : ''}`}
            </p>
          </div>
        </div>

        {!editing && user.goals?.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {user.goals.map((goal) => (
              <span
                key={goal}
                className="rounded-full bg-anchor-action/10 px-3 py-1 text-xs font-semibold text-anchor-action"
              >
                {goal}
              </span>
            ))}
          </div>
        )}
      </section>

      {editing ? (
        <section className="space-y-5 rounded-xl border border-anchor-border bg-anchor-surface p-6">
          <div>
            <h2 className="font-semibold text-anchor-text">Edit profile</h2>
            <p className="mt-1 text-sm text-anchor-text-muted">
              Changes save to this browser via localStorage.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="profile-first" className="text-sm font-semibold text-anchor-text">
                First name
              </label>
              <input
                id="profile-first"
                type="text"
                value={form.firstName}
                onChange={(e) => set('firstName', e.target.value)}
                className={inputClass}
                autoComplete="given-name"
              />
              {errors.firstName && (
                <p role="alert" className="mt-1 text-xs text-anchor-error">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label htmlFor="profile-last" className="text-sm font-semibold text-anchor-text">
                Last name
              </label>
              <input
                id="profile-last"
                type="text"
                value={form.lastName}
                onChange={(e) => set('lastName', e.target.value)}
                className={inputClass}
                autoComplete="family-name"
              />
              {errors.lastName && (
                <p role="alert" className="mt-1 text-xs text-anchor-error">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="profile-email" className="text-sm font-semibold text-anchor-text">
              Email
            </label>
            <input
              id="profile-email"
              type="email"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              className={inputClass}
              autoComplete="email"
            />
            {errors.email && (
              <p role="alert" className="mt-1 text-xs text-anchor-error">{errors.email}</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="profile-education" className="text-sm font-semibold text-anchor-text">
                Education level
              </label>
              <select
                id="profile-education"
                value={form.educationLevel}
                onChange={(e) => set('educationLevel', e.target.value)}
                className={inputClass}
              >
                {EDUCATION_OPTIONS.map((o) => (
                  <option key={o.id} value={o.id}>{o.label}</option>
                ))}
              </select>
            </div>
            <div>
              <span id="avatar-label" className="text-sm font-semibold text-anchor-text">
                Avatar colour
              </span>
              <div role="radiogroup" aria-labelledby="avatar-label" className="mt-1.5 flex flex-wrap gap-2">
                {AVATAR_OPTIONS.map((o) => {
                  const selected = form.avatar === o.id
                  return (
                    <button
                      key={o.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => set('avatar', o.id)}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action ${
                        selected
                          ? 'bg-anchor-action text-white'
                          : 'bg-anchor-bg text-anchor-text-muted ring-1 ring-anchor-border hover:text-anchor-text'
                      }`}
                    >
                      {o.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <div>
            <span className="text-sm font-semibold text-anchor-text">Learning goals</span>
            <div className="mt-1.5 flex flex-wrap gap-2">
              {GOAL_SUGGESTIONS.map((goal) => {
                const active = form.goals.includes(goal)
                return (
                  <button
                    key={goal}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleGoalSuggestion(goal)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action ${
                      active
                        ? 'bg-anchor-success/15 text-anchor-success ring-1 ring-anchor-success/40'
                        : 'bg-anchor-bg text-anchor-text-muted ring-1 ring-anchor-border hover:text-anchor-text'
                    }`}
                  >
                    {active ? '✓ ' : '+ '}{goal}
                  </button>
                )
              })}
            </div>
            {form.goals.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {form.goals.map((goal) => (
                  <span
                    key={goal}
                    className="inline-flex items-center gap-2 rounded-full bg-anchor-action/10 px-3 py-1 text-xs font-semibold text-anchor-action"
                  >
                    {goal}
                    <button
                      type="button"
                      onClick={() => removeGoal(goal)}
                      aria-label={`Remove goal ${goal}`}
                      className="grid h-4 w-4 place-items-center rounded-full hover:bg-anchor-action/20 focus-visible:outline-2 focus-visible:outline-anchor-action"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
            <div className="mt-3 flex gap-2">
              <label htmlFor="goal-input" className="sr-only">Add a custom learning goal</label>
              <input
                id="goal-input"
                type="text"
                value={form.goalInput}
                onChange={(e) => set('goalInput', e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addGoal()
                  }
                }}
                placeholder="Add a custom goal and press Enter"
                className={inputClass + ' mt-0 flex-1'}
              />
              <button
                type="button"
                onClick={addGoal}
                className="shrink-0 rounded-lg border border-anchor-border px-4 py-2 text-sm font-semibold text-anchor-action transition-colors hover:border-anchor-action/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
              >
                Add
              </button>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="rounded-lg border border-anchor-border px-5 py-2.5 text-sm font-semibold text-anchor-text-muted transition-colors hover:text-anchor-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="rounded-lg bg-anchor-action px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-anchor-action-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
            >
              Save changes
            </button>
          </div>
        </section>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-anchor-border bg-anchor-surface p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-anchor-text-muted">Education</p>
            <p className="mt-1 text-sm font-semibold text-anchor-text">
              {EDUCATION_OPTIONS.find((o) => o.id === user.educationLevel)?.label ?? 'Not set'}
            </p>
          </div>
          <div className="rounded-xl border border-anchor-border bg-anchor-surface p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-anchor-text-muted">Role</p>
            <p className="mt-1 text-sm font-semibold capitalize text-anchor-text">{user.role}</p>
          </div>
        </section>
      )}
    </div>
  )
}
