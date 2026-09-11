import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  filterCourses,
  isUpcoming,
  matchesQuery,
  matchesCategories,
  matchesStartAfter,
  courseCategories,
} from './filterCourses.js'

const COURSES = [
  {
    id: 1,
    title: 'Product Strategy in Practice',
    category: 'Product & Design',
    instructor: 'Jordan Reed',
    startDate: '2026-10-05',
    description: 'Turn product ideas into practical strategies.',
  },
  {
    id: 2,
    title: 'Applied AI for Product Teams',
    category: 'Data & AI',
    instructor: 'Maya Chen',
    startDate: '2026-10-19',
    description: 'Learn how modern AI tools support product workflows.',
  },
  {
    id: 3,
    title: 'Leading High-Trust Teams',
    category: 'Leadership',
    instructor: 'David Okoro',
    startDate: '2026-08-01',
    description: 'Build stronger teams through practical leadership frameworks.',
  },
]

const TODAY = new Date(2026, 8, 11) // Sept 11, 2026
const EMPTY = { query: '', categories: [], availability: 'all', startAfter: '' }

test('empty filters return every course', () => {
  assert.equal(filterCourses(COURSES, EMPTY, TODAY).length, 3)
})

test('search matches title, description, instructor, and category', () => {
  assert.deepEqual(
    filterCourses(COURSES, { ...EMPTY, query: 'ai workflows' }, TODAY).map((c) => c.id),
    [2],
  )
  assert.deepEqual(
    filterCourses(COURSES, { ...EMPTY, query: 'okoro' }, TODAY).map((c) => c.id),
    [3],
  )
  assert.deepEqual(
    filterCourses(COURSES, { ...EMPTY, query: 'leadership trust' }, TODAY).map((c) => c.id),
    [3],
  )
})

test('search is case-insensitive and ignores extra whitespace', () => {
  assert.deepEqual(
    filterCourses(COURSES, { ...EMPTY, query: '  MAYA  ' }, TODAY).map((c) => c.id),
    [2],
  )
})

test('search with no match returns an empty list', () => {
  assert.deepEqual(filterCourses(COURSES, { ...EMPTY, query: 'basket weaving' }, TODAY), [])
})

test('category filter narrows to the selected categories', () => {
  assert.deepEqual(
    filterCourses(COURSES, { ...EMPTY, categories: ['Data & AI', 'Leadership'] }, TODAY).map((c) => c.id),
    [2, 3],
  )
})

test('upcoming availability excludes past cohorts', () => {
  assert.deepEqual(
    filterCourses(COURSES, { ...EMPTY, availability: 'upcoming' }, TODAY).map((c) => c.id),
    [1, 2],
  )
})

test('start-after filter keeps cohorts starting on or after the date', () => {
  assert.deepEqual(
    filterCourses(COURSES, { ...EMPTY, startAfter: '2026-10-19' }, TODAY).map((c) => c.id),
    [2],
  )
})

test('filters combine with AND semantics', () => {
  assert.deepEqual(
    filterCourses(
      COURSES,
      { query: 'product', categories: ['Data & AI'], availability: 'upcoming', startAfter: '' },
      TODAY,
    ).map((c) => c.id),
    [2],
  )
})

test('isUpcoming treats a cohort starting today as upcoming', () => {
  assert.equal(isUpcoming({ startDate: '2026-09-11' }, TODAY), true)
  assert.equal(isUpcoming({ startDate: '2026-09-10' }, TODAY), false)
})

test('matchesQuery matches every word, not just any word', () => {
  assert.equal(
    matchesQuery(COURSES[0], 'product strategy'),
    true,
  )
  assert.equal(matchesQuery(COURSES[0], 'product gardening'), false)
})

test('matchesCategories passes when nothing is selected', () => {
  assert.equal(matchesCategories(COURSES[0], []), true)
})

test('matchesStartAfter passes when no date is set', () => {
  assert.equal(matchesStartAfter(COURSES[0], ''), true)
})

test('courseCategories lists each category once, sorted', () => {
  assert.deepEqual(courseCategories(COURSES), ['Data & AI', 'Leadership', 'Product & Design'])
})
