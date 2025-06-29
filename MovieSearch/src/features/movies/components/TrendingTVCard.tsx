import { motion } from 'framer-motion'

import type { TVShow } from '../types/movie.types'

import { API_CONFIG, IMAGE_SIZES } from '@/shared/constants/api.constants'

interface TrendingTVCardProps {
  tvShow: TVShow
  onClick?: (tvShow: TVShow) => void
}

export function TrendingTVCard({ tvShow, onClick }: TrendingTVCardProps) {
  const getImageUrl = (path: string | null) => {
    if (!path) return '/placeholder-movie.jpg'
    return `${API_CONFIG.IMAGE_BASE_URL}/${IMAGE_SIZES.POSTER.W500}${path}`
  }

  const getReleaseYear = (date: string) => {
    if (!date) return 'N/A'
    return new Date(date).getFullYear()
  }

  return (
    <motion.div
      className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden cursor-pointer group hover:shadow-2xl hover:shadow-cyan-500/20 active:shadow-2xl active:shadow-cyan-500/30 transition-all duration-300 touch-card"
      onClick={() => onClick?.(tvShow)}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative overflow-hidden">
        <img
          src={getImageUrl(tvShow.poster_path)}
          alt={tvShow.name}
          className="w-full h-[140px] sm:h-[160px] md:h-[180px] object-cover group-hover:scale-105 group-active:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300" />
        
        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-yellow-400 px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
          <span>⭐</span>
          {tvShow.vote_average.toFixed(1)}
        </div>
      </div>

      <div className="p-2">
        <h3 className="text-white font-semibold text-xs sm:text-sm mb-1 line-clamp-2 group-hover:text-cyan-400 group-active:text-cyan-400 transition-colors">
          {tvShow.name}
        </h3>
        <p className="text-gray-400 text-xs mb-1">
          {getReleaseYear(tvShow.first_air_date)}
        </p>
        <p className="text-gray-500 text-xs line-clamp-1 hidden sm:block">
          {tvShow.overview}
        </p>
      </div>
    </motion.div>
  )
}
