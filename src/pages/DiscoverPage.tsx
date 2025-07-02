import { Filter as FilterIcon, Search, X, SlidersHorizontal, Home } from 'lucide-react'
import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { DiscoverSuggestions } from './components/discover/DiscoverSuggestions'
import { FilterBadge } from './components/discover/FilterBadge'
import { FilterPanel } from './components/discover/FilterPanel'
import { MediaGrid } from './components/discover/MediaGrid'

import { movieService } from '@/features/movies/services/movie.service'
import type { Movie, TVShow, DiscoverMovieParams, DiscoverTVParams, Genre } from '@/features/movies/types/movie.types'
import { useDebounce } from '@/shared/hooks/useDebounce'

type MediaType = 'movie' | 'tv'

// Custom CSS to hide the global search bar and back to home button
const hideGlobalSearchStyles = `
  /* Hide global search bar */
  .global-search-overlay {
    display: none !important;
  }
  
  /* Hide the global back to home button only on the discover page since we have our own */
  body:has(.discover-page) .discover-page-home-btn-container {
    display: none !important;
  }
`

export function DiscoverPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  
  // Apply the CSS to hide the global search bar
  useEffect(() => {
    // Create a style element
    const styleElement = document.createElement('style')
    styleElement.innerHTML = hideGlobalSearchStyles
    document.head.appendChild(styleElement)
    
    // Cleanup when component unmounts
    return () => {
      document.head.removeChild(styleElement)
    }
  }, [])
  
  // State for search and suggestions
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('query') || '')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<(Movie | TVShow)[]>([])
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false)
  
  // Media type (movies or TV shows)
  const [mediaType, setMediaType] = useState<MediaType>(
    (searchParams.get('type') as MediaType) || 'movie'
  )
  
  // Results and pagination
  const [results, setResults] = useState<(Movie | TVShow)[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [totalResults, setTotalResults] = useState(0)
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1', 10))
  const [totalPages, setTotalPages] = useState(0)
  
  // Filter visibility
  const [showFilters, setShowFilters] = useState(false)
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const filterDropdownRef = useRef<HTMLDivElement>(null)
  
  // Genre data
  const [movieGenres, setMovieGenres] = useState<Genre[]>([])
  const [tvGenres, setTvGenres] = useState<Genre[]>([])
  
  // Filter state
  const [filters, setFilters] = useState<DiscoverMovieParams | DiscoverTVParams>({
    with_genres: searchParams.get('with_genres') || '',
    sort_by: searchParams.get('sort_by') || 'popularity.desc',
    'vote_average.gte': searchParams.get('vote_average.gte') || '0',
    'vote_average.lte': searchParams.get('vote_average.lte') || '',
    'vote_count.gte': searchParams.get('vote_count.gte') || '',
    with_original_language: searchParams.get('with_original_language') || '',
    year: searchParams.get('year') || '',
    'primary_release_date.gte': searchParams.get('primary_release_date.gte') || '',
    'primary_release_date.lte': searchParams.get('primary_release_date.lte') || '',
    'first_air_date.gte': searchParams.get('first_air_date.gte') || '',
    'first_air_date.lte': searchParams.get('first_air_date.lte') || '',
    with_runtime: searchParams.get('with_runtime') || '',
    with_companies: searchParams.get('with_companies') || '',
    with_networks: searchParams.get('with_networks') || '',
    with_people: searchParams.get('with_people') || '',
    people_logic: (searchParams.get('people_logic') as 'and' | 'or') || 'and',
    include_adult: searchParams.get('include_adult') === 'true'
  })

  // References
  const searchInputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  
  // Debounced search query for suggestions
  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  // Load genres when component mounts
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const [movieGenresData, tvGenresData] = await Promise.all([
          movieService.getGenres('movie'),
          movieService.getGenres('tv')
        ])
        setMovieGenres(movieGenresData.genres)
        setTvGenres(tvGenresData.genres)
      } catch {
        // Set default empty arrays if genre fetch fails
        setMovieGenres([])
        setTvGenres([])
      }
    }

    fetchGenres()
  }, [])

  // Handle debounced search query changes for suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedSearchQuery.trim().length === 0) {
        setSuggestions([])
        setShowSuggestions(false)
        return
      }

      setIsFetchingSuggestions(true)
      try {
        let results: (Movie | TVShow)[] = []
        
        if (mediaType === 'movie') {
          const response = await movieService.searchMovies({
            query: debouncedSearchQuery,
            page: 1
          })
          results = response.results.slice(0, 5)
        } else {
          const response = await movieService.searchTVShows(debouncedSearchQuery, 1)
          results = response.results.slice(0, 5)
        }
        
        setSuggestions(results)
        setShowSuggestions(results.length > 0)
      } catch {
        setSuggestions([])
        setShowSuggestions(false)
      } finally {
        setIsFetchingSuggestions(false)
      }
    }

    if (debouncedSearchQuery) {
      fetchSuggestions()
    }
  }, [debouncedSearchQuery, mediaType])

  // Handle outside clicks to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }

      // Close filter dropdown when clicking outside
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target as Node) &&
        // Check if the click wasn't on the filter button (which we'll identify later)
        !(event.target as Element)?.closest('[data-filter-button="true"]')
      ) {
        setShowFilterDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setShowSuggestions, setShowFilterDropdown])

  // Handle search params changes
  useEffect(() => {
    // Update state based on URL params
    setMediaType((searchParams.get('type') as MediaType) || 'movie')
    setCurrentPage(parseInt(searchParams.get('page') || '1', 10))
    
    // Update filters based on URL params
    const newFilters: DiscoverMovieParams | DiscoverTVParams = {
      with_genres: searchParams.get('with_genres') || '',
      sort_by: searchParams.get('sort_by') || 'popularity.desc',
      'vote_average.gte': searchParams.get('vote_average.gte') || '0',
      'vote_average.lte': searchParams.get('vote_average.lte') || '',
      'vote_count.gte': searchParams.get('vote_count.gte') || '',
      with_original_language: searchParams.get('with_original_language') || '',
      year: searchParams.get('year') || '',
      'primary_release_date.gte': searchParams.get('primary_release_date.gte') || '',
      'primary_release_date.lte': searchParams.get('primary_release_date.lte') || '',
      'first_air_date.gte': searchParams.get('first_air_date.gte') || '',
      'first_air_date.lte': searchParams.get('first_air_date.lte') || '',
      with_runtime: searchParams.get('with_runtime') || '',
      with_companies: searchParams.get('with_companies') || '',
      with_networks: searchParams.get('with_networks') || '',
      with_people: searchParams.get('with_people') || '',
      people_logic: (searchParams.get('people_logic') as 'and' | 'or') || 'and',
      include_adult: searchParams.get('include_adult') === 'true'
    }
    
    setFilters(newFilters)
    
    // Set search query if present
    if (searchParams.get('query')) {
      setSearchQuery(searchParams.get('query') || '')
    }
    
  }, [searchParams])

  // Update results when params change
  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true)
      try {
        const query = searchParams.get('query')
        const page = parseInt(searchParams.get('page') || '1', 10)
        
        let response
        
        if (query && query.trim() !== '') {
          // Search mode
          if (mediaType === 'movie') {
            response = await movieService.searchMovies({
              query,
              page
            })
          } else {
            response = await movieService.searchTVShows(query, page)
          }
        } else {
          // Discover mode
          const filterParams: Record<string, string | boolean> = {}
          
          // Add filters to params
          Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== '' && value !== false && value !== null) {
              // Convert value to string to ensure compatibility
              filterParams[key] = typeof value === 'boolean' ? value : String(value)
            }
          })
          
          if (mediaType === 'movie') {
            response = await movieService.discoverMovies({
              ...filterParams,
              page
            })
          } else {
            response = await movieService.discoverTVShows({
              ...filterParams,
              page
            })
          }
        }
        
        setResults(response.results)
        setTotalResults(response.total_results)
        setTotalPages(response.total_pages)
      } catch {
        // Handle error silently or add proper error handling if needed
        setResults([])
        setTotalResults(0)
        setTotalPages(0)
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()
  }, [searchParams, mediaType, filters])

  // Handle filters change
  const handleFilterChange = useCallback((newFilters: Partial<DiscoverMovieParams | DiscoverTVParams>) => {
    // Create new params with existing values
    const newSearchParams = new URLSearchParams(searchParams)
    
    // Update params with new filter values
    let hasChanges = false;
    Object.entries(newFilters).forEach(([key, value]) => {
      const currentValue = searchParams.get(key);
      // Special handling for minimum rating: treat '0' as a valid value, not empty
      const isEmptyValue = value === false || value === undefined || (value === '' && key !== 'vote_average.gte');
      const newValue = isEmptyValue ? null : String(value);
      
      // Only update if there's an actual change
      if (currentValue !== newValue) {
        hasChanges = true;
        if (newValue === null) {
          // For minimum rating, set to '0' when clearing instead of removing
          if (key === 'vote_average.gte') {
            newSearchParams.set(key, '0');
          } else {
            newSearchParams.delete(key);
          }
        } else {
          newSearchParams.set(key, newValue);
        }
      }
    })
    
    // Only update if there are actual changes
    if (hasChanges) {
      // Reset to page 1 when filters change
      newSearchParams.set('page', '1')
      
      // Update URL
      setSearchParams(newSearchParams)
    }
  }, [searchParams, setSearchParams])

  // Handle search submission
  const handleSearch = useCallback((e?: React.FormEvent) => {
    if (e) {
      e.preventDefault()
    }
    
    const newSearchParams = new URLSearchParams(searchParams)
    
    if (searchQuery.trim() === '') {
      newSearchParams.delete('query')
    } else {
      newSearchParams.set('query', searchQuery)
    }
    
    newSearchParams.set('page', '1')
    setSearchParams(newSearchParams)
    setShowSuggestions(false)
  }, [searchParams, searchQuery, setSearchParams])

  // Handle media type change
  const handleMediaTypeChange = useCallback((type: MediaType) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('type', type)
    newSearchParams.set('page', '1')
    
    // Clear media-specific filters when switching types
    if (type === 'movie') {
      newSearchParams.delete('first_air_date.gte')
      newSearchParams.delete('first_air_date.lte')
      newSearchParams.delete('with_networks')
    } else {
      newSearchParams.delete('primary_release_date.gte')
      newSearchParams.delete('primary_release_date.lte')
    }
    
    setSearchParams(newSearchParams)
  }, [searchParams, setSearchParams])

  // Handle page change
  const handlePageChange = useCallback((page: number) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('page', page.toString())
    setSearchParams(newSearchParams)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [searchParams, setSearchParams])

  // Handle reset filters
  const handleResetFilters = useCallback(() => {
    const newSearchParams = new URLSearchParams()
    newSearchParams.set('type', mediaType)
    newSearchParams.set('page', '1')
    
    if (searchQuery) {
      newSearchParams.set('query', searchQuery)
    }
    
    setSearchParams(newSearchParams)
  }, [mediaType, searchQuery, setSearchParams])

  // Handle item click
  const handleItemClick = useCallback((item: Movie | TVShow) => {
    if ('title' in item) {
      // It's a movie
      navigate(`/movie/${item.id}`)
    } else {
      // It's a TV show
      navigate(`/tv/${item.id}`)
    }
  }, [navigate])

  // Get active filters for display
  const getActiveFilters = useCallback(() => {
    const activeFilters: { key: string; label: string; value: string }[] = []
    
    // Check each filter
    Object.entries(filters).forEach(([key, value]) => {
      // Special case for minimum rating - only show if greater than 0
      if (key === 'vote_average.gte' && value === '0') {
        return; // Skip showing this filter badge since it's the default
      }
      
      if (value !== '' && value !== false && value !== undefined && value !== null) {
        let label = key.replace('_', ' ')
        let displayValue = String(value)
        
        // Format filter labels
        switch (key) {
          case 'sort_by': {
            label = 'Sort'
            if (value) {
              displayValue = String(value).replace('.', ' ').replace('desc', '↓').replace('asc', '↑')
            }
            break
          }
          case 'with_genres': {
            label = 'Genres'
            if (value) {
              const genreList = mediaType === 'movie' ? movieGenres : tvGenres
              const genreIds = value.toString().split(',')
              displayValue = genreIds
                .map(id => genreList.find(g => g.id.toString() === id)?.name || id)
                .join(', ')
            }
            break
          }
          case 'vote_average.gte':
            label = 'Min Rating'
            displayValue = `${value}★`
            break
          case 'vote_average.lte':
            label = 'Max Rating'
            displayValue = `${value}★`
            break
          case 'vote_count.gte':
            label = 'Min Votes'
            break
          case 'with_original_language':
            label = 'Language'
            break
          case 'year':
            label = 'Year'
            break
          case 'primary_release_date.gte':
            label = 'Released After'
            break
          case 'primary_release_date.lte':
            label = 'Released Before'
            break
          case 'first_air_date.gte':
            label = 'Aired After'
            break
          case 'first_air_date.lte':
            label = 'Aired Before'
            break
          case 'with_people':
            label = 'People'
            displayValue = `${value.toString().split(',').length} selected`
            break
          case 'include_adult':
            label = 'Adult Content'
            displayValue = 'Included'
            break
        }
        
        activeFilters.push({
          key,
          label,
          value: displayValue
        })
      }
    })
    
    return activeFilters
  }, [filters, mediaType, movieGenres, tvGenres])

  // Get current genres based on media type
  const getCurrentGenres = useCallback(() => mediaType === 'movie' ? movieGenres : tvGenres, 
    [mediaType, movieGenres, tvGenres])

  // Filter Dropdown Component for quick filter selection
  const FilterDropdown = useCallback(({
    activeFilters,
    onToggleFilter,
    onResetFilters
  }: {
    activeFilters: { key: string; label: string; value: string }[]
    onToggleFilter: (key: string) => void
    onResetFilters: () => void
  }) => (
    <div className="absolute right-0 top-full mt-2 w-64 max-h-96 overflow-y-auto bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50 animate-fadeIn">
      <div className="p-3 border-b border-gray-700">
        <h3 className="text-sm font-medium text-gray-300">Quick Filters</h3>
      </div>

      <div className="p-2">
        {activeFilters.length > 0 ? (
          <div className="space-y-2">
            {activeFilters.map(filter => (
              <div key={filter.key} className="flex items-center justify-between py-1 px-2 hover:bg-gray-700 rounded-md">
                <div>
                  <p className="text-sm font-medium text-white">{filter.label}</p>
                  <p className="text-xs text-gray-400">{filter.value}</p>
                </div>
                <button
                  onClick={() => onToggleFilter(filter.key)}
                  className="text-gray-400 hover:text-white p-1"
                  aria-label={`Remove ${filter.label} filter`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              onClick={onResetFilters}
              className="w-full text-center text-sm text-blue-400 hover:text-blue-300 mt-3 py-1 border-t border-gray-700 pt-2"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <p className="text-sm text-gray-400 py-2 text-center">No active filters</p>
        )}
      </div>

      <div className="p-3 border-t border-gray-700">
        <button
          onClick={() => onToggleFilter('show_advanced')}
          className="w-full text-center text-sm text-blue-400 hover:text-blue-300 flex items-center justify-center gap-1"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Advanced Filter Panel</span>
        </button>
      </div>
    </div>
  ), [])

  return (
    <div className="discover-page min-h-screen bg-gray-900 text-white pb-12">
      {/* Style to hide global search bar */}
      <style>{hideGlobalSearchStyles}</style>
      
      {/* Header */}
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
                onClick={() => handleMediaTypeChange('movie')}
              >
                Movies
              </button>
              <button
                className={`px-5 py-2 font-medium ${
                  mediaType === 'tv'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => handleMediaTypeChange('tv')}
              >
                TV Shows
              </button>
            </div>
            
            {/* Search Form */}
            <div className="flex-1 relative">
              <form onSubmit={handleSearch} className="flex">
                <div className="relative flex-1">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder={`Search ${mediaType === 'movie' ? 'movies' : 'TV shows'}...`}
                    className="w-full bg-gray-700 border border-gray-600 rounded-l-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onFocus={() => {
                      if (searchQuery && suggestions.length > 0) {
                        setShowSuggestions(true)
                      }
                    }}
                  />
                  
                  {searchQuery && (
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      aria-label="Clear search"
                      onClick={() => {
                        setSearchQuery('')
                        if (searchParams.has('query')) {
                          const newSearchParams = new URLSearchParams(searchParams)
                          newSearchParams.delete('query')
                          setSearchParams(newSearchParams)
                        }
                      }}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                  
                  {/* Suggestions Dropdown */}
                  {showSuggestions && (
                    <DiscoverSuggestions 
                      ref={suggestionsRef}
                      suggestions={suggestions}
                      isLoading={isFetchingSuggestions}
                      onItemClick={(item: Movie | TVShow) => {
                        handleItemClick(item)
                        setShowSuggestions(false)
                      }}
                    />
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
                {getActiveFilters().length > 0 && (
                  <span className="bg-blue-700 text-white text-xs px-2 py-1 rounded-full">
                    {getActiveFilters().length}
                  </span>
                )}
              </button>

              {/* Filter Dropdown */}
              {showFilterDropdown && (
                <div ref={filterDropdownRef} className="p-1">
                  <FilterDropdown
                    activeFilters={getActiveFilters()}
                    onToggleFilter={(key) => {
                      if (key === 'show_advanced') {
                        setShowFilters(!showFilters);
                        setShowFilterDropdown(false);
                      } else {
                        handleFilterChange({ [key]: '' });
                        // Don't close the dropdown, let user continue removing filters if needed
                      }
                    }}
                    onResetFilters={() => {
                      handleResetFilters();
                      // Don't close dropdown after resetting filters
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Active Filters */}
      {getActiveFilters().length > 0 && (
        <div className="bg-gray-800/50 border-b border-gray-700 py-3 animate-fadeIn">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-gray-400 text-sm">Active filters:</span>
              {getActiveFilters().map(filter => (
                <FilterBadge
                  key={filter.key}
                  label={filter.label}
                  value={filter.value}
                  onRemove={() => {
                    handleFilterChange({ [filter.key]: '' })
                  }}
                />
              ))}
              <button
                onClick={handleResetFilters}
                className="text-sm text-blue-400 hover:text-blue-300 ml-2"
              >
                Reset all
              </button>
            </div>
          </div>
        </div>
      )}
      
      <main className="container mx-auto px-4 py-2">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Panel - Collapsible on mobile */}
          <div
            className={`${
              showFilters ? 'block' : 'hidden lg:block'
            } lg:w-72 xl:w-80 flex-shrink-0 animate-fadeIn`}
          >
            <FilterPanel
              mediaType={mediaType}
              filters={filters}
              genres={getCurrentGenres()}
              onFilterChange={handleFilterChange}
            />
          </div>
          
          {/* Results */}
          <div className="flex-1 animate-fadeIn">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-blue-500"></div>
                    Loading...
                  </span>
                ) : searchParams.has('query') ? (
                  `Results for "${searchParams.get('query')}" (${totalResults})`
                ) : (
                  `${totalResults} ${mediaType === 'movie' ? 'Movies' : 'TV Shows'} Found`
                )}
              </h2>
            </div>
            
            {/* Results Grid */}
            <MediaGrid
              items={results}
              isLoading={isLoading}
              mediaType={mediaType}
              onItemClick={handleItemClick}
            />
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <div className="flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === 1
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                    }`}
                  >
                    First
                  </button>
                  
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === 1
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                    }`}
                  >
                    Previous
                  </button>
                  
                  <div className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                    {currentPage} of {totalPages}
                  </div>
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === totalPages
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                    }`}
                  >
                    Next
                  </button>
                  
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === totalPages
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                    }`}
                  >
                    Last
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
