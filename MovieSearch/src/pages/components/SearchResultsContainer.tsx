import { useState, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import type { Movie } from '../../features/movies/types/movie.types'

import { SearchResultsSection } from './SearchResultsSection'

import { useMovieSearch } from '@/features/movies'

interface SearchResultsContainerProps {
  showSearchSection: boolean
}

export function SearchResultsContainer({ showSearchSection }: SearchResultsContainerProps) {
  const navigate = useNavigate()
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
  const searchSectionRef = useRef<HTMLDivElement>(null)

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
  }, [searchMovies])

  const handleMovieClick = useCallback((movie: Movie) => {
    setSelectedMovie(movie)
    // Navigate to movie detail page
    navigate(`/movie/${movie.id}`)
  }, [navigate])

  const handleLoadMore = useCallback(() => {
    loadNextPage()
  }, [loadNextPage])

  if (!showSearchSection) {
    return null
  }

  return (
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
  )
}
