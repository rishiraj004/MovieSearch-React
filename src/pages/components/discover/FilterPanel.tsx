import { ChevronDown, ChevronUp, X, Search, Users, Filter } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

import { movieService } from '@/features/movies/services/movie.service'
import type { Genre, Person } from '@/features/movies/types/movie.types'
import { useDebounce } from '@/shared/hooks/useDebounce'

// Define types for discover params
export interface DiscoverMovieParams {
  with_genres?: string
  sort_by?: string
  'vote_average.gte'?: string
  'vote_average.lte'?: string
  'vote_count.gte'?: string
  with_original_language?: string
  year?: string
  'primary_release_date.gte'?: string
  'primary_release_date.lte'?: string
  with_runtime?: string
  with_companies?: string
  with_people?: string
  with_cast?: string
  with_crew?: string
  people_logic?: 'and' | 'or'
  include_adult?: boolean
  [key: string]: string | number | boolean | undefined
}

export interface DiscoverTVParams {
  with_genres?: string
  sort_by?: string
  'vote_average.gte'?: string
  'vote_average.lte'?: string
  'vote_count.gte'?: string
  with_original_language?: string
  'first_air_date.gte'?: string
  'first_air_date.lte'?: string
  with_networks?: string
  with_people?: string
  with_cast?: string
  with_crew?: string
  people_logic?: 'and' | 'or'
  include_adult?: boolean
  [key: string]: string | number | boolean | undefined
}

interface FilterPanelProps {
  mediaType: 'movie' | 'tv'
  filters: DiscoverMovieParams | DiscoverTVParams
  genres: Genre[]
  onFilterChange: (filters: Partial<DiscoverMovieParams | DiscoverTVParams>) => void
  // Mobile filter panel props
  isMobile?: boolean
  onApplyFilters?: () => void
}

interface FilterSectionProps {
  title: string
  children: React.ReactNode
  initialExpanded?: boolean
}

function FilterSection({ title, children, initialExpanded = true }: FilterSectionProps) {
  const [expanded, setExpanded] = useState(initialExpanded)

  return (
    <div className="border-b border-gray-700 pb-4 mb-4 last:border-0 last:mb-0">
      <button
        type="button"
        className="flex items-center justify-between w-full text-white font-medium mb-3"
        onClick={() => setExpanded(!expanded)}
      >
        <span>{title}</span>
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {expanded && <div>{children}</div>}
    </div>
  )
}

