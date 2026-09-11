const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

export function formatDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return dateFormatter.format(date)
}

export function formatStartLabel(isoDate) {
  return `Starts ${formatDate(isoDate)}`
}