import { useCallback, useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { LoadingSkeleton } from '@/features/movies/components/ui/LoadingSkeleton'
import { RatingBadge } from '@/features/movies/components/ui/RatingBadge'
import { ScrollNavigation } from '@/features/movies/components/ui/ScrollNavigation'
import { movieService } from '@/features/movies/services/movie.service'
import type { Movie } from '@/features/movies/types/movie.types'
import { getReleaseYear } from '@/features/movies/utils/dateUtils'
import { getImageUrl } from '@/features/movies/utils/imageUtils'

export function UpcomingContainer() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const scrollRef = useRef<HTMLDivElement | null>(null)
  
  // Scroll controls for horizontal navigation
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }
  
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }

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

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await movieService.getUpcomingMovies(1)
        setMovies(response.results)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch upcoming movies')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUpcomingMovies()
  }, [])

  const handleMovieClick = (movie: Movie) => {
    navigate(`/movie/${movie.id}`)
  }

  return (
    <section id="upcoming-section" className="py-8 bg-gray-900/80">
      <section className="py-2 px-2 max-w-11/12 mx-auto">
        <div className="mb-2">
          {/* Section Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white flex items-center gap-2 sm:gap-3">
              <span className="text-2xl sm:text-3xl md:text-4xl">🔜</span>
              Upcoming Movies
            </h2>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="relative">
              <div className="flex overflow-x-auto scrollbar-hide gap-4 pb-4">
                <LoadingSkeleton type="movie" count={6} />
              </div>
            </div>
          )}

          {/* Content */}
          {!isLoading && movies.length > 0 && (
            <div className="relative">
              <ScrollNavigation 
                onScrollLeft={scrollLeft}
                onScrollRight={scrollRight}
              />

              <div
                ref={handleScrollRef}
                className="flex overflow-x-auto scrollbar-hide gap-4 pb-4 scroll-smooth snap-x snap-mandatory"
              >
                {movies.map((movie) => (
                  <div key={movie.id} className="snap-start flex-shrink-0 trending-card-container">
                    <div
                      className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover-scale transition-transform duration-300 w-[140px] sm:w-[160px] animate-fadeInUp"
                      onClick={() => handleMovieClick(movie)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          handleMovieClick(movie)
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={`View details for ${movie.title}`}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={getImageUrl(movie.poster_path)}
                          alt={movie.title}
                          className="w-full h-[180px] sm:h-[200px] object-cover"
                          loading="lazy"
                        />
                        
                        <RatingBadge rating={movie.vote_average} />
                      </div>

                      <div className="p-2">
                        <h3 className="text-white font-semibold text-xs mb-1 line-clamp-1">
                          {movie.title}
                        </h3>
                        <p className="text-gray-400 text-xs">
                          {getReleaseYear(movie.release_date)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔜</div>
              <h3 className="text-xl text-gray-400 mb-2">
                Error loading upcoming movies
              </h3>
              <p className="text-red-400 text-lg">{error}</p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && movies.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔜</div>
              <h3 className="text-xl text-gray-400 mb-2">
                No upcoming movies found
              </h3>
              <p className="text-gray-500">Check back later for upcoming releases!</p>
            </div>
          )}
        </div>
      </section>
    </section>
  )
}