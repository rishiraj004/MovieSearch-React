import { Film, Tv, User } from 'lucide-react'

import type { SearchResultProps } from './SearchBarTypes'

import type { MultiSearchItem } from '@/features/movies/types/movie.types'
import {
  getImageUrl,
  getPersonImageUrl,
} from '@/features/movies/utils/imageUtils'

export function SearchResult({ item, onClick }: SearchResultProps) {
  const getItemIcon = (mediaType: string) => {
    switch (mediaType) {
      case 'movie':
        return <Film className="w-4 h-4 text-blue-400" />
      case 'tv':
        return <Tv className="w-4 h-4 text-green-400" />
      case 'person':
        return <User className="w-4 h-4 text-purple-400" />
      default:
        return null
    }
  }

  const getItemTitle = (item: MultiSearchItem) => {
    if (item.media_type === 'movie') return item.title
    if (item.media_type === 'tv') return item.name
    if (item.media_type === 'person') return item.name
    return 'Unknown'
  }

  const getItemSubtitle = (item: MultiSearchItem) => {
    if (item.media_type === 'movie')
      return item.release_date ? new Date(item.release_date).getFullYear() : ''
    if (item.media_type === 'tv')
      return item.first_air_date
        ? new Date(item.first_air_date).getFullYear()
        : ''
    if (item.media_type === 'person') return item.known_for_department
    return ''
  }

  const getItemImage = (item: MultiSearchItem) => {
    if (item.media_type === 'person') {
      return getPersonImageUrl(item.profile_path || null)
    }
    return getImageUrl(item.poster_path || null, 'W92')
  }

  return (
    <button
      key={`${item.media_type}-${item.id}`}
      className="flex items-center gap-3 p-3 bg-gray-800/80 hover:bg-gray-700/80 rounded-lg transition-all duration-200 text-left w-full group backdrop-blur-sm cursor-pointer"
      onClick={() => onClick(item)}
      type="button"
    >
      <img
        src={getItemImage(item)}
        alt={getItemTitle(item)}
        className="w-10 h-14 object-cover rounded-md bg-gray-700 flex-shrink-0 group-hover:shadow-lg transition-shadow"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          {getItemIcon(item.media_type)}
          <h3 className="text-white font-medium truncate group-hover:text-blue-300 transition-colors">
            {getItemTitle(item)}
          </h3>
        </div>
        <p className="text-gray-400 text-sm">{getItemSubtitle(item)}</p>
        {item.overview && (
          <p className="text-gray-500 text-xs mt-1 line-clamp-1">
            {item.overview}
          </p>
        )}
      </div>
    </button>
  )
}
