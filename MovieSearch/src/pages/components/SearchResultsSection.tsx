import type { RefObject } from 'react'

import { EmptySearchState } from './EmptySearchState'
import { ErrorDisplay } from './ErrorDisplay'
import { SelectedMovieDebug } from './SelectedMovieDebug'

import { MovieGrid } from '@/features/movies/components/MovieGrid'
import { SearchBar } from '@/features/movies/components/SearchBar'
import type { Movie } from '@/features/movies/types/movie.types'
import { Button } from '@/shared/components/ui/button'

interface SearchResultsSectionProps {
  searchSectionRef: RefObject<HTMLDivElement | null>
  movies: Movie[]
  isLoading: boolean
  error: string | null
  hasSearched: boolean
  selectedMovie: Movie | null
  currentPage: number
  totalPages: number
  onSearch: (query: string) => void
  onSearchDebounced: (query: string) => void
  onSuggestionClick: (movie: Movie) => void
  onMovieClick: (movie: Movie) => void
  onClearSearch: () => void
  onLoadMore: () => void
}

export function SearchResultsSection({
  searchSectionRef,
  movies,
  isLoading,
  error,
  hasSearched,
  selectedMovie,
  currentPage,
  totalPages,
  onSearch,
  onSearchDebounced,
  onSuggestionClick,
  onMovieClick,
  onClearSearch,
  onLoadMore
}: SearchResultsSectionProps) {
  const hasMorePages = currentPage < totalPages

  return (
    <div ref={searchSectionRef} className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      {/* Subtle Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-slate-700 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-700 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-slate-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10 space-y-4 md:space-y-8 px-3 md:px-4 py-8 md:py-12">
        {/* Enhanced Search Section */}
        <div className="text-center py-4 md:py-8 lg:py-12 relative">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-2xl md:rounded-3xl border border-white/5"></div>
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 md:mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Search Movies
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-4 md:mb-8 px-2 md:px-4">
              Discover your next favorite movie
            </p>

            {/* Enhanced Search Bar Container */}
            <div className="max-w-3xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-gray-600 via-slate-600 to-gray-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
                <div className="relative bg-black/30 backdrop-blur-md rounded-xl p-3 md:p-4 lg:p-6 border border-white/10">
                  <SearchBar
                    onSearch={onSearch}
                    onSearchDebounced={onSearchDebounced}
                    onSuggestionClick={onSuggestionClick}
                    isLoading={isLoading}
                    placeholder="Search for movies..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Section */}
        {error && (
          <ErrorDisplay error={error} onClearError={onClearSearch} />
        )}

        {/* Results Section */}
        {movies.length > 0 && (
          <div className="max-w-7xl mx-auto space-y-4 md:space-y-6 lg:space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                  Search Results
                </h2>
                <p className="text-gray-400 text-sm md:text-base">
                  Found {movies.length} movie{movies.length !== 1 ? 's' : ''} • Page {currentPage} of {totalPages}
                </p>
              </div>
              
              {hasSearched && (
                <Button
                  onClick={onClearSearch}
                  variant="outline"
                  className="border-white/60 bg-black/40 backdrop-blur-md text-white hover:bg-white hover:text-black hover:border-white shrink-0 px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl transition-all duration-300"
                >
                  Clear Search
                </Button>
              )}
            </div>

            <MovieGrid
              movies={movies}
              onMovieClick={onMovieClick}
            />

            {hasMorePages && (
              <div className="text-center py-4 md:py-6 lg:py-8">
                <Button
                  onClick={onLoadMore}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 text-white border-0 px-8 md:px-12 py-3 md:py-4 rounded-xl md:rounded-2xl font-semibold text-base md:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:transform-none"
                >
                  {isLoading ? 'Loading...' : `Load More (${currentPage}/${totalPages})`}
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Enhanced Empty State */}
        {movies.length === 0 && hasSearched && !isLoading && !error && (
          <EmptySearchState />
        )}

        {/* Enhanced Selected Movie Debug Info */}
        {selectedMovie && (
          <SelectedMovieDebug selectedMovie={selectedMovie} />
        )}
      </div>
    </div>
  )
}
