import { useState, useCallback, useRef } from 'react'

import {
  MovieGrid,
  SearchBar,
  useMovieSearch,
  HeroSection,
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
    loadTrendingMovies,
    loadTopRatedMovies,
    loadPopularMovies,
  } = useMovieSearch()
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [showSearchSection, setShowSearchSection] = useState(false)
  const searchSectionRef = useRef<HTMLDivElement>(null)

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

  const handleSearchClick = useCallback(() => {
    setShowSearchSection(true)
    setTimeout(() => {
      searchSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }, [])

  const handleTrendingClick = useCallback(() => {
    // Load trending movies
    loadTrendingMovies()
    setShowSearchSection(true)
    setTimeout(() => {
      searchSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }, [loadTrendingMovies])

  const handleTopRatedClick = useCallback(() => {
    // Load top rated movies
    loadTopRatedMovies()
    setShowSearchSection(true)
    setTimeout(() => {
      searchSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }, [loadTopRatedMovies])

  const handleGenresClick = useCallback(() => {
    // Show popular movies
    loadPopularMovies()
    setShowSearchSection(true)
    setTimeout(() => {
      searchSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }, [loadPopularMovies])

  const hasMorePages = currentPage < totalPages

  return (
    <>
      {/* Hero Section */}
      <HeroSection 
        onSearchClick={handleSearchClick}
        onTrendingClick={handleTrendingClick}
        onTopRatedClick={handleTopRatedClick}
        onGenresClick={handleGenresClick}
      />
      
      {/* Search and Results Section */}
      {showSearchSection && (
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
                        onSearch={handleSearch}
                        onSearchDebounced={handleDebouncedSearch}
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
              <div className="max-w-4xl mx-auto animate-fade-in">
                <div className="bg-red-500/10 backdrop-blur-md border border-red-500/20 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 text-center">
                  <div className="text-red-400 text-4xl md:text-5xl lg:text-6xl mb-3 md:mb-4">⚠️</div>
                  <p className="text-red-300 font-medium text-base md:text-lg mb-4 md:mb-6">Error: {error}</p>
                  <Button onClick={clearSearch} className="bg-red-500 hover:bg-red-600 text-white border-0 px-6 md:px-8 py-2 md:py-3 rounded-lg md:rounded-xl transition-all duration-300 transform hover:scale-105">
                    Try Again
                  </Button>
                </div>
              </div>
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
                      onClick={clearSearch}
                      variant="outline"
                      className="border-white/60 bg-black/40 backdrop-blur-md text-white hover:bg-white hover:text-black hover:border-white shrink-0 px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl transition-all duration-300"
                    >
                      Clear Search
                    </Button>
                  )}
                </div>

                <MovieGrid
                  movies={movies}
                  onMovieClick={handleMovieClick}
                />

                {hasMorePages && (
                  <div className="text-center py-4 md:py-6 lg:py-8">
                    <Button
                      onClick={handleLoadMore}
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
              <div className="max-w-4xl mx-auto text-center animate-fade-in">
                <div className="bg-gray-500/10 backdrop-blur-md border border-gray-500/20 rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-12">
                  <div className="text-6xl md:text-7xl lg:text-8xl mb-4 md:mb-6">🎬</div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4">
                    No Movies Found
                  </h3>
                  <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed px-4">
                    Discover amazing movies with our intelligent search. Find by title, actor, director, or genre.
                  </p>
                </div>
              </div>
            )}

            {/* Enhanced Selected Movie Debug Info */}
            {selectedMovie && (
              <div className="max-w-4xl mx-auto animate-fade-in">
                <div className="bg-blue-500/10 backdrop-blur-md border border-blue-500/20 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8">
                  <h3 className="font-bold text-blue-300 text-lg md:text-xl mb-3 md:mb-4">Selected Movie:</h3>
                  <p className="text-white text-base md:text-lg">
                    {selectedMovie.title} 
                    <span className="text-gray-400 ml-2">
                      ({new Date(selectedMovie.release_date).getFullYear()})
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
