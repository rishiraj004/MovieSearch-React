import type { MultiSearchItem } from '@/features/movies/types/movie.types'

export interface SearchBarProps {
  className?: string
  placeholder?: string
  size?: 'sm' | 'md' | 'lg'
  onResultClick?: () => void
}

export interface SearchInputProps {
  placeholder?: string
  size?: 'sm' | 'md' | 'lg'
  onResultClick?: () => void
}

export interface SizeClasses {
  container: string
  input: string
  icon: string
  clearButton: string
  clearIcon: string
}

export interface SearchResultProps {
  item: MultiSearchItem
  onClick: (item: MultiSearchItem) => void
}
