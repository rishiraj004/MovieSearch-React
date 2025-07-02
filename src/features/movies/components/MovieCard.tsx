import { Calendar, Star } from 'lucide-react'

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
      className="group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-purple-600/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-[#1a1a1a] border border-gray-800 hover:border-purple-600/50 transform hover:scale-105"
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
          className="w-full h-full object-cover transition-transform duration-300"
          loading="lazy"
        />
        
        {/* Rating Badge */}
        {movie.vote_average > 0 && (
          <div className="absolute top-2 md:top-3 right-2 md:right-3 bg-black/70 text-yellow-400 text-xs md:text-sm px-2 md:px-3 py-1 rounded-full font-semibold flex items-center space-x-1">
            <Star className="w-3 h-3 md:w-4 md:h-4 fill-current" />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
        )}
      </div>
      
      <div className="p-4 md:p-5 lg:p-6">
        <h3 className="font-bold text-lg md:text-xl text-white line-clamp-2 mb-2 md:mb-3 group-hover:text-purple-400 transition-colors duration-300">
          {movie.title}
        </h3>
        <div className="flex items-center text-gray-400 text-xs md:text-sm mb-2 md:mb-3 font-medium">
          <Calendar className="w-3 h-3 md:w-4 md:h-4 mr-1" />
          <span>{releaseYear}</span>
        </div>
        <p className="text-gray-300 text-xs md:text-sm line-clamp-3 leading-relaxed">
          {movie.overview}
        </p>
      </div>
    </div>
  )
}
