import { motion } from 'framer-motion'
import { Users } from 'lucide-react'

import type { Crew } from '@/features/movies/types/movie.types'
import { getPersonImageUrl } from '@/features/movies/utils/imageUtils'

interface CrewSectionProps {
  title: string
  crew: Crew[]
  icon?: React.ComponentType<{ className?: string }>
  color?: string
}

export function CrewSection({ title, crew, icon: Icon = Users, color = 'blue' }: CrewSectionProps) {
  if (crew.length === 0) return null

  const colorClasses = {
    blue: 'text-blue-400 border-blue-500/30 bg-blue-600/10',
    purple: 'text-purple-400 border-purple-500/30 bg-purple-600/10',
    green: 'text-green-400 border-green-500/30 bg-green-600/10',
    orange: 'text-orange-400 border-orange-500/30 bg-orange-600/10'
  }

  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <Icon className={`w-6 h-6 ${colorClasses[color as keyof typeof colorClasses].split(' ')[0]}`} />
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      
      <div className="flex flex-wrap gap-4">
        {crew.slice(0, 6).map((person) => (
          <div
            key={`${person.id}-${person.credit_id}`}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${colorClasses[color as keyof typeof colorClasses]}`}
          >
            <img
              src={getPersonImageUrl(person.profile_path)}
              alt={person.name}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
            <div>
              <p className="font-medium text-white">{person.name}</p>
              {person.job && (
                <p className="text-sm text-gray-400">{person.job}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {crew.length > 6 && (
        <p className="text-sm text-gray-400 mt-2">
          +{crew.length - 6} more {title.toLowerCase()}
        </p>
      )}
    </motion.div>
  )
}
