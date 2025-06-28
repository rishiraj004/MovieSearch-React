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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="aspect-[2/3] bg-gray-300 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-3 bg-gray-300 rounded mb-2 w-1/2"></div>
            <div className="h-3 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-2">No movies found</div>
        <p className="text-gray-400">Try searching with different keywords</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
      ))}
    </div>
  )
}
