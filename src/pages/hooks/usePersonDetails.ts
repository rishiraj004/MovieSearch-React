import { useEffect, useState } from 'react'

import { movieService } from '@/features/movies/services/movie.service'
import type {
  Movie,
  PersonDetails,
  PersonImagesResponse,
  PersonMovieCredits,
  PersonTVCredits,
  TVShow,
} from '@/features/movies/types/movie.types'

export function usePersonDetails(id: string | undefined) {
  const [person, setPerson] = useState<PersonDetails | null>(null)
  const [movieCredits, setMovieCredits] = useState<PersonMovieCredits | null>(
    null
  )
  const [tvCredits, setTVCredits] = useState<PersonTVCredits | null>(null)
  const [images, setImages] = useState<PersonImagesResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setError('Person ID is required')
      setLoading(false)
      return
    }

    const fetchPersonData = async () => {
      try {
        setLoading(true)
        setError(null)

        const personId = parseInt(id, 10)
        if (isNaN(personId)) {
          throw new Error('Invalid person ID')
        }

        const [
          personDetails,
          personMovieCredits,
          personTVCredits,
          personImages,
        ] = await Promise.all([
          movieService.getPersonDetails(personId),
          movieService.getPersonMovieCredits(personId),
          movieService.getPersonTVCredits(personId),
          movieService.getPersonImages(personId),
        ])

        setPerson(personDetails)
        setMovieCredits(personMovieCredits)
        setTVCredits(personTVCredits)
        setImages(personImages)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load person details'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchPersonData()
  }, [id])

  // Process and sort credits
  const sortedMovieCredits: Movie[] =
    movieCredits?.cast
      .filter(credit => credit.release_date)
      .sort(
        (a, b) =>
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime()
      )
      .slice(0, 20)
      .map(
        credit =>
          ({
            id: credit.id,
            title: credit.title,
            overview: credit.overview,
            poster_path: credit.poster_path,
            backdrop_path: credit.backdrop_path,
            release_date: credit.release_date,
            vote_average: credit.vote_average,
            vote_count: credit.vote_count,
            genre_ids: credit.genre_ids,
            adult: credit.adult,
            original_language: credit.original_language,
            original_title: credit.original_title,
            popularity: credit.popularity,
            video: credit.video,
          }) as Movie
      ) || []

  const sortedTVCredits: TVShow[] =
    tvCredits?.cast
      .filter(credit => credit.first_air_date)
      .sort(
        (a, b) =>
          new Date(b.first_air_date).getTime() -
          new Date(a.first_air_date).getTime()
      )
      .slice(0, 20)
      .map(
        credit =>
          ({
            id: credit.id,
            name: credit.name,
            overview: credit.overview,
            poster_path: credit.poster_path,
            backdrop_path: credit.backdrop_path,
            first_air_date: credit.first_air_date,
            vote_average: credit.vote_average,
            vote_count: credit.vote_count,
            genre_ids: credit.genre_ids,
            adult: credit.adult,
            original_language: credit.original_language,
            original_name: credit.original_name,
            popularity: credit.popularity,
            origin_country: credit.origin_country,
          }) as TVShow
      ) || []

  const profileImages = images?.profiles.slice(0, 10) || []

  return {
    person,
    movieCredits,
    tvCredits,
    images,
    loading,
    error,
    sortedMovieCredits,
    sortedTVCredits,
    profileImages,
  }
}
