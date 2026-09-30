// Prototype localStorage helpers for learner state.
// All data stays in the browser; keys are namespaced per user where useful.

import { flattenLessons, getCurriculum } from '../data/lessons'

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

// --- Centralized course progress ---
// Baseline seeds keep Dashboard / My Cohorts / Progress / Learn consistent
// before the learner completes anything in this browser. User completions
// layer on top and persist per user.
const BASELINE_COMPLETED_COUNT = {
  'product-strategy-in-practice': 7,
  'applied-ai-for-product-teams': 4,
  'leading-high-trust-teams': Infinity,
}

function baselineIds(courseSlug, courseTitle) {
  const weeks = getCurriculum(courseSlug, courseTitle ?? 'Course')
  const flat = flattenLessons(weeks)
  const wanted = BASELINE_COMPLETED_COUNT[courseSlug]
  if (wanted == null) return []
  if (wanted === Infinity) return flat.map((lesson) => lesson.id)
  return flat.slice(0, wanted).map((lesson) => lesson.id)
}

export function getCourseProgress(courseSlug, courseTitle, userId) {
  const weeks = getCurriculum(courseSlug, courseTitle ?? 'Course')
  const flat = flattenLessons(weeks)
  const total = flat.length
  const stored = new Set(completedLessonIds(courseSlug, userId))
  const merged = new Set([...baselineIds(courseSlug, courseTitle), ...stored])
  // Drop stale ids if the curriculum ever changes.
  const validIds = flat.map((lesson) => lesson.id)
  const validSet = new Set(validIds)
  const completedIds = [...merged].filter((id) => validSet.has(id))
  const completed = completedIds.length
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100)
  const firstIncomplete = flat.find((lesson) => !merged.has(lesson.id)) ?? null
  return { total, completed, remaining: total - completed, percent, completedIds, firstIncomplete, flat }
}

export function getOverallProgress(cohorts, userId) {
  if (!cohorts.length) return 0
  const sum = cohorts.reduce(
    (acc, cohort) =>
      acc + getCourseProgress(cohort.courseSlug, cohort.title, userId).percent,
    0,
  )
  return Math.round(sum / cohorts.length)
}

export function getLessonsCompletedTotal(cohorts, userId) {
  return cohorts.reduce(
    (acc, cohort) =>
      acc + getCourseProgress(cohort.courseSlug, cohort.title, userId).completed,
    0,
  )
}

// --- Assignment submissions (ids + dates, shared by Assignments/Progress) ---
const SUBMITTED_DATES_KEY = 'anchorpoint-submitted-assignment-dates'

export function loadSubmittedAssignmentIds(userId) {
  const all = readJson('anchorpoint-submitted-assignments', [])
  if (Array.isArray(all)) return all
  if (all && typeof all === 'object') {
    const scoped = all[userKey('ids', userId)] ?? all.ids ?? []
    return Array.isArray(scoped) ? scoped : []
  }
  return []
}

export function saveSubmittedAssignmentIds(userId, ids) {
  const all = readJson('anchorpoint-submitted-assignments', [])
  if (Array.isArray(all)) {
    writeJson('anchorpoint-submitted-assignments', ids)
    return
  }
  const scoped = userKey('ids', userId)
  writeJson('anchorpoint-submitted-assignments', { ...(all ?? {}), [scoped]: ids })
}

export function loadSubmittedAssignmentDates(userId) {
  const all = readJson(SUBMITTED_DATES_KEY, {})
  if (!all || typeof all !== 'object' || Array.isArray(all)) return {}
  if (userId && all[userId] && typeof all[userId] === 'object') return all[userId]
  // Legacy global shape: { assignmentId: isoDate }.
  const looksLegacy = Object.values(all).every((v) => typeof v === 'string')
  if (looksLegacy) return all
  return {}
}

export function saveSubmittedAssignmentDate(userId, assignmentId, isoDate) {
  const all = readJson(SUBMITTED_DATES_KEY, {})
  const base = all && typeof all === 'object' && !Array.isArray(all) ? all : {}
  if (userId) {
    const scoped = base[userId] && typeof base[userId] === 'object' ? base[userId] : {}
    writeJson(SUBMITTED_DATES_KEY, { ...base, [userId]: { ...scoped, [assignmentId]: isoDate } })
  } else {
    writeJson(SUBMITTED_DATES_KEY, { ...base, [assignmentId]: isoDate })
  }
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10)
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
