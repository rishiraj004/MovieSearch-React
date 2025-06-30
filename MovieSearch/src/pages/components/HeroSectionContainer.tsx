import { useCallback } from 'react'

import { HeroSection } from '@/features/movies'

interface HeroSectionContainerProps {
  onShowSearchSection: () => void
  onLoadPopularMovies: () => void
}

export function HeroSectionContainer({ onShowSearchSection, onLoadPopularMovies }: HeroSectionContainerProps) {
  const handleSearchClick = useCallback(() => {
    onShowSearchSection()
  }, [onShowSearchSection])

  const handleTrendingClick = useCallback(() => {
    // Scroll to trending section
    const trendingSection = document.getElementById('trending-section')
    if (trendingSection) {
      trendingSection.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const handleTopRatedClick = useCallback(() => {
    // Scroll to top-rated section
    const topRatedSection = document.getElementById('top-rated-section')
    if (topRatedSection) {
      topRatedSection.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const handleGenresClick = useCallback(() => {
    onLoadPopularMovies()
    onShowSearchSection()
  }, [onLoadPopularMovies, onShowSearchSection])

  return (
    <HeroSection 
      onSearchClick={handleSearchClick}
      onTrendingClick={handleTrendingClick}
      onTopRatedClick={handleTopRatedClick}
      onGenresClick={handleGenresClick}
    />
  )
}
