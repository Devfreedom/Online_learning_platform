export default function FilterPanel({ filters, categories, onChange, onClear, idPrefix }) {
  const toggleCategory = (category) => {
    const selected = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category]
    onChange({ categories: selected })
  }

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor={`${idPrefix}-search`}
          className="text-sm font-semibold text-anchor-text"
        >
          Search
        </label>
        <input
          id={`${idPrefix}-search`}
          type="search"
          value={filters.query}
          onChange={(event) => onChange({ query: event.target.value })}
          placeholder="Try “AI”, “strategy”, “Maya”…"
          className="mt-2 w-full rounded-lg border border-anchor-border bg-anchor-surface px-4 py-2.5 text-sm text-anchor-text placeholder:text-anchor-text-muted/60 focus:border-anchor-action focus:outline-2 focus:outline-anchor-action"
        />
      </div>

      <fieldset>
        <legend className="text-sm font-semibold text-anchor-text">Availability</legend>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {[
            { value: 'all', label: 'All cohorts' },
            { value: 'upcoming', label: 'Upcoming' },
          ].map((option) => (
            <label
              key={option.value}
              className={`cursor-pointer rounded-lg px-3 py-2 text-center text-sm font-medium ring-1 transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-anchor-action ${
                filters.availability === option.value
                  ? 'bg-anchor-action text-white ring-anchor-action'
                  : 'bg-anchor-surface text-anchor-text-muted ring-anchor-border hover:text-anchor-text'
              }`}
            >
              <input
                type="radio"
                name={`${idPrefix}-availability`}
                value={option.value}
                checked={filters.availability === option.value}
                onChange={() => onChange({ availability: option.value })}
                className="sr-only"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-semibold text-anchor-text">Category</legend>
        <ul className="mt-2 space-y-2">
          {categories.map((category) => (
            <li key={category}>
              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-anchor-text-muted transition-colors hover:text-anchor-text focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-anchor-action">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => toggleCategory(category)}
                  className="h-4 w-4 rounded accent-[#4f46e5]"
                />
                {category}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <div>
        <label
          htmlFor={`${idPrefix}-start-after`}
          className="text-sm font-semibold text-anchor-text"
        >
          Starts on or after
        </label>
        <input
          id={`${idPrefix}-start-after`}
          type="date"
          value={filters.startAfter}
          onChange={(event) => onChange({ startAfter: event.target.value })}
          className="mt-2 w-full rounded-lg border border-anchor-border bg-anchor-surface px-4 py-2.5 text-sm text-anchor-text focus:border-anchor-action focus:outline-2 focus:outline-anchor-action"
        />
      </div>

      <button
        type="button"
        onClick={onClear}
        className="text-sm font-semibold text-anchor-action underline-offset-4 transition-colors hover:text-anchor-action-hover hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-action"
      >
        Clear all filters
      </button>
    </div>
  )
}
