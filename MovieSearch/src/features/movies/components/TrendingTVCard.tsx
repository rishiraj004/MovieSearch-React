import { motion } from 'framer-motion'

import type { TVShow } from '../types/movie.types'

import { API_CONFIG, IMAGE_SIZES } from '@/shared/constants/api.constants'

interface TrendingTVCardProps {
  tvShow: TVShow
  onClick?: (tvShow: TVShow) => void
}

export function TrendingTVCard({ tvShow, onClick }: TrendingTVCardProps) {
  const getImageUrl = (path: string | null) => {
    if (!path) return '/placeholder-tv.jpg'
    return `${API_CONFIG.IMAGE_BASE_URL}/${IMAGE_SIZES.POSTER.W500}${path}`
  }

  const getFirstAirYear = (date: string) => {
    if (!date) return 'N/A'
    return new Date(date).getFullYear()
  }

  return (
    <motion.div
      className="flex-shrink-0 w-[180px] cursor-pointer group"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      onClick={() => onClick?.(tvShow)}
    >
      <div className="relative bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        {/* Poster Image */}
        <div className="relative h-[270px] overflow-hidden">
          <img
            src={getImageUrl(tvShow.poster_path)}
            alt={tvShow.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
          
          {/* Rating Badge */}
          {tvShow.vote_average > 0 && (
            <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-lg text-xs font-bold flex items-center">
              <span className="mr-1">⭐</span>
              {tvShow.vote_average.toFixed(1)}
            </div>
          )}
          
          {/* TV Show Badge */}
          <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
            📺 TV
          </div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* TV Show Info */}
        <div className="p-3">
          <h3 className="text-white font-semibold text-sm leading-tight mb-1 line-clamp-2 group-hover:text-pink-400 transition-colors">
            {tvShow.name}
          </h3>
          <p className="text-gray-400 text-xs">
            {getFirstAirYear(tvShow.first_air_date)}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
