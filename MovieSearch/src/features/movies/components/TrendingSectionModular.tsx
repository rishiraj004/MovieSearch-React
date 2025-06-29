import { useHorizontalScroll } from '../hooks/useHorizontalScroll'
import { useTrendingData } from '../hooks/useTrendingData'
import type { Movie, TVShow, Person } from '../types/movie.types'

import { TrendingMovieCard } from './TrendingMovieCard'
import { TrendingPersonCard } from './TrendingPersonCard'
import { TrendingTVCard } from './TrendingTVCard'
import { LoadingSkeleton } from './ui/LoadingSkeleton'
import { ScrollNavigation } from './ui/ScrollNavigation'
import { SectionIcon } from './ui/SectionIcon'
import { TimeWindowToggle } from './ui/TimeWindowToggle'

interface TrendingSectionProps {
  title: string
  type: 'movie' | 'tv' | 'person'
}

export function TrendingSection({ title, type }: TrendingSectionProps) {
  const { data, loading, timeWindow, setTimeWindow } = useTrendingData({ type })
  const { scrollRef, scrollLeft, scrollRight, handleWheel } = useHorizontalScroll()

  const renderCard = (item: Movie | TVShow | Person) => {
    switch (type) {
      case 'movie':
        return <TrendingMovieCard key={item.id} movie={item as Movie} />
      case 'tv':
        return <TrendingTVCard key={item.id} tvShow={item as TVShow} />
      case 'person':
        return <TrendingPersonCard key={item.id} person={item as Person} />
      default:
        return null
    }
  }

  return (
    <section className="py-6 trending-section">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <SectionIcon type={type} />
            <h2 className="text-xl sm:text-2xl font-bold text-white">{title}</h2>
          </div>
          
          <TimeWindowToggle 
            timeWindow={timeWindow}
            onTimeWindowChange={setTimeWindow}
            disabled={loading}
          />
        </div>

        {/* Content */}
        <div className="relative">
          <ScrollNavigation 
            onScrollLeft={scrollLeft}
            onScrollRight={scrollRight}
          />

          <div
            ref={scrollRef}
            className="trending-horizontal-scroll scrollbar-hide flex gap-3 md:gap-4 px-10 py-4 overflow-x-auto overflow-y-hidden smooth-scroll"
            onWheel={handleWheel}
          >
            {loading ? (
              <LoadingSkeleton type={type} />
            ) : data.length > 0 ? (
              data.map((item) => (
                <div key={item.id} className="flex-shrink-0 trending-card">
                  {renderCard(item)}
                </div>
              ))
            ) : (
              <div className="flex-shrink-0 w-full text-center py-8">
                <p className="text-gray-400">No {type} data available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}