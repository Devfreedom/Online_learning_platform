export default function Placeholder({ title, description }) {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-anchor-text sm:text-3xl">
          {title}
        </h1>
        <p className="mt-1.5 text-anchor-text-muted">
          {description ?? 'This part of the learner workspace is coming soon.'}
        </p>
      </header>
      <div className="rounded-xl border border-dashed border-anchor-border bg-anchor-surface px-6 py-16 text-center">
        <p className="text-sm font-medium text-anchor-text">
          {title} is not built yet.
        </p>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-anchor-text-muted">
          Authentication and the learner shell come first. This route is already
          protected and ready for its own build.
        </p>
      </div>
    </div>
  )
}
