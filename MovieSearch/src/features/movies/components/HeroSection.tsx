import { ChevronLeft, ChevronRight, Play, Info, Star, Menu, X, Search } from 'lucide-react'
import { useState, useEffect, useRef, useCallback } from 'react'

import { movieService } from '../services/movie.service'
import type { Movie } from '../types/movie.types'

import { Button } from '@/shared/components/ui/button'
import { API_CONFIG, IMAGE_SIZES } from '@/shared/constants/api.constants'

interface HeroSectionProps {
  onSearchClick?: () => void
  onTrendingClick?: () => void
  onTopRatedClick?: () => void
  onGenresClick?: () => void
}

export function HeroSection({ onSearchClick, onTrendingClick, onTopRatedClick, onGenresClick }: HeroSectionProps) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isInView, setIsInView] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const currentMovie = movies[currentIndex]
  const heroRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const nextMovie = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length)
      setTimeout(() => setIsTransitioning(false), 100) // Allow content to settle
    }, 150) // Half of transition duration
    
    // Reset auto-carousel timer when manually navigating
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        if (!isTransitioning) {
          setIsTransitioning(true)
          setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % movies.length)
            setTimeout(() => setIsTransitioning(false), 100)
          }, 150)
        }
      }, 3000)
    }
  }, [movies.length, isTransitioning])

  const prevMovie = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length)
      setTimeout(() => setIsTransitioning(false), 100) // Allow content to settle
    }, 150) // Half of transition duration
    
    // Reset auto-carousel timer when manually navigating
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        if (!isTransitioning) {
          setIsTransitioning(true)
          setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % movies.length)
            setTimeout(() => setIsTransitioning(false), 100)
          }, 150)
        }
      }, 3000)
    }
  }, [movies.length, isTransitioning])

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        setIsLoading(true)
        const response = await movieService.getPopularMovies(1)
        setMovies(response.results.slice(0, 5)) // Get top 5 popular movies
        setError(null)
      } catch {
        setError('Failed to fetch movies')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPopularMovies()
  }, [])

  // Auto-carousel functionality
  useEffect(() => {
    if (!movies.length || isPaused || !isInView || isTransitioning) return

    intervalRef.current = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % movies.length)
        setTimeout(() => setIsTransitioning(false), 100)
      }, 150)
    }, 3000) // Change every 3 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [movies.length, isPaused, isInView, isTransitioning])

  // Intersection Observer to detect if hero section is in view
  useEffect(() => {
    if (!heroRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      {
        threshold: 0.5, // At least 50% of the component should be visible
      }
    )

    observer.observe(heroRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isInView || movies.length <= 1) return

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        prevMovie()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        nextMovie()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isInView, movies.length, nextMovie, prevMovie])

  const goToMovie = (index: number) => {
    if (isTransitioning || index === currentIndex) return
    setIsTransitioning(true)
    
    setTimeout(() => {
      setCurrentIndex(index)
      setTimeout(() => setIsTransitioning(false), 100)
    }, 150)
    
    // Pause auto-carousel when manually selecting a movie
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 5000) // Resume after 5 seconds
  }

  const getBackdropUrl = (backdropPath: string | null) => {
    if (!backdropPath) return '/api/placeholder/1920/1080'
    return `${API_CONFIG.IMAGE_BASE_URL}/${IMAGE_SIZES.BACKDROP.W1280}${backdropPath}`
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return `${text.substring(0, maxLength)}...`
  }

  if (isLoading) {
    return (
      <div className="relative w-full h-screen bg-gradient-to-r from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (error || !currentMovie) {
    return (
      <div className="relative w-full h-screen bg-gradient-to-r from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-red-400 text-xl">{error || 'No movies available'}</div>
      </div>
    )
  }

  return (
    <div 
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={getBackdropUrl(currentMovie.backdrop_path)}
          alt={currentMovie.title}
          className={`w-full h-full object-cover transition-all duration-300 ${
            isTransitioning ? 'opacity-80 scale-105' : 'opacity-100 scale-100'
          }`}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <button 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm w-full h-full"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close menu"
          ></button>
          
          {/* Sidebar */}
          <div className="absolute left-0 top-0 h-full w-64 bg-black/90 backdrop-blur-md border-r border-white/20 p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-white text-lg font-semibold">Menu</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                aria-label="Close menu"
                className="text-white hover:text-gray-300 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="space-y-4">
              <button 
                onClick={() => {
                  setIsSidebarOpen(false)
                  onTrendingClick?.()
                }}
                className="w-full text-left text-white/90 hover:text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-all"
              >
                Trending
              </button>
              <button 
                onClick={() => {
                  setIsSidebarOpen(false)
                  onTopRatedClick?.()
                }}
                className="w-full text-left text-white/90 hover:text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-all"
              >
                Top Rated
              </button>
              <button 
                onClick={() => {
                  setIsSidebarOpen(false)
                  onGenresClick?.()
                }}
                className="w-full text-left text-white/90 hover:text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-all"
              >
                Genres
              </button>
              <button
                onClick={() => {
                  setIsSidebarOpen(false)
                  onSearchClick?.()
                }}
                className="w-full text-left text-white/90 hover:text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-all flex items-center"
              >
                <Search className="w-4 h-4 mr-3" />
                Search Movies
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Navigation Bar */}
      <nav className="relative z-20 flex items-center justify-between px-4 md:px-8 py-6">
        <div className="flex items-center space-x-4 md:space-x-8">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open menu"
            className="md:hidden text-white hover:text-gray-300 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          {/* Logo */}
          <h1 className="text-xl md:text-2xl font-bold text-white">
            <span className="text-red-500">Movie</span>Search
          </h1>
          
          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={onTrendingClick}
              className="text-white/90 hover:text-white transition-colors"
            >
              Trending
            </button>
            <button 
              onClick={onTopRatedClick}
              className="text-white/90 hover:text-white transition-colors"
            >
              Top Rated
            </button>
            <button 
              onClick={onGenresClick}
              className="text-white/90 hover:text-white transition-colors"
            >
              Genres
            </button>
          </div>
        </div>

        {/* Search Button - Responsive */}
        <div className="flex items-center space-x-2">
          {/* Mobile Search Icon */}
          <button
            onClick={onSearchClick}
            aria-label="Search movies"
            className="md:hidden bg-black/60 backdrop-blur-md rounded-lg p-2 text-white/80 hover:text-white transition-colors border border-white/20"
          >
            <Search className="w-5 h-5" />
          </button>
          
          {/* Desktop Search Bar */}
          <button
            onClick={onSearchClick}
            className="hidden md:block bg-black/60 backdrop-blur-md rounded-xl px-4 py-2 text-white/80 hover:text-white transition-colors border border-white/20"
          >
            Search movies...
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16 lg:px-24">
        <div className={`max-w-2xl transition-all duration-300 ${
          isTransitioning 
            ? 'opacity-0 transform translate-x-8' 
            : 'opacity-100 transform translate-x-0'
        }`}>
          {/* Now Playing Badge */}
          <div className="inline-flex items-center bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
            Now Playing
          </div>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex items-center bg-yellow-500 text-black px-2 py-1 rounded-lg">
              <Star className="w-4 h-4 mr-1 fill-current" />
              <span className="font-bold">{currentMovie.vote_average.toFixed(1)}</span>
            </div>
          </div>

          {/* Movie Title */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            {currentMovie.title}
          </h2>

          {/* Overview */}
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
            {truncateText(currentMovie.overview, 200)}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button 
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-xl flex items-center justify-center"
              size="lg"
            >
              <Play className="w-5 h-5 mr-2 fill-current" />
              Watch Trailer
            </Button>
            <Button 
              variant="outline"
              className="border-2 border-white/80 bg-black/40 backdrop-blur-md text-white hover:bg-white hover:text-black px-8 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-xl"
              size="lg"
            >
              <Info className="w-5 h-5 mr-2" />
              More Info
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {movies.length > 1 && (
        <>
          <button
            onClick={prevMovie}
            aria-label="Previous movie"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 backdrop-blur-md hover:bg-black/80 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextMovie}
            aria-label="Next movie"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 backdrop-blur-md hover:bg-black/80 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Pagination Dots */}
      {movies.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {movies.map((_, index) => (
            <button
              key={index}
              onClick={() => goToMovie(index)}
              aria-label={`Go to movie ${index + 1}`}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
