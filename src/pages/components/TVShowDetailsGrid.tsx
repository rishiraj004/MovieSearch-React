import { Calendar, Clock, Globe, Tv, Users, Star } from 'lucide-react'

import type { TVShowDetails } from '@/features/movies/types/movie.types'

interface TVShowDetailsGridProps {
  tvShow: TVShowDetails
}

export function TVShowDetailsGrid({ tvShow }: TVShowDetailsGridProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const gridItems = [
    {
      icon: Calendar,
      label: 'First Air Date',
      value: formatDate(tvShow.first_air_date),
      color: 'blue'
    },
    {
      icon: Calendar,
      label: 'Last Air Date',
      value: formatDate(tvShow.last_air_date),
      color: 'purple'
    },
    {
      icon: Tv,
      label: 'Seasons',
      value: `${tvShow.number_of_seasons} season${tvShow.number_of_seasons !== 1 ? 's' : ''}`,
      color: 'green'
    },
    {
      icon: Tv,
      label: 'Episodes',
      value: `${tvShow.number_of_episodes} episode${tvShow.number_of_episodes !== 1 ? 's' : ''}`,
      color: 'red'
    },
    {
      icon: Clock,
      label: 'Episode Runtime',
      value: tvShow.episode_run_time.length > 0 ? `${tvShow.episode_run_time[0]} minutes` : 'Varies',
      color: 'yellow'
    },
    {
      icon: Star,
      label: 'Status',
      value: tvShow.status,
      color: 'pink'
    },
    {
      icon: Globe,
      label: 'Original Language',
      value: tvShow.original_language?.toUpperCase() || 'N/A',
      color: 'indigo'
    },
    {
      icon: Users,
      label: 'Spoken Languages',
      value: tvShow.spoken_languages?.map(lang => lang.english_name || lang.name).join(', ') || 'N/A',
      color: 'teal'
    }
  ]

  // Filter out items with 'N/A' or undefined values for a cleaner display
  const validItems = gridItems.filter(item => 
    item.value && item.value !== 'N/A' && item.value !== 'undefined'
  )

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
      {validItems.map((item) => (
        <div
          key={item.label}
          className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-lg animate-fadeInUp hover:scale-[1.02]"
        >
          <div className="flex items-start gap-3 sm:gap-4">
            <div className={`p-2 sm:p-3 rounded-lg bg-${item.color}-600/20 border border-${item.color}-600/30 flex-shrink-0`}>
              <item.icon className={`w-4 h-4 sm:w-5 sm:h-5 text-${item.color}-400`} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm sm:text-base font-semibold text-gray-300 mb-1 sm:mb-2">
                {item.label}
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-white font-medium leading-tight">
                {item.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
