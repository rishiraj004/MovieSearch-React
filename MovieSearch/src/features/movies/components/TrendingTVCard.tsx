import { motion } from 'framer-motion'

import type { TVShow } from '../types/movie.types'
import { getReleaseYear } from '../utils/dateUtils'
import { getImageUrl } from '../utils/imageUtils'

import { RatingBadge } from './ui/RatingBadge'

interface TrendingTVCardProps {
  tvShow: TVShow
  onClick?: (tvShow: TVShow) => void
}

export function TrendingTVCard({ tvShow, onClick }: TrendingTVCardProps) {
  return (
    <motion.div
      className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 w-[140px] sm:w-[160px]"
      onClick={() => onClick?.(tvShow)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative overflow-hidden">
        <img
          src={getImageUrl(tvShow.poster_path)}
          alt={tvShow.name}
          className="w-full h-[180px] sm:h-[200px] object-cover"
          loading="lazy"
        />
        
        <RatingBadge rating={tvShow.vote_average} />
      </div>

      <div className="p-2">
        <h3 className="text-white font-semibold text-xs mb-1 line-clamp-1">
          {tvShow.name}
        </h3>
        <p className="text-gray-400 text-xs">
          {getReleaseYear(tvShow.first_air_date)}
        </p>
      </div>
    </motion.div>
  )
}
