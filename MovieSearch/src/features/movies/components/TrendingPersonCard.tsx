import { motion } from 'framer-motion'

import type { Person } from '../types/movie.types'

import { API_CONFIG, IMAGE_SIZES } from '@/shared/constants/api.constants'

interface TrendingPersonCardProps {
  person: Person
  onClick?: (person: Person) => void
}

export function TrendingPersonCard({ person, onClick }: TrendingPersonCardProps) {
  const getImageUrl = (path: string | null) => {
    if (!path) return '/placeholder-person.jpg'
    return `${API_CONFIG.IMAGE_BASE_URL}/${IMAGE_SIZES.POSTER.W500}${path}`
  }

  const getKnownForTitles = () => {
    if (!person.known_for || person.known_for.length === 0) return 'Various projects'
    return person.known_for
      .slice(0, 2)
      .map(item => 'title' in item ? item.title : item.name)
      .join(', ')
  }

  return (
    <motion.div
      className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden cursor-pointer group hover:shadow-2xl hover:shadow-purple-500/20 active:shadow-2xl active:shadow-purple-500/30 transition-all duration-300 touch-card w-[100px] sm:w-[120px] mx-auto"
      onClick={() => onClick?.(person)}
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative overflow-hidden p-2">
        <div className="relative w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2">
          <img
            src={getImageUrl(person.profile_path)}
            alt={person.name}
            className="w-full h-full object-cover rounded-full group-hover:scale-110 group-active:scale-110 transition-transform duration-500 border-2 border-purple-400/20 group-hover:border-purple-400/50 group-active:border-purple-400/50"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 rounded-full transition-opacity duration-300" />
        </div>
        
        {/* Popularity Badge */}
        <div className="absolute top-1 right-1 bg-black/70 backdrop-blur-sm text-purple-400 px-1.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
          <span>🔥</span>
          {person.popularity.toFixed(0)}
        </div>
      </div>

      <div className="px-2 pb-2 text-center">
        <h3 className="text-white font-semibold text-xs mb-1 line-clamp-2 group-hover:text-purple-400 group-active:text-purple-400 transition-colors">
          {person.name}
        </h3>
        <p className="text-gray-400 text-xs mb-1">
          {person.known_for_department}
        </p>
        <p className="text-gray-500 text-xs line-clamp-1 hidden sm:block">
          {getKnownForTitles()}
        </p>
      </div>
    </motion.div>
  )
}
