import { motion } from 'framer-motion'
import { useCallback } from 'react'

import { MovieCard } from './MovieCard'

import { ScrollNavigation } from '@/features/movies/components/ui/ScrollNavigation'
import { useHorizontalScroll } from '@/features/movies/hooks/useHorizontalScroll'
import type { Movie } from '@/features/movies/types/movie.types'

interface HorizontalMovieSectionProps {
  title: string
  movies: Movie[]
  onMovieClick: (movie: Movie) => void
  delay?: number
}

export function HorizontalMovieSection({ 
  title, 
  movies, 
  onMovieClick, 
  delay = 0.8 
}: HorizontalMovieSectionProps) {
  const { scrollRef, scrollLeft, scrollRight } = useHorizontalScroll()

  // Handle wheel events using ref callback with proper cleanup
  const handleScrollRef = useCallback((element: HTMLDivElement | null) => {
    // Cleanup previous element if any
    if (scrollRef.current) {
      const currentElement = scrollRef.current as HTMLDivElement & { _wheelCleanup?: () => void }
      if (currentElement._wheelCleanup) {
        currentElement._wheelCleanup()
      }
    }

    // Set the ref for the horizontal scroll hook
    scrollRef.current = element

    if (!element) return

    const handleWheel = (e: WheelEvent) => {
      // Check if it's a vertical scroll
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        // It's a vertical scroll - let it go to the page
        e.stopPropagation()
        window.scrollBy(0, e.deltaY)
        e.preventDefault()
      }
      // Horizontal scroll is handled normally by the container
    }

    element.addEventListener('wheel', handleWheel, { passive: false })

    // Store cleanup function on the element
    ;(element as HTMLDivElement & { _wheelCleanup?: () => void })._wheelCleanup = () => {
      element.removeEventListener('wheel', handleWheel)
    }
  }, [scrollRef])

  if (movies.length === 0) {
    return null
  }

  return (
    <motion.section
      className="mb-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <h2 className="text-3xl font-bold mb-6">{title}</h2>
      
      <div className="relative">
        <ScrollNavigation 
          onScrollLeft={scrollLeft}
          onScrollRight={scrollRight}
        />

        <div
          ref={handleScrollRef}
          className="flex overflow-x-auto scrollbar-hide gap-6 pb-4 scroll-smooth snap-x snap-mandatory"
        >
          {movies.map((movie) => (
            <div key={movie.id} className="snap-start flex-shrink-0 w-48">
              <MovieCard
                movie={movie}
                onClick={onMovieClick}
              />
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
