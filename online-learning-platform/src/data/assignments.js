// Canonical assignment data. cohorts.js re-exports these for backward compat.

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
