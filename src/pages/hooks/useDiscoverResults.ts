// useDiscoverResults.ts
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import type { MediaType } from '../components/discover/DiscoverPageTypes'

import { movieService } from '@/features/movies/services/movie.service'
import type {
  DiscoverMovieParams,
  DiscoverTVParams,
  Movie,
  TVShow,
} from '@/features/movies/types/movie.types'

export function useDiscoverResults(
  mediaType: MediaType,
  filters: DiscoverMovieParams | DiscoverTVParams,
  setTotalResults: (total: number) => void,
  setTotalPages: (pages: number) => void
) {
  const [searchParams] = useSearchParams()
  const [results, setResults] = useState<(Movie | TVShow)[]>([])
  const [isLoading, setIsLoading] = useState(false)

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
              page,
            })
          } else {
            response = await movieService.searchTVShows(query, page)
          }
        } else {
          // Discover mode
          const filterParams: Record<string, string | boolean> = {}

          // Add filters to params
          Object.entries(filters).forEach(([key, value]) => {
            if (
              value !== undefined &&
              value !== '' &&
              value !== false &&
              value !== null
            ) {
              // Convert value to string to ensure compatibility
              filterParams[key] =
                typeof value === 'boolean' ? value : String(value)
            }
          })

          if (mediaType === 'movie') {
            response = await movieService.discoverMovies({
              ...filterParams,
              page,
            })
          } else {
            response = await movieService.discoverTVShows({
              ...filterParams,
              page,
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
  }, [searchParams, mediaType, filters, setTotalPages, setTotalResults])

  return {
    results,
    isLoading,
  }
}
