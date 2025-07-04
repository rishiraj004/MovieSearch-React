import type { Movie } from '../../features/movies/types/movie.types'
import { getImageUrl } from '../../features/movies/utils/imageUtils'

interface MovieCardProps {
  movie: Movie
  onClick?: (movie: Movie) => void
}

export function MovieCard({ movie, onClick }: MovieCardProps) {
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : ''
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'

  return (
    <div
      className="flex-shrink-0 cursor-pointer group animate-fadeInUp hover-scale"
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
      <div className="w-40 sm:w-48">
        {/* Poster with consistent 2:3 aspect ratio */}
        <div className="relative aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden mb-3 group-hover:ring-2 group-hover:ring-blue-400 transition-all duration-300">
          <img
            src={getImageUrl(movie.poster_path, 'W342')}
            alt={movie.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* Rating overlay */}
          <div className="absolute top-2 right-2 bg-black bg-opacity-70 rounded-full px-2 py-1">
            <span className="text-yellow-400 text-xs font-bold">⭐ {rating}</span>
          </div>
        </div>

        {/* Movie Info */}
        <div className="space-y-1">
          <h3 className="text-white font-semibold text-sm line-clamp-1 card-title-height group-hover:text-blue-400 transition-colors">
            {movie.title}
          </h3>
          <p className="text-gray-400 text-xs">{year}</p>
          {movie.overview && (
            <p className="text-gray-500 text-xs line-clamp-2">{movie.overview}</p>
          )}
        </div>
      </div>
    </div>
  )
}
