import { Menu, X } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

interface NavbarProps {
  onTrendingClick: () => void
  onTopRatedClick: () => void
  onUpcomingClick?: () => void
  onDiscoverClick?: () => void
}

export function Navbar({ 
  onTrendingClick, 
  onTopRatedClick, 
  onUpcomingClick, 
  onDiscoverClick 
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside and handle body scroll
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden'
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.body.style.overflow = 'unset'
        document.removeEventListener('mousedown', handleClickOutside)
      }
    } else {
      // Restore body scroll when menu is closed
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const handleNavClick = (action: () => void) => {
    action()
    setIsMenuOpen(false) // Close menu after navigation
  }

  const handleUpcoming = () => {
    if (onUpcomingClick) {
      onUpcomingClick()
    }
    setIsMenuOpen(false)
  }

  const handleDiscover = () => {
    if (onDiscoverClick) {
      onDiscoverClick()
    }
    // Discover functionality will be implemented later
    setIsMenuOpen(false)
  }

  return (
    <nav className="absolute top-4 left-4 z-30">
      <div className="flex items-center space-x-4 lg:space-x-8">
        {/* Mobile/Tablet Menu Button - show on left of logo for screens below 1024px */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden bg-black/40 backdrop-blur-md rounded-lg p-2 text-white/80 hover:text-white transition-colors border border-white/10"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-4 h-4 md:w-5 md:h-5" /> : <Menu className="w-4 h-4 md:w-5 md:h-5" />}
        </button>

        {/* Logo */}
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
          <span className="text-red-500">Movie</span>
          <span className="text-white">Search</span>
        </h1>

        {/* Desktop Navigation - only show on large screens (1024px+) */}
        <div className="hidden lg:flex items-center space-x-6">
          <button
            onClick={() => handleNavClick(onTrendingClick)}
            className="text-white/80 hover:text-white transition-colors duration-200 font-medium"
          >
            Trending
          </button>
          <button
            onClick={() => handleNavClick(onTopRatedClick)}
            className="text-white/80 hover:text-white transition-colors duration-200 font-medium"
          >
            Top Rated
          </button>
          <button
            onClick={handleUpcoming}
            className="text-white/80 hover:text-white transition-colors duration-200 font-medium"
          >
            Upcoming
          </button>
          <button
            onClick={handleDiscover}
            className="text-white/80 hover:text-white transition-colors duration-200 font-medium"
          >
            Discover
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Dropdown Menu - Left Side 60% Width */}
      {isMenuOpen && (
        <>
          {/* Backdrop overlay */}
          <button 
            className="lg:hidden fixed inset-0 bg-black/50 z-40" 
            onClick={() => setIsMenuOpen(false)} 
            aria-label="Close menu"
          />
          
          {/* Menu panel */}
          <div 
            ref={menuRef}
            className="lg:hidden fixed top-0 left-0 h-screen w-[60%] bg-gray-900/95 backdrop-blur-lg z-50 border-r border-gray-700/50"
          >
            {/* Logo at top of dropdown */}
            <div className="px-6 py-6 border-b border-gray-700/30">
              <h1 className="text-xl font-bold">
                <span className="text-red-500">Movie</span>
                <span className="text-white">Search</span>
              </h1>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Menu Items */}
            <div className="py-4">
              <nav className="space-y-1">
                <button
                  onClick={() => handleNavClick(onTrendingClick)}
                  className="flex items-center w-full px-6 py-3 text-left text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors font-medium"
                >
                  Trending
                </button>
                <button
                  onClick={() => handleNavClick(onTopRatedClick)}
                  className="flex items-center w-full px-6 py-3 text-left text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors font-medium"
                >
                  Top Rated
                </button>
                <button
                  onClick={handleUpcoming}
                  className="flex items-center w-full px-6 py-3 text-left text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors font-medium"
                >
                  Upcoming
                </button>
                <button
                  onClick={handleDiscover}
                  className="flex items-center w-full px-6 py-3 text-left text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors font-medium"
                >
                  Discover
                </button>
              </nav>
            </div>
          </div>
        </>
      )}
    </nav>
  )
}
