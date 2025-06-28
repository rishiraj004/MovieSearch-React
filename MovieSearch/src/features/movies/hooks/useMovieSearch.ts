import { useCallback, useEffect, useRef, useState } from 'react'

import { movieService } from '../services/movie.service'
import type { Movie, MovieSearchResponse } from '../types/movie.types'

interface UseMovieSearchState {
  movies: Movie[]
  isLoading: boolean
  isInternalLoading?: boolean
  error: string | null
  totalPages: number
  currentPage: number
  query: string
  hasSearched: boolean
}

interface UseMovieSearchActions {
  searchMovies: (query: string, page?: number) => Promise<void>
  loadNextPage: () => Promise<void>
  clearSearch: () => void
  debouncedSearch: (query: string) => void
}

type UseMovieSearchReturn = UseMovieSearchState & UseMovieSearchActions

export function useMovieSearch(): UseMovieSearchReturn {
  const [state, setState] = useState<UseMovieSearchState>({
    movies: [],
    isLoading: false,
    isInternalLoading: false,
    error: null,
    totalPages: 0,
    currentPage: 1,
    query: '',
    hasSearched: false,
  })

  const debounceRef = useRef<NodeJS.Timeout | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const searchMovies = useCallback(async (query: string, page = 1, isInternalLoading = false) => {
    if (!query.trim()) return

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    abortControllerRef.current = new AbortController()
    
    if (!isInternalLoading) {
      setState(prev => ({
        ...prev,
        isLoading: true,
        error: null,
        hasSearched: true,
        ...(page === 1 && { movies: [] }),
      }))
    }
    
    try {
      const response: MovieSearchResponse = await movieService.searchMovies({
        query: query.trim(),
        page,
        include_adult: false,
      })

      // Check if request was aborted
      if (abortControllerRef.current?.signal.aborted) {
        return
      }

      setState(prev => ({
        ...prev,
        movies:
          page === 1 ? response.results : [...prev.movies, ...response.results],
        totalPages: response.total_pages,
        currentPage: page,
        query: query.trim(),
        isLoading: false,
        hasSearched: true, // Ensure hasSearched is set for debounced searches
      }))
    } catch (error) {
      // Don't update state if request was aborted
      if (abortControllerRef.current?.signal.aborted) {
        return
      }

      setState(prev => ({
        ...prev,
        error:
          error instanceof Error ? error.message : 'Failed to search movies',
        isLoading: false,
      }))
    }
  }, [])

  const debouncedSearch = useCallback((query: string) => {
    // Clear previous timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    // Only set up the debounced call - don't make immediate API call
    if (query.trim()) {
      debounceRef.current = setTimeout(() => {
        searchMovies(query.trim(), 1, true)
      }, 300) // 300ms debounce
    }
  }, [searchMovies])

  const loadNextPage = useCallback(async () => {
    if (
      state.currentPage < state.totalPages &&
      !state.isLoading &&
      state.query
    ) {
      await searchMovies(state.query, state.currentPage + 1)
    }
  }, [
    state.currentPage,
    state.totalPages,
    state.isLoading,
    state.query,
    searchMovies,
  ])

  const clearSearch = useCallback(() => {
    // Cancel any pending requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    
    // Clear debounce timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    setState({
      movies: [],
      isLoading: false,
      error: null,
      totalPages: 0,
      currentPage: 1,
      query: '',
      hasSearched: false,
    })
  }, [])

  // Cleanup on unmount
  useEffect(() => () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
  }, [])

  return {
    ...state,
    searchMovies,
    loadNextPage,
    clearSearch,
    debouncedSearch,
  }
}
