import { useNavigate } from 'react-router-dom'

import type { ProductionCompany } from '../../features/movies/types/movie.types'
import { getImageUrl } from '../../features/movies/utils/imageUtils'

interface ProductionLogoProps {
  company: ProductionCompany
}

export function ProductionLogo({ company }: ProductionLogoProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/company/${company.id}`)
  }

  if (!company.logo_path) {
    return (
      <button
        onClick={handleClick}
        className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-lg p-4 min-h-16 transition-all duration-300 cursor-pointer group border border-transparent hover:border-gray-600 hover:scale-105 active:scale-95 animate-fadeInUp"
      >
        <span className="text-gray-400 group-hover:text-gray-300 text-sm font-medium text-center transition-colors">
          {company.name}
        </span>
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      className="flex flex-col items-center bg-gray-800 hover:bg-gray-700 rounded-lg p-4 min-h-16 transition-all duration-300 cursor-pointer group border border-transparent hover:border-gray-600 hover:scale-105 active:scale-95 animate-fadeInUp"
    >
      <img
        src={getImageUrl(company.logo_path, 'W185')}
        alt={company.name}
        className="max-h-12 max-w-full object-contain mb-2 transition-transform group-hover:scale-110"
        loading="lazy"
      />
      <span className="text-gray-400 group-hover:text-gray-300 text-xs text-center transition-colors">
        {company.name}
      </span>
    </button>
  )
}
