import { Play, ShoppingCart, Tv } from 'lucide-react'

import { CountryDropdown } from './CountryDropdown'
import { NoProviders } from './NoProviders'
import { ProviderGroup } from './ProviderGroup'
import { useWatchProviders } from './useWatchProviders'
import { WatchProvidersLoading } from './WatchProvidersLoading'

interface WatchProvidersProps {
  id: number
  type: 'movie' | 'tv'
}

export function WatchProviders({ id, type }: WatchProvidersProps) {
  const {
    countries,
    selectedCountry,
    selectedCountryName,
    currentCountryProviders,
    loading,
    handleCountryChange,
  } = useWatchProviders({ id, type })

  if (loading) {
    return <WatchProvidersLoading />
  }

  if (!currentCountryProviders) {
    return (
      <NoProviders
        selectedCountryName={selectedCountryName}
        countries={countries}
        selectedCountry={selectedCountry}
        onCountrySelect={handleCountryChange}
      />
    )
  }

  const hasAnyProviders = !!(
    currentCountryProviders.flatrate ||
    currentCountryProviders.rent ||
    currentCountryProviders.buy ||
    currentCountryProviders.ads
  )

  return (
    <section className="mb-8 sm:mb-12 animate-fadeIn">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold">Where to Watch</h2>

        <CountryDropdown
          countries={countries}
          selectedCountry={selectedCountry}
          selectedCountryName={selectedCountryName}
          onCountrySelect={handleCountryChange}
        />
      </div>

      <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
        <ProviderGroup
          providers={currentCountryProviders.flatrate || []}
          title="Stream"
          icon={<Play className="w-4 h-4 text-green-400" />}
          color="green"
        />

        <ProviderGroup
          providers={currentCountryProviders.rent || []}
          title="Rent"
          icon={<ShoppingCart className="w-4 h-4 text-blue-400" />}
          color="blue"
        />

        <ProviderGroup
          providers={currentCountryProviders.buy || []}
          title="Buy"
          icon={<ShoppingCart className="w-4 h-4 text-purple-400" />}
          color="purple"
        />

        <ProviderGroup
          providers={currentCountryProviders.ads || []}
          title="Free with Ads"
          icon={<Tv className="w-4 h-4 text-yellow-400" />}
          color="yellow"
        />

        {!hasAnyProviders && (
          <div className="text-center py-8">
            <Tv className="w-12 h-12 mx-auto mb-3 text-gray-500" />
            <p className="text-gray-400">
              No streaming options available in {selectedCountryName}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Try selecting a different country
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
