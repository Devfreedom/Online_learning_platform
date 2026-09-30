import { useState } from 'react'
import { certificates, prototypeInstructors } from '../../data/cohorts'
import { useAuth } from '../../hooks/useAuth'
import { formatDate } from '../../utils/formatDate'

function CertificateView({ certificate, learnerName, onBack }) {
  const instructor = prototypeInstructors.find(
    (item) => item.id === certificate.instructorId,
  )
  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="text-sm font-semibold text-anchor-action underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
      >
        ← All certificates
      </button>

      <article
        aria-label={`Certificate for ${certificate.courseTitle}`}
        className="relative overflow-hidden rounded-xl border-2 border-anchor-action/30 bg-anchor-surface px-6 py-12 text-center sm:px-12"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-3 rounded-lg border border-anchor-border"
        />
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-anchor-action text-lg font-bold text-white">
          A
        </span>
        <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-anchor-text-muted">
          Anchorpoint · Certificate of Completion
        </p>
        <h1 className="mx-auto mt-3 max-w-xl text-2xl font-semibold tracking-tight text-anchor-text sm:text-3xl">
          {certificate.courseTitle}
        </h1>
        <p className="mt-4 text-sm text-anchor-text-muted">Awarded to</p>
        <p className="mt-1 text-xl font-semibold text-anchor-text">{learnerName}</p>
        <p className="mt-1 text-xs text-anchor-text-muted">
          has successfully completed
        </p>
        <dl className="mx-auto mt-6 grid max-w-md gap-3 text-sm sm:grid-cols-2">
          <div className="rounded-lg bg-anchor-bg px-4 py-3 ring-1 ring-anchor-border">
            <dt className="text-xs text-anchor-text-muted">Completed</dt>
            <dd className="mt-0.5 font-semibold text-anchor-text">
              {formatDate(certificate.completionDate)}
            </dd>
          </div>
          <div className="rounded-lg bg-anchor-bg px-4 py-3 ring-1 ring-anchor-border">
            <dt className="text-xs text-anchor-text-muted">Instructor</dt>
            <dd className="mt-0.5 font-semibold text-anchor-text">
              {certificate.instructorName}
            </dd>
          </div>
        </dl>
        <p className="mt-4 text-xs font-semibold tracking-wide text-anchor-text-muted">
          Certificate ID · {certificate.certificateId}
        </p>
        {instructor && (
          <p className="mt-4 text-xs text-anchor-text-muted">
            {instructor.credential}
          </p>
        )}
        <p className="mx-auto mt-8 max-w-md text-xs leading-relaxed text-anchor-text-muted">
          Prototype certificate for demonstration only. It does not represent
          official accreditation or a formal qualification.
        </p>
      </article>
    </div>
  )
}

export default function Certificates() {
  const { user } = useAuth()
  const [selectedId, setSelectedId] = useState(null)

  const learnerName = user ? `${user.firstName} ${user.lastName}` : 'Learner'
  const selected = certificates.find((item) => item.id === selectedId)

  if (selected) {
    return (
      <CertificateView
        certificate={selected}
        learnerName={learnerName}
        onBack={() => setSelectedId(null)}
      />
    )
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-anchor-text sm:text-3xl">
          Certificates
        </h1>
        <p className="mt-1.5 text-anchor-text-muted">
          Your completed learning milestones.
        </p>
      </header>

      {certificates.length === 0 ? (
        <div className="rounded-xl border border-dashed border-anchor-border bg-anchor-surface px-6 py-16 text-center">
          <p className="text-sm text-anchor-text-muted">
            No certificates yet. Finish a cohort to earn your first one.
          </p>
        </div>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2">
          {certificates.map((certificate) => (
            <li
              key={certificate.id}
              className="flex flex-col rounded-xl border border-anchor-border bg-anchor-surface p-6"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-anchor-action/10 text-base font-bold text-anchor-action">
                ✦
              </span>
              <h2 className="mt-4 text-lg font-semibold text-anchor-text">
                {certificate.courseTitle}
              </h2>
              <dl className="mt-3 space-y-1.5 text-sm">
                <div className="flex gap-2">
                  <dt className="text-anchor-text-muted">Completed:</dt>
                  <dd className="font-medium text-anchor-text">
                    {formatDate(certificate.completionDate)}
                  </dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-anchor-text-muted">Instructor:</dt>
                  <dd className="font-medium text-anchor-text">
                    {certificate.instructorName}
                  </dd>
                </div>
              </dl>
              <button
                type="button"
                onClick={() => setSelectedId(certificate.id)}
                className="mt-5 rounded-lg bg-anchor-action px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-anchor-action-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
              >
                View certificate
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="text-xs text-anchor-text-muted">
        Prototype certificates for demonstration only — not official
        accreditation.
      </p>
    </div>
  )
}
