// FilterDropdown.tsx
import { SlidersHorizontal, X } from 'lucide-react'

import type { FilterDropdownProps } from './DiscoverPageTypes'

export function FilterDropdown({
  activeFilters,
  onToggleFilter,
  onResetFilters,
}: FilterDropdownProps) {
  return (
    <div className="absolute right-0 top-full mt-2 w-64 max-h-96 overflow-y-auto bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50 animate-fadeIn">
      <div className="p-3 border-b border-gray-700">
        <h3 className="text-sm font-medium text-gray-300">Quick Filters</h3>
      </div>

      <div className="p-2">
        {activeFilters.length > 0 ? (
          <div className="space-y-2">
            {activeFilters.map(filter => (
              <div
                key={filter.key}
                className="flex items-center justify-between py-1 px-2 hover:bg-gray-700 rounded-md"
              >
                <div>
                  <p className="text-sm font-medium text-white">
                    {filter.label}
                  </p>
                  <p className="text-xs text-gray-400">{filter.value}</p>
                </div>
                <button
                  onClick={() => onToggleFilter(filter.key)}
                  className="text-gray-400 hover:text-white p-1"
                  aria-label={`Remove ${filter.label} filter`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              onClick={onResetFilters}
              className="w-full text-center text-sm text-blue-400 hover:text-blue-300 mt-3 py-1 border-t border-gray-700 pt-2"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <p className="text-sm text-gray-400 py-2 text-center">
            No active filters
          </p>
        )}
      </div>

      <div className="p-3 border-t border-gray-700">
        <button
          onClick={() => onToggleFilter('show_advanced')}
          className="w-full text-center text-sm text-blue-400 hover:text-blue-300 flex items-center justify-center gap-1"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Advanced Filter Panel</span>
        </button>
      </div>
    </div>
  )
}
