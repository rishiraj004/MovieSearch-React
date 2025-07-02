import { formatRating } from '../../utils/formatUtils'

interface RatingBadgeProps {
  rating: number
  className?: string
}

export function RatingBadge({ rating, className = '' }: RatingBadgeProps) {
  return (
    <div className={`absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-yellow-400 px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 ${className}`}>
      <span>⭐</span>
      {formatRating(rating)}
    </div>
  )
}