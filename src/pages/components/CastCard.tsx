import { useState } from 'react'

import type { Cast } from '../../features/movies/types/movie.types'
import { getPersonImageUrl } from '../../features/movies/utils/imageUtils'

interface CastCardProps {
  cast: Cast
  onClick?: (cast: Cast) => void
}

export function CastCard({ cast, onClick }: CastCardProps) {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  const getImageSrc = () => {
    if (imageError || !cast.profile_path) {
      return getPersonImageUrl(null) // Use the same placeholder as TrendingPersonCard
    }
    return getPersonImageUrl(cast.profile_path)
  }

  return (
    <div
      className="flex flex-col items-center cursor-pointer group hover:scale-105 active:scale-95 transition-all duration-300 animate-fadeInUp"
      onClick={() => onClick?.(cast)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.(cast)
        }
      }}
    >
      <div className="bg-gray-800 rounded-full overflow-hidden w-16 h-16 sm:w-20 sm:h-20 mb-2 group-hover:ring-2 group-hover:ring-blue-400 transition-all duration-300">
        <img
          src={getImageSrc()}
          alt={cast.name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={handleImageError}
        />
      </div>
      <div className="text-center max-w-20">
        <h4 className="text-white font-semibold text-xs sm:text-sm mb-1 line-clamp-2">
          {cast.name}
        </h4>
        <p className="text-gray-400 text-xs line-clamp-2">
          {cast.character}
        </p>
      </div>
    </div>
  )
}
