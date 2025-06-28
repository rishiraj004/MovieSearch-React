import { useState, useCallback } from 'react'

import {
  MovieGrid,
  SearchBar,
  useMovieSearch,
  type Movie,
} from '@/features/movies'
import { Button } from '@/shared/components/ui/button'

export function HomePage() {
  const {
    movies,
    isLoading,
    error,
    searchMovies,
    loadNextPage,
    clearSearch,
    currentPage,
    totalPages,
    debouncedSearch,
    hasSearched,
  } = useMovieSearch()
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  // Stable callback references to prevent SearchBar re-renders
  const handleSearch = useCallback((query: string) => {
    searchMovies(query)
  }, [searchMovies])

  const handleDebouncedSearch = useCallback((query: string) => {
    debouncedSearch(query)
  }, [debouncedSearch])

  const handleMovieClick = useCallback((movie: Movie) => {
    setSelectedMovie(movie)
    // In a real app, you might navigate to a movie details page
  }, [])

  const handleLoadMore = useCallback(() => {
    loadNextPage()
  }, [loadNextPage])

  const hasMorePages = currentPage < totalPages

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover Movies</h1>
        <p className="text-xl md:text-2xl opacity-90 mb-8">
          Search through millions of movies and find your next favorite
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto px-4 flex justify-center items-center">
          <SearchBar
            onSearch={handleSearch}
            onSearchDebounced={handleDebouncedSearch}
            isLoading={isLoading}
            placeholder="Search for movies, actors, directors..."
          />
        </div>
      </div>

      {/* Results Section */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 font-medium">Error: {error}</p>
          <Button onClick={clearSearch} className="mt-4" variant="outline">
            Try Again
          </Button>
        </div>
      )}

      {movies.length > 0 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Search Results ({movies.length} movies)
            </h2>
            <Button onClick={clearSearch} variant="outline">
              Clear Results
            </Button>
          </div>

          <MovieGrid
            movies={movies}
            onMovieClick={handleMovieClick}
            isLoading={isLoading && currentPage === 1}
          />

          {/* Load More Button */}
          {hasMorePages && !isLoading && (
            <div className="text-center py-8">
              <Button onClick={handleLoadMore} size="lg">
                Load More Movies
              </Button>
            </div>
          )}

          {/* Loading More Indicator */}
          {isLoading && currentPage > 1 && (
            <div className="text-center py-8">
              <div className="inline-flex items-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
                Loading more movies...
              </div>
            </div>
          )}
        </div>
      )}

      {/* Welcome Message */}
      {movies.length === 0 && !isLoading && !error && !hasSearched && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🎬</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome to MovieSearch
          </h2>
          <p className="text-gray-600 text-lg">
            Search for any movie to get started
          </p>
        </div>
      )}

      {/* Selected Movie Debug Info */}
      {selectedMovie && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Selected Movie:</h3>
          <p className="text-blue-800">
            {selectedMovie.title} (
            {new Date(selectedMovie.release_date).getFullYear()})
          </p>
        </div>
      )}
    </div>
  )
}
