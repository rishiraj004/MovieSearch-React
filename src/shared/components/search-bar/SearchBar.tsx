import { Search, X } from 'lucide-react'
import { useState } from 'react'

import { SearchInput } from './SearchInput'

export function SearchBar() {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)

  return (
    <>
      {/* Mobile Search - Full Screen Overlay */}
      {isMobileSearchOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-gray-900/95 backdrop-blur-md p-3 sm:p-4 global-search-overlay">
          <div className="w-full max-w-sm sm:max-w-md mx-auto">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h2 className="text-white text-base sm:text-lg font-semibold">
                Search
              </h2>
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="text-gray-400 hover:text-white transition-colors rounded-lg p-2"
                aria-label="Close search"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
            <SearchInput
              size="lg"
              className="w-full"
              placeholder="Search for movies, TV shows, or people..."
              onResultClick={() => setIsMobileSearchOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Search Bar Overlay - Top Right */}
      <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-30 global-search-overlay">
        {/* Mobile Search Icon - show on small and medium screens */}
        <button
          onClick={() => setIsMobileSearchOpen(true)}
          aria-label="Search movies"
          className="lg:hidden bg-black/40 backdrop-blur-md rounded-lg p-2.5 sm:p-3 text-white/80 hover:text-white transition-colors border border-white/10 cursor-pointer"
        >
          <Search className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Desktop Search Bar - only show on large screens */}
        <div className="hidden lg:block">
          <SearchInput
            size="md"
            className="bg-black/30 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl"
            placeholder="Search for movies, TV shows, or people..."
          />
        </div>
      </div>
    </>
  )
}
