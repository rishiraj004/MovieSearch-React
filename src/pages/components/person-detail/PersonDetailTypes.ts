import type {
  Movie,
  PersonDetails,
  PersonImagesResponse,
  PersonMovieCredits,
  PersonTVCredits,
  TVShow,
} from '@/features/movies/types/movie.types'

export interface PersonHeroProps {
  person: PersonDetails
  profileImages: Array<{ file_path: string }>
  selectedImageIndex: number
  onImageSelect: (index: number) => void
  onBack: () => void
}

export interface PersonInfoProps {
  person: PersonDetails
}

export interface PersonCreditsProps {
  movieCredits: Movie[]
  tvCredits: TVShow[]
  onMovieClick: (movie: Movie) => void
  onTVShowClick: (tvShow: TVShow) => void
}

export interface PersonDetailData {
  person: PersonDetails | null
  movieCredits: PersonMovieCredits | null
  tvCredits: PersonTVCredits | null
  images: PersonImagesResponse | null
  loading: boolean
  error: string | null
  sortedMovieCredits: Movie[]
  sortedTVCredits: TVShow[]
  profileImages: Array<{ file_path: string }>
}
