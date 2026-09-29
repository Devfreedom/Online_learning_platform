import { Link, useParams } from 'react-router'
import { courses } from '../../data/courses'
import Placeholder from './Placeholder'

export default function Learn() {
  const { slug } = useParams()
  const course = courses.find((item) => item.slug === slug)
  return (
    <div className="space-y-4">
      <Link
        to="/my-cohorts"
        className="text-sm font-semibold text-anchor-action underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
      >
        ← My Cohorts
      </Link>
      <Placeholder
        title={course ? course.title : 'Lesson player'}
        description="The full lesson player arrives after the learner shell is stable."
      />
    </div>
  )
}
