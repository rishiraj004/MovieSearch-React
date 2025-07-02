import type { Movie } from '../../types/movie.types'

export interface HeroSectionProps {
  onTrendingClick?: () => void
  onTopRatedClick?: () => void
  onGenresClick?: () => void
}

export interface HeroBackdropProps {
  movie: Movie
  isSliding: boolean
  slideIndex: number
  movies: Movie[]
}

export interface HeroControlsProps {
  currentIndex: number
  movies: Movie[]
  onPrevMovie: () => void
  onNextMovie: () => void
  onMovieSelect: (index: number) => void
}

export interface HeroContentProps {
  movie: Movie
  onTrailerClick: () => void
  onMoreInfoClick: () => void
}
