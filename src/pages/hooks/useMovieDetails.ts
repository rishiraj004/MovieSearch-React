import { useEffect, useState } from 'react'

import { movieService } from '@/features/movies/services/movie.service'
import type {
  CollectionDetails,
  Credits,
  Movie,
  MovieDetailsExtended,
  Review,
  Video,
} from '@/features/movies/types/movie.types'

export function useMovieDetails(id: string | undefined) {
  const [movie, setMovie] = useState<MovieDetailsExtended | null>(null)
  const [credits, setCredits] = useState<Credits | null>(null)
  const [recommendations, setRecommendations] = useState<Movie[]>([])
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [reviewsTotal, setReviewsTotal] = useState(0)
  const [videos, setVideos] = useState<Video[]>([])
  const [collection, setCollection] = useState<CollectionDetails | null>(null)
  const [loadingCollection, setLoadingCollection] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setError('Movie ID is required')
      setLoading(false)
      return
    }

    const fetchMovieData = async () => {
      try {
        setLoading(true)
        setError(null)
        // Reset collection state when fetching new movie data
        setCollection(null)
        setLoadingCollection(false)

        const movieId = parseInt(id, 10)
        if (isNaN(movieId)) {
          throw new Error('Invalid movie ID')
        }

        const [
          movieDetails,
          movieCredits,
          movieRecommendations,
          movieSimilar,
          movieReviews,
          movieVideos,
        ] = await Promise.all([
          movieService.getMovieDetailsExtended(movieId),
          movieService.getMovieCredits(movieId),
          movieService.getMovieRecommendations(movieId),
          movieService.getSimilarMovies(movieId),
          movieService.getMovieReviews(movieId),
          movieService.getMovieVideos(movieId),
        ])

        setMovie(movieDetails)
        setCredits(movieCredits)
        setRecommendations(movieRecommendations.results.slice(0, 10))
        setSimilarMovies(movieSimilar.results.slice(0, 10))
        setReviews(movieReviews.results)
        setVideos(movieVideos.results)
        setReviewsTotal(movieReviews.total_results)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch movie details'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchMovieData()
  }, [id])

  const fetchCollection = async () => {
    if (!movie?.belongs_to_collection) return

    try {
      setLoadingCollection(true)
      const collectionData = await movieService.getCollection(
        movie.belongs_to_collection.id
      )
      setCollection(collectionData)
    } catch {
      // Reset collection state on error
      setCollection(null)
      // In a production app, you might want to show a toast notification or error message
    } finally {
      setLoadingCollection(false)
    }
  }

  return {
    movie,
    credits,
    recommendations,
    similarMovies,
    reviews,
    reviewsTotal,
    videos,
    collection,
    loadingCollection,
    loading,
    error,
    fetchCollection,
  }
}
