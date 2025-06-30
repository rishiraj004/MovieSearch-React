import { motion } from 'framer-motion'
import { Star, Calendar, ExternalLink } from 'lucide-react'
import { useState } from 'react'

import type { Review } from '@/features/movies/types/movie.types'

interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const formatDate = (dateString: string) => 
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

  const getAvatarUrl = (avatarPath: string | null) => {
    if (!avatarPath) {
      return 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"%3E%3Cdefs%3E%3ClinearGradient id="bg" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%234B5563"/%3E%3Cstop offset="100%25" style="stop-color:%23374151"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="128" height="128" fill="url(%23bg)"/%3E%3Cg fill="%23D1D5DB" opacity="0.8"%3E%3Ccircle cx="64" cy="45" r="18"/%3E%3Cpath d="M35 96c0-16 13-29 29-29h0c16 0 29 13 29 29v32H35z"/%3E%3C/g%3E%3C/svg%3E'
    }
    // Handle gravatar URLs that might start with /https://
    if (avatarPath.startsWith('/https://')) {
      return avatarPath.substring(1)
    }
    return avatarPath.startsWith('http') ? avatarPath : `https://image.tmdb.org/t/p/w64_and_h64_face${avatarPath}`
  }

  const truncateContent = (content: string, maxLength = 300) => {
    if (content.length <= maxLength) return content
    return `${content.substring(0, maxLength)}...`
  }

  const shouldShowReadMore = review.content.length > 300

  return (
    <motion.div
      className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Review Header */}
      <div className="flex items-start gap-4 mb-4">
        <img
          src={getAvatarUrl(review.author_details.avatar_path)}
          alt={review.author}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
        />
        
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="font-semibold text-white">
              {review.author_details.name || review.author}
            </h4>
            {review.author_details.rating && (
              <div className="flex items-center gap-1 px-2 py-1 bg-yellow-600/20 rounded-full">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-yellow-300 text-sm font-medium">
                  {review.author_details.rating}/10
                </span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(review.created_at)}</span>
            </div>
            {review.author_details.username && (
              <span>@{review.author_details.username}</span>
            )}
          </div>
        </div>

        <a
          href={review.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-blue-400 transition-colors"
          title="View original review"
        >
          <ExternalLink className="w-5 h-5" />
        </a>
      </div>

      {/* Review Content */}
      <div className="text-gray-300 leading-relaxed">
        <p className="whitespace-pre-wrap">
          {isExpanded ? review.content : truncateContent(review.content)}
        </p>
        
        {shouldShowReadMore && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-3 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        )}
      </div>
    </motion.div>
  )
}
