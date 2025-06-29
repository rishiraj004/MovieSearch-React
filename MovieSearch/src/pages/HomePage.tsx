import { useState, useCallback, useRef, useEffect } from 'react'

import { movieService } from '../features/movies/services/movie.service'
import type { Movie, TVShow, Person } from '../features/movies/types/movie.types'

import {
  MovieGrid,
  SearchBar,
  useMovieSearch,
  HeroSection,
  TrendingSection,
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
    loadTopRatedMovies,
    loadPopularMovies,
  } = useMovieSearch()
  
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [showSearchSection, setShowSearchSection] = useState(false)
  const searchSectionRef = useRef<HTMLDivElement>(null)
  
  // Trending data state
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([])
  const [trendingTVShows, setTrendingTVShows] = useState<TVShow[]>([])
  const [trendingPeople, setTrendingPeople] = useState<Person[]>([])
  
  const [loadingMovies, setLoadingMovies] = useState(true)
  const [loadingTVShows, setLoadingTVShows] = useState(true)
  const [loadingPeople, setLoadingPeople] = useState(true)
  const [apiError, setApiError] = useState<string | null>(null)

  // Debug: Check if API key is loaded
  const apiKey = import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN

  // Fetch trending data on component mount
  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        // Fetch trending movies
        setLoadingMovies(true)
        const moviesResponse = await movieService.getTrendingMovies('day')
        setTrendingMovies(moviesResponse.results)
      } catch (error) {
        if (error instanceof Error && error.message.includes('API key')) {
          setApiError(error.message)
        }
      } finally {
        setLoadingMovies(false)
      }

      try {
        // Fetch trending TV shows
        setLoadingTVShows(true)
        const tvResponse = await movieService.getTrendingTVShows('day')
        setTrendingTVShows(tvResponse.results)
      } catch (error) {
        if (error instanceof Error && error.message.includes('API key')) {
          setApiError(error.message)
        }
      } finally {
        setLoadingTVShows(false)
      }

      try {
        // Fetch trending people
        setLoadingPeople(true)
        const peopleResponse = await movieService.getTrendingPeople('day')
        setTrendingPeople(peopleResponse.results)
      } catch (error) {
        if (error instanceof Error && error.message.includes('API key')) {
          setApiError(error.message)
        }
      } finally {
        setLoadingPeople(false)
      }
    }

    fetchTrendingData()
  }, [])

  // Trending refresh handlers with time window
  const refreshTrendingMovies = useCallback(async (timeWindow: 'day' | 'week' = 'day') => {
    setLoadingMovies(true)
    try {
      const moviesResponse = await movieService.getTrendingMovies(timeWindow)
      setTrendingMovies(moviesResponse.results)
    } catch (error) {
      if (error instanceof Error && error.message.includes('API key')) {
        setApiError(error.message)
      }
    } finally {
      setLoadingMovies(false)
    }
  }, [])

  const refreshTrendingTVShows = useCallback(async (timeWindow: 'day' | 'week' = 'day') => {
    setLoadingTVShows(true)
    try {
      const tvResponse = await movieService.getTrendingTVShows(timeWindow)
      setTrendingTVShows(tvResponse.results)
    } catch (error) {
      if (error instanceof Error && error.message.includes('API key')) {
        setApiError(error.message)
      }
    } finally {
      setLoadingTVShows(false)
    }
  }, [])

  const refreshTrendingPeople = useCallback(async (timeWindow: 'day' | 'week' = 'day') => {
    setLoadingPeople(true)
    try {
      const peopleResponse = await movieService.getTrendingPeople(timeWindow)
      setTrendingPeople(peopleResponse.results)
    } catch (error) {
      if (error instanceof Error && error.message.includes('API key')) {
        setApiError(error.message)
      }
    } finally {
      setLoadingPeople(false)
    }
  }, [])

  // Stable callback references to prevent SearchBar re-renders
  const handleSearch = useCallback((query: string) => {
    searchMovies(query)
  }, [searchMovies])

  const handleDebouncedSearch = useCallback((query: string) => {
    debouncedSearch(query)
  }, [debouncedSearch])

  const handleSuggestionClick = useCallback((movie: Movie) => {
    // When a suggestion is clicked, perform search with movie title
    searchMovies(movie.title)
    setShowSearchSection(true)
    setTimeout(() => {
      searchSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }, [searchMovies])

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
    // Scroll to trending section
    const trendingSection = document.getElementById('trending-section')
    if (trendingSection) {
      trendingSection.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

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

  const handleTrendingItemClick = useCallback((item: Movie | TVShow | Person) => {
    // Handle item click based on type
    if ('title' in item) {
      // It's a movie - could navigate to movie details
      // Navigate to movie details page or handle as needed
    } else if ('name' in item && 'first_air_date' in item) {
      // It's a TV show - could navigate to TV show details
      // Navigate to TV show details page or handle as needed
    } else if ('name' in item && 'known_for_department' in item) {
      // It's a person - could navigate to person details
      // Navigate to person details page or handle as needed
    }
  }, [])

  const hasMorePages = currentPage < totalPages

  // Show API setup message if API key is missing
  if (apiError) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] text-white">
        {/* Hero Section */}
        <HeroSection 
          onSearchClick={handleSearchClick}
          onTrendingClick={handleTrendingClick}
          onTopRatedClick={handleTopRatedClick}
          onGenresClick={handleGenresClick}
        />
        
        {/* API Setup Message */}
        <div className="flex items-center justify-center py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-red-500/10 backdrop-blur-md border border-red-500/20 rounded-2xl p-8 lg:p-12">
              <div className="text-6xl mb-6">🔑</div>
              <h2 className="text-3xl font-bold text-white mb-4">API Key Required</h2>
              <p className="text-red-300 text-lg mb-8">{apiError}</p>
              
              <div className="bg-gray-800/50 rounded-xl p-6 text-left space-y-4">
                <h3 className="text-xl font-semibold text-pink-400 mb-4">Setup Instructions:</h3>
                <ol className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                    <span>Go to <a href="https://www.themoviedb.org/settings/api" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300 underline">TMDb API Settings</a></span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                    <span>Get your <strong>Read Access Token</strong> (Bearer Token)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                    <span>Create a <code className="bg-gray-700 px-2 py-1 rounded text-pink-300">.env</code> file in the project root</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                    <span>Add: <code className="bg-gray-700 px-2 py-1 rounded text-pink-300">VITE_TMDB_API_READ_ACCESS_TOKEN=your_token_here</code></span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">5</span>
                    <span>Restart the development server</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Debug info panel at the top
  const debugInfo = !apiKey ? (
    <div className="bg-red-600 text-white p-4 text-center">
      <strong>Debug: API Key Status - {apiKey ? 'Found' : 'Missing'}</strong>
      {!apiKey && ' - Check .env.development file'}
    </div>
  ) : null

  return (
    <>
      {debugInfo}
      {/* Hero Section */}
      <HeroSection 
        onSearchClick={handleSearchClick}
        onTrendingClick={handleTrendingClick}
        onTopRatedClick={handleTopRatedClick}
        onGenresClick={handleGenresClick}
      />

      {/* Trending Section */}
      <div id="trending-section" className="min-h-screen bg-[#1a1a1a] text-white py-8">
        <div className="space-y-16">
          <TrendingSection
            title="Trending Movies"
            type="movie"
            data={trendingMovies}
            isLoading={loadingMovies}
            onItemClick={handleTrendingItemClick}
            onTimeWindowChange={refreshTrendingMovies}
          />

          <TrendingSection
            title="Trending TV Shows"
            type="tv"
            data={trendingTVShows}
            isLoading={loadingTVShows}
            onItemClick={handleTrendingItemClick}
            onTimeWindowChange={refreshTrendingTVShows}
          />

          <TrendingSection
            title="Trending People"
            type="person"
            data={trendingPeople}
            isLoading={loadingPeople}
            onItemClick={handleTrendingItemClick}
            onTimeWindowChange={refreshTrendingPeople}
          />
        </div>
      </div>
      
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
                        onSuggestionClick={handleSuggestionClick}
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
