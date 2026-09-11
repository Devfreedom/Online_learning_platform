// Pure catalog selectors: no React, no DOM. Tested in filterCourses.test.js.

export function toStartOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function parseStartDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function isUpcoming(course, today = new Date()) {
  return parseStartDate(course.startDate) >= toStartOfDay(today)
}

export function matchesQuery(course, query) {
  const needle = query.trim().toLowerCase()
  if (needle === '') return true
  const haystack = `${course.title} ${course.description} ${course.instructor} ${course.category}`.toLowerCase()
  return needle.split(/\s+/).every((word) => haystack.includes(word))
}

export function matchesCategories(course, categories) {
  if (!categories || categories.length === 0) return true
  return categories.includes(course.category)
}

export function matchesStartAfter(course, startAfter) {
  if (!startAfter) return true
  return course.startDate >= startAfter
}

export function filterCourses(courses, filters, today = new Date()) {
  const { query = '', categories = [], availability = 'all', startAfter = '' } = filters
  return courses.filter(
    (course) =>
      matchesQuery(course, query) &&
      matchesCategories(course, categories) &&
      matchesStartAfter(course, startAfter) &&
      (availability === 'upcoming' ? isUpcoming(course, today) : true),
  )
}

export function courseCategories(courses) {
  return [...new Set(courses.map((course) => course.category))].sort()
}
