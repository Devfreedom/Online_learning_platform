import { courses } from './courses'
import { instructors } from './instructors'

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

export const nextLiveSession = {
  cohortId: 'cohort-001',
  title: 'Product Strategy in Practice',
  day: 'Tuesday',
  date: '2026-10-13',
  time: '6:00 PM',
  instructorId: 'jordan-reed',
}

export const upcomingAssignments = [
  {
    id: 'assignment-001',
    title: 'Competitive Analysis Brief',
    cohort: 'Product Strategy',
    dueDate: '2026-10-16',
    status: 'In progress',
  },
  {
    id: 'assignment-002',
    title: 'AI Workflow Prototype',
    cohort: 'Applied AI',
    dueDate: '2026-10-21',
    status: 'Not started',
  },
  {
    id: 'assignment-003',
    title: 'Customer Interview Synthesis',
    cohort: 'Product Strategy',
    dueDate: '2026-10-30',
    status: 'Not started',
  },
]

export const SUBMITTED_STORAGE_KEY = 'anchorpoint-submitted-assignments'

// Full assignment briefs. `seededState` gives the prototype starting point;
// learner submissions are layered on top from localStorage.
export const assignmentDetails = [
  {
    id: 'assignment-001',
    title: 'Competitive Analysis Brief',
    cohort: 'Product Strategy',
    courseSlug: 'product-strategy-in-practice',
    dueDate: '2026-10-16',
    baseStatus: 'In progress',
    seededState: 'upcoming',
    points: 100,
    effort: '3–4 hours',
    overview:
      'Pick two direct competitors and one adjacent player, then write a one-page brief your cohort can pressure-test in the live session.',
    instructions: [
      'Choose two direct competitors and one adjacent player in your product space.',
      'Map their positioning, pricing and standout strengths in a comparison table.',
      'Write a one-page brief with your recommended response and open questions.',
      'Bring one claim from your brief you are least sure about for live discussion.',
    ],
    deliverable: 'One-page brief (PDF or doc link) plus your comparison table.',
  },
  {
    id: 'assignment-002',
    title: 'AI Workflow Prototype',
    cohort: 'Applied AI',
    courseSlug: 'applied-ai-for-product-teams',
    dueDate: '2026-10-21',
    baseStatus: 'Not started',
    seededState: 'upcoming',
    points: 100,
    effort: '4–5 hours',
    overview:
      'Prototype one AI-assisted step in your own product workflow and document where it helps — and where it does not.',
    instructions: [
      'Pick a single repetitive step in your research or decision workflow.',
      'Build a working prototype using any modern AI tool.',
      'Run it on three real examples and record the outputs.',
      'Write up quality, bias and risk observations for each run.',
    ],
    deliverable: 'Working prototype link plus a short evaluation write-up.',
  },
  {
    id: 'assignment-003',
    title: 'Customer Interview Synthesis',
    cohort: 'Product Strategy',
    courseSlug: 'product-strategy-in-practice',
    dueDate: '2026-10-30',
    baseStatus: 'Not started',
    seededState: 'upcoming',
    points: 100,
    effort: '3 hours',
    overview:
      'Turn raw interview notes into themes, quotes and one sharp insight worth sharing with your cohort.',
    instructions: [
      'Review the two provided customer interview transcripts.',
      'Extract key quotes and cluster them into 3–4 themes.',
      'Write one sharp insight per theme in plain language.',
      'End with the single discovery question you would ask next.',
    ],
    deliverable: 'Synthesis doc with themes, quotes and next discovery question.',
  },
  {
    id: 'assignment-004',
    title: 'Positioning Statement Draft',
    cohort: 'Product Strategy',
    courseSlug: 'product-strategy-in-practice',
    dueDate: '2026-10-09',
    submittedDate: '2026-10-08',
    baseStatus: 'Submitted',
    seededState: 'submitted',
    points: 100,
    effort: '2 hours',
    overview:
      'Draft a positioning statement for your product and submit it for instructor review.',
    instructions: [
      'Draft one positioning statement using the session template.',
      'Include the audience, need and differentiating benefit.',
      'Submit for instructor feedback before the next live session.',
    ],
    deliverable: 'Positioning statement (submitted for review).',
  },
  {
    id: 'assignment-005',
    title: 'Trust Audit Worksheet',
    cohort: 'High-Trust Teams',
    courseSlug: 'leading-high-trust-teams',
    dueDate: '2026-09-18',
    submittedDate: '2026-09-17',
    baseStatus: 'Completed',
    seededState: 'completed',
    points: 100,
    score: 88,
    effort: '2 hours',
    overview:
      'Audit your team against the trust framework and propose one ritual to improve the weakest dimension.',
    instructions: [
      'Score your team on each dimension of the trust framework.',
      'Gather one piece of evidence per score from real team moments.',
      'Propose a single ritual to strengthen the weakest dimension.',
    ],
    deliverable: 'Completed worksheet with scores, evidence and one ritual proposal.',
    feedback:
      'Strong evidence throughout. Your proposed ritual is concrete and testable — try it for two weeks and report back.',
  },
]

export const certificates = [
  {
    id: 'certificate-001',
    cohortId: 'cohort-003',
    courseTitle: 'Leading High-Trust Teams',
    completionDate: '2026-09-25',
    instructorId: 'david-okoro',
    instructorName: 'David Okoro',
  },
]

// Prototype calendar events. type: session | deadline | milestone.
export const calendarEvents = [
  { id: 'event-001', date: '2026-10-05', title: 'Product Strategy in Practice begins', type: 'milestone', cohort: 'Product Strategy' },
  { id: 'event-002', date: '2026-10-13', time: '6:00 PM', title: 'Product Strategy Live Session', type: 'session', cohort: 'Product Strategy' },
  { id: 'event-003', date: '2026-10-14', time: '5:30 PM', title: 'Applied AI Live Session', type: 'session', cohort: 'Applied AI' },
  { id: 'event-004', date: '2026-10-16', title: 'Competitive Analysis Brief due', type: 'deadline', cohort: 'Product Strategy' },
  { id: 'event-005', date: '2026-10-19', title: 'Applied AI for Product Teams begins', type: 'milestone', cohort: 'Applied AI' },
  { id: 'event-006', date: '2026-10-20', time: '6:00 PM', title: 'Product Strategy Live Session', type: 'session', cohort: 'Product Strategy' },
  { id: 'event-007', date: '2026-10-21', title: 'AI Workflow Prototype due', type: 'deadline', cohort: 'Applied AI' },
  { id: 'event-008', date: '2026-10-21', time: '5:30 PM', title: 'Applied AI Live Session', type: 'session', cohort: 'Applied AI' },
  { id: 'event-009', date: '2026-10-27', time: '6:00 PM', title: 'Product Strategy Live Session', type: 'session', cohort: 'Product Strategy' },
  { id: 'event-010', date: '2026-10-28', time: '5:30 PM', title: 'Applied AI Live Session', type: 'session', cohort: 'Applied AI' },
  { id: 'event-011', date: '2026-10-30', title: 'Customer Interview Synthesis due', type: 'deadline', cohort: 'Product Strategy' },
  { id: 'event-012', date: '2026-11-02', title: 'Leading High-Trust Teams begins', type: 'milestone', cohort: 'High-Trust Teams' },
  { id: 'event-013', date: '2026-11-03', time: '6:00 PM', title: 'Product Strategy Live Session', type: 'session', cohort: 'Product Strategy' },
  { id: 'event-014', date: '2026-11-16', title: 'Marketing Systems That Scale begins', type: 'milestone', cohort: 'Marketing' },
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
