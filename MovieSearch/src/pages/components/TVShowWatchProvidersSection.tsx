import { motion } from 'framer-motion'
import { ChevronDown, Play, ShoppingCart, Tv, Search } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

import { movieService } from '@/features/movies/services/movie.service'
import type { WatchProvidersResponse, Country, WatchProvider } from '@/features/movies/types/movie.types'

interface TVShowWatchProvidersSectionProps {
  tvShowId: number
}

export function TVShowWatchProvidersSection({ tvShowId }: TVShowWatchProvidersSectionProps) {
  const [watchProviders, setWatchProviders] = useState<WatchProvidersResponse | null>(null)
  const [countries, setCountries] = useState<Country[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string>('IN') // Default to India
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
  const filteredCountries = countries.filter(country =>
    country.english_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.iso_3166_1.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        const [providersData, countriesData] = await Promise.all([
          movieService.getTVShowWatchProviders(tvShowId),
          movieService.getAvailableCountries()
        ])
        
        setWatchProviders(providersData)
        setCountries(countriesData)
      } catch {
        // Silently handle error - component will show no providers available
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [tvShowId])

  const currentCountryProviders = watchProviders?.results[selectedCountry]
  const selectedCountryName = countries.find(c => c.iso_3166_1 === selectedCountry)?.english_name || selectedCountry

  const renderProviderGroup = (providers: WatchProvider[], title: string, icon: React.ReactNode, color: string) => {
    if (!providers || providers.length === 0) return null

    return (
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <div className={`p-2 rounded-lg bg-${color}-600/20 border border-${color}-600/30`}>
            {icon}
          </div>
          <h4 className="text-lg font-semibold text-white">{title}</h4>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {providers.map((provider) => (
            <motion.div
              key={provider.provider_id}
              className="bg-gray-800 rounded-lg p-3 border border-gray-700 hover:border-gray-600 transition-colors group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-white p-1">
                  <img
                    src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                    alt={provider.provider_name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-sm text-gray-300 text-center font-medium group-hover:text-white transition-colors">
                  {provider.provider_name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <motion.section
        className="mb-8 sm:mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center sm:text-left">Where to Watch</h2>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
            <span className="ml-3 text-gray-400">Loading watch providers...</span>
          </div>
        </div>
      </motion.section>
    )
  }

  if (!currentCountryProviders) {
    return (
      <motion.section
        className="mb-8 sm:mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Where to Watch</h2>
          
          {/* Country Selector */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg border border-gray-600 transition-colors min-w-[180px] justify-between"
            >
              <span className="text-sm font-medium">{selectedCountryName}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
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
                      onChange={(e) => setSearchTerm(e.target.value)}
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
                      {filteredCountries.map((country) => (
                        <button
                          key={country.iso_3166_1}
                          onClick={() => {
                            setSelectedCountry(country.iso_3166_1)
                            setIsDropdownOpen(false)
                            setSearchTerm('')
                          }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors ${
                            selectedCountry === country.iso_3166_1 ? 'bg-gray-700 text-blue-400' : 'text-gray-300'
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
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center">
          <div className="text-gray-400 mb-2">
            <Tv className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-lg">Not available in {selectedCountryName}</p>
            <p className="text-sm mt-2">Try selecting a different country to see available streaming options.</p>
          </div>
        </div>
      </motion.section>
    )
  }

  return (
    <motion.section
      className="mb-8 sm:mb-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold">Where to Watch</h2>
        
        {/* Country Selector */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg border border-gray-600 transition-colors min-w-[180px] justify-between"
          >
            <span className="text-sm font-medium">{selectedCountryName}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
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
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                    {filteredCountries.map((country) => (
                      <button
                        key={country.iso_3166_1}
                        onClick={() => {
                          setSelectedCountry(country.iso_3166_1)
                          setIsDropdownOpen(false)
                          setSearchTerm('')
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors ${
                          selectedCountry === country.iso_3166_1 ? 'bg-gray-700 text-blue-400' : 'text-gray-300'
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
      </div>

      <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
        {renderProviderGroup(
          currentCountryProviders.flatrate || [],
          'Stream',
          <Play className="w-4 h-4 text-green-400" />,
          'green'
        )}

        {renderProviderGroup(
          currentCountryProviders.rent || [],
          'Rent',
          <ShoppingCart className="w-4 h-4 text-blue-400" />,
          'blue'
        )}

        {renderProviderGroup(
          currentCountryProviders.buy || [],
          'Buy',
          <ShoppingCart className="w-4 h-4 text-purple-400" />,
          'purple'
        )}

        {renderProviderGroup(
          currentCountryProviders.ads || [],
          'Free with Ads',
          <Tv className="w-4 h-4 text-yellow-400" />,
          'yellow'
        )}

        {!currentCountryProviders.flatrate && 
         !currentCountryProviders.rent && 
         !currentCountryProviders.buy && 
         !currentCountryProviders.ads && (
          <div className="text-center py-8">
            <Tv className="w-12 h-12 mx-auto mb-3 text-gray-500" />
            <p className="text-gray-400">No streaming options available in {selectedCountryName}</p>
            <p className="text-sm text-gray-500 mt-1">Try selecting a different country</p>
          </div>
        )}
      </div>
    </motion.section>
  )
}
