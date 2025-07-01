import { X } from 'lucide-react'

interface FilterBadgeProps {
  label: string
  value: string
  onRemove: () => void
}

export function FilterBadge({ label, value, onRemove }: FilterBadgeProps) {
  return (
    <div className="inline-flex items-center gap-1 bg-gray-700 rounded-full px-3 py-1 text-sm">
      <span className="text-gray-400">{label}:</span>
      <span className="text-white">{value}</span>
      <button
        type="button"
        onClick={onRemove}
        className="ml-1 text-gray-400 hover:text-white"
        aria-label={`Remove ${label} filter`}
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  )
}
