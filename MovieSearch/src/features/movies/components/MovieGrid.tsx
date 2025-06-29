import type { Movie } from '../types/movie.types'

import { MovieCard } from './MovieCard'

interface MovieGridProps {
  movies: Movie[]
  onMovieClick?: (movie: Movie) => void
  isLoading?: boolean
}

export function MovieGrid({
  movies,
  onMovieClick,
  isLoading = false,
}: MovieGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="aspect-[2/3] bg-gray-300/20 rounded-lg md:rounded-xl mb-3 md:mb-4"></div>
            <div className="h-3 md:h-4 bg-gray-300/20 rounded mb-2"></div>
            <div className="h-2 md:h-3 bg-gray-300/20 rounded mb-2 w-1/2"></div>
            <div className="h-2 md:h-3 bg-gray-300/20 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-8 md:py-12">
        <div className="text-gray-500 text-base md:text-lg mb-2">No movies found</div>
        <p className="text-gray-400 text-sm md:text-base">Try searching with different keywords</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-6">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
      ))}
    </div>
  )
}
