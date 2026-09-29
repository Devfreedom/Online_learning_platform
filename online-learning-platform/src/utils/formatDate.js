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

const monthDayFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
})

export function formatMonthDay(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number)
  return monthDayFormatter.format(new Date(year, month - 1, day))
}