// Tiny framework-free toast store. Components call showToast(...) and the
// single <Toast /> host (mounted in App) renders the queue.

let listeners = new Set()
let toasts = []
let nextId = 0
const timers = new Map()

function emit() {
  listeners.forEach((listener) => listener())
}

export function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getToasts() {
  return toasts
}

export function dismissToast(id) {
  const timer = timers.get(id)
  if (timer) {
    clearTimeout(timer)
    timers.delete(id)
  }
  toasts = toasts.filter((toast) => toast.id !== id)
  emit()
}

export function showToast(message, type = 'success') {
  const id = ++nextId
  toasts = [...toasts, { id, message, type }]
  emit()
  timers.set(
    id,
    setTimeout(() => dismissToast(id), 4000),
  )
  return id
}
