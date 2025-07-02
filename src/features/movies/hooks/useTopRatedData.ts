import { useState, useEffect } from 'react'

import { movieService } from '../services/movie.service'
import type { Movie, TVShow } from '../types/movie.types'

interface UseTopRatedDataParams {
  type: 'movie' | 'tv'
}

interface UseTopRatedDataReturn {
  data: (Movie | TVShow)[]
  loading: boolean
  error: string | null
}

export function useTopRatedData({ type }: UseTopRatedDataParams): UseTopRatedDataReturn {
  const [data, setData] = useState<(Movie | TVShow)[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTopRatedData = async () => {
      try {
        setLoading(true)
        setError(null)

        let response
        switch (type) {
          case 'movie':
            response = await movieService.getTopRatedMovies()
            break
          case 'tv':
            response = await movieService.getTopRatedTVShows()
            break
          default:
            throw new Error(`Unsupported type: ${type}`)
        }

        setData(response.results || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch top-rated data')
        setData([])
      } finally {
        setLoading(false)
      }
    }

    fetchTopRatedData()
  }, [type])

  return {
    data,
    loading,
    error
  }
}
