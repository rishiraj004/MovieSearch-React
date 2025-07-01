import { useState, useCallback, Suspense, lazy } from 'react'

import { useMovieSearch } from '@/features/movies'
import { Navbar } from '@/shared'

// Lazy load the heavy container components
const SearchResultsContainer = lazy(() => import('./components/SearchResultsContainer').then(module => ({ default: module.SearchResultsContainer })))
const TrendingContainer = lazy(() => import('./components/TrendingContainer').then(module => ({ default: module.TrendingContainer })))
const TopRatedContainer = lazy(() => import('./components/TopRatedContainer').then(module => ({ default: module.TopRatedContainer })))
const UpcomingContainer = lazy(() => import('./components/UpcomingContainer').then(module => ({ default: module.UpcomingContainer })))
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

  // Scroll to trending section
  const scrollToTrending = useCallback(() => {
    const trendingElement = document.getElementById('trending-section')
    if (trendingElement) {
      trendingElement.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  // Scroll to top rated section
  const scrollToTopRated = useCallback(() => {
    const topRatedElement = document.getElementById('top-rated-section')
    if (topRatedElement) {
      topRatedElement.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  // Scroll to upcoming section
  const scrollToUpcoming = useCallback(() => {
    const upcomingElement = document.getElementById('upcoming-section')
    if (upcomingElement) {
      upcomingElement.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <>
      {/* Navbar - positioned in top left */}
      <Navbar 
        onTrendingClick={scrollToTrending}
        onTopRatedClick={scrollToTopRated}
        onUpcomingClick={scrollToUpcoming}
      />

      {/* Hero Section */}
      <Suspense fallback={<SectionLoader />}>
        <HeroSectionContainer 
          onLoadPopularMovies={handleLoadPopularMovies}
        />
      </Suspense>

      {/* Trending Section */}
      <div id="trending-section">
        <Suspense fallback={<SectionLoader />}>
          <TrendingContainer />
        </Suspense>
      </div>

      {/* Top Rated Section */}
      <div id="top-rated-section">
        <Suspense fallback={<SectionLoader />}>
          <TopRatedContainer />
        </Suspense>
      </div>

      {/* Upcoming Section */}
      <div id="upcoming-section">
        <Suspense fallback={<SectionLoader />}>
          <UpcomingContainer />
        </Suspense>
      </div>

      {/* Search and Results Section */}
      <Suspense fallback={<SectionLoader />}>
        <SearchResultsContainer 
          showSearchSection={showSearchSection} 
        />
      </Suspense>
    </>
  )
}
