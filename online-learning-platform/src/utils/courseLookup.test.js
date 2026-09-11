import test from 'node:test'
import assert from 'node:assert/strict'
import { getCourseBySlug, getRelatedCourses } from './courseLookup.js'

const COURSES = [
  { id: 1, slug: 'alpha', title: 'Alpha', category: 'Design', instructor: 'A' },
  { id: 2, slug: 'beta', title: 'Beta', category: 'Design', instructor: 'B' },
  { id: 3, slug: 'gamma', title: 'Gamma', category: 'AI', instructor: 'C' },
  { id: 4, slug: 'delta', title: 'Delta', category: 'AI', instructor: 'D' },
]

const DETAILS = {
  alpha: { duration: '6 weeks' },
  beta: { duration: '6 weeks' },
  gamma: { duration: '4 weeks' },
  delta: { duration: '4 weeks' },
}

test('getCourseBySlug returns the course with merged details', () => {
  const course = getCourseBySlug('alpha', COURSES, DETAILS)
  assert.equal(course.title, 'Alpha')
  assert.equal(course.details.duration, '6 weeks')
})

test('getCourseBySlug returns null for an unknown slug', () => {
  assert.equal(getCourseBySlug('no-such-course', COURSES, DETAILS), null)
})

test('getRelatedCourses prefers the same category and excludes the current course', () => {
  const related = getRelatedCourses('alpha', COURSES, 3)
  assert.equal(related.length, 3)
  assert.ok(related.every((c) => c.slug !== 'alpha'))
  assert.equal(related[0].slug, 'beta')
})
