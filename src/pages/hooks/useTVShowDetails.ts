import { useEffect, useState } from 'react'

import { movieService } from '@/features/movies/services/movie.service'
import type {
  Credits,
  Review,
  TVShow,
  TVShowDetails,
  Video,
} from '@/features/movies/types/movie.types'

export function useTVShowDetails(id: string | undefined) {
  const [tvShow, setTvShow] = useState<TVShowDetails | null>(null)
  const [credits, setCredits] = useState<Credits | null>(null)
  const [recommendations, setRecommendations] = useState<TVShow[]>([])
  const [similarTVShows, setSimilarTVShows] = useState<TVShow[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [reviewsTotal, setReviewsTotal] = useState(0)
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setError('TV Show ID is required')
      setLoading(false)
      return
    }

    const fetchTVShowData = async () => {
      try {
        setLoading(true)
        setError(null)

        const tvShowId = parseInt(id, 10)
        if (isNaN(tvShowId)) {
          throw new Error('Invalid TV show ID')
        }

        const [
          tvShowDetails,
          tvShowCredits,
          tvShowRecommendations,
          tvShowSimilar,
          tvShowReviews,
          tvShowVideos,
        ] = await Promise.all([
          movieService.getTVShowDetails(tvShowId),
          movieService.getTVShowCredits(tvShowId),
          movieService.getTVShowRecommendations(tvShowId),
          movieService.getSimilarTVShows(tvShowId),
          movieService.getTVShowReviews(tvShowId),
          movieService.getTVShowVideos(tvShowId),
        ])

        setTvShow(tvShowDetails)
        setCredits(tvShowCredits)
        setRecommendations(tvShowRecommendations.results.slice(0, 10))
        setSimilarTVShows(tvShowSimilar.results.slice(0, 10))
        setReviews(tvShowReviews.results)
        setVideos(tvShowVideos.results)
        setReviewsTotal(tvShowReviews.total_results)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch TV show details'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchTVShowData()
  }, [id])

  return {
    tvShow,
    credits,
    recommendations,
    similarTVShows,
    reviews,
    reviewsTotal,
    videos,
    loading,
    error,
  }
}
