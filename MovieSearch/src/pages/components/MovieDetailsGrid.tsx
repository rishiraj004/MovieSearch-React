import { ExternalLink } from 'lucide-react'

import type { MovieDetails } from '@/features/movies/types/movie.types'

interface MovieDetailsGridProps {
  movie: MovieDetails
}

export function MovieDetailsGrid({ movie }: MovieDetailsGridProps) {
  const formatCurrency = (amount: number) => {
    if (amount === 0) return 'N/A'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const detailsData = [
    {
      title: 'Original Title',
      value: movie.original_title || 'N/A',
      id: 1
    },
    {
      title: 'IMDb',
      value: 'Visit on IMDb',
      isLink: true,
      href: movie.imdb_id ? `https://www.imdb.com/title/${movie.imdb_id}` : undefined,
      id: 2
    },
    {
      title: 'Languages',
      value: movie.spoken_languages?.map(lang => lang.english_name).join(', ') || 'N/A',
      id: 3
    },
    {
      title: 'Countries',
      value: movie.production_countries?.map(country => country.name).join(', ') || 'N/A',
      id: 4
    },
    {
      title: 'Budget',
      value: formatCurrency(movie.budget),
      id: 5
    },
    {
      title: 'Revenue',
      value: formatCurrency(movie.revenue),
      id: 6
    },
    {
      title: 'Status',
      value: movie.status || 'N/A',
      id: 7
    },
    {
      title: 'Release Date',
      value: formatDate(movie.release_date),
      id: 8
    }
  ]

  const renderValue = (detail: { id: number; value: string; href?: string }) => {
    switch (detail.id) {
      case 1: // Original Title - make it bold
        return (
          <p className="text-white font-bold text-sm leading-relaxed">
            {detail.value}
          </p>
        )
      
      case 2: { // IMDb - Visit on IMDb with redirect icon
        return detail.href ? (
          <a
            href={detail.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium inline-flex items-center gap-1"
          >
            {detail.value}
            <ExternalLink className="w-3 h-3" />
          </a>
        ) : (
          <p className="text-gray-500 text-sm">N/A</p>
        )
      }
      
      case 3: // Languages - small rounded containers
      case 4: { // Countries - small rounded containers
        if (detail.value === 'N/A') {
          return <p className="text-gray-500 text-sm">N/A</p>
        }
        const items = detail.value.split(', ')
        const containerColor = detail.id === 3 ? 'bg-blue-600/20 text-blue-300 border-blue-500/30' : 'bg-purple-600/20 text-purple-300 border-purple-500/30'
        return (
          <div className="flex flex-wrap gap-1">
            {items.map((item: string, index: number) => (
              <span
                key={index}
                className={`${containerColor} px-2 py-1 rounded-full text-xs border`}
              >
                {item}
              </span>
            ))}
          </div>
        )
      }
      
      case 5: // Budget - green color
      case 6: // Revenue - green color
        return (
          <p className="text-green-400 font-medium text-sm leading-relaxed">
            {detail.value}
          </p>
        )
      
      case 7: { // Status - green if released, other colors otherwise
        const isReleased = detail.value.toLowerCase() === 'released'
        const statusColor = isReleased ? 'bg-green-600 text-green-100' : 'bg-yellow-600 text-yellow-100'
        return (
          <span className={`${statusColor} px-3 py-1 rounded-full text-xs font-medium`}>
            {detail.value}
          </span>
        )
      }
      
      case 8: // Release Date - looks good as is
      default:
        return (
          <p className="text-white font-medium text-sm leading-relaxed">
            {detail.value}
          </p>
        )
    }
  }

  return (
    <div className="mx-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {detailsData.map((detail, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 hover:bg-gray-750 transition-colors duration-200"
          >
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
              {detail.title}
            </h3>
            {renderValue(detail)}
          </div>
        ))}
      </div>
    </div>
  )
}
