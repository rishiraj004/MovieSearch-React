import { Search, X, Film, Tv, User, Loader2 } from 'lucide-react'
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { useMultiSearch } from '@/features/movies/hooks/useMultiSearch'
import type { MultiSearchItem } from '@/features/movies/types/movie.types'
import { getImageUrl, getPersonImageUrl } from '@/features/movies/utils/imageUtils'

interface SearchBarProps {
  className?: string
  placeholder?: string
  size?: 'sm' | 'md' | 'lg'
  onResultClick?: () => void
}

function SearchInput({ 
  className = '', 
  placeholder = 'Search for movies, TV shows, or people...',
  size = 'md',
  onResultClick
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  
  const { results: searchResults, isLoading: isSearchLoading, error: searchError, debouncedSearch, clearSearch } = useMultiSearch()

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

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'w-[70vw] sm:w-80 max-w-sm',
          input: 'px-3 py-2 text-sm',
          icon: 'w-4 h-4 ml-3',
          clearButton: 'p-1 mr-1',
          clearIcon: 'w-4 h-4'
        }
      case 'lg':
        return {
          container: 'w-[85vw] sm:w-full sm:min-w-96 sm:max-w-5xl max-w-lg',
          input: 'px-3 py-3 sm:px-5 sm:py-4 text-base sm:text-lg',
          icon: 'w-5 h-5 sm:w-6 sm:h-6 ml-3 sm:ml-4',
          clearButton: 'p-1.5 sm:p-2 mr-1.5 sm:mr-2',
          clearIcon: 'w-5 h-5 sm:w-6 sm:h-6'
        }
      default: // md
        return {
          container: 'w-[80vw] sm:w-full sm:min-w-96 sm:max-w-5xl max-w-md',
          input: 'px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base',
          icon: 'w-4 h-4 sm:w-5 sm:h-5 ml-3 sm:ml-4',
          clearButton: 'p-1.5 sm:p-2 mr-1.5 sm:mr-2',
          clearIcon: 'w-4 h-4 sm:w-5 sm:h-5'
        }
    }
  }

  const sizeClasses = getSizeClasses()

  return (
    <div className={`relative ${sizeClasses.container} ${className}`}>
      <div className={`flex items-center bg-gray-800/50 rounded-xl border-2 transition-all duration-200 ${
        isSearchFocused ? 'border-blue-500 shadow-blue-500/20' : 'border-gray-600/50'
      }`}>
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
          <Loader2 className={`text-blue-400 mr-4 animate-spin ${sizeClasses.clearIcon}`} />
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
      {showResults && (searchQuery || searchResults.length > 0 || searchError) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto">
          <div className="p-4">
            {searchError && (
              <div className="text-center py-8">
                <p className="text-red-400">{searchError}</p>
                {searchError.includes('API key') && (
                  <p className="text-gray-400 text-sm mt-2">
                    Please check that your TMDB API key is set correctly in the .env file.
                  </p>
                )}
              </div>
            )}

            {!searchError && !isSearchLoading && searchQuery && searchResults.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-400">No results found for &ldquo;{searchQuery}&rdquo;</p>
              </div>
            )}

            {!searchError && searchResults.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-gray-400">
                    Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                  </p>
                </div>
                {searchResults.map((item) => (
                  <button
                    key={`${item.media_type}-${item.id}`}
                    className="flex items-center gap-3 p-3 bg-gray-800/80 hover:bg-gray-700/80 rounded-lg transition-all duration-200 text-left w-full group backdrop-blur-sm cursor-pointer"
                    onClick={() => handleSearchResultClick(item)}
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

            {!searchQuery && isSearchFocused && (
              <div className="text-center py-8">
                <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Start typing to search for movies, TV shows, or people</p>
                <p className="text-xs text-gray-500 mt-2">Up to 20 results will be shown</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// Main SearchBar component with overlay functionality
export function SearchBar() {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)

  return (
    <>
      {/* Mobile Search - Full Screen Overlay */}
      {isMobileSearchOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-gray-900/95 backdrop-blur-md p-3 sm:p-4 global-search-overlay">
          <div className="w-full max-w-sm sm:max-w-md mx-auto">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h2 className="text-white text-base sm:text-lg font-semibold">Search</h2>
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="text-gray-400 hover:text-white transition-colors rounded-lg p-2"
                aria-label="Close search"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
            <SearchInput 
              size="lg" 
              className="w-full"
              placeholder="Search for movies, TV shows, or people..."
              onResultClick={() => setIsMobileSearchOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Search Bar Overlay - Top Right */}
      <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-30 global-search-overlay">
        {/* Mobile Search Icon - show on small and medium screens */}
        <button
          onClick={() => setIsMobileSearchOpen(true)}
          aria-label="Search movies"
          className="lg:hidden bg-black/40 backdrop-blur-md rounded-lg p-2.5 sm:p-3 text-white/80 hover:text-white transition-colors border border-white/10 cursor-pointer"
        >
          <Search className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        
        {/* Desktop Search Bar - only show on large screens */}
        <div className="hidden lg:block">
          <SearchInput 
            size="md"
            className="bg-black/30 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl"
            placeholder="Search for movies, TV shows, or people..."
          />
        </div>
      </div>
    </>
  )
}
