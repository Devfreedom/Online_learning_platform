import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../../hooks/useAuth'
import {
  applyAppearance,
  defaultSettings,
  loadSettings,
  saveSettings,
} from '../../utils/learningStore'
import { showToast } from '../../utils/toast'

function Toggle({ checked, onChange, label, description }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-4 py-3 text-left"
    >
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-anchor-text">{label}</span>
        {description && (
          <span className="mt-0.5 block text-xs leading-relaxed text-anchor-text-muted">
            {description}
          </span>
        )}
      </span>
      <span
        aria-hidden="true"
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? 'bg-anchor-action' : 'bg-slate-300'
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
            checked ? 'left-[22px]' : 'left-0.5'
          }`}
        />
      </span>
    </button>
  )
}

export default function Settings() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [userKey] = useState(() => user?.id)
  const [settings, setSettings] = useState(() => loadSettings(user?.id))
  const [passwordForm, setPasswordForm] = useState({ current: '', next: '', confirm: '' })
  const [passwordError, setPasswordError] = useState('')

  useEffect(() => {
    applyAppearance(settings.appearance)
  }, [settings.appearance])

  // Keep the lint-safe pattern: settings load once per signed-in user.
  // userKey preserves the initial user scope without syncing state in an effect.

  const update = (patch) => {
    const next = { ...settings, ...patch }
    setSettings(next)
    saveSettings(user?.id, next)
    applyAppearance(next.appearance)
  }

  const handleToggle = (key) => (value) => {
    update({ [key]: value })
    showToast('Settings saved.')
  }

  const handleAppearance = (appearance) => {
    if (settings.appearance === appearance) return
    update({ appearance })
    showToast(appearance === 'dark' ? 'Dark appearance on.' : 'Light appearance on.', 'info')
  }

  const handlePasswordChange = () => {
    setPasswordError('')
    if (!passwordForm.current || !passwordForm.next || !passwordForm.confirm) {
      setPasswordError('Fill in all three password fields.')
      return
    }
    if (passwordForm.next.length < 8) {
      setPasswordError('New password must be at least 8 characters.')
      return
    }
    if (passwordForm.next !== passwordForm.confirm) {
      setPasswordError('New passwords do not match.')
      return
    }
    setPasswordForm({ current: '', next: '', confirm: '' })
    showToast('Password updated for this prototype.')
  }

  const handleSignOut = () => {
    logout()
    showToast('Signed out.', 'info')
    navigate('/')
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-anchor-text sm:text-3xl">
          Settings
        </h1>
        <p className="mt-1.5 text-anchor-text-muted">
          Account, learning and notification preferences.
        </p>
      </header>

      <section className="rounded-xl border border-anchor-border bg-anchor-surface p-6">
        <h2 className="font-semibold text-anchor-text">Notifications</h2>
        <p className="mt-1 text-sm text-anchor-text-muted">
          Prototype toggles — stored only in your browser.
        </p>
        <div className="mt-2 divide-y divide-anchor-border">
          <Toggle
            checked={settings.emailNotifications}
            onChange={handleToggle('emailNotifications')}
            label="Email notifications"
            description="Cohort announcements and instructor feedback summaries."
          />
          <Toggle
            checked={settings.assignmentReminders}
            onChange={handleToggle('assignmentReminders')}
            label="Assignment reminders"
            description="Nudges before due dates for upcoming work."
          />
          <Toggle
            checked={settings.sessionReminders}
            onChange={handleToggle('sessionReminders')}
            label="Session reminders"
            description="Reminders before live sessions in your cohorts."
          />
        </div>
      </section>

      <section className="rounded-xl border border-anchor-border bg-anchor-surface p-6">
        <h2 className="font-semibold text-anchor-text">Appearance</h2>
        <p className="mt-1 text-sm text-anchor-text-muted">
          Dark mode restyles the learner workspace without changing public pages.
        </p>
        <div role="radiogroup" aria-label="Appearance" className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            { id: 'light', title: 'Light', desc: 'Default Anchorpoint surfaces.' },
            { id: 'dark', title: 'Dark', desc: 'Navy workspace, same accents.' },
          ].map((option) => {
            const active = settings.appearance === option.id
            return (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => handleAppearance(option.id)}
                className={`rounded-xl border p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action ${
                  active
                    ? 'border-anchor-action bg-anchor-action/5 ring-1 ring-anchor-action/40'
                    : 'border-anchor-border bg-anchor-surface hover:border-anchor-action/40'
                }`}
              >
                <span className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-anchor-text">{option.title}</span>
                  <span
                    aria-hidden="true"
                    className={`grid h-5 w-5 place-items-center rounded-full border text-[11px] ${
                      active ? 'border-anchor-action bg-anchor-action text-white' : 'border-anchor-border text-transparent'
                    }`}
                  >
                    ✓
                  </span>
                </span>
                <span className="mt-1 block text-xs text-anchor-text-muted">{option.desc}</span>
                <span
                  aria-hidden="true"
                  className={`mt-3 flex h-12 overflow-hidden rounded-lg ring-1 ${
                    option.id === 'dark' ? 'bg-anchor-primary ring-white/10' : 'bg-anchor-bg ring-anchor-border'
                  }`}
                >
                  <span className="w-1/3 bg-anchor-primary/90" />
                  <span className="flex-1 p-2">
                    <span className={`block h-2 w-2/3 rounded ${option.id === 'dark' ? 'bg-white/70' : 'bg-slate-300'}`} />
                    <span className="mt-1.5 block h-2 w-1/2 rounded bg-anchor-action" />
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </section>

      <section className="rounded-xl border border-anchor-border bg-anchor-surface p-6">
        <h2 className="font-semibold text-anchor-text">Security</h2>
        <div className="mt-4 space-y-3">
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label htmlFor="current-password" className="text-xs font-semibold text-anchor-text">
                Current password
              </label>
              <input
                id="current-password"
                type="password"
                value={passwordForm.current}
                onChange={(e) => setPasswordForm((p) => ({ ...p, current: e.target.value }))}
                autoComplete="current-password"
                className="mt-1.5 block w-full rounded-lg border border-anchor-border bg-anchor-surface px-3.5 py-2 text-sm text-anchor-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
              />
            </div>
            <div>
              <label htmlFor="new-password" className="text-xs font-semibold text-anchor-text">
                New password
              </label>
              <input
                id="new-password"
                type="password"
                value={passwordForm.next}
                onChange={(e) => setPasswordForm((p) => ({ ...p, next: e.target.value }))}
                autoComplete="new-password"
                className="mt-1.5 block w-full rounded-lg border border-anchor-border bg-anchor-surface px-3.5 py-2 text-sm text-anchor-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="text-xs font-semibold text-anchor-text">
                Confirm new password
              </label>
              <input
                id="confirm-password"
                type="password"
                value={passwordForm.confirm}
                onChange={(e) => setPasswordForm((p) => ({ ...p, confirm: e.target.value }))}
                autoComplete="new-password"
                className="mt-1.5 block w-full rounded-lg border border-anchor-border bg-anchor-surface px-3.5 py-2 text-sm text-anchor-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
              />
            </div>
          </div>
          {passwordError && (
            <p role="alert" className="text-sm text-anchor-error">{passwordError}</p>
          )}
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={handlePasswordChange}
              className="rounded-lg bg-anchor-action px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-anchor-action-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
            >
              Change password
            </button>
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-lg border border-anchor-border px-5 py-2.5 text-sm font-semibold text-anchor-text transition-colors hover:border-anchor-error/50 hover:text-anchor-error focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
            >
              Sign out
            </button>
          </div>
          <p className="text-xs text-anchor-text-muted">
            Prototype only — passwords are not really changed or sent anywhere.
          </p>
        </div>
      </section>
    </div>
  )
}
