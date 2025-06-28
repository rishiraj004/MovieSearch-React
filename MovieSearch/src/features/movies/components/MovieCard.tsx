import { movieService } from '../services/movie.service'
import type { Movie } from '../types/movie.types'

interface MovieCardProps {
  movie: Movie
  onClick?: (movie: Movie) => void
}

export function MovieCard({ movie, onClick }: MovieCardProps) {
  const handleClick = () => {
    onClick?.(movie)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleClick()
    }
  }

  const posterUrl = movieService.getImageUrl(movie.poster_path, 'w342')
  const releaseYear = new Date(movie.release_date).getFullYear()

  return (
    <div
      className="group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${movie.title}`}
    >
      <div className="aspect-[2/3] relative overflow-hidden">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {movie.vote_average > 0 && (
          <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            ⭐ {movie.vote_average.toFixed(1)}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg line-clamp-2 mb-2">
          {movie.title}
        </h3>
        <p className="text-gray-600 text-sm mb-2">{releaseYear}</p>
        <p className="text-gray-700 text-sm line-clamp-3">{movie.overview}</p>
      </div>
    </div>
  )
}
