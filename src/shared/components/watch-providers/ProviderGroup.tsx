import type { WatchProvider } from '@/features/movies/types/movie.types'

interface ProviderGroupProps {
  providers: WatchProvider[]
  title: string
  icon: React.ReactNode
  color: string
}

export function ProviderGroup({
  providers,
  title,
  icon,
  color,
}: ProviderGroupProps) {
  if (!providers || providers.length === 0) return null

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <div
          className={`p-2 rounded-lg bg-${color}-600/20 border border-${color}-600/30`}
        >
          {icon}
        </div>
        <h4 className="text-lg font-semibold text-white">{title}</h4>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {providers.map(provider => (
          <div
            key={provider.provider_id}
            className="bg-gray-800 rounded-lg p-3 border border-gray-700 hover:border-gray-600 transition-all duration-200 group cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-white p-1">
                <img
                  src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                  alt={provider.provider_name}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-sm text-gray-300 text-center font-medium group-hover:text-white transition-colors">
                {provider.provider_name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
