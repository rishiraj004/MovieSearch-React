import { Film, Tv } from 'lucide-react'

import type { Movie, TVShow } from '@/features/movies/types/movie.types'
import { getImageUrl } from '@/features/movies/utils/imageUtils'

interface MediaGridProps {
  items: (Movie | TVShow)[]
  isLoading: boolean
  mediaType: 'movie' | 'tv'
  onItemClick: (item: Movie | TVShow) => void
}

export function MediaGrid({ items, isLoading, mediaType, onItemClick }: MediaGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {Array.from({ length: 18 }).map((_, index) => (
          <div key={index} className="bg-gray-800 rounded-lg overflow-hidden animate-pulse">
            <div className="bg-gray-700 h-64 w-full" />
            <div className="p-3">
              <div className="h-4 bg-gray-700 rounded mb-2 w-3/4" />
              <div className="h-3 bg-gray-700 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-800/50 rounded-xl">
        <div className="text-5xl mb-4">
          {mediaType === 'movie' ? <Film className="mx-auto" /> : <Tv className="mx-auto" />}
        </div>
        <h3 className="text-xl text-gray-300 mb-2">No results found</h3>
        <p className="text-gray-400">Try adjusting your filters or search query</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {items.map((item) => (
        <div 
          key={item.id} 
          className="bg-gray-800 rounded-lg overflow-hidden hover-scale transition-all duration-300 cursor-pointer animate-fadeIn"
          onClick={() => onItemClick(item)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onItemClick(item)
            }
          }}
        >
          <div className="relative">
            <img
              src={getImageUrl(item.poster_path)}
              alt={'title' in item ? item.title : item.name}
              className="w-full h-64 object-cover"
              loading="lazy"
            />
            <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-yellow-400 px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
              <span>★</span>
              {item.vote_average?.toFixed(1) || 'N/A'}
            </div>
          </div>
          <div className="p-3">
            <h3 className="text-white font-medium text-sm line-clamp-2">
              {'title' in item ? item.title : item.name}
            </h3>
            <p className="text-gray-400 text-xs mt-1">
              {('release_date' in item && item.release_date) 
                ? new Date(item.release_date).getFullYear() 
                : ('first_air_date' in item && item.first_air_date)
                  ? new Date(item.first_air_date).getFullYear()
                  : 'Unknown year'}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
