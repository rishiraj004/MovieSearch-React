import type { TVShow } from '@/features/movies/types/movie.types'
import { getImageUrl } from '@/features/movies/utils/imageUtils'

interface TVShowCardProps {
  tvShow: TVShow
  onClick?: (tvShow: TVShow) => void
}

export function TVShowCard({ tvShow, onClick }: TVShowCardProps) {
  const year = tvShow.first_air_date ? new Date(tvShow.first_air_date).getFullYear() : ''
  const rating = tvShow.vote_average ? tvShow.vote_average.toFixed(1) : 'N/A'

  return (
    <div
      className="flex-shrink-0 cursor-pointer group hover:scale-105 active:scale-95 transition-all duration-300 animate-fadeInUp"
      onClick={() => onClick?.(tvShow)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.(tvShow)
        }
      }}
    >
      <div className="w-40 sm:w-48">
        {/* Poster with consistent 2:3 aspect ratio */}
        <div className="relative aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden mb-3 group-hover:ring-2 group-hover:ring-blue-400 transition-all duration-300">
          <img
            src={getImageUrl(tvShow.poster_path, 'W342')}
            alt={tvShow.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* Rating overlay */}
          <div className="absolute top-2 right-2 bg-black bg-opacity-70 rounded-full px-2 py-1">
            <span className="text-yellow-400 text-xs font-bold">⭐ {rating}</span>
          </div>
        </div>

        {/* TV Show Info */}
        <div className="space-y-1">
          <h3 className="text-white font-semibold text-sm line-clamp-1 card-title-height group-hover:text-blue-400 transition-colors">
            {tvShow.name}
          </h3>
          <p className="text-gray-400 text-xs">{year}</p>
          {tvShow.overview && (
            <p className="text-gray-500 text-xs line-clamp-2">{tvShow.overview}</p>
          )}
        </div>
      </div>
    </div>
  )
}
