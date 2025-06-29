import { useRef, useCallback } from 'react'

interface UseHorizontalScrollReturn {
  scrollRef: React.RefObject<HTMLDivElement>
  scrollLeft: () => void
  scrollRight: () => void
  handleWheel: (e: React.WheelEvent) => void
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

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (scrollRef.current && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault()
      scrollRef.current.scrollLeft += e.deltaY * 0.5
    }
  }, [])

  return {
    scrollRef,
    scrollLeft,
    scrollRight,
    handleWheel
  }
}