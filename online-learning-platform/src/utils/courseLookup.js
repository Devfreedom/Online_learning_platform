export function getCourseBySlug(slug, courseList, detailsMap) {
  const course = courseList.find((c) => c.slug === slug)
  if (!course) return null
  return { ...course, details: detailsMap[course.slug] }
}

export function getRelatedCourses(slug, courseList, count = 3) {
  const current = courseList.find((c) => c.slug === slug)
  if (!current) return []
  const others = courseList.filter((c) => c.slug !== slug)
  const sameCategory = others.filter((c) => c.category === current.category)
  const rest = others.filter((c) => c.category !== current.category)
  return [...sameCategory, ...rest].slice(0, count)
}
