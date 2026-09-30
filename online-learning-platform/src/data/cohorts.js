import { courses } from './courses'
import { instructors } from './instructors'
import {
  assignmentDetails,
  upcomingAssignments,
} from './assignments'
import { certificates } from './certificates'
import { calendarEvents, nextLiveSession } from './sessions'
import { SUBMITTED_STORAGE_KEY } from '../utils/learningStore'

// Re-export canonical prototype data so existing pages keep working
// while new pages import from the focused modules directly.
export { SUBMITTED_STORAGE_KEY, assignmentDetails, upcomingAssignments }
export { certificates }
export { calendarEvents, nextLiveSession }

// Central learner/cohort data for the prototype.
// All names, dates, progress values and sessions are fictional demo content.

function course(slug) {
  return courses.find((item) => item.slug === slug)
}

export const learnerCohorts = [
  {
    id: 'cohort-001',
    courseSlug: 'product-strategy-in-practice',
    status: 'ongoing',
    progress: 64,
    nextLesson: 'Customer Discovery Workshop',
    nextSession: {
      title: 'Product Strategy in Practice',
      day: 'Tuesday',
      date: '2026-10-13',
      time: '6:00 PM',
      instructorId: 'jordan-reed',
    },
  },
  {
    id: 'cohort-002',
    courseSlug: 'applied-ai-for-product-teams',
    status: 'ongoing',
    progress: 41,
    nextLesson: 'Evaluating Model Outputs',
    nextSession: {
      title: 'Applied AI for Product Teams',
      day: 'Wednesday',
      date: '2026-10-14',
      time: '5:30 PM',
      instructorId: 'maya-chen',
    },
  },
  {
    id: 'cohort-003',
    courseSlug: 'leading-high-trust-teams',
    status: 'completed',
    progress: 100,
    nextLesson: null,
    nextSession: null,
  },
]

export const cohortDetails = learnerCohorts.map((cohort) => {
  const base = course(cohort.courseSlug)
  return {
    ...cohort,
    title: base.title,
    category: base.category,
    image: base.image,
    imageAlt: base.imageAlt,
    startDate: base.startDate,
    instructor: base.instructor,
  }
})

export const dashboardStats = [
  { id: 'active-cohorts', label: 'Active cohorts', value: '2' },
  { id: 'average-progress', label: 'Average progress', value: '64%' },
  { id: 'lessons-completed', label: 'Lessons completed', value: '18' },
  { id: 'upcoming-sessions', label: 'Upcoming sessions', value: '3' },
]

// 35-day activity grid (5 weeks). 0 = inactive, 1 = active, 2 = high, 3 = milestone.
export const learningActivity = [
  0, 1, 0, 2, 1, 0, 0, 1, 1, 2, 3, 0, 0, 1, 0, 1, 2, 1, 1, 0, 0, 2, 1, 0, 3, 1, 0, 0, 1, 1, 2, 0, 1, 3, 1,
]

export const studyTime = [
  { day: 'Sun', minutes: 20 },
  { day: 'Mon', minutes: 55 },
  { day: 'Tue', minutes: 80 },
  { day: 'Wed', minutes: 35 },
  { day: 'Thu', minutes: 65 },
  { day: 'Fri', minutes: 15 },
  { day: 'Sat', minutes: 30 },
]

export const learningGoal = {
  percent: 72,
  label: "of this month's target",
}

export const prototypeInstructors = instructors.map((item) => ({
  id: item.id,
  name: item.name,
  credential: item.credential,
  course: item.course,
  photo: item.photo,
  photoAlt: item.photoAlt,
}))
