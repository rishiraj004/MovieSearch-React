import { useState, useCallback, useRef } from 'react'

import type { Movie } from '../features/movies/types/movie.types'

import { ApiSetupMessage, SearchResultsSection, TrendingContainer } from './components'

import { useMovieSearch, HeroSection } from '@/features/movies'


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

  // Debug: Check if API key is loaded
  const apiKey = import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN

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

  // Show API setup message if API key is missing
  if (!apiKey) {
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
        <ApiSetupMessage />
      </div>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <HeroSection 
        onSearchClick={handleSearchClick}
        onTrendingClick={handleTrendingClick}
        onTopRatedClick={handleTopRatedClick}
        onGenresClick={handleGenresClick}
      />

      {/* Trending Section */}
      <TrendingContainer />
      
      {/* Search and Results Section */}
      {showSearchSection && (
        <SearchResultsSection
          searchSectionRef={searchSectionRef}
          movies={movies}
          isLoading={isLoading}
          error={error}
          hasSearched={hasSearched}
          selectedMovie={selectedMovie}
          currentPage={currentPage}
          totalPages={totalPages}
          onSearch={handleSearch}
          onSearchDebounced={handleDebouncedSearch}
          onSuggestionClick={handleSuggestionClick}
          onMovieClick={handleMovieClick}
          onClearSearch={clearSearch}
          onLoadMore={handleLoadMore}
        />
      )}
    </>
  )
}
