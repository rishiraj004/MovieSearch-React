// useDiscoverFilters.ts
import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

import type {
  ActiveFilter,
  MediaType,
} from '../components/discover/DiscoverPageTypes'

import type {
  DiscoverMovieParams,
  DiscoverTVParams,
  Genre,
} from '@/features/movies/types/movie.types'

export function useDiscoverFilters(
  mediaType: MediaType,
  movieGenres: Genre[],
  tvGenres: Genre[]
) {
  const [searchParams, setSearchParams] = useSearchParams()

  // Handle filters change
  const handleFilterChange = useCallback(
    (newFilters: Partial<DiscoverMovieParams | DiscoverTVParams>) => {
      // Create new params with existing values
      const newSearchParams = new URLSearchParams(searchParams)

      // Update params with new filter values
      let hasChanges = false
      Object.entries(newFilters).forEach(([key, value]) => {
        const currentValue = searchParams.get(key)
        // Special handling for minimum rating: treat '0' as a valid value, not empty
        const isEmptyValue =
          value === false ||
          value === undefined ||
          (value === '' && key !== 'vote_average.gte')
        const newValue = isEmptyValue ? null : String(value)

        // Only update if there's an actual change
        if (currentValue !== newValue) {
          hasChanges = true
          if (newValue === null) {
            // For minimum rating, set to '0' when clearing instead of removing
            if (key === 'vote_average.gte') {
              newSearchParams.set(key, '0')
            } else {
              newSearchParams.delete(key)
            }
          } else {
            newSearchParams.set(key, newValue)
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
    },
    [searchParams, setSearchParams]
  )

  // Handle reset filters
  const handleResetFilters = useCallback(() => {
    const newSearchParams = new URLSearchParams()
    newSearchParams.set('type', mediaType)
    newSearchParams.set('page', '1')

    if (searchParams.get('query')) {
      newSearchParams.set('query', searchParams.get('query')!)
    }

    setSearchParams(newSearchParams)
  }, [mediaType, searchParams, setSearchParams])

  // Get active filters for display
  const getActiveFilters = useCallback(
    (filters: DiscoverMovieParams | DiscoverTVParams): ActiveFilter[] => {
      const activeFilters: ActiveFilter[] = []

      // Check each filter
      Object.entries(filters).forEach(([key, value]) => {
        // Special case for minimum rating - only show if greater than 0
        if (key === 'vote_average.gte' && value === '0') {
          return // Skip showing this filter badge since it's the default
        }

        if (
          value !== '' &&
          value !== false &&
          value !== undefined &&
          value !== null
        ) {
          let label = key.replace('_', ' ')
          let displayValue = String(value)

          // Format filter labels
          switch (key) {
            case 'sort_by': {
              label = 'Sort'
              if (value) {
                displayValue = String(value)
                  .replace('.', ' ')
                  .replace('desc', '↓')
                  .replace('asc', '↑')
              }
              break
            }
            case 'with_genres': {
              label = 'Genres'
              if (value) {
                const genreList = mediaType === 'movie' ? movieGenres : tvGenres
                const genreIds = value.toString().split(',')
                displayValue = genreIds
                  .map(
                    id =>
                      genreList.find(g => g.id.toString() === id)?.name || id
                  )
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
            value: displayValue,
          })
        }
      })

      return activeFilters
    },
    [mediaType, movieGenres, tvGenres]
  )

  return {
    handleFilterChange,
    handleResetFilters,
    getActiveFilters,
  }
}
