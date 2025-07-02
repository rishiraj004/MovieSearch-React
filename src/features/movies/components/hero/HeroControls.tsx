import { ChevronLeft, ChevronRight } from 'lucide-react'

import type { HeroControlsProps } from './HeroSectionTypes'

export function HeroControls({
  currentIndex,
  movies,
  onPrevMovie,
  onNextMovie,
  onMovieSelect,
}: HeroControlsProps) {
  if (movies.length <= 1) return null

  return (
    <>
      {/* Navigation Arrows */}
      <button
        onClick={onPrevMovie}
        aria-label="Previous movie"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 backdrop-blur-md hover:bg-black/80 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={onNextMovie}
        aria-label="Next movie"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 backdrop-blur-md hover:bg-black/80 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => onMovieSelect(index)}
            aria-label={`Go to movie ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </>
  )
}
