import type { TVNetworksProps } from './TVShowDetailTypes'

import { getImageUrl } from '@/features/movies/utils/imageUtils'

export function TVNetworks({ networks, onNetworkClick }: TVNetworksProps) {
  if (!networks || networks.length === 0) return null

  return (
    <section className="mb-8 sm:mb-12 animate-fadeIn">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center sm:text-left">
        Networks
      </h2>
      <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 lg:gap-8">
        {networks.map(network => (
          <button
            key={network.id}
            onClick={() => onNetworkClick(network.id)}
            className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 hover:bg-gray-750 transition-all duration-200 transform hover:scale-105 cursor-pointer"
          >
            {network.logo_path ? (
              <img
                src={getImageUrl(network.logo_path, 'W185')}
                alt={network.name}
                className="h-16 w-auto object-contain mx-auto"
              />
            ) : (
              <div className="h-16 flex items-center justify-center">
                <span className="text-gray-300 text-sm font-medium">
                  {network.name}
                </span>
              </div>
            )}
          </button>
        ))}
      </div>
    </section>
  )
}
