// Prototype localStorage helpers for learner state.
// All data stays in the browser; keys are namespaced per user where useful.

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    const parsed = JSON.parse(raw)
    return parsed ?? fallback
  } catch {
    return fallback
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Ignore quota/private-mode failures — state stays in memory for session.
  }
}

function userKey(base, userId) {
  return userId ? `${base}:${userId}` : base
}

// --- Lesson progress ---
const LESSON_PROGRESS_KEY = 'anchorpoint-lesson-progress'

export function loadLessonProgress(userId) {
  const all = readJson(LESSON_PROGRESS_KEY, {})
  if (userId) return all[userId] ?? {}
  return all
}

export function saveLessonProgress(userId, progressForUser) {
  const all = readJson(LESSON_PROGRESS_KEY, {})
  const next = userId ? { ...all, [userId]: progressForUser } : progressForUser
  writeJson(LESSON_PROGRESS_KEY, next)
}

export function completedLessonIds(courseSlug, userId) {
  const perUser = loadLessonProgress(userId)
  const list = perUser?.[courseSlug]
  return Array.isArray(list) ? list : []
}

export function markLessonComplete(courseSlug, lessonId, userId) {
  const perUser = loadLessonProgress(userId)
  const current = new Set(perUser?.[courseSlug] ?? [])
  current.add(lessonId)
  const nextPerUser = { ...perUser, [courseSlug]: [...current] }
  saveLessonProgress(userId, nextPerUser)
  return nextPerUser[courseSlug]
}

// --- Settings ---
export const SETTINGS_KEY = 'anchorpoint-settings'

export const defaultSettings = {
  emailNotifications: true,
  assignmentReminders: true,
  sessionReminders: false,
  appearance: 'light',
}

export function loadSettings(userId) {
  const all = readJson(SETTINGS_KEY, {})
  const scoped = userKey('global', userId)
  // Support both legacy global shape and per-user shape.
  if (all && typeof all === 'object' && ('emailNotifications' in all || 'appearance' in all)) {
    return { ...defaultSettings, ...all }
  }
  return { ...defaultSettings, ...(all[scoped] ?? {}) }
}

export function saveSettings(userId, settings) {
  const all = readJson(SETTINGS_KEY, {})
  if (all && typeof all === 'object' && ('emailNotifications' in all || 'appearance' in all)) {
    writeJson(SETTINGS_KEY, { ...defaultSettings, ...settings })
    return
  }
  const scoped = userKey('global', userId)
  writeJson(SETTINGS_KEY, { ...all, [scoped]: { ...defaultSettings, ...settings } })
}

export function applyAppearance(appearance) {
  try {
    const root = document.documentElement
    if (appearance === 'dark') root.classList.add('app-dark')
    else root.classList.remove('app-dark')
  } catch {
    // No DOM (tests) — ignore.
  }
}

// --- Quiz dismissals (for empty-state demo) ---
export function loadDismissedQuizIds() {
  return readJson('anchorpoint-quiz-dismissed', [])
}

export function saveDismissedQuizIds(ids) {
  writeJson('anchorpoint-quiz-dismissed', ids)
}
