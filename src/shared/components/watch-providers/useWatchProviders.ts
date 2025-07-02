import { useEffect, useState } from 'react'

import { movieService } from '@/features/movies/services/movie.service'
import type {
  Country,
  WatchProvidersResponse,
} from '@/features/movies/types/movie.types'

interface UseWatchProvidersProps {
  id: number
  type: 'movie' | 'tv'
}

export function useWatchProviders({ id, type }: UseWatchProvidersProps) {
  const [watchProviders, setWatchProviders] =
    useState<WatchProvidersResponse | null>(null)
  const [countries, setCountries] = useState<Country[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string>('IN') // Default to India
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const [providersData, countriesData] = await Promise.all([
          type === 'movie'
            ? movieService.getMovieWatchProviders(id)
            : movieService.getTVShowWatchProviders(id),
          movieService.getAvailableCountries(),
        ])

        setWatchProviders(providersData)
        setCountries(countriesData)
      } catch {
        // Silently handle error - component will show no providers available
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id, type])

  const currentCountryProviders = watchProviders?.results[selectedCountry]
  const selectedCountryName =
    countries.find(c => c.iso_3166_1 === selectedCountry)?.english_name ||
    selectedCountry

  const handleCountryChange = (countryCode: string) => {
    setSelectedCountry(countryCode)
  }

  return {
    watchProviders,
    countries,
    selectedCountry,
    selectedCountryName,
    currentCountryProviders,
    loading,
    handleCountryChange,
  }
}
