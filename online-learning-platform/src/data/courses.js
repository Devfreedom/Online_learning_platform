import imgProductStrategy from '../assets/courses/product-strategy.jpg'
import imgAppliedAi from '../assets/courses/applied-ai.jpg'
import imgHighTrustTeams from '../assets/courses/high-trust-teams.jpg'
import imgMarketingSystems from '../assets/courses/marketing-systems.jpg'
import imgFrontendEngineering from '../assets/courses/frontend-engineering.jpg'
import imgProductWriting from '../assets/courses/product-writing.jpg'

// Fictional prototype courses for this demo platform.
// They are not real courses and not affiliated with any real organization.
export const courses = [
  {
    id: 1,
    slug: 'product-strategy-in-practice',
    title: 'Product Strategy in Practice',
    category: 'Product & Design',
    instructor: 'Jordan Reed',
    instructorInitials: 'JR',
    startDate: '2026-10-05',
    price: '$450',
    description:
      'Turn product ideas into practical strategies through live workshops and guided projects.',
    image: imgProductStrategy,
    imageAlt:
      'A product strategy workshop with people reviewing plans around a table.',
  },
  {
    id: 2,
    slug: 'applied-ai-for-product-teams',
    title: 'Applied AI for Product Teams',
    category: 'Data & AI',
    instructor: 'Maya Chen',
    instructorInitials: 'MC',
    startDate: '2026-10-19',
    price: '$520',
    description:
      'Learn how modern AI tools can support research, decisions and product workflows.',
    image: imgAppliedAi,
    imageAlt: 'A team collaborating with laptops during a working session.',
  },
  {
    id: 3,
    slug: 'leading-high-trust-teams',
    title: 'Leading High-Trust Teams',
    category: 'Leadership',
    instructor: 'David Okoro',
    instructorInitials: 'DO',
    startDate: '2026-08-04',
    price: '$400',
    description:
      'Build stronger teams through practical leadership frameworks and live discussion.',
    image: imgHighTrustTeams,
    imageAlt: 'A leader facilitating a discussion with a small team.',
  },
  {
    id: 4,
    slug: 'marketing-systems-that-scale',
    title: 'Marketing Systems That Scale',
    category: 'Marketing',
    instructor: 'Amara Lewis',
    instructorInitials: 'AL',
    startDate: '2026-11-16',
    price: '$425',
    description:
      'Develop repeatable marketing systems through real-world case studies and projects.',
    image: imgMarketingSystems,
    imageAlt: 'Professionals collaborating on a marketing project.',
  },
  {
    id: 5,
    slug: 'modern-frontend-engineering',
    title: 'Modern Frontend Engineering',
    category: 'Engineering',
    instructor: 'Ethan Cole',
    instructorInitials: 'EC',
    startDate: '2026-12-01',
    price: '$550',
    description:
      'Build stronger frontend systems with practical engineering patterns and team workflows.',
    image: imgFrontendEngineering,
    imageAlt: 'A screen showing modern web application code.',
  },
  {
    id: 6,
    slug: 'writing-for-product-and-business',
    title: 'Writing for Product and Business',
    category: 'Writing',
    instructor: 'Nina Brooks',
    instructorInitials: 'NB',
    startDate: '2026-12-07',
    price: '$350',
    description:
      'Write clearer product, marketing and business communication with expert feedback.',
    image: imgProductWriting,
    imageAlt: 'A notebook and pen with writing in progress.',
  },
]