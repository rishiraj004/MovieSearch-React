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

  return (
    <motion.div
      className="flex-shrink-0 w-[140px] cursor-pointer group"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      onClick={() => onClick?.(person)}
    >
      <div className="relative bg-transparent rounded-xl overflow-hidden text-center group hover:brightness-110 transition-all duration-300">
        {/* Profile Image */}
        <div className="relative mx-auto mb-3">
          <div className="w-[120px] h-[120px] mx-auto rounded-full overflow-hidden bg-gray-700 border-4 border-gray-600 group-hover:border-pink-400 transition-colors duration-300">
            <img
              src={getImageUrl(person.profile_path)}
              alt={person.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />
          </div>
          
          {/* Popularity Badge */}
          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            🔥 {Math.round(person.popularity)}
          </div>
        </div>

        {/* Person Info */}
        <div className="px-2">
          <h3 className="text-white font-semibold text-sm leading-tight mb-1 line-clamp-2 group-hover:text-pink-400 transition-colors">
            {person.name}
          </h3>
          <p className="text-gray-400 text-xs capitalize">
            {person.known_for_department?.toLowerCase() || 'Actor'}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
