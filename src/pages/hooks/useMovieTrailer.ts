import type {
  MovieDetailsExtended,
  Video,
} from '@/features/movies/types/movie.types'

export function useMovieTrailer(
  videos: Video[],
  movie: MovieDetailsExtended | null
) {
  // Check if we have a trailer available
  const hasTrailer =
    videos.some(
      video =>
        (video.type === 'Trailer' || video.type === 'Teaser') &&
        video.site === 'YouTube'
    ) || movie?.homepage

  const handleTrailerClick = () => {
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
    } else if (movie?.homepage) {
      // Fallback to movie homepage if no videos available
      window.open(movie.homepage, '_blank')
    }
  }

  return {
    hasTrailer,
    handleTrailerClick,
  }
}
