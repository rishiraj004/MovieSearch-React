import { useState, useCallback, useEffect, useRef } from 'react'

import { Button } from '@/shared/components/ui/button'

interface SearchBarProps {
  onSearch: (query: string) => void
  onSearchDebounced?: (query: string) => void
  placeholder?: string
  isLoading?: boolean
}

export function SearchBar({
  onSearch,
  onSearchDebounced,
  placeholder = 'Search for movies...',
  isLoading = false,
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  
  // Use useRef for debounce to avoid state updates and re-renders
  const debounceRef = useRef<NodeJS.Timeout | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      // Clear debounce timer on submit
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
        debounceRef.current = null
      }
      onSearch(query.trim())
    }
  }

  // Stabilized callback that doesn't cause re-renders
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setQuery(newQuery)

    // If debounced search is provided, use it
    if (onSearchDebounced && newQuery.trim().length >= 3) {
      // Clear existing timer
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }

      // Set new timer - this doesn't cause re-renders since it's in a ref
      debounceRef.current = setTimeout(() => {
        onSearchDebounced(newQuery.trim())
      }, 300) // 300ms debounce
    }
  }, [onSearchDebounced]) // Only onSearchDebounced as dependency

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
