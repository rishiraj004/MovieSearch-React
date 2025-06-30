import { motion } from 'framer-motion'
import { useState } from 'react'

import type { Person } from '../types/movie.types'
import { getPersonImageUrl } from '../utils/imageUtils'

interface TrendingPersonCardProps {
  person: Person
  onClick?: (person: Person) => void
}

export function TrendingPersonCard({ person, onClick }: TrendingPersonCardProps) {
  const [imageError, setImageError] = useState(false)
  
  const handleImageError = () => {
    setImageError(true)
  }

  const getImageSrc = () => {
    if (imageError || !person.profile_path) {
      // Use the same modern placeholder design as the utility function
      return 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"%3E%3Cdefs%3E%3ClinearGradient id="bg" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%234B5563"/%3E%3Cstop offset="100%25" style="stop-color:%23374151"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="128" height="128" fill="url(%23bg)"/%3E%3Cg fill="%23D1D5DB" opacity="0.8"%3E%3Ccircle cx="64" cy="45" r="18"/%3E%3Cpath d="M35 96c0-16 13-29 29-29h0c16 0 29 13 29 29v32H35z"/%3E%3C/g%3E%3C/svg%3E'
    }
    return getPersonImageUrl(person.profile_path)
  }

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="bg-gray-800 rounded-full overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 w-[92px] h-[92px] flex-shrink-0"
        onClick={() => onClick?.(person)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <img
          src={getImageSrc()}
          alt={person.name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={handleImageError}
        />
      </motion.div>
      <div className="mt-3 text-center max-w-[92px]">
        <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">{person.name}</h3>
      </div>
    </div>
  )
}
