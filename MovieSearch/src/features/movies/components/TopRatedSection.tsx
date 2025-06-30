import { useCallback } from 'react'

import { useHorizontalScroll } from '../hooks/useHorizontalScroll'
import { useTopRatedData } from '../hooks/useTopRatedData'
import type { Movie, TVShow } from '../types/movie.types'

import { TrendingMovieCard } from './TrendingMovieCard'
import { TrendingTVCard } from './TrendingTVCard'
import { LoadingSkeleton } from './ui/LoadingSkeleton'
import { ScrollNavigation } from './ui/ScrollNavigation'

interface TopRatedSectionProps {
  title: string
  type: 'movie' | 'tv'
  onItemClick?: (item: Movie | TVShow) => void
}

export function TopRatedSection({ title, type, onItemClick }: TopRatedSectionProps) {
  const { data, loading } = useTopRatedData({ type })
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

    // Add event listener with passive: false to allow preventDefault
    element.addEventListener('wheel', handleWheel, { passive: false })

    // Store cleanup function on the element
    const elementWithCleanup = element as HTMLDivElement & { _wheelCleanup?: () => void }
    elementWithCleanup._wheelCleanup = () => {
      element.removeEventListener('wheel', handleWheel)
    }
  }, [scrollRef])

  const renderCard = (item: Movie | TVShow) => {
    switch (type) {
      case 'movie':
        return <TrendingMovieCard key={item.id} movie={item as Movie} onClick={onItemClick} />
      case 'tv':
        return <TrendingTVCard key={item.id} tvShow={item as TVShow} onClick={onItemClick} />
      default:
        return null
    }
  }

  return (
    <section className="py-2 px-2 max-w-11/12 mx-auto">
      <div className="mb-2">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white flex items-center gap-2 sm:gap-3">
            <span className="text-2xl sm:text-3xl md:text-4xl">
              {type === 'movie' ? '🏆' : '📻'}
            </span>
            {title}
          </h2>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="relative">
            <div
              className="flex overflow-x-auto scrollbar-hide gap-4 pb-4"
            >
              <LoadingSkeleton type={type} count={6} />
            </div>
          </div>
        )}

        {/* Content */}
        {!loading && data.length > 0 && (
          <div className="relative">
            <ScrollNavigation 
              onScrollLeft={scrollLeft}
              onScrollRight={scrollRight}
            />

            <div
              ref={handleScrollRef}
              className="flex overflow-x-auto scrollbar-hide gap-4 pb-4 scroll-smooth snap-x snap-mandatory"
            >
              {data.map((item: Movie | TVShow) => (
                <div key={item.id} className="snap-start flex-shrink-0 trending-card-container">
                  {renderCard(item)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && data.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">
              {type === 'movie' ? '🏆' : '📻'}
            </div>
            <h3 className="text-xl text-gray-400 mb-2">
              No top-rated {type === 'movie' ? 'movies' : 'TV shows'} found
            </h3>
            <p className="text-gray-500">Check back later for top-rated content!</p>
          </div>
        )}
      </div>
    </section>
  )
}
