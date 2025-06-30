import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState } from 'react'

import type { Movie, TVShow, Person } from '../types/movie.types'

import { Button } from '@/shared/components/ui/button'

interface TrendingSectionProps {
  title: string
  type: 'movie' | 'tv' | 'person'
  data: Movie[] | TVShow[] | Person[]
  isLoading?: boolean
  onItemClick?: (item: Movie | TVShow | Person) => void
  onTimeWindowChange?: (timeWindow: 'day' | 'week') => Promise<void>
}

export function TrendingSection({ 
  title, 
  type, 
  data, 
  isLoading = false, 
  onItemClick, 
  onTimeWindowChange 
}: TrendingSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [timeWindow, setTimeWindow] = useState<'day' | 'week'>('day')

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' })
    }
  }

  const handleTimeWindowChange = async (newTimeWindow: 'day' | 'week') => {
    setTimeWindow(newTimeWindow)
    if (onTimeWindowChange) {
      await onTimeWindowChange(newTimeWindow)
    }
  }

  const getImageUrl = (path: string | null) => {
    if (!path) return '/placeholder-movie.jpg'
    return `https://image.tmdb.org/t/p/w154${path}`
  }

  const getPersonImageUrl = (path: string | null) => {
    if (!path) return '/placeholder-person.jpg'
    return `https://image.tmdb.org/t/p/w92${path}`
  }

  const renderMovieCard = (movie: Movie) => (
    <motion.div
      key={movie.id}
      className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 max-w-[154px]"
      onClick={() => onItemClick?.(movie)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <img
        src={getImageUrl(movie.poster_path)}
        alt={movie.title}
        className="w-[154px] h-[231px] object-cover"
      />
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-1 truncate">{movie.title}</h3>
        <p className="text-gray-400 text-sm">
          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
        </p>
        <div className="flex items-center mt-2">
          <span className="text-yellow-400">⭐</span>
          <span className="text-gray-300 text-sm ml-1">{movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
    </motion.div>
  )

  const renderTVCard = (tvShow: TVShow) => (
    <motion.div
      key={tvShow.id}
      className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 max-w-[154px]"
      onClick={() => onItemClick?.(tvShow)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <img
        src={getImageUrl(tvShow.poster_path)}
        alt={tvShow.name}
        className="w-[154px] h-[231px] object-cover"
      />
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-1 truncate">{tvShow.name}</h3>
        <p className="text-gray-400 text-sm">
          {tvShow.first_air_date ? new Date(tvShow.first_air_date).getFullYear() : 'N/A'}
        </p>
        <div className="flex items-center mt-2">
          <span className="text-yellow-400">⭐</span>
          <span className="text-gray-300 text-sm ml-1">{tvShow.vote_average.toFixed(1)}</span>
        </div>
      </div>
    </motion.div>
  )

  const renderPersonCard = (person: Person) => (
    <div className="flex flex-col items-center">
      <motion.div
        key={person.id}
        className="bg-gray-800 rounded-full overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 w-[92px] h-[92px] flex-shrink-0"
        onClick={() => onItemClick?.(person)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <img
          src={getPersonImageUrl(person.profile_path)}
          alt={person.name}
          className="w-full h-full object-cover"
        />
      </motion.div>
      <div className="mt-3 text-center max-w-[92px]">
        <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">{person.name}</h3>
      </div>
    </div>
  )

  const renderCard = (item: Movie | TVShow | Person) => {
    switch (type) {
      case 'movie':
        return renderMovieCard(item as Movie)
      case 'tv':
        return renderTVCard(item as TVShow)
      case 'person':
        return renderPersonCard(item as Person)
      default:
        return null
    }
  }

  return (
    <motion.section 
      className="py-2 px-2 max-w-11/12 mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white flex items-center gap-2 sm:gap-3">
          <span className="text-2xl sm:text-3xl md:text-4xl">
            {type === 'movie' ? '🎬' : type === 'tv' ? '📺' : '⭐'}
          </span>
          {title}
        </h2>
        
        {/* Time Window Toggle */}
        <div className="flex gap-2">
          <Button
            onClick={() => handleTimeWindowChange('day')}
            variant={timeWindow === 'day' ? 'secondary' : 'default'}
            size="sm"
          >
            Today
          </Button>
          <Button
            onClick={() => handleTimeWindowChange('week')}
            variant={timeWindow === 'week' ? 'secondary' : 'default'}
            size="sm"
          >
            This Week
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
            <p className="text-gray-400">Loading trending {type}s...</p>
          </div>
        </div>
      )}

      {/* Content */}
      {!isLoading && data.length > 0 && (
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={scrollLeft}
            className={`absolute left-0 z-10 bg-black/70 hover:bg-black/70 text-white p-2 rounded-full transition-colors ${
              type === 'person' 
                ? 'top-6' 
                : 'top-1/2 -translate-y-1/2'
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollRight}
            className={`absolute right-0 z-10 bg-black/70 hover:bg-black/70 text-white p-2 rounded-full transition-colors ${
              type === 'person' 
                ? 'top-6' 
                : 'top-1/2 -translate-y-1/2'
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>

          {/* Scrollable Content */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide gap-6 pb-4 scroll-smooth snap-x snap-mandatory"
            onWheel={(e) => {
              // Check if it's a vertical scroll
              if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                // It's a vertical scroll - let it go to the page
                e.stopPropagation()
                window.scrollBy(0, e.deltaY)
                e.preventDefault()
              }
              // Horizontal scroll is handled normally by the container
            }}
          >
            {data.map((item) => (
              <div key={item.id} className="snap-start flex-shrink-0 trending-card-container">
                {renderCard(item)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && data.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">
            {type === 'movie' ? '🎬' : type === 'tv' ? '📺' : '⭐'}
          </div>
          <h3 className="text-xl text-gray-400 mb-2">
            No {type === 'person' ? 'people' : `${type} shows`} found
          </h3>
          <p className="text-gray-500">Check back later for trending content!</p>
        </div>
      )}
    </motion.section>
  )
}
