import type { Person } from '@/features/movies/types/movie.types'
import { getPersonImageUrl } from '@/features/movies/utils/imageUtils'

interface PersonCardProps {
  person: Person
  onClick?: (person: Person) => void
}

export function PersonCard({ person, onClick }: PersonCardProps) {
  return (
    <div
      className="flex-shrink-0 cursor-pointer group hover:scale-105 active:scale-95 transition-all duration-300 animate-fadeInUp"
      onClick={() => onClick?.(person)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.(person)
        }
      }}
    >
      <div className="w-40 sm:w-48">
        {/* Profile Photo */}
        <div className="relative aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden mb-3 group-hover:ring-2 group-hover:ring-purple-400 transition-all duration-300">
          <img
            src={getPersonImageUrl(person.profile_path)}
            alt={person.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* Department overlay */}
          <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-70 rounded px-2 py-1">
            <span className="text-purple-400 text-xs font-bold">{person.known_for_department}</span>
          </div>
        </div>

        {/* Person Info */}
        <div className="space-y-1">
          <h3 className="text-white font-semibold text-sm line-clamp-1 card-title-height group-hover:text-purple-400 transition-colors">
            {person.name}
          </h3>
          <p className="text-gray-400 text-xs">
            {person.known_for && person.known_for.length > 0 && (
              <>Known for: {'title' in person.known_for[0] ? person.known_for[0].title : person.known_for[0].name}</>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
