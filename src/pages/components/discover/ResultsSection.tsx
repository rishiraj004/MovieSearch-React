// ResultsSection.tsx
import type { MediaType } from './DiscoverPageTypes'
import { MediaGrid } from './MediaGrid'
import { Pagination } from './Pagination'

import type { Movie, TVShow } from '@/features/movies/types/movie.types'

interface ResultsSectionProps {
  mediaType: MediaType
  results: (Movie | TVShow)[]
  isLoading: boolean
  totalResults: number
  currentPage: number
  totalPages: number
  onItemClick: (item: Movie | TVShow) => void
  onPageChange: (page: number) => void
  searchQuery?: string | null
}

export function ResultsSection({
  mediaType,
  results,
  isLoading,
  totalResults,
  currentPage,
  totalPages,
  onItemClick,
  onPageChange,
  searchQuery,
}: ResultsSectionProps) {
  return (
    <div className="flex-1 animate-fadeIn">
      {/* Results Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {isLoading ? (
            <span className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-blue-500"></div>
              Loading...
            </span>
          ) : searchQuery ? (
            `Results for "${searchQuery}" (${totalResults})`
          ) : (
            `${totalResults} ${mediaType === 'movie' ? 'Movies' : 'TV Shows'} Found`
          )}
        </h2>
      </div>

      {/* Results Grid */}
      <MediaGrid
        items={results}
        isLoading={isLoading}
        mediaType={mediaType}
        onItemClick={onItemClick}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  )
}
