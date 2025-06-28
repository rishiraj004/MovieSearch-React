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
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex gap-2 items-center">
        <div className="flex-1">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            disabled={isLoading}
            autoComplete="off"
            spellCheck="false"
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="px-6 py-3 text-lg"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </div>
    </form>
  )
}
