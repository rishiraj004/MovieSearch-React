import { HeroBackdrop } from './HeroBackdrop'
import { HeroContent } from './HeroContent'
import { HeroControls } from './HeroControls'
import type { HeroSectionProps } from './HeroSectionTypes'
import { useHero } from './useHero'

export function HeroSection(_props: HeroSectionProps) {
  const {
    movies,
    currentMovie,
    currentIndex,
    slideIndex,
    isSliding,
    isLoading,
    error,
    setIsPaused,
    heroRef,
    nextMovie,
    prevMovie,
    goToMovie,
    handleTrailerClick,
    handleMoreInfoClick,
  } = useHero()

  if (isLoading) {
    return (
      <div className="relative w-full h-screen bg-gradient-to-r from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (error || !currentMovie) {
    return (
      <div className="relative w-full h-screen bg-gradient-to-r from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-red-400 text-xl">
          {error || 'No movies available'}
        </div>
      </div>
    )
  }

  return (
    <div
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Images */}
      <HeroBackdrop
        movie={currentMovie}
        isSliding={isSliding}
        slideIndex={slideIndex}
        movies={movies}
      />

      {/* Hero Content */}
      <HeroContent
        movie={currentMovie}
        onTrailerClick={handleTrailerClick}
        onMoreInfoClick={handleMoreInfoClick}
      />

      {/* Navigation Controls */}
      <HeroControls
        currentIndex={currentIndex}
        movies={movies}
        onPrevMovie={prevMovie}
        onNextMovie={nextMovie}
        onMovieSelect={goToMovie}
      />
    </div>
  )
}
