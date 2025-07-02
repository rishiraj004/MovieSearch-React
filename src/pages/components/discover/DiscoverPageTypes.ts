// DiscoverPageTypes.ts
// Types specific to the Discover feature

export type MediaType = 'movie' | 'tv'

export interface FilterBadgeProps {
  label: string
  value: string
  onRemove: () => void
}

export interface FilterDropdownProps {
  activeFilters: { key: string; label: string; value: string }[]
  onToggleFilter: (key: string) => void
  onResetFilters: () => void
}

export interface ActiveFilter {
  key: string
  label: string
  value: string
}
