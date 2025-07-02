import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { ActiveFilters } from './components/discover/ActiveFilters'
import { DiscoverHeader } from './components/discover/DiscoverHeader'
import { DiscoverSuggestions } from './components/discover/DiscoverSuggestions'
import { FilterPanel } from './components/discover/FilterPanel'
import { ResultsSection } from './components/discover/ResultsSection'
import { useDiscoverFilters } from './hooks/useDiscoverFilters'
import { useDiscoverPagination } from './hooks/useDiscoverPagination'
import { useDiscoverResults } from './hooks/useDiscoverResults'
import { useDiscoverSearch } from './hooks/useDiscoverSearch'
import { useMediaType } from './hooks/useMediaType'

import { movieService } from '@/features/movies/services/movie.service'
import type {
  DiscoverMovieParams,
  DiscoverTVParams,
  Genre,
  Movie,
  TVShow,
} from '@/features/movies/types/movie.types'

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

  // Filter visibility
  const [showFilters, setShowFilters] = useState(false)
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const filterDropdownRef = useRef<HTMLDivElement>(null)

  // Genre data
  const [movieGenres, setMovieGenres] = useState<Genre[]>([])
  const [tvGenres, setTvGenres] = useState<Genre[]>([])

  // Custom hooks
  const { mediaType, handleMediaTypeChange } = useMediaType()
  const {
    currentPage,
    totalPages,
    totalResults,
    setTotalPages,
    setTotalResults,
    handlePageChange,
  } = useDiscoverPagination()

  const {
    searchQuery,
    setSearchQuery,
    showSuggestions,
    setShowSuggestions,
    suggestions,
    isFetchingSuggestions,
    searchInputRef,
    suggestionsRef,
    handleSearch,
  } = useDiscoverSearch(mediaType)

  // Filter state
  const [filters, setFilters] = useState<
    DiscoverMovieParams | DiscoverTVParams
  >({
    with_genres: searchParams.get('with_genres') || '',
    sort_by: searchParams.get('sort_by') || 'popularity.desc',
    'vote_average.gte': searchParams.get('vote_average.gte') || '0',
    'vote_average.lte': searchParams.get('vote_average.lte') || '',
    'vote_count.gte': searchParams.get('vote_count.gte') || '',
    with_original_language: searchParams.get('with_original_language') || '',
    year: searchParams.get('year') || '',
    'primary_release_date.gte':
      searchParams.get('primary_release_date.gte') || '',
    'primary_release_date.lte':
      searchParams.get('primary_release_date.lte') || '',
    'first_air_date.gte': searchParams.get('first_air_date.gte') || '',
    'first_air_date.lte': searchParams.get('first_air_date.lte') || '',
    with_runtime: searchParams.get('with_runtime') || '',
    with_companies: searchParams.get('with_companies') || '',
    with_networks: searchParams.get('with_networks') || '',
    with_people: searchParams.get('with_people') || '',
    people_logic: (searchParams.get('people_logic') as 'and' | 'or') || 'and',
    include_adult: searchParams.get('include_adult') === 'true',
  })

  const { handleFilterChange, handleResetFilters, getActiveFilters } =
    useDiscoverFilters(mediaType, movieGenres, tvGenres)

  const { results, isLoading } = useDiscoverResults(
    mediaType,
    filters,
    setTotalResults,
    setTotalPages
  )

  // Load genres when component mounts
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const [movieGenresData, tvGenresData] = await Promise.all([
          movieService.getGenres('movie'),
          movieService.getGenres('tv'),
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
  }, [
    setShowSuggestions,
    setShowFilterDropdown,
    searchInputRef,
    suggestionsRef,
  ])

  // Handle search params changes
  useEffect(() => {
    // Update filters based on URL params
    const newFilters: DiscoverMovieParams | DiscoverTVParams = {
      with_genres: searchParams.get('with_genres') || '',
      sort_by: searchParams.get('sort_by') || 'popularity.desc',
      'vote_average.gte': searchParams.get('vote_average.gte') || '0',
      'vote_average.lte': searchParams.get('vote_average.lte') || '',
      'vote_count.gte': searchParams.get('vote_count.gte') || '',
      with_original_language: searchParams.get('with_original_language') || '',
      year: searchParams.get('year') || '',
      'primary_release_date.gte':
        searchParams.get('primary_release_date.gte') || '',
      'primary_release_date.lte':
        searchParams.get('primary_release_date.lte') || '',
      'first_air_date.gte': searchParams.get('first_air_date.gte') || '',
      'first_air_date.lte': searchParams.get('first_air_date.lte') || '',
      with_runtime: searchParams.get('with_runtime') || '',
      with_companies: searchParams.get('with_companies') || '',
      with_networks: searchParams.get('with_networks') || '',
      with_people: searchParams.get('with_people') || '',
      people_logic: (searchParams.get('people_logic') as 'and' | 'or') || 'and',
      include_adult: searchParams.get('include_adult') === 'true',
    }

    setFilters(newFilters)
  }, [searchParams])

  // Handle item click
  const handleItemClick = (item: Movie | TVShow) => {
    if ('title' in item) {
      // It's a movie
      navigate(`/movie/${item.id}`)
    } else {
      // It's a TV show
      navigate(`/tv/${item.id}`)
    }
  }

  // Handle clear search
  const handleClearSearch = () => {
    setSearchQuery('')
    if (searchParams.has('query')) {
      const newSearchParams = new URLSearchParams(searchParams)
      newSearchParams.delete('query')
      setSearchParams(newSearchParams)
    }
  }

  // Get current genres based on media type
  const getCurrentGenres = () =>
    mediaType === 'movie' ? movieGenres : tvGenres

  // Get active filters
  const activeFilters = getActiveFilters(filters)

  return (
    <div className="discover-page min-h-screen bg-gray-900 text-white pb-12">
      {/* Style to hide global search bar */}
      <style>{hideGlobalSearchStyles}</style>

      {/* Header */}
      <DiscoverHeader
        mediaType={mediaType}
        onMediaTypeChange={handleMediaTypeChange}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
        searchInputRef={searchInputRef}
        suggestionsRef={suggestionsRef}
        filterDropdownRef={filterDropdownRef}
        showFilterDropdown={showFilterDropdown}
        setShowFilterDropdown={setShowFilterDropdown}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        activeFilters={activeFilters}
        onToggleFilter={key => handleFilterChange({ [key]: '' })}
        onResetFilters={handleResetFilters}
        handleClearSearch={handleClearSearch}
      />

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

      {/* Active Filters */}
      <ActiveFilters
        activeFilters={activeFilters}
        onFilterRemove={key => handleFilterChange({ [key]: '' })}
        onResetFilters={handleResetFilters}
      />

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
          <ResultsSection
            mediaType={mediaType}
            results={results}
            isLoading={isLoading}
            totalResults={totalResults}
            currentPage={currentPage}
            totalPages={totalPages}
            onItemClick={handleItemClick}
            onPageChange={handlePageChange}
            searchQuery={searchParams.get('query')}
          />
        </div>
      </main>
    </div>
  )
}
