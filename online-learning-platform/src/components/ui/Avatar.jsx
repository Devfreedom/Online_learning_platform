export default function Avatar({ initials, image, label }) {
  return (
    <span
      role="img"
      aria-label={label}
      className="grid h-11 w-11 place-items-center overflow-hidden rounded-full border-4 border-anchor-surface bg-anchor-action text-xs font-bold text-white shadow-md"
    >
      {image ? (
        <img src={image} alt={label} className="h-full w-full object-cover" />
      ) : (
        initials
      )}
    </span>
  )
}