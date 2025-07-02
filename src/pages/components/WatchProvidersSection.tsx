import { WatchProviders } from '@/shared/components/watch-providers'

interface WatchProvidersSectionProps {
  movieId: number
}

export function WatchProvidersSection({ movieId }: WatchProvidersSectionProps) {
  return <WatchProviders id={movieId} type="movie" />
}
