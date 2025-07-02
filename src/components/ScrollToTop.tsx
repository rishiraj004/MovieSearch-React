import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToTop component that resets scroll position to top on route changes
 * Should be placed inside Router but before Routes
 */
export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Scroll to top when pathname changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Use 'instant' for immediate scroll without animation
    })
  }, [pathname])

  return null // This component doesn't render anything
}
