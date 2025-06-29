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
    return `https://image.tmdb.org/t/p/w500${path}`
  }

  const renderMovieCard = (movie: Movie) => (
    <motion.div
      key={movie.id}
      className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 min-w-[280px]"
      onClick={() => onItemClick?.(movie)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <img
        src={getImageUrl(movie.poster_path)}
        alt={movie.title}
        className="w-full h-[400px] object-cover"
      />
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">{movie.title}</h3>
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
      className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 min-w-[280px]"
      onClick={() => onItemClick?.(tvShow)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <img
        src={getImageUrl(tvShow.poster_path)}
        alt={tvShow.name}
        className="w-full h-[400px] object-cover"
      />
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">{tvShow.name}</h3>
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
    <motion.div
      key={person.id}
      className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 min-w-[280px]"
      onClick={() => onItemClick?.(person)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <img
        src={getImageUrl(person.profile_path)}
        alt={person.name}
        className="w-full h-[400px] object-cover"
      />
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">{person.name}</h3>
        <p className="text-gray-400 text-sm">{person.known_for_department}</p>
        <div className="flex items-center mt-2">
          <span className="text-yellow-400">⭐</span>
          <span className="text-gray-300 text-sm ml-1">{person.popularity.toFixed(1)}</span>
        </div>
      </div>
    </motion.div>
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
      className="py-12 px-4 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white">{title}</h2>
        
        {/* Time Window Toggle */}
        <div className="flex gap-2">
          <Button
            onClick={() => handleTimeWindowChange('day')}
            variant={timeWindow === 'day' ? 'default' : 'outline'}
            size="sm"
          >
            Today
          </Button>
          <Button
            onClick={() => handleTimeWindowChange('week')}
            variant={timeWindow === 'week' ? 'default' : 'outline'}
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
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>

          {/* Scrollable Content */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide gap-6 pb-4 scroll-smooth snap-x snap-mandatory"
          >
            {data.map((item) => (
              <div key={item.id} className="snap-start flex-shrink-0">
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
