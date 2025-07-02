// ActiveFilters.tsx
import type { ActiveFilter } from './DiscoverPageTypes'
import { FilterBadge } from './FilterBadge'

interface ActiveFiltersProps {
  activeFilters: ActiveFilter[]
  onFilterRemove: (key: string) => void
  onResetFilters: () => void
}

export function ActiveFilters({
  activeFilters,
  onFilterRemove,
  onResetFilters,
}: ActiveFiltersProps) {
  if (activeFilters.length === 0) {
    return null
  }

  return (
    <div className="bg-gray-800/50 border-b border-gray-700 py-3 animate-fadeIn">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-gray-400 text-sm">Active filters:</span>
          {activeFilters.map(filter => (
            <FilterBadge
              key={filter.key}
              label={filter.label}
              value={filter.value}
              onRemove={() => onFilterRemove(filter.key)}
            />
          ))}
          <button
            onClick={onResetFilters}
            className="text-sm text-blue-400 hover:text-blue-300 ml-2"
          >
            Reset all
          </button>
        </div>
      </div>
    </div>
  )
}
