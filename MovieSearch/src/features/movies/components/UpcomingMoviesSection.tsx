import { useState, useEffect } from 'react'

import { movieService } from '../services/movie.service'
import type { Movie } from '../types/movie.types'

import { MovieCard } from './MovieCard'

interface UpcomingMoviesSectionProps {
  onMovieClick: (movie: Movie) => void
}

export function UpcomingMoviesSection({ onMovieClick }: UpcomingMoviesSectionProps) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await movieService.getUpcomingMovies(1)
        setMovies(response.results.slice(0, 20)) // Show 20 movies
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch upcoming movies')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUpcomingMovies()
  }, [])

  if (isLoading) {
    return (
      <section id="upcoming-section" className="py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">Upcoming Movies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-700 rounded-lg aspect-[2/3] mb-3"></div>
                <div className="bg-gray-700 h-4 rounded mb-2"></div>
                <div className="bg-gray-700 h-3 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="upcoming-section" className="py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">Upcoming Movies</h2>
          <div className="text-center py-8">
            <p className="text-red-400 text-lg">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="upcoming-section" className="py-8 sm:py-12 animate-fadeIn">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">Upcoming Movies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => onMovieClick(movie)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}