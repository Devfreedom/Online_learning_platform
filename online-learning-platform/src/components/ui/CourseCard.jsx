import { Link } from 'react-router'
import { formatStartLabel } from '../../utils/formatDate'
import Avatar from './Avatar'

export default function CourseCard({ course, className = '' }) {
  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-xl border border-anchor-border bg-anchor-surface transition-[border-color,box-shadow] hover:border-anchor-action/30 hover:shadow-md ${className}`}
    >
      {/* Photography */}
      <div className="relative aspect-[16/9] min-h-0 shrink-0 bg-anchor-bg">
        <img
          src={course.image}
          alt={course.imageAlt}
          loading="lazy"
          className="h-full min-h-0 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />

        {/* Instructor avatar overlapping lower edge of image */}
        <div className="absolute -bottom-5 left-4">
          <Avatar
            initials={course.instructorInitials}
            image={course.instructorImage}
            label={`${course.instructor}, instructor`}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-5 pb-5 pt-8">
        <span className="self-start rounded-md bg-anchor-bg px-2 py-0.5 text-xs font-semibold text-anchor-text-muted ring-1 ring-anchor-border">
          {course.category}
        </span>

        <h3 className="mt-3 text-base font-semibold leading-snug text-anchor-text">
          {course.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-anchor-text-muted">
          {course.description}
        </p>

        <p className="mt-3 text-sm text-anchor-text-muted">
          Instructor{' '}
          <span className="font-medium text-anchor-text">{course.instructor}</span>
        </p>

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-anchor-border pt-4">
          <div>
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-anchor-text">
              <span className="h-1.5 w-1.5 rounded-full bg-anchor-accent" aria-hidden="true" />
              {formatStartLabel(course.startDate)}
            </p>
            <p className="mt-1 text-lg font-bold text-anchor-text">{course.price}</p>
          </div>
          <Link
            to={`/courses/${course.slug}`}
            className="text-sm font-semibold text-anchor-action underline-offset-4 transition-colors hover:text-anchor-action-hover hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid focus-visible:outline-anchor-action"
          >
            View cohort
          </Link>
        </div>
      </div>
    </article>
  )
}