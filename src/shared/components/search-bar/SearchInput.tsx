import { Loader2, Search, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type { SearchBarProps } from './SearchBarTypes'
import { SearchResult } from './SearchResult'
import { getSizeClasses } from './searchUtils'

import { useMultiSearch } from '@/features/movies/hooks/useMultiSearch'
import type { MultiSearchItem } from '@/features/movies/types/movie.types'

export function SearchInput({
  className = '',
  placeholder = 'Search for movies, TV shows, or people...',
  size = 'md',
  onResultClick,
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const {
    results: searchResults,
    isLoading: isSearchLoading,
    error: searchError,
    debouncedSearch,
    clearSearch,
  } = useMultiSearch()

  const handleSearchFocus = () => {
    setIsSearchFocused(true)
    setShowResults(true)
  }

  const handleSearchBlur = () => {
    setIsSearchFocused(false)
    // Delay hiding results to allow for clicking on results
    setTimeout(() => setShowResults(false), 300)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    setShowResults(true)

    if (value.trim()) {
      // Clear any previous error before searching
      debouncedSearch(value)
    } else {
      clearSearch()
    }
  }

  const handleSearchResultClick = (item: MultiSearchItem) => {
    // Immediately hide results and clear search
    setShowResults(false)
    setSearchQuery('')
    clearSearch()

    // Call the optional callback (used by mobile overlay to close modal)
    onResultClick?.()

    // Navigate to the correct page
    if (item.media_type === 'movie') {
      navigate(`/movie/${item.id}`)
    } else if (item.media_type === 'tv') {
      navigate(`/tv/${item.id}`)
    } else if (item.media_type === 'person') {
      navigate(`/person/${item.id}`)
    }

    // Blur the input
    if (searchInputRef.current) {
      searchInputRef.current.blur()
    }
  }

  const sizeClasses = getSizeClasses(size)

  return (
    <div className={`relative ${sizeClasses.container} ${className}`}>
      <div
        className={`flex items-center bg-gray-800/50 rounded-xl border-2 transition-all duration-200 ${
          isSearchFocused
            ? 'border-blue-500 shadow-blue-500/20'
            : 'border-gray-600/50'
        }`}
      >
        <Search className={`text-gray-400 ${sizeClasses.icon}`} />
        <input
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
          placeholder={placeholder}
          className={`flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none ${sizeClasses.input}`}
        />
        {isSearchLoading && (
          <Loader2
            className={`text-blue-400 mr-4 animate-spin ${sizeClasses.clearIcon}`}
          />
        )}
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery('')
              setShowResults(false)
              clearSearch()
            }}
            className={`text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700 ${sizeClasses.clearButton}`}
            aria-label="Clear search"
          >
            <X className={sizeClasses.clearIcon} />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults &&
        (searchQuery || searchResults.length > 0 || searchError) && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto">
            <div className="p-4">
              {searchError && (
                <div className="text-center py-8">
                  <p className="text-red-400">{searchError}</p>
                  {searchError.includes('API key') && (
                    <p className="text-gray-400 text-sm mt-2">
                      Please check that your TMDB API key is set correctly in
                      the .env file.
                    </p>
                  )}
                </div>
              )}

              {!searchError &&
                !isSearchLoading &&
                searchQuery &&
                searchResults.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-400">
                      No results found for &ldquo;{searchQuery}&rdquo;
                    </p>
                  </div>
                )}

              {!searchError && searchResults.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-gray-400">
                      Found {searchResults.length} result
                      {searchResults.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  {searchResults.map(item => (
                    <SearchResult
                      key={`${item.media_type}-${item.id}`}
                      item={item}
                      onClick={handleSearchResultClick}
                    />
                  ))}
                </div>
              )}

              {!searchQuery && isSearchFocused && (
                <div className="text-center py-8">
                  <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">
                    Start typing to search for movies, TV shows, or people
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Up to 20 results will be shown
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
    </div>
  )
}
