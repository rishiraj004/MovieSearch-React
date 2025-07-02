import { useCallback } from 'react'

import type { TVShowDetails, Video } from '@/features/movies/types/movie.types'

export function useTVShowTrailer(
  videos: Video[],
  tvShow: TVShowDetails | null
) {
  // Check if we have a trailer available
  const hasTrailer =
    videos.some(
      video =>
        (video.type === 'Trailer' || video.type === 'Teaser') &&
        video.site === 'YouTube'
    ) || tvShow?.homepage

  const handleTrailerClick = useCallback(() => {
    // First, try to find an official trailer
    const officialTrailer = videos.find(
      video =>
        video.type === 'Trailer' &&
        video.official === true &&
        video.site === 'YouTube'
    )

    // If no official trailer, find any trailer
    const anyTrailer = videos.find(
      video => video.type === 'Trailer' && video.site === 'YouTube'
    )

    // If no trailer, find any video
    const anyVideo = videos.find(video => video.site === 'YouTube')

    const selectedVideo = officialTrailer || anyTrailer || anyVideo

    if (selectedVideo) {
      const videoUrl = `https://www.youtube.com/watch?v=${selectedVideo.key}`
      window.open(videoUrl, '_blank')
    } else if (tvShow?.homepage) {
      // Fallback to TV show homepage if no videos available
      window.open(tvShow.homepage, '_blank')
    }
  }, [videos, tvShow])

  return {
    hasTrailer,
    handleTrailerClick,
  }
}
