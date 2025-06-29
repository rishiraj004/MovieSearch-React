import { useState, useEffect, useCallback } from 'react'

import { movieService } from '../services/movie.service'
import type { Movie, TVShow, Person } from '../types/movie.types'

interface UseTrendingDataProps {
  type: 'movie' | 'tv' | 'person'
  initialTimeWindow?: 'day' | 'week'
}

interface UseTrendingDataReturn {
  data: (Movie | TVShow | Person)[]
  loading: boolean
  error: string | null
  timeWindow: 'day' | 'week'
  setTimeWindow: (timeWindow: 'day' | 'week') => void
  refetch: () => Promise<void>
}

export function useTrendingData({ 
  type, 
  initialTimeWindow = 'day' 
}: UseTrendingDataProps): UseTrendingDataReturn {
  const [data, setData] = useState<(Movie | TVShow | Person)[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeWindow, setTimeWindow] = useState<'day' | 'week'>(initialTimeWindow)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      let result
      switch (type) {
        case 'movie':
          result = await movieService.getTrendingMovies(timeWindow)
          break
        case 'tv':
          result = await movieService.getTrendingTVShows(timeWindow)
          break
        case 'person':
          result = await movieService.getTrendingPeople(timeWindow)
          break
        default:
          throw new Error(`Unsupported type: ${type}`)
      }
      setData(result?.results || [])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      setData([])
    } finally {
      setLoading(false)
    }
  }, [type, timeWindow])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    data,
    loading,
    error,
    timeWindow,
    setTimeWindow,
    refetch: fetchData
  }
}