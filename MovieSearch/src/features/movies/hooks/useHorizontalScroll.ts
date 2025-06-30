import { useRef, useCallback } from 'react'

interface UseHorizontalScrollReturn {
  scrollRef: React.RefObject<HTMLDivElement | null>
  scrollLeft: () => void
  scrollRight: () => void
}

export function useHorizontalScroll(scrollAmount = 300): UseHorizontalScrollReturn {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollLeft = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
    }
  }, [scrollAmount])

  const scrollRight = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }, [scrollAmount])

  return {
    scrollRef,
    scrollLeft,
    scrollRight
  }
}