import { useState, useCallback } from 'react'

import { SearchResultsContainer, TrendingContainer, TopRatedContainer, HeroSectionContainer } from './components'

import { useMovieSearch } from '@/features/movies'

export function HomePage() {
  const { loadPopularMovies } = useMovieSearch()
  
  const [showSearchSection, setShowSearchSection] = useState(false)

  const handleShowSearchSection = useCallback(() => {
    setShowSearchSection(true)
  }, [])

  const handleLoadPopularMovies = useCallback(() => {
    loadPopularMovies()
    setShowSearchSection(true)
  }, [loadPopularMovies])

  return (
    <>
      {/* Hero Section */}
      <HeroSectionContainer 
        onShowSearchSection={handleShowSearchSection}
        onLoadPopularMovies={handleLoadPopularMovies}
      />

      {/* Trending Section */}
      <TrendingContainer />

      {/* Top Rated Section */}
      <TopRatedContainer />
      
      {/* Search and Results Section */}
      <SearchResultsContainer 
        showSearchSection={showSearchSection} 
      />
    </>
  )
}