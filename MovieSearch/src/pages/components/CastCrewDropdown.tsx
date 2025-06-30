import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Users, Camera, User } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

import type { Cast, Crew } from '@/features/movies/types/movie.types'
import { getPersonImageUrl } from '@/features/movies/utils/imageUtils'

interface CastCrewDropdownProps {
  cast: Cast[]
  crew: Crew[]
  onPersonClick?: (person: Cast | Crew) => void
}

export function CastCrewDropdown({ cast, crew, onPersonClick }: CastCrewDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'cast' | 'crew'>('cast')
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscapeKey)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('keydown', handleEscapeKey)
      }
    }
  }, [isOpen])

  const handlePersonClick = (person: Cast | Crew) => {
    if (onPersonClick) {
      onPersonClick(person)
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 font-semibold shadow-lg hover:shadow-xl"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Users className="w-5 h-5" />
        <span>Full Cast & Crew</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-600 rounded-xl shadow-2xl z-50 overflow-hidden"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Tab Headers */}
            <div className="flex border-b border-gray-600 bg-gray-750">
              <button
                onClick={() => setActiveTab('cast')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                  activeTab === 'cast'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <User className="w-4 h-4" />
                Cast ({cast.length})
              </button>
              <button
                onClick={() => setActiveTab('crew')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                  activeTab === 'crew'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Camera className="w-4 h-4" />
                Crew ({crew.length})
              </button>
            </div>

            {/* Content */}
            <div className="max-h-96 overflow-y-auto">
              {activeTab === 'cast' && (
                <div className="p-4">
                  <div className="space-y-3">
                    {cast.map((actor) => (
                      <motion.div
                        key={actor.id}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                        onClick={() => handlePersonClick(actor)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <img
                          src={getPersonImageUrl(actor.profile_path)}
                          alt={actor.name}
                          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-white truncate">{actor.name}</p>
                          <p className="text-sm text-gray-400 truncate">{actor.character}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'crew' && (
                <div className="p-4">
                  <div className="space-y-3">
                    {crew.map((member) => (
                      <motion.div
                        key={`${member.id}-${member.credit_id}`}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                        onClick={() => handlePersonClick(member)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <img
                          src={getPersonImageUrl(member.profile_path)}
                          alt={member.name}
                          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-white truncate">{member.name}</p>
                          <p className="text-sm text-gray-400 truncate">
                            {member.job} {member.department && `• ${member.department}`}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 bg-gray-750 border-t border-gray-600">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full text-center text-sm text-gray-400 hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
