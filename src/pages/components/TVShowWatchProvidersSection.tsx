import { WatchProviders } from '@/shared/components/watch-providers'

interface TVShowWatchProvidersSectionProps {
  tvShowId: number
}

export function TVShowWatchProvidersSection({ tvShowId }: TVShowWatchProvidersSectionProps) {
  return <WatchProviders id={tvShowId} type="tv" />
}
