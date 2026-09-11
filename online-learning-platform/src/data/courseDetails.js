import { courses } from './courses'

// Fictional prototype detail content for the demo platform.
// Every course shares the same live-cohort structure; copy is tailored
// from the course's own title, description and instructor so the page
// reads as a scheduled cohort, never a self-paced video course.

const DURATIONS = {
  'product-strategy-in-practice': '6 weeks',
  'applied-ai-for-product-teams': '6 weeks',
  'leading-high-trust-teams': '5 weeks',
  'marketing-systems-that-scale': '6 weeks',
  'modern-frontend-engineering': '8 weeks',
  'writing-for-product-and-business': '4 weeks',
}

const SCHEDULES = {
  'product-strategy-in-practice': 'Tuesdays & Thursdays · 90-minute live sessions',
  'applied-ai-for-product-teams': 'Mondays & Wednesdays · 90-minute live sessions',
  'leading-high-trust-teams': 'Wednesdays · 2-hour live sessions',
  'marketing-systems-that-scale': 'Tuesdays & Thursdays · 90-minute live sessions',
  'modern-frontend-engineering': 'Mondays & Thursdays · 2-hour live sessions',
  'writing-for-product-and-business': 'Fridays · 2-hour live workshops',
}

const RATINGS = {
  'product-strategy-in-practice': { rating: '4.8', reviews: 64 },
  'applied-ai-for-product-teams': { rating: '4.9', reviews: 58 },
  'leading-high-trust-teams': { rating: '4.8', reviews: 47 },
  'marketing-systems-that-scale': { rating: '4.7', reviews: 52 },
  'modern-frontend-engineering': { rating: '4.9', reviews: 71 },
  'writing-for-product-and-business': { rating: '4.8', reviews: 43 },
}

const OUTCOMES = {
  'product-strategy-in-practice': [
    'Frame a product opportunity and defend a clear strategic choice.',
    'Run a live discovery session and synthesize what you hear.',
    'Build a prioritized roadmap you can present to stakeholders.',
    'Leave with a reviewed strategy document from your own context.',
  ],
  'applied-ai-for-product-teams': [
    'Map where AI genuinely helps your product workflow — and where it does not.',
    'Prototype an AI-assisted research and decision workflow.',
    'Evaluate model outputs for quality, bias and risk.',
    'Ship a working AI workflow with expert feedback.',
  ],
  'leading-high-trust-teams': [
    'Diagnose trust gaps on your team with a practical framework.',
    'Run calmer, clearer one-to-ones and team rituals.',
    'Give feedback that people can actually act on.',
    'Leave with a 90-day team improvement plan.',
  ],
  'marketing-systems-that-scale': [
    'Audit your current funnel and find the real constraint.',
    'Design one repeatable acquisition experiment per week.',
    'Build reporting your team will actually read.',
    'Leave with a documented growth system, not a slide deck.',
  ],
  'modern-frontend-engineering': [
    'Structure a frontend codebase the whole team can navigate.',
    'Apply testing and review patterns used by working teams.',
    'Ship accessible, performant interfaces with confidence.',
    'Leave with a reviewed capstone built to production standards.',
  ],
  'writing-for-product-and-business': [
    'Write memos, updates and docs people finish reading.',
    'Give and receive editorial feedback in a live workshop.',
    'Build a personal style guide for product communication.',
    'Leave with a portfolio of three edited pieces.',
  ],
}

const CURRICULUM_FALLBACK_WEEKS = [
  'Foundations and shared vocabulary',
  'Live practice with real examples',
  'Guided project work and feedback',
  'Capstone build and peer review',
  'Showcase and next steps',
]

function buildCurriculum(course) {
  const weeks = parseInt(DURATIONS[course.slug] ?? '6', 10) || 6
  return Array.from({ length: weeks }, (_, i) => ({
    week: `Week ${i + 1}`,
    title:
      i < CURRICULUM_FALLBACK_WEEKS.length
        ? CURRICULUM_FALLBACK_WEEKS[i]
        : 'Capstone studio and instructor feedback',
    body:
      i === 0
        ? `Meet your cohort and ${course.instructor}, align on goals, and set up your project context.`
        : i === weeks - 1
          ? 'Present your capstone, get structured feedback, and plan what happens after the cohort ends.'
          : 'Join the weekly live session, work through guided exercises, and get feedback on your project.',
  }))
}

const FAQS = [
  {
    q: 'Is this live or self-paced?',
    a: 'Fully live. You meet your instructor and cohort every week at the scheduled time — this is not a video library.',
  },
  {
    q: 'What happens if I miss a live session?',
    a: 'Sessions are recorded for your cohort, and the instructor holds a catch-up thread each week so you can rejoin without falling behind.',
  },
  {
    q: 'How much time should I set aside each week?',
    a: 'Plan for the live sessions plus 2–3 hours of project work. Everything is designed to fit around a full-time schedule.',
  },
  {
    q: 'Do I get a certificate?',
    a: 'Yes — finish the capstone project and attend the live sessions to earn a certificate of completion.',
  },
]

const TIMELINE = [
  {
    title: 'Apply',
    body: 'Reserve your seat and tell us about your goals so the instructor can tailor examples.',
  },
  {
    title: 'Cohort begins',
    body: 'Meet your learning group, set up your project, and agree on a working rhythm.',
  },
  {
    title: 'Weekly live sessions',
    body: 'Learn directly from your instructor with discussion, exercises and real-time feedback.',
  },
  {
    title: 'Capstone project',
    body: 'Apply each week to a practical project from your own work, with feedback as you build.',
  },
  {
    title: 'Showcase & certificate',
    body: 'Present your work to the cohort and finish with a project worth showing.',
  },
]

export const courseDetails = Object.fromEntries(
  courses.map((course) => [
    course.slug,
    {
      duration: DURATIONS[course.slug] ?? '6 weeks',
      weeklySchedule: SCHEDULES[course.slug] ?? 'Weekly · live sessions',
      rating: RATINGS[course.slug]?.rating ?? '4.8',
      reviews: RATINGS[course.slug]?.reviews ?? 40,
      overview: `${course.description} You will learn alongside a small cohort on a real schedule — live sessions with ${course.instructor}, weekly project work, and feedback from people doing the work, not recorded lectures.`,
      outcomes: OUTCOMES[course.slug] ?? OUTCOMES['product-strategy-in-practice'],
      curriculum: buildCurriculum(course),
      timeline: TIMELINE,
      requirements: [
        'No formal prerequisites — the cohort is designed for working learners.',
        'A laptop and a reliable internet connection for live video sessions.',
        '2–3 hours per week for project work alongside the live sessions.',
        'Willingness to share work-in-progress with a small, supportive group.',
      ],
      faq: FAQS,
    },
  ]),
)
