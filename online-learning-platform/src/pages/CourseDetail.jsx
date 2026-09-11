import { Link, useParams } from 'react-router'
import { courses } from '../data/courses'
import { courseDetails } from '../data/courseDetails'
import { formatDate, formatStartLabel } from '../utils/formatDate'
import { getCourseBySlug, getRelatedCourses } from '../utils/courseLookup'
import CourseCard from '../components/ui/CourseCard'

function Section({ id, kicker, title, children }) {
  return (
    <section aria-labelledby={id} className="mt-14">
      <p className="inline-flex items-center gap-2 rounded-lg bg-anchor-surface px-3 py-1.5 text-sm font-medium text-anchor-text-muted ring-1 ring-anchor-border">
        <span className="h-1.5 w-1.5 rounded-full bg-anchor-accent" aria-hidden="true" />
        {kicker}
      </p>
      <h2 id={id} className="mt-3 text-2xl font-semibold tracking-tight text-anchor-text">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  )
}

function NotFound() {
  return (
    <main className="bg-anchor-bg">
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight text-anchor-text">
          Cohort not found.
        </h1>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-anchor-text-muted">
          That course link does not match an upcoming cohort. Browse the full
          catalog to find one that fits.
        </p>
        <Link
          to="/catalog"
          className="mt-8 inline-block rounded-lg bg-anchor-action px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-anchor-action-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
        >
          Browse all cohorts
        </Link>
      </div>
    </main>
  )
}

