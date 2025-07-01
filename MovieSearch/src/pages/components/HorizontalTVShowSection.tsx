import { useCallback } from 'react'

import { TVShowCard } from './TVShowCard'

import { ScrollNavigation } from '@/features/movies/components/ui/ScrollNavigation'
import { useHorizontalScroll } from '@/features/movies/hooks/useHorizontalScroll'
import type { TVShow } from '@/features/movies/types/movie.types'

interface HorizontalTVShowSectionProps {
  title: string
  tvShows: TVShow[]
  onTVShowClick: (tvShow: TVShow) => void
  delay?: number
}

export function HorizontalTVShowSection({ 
  title, 
  tvShows, 
  onTVShowClick
}: HorizontalTVShowSectionProps) {
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

  if (tvShows.length === 0) {
    return null
  }

  return (
    <section
      className="mb-12 animate-fadeInUp"
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
          {tvShows.map((tvShow) => (
            <div key={tvShow.id} className="snap-start flex-shrink-0 w-48">
              <TVShowCard
                tvShow={tvShow}
                onClick={onTVShowClick}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