export function FilterPanel({ mediaType, filters, genres, onFilterChange, isMobile = false, onApplyFilters }: FilterPanelProps) {
  // Local state for selected people (since we need full Person objects, not just IDs)
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([])

  // Sort options
  const sortOptions = [
    { value: 'popularity.desc', label: 'Popularity ↓' },
    { value: 'popularity.asc', label: 'Popularity ↑' },
    { value: 'vote_average.desc', label: 'Rating ↓' },
    { value: 'vote_average.asc', label: 'Rating ↑' },
    { value: mediaType === 'movie' ? 'release_date.desc' : 'first_air_date.desc', label: 'Release Date ↓' },
    { value: mediaType === 'movie' ? 'release_date.asc' : 'first_air_date.asc', label: 'Release Date ↑' },
    { value: 'revenue.desc', label: 'Revenue ↓' },
    { value: 'revenue.asc', label: 'Revenue ↑' },
    { value: 'title.asc', label: 'Title A-Z' },
    { value: 'title.desc', label: 'Title Z-A' }
  ]

  // Language options
  const languageOptions = [
    { value: '', label: 'Any Language' },
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'es', label: 'Spanish' },
    { value: 'it', label: 'Italian' },
    { value: 'ja', label: 'Japanese' },
    { value: 'ko', label: 'Korean' },
    { value: 'zh', label: 'Chinese' },
    { value: 'ru', label: 'Russian' },
    { value: 'hi', label: 'Hindi' }
  ]

  // Rating options
  const ratingOptions = [
    { value: '9', label: '9+' },
    { value: '8', label: '8+' },
    { value: '7', label: '7+' },
    { value: '6', label: '6+' },
    { value: '5', label: '5+' },
    { value: '4', label: '4+' },
    { value: '3', label: '3+' },
    { value: '2', label: '2+' },
    { value: '1', label: '1+' },
    { value: '0', label: 'Any Rating' }
  ]

  // Vote count options
  const voteCountOptions = [
    { value: '1000', label: '1000+' },
    { value: '500', label: '500+' },
    { value: '200', label: '200+' },
    { value: '100', label: '100+' },
    { value: '50', label: '50+' },
    { value: '10', label: '10+' },
    { value: '', label: 'Any' }
  ]

  // Years options
  const currentYear = new Date().getFullYear()
  const yearOptions = [
    { value: '', label: 'Any Year' },
    ...Array.from({ length: 80 }, (_, i) => {
      const year = (currentYear - i).toString()
      return { value: year, label: year }
    })
  ]

  // Handle genre selection
  const handleGenreChange = (genreId: number) => {
    const currentGenres = filters.with_genres ? filters.with_genres.split(',').map(Number) : []
    let newGenres: number[]

    if (currentGenres.includes(genreId)) {
      newGenres = currentGenres.filter(id => id !== genreId)
    } else {
      newGenres = [...currentGenres, genreId]
    }

    onFilterChange({
      with_genres: newGenres.length > 0 ? newGenres.join(',') : ''
    })
  }

  // Handle date range inputs
  const handleDateRangeChange = (field: string, value: string) => {
    onFilterChange({ [field]: value })
  }

  // PeopleSearch component
  interface PeopleSearchProps {
    selectedPeople: Person[]
    onPeopleChange: (people: Person[], logic: 'and' | 'or') => void
    peopleLogic: 'and' | 'or'
  }

  function PeopleSearch({ selectedPeople, onPeopleChange, peopleLogic }: PeopleSearchProps) {
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
          const response = await movieService.searchPeople(debouncedSearchQuery, 1)
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
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
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
              onChange={(e) => setSearchQuery(e.target.value)}
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
              {searchResults.map((person) => (
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
                    <p className="text-white font-medium truncate">{person.name}</p>
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
              {selectedPeople.map((person) => (
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

  return (
    <div className="bg-gray-800 rounded-lg p-4 sticky top-4">
      <h3 className="text-xl font-bold mb-4 text-white">Filters</h3>

      <FilterSection title="Sort By">
        <select
          id="sort-by"
          aria-label="Sort by"
          value={filters.sort_by?.toString() || 'popularity.desc'}
          onChange={(e) => onFilterChange({ sort_by: e.target.value })}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </FilterSection>

      <FilterSection title="People">
        <PeopleSearch
          selectedPeople={selectedPeople}
          onPeopleChange={(people, logic) => {
            setSelectedPeople(people)
            onFilterChange({
              with_people: people.length > 0 ? people.map(p => p.id).join(',') : '',
              people_logic: logic
            })
          }}
          peopleLogic={(filters.people_logic as 'and' | 'or') || 'or'}
        />
      </FilterSection>

      <FilterSection title="Genres">
        <div className="flex flex-wrap gap-2">
          {genres.map(genre => {
            const isSelected = filters.with_genres ?
              filters.with_genres.split(',').includes(genre.id.toString()) : false

            return (
              <button
                key={genre.id}
                type="button"
                onClick={() => handleGenreChange(genre.id)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  isSelected
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
              >
                {genre.name}
              </button>
            )
          })}
        </div>
      </FilterSection>

      <FilterSection title="Rating">
        <div className="space-y-3">
          <div>
            <label htmlFor="min-rating" className="text-sm text-gray-400 mb-1 block">Minimum Rating</label>
            <select
              id="min-rating"
              aria-label="Minimum Rating"
              value={filters['vote_average.gte']?.toString() || ''}
              onChange={(e) => onFilterChange({ 'vote_average.gte': e.target.value })}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {ratingOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="min-votes" className="text-sm text-gray-400 mb-1 block">Minimum Vote Count</label>
            <select
              id="min-votes"
              aria-label="Minimum Vote Count"
              value={filters['vote_count.gte']?.toString() || ''}
              onChange={(e) => onFilterChange({ 'vote_count.gte': e.target.value })}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {voteCountOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Language">
        <select
          id="language"
          aria-label="Language"
          value={filters.with_original_language?.toString() || ''}
          onChange={(e) => onFilterChange({ with_original_language: e.target.value })}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {languageOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </FilterSection>

      <FilterSection title="Year">
        <select
          id="year"
          aria-label="Year"
          value={filters.year?.toString() || ''}
          onChange={(e) => onFilterChange({ year: e.target.value })}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {yearOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </FilterSection>

      <FilterSection title="Release Date Range">
        <div className="space-y-3">
          <div>
            <label htmlFor="date-after" className="text-sm text-gray-400 mb-1 block">
              {mediaType === 'movie' ? 'Released After' : 'First Aired After'}
            </label>
            <input
              id="date-after"
              type="date"
              value={mediaType === 'movie'
                ? (filters['primary_release_date.gte']?.toString() || '')
                : (filters['first_air_date.gte']?.toString() || '')}
              onChange={(e) => handleDateRangeChange(
                mediaType === 'movie' ? 'primary_release_date.gte' : 'first_air_date.gte',
                e.target.value
              )}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={mediaType === 'movie' ? 'Released After' : 'First Aired After'}
            />
          </div>

          <div>
            <label htmlFor="date-before" className="text-sm text-gray-400 mb-1 block">
              {mediaType === 'movie' ? 'Released Before' : 'First Aired Before'}
            </label>
            <input
              id="date-before"
              type="date"
              value={mediaType === 'movie'
                ? (filters['primary_release_date.lte']?.toString() || '')
                : (filters['first_air_date.lte']?.toString() || '')}
              onChange={(e) => handleDateRangeChange(
                mediaType === 'movie' ? 'primary_release_date.lte' : 'first_air_date.lte',
                e.target.value
              )}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={mediaType === 'movie' ? 'Released Before' : 'First Aired Before'}
            />
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Adult Content">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="include-adult"
            checked={filters.include_adult || false}
            onChange={(e) => onFilterChange({ include_adult: e.target.checked })}
            className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="include-adult" className="ml-2 text-sm text-gray-300">
            Include adult content
          </label>
        </div>
      </FilterSection>

      <button
        type="button"
        onClick={() => {
          setSelectedPeople([])
          onFilterChange({
            with_genres: '',
            sort_by: 'popularity.desc',
            'vote_average.gte': '',
            'vote_average.lte': '',
            'vote_count.gte': '',
            with_original_language: '',
            year: '',
            'primary_release_date.gte': '',
            'primary_release_date.lte': '',
            'first_air_date.gte': '',
            'first_air_date.lte': '',
            with_runtime: '',
            with_companies: '',
            with_networks: '',
            include_adult: false,
            with_people: '',
            people_logic: 'or'
          })
        }}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg mt-4 transition-colors"
      >
        Reset All Filters
      </button>

      {/* Apply Filters button - only shown on small screens */}
      {isMobile && onApplyFilters && (
        <div className="lg:hidden sticky bottom-0 bg-gray-800 pt-4 pb-2 -mx-4 px-4 mt-6 border-t border-gray-700">
          <button
            type="button"
            onClick={onApplyFilters}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors shadow-lg flex items-center justify-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Apply Filters
          </button>
        </div>
      )}
    </div>
  )
}
