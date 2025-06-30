import { motion } from 'framer-motion'
import { Film } from 'lucide-react'
import { useCallback } from 'react'

import { VideoCard } from './VideoCard'

import { ScrollNavigation } from '@/features/movies/components/ui/ScrollNavigation'
import { useHorizontalScroll } from '@/features/movies/hooks/useHorizontalScroll'
import type { Video } from '@/features/movies/types/movie.types'

interface VideosSectionProps {
  videos: Video[]
  onVideoClick?: (video: Video) => void
}

export function VideosSection({ videos, onVideoClick }: VideosSectionProps) {
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

  // Filter and sort videos - prioritize trailers and official videos
  const sortedVideos = videos
    .filter(video => video.site === 'YouTube') // Only show YouTube videos for consistency
    .sort((a, b) => {
      // Prioritize official videos
      if (a.official && !b.official) return -1
      if (!a.official && b.official) return 1
      
      // Then prioritize by type
      const typeOrder = ['Trailer', 'Teaser', 'Clip', 'Featurette', 'Behind the Scenes']
      const aIndex = typeOrder.indexOf(a.type)
      const bIndex = typeOrder.indexOf(b.type)
      
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex
      }
      if (aIndex !== -1) return -1
      if (bIndex !== -1) return 1
      
      return 0
    })
    .slice(0, 10) // Limit to 10 videos for performance

  if (sortedVideos.length === 0) {
    return null
  }

  return (
    <motion.section
      className="mb-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <Film className="w-8 h-8 text-blue-400" />
        <h2 className="text-3xl font-bold">Videos & Trailers</h2>
        <span className="bg-blue-600 text-white text-sm px-2 py-1 rounded-full font-medium">
          {sortedVideos.length}
        </span>
      </div>
      
      <div className="relative">
        <ScrollNavigation 
          onScrollLeft={scrollLeft}
          onScrollRight={scrollRight}
        />

        <div
          ref={handleScrollRef}
          className="flex overflow-x-auto scrollbar-hide gap-6 pb-4 scroll-smooth snap-x snap-mandatory"
        >
          {sortedVideos.map((video) => (
            <div key={video.id} className="snap-start flex-shrink-0 w-80">
              <VideoCard
                video={video}
                onVideoClick={onVideoClick}
              />
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