export default function CourseDetail() {
  const { slug } = useParams()
  const course = getCourseBySlug(slug ?? '', courses, courseDetails)

  if (!course) return <NotFound />

  const details = course.details
  const related = getRelatedCourses(course.slug, courses, 3)

  return (
    <main className="bg-anchor-bg">
      {/* Live-cohort banner */}
      <div className="border-b border-anchor-border bg-anchor-surface">
        <p className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-2.5 text-sm font-medium text-anchor-text-muted sm:px-6 lg:px-8">
          <span className="h-1.5 w-1.5 rounded-full bg-anchor-accent" aria-hidden="true" />
          Live cohort · {details.duration} · {formatStartLabel(course.startDate)}
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <nav aria-label="Breadcrumb">
          <Link
            to="/catalog"
            className="text-sm font-semibold text-anchor-action underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
          >
            ← All cohorts
          </Link>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
          {/* Main column */}
          <div className="min-w-0">
            <img
              src={course.image}
              alt={course.imageAlt}
              className="aspect-[16/9] w-full rounded-xl border border-anchor-border object-cover"
            />
            <p className="mt-6 inline-block rounded-md bg-anchor-surface px-2.5 py-1 text-xs font-semibold text-anchor-text-muted ring-1 ring-anchor-border">
              {course.category}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-anchor-text sm:text-4xl">
              {course.title}
            </h1>
            <p className="mt-3 leading-relaxed text-anchor-text-muted">
              {course.description}
            </p>

            <dl className="mt-6 grid gap-4 rounded-xl border border-anchor-border bg-anchor-surface p-5 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold text-anchor-text-muted">Instructor</dt>
                <dd className="mt-1 text-sm font-semibold text-anchor-text">{course.instructor}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold text-anchor-text-muted">Rating</dt>
                <dd className="mt-1 text-sm font-semibold text-anchor-text">
                  ★ {details.rating}{' '}
                  <span className="font-normal text-anchor-text-muted">
                    ({details.reviews} cohort reviews)
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold text-anchor-text-muted">Cohort starts</dt>
                <dd className="mt-1 text-sm font-semibold text-anchor-text">
                  {formatDate(course.startDate)}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold text-anchor-text-muted">Duration</dt>
                <dd className="mt-1 text-sm font-semibold text-anchor-text">{details.duration}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs font-semibold text-anchor-text-muted">Weekly schedule</dt>
                <dd className="mt-1 text-sm font-semibold text-anchor-text">
                  {details.weeklySchedule} · live with your cohort
                </dd>
              </div>
            </dl>

            <Section id="overview" kicker="Overview" title="A live cohort, not a video course.">
              <p className="max-w-3xl leading-relaxed text-anchor-text-muted">
                {details.overview}
              </p>
            </Section>

            <Section id="learn" kicker="Outcomes" title="What you'll learn.">
              <ul className="grid max-w-3xl gap-3">
                {details.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-anchor-accent/80"
                    />
                    <span className="leading-relaxed text-anchor-text">{outcome}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section id="curriculum" kicker="Curriculum" title="Week by week.">
              <ol className="grid max-w-3xl gap-4">
                {details.curriculum.map((week) => (
                  <li
                    key={week.week}
                    className="rounded-xl border border-anchor-border bg-anchor-surface p-5"
                  >
                    <p className="text-xs font-semibold text-anchor-action">{week.week}</p>
                    <h3 className="mt-1 font-semibold text-anchor-text">{week.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-anchor-text-muted">
                      {week.body}
                    </p>
                  </li>
                ))}
              </ol>
            </Section>

            <Section id="instructor" kicker="Instructor" title={`Led by ${course.instructor}.`}>
              <div className="flex max-w-3xl items-start gap-4 rounded-xl border border-anchor-border bg-anchor-surface p-5">
                <span
                  aria-hidden="true"
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-anchor-action text-sm font-bold text-white"
                >
                  {course.instructorInitials}
                </span>
                <div>
                  <p className="font-semibold text-anchor-text">{course.instructor}</p>
                  <p className="mt-1 text-sm leading-relaxed text-anchor-text-muted">
                    Teaches {course.title} live each week, reviews your project
                    work, and joins every cohort discussion.
                  </p>
                </div>
              </div>
            </Section>

            <Section id="timeline" kicker="Cohort journey" title="How your cohort unfolds.">
              <ol className="relative grid max-w-3xl gap-6 border-l border-anchor-border pl-6">
                {details.timeline.map((stage) => (
                  <li key={stage.title} className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute top-1 -left-[29px] h-2.5 w-2.5 rounded-full border-2 border-anchor-action bg-anchor-surface"
                    />
                    <h3 className="font-semibold text-anchor-text">{stage.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-anchor-text-muted">
                      {stage.body}
                    </p>
                  </li>
                ))}
              </ol>
            </Section>

            <Section id="requirements" kicker="Requirements" title="What you need to join.">
              <ul className="grid max-w-3xl gap-3">
                {details.requirements.map((req) => (
                  <li key={req} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-anchor-accent/80"
                    />
                    <span className="leading-relaxed text-anchor-text">{req}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section id="faq" kicker="FAQ" title="Questions, answered.">
              <div className="grid max-w-3xl gap-3">
                {details.faq.map((item) => (
                  <details
                    key={item.q}
                    className="rounded-xl border border-anchor-border bg-anchor-surface px-5 py-4"
                  >
                    <summary className="cursor-pointer font-semibold text-anchor-text">
                      {item.q}
                    </summary>
                    <p className="mt-2 text-sm leading-relaxed text-anchor-text-muted">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </Section>
          </div>

          {/* Enroll sidebar */}
          <aside aria-label="Enrollment" className="min-w-0">
            <div
              id="enroll"
              className="scroll-mt-24 rounded-xl border border-anchor-border bg-anchor-surface p-6 shadow-sm lg:sticky lg:top-24"
            >
              <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-anchor-text">
                <span className="h-1.5 w-1.5 rounded-full bg-anchor-accent" aria-hidden="true" />
                {formatStartLabel(course.startDate)}
              </p>
              <p className="mt-3 text-3xl font-bold text-anchor-text">{course.price}</p>
              <p className="mt-1 text-sm text-anchor-text-muted">
                {details.duration} · {details.weeklySchedule}
              </p>
              <a
                href="#enroll"
                className="mt-5 block rounded-lg bg-anchor-action px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-anchor-action-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
              >
                Enroll in this cohort
              </a>
              <p className="mt-3 text-center text-xs leading-relaxed text-anchor-text-muted">
                Small group · live sessions · capstone project included
              </p>
            </div>
          </aside>
        </div>

        <section aria-labelledby="related-heading" className="mt-16 border-t border-anchor-border pt-10">
          <h2 id="related-heading" className="text-2xl font-semibold tracking-tight text-anchor-text">
            Related cohorts.
          </h2>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {related.map((item) => (
              <li key={item.id}>
                <CourseCard course={item} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}
