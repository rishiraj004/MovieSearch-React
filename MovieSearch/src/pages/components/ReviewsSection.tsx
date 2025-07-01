import { MessageCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

import { ReviewCard } from './ReviewCard'

import type { Review } from '@/features/movies/types/movie.types'

interface ReviewsSectionProps {
  reviews: Review[]
  totalReviews: number
  onLoadMore?: () => void
  loading?: boolean
  hasMore?: boolean
}

export function ReviewsSection({ 
  reviews, 
  totalReviews, 
  onLoadMore, 
  loading = false,
  hasMore = false 
}: ReviewsSectionProps) {
  const [showAll, setShowAll] = useState(false)
  const displayedReviews = showAll ? reviews : reviews.slice(0, 3)

  if (reviews.length === 0) {
    return (
      <div
        className="text-center py-12 animate-fadeIn"
      >
        <MessageCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-400 mb-2">No Reviews Yet</h3>
        <p className="text-gray-500">Be the first to review this movie!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-6 h-6 text-blue-400" />
          <h3 className="text-2xl font-bold">
            Reviews
            <span className="text-lg text-gray-400 ml-2">({totalReviews})</span>
          </h3>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {displayedReviews.map((review) => (
          <div
            key={review.id}
            className="animate-fadeInUp"
          >
            <ReviewCard review={review} />
          </div>
        ))}
      </div>

      {/* Show More/Less Controls */}
      {reviews.length > 3 && (
        <div
          className="text-center animate-fadeIn"
        >
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white px-6 py-3 rounded-lg transition-all duration-300 inline-flex items-center gap-2 font-medium"
          >
            {showAll ? (
              <>
                <ChevronUp className="w-5 h-5" />
                Show Less Reviews
              </>
            ) : (
              <>
                <ChevronDown className="w-5 h-5" />
                Show More Reviews ({reviews.length - 3} more)
              </>
            )}
          </button>
        </div>
      )}

      {/* Load More from API */}
      {hasMore && showAll && (
        <div
          className="text-center animate-fadeIn"
        >
          <button
            onClick={onLoadMore}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg transition-all duration-300 inline-flex items-center gap-2 font-medium disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Loading More Reviews...
              </>
            ) : (
              <>
                <ChevronDown className="w-5 h-5" />
                Load More Reviews
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
