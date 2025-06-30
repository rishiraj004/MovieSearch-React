import { motion } from 'framer-motion'

import type { ProductionCompany } from '../../features/movies/types/movie.types'
import { getImageUrl } from '../../features/movies/utils/imageUtils'

interface ProductionLogoProps {
  company: ProductionCompany
}

export function ProductionLogo({ company }: ProductionLogoProps) {
  if (!company.logo_path) {
    return (
      <motion.div
        className="flex items-center justify-center bg-gray-800 rounded-lg p-4 min-h-16"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-gray-400 text-sm font-medium text-center">
          {company.name}
        </span>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="flex flex-col items-center bg-gray-800 rounded-lg p-4 min-h-16"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={getImageUrl(company.logo_path, 'W185')}
        alt={company.name}
        className="max-h-12 max-w-full object-contain mb-2"
        loading="lazy"
      />
      <span className="text-gray-400 text-xs text-center">
        {company.name}
      </span>
    </motion.div>
  )
}
