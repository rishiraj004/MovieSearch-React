import type {
  Cast,
  CollectionDetails,
  Credits,
  Movie,
  MovieDetailsExtended,
} from '@/features/movies/types/movie.types'

export interface MovieHeroProps {
  movie: MovieDetailsExtended
  hasTrailer: boolean
  onBack: () => void
  onTrailerClick: () => void
}

export interface MovieOverviewProps {
  overview: string
}

export interface MovieCollectionSectionProps {
  movie: MovieDetailsExtended
  collection: CollectionDetails | null
  loadingCollection: boolean
  onFetchCollection: () => void
  onMovieClick: (movie: Movie) => void
}

export interface MovieCastSectionProps {
  cast: Cast[]
  credits: Credits | null
  onCastClick: (cast: Cast) => void
  onPersonClick: (person: { id: number }) => void
}

export interface MovieRecommendationsProps {
  recommendations: Movie[]
  similarMovies: Movie[]
  onMovieClick: (movie: Movie) => void
}

export interface ProductionCompaniesProps {
  companies: Array<{
    id: number
    logo_path: string | null
    name: string
  }>
}
