import { Search, X, Film, Tv, User, Loader2 } from 'lucide-react'
import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { useMultiSearch } from '../hooks/useMultiSearch'
import type { MultiSearchItem } from '../types/movie.types'
import { getImageUrl, getPersonImageUrl } from '../utils/imageUtils'

interface SearchDropdownProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchDropdown({ isOpen, onClose }: SearchDropdownProps) {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  
  const { results, isLoading, error, debouncedSearch, clearSearch } = useMultiSearch()

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (query.trim()) {
      debouncedSearch(query)
    } else {
      clearSearch()
    }
  }, [query, debouncedSearch, clearSearch])

  const handleClose = useCallback(() => {
    setQuery('')
    clearSearch()
    setIsFocused(false)
    onClose()
  }, [clearSearch, onClose])

  const handleItemClick = (item: MultiSearchItem) => {
    if (item.media_type === 'movie') {
      navigate(`/movie/${item.id}`)
    } else if (item.media_type === 'tv') {
      navigate(`/tv/${item.id}`)
    } else if (item.media_type === 'person') {
      navigate(`/person/${item.id}`)
    }
    handleClose()
  }

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
    if (item.media_type === 'movie') return item.release_date ? new Date(item.release_date).getFullYear() : ''
    if (item.media_type === 'tv') return item.first_air_date ? new Date(item.first_air_date).getFullYear() : ''
    if (item.media_type === 'person') return item.known_for_department
    return ''
  }

  const getItemImage = (item: MultiSearchItem) => {
    if (item.media_type === 'person') {
      return getPersonImageUrl(item.profile_path || null)
    }
    return getImageUrl(item.poster_path || null, 'W92')
  }

  // Handle clicking outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !(event.target as Element).closest('.search-dropdown-container')) {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, handleClose])

  return (
    <div className="search-dropdown-container relative w-full max-w-2xl mx-auto">
      {isOpen && (
        <>
          {/* Expanded Search Input */}
          <div className="relative z-50 animate-fadeIn transition-all duration-200">
              <div className={`flex items-center bg-gray-800 rounded-xl border-2 shadow-2xl transition-all duration-200 ${
                isFocused ? 'border-blue-500 shadow-blue-500/20' : 'border-gray-600'
              }`}>
                <Search className="w-5 h-5 text-gray-400 ml-4" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Search for movies, TV shows, or people..."
                  className="flex-1 bg-transparent px-4 py-4 text-white placeholder-gray-400 focus:outline-none text-lg"
                />
                {isLoading && (
                  <Loader2 className="w-5 h-5 text-blue-400 mr-4 animate-spin" />
                )}
                <button
                  onClick={handleClose}
                  className="p-2 mr-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Results Dropdown */}
            {(query || results.length > 0 || error) && (
              <div
                className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-40 max-h-96 overflow-y-auto animate-fadeIn transition-all duration-200"
              >
                <div className="p-4">
                  {error && (
                    <div className="text-center py-8">
                      <p className="text-red-400">{error}</p>
                    </div>
                  )}

                  {!error && !isLoading && query && results.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-400">No results found for &ldquo;{query}&rdquo;</p>
                    </div>
                  )}

                  {!error && results.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm text-gray-400">
                          Found {results.length} result{results.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                      {results.map((item) => (
                        <button
                          key={`${item.media_type}-${item.id}`}
                          className="flex items-center gap-3 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-200 text-left w-full group hover:scale-[1.01] active:scale-[0.98] animate-slideInLeft"
                          onClick={() => handleItemClick(item)}
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
                            <p className="text-gray-400 text-sm">
                              {getItemSubtitle(item)}
                            </p>
                            {item.overview && (
                              <p className="text-gray-500 text-xs mt-1 line-clamp-1">
                                {item.overview}
                              </p>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {!query && (
                    <div className="text-center py-8">
                      <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400">Start typing to search for movies, TV shows, or people</p>
                      <p className="text-xs text-gray-500 mt-2">Up to 20 results will be shown</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
    </div>
  )
}
