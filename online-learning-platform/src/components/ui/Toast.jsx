import { useSyncExternalStore } from 'react'
import { dismissToast, getToasts, subscribe } from '../../utils/toast'

const TONE = {
  success: 'border-anchor-success/40 bg-anchor-surface text-anchor-text',
  info: 'border-anchor-action/40 bg-anchor-surface text-anchor-text',
  error: 'border-anchor-error/40 bg-anchor-surface text-anchor-text',
}

const DOT = {
  success: 'bg-anchor-success',
  info: 'bg-anchor-action',
  error: 'bg-anchor-error',
}

export default function Toast() {
  const toasts = useSyncExternalStore(subscribe, getToasts, getToasts)

  if (toasts.length === 0) return null

  return (
    <div
      aria-live="polite"
      aria-label="Notifications"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex flex-col items-center gap-2 px-4 pb-4 sm:items-end sm:px-6 sm:pb-6"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className={`pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border px-4 py-3 shadow-lg shadow-black/5 ${TONE[toast.type] ?? TONE.info}`}
        >
          <span
            aria-hidden="true"
            className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${DOT[toast.type] ?? DOT.info}`}
          />
          <p className="flex-1 text-sm font-medium leading-relaxed">{toast.message}</p>
          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            aria-label="Dismiss notification"
            className="grid h-6 w-6 shrink-0 place-items-center rounded-md text-anchor-text-muted transition-colors hover:bg-anchor-bg hover:text-anchor-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  )
}
