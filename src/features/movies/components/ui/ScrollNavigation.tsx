import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ScrollNavigationProps {
  onScrollLeft: () => void
  onScrollRight: () => void
  className?: string
}

export function ScrollNavigation({ 
  onScrollLeft, 
  onScrollRight, 
  className = '' 
}: ScrollNavigationProps) {
  return (
    <>
      <button
        onClick={onScrollLeft}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 backdrop-blur-sm text-white p-2 rounded-full hover:bg-pink-500/80 transition-all duration-200 shadow-lg hover:shadow-pink-500/30 ${className}`}
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <button
        onClick={onScrollRight}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 backdrop-blur-sm text-white p-2 rounded-full hover:bg-pink-500/80 transition-all duration-200 shadow-lg hover:shadow-pink-500/30 ${className}`}
        aria-label="Scroll right"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </>
  )
}