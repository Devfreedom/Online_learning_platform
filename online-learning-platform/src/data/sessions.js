// Canonical live-session data. cohorts.js re-exports for backward compat.

export const sessionsByCourse = {
  'product-strategy-in-practice': {
    cohortId: 'cohort-001',
    courseTitle: 'Product Strategy in Practice',
    cohort: 'Product Strategy',
    day: 'Tuesday',
    date: '2026-10-13',
    time: '6:00 PM',
    instructorId: 'jordan-reed',
    instructorName: 'Jordan Reed',
    meetingLink: '#',
  },
  'applied-ai-for-product-teams': {
    cohortId: 'cohort-002',
    courseTitle: 'Applied AI for Product Teams',
    cohort: 'Applied AI',
    day: 'Wednesday',
    date: '2026-10-14',
    time: '5:30 PM',
    instructorId: 'maya-chen',
    instructorName: 'Maya Chen',
    meetingLink: '#',
  },
  'leading-high-trust-teams': {
    cohortId: 'cohort-003',
    courseTitle: 'Leading High-Trust Teams',
    cohort: 'High-Trust Teams',
    day: 'Monday',
    date: '2026-09-21',
    time: '5:00 PM',
    instructorId: 'david-okoro',
    instructorName: 'David Okoro',
    meetingLink: '#',
  },
}

export const nextLiveSession = {
  cohortId: 'cohort-001',
  title: 'Product Strategy in Practice',
  day: 'Tuesday',
  date: '2026-10-13',
  time: '6:00 PM',
  instructorId: 'jordan-reed',
}

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
