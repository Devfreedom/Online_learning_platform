// Lightweight frontend-only authentication for the Anchorpoint prototype.
// No backend, no network requests — demo accounts live in memory and the
// signed-in user is persisted to localStorage.

export const AUTH_STORAGE_KEY = 'anchorpoint-auth-user'
export const REMEMBER_KEY = 'anchorpoint-remembered-email'

export const DEMO_ACCOUNTS = [
  {
    email: 'student@example.com',
    password: 'student123',
    user: {
      id: 'user-001',
      firstName: 'Freedom',
      lastName: 'User',
      email: 'student@example.com',
      role: 'learner',
      educationLevel: 'undergraduate',
      avatar: 'indigo',
      goals: ['Build career skills'],
      guidedTour: true,
    },
  },
  {
    email: 'instructor@example.com',
    password: 'instructor123',
    user: {
      id: 'user-002',
      firstName: 'Jordan',
      lastName: 'Reed',
      email: 'instructor@example.com',
      role: 'instructor',
      educationLevel: 'professional',
      avatar: 'emerald',
      goals: [],
      guidedTour: true,
    },
  },
  {
    email: 'admin@example.com',
    password: 'admin123',
    user: {
      id: 'user-003',
      firstName: 'Amara',
      lastName: 'Lewis',
      email: 'admin@example.com',
      role: 'administrator',
      educationLevel: 'graduate',
      avatar: 'amber',
      goals: [],
      guidedTour: true,
    },
  },
]

export const ROLE_LABELS = {
  learner: 'Learner',
  instructor: 'Instructor',
  administrator: 'Administrator',
}

export const ROLE_HOME = {
  learner: '/dashboard',
  instructor: '/dashboard',
  administrator: '/dashboard',
}

export const AVATAR_COLORS = {
  indigo: 'bg-anchor-action',
  emerald: 'bg-anchor-success',
  amber: 'bg-anchor-accent',
  rose: 'bg-rose-500',
}

export function findDemoAccount(email, password) {
  const normalized = email.trim().toLowerCase()
  return DEMO_ACCOUNTS.find(
    (account) =>
      account.email.toLowerCase() === normalized && account.password === password,
  )
}

export function loadStoredUser() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveStoredUser(user) {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
  } catch {
    // Ignore storage failures (private mode, quota) — session stays in memory.
  }
}

export function clearStoredUser() {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY)
  } catch {
    // Ignore.
  }
}

export function initialsFor(user) {
  if (!user) return ''
  const first = user.firstName?.trim()?.[0] ?? ''
  const last = user.lastName?.trim()?.[0] ?? ''
  return `${first}${last}`.toUpperCase() || user.email?.[0]?.toUpperCase() || 'A'
}

export function createUserFromSignup({
  fullName,
  email,
  role,
  educationLevel,
  avatar,
  goals,
  guidedTour,
}) {
  const parts = fullName.trim().split(/\s+/)
  const firstName = parts[0] ?? 'Learner'
  const lastName = parts.slice(1).join(' ') || 'Member'
  return {
    id: `user-${Date.now()}`,
    firstName,
    lastName,
    email: email.trim().toLowerCase(),
    role,
    educationLevel,
    avatar,
    goals,
    guidedTour,
  }
}
