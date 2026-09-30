// Central curriculum data for the /learn/:slug prototype.
// Each course has 5 weeks; each week has lessons. Lesson completion is
// persisted per-user in localStorage (see utils/learningStore).

function lesson(id, week, title, opts = {}) {
  return {
    id,
    week,
    title,
    duration: opts.duration ?? '12 min',
    kind: opts.kind ?? 'video',
    description:
      opts.description ??
      'Watch the session replay, review the key ideas below, then complete the linked practice before the next live session.',
    resources: opts.resources ?? [
      { label: 'Session slides (PDF)' },
      { label: 'Transcript' },
    ],
    assignmentId: opts.assignmentId ?? null,
    ...opts,
  }
}

const productStrategyWeeks = [
  {
    week: 1,
    title: 'Week 1 · Foundations',
    lessons: [
      lesson('ps-w1-l1', 1, 'Welcome and how cohorts work', {
        duration: '8 min',
        description:
          'Meet your cohort, learn how live sessions, assignments and office hours fit together, and set your learning goal for the next five weeks.',
      }),
      lesson('ps-w1-l2', 1, 'Positioning Fundamentals', {
        duration: '18 min',
        description:
          'Why positioning fails in practice, the three inputs that matter, and how to draft a statement you can actually test with customers.',
        resources: [
          { label: 'Positioning template' },
          { label: 'Example teardowns' },
        ],
        assignmentId: 'assignment-004',
      }),
      lesson('ps-w1-l3', 1, 'Customer Discovery Workshop', {
        duration: '22 min',
        description:
          'Run a tight discovery interview: openers that work, follow-ups that surface real jobs-to-be-done, and synthesis you can share.',
      }),
    ],
  },
  {
    week: 2,
    title: 'Week 2 · Competitive landscape',
    lessons: [
      lesson('ps-w2-l1', 2, 'Mapping competitors that matter', {
        duration: '16 min',
        description:
          'Separate direct, adjacent and invisible competitors, then map positioning and pricing without drowning in spreadsheets.',
        assignmentId: 'assignment-001',
      }),
      lesson('ps-w2-l2', 2, 'Synthesis: interview to insight', {
        duration: '20 min',
        description:
          'Turn raw notes into themes, quotes and one sharp insight. Includes the synthesis format your instructor expects.',
        assignmentId: 'assignment-003',
      }),
    ],
  },
  {
    week: 3,
    title: 'Week 3 · Strategy choices',
    lessons: [
      lesson('ps-w3-l1', 3, 'Where to play and how to win', {
        duration: '19 min',
        description:
          'Narrow your playing field, pick a wedge, and pressure-test trade-offs with your cohort in the live session.',
      }),
      lesson('ps-w3-l2', 3, 'Pricing as positioning', {
        duration: '14 min',
        description: 'How pricing signals value, and the three pricing stories teams get wrong.',
      }),
    ],
  },
  {
    week: 4,
    title: 'Week 4 · Roadmaps that hold',
    lessons: [
      lesson('ps-w4-l1', 4, 'Outcome roadmaps', {
        duration: '17 min',
        description: 'Replace feature lists with outcome roadmaps your team can actually commit to.',
      }),
      lesson('ps-w4-l2', 4, 'Stakeholder storytelling', {
        duration: '13 min',
        description: 'Frame strategy for executives, engineers and customers without rewriting it three times.',
      }),
    ],
  },
  {
    week: 5,
    title: 'Week 5 · Ship and review',
    lessons: [
      lesson('ps-w5-l1', 5, 'Launch readiness review', {
        duration: '15 min',
        description: 'Final checklist before you present: evidence, risks and the one question you still need answered.',
      }),
      lesson('ps-w5-l2', 5, 'Cohort showcase and next steps', {
        duration: '21 min',
        kind: 'live',
        description: 'Live showcase with instructor feedback and certification guidance.',
      }),
    ],
  },
]

const appliedAiWeeks = [
  {
    week: 1,
    title: 'Week 1 · AI workflows',
    lessons: [
      lesson('ai-w1-l1', 1, 'Welcome to Applied AI', {
        duration: '9 min',
        description: 'How the cohort works, what you will prototype, and how evaluation is graded.',
      }),
      lesson('ai-w1-l2', 1, 'Picking a workflow worth automating', {
        duration: '16 min',
        description: 'Find repetitive research steps where AI helps — and where it quietly hurts.',
        assignmentId: 'assignment-002',
      }),
    ],
  },
  {
    week: 2,
    title: 'Week 2 · Prompting and evals',
    lessons: [
      lesson('ai-w2-l1', 2, 'Evaluating Model Outputs', {
        duration: '20 min',
        description: 'Run three real examples through your prototype and score quality, bias and risk.',
      }),
      lesson('ai-w2-l2', 2, 'Prompt patterns for teams', {
        duration: '14 min',
        description: 'Reusable prompt patterns, versioning, and when to freeze a prompt.',
      }),
    ],
  },
  {
    week: 3,
    title: 'Week 3 · Data and risk',
    lessons: [
      lesson('ai-w3-l1', 3, 'Grounding with your own data', {
        duration: '18 min',
        description: 'Retrieval basics without the hype: what to index, what to skip, how to cite.',
      }),
      lesson('ai-w3-l2', 3, 'Bias, privacy and guardrails', {
        duration: '15 min',
        description: 'Lightweight checks every product team should run before a pilot.',
      }),
    ],
  },
  {
    week: 4,
    title: 'Week 4 · Pilot in production',
    lessons: [
      lesson('ai-w4-l1', 4, 'Shipping a pilot', {
        duration: '17 min',
        description: 'Scope a two-week pilot, instrument it, and decide what success means.',
      }),
      lesson('ai-w4-l2', 4, 'Human-in-the-loop design', {
        duration: '13 min',
        description: 'Design overrides, escalations and audit trails people actually use.',
      }),
    ],
  },
  {
    week: 5,
    title: 'Week 5 · Demo day',
    lessons: [
      lesson('ai-w5-l1', 5, 'Demo preparation', {
        duration: '12 min',
        description: 'Structure a five-minute demo that shows the workflow, the evals and the limits.',
      }),
      lesson('ai-w5-l2', 5, 'Cohort demo day', {
        duration: '25 min',
        kind: 'live',
        description: 'Live demos with peer and instructor review.',
      }),
    ],
  },
]

function genericWeeks(courseTitle) {
  const weeks = []
  for (let w = 1; w <= 5; w += 1) {
    weeks.push({
      week: w,
      title: `Week ${w}`,
      lessons: [
        lesson(`gen-${w}-1`, w, `${courseTitle} · Session ${w}A`, {
          description: `Core concepts for week ${w} of ${courseTitle}, with guided practice.`,
        }),
        lesson(`gen-${w}-2`, w, `${courseTitle} · Session ${w}B`, {
          description: `Applied practice for week ${w} of ${courseTitle}.`,
        }),
      ],
    })
  }
  return weeks
}

export const lessonsByCourse = {
  'product-strategy-in-practice': productStrategyWeeks,
  'applied-ai-for-product-teams': appliedAiWeeks,
}

export function getCurriculum(courseSlug, courseTitle = 'Course') {
  if (lessonsByCourse[courseSlug]) return lessonsByCourse[courseSlug]
  return genericWeeks(courseTitle)
}

export function flattenLessons(weeks) {
  return weeks.flatMap((w) => w.lessons.map((l) => ({ ...l, weekTitle: w.title })))
}
