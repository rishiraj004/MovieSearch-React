import type { Movie } from '../types/movie.types'
import { getReleaseYear } from '../utils/dateUtils'
import { getImageUrl } from '../utils/imageUtils'

import { RatingBadge } from './ui/RatingBadge'

interface TrendingMovieCardProps {
  movie: Movie
  onClick?: (movie: Movie) => void
}

export function TrendingMovieCard({ movie, onClick }: TrendingMovieCardProps) {
  return (
    <div
      className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover-scale transition-transform duration-300 w-[140px] sm:w-[160px] animate-fadeInUp"
      onClick={() => onClick?.(movie)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.(movie)
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${movie.title}`}
    >
      <div className="relative overflow-hidden">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="w-full h-[180px] sm:h-[200px] object-cover"
          loading="lazy"
        />
        
        <RatingBadge rating={movie.vote_average} />
      </div>

      <div className="p-2">
        <h3 className="text-white font-semibold text-xs mb-1 line-clamp-1">
          {movie.title}
        </h3>
        <p className="text-gray-400 text-xs">
          {getReleaseYear(movie.release_date)}
        </p>
      </div>
    </div>
  )
}
