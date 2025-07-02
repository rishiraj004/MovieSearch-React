// DiscoverHeader.tsx
import {
  Filter as FilterIcon,
  Home,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import type { ActiveFilter, MediaType } from './DiscoverPageTypes'
import { FilterDropdown } from './FilterDropdown'

interface DiscoverHeaderProps {
  mediaType: MediaType
  onMediaTypeChange: (type: MediaType) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  onSearch: (e?: React.FormEvent) => void
  searchInputRef: React.RefObject<HTMLInputElement | null>
  suggestionsRef: React.RefObject<HTMLDivElement | null>
  filterDropdownRef: React.RefObject<HTMLDivElement | null>
  showFilterDropdown: boolean
  setShowFilterDropdown: (show: boolean) => void
  showFilters: boolean
  setShowFilters: (show: boolean) => void
  activeFilters: ActiveFilter[]
  onToggleFilter: (key: string) => void
  onResetFilters: () => void
  handleClearSearch: () => void
}

export function DiscoverHeader({
  mediaType,
  onMediaTypeChange,
  searchQuery,
  setSearchQuery,
  onSearch,
  searchInputRef,
  suggestionsRef,
  filterDropdownRef,
  showFilterDropdown,
  setShowFilterDropdown,
  showFilters,
  setShowFilters,
  activeFilters,
  onToggleFilter,
  onResetFilters,
  handleClearSearch,
}: DiscoverHeaderProps) {
  const navigate = useNavigate()

  return (
    <header className="bg-gray-800 border-b border-gray-700 py-3 animate-fadeIn relative">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FilterIcon className="w-7 h-7 text-blue-400" />
            Discover {mediaType === 'movie' ? 'Movies' : 'TV Shows'}
          </h1>

          {/* Custom Back to Home Button for DiscoverPage */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center p-2 bg-blue-600/85 hover:bg-blue-700 rounded-lg text-white transition-colors backdrop-blur-sm"
            aria-label="Back to home"
          >
            <Home className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Media Type Tabs */}
          <div className="flex rounded-lg overflow-hidden border border-gray-600">
            <button
              className={`px-5 py-2 font-medium ${
                mediaType === 'movie'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => onMediaTypeChange('movie')}
            >
              Movies
            </button>
            <button
              className={`px-5 py-2 font-medium ${
                mediaType === 'tv'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => onMediaTypeChange('tv')}
            >
              TV Shows
            </button>
          </div>

          {/* Search Form */}
          <div className="flex-1 relative">
            <form onSubmit={onSearch} className="flex">
              <div className="relative flex-1">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder={`Search ${mediaType === 'movie' ? 'movies' : 'TV shows'}...`}
                  className="w-full bg-gray-700 border border-gray-600 rounded-l-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onFocus={() => {
                    if (searchQuery && suggestionsRef.current) {
                      suggestionsRef.current.style.display = 'block'
                    }
                  }}
                />

                {searchQuery && (
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    aria-label="Clear search"
                    onClick={handleClearSearch}
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-r-lg flex items-center justify-center transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Filter Toggle Button */}
          <div className="relative">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                showFilters || showFilterDropdown
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
              }`}
              aria-label="Toggle filters"
              title="Toggle filters"
              data-filter-button="true"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span className="hidden sm:inline">Filters</span>
              {activeFilters.length > 0 && (
                <span className="bg-blue-700 text-white text-xs px-2 py-1 rounded-full">
                  {activeFilters.length}
                </span>
              )}
            </button>

            {/* Filter Dropdown */}
            {showFilterDropdown && (
              <div ref={filterDropdownRef} className="p-1">
                <FilterDropdown
                  activeFilters={activeFilters}
                  onToggleFilter={key => {
                    if (key === 'show_advanced') {
                      setShowFilters(!showFilters)
                      setShowFilterDropdown(false)
                    } else {
                      onToggleFilter(key)
                      // Don't close the dropdown, let user continue removing filters if needed
                    }
                  }}
                  onResetFilters={onResetFilters}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
