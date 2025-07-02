import { ChevronDown, Search } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import type { Country } from '@/features/movies/types/movie.types'

interface CountryDropdownProps {
  countries: Country[]
  selectedCountry: string
  selectedCountryName: string
  onCountrySelect: (countryCode: string) => void
}

export function CountryDropdown({
  countries,
  selectedCountry,
  selectedCountryName,
  onCountrySelect,
}: CountryDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
        setSearchTerm('') // Clear search when closing
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isDropdownOpen) {
        setIsDropdownOpen(false)
        setSearchTerm('') // Clear search when closing
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
      // Focus search input when dropdown opens
      if (searchInputRef.current) {
        searchInputRef.current.focus()
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isDropdownOpen])

  // Filter countries based on search term
  const filteredCountries = countries.filter(
    country =>
      country.english_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.iso_3166_1.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCountryClick = (countryCode: string) => {
    onCountrySelect(countryCode)
    setIsDropdownOpen(false)
    setSearchTerm('')
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg border border-gray-600 transition-colors min-w-[180px] justify-between"
      >
        <span className="text-sm font-medium">{selectedCountryName}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isDropdownOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-gray-800 border border-gray-600 rounded-lg shadow-2xl max-h-60 overflow-hidden z-dropdown">
          {/* Search Input */}
          <div className="p-3 border-b border-gray-600">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search countries..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Countries List */}
          <div className="max-h-48 overflow-y-auto">
            {filteredCountries.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-400 text-center">
                No countries found
              </div>
            ) : (
              <div className="pb-1">
                {filteredCountries.map(country => (
                  <button
                    key={country.iso_3166_1}
                    onClick={() => handleCountryClick(country.iso_3166_1)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors ${
                      selectedCountry === country.iso_3166_1
                        ? 'bg-gray-700 text-blue-400'
                        : 'text-gray-300'
                    }`}
                  >
                    {country.english_name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
