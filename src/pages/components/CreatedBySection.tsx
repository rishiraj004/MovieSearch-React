import { Lightbulb } from 'lucide-react'

import type { CreatedBy } from '@/features/movies/types/movie.types'
import { getPersonImageUrl } from '@/features/movies/utils/imageUtils'

interface CreatedBySectionProps {
  createdBy: CreatedBy[]
  onCreatorClick?: (creator: CreatedBy) => void
}

export function CreatedBySection({ createdBy, onCreatorClick }: CreatedBySectionProps) {
  if (createdBy.length === 0) return null

  return (
    <div
      className="mb-8 animate-fadeInUp"
    >
      <div className="flex items-center gap-3 mb-4">
        <Lightbulb className="w-6 h-6 text-yellow-400" />
        <h3 className="text-xl font-semibold">Created By</h3>
      </div>
      
      <div className="flex flex-wrap gap-4">
        {createdBy.map((creator) => (
          <button
            key={creator.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-yellow-400 border-yellow-500/30 bg-yellow-600/10 ${
              onCreatorClick ? 'cursor-pointer hover:bg-yellow-600/20 transition-colors' : ''
            }`}
            onClick={() => onCreatorClick?.(creator)}
            disabled={!onCreatorClick}
          >
            <img
              src={getPersonImageUrl(creator.profile_path)}
              alt={creator.name}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
            <div>
              <p className="font-medium text-white">{creator.name}</p>
              <p className="text-sm text-gray-400">Creator</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
