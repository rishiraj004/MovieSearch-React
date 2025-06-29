import { motion } from 'framer-motion'

import type { Movie } from '../types/movie.types'
import { getReleaseYear } from '../utils/dateUtils'
import { getImageUrl } from '../utils/imageUtils'

import { RatingBadge } from './ui/RatingBadge'

interface TrendingMovieCardProps {
  movie: Movie
  onClick?: (movie: Movie) => void
}

export function TrendingMovieCard({ movie, onClick }: TrendingMovieCardProps) {
  return (
    <motion.div
      className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden cursor-pointer group touch-card w-[140px] sm:w-[160px] hover:shadow-2xl hover:shadow-pink-500/20 active:shadow-2xl active:shadow-pink-500/30 transition-all duration-300"
      onClick={() => onClick?.(movie)}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative overflow-hidden">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="w-full h-[180px] sm:h-[200px] object-cover group-hover:scale-105 group-active:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300" />
        
        <RatingBadge rating={movie.vote_average} />
      </div>

      <div className="p-2">
        <h3 className="text-white font-semibold text-xs mb-1 line-clamp-2 group-hover:text-pink-400 group-active:text-pink-400 transition-colors">
          {movie.title}
        </h3>
        <p className="text-gray-400 text-xs">
          {getReleaseYear(movie.release_date)}
        </p>
      </div>
    </motion.div>
  )
}
