import { Loader } from 'lucide-react'
import { forwardRef } from 'react'

import type { Movie, TVShow } from '@/features/movies/types/movie.types'
import { getImageUrl } from '@/features/movies/utils/imageUtils'

interface DiscoverSuggestionsProps {
  suggestions: (Movie | TVShow)[]
  isLoading: boolean
  onItemClick: (item: Movie | TVShow) => void
}

export const DiscoverSuggestions = forwardRef<HTMLDivElement, DiscoverSuggestionsProps>(
  ({ suggestions, isLoading, onItemClick }, ref) => (
    <div 
      ref={ref}
      className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
    >
      {isLoading ? (
        <div className="flex items-center justify-center py-4">
          <Loader className="w-5 h-5 text-blue-400 animate-spin" />
          <span className="ml-2 text-gray-400">Searching...</span>
        </div>
      ) : suggestions.length === 0 ? (
        <div className="text-gray-400 text-center py-4">
          No results found
        </div>
      ) : (
        <ul>
          {suggestions.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className="w-full text-left px-3 py-2 hover:bg-gray-700 flex items-center gap-3 transition-colors"
                onClick={() => onItemClick(item)}
              >
                <div className="w-10 h-14 flex-shrink-0">
                  <img
                    src={getImageUrl(item.poster_path)}
                    alt={'title' in item ? item.title : item.name}
                    className="w-full h-full object-cover rounded"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="font-medium text-white truncate">
                    {'title' in item ? item.title : item.name}
                  </div>
                  <div className="text-sm text-gray-400">
                    {('release_date' in item && item.release_date) 
                      ? new Date(item.release_date).getFullYear() 
                      : ('first_air_date' in item && item.first_air_date)
                        ? new Date(item.first_air_date).getFullYear()
                        : 'Unknown year'}
                  </div>
                </div>
                <div className="flex-shrink-0 ml-2">
                  <div className="inline-flex items-center bg-gray-700 px-2 py-1 rounded-full text-xs">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span>{item.vote_average?.toFixed(1) || 'N/A'}</span>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
)

DiscoverSuggestions.displayName = 'DiscoverSuggestions'
