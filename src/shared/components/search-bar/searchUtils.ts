import type { SizeClasses } from './SearchBarTypes'

export function getSizeClasses(size: 'sm' | 'md' | 'lg'): SizeClasses {
  switch (size) {
    case 'sm':
      return {
        container: 'w-[70vw] sm:w-80 max-w-sm',
        input: 'px-3 py-2 text-sm',
        icon: 'w-4 h-4 ml-3',
        clearButton: 'p-1 mr-1',
        clearIcon: 'w-4 h-4',
      }
    case 'lg':
      return {
        container: 'w-[85vw] sm:w-full sm:min-w-96 sm:max-w-5xl max-w-lg',
        input: 'px-3 py-3 sm:px-5 sm:py-4 text-base sm:text-lg',
        icon: 'w-5 h-5 sm:w-6 sm:h-6 ml-3 sm:ml-4',
        clearButton: 'p-1.5 sm:p-2 mr-1.5 sm:mr-2',
        clearIcon: 'w-5 h-5 sm:w-6 sm:h-6',
      }
    default: // md
      return {
        container: 'w-[80vw] sm:w-full sm:min-w-96 sm:max-w-5xl max-w-md',
        input: 'px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base',
        icon: 'w-4 h-4 sm:w-5 sm:h-5 ml-3 sm:ml-4',
        clearButton: 'p-1.5 sm:p-2 mr-1.5 sm:mr-2',
        clearIcon: 'w-4 h-4 sm:w-5 sm:h-5',
      }
  }
}
