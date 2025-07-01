import { useCallback } from 'react'

import { HeroSection } from '@/features/movies'

interface HeroSectionContainerProps {
  onLoadPopularMovies: () => void
}

export function HeroSectionContainer({ onLoadPopularMovies }: HeroSectionContainerProps) {
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
  }, [onLoadPopularMovies])

  return (
    <HeroSection 
      onTrendingClick={handleTrendingClick}
      onTopRatedClick={handleTopRatedClick}
      onGenresClick={handleGenresClick}
    />
  )
}
