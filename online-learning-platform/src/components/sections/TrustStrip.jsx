// Fictional prototype partner names for this demo platform.
// They do not represent real companies or endorsements.
const MARKS = ['Northstar', 'Meridian', 'Fieldnote', 'Vertex', 'Studio Nine']

export default function TrustStrip() {
  return (
    <section aria-label="Built for modern teams" className="border-b border-anchor-border bg-anchor-surface">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-anchor-text">
          Built for modern teams and ambitious learners
        </p>
        <p className="mx-auto mt-1.5 max-w-xl text-center text-sm text-anchor-text-muted">
          Structured learning experiences designed around real work, live
          instruction and practical outcomes.
        </p>
        <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {MARKS.map((mark) => (
            <li
              key={mark}
              aria-hidden="true"
              className="text-sm font-semibold tracking-tight text-anchor-text-muted/60"
            >
              {mark}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
