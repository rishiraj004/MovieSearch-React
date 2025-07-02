import type { TVShowDetails } from '@/features/movies/types/movie.types'

export interface TVHeroProps {
  tvShow: TVShowDetails
  hasTrailer: boolean
  onBack: () => void
  onTrailerClick: () => void
}

export interface TVOverviewProps {
  overview: string
}

export interface TVNetworksProps {
  networks: TVShowDetails['networks']
  onNetworkClick: (networkId: number) => void
}
