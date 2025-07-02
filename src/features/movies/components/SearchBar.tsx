import { useState, useCallback, useEffect, useRef } from 'react'

import { movieService } from '../services/movie.service'
import type { Movie } from '../types/movie.types'

import { Button } from '@/shared/components/ui/button'

interface SearchBarProps {
  onSearch: (query: string) => void
  onSearchDebounced?: (query: string) => void
  placeholder?: string
  isLoading?: boolean
  onSuggestionClick?: (movie: Movie) => void
}

export function SearchBar({
  onSearch,
  onSearchDebounced,
  placeholder = 'Search for movies...',
  isLoading = false,
  onSuggestionClick,
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Movie[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1)
  
  // Use useRef for debounce to avoid state updates and re-renders
  const debounceRef = useRef<NodeJS.Timeout | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      // Clear debounce timer on submit
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
        debounceRef.current = null
      }
      setShowSuggestions(false)
      onSearch(query.trim())
    }
  }, [query, onSearch])

  // Function to fetch suggestions
  const fetchSuggestions = useCallback(async (searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    try {
      const response = await movieService.searchMovies({
        query: searchQuery.trim(),
        page: 1,
        include_adult: false,
      })
      
      // Get first 5 results for suggestions
      const suggestionList = response.results.slice(0, 5)
      setSuggestions(suggestionList)
      setShowSuggestions(suggestionList.length > 0)
    } catch {
      // Silently handle error for suggestions
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [])

  // Handle suggestion click
  const handleSuggestionClick = useCallback((movie: Movie) => {
    setQuery(movie.title)
    setShowSuggestions(false)
    setSuggestions([])
    onSearch(movie.title)
    onSuggestionClick?.(movie)
  }, [onSearch, onSuggestionClick])

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedSuggestionIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedSuggestionIndex])
        } else {
          handleSubmit(e)
        }
        break
      case 'Escape':
        setShowSuggestions(false)
        setSelectedSuggestionIndex(-1)
        break
    }
  }, [showSuggestions, suggestions, selectedSuggestionIndex, handleSuggestionClick, handleSubmit])

  // Stabilized callback that doesn't cause re-renders
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setQuery(newQuery)
    setSelectedSuggestionIndex(-1)

    // Clear existing timer
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    // If query is too short, hide suggestions
    if (newQuery.trim().length < 2) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    // Set new timer for suggestions
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(newQuery)
    }, 300) // 300ms debounce

    // If debounced search is provided, use it
    if (onSearchDebounced && newQuery.trim().length >= 3) {
      onSearchDebounced(newQuery.trim())
    }
  }, [onSearchDebounced, fetchSuggestions]) // Add fetchSuggestions as dependency

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
        setSelectedSuggestionIndex(-1)
      }
    }

    if (showSuggestions) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [showSuggestions])

  // Cleanup on unmount
  useEffect(() => () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
  }, []) // Empty dependency array - only run on mount/unmount

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
        <div className="flex-1 relative">
          {/* Search Icon */}
          <div className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full pl-10 md:pl-12 pr-5 md:pr-6 py-3 md:py-4 text-base md:text-lg bg-white/10 backdrop-blur-md border border-white/20 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 text-white placeholder-gray-300 hover:bg-white/20"
            disabled={isLoading}
            autoComplete="off"
            spellCheck="false"
          />
          
          {/* Loading indicator inside input */}
          {isLoading && (
            <div className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-2 border-purple-400 border-t-transparent"></div>
            </div>
          )}

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div 
              ref={dropdownRef}
              className="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl z-50 max-h-80 overflow-y-auto"
            >
              {suggestions.map((movie, index) => (
                <button
                  key={movie.id}
                  onClick={() => handleSuggestionClick(movie)}
                  className={`w-full text-left px-4 py-3 hover:bg-white/10 transition-colors duration-200 flex items-center space-x-3 ${
                    index === selectedSuggestionIndex ? 'bg-white/10' : ''
                  } ${index === 0 ? 'rounded-t-xl' : ''} ${index === suggestions.length - 1 ? 'rounded-b-xl' : ''}`}
                >
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                      alt={movie.title}
                      className="w-8 h-12 object-cover rounded"
                    />
                  ) : (
                    <div className="w-8 h-12 bg-gray-600 rounded flex items-center justify-center">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4zM6 6v12h12V6H6z" />
                      </svg>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-gray-200 font-medium truncate">{movie.title}</div>
                    <div className="text-gray-400 text-sm truncate">
                      {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                      {movie.vote_average > 0 && (
                        <span className="ml-2">
                          ⭐ {movie.vote_average.toFixed(1)}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        
        <Button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="px-6 md:px-8 py-3 md:py-4 text-base md:text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 rounded-xl md:rounded-2xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap"
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-2 border-white border-t-transparent mr-2"></div>
              <span className="hidden sm:inline">Searching...</span>
              <span>...</span>
            </div>
          ) : (
            <div className="flex items-center">
              <svg className="w-4 h-4 md:w-5 md:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Search</span>
            </div>
          )}
        </Button>
      </div>
    </form>
  )
}
