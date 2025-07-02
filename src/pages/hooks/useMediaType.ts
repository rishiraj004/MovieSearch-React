// useMediaType.ts
import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import type { MediaType } from '../components/discover/DiscoverPageTypes'

export function useMediaType() {
  const [searchParams, setSearchParams] = useSearchParams()

  // Media type (movies or TV shows)
  const [mediaType, setMediaType] = useState<MediaType>(
    (searchParams.get('type') as MediaType) || 'movie'
  )

  // Update media type when search params change
  useEffect(() => {
    setMediaType((searchParams.get('type') as MediaType) || 'movie')
  }, [searchParams])

  // Handle media type change
  const handleMediaTypeChange = useCallback(
    (type: MediaType) => {
      const newSearchParams = new URLSearchParams(searchParams)
      newSearchParams.set('type', type)
      newSearchParams.set('page', '1')

      // Clear media-specific filters when switching types
      if (type === 'movie') {
        newSearchParams.delete('first_air_date.gte')
        newSearchParams.delete('first_air_date.lte')
        newSearchParams.delete('with_networks')
      } else {
        newSearchParams.delete('primary_release_date.gte')
        newSearchParams.delete('primary_release_date.lte')
      }

      setSearchParams(newSearchParams)
    },
    [searchParams, setSearchParams]
  )

  return {
    mediaType,
    handleMediaTypeChange,
  }
}
