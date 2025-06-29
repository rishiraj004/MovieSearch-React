import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'

import type { Movie, TVShow, Person } from '../types/movie.types'

import { TrendingMovieCard } from './TrendingMovieCard'
import { TrendingPersonCard } from './TrendingPersonCard'
import { TrendingTVCard } from './TrendingTVCard'

interface TrendingSectionProps {
  title: string
  type: 'movie' | 'tv' | 'person'
  data: Movie[] | TVShow[] | Person[]
  isLoading?: boolean
  onItemClick?: (item: Movie | TVShow | Person) => void
}

export function TrendingSection({ title, type, data, isLoading = false, onItemClick }: TrendingSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

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

  const getIcon = () => {
    switch (type) {
      case 'movie': return '🎬'
      case 'tv': return '📺'
      case 'person': return '⭐'
      default: return '🎭'
    }
  }

  const renderCard = (item: Movie | TVShow | Person) => {
    const cardProps = {
      key: item.id,
      onClick: () => onItemClick?.(item)
    }

    switch (type) {
      case 'movie':
        return <TrendingMovieCard movie={item as Movie} {...cardProps} />
      case 'tv':
        return <TrendingTVCard tvShow={item as TVShow} {...cardProps} />
      case 'person':
        return <TrendingPersonCard person={item as Person} {...cardProps} />
      default:
        return null
    }
  }

  return (
    <motion.section
      className="mb-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-pink-400 flex items-center">
          <span className="mr-3 text-3xl">{getIcon()}</span>
          {title}
        </h2>
        
        {/* Navigation Arrows - Desktop Only */}
        <div className="hidden md:flex items-center space-x-2">
          <button
            onClick={scrollLeft}
            className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700 text-white transition-colors duration-200"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollRight}
            className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700 text-white transition-colors duration-200"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-400 border-t-transparent"></div>
        </div>
      ) : (
        <div className="relative group">
          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide gap-x-4 px-6 pb-4 scroll-smooth snap-x snap-mandatory"
          >
            {data.map((item) => (
              <div 
                key={item.id} 
                className="snap-start"
              >
                {renderCard(item)}
              </div>
            ))}
          </div>

          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#1a1a1a] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#1a1a1a] to-transparent pointer-events-none" />
        </div>
      )}

      {/* Empty State */}
      {!isLoading && data.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">{getIcon()}</div>
          <h3 className="text-xl text-gray-400 mb-2">No {type === 'person' ? 'people' : `${type} shows`} found</h3>
          <p className="text-gray-500">Check back later for trending content!</p>
        </div>
      )}
    </motion.section>
  )
}
