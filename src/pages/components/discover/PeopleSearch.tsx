// PeopleSearch.tsx
import { Search, Users, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { movieService } from '@/features/movies/services/movie.service'
import type { Person } from '@/features/movies/types/movie.types'
import { useDebounce } from '@/shared/hooks/useDebounce'

interface PeopleSearchProps {
  selectedPeople: Person[]
  onPeopleChange: (people: Person[], logic: 'and' | 'or') => void
  peopleLogic: 'and' | 'or'
}

export function PeopleSearch({
  selectedPeople,
  onPeopleChange,
  peopleLogic,
}: PeopleSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Person[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const debouncedSearchQuery = useDebounce(searchQuery, 500)
  const searchRef = useRef<HTMLDivElement>(null)

  // Search for people when debounced query changes
  useEffect(() => {
    const searchPeople = async () => {
      if (debouncedSearchQuery.trim().length < 2) {
        setSearchResults([])
        setShowResults(false)
        return
      }

      setIsSearching(true)
      try {
        const response = await movieService.searchPeople(
          debouncedSearchQuery,
          1
        )
        setSearchResults(response.results.slice(0, 10)) // Limit to 10 results
        setShowResults(true)
      } catch {
        setSearchResults([])
        setShowResults(false)
      } finally {
        setIsSearching(false)
      }
    }

    searchPeople()
  }, [debouncedSearchQuery])

  // Handle clicking outside to close results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handlePersonSelect = (person: Person) => {
    if (!selectedPeople.find(p => p.id === person.id)) {
      const newPeople = [...selectedPeople, person]
      onPeopleChange(newPeople, peopleLogic)
    }
    setSearchQuery('')
    setShowResults(false)
  }

  const handlePersonRemove = (personId: number) => {
    const newPeople = selectedPeople.filter(p => p.id !== personId)
    onPeopleChange(newPeople, peopleLogic)
  }

  const handleLogicChange = (logic: 'and' | 'or') => {
    onPeopleChange(selectedPeople, logic)
  }

  return (
    <div className="space-y-3">
      {/* Logic Toggle */}
      {selectedPeople.length > 1 && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Show results with:</span>
          <div className="flex border border-gray-600 rounded">
            <button
              type="button"
              className={`px-2 py-1 text-xs ${
                peopleLogic === 'and'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => handleLogicChange('and')}
            >
              ALL
            </button>
            <button
              type="button"
              className={`px-2 py-1 text-xs ${
                peopleLogic === 'or'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => handleLogicChange('or')}
            >
              ANY
            </button>
          </div>
        </div>
      )}

      {/* Search Input */}
      <div ref={searchRef} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search for people..."
            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onFocus={() => {
              if (searchResults.length > 0) {
                setShowResults(true)
              }
            }}
          />
          {isSearching && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-blue-500"></div>
            </div>
          )}
        </div>

        {/* Search Results */}
        {showResults && searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
            {searchResults.map(person => (
              <button
                key={person.id}
                type="button"
                className="w-full flex items-center gap-3 p-3 hover:bg-gray-700 text-left"
                onClick={() => handlePersonSelect(person)}
                aria-label={`Select ${person.name}`}
              >
                <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                  {person.profile_path ? (
                    <img
                      src={movieService.getImageUrl(person.profile_path, 'w45')}
                      alt={person.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <Users className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">
                    {person.name}
                  </p>
                  <p className="text-gray-400 text-xs truncate">
                    {person.known_for_department}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected People */}
      {selectedPeople.length > 0 && (
        <div className="space-y-2">
          <p className="text-gray-400 text-sm">Selected People:</p>
          <div className="flex flex-wrap gap-2">
            {selectedPeople.map(person => (
              <div
                key={person.id}
                className="flex items-center gap-2 bg-blue-600/20 border border-blue-600/50 rounded-lg px-2 py-1 text-sm"
              >
                <span className="text-blue-300">{person.name}</span>
                <button
                  type="button"
                  onClick={() => handlePersonRemove(person.id)}
                  className="text-blue-300 hover:text-white"
                  aria-label={`Remove ${person.name}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
