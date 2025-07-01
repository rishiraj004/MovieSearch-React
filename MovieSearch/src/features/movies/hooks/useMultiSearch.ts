import { useCallback, useRef, useState } from 'react'

import { movieService } from '../services/movie.service'
import type { MultiSearchItem, MultiSearchResponse } from '../types/movie.types'

interface UseMultiSearchState {
  results: MultiSearchItem[]
  isLoading: boolean
  error: string | null
  query: string
  hasSearched: boolean
}

interface UseMultiSearchActions {
  search: (query: string) => Promise<void>
  debouncedSearch: (query: string) => void
  clearSearch: () => void
}

type UseMultiSearchReturn = UseMultiSearchState & UseMultiSearchActions

export function useMultiSearch(): UseMultiSearchReturn {
  const [state, setState] = useState<UseMultiSearchState>({
    results: [],
    isLoading: false,
    error: null,
    query: '',
    hasSearched: false,
  })

  const debounceRef = useRef<NodeJS.Timeout | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setState(prev => ({
        ...prev,
        results: [],
        error: null,
        query: '',
        hasSearched: false,
      }))
      return
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController()

    setState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
      query: query.trim(),
    }))

    try {
      console.log('Searching for:', query.trim())
      const response: MultiSearchResponse = await movieService.searchMulti({
        query: query.trim(),
        page: 1,
      })
      console.log('Search results:', response)

      setState(prev => ({
        ...prev,
        results: response.results.slice(0, 20), // Limit to 20 results for dropdown
        isLoading: false,
        hasSearched: true,
      }))
    } catch (error) {
      console.error('Search error:', error)
      
      if (error instanceof Error && error.name === 'AbortError') {
        // Request was cancelled, don't update state
        return
      }

      setState(prev => ({
        ...prev,
        results: [],
        isLoading: false,
        error: error instanceof Error ? error.message : 'Search failed',
        hasSearched: true,
      }))
    }
  }, [])

  const debouncedSearch = useCallback((query: string) => {
    // Clear previous timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    // Set new timeout
    debounceRef.current = setTimeout(() => {
      search(query)
    }, 300) // 300ms debounce
  }, [search])

  const clearSearch = useCallback(() => {
    // Clear any pending debounced search
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
      debounceRef.current = null
    }

    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }

    setState({
      results: [],
      isLoading: false,
      error: null,
      query: '',
      hasSearched: false,
    })
  }, [])

  return {
    ...state,
    search,
    debouncedSearch,
    clearSearch,
  }
}
