// useDiscoverSearch.ts
import { useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import type { MediaType } from '../components/discover/DiscoverPageTypes'

import { movieService } from '@/features/movies/services/movie.service'
import type { Movie, TVShow } from '@/features/movies/types/movie.types'
import { useDebounce } from '@/shared/hooks/useDebounce'

export function useDiscoverSearch(mediaType: MediaType) {
  const [searchParams, setSearchParams] = useSearchParams()

  // State for search and suggestions
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get('query') || ''
  )
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<(Movie | TVShow)[]>([])
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false)

  // References
  const searchInputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Debounced search query for suggestions
  const debouncedSearchQuery = useDebounce(searchQuery, 500)

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
            page: 1,
          })
          results = response.results.slice(0, 5)
        } else {
          const response = await movieService.searchTVShows(
            debouncedSearchQuery,
            1
          )
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

  // Handle search submission
  const handleSearch = useCallback(
    (e?: React.FormEvent) => {
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
    },
    [searchParams, searchQuery, setSearchParams]
  )

  return {
    searchQuery,
    setSearchQuery,
    showSuggestions,
    setShowSuggestions,
    suggestions,
    isFetchingSuggestions,
    searchInputRef,
    suggestionsRef,
    handleSearch,
  }
}
