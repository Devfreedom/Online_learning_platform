// Canonical learner profile options shared by Signup and Profile.
// Signup stores the stable `id`; labels are display-only.

export const EDUCATION_OPTIONS = [
  { id: 'secondary', label: 'Secondary school' },
  { id: 'undergraduate', label: 'Undergraduate' },
  { id: 'graduate', label: 'Graduate' },
  { id: 'professional', label: 'Professional / continuing' },
  { id: 'other', label: 'Other' },
]

// Legacy display labels previously stored by Signup. Maps to canonical ids so
// older accounts keep working when Profile loads/saves them.
const LEGACY_EDUCATION_LABELS = {
  'junior secondary': 'secondary',
  'senior secondary': 'secondary',
  'secondary school': 'secondary',
  undergraduate: 'undergraduate',
  graduate: 'graduate',
  professional: 'professional',
  'professional / continuing': 'professional',
  other: 'other',
}

export function normalizeEducationLevel(value) {
  if (!value) return 'undergraduate'
  if (EDUCATION_OPTIONS.some((option) => option.id === value)) return value
  const legacy = LEGACY_EDUCATION_LABELS[String(value).trim().toLowerCase()]
  return legacy ?? 'undergraduate'
}

export function educationLabelFor(value) {
  const id = normalizeEducationLevel(value)
  return EDUCATION_OPTIONS.find((option) => option.id === id)?.label ?? value
}

export const AVATAR_OPTIONS = [
  { id: 'indigo', label: 'Purple' },
  { id: 'emerald', label: 'Emerald' },
  { id: 'amber', label: 'Amber' },
  { id: 'rose', label: 'Rose' },
]
