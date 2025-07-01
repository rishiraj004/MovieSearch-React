import { useState, useCallback, Suspense, lazy } from 'react'

import { useMovieSearch } from '@/features/movies'

// Lazy load the heavy container components
const SearchResultsContainer = lazy(() => import('./components/SearchResultsContainer').then(module => ({ default: module.SearchResultsContainer })))
const TrendingContainer = lazy(() => import('./components/TrendingContainer').then(module => ({ default: module.TrendingContainer })))
const TopRatedContainer = lazy(() => import('./components/TopRatedContainer').then(module => ({ default: module.TopRatedContainer })))
const HeroSectionContainer = lazy(() => import('./components/HeroSectionContainer').then(module => ({ default: module.HeroSectionContainer })))

// Simple loading component for sections
function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
    </div>
  )
}

export function HomePage() {
  const { loadPopularMovies } = useMovieSearch()
  
  const [showSearchSection, setShowSearchSection] = useState(false)

  const handleLoadPopularMovies = useCallback(() => {
    loadPopularMovies()
    setShowSearchSection(true)
  }, [loadPopularMovies])

  return (
    <>
      {/* Hero Section */}
      <Suspense fallback={<SectionLoader />}>
        <HeroSectionContainer 
          onLoadPopularMovies={handleLoadPopularMovies}
        />
      </Suspense>

      {/* Trending Section */}
      <Suspense fallback={<SectionLoader />}>
        <TrendingContainer />
      </Suspense>

      {/* Top Rated Section */}
      <Suspense fallback={<SectionLoader />}>
        <TopRatedContainer />
      </Suspense>
      
      {/* Search and Results Section */}
      <Suspense fallback={<SectionLoader />}>
        <SearchResultsContainer 
          showSearchSection={showSearchSection} 
        />
      </Suspense>
    </>
  )
}