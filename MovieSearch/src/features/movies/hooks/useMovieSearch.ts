import { useCallback, useState } from 'react'

import { movieService } from '../services/movie.service'
import type { Movie, MovieSearchResponse } from '../types/movie.types'

interface UseMovieSearchState {
  movies: Movie[]
  isLoading: boolean
  error: string | null
  totalPages: number
  currentPage: number
  query: string
}

interface UseMovieSearchActions {
  searchMovies: (query: string, page?: number) => Promise<void>
  loadNextPage: () => Promise<void>
  clearSearch: () => void
}

type UseMovieSearchReturn = UseMovieSearchState & UseMovieSearchActions

export function useMovieSearch(): UseMovieSearchReturn {
  const [state, setState] = useState<UseMovieSearchState>({
    movies: [],
    isLoading: false,
    error: null,
    totalPages: 0,
    currentPage: 1,
    query: '',
  })

  const searchMovies = useCallback(async (query: string, page = 1) => {
    if (!query.trim()) return

    setState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
      ...(page === 1 && { movies: [] }),
    }))

    try {
      const response: MovieSearchResponse = await movieService.searchMovies({
        query: query.trim(),
        page,
        include_adult: false, // Assuming we want to exclude adult content by default
      })

      setState(prev => ({
        ...prev,
        movies:
          page === 1 ? response.results : [...prev.movies, ...response.results],
        totalPages: response.total_pages,
        currentPage: page,
        query: query.trim(),
        isLoading: false,
      }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        error:
          error instanceof Error ? error.message : 'Failed to search movies',
        isLoading: false,
      }))
    }
  }, [])

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
    setState({
      movies: [],
      isLoading: false,
      error: null,
      totalPages: 0,
      currentPage: 1,
      query: '',
    })
  }, [])

  return {
    ...state,
    searchMovies,
    loadNextPage,
    clearSearch,
  }
}
