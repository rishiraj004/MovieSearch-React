import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { movieService } from '../../services/movie.service'
import type { Movie } from '../../types/movie.types'

export function useHero() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isInView, setIsInView] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  // Animation state for slide-fade effect
  const [slideIndex, setSlideIndex] = useState(currentIndex)
  const [isSliding, setIsSliding] = useState(false)

  const currentMovie = movies[currentIndex]
  const heroRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const navigate = useNavigate()

  const nextMovie = useCallback(() => {
    if (!movies.length) return

    setCurrentIndex(prev => (prev + 1) % movies.length)

    // Reset auto-carousel timer when manually navigating
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % movies.length)
      }, 3000)
    }
  }, [movies.length])

  const prevMovie = useCallback(() => {
    if (!movies.length) return

    setCurrentIndex(prev => (prev - 1 + movies.length) % movies.length)

    // Reset auto-carousel timer when manually navigating
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % movies.length)
      }, 3000)
    }
  }, [movies.length])

  // Fetch popular movies on component mount
  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        setIsLoading(true)
        const response = await movieService.getPopularMovies(1)
        const moviesList = response.results.slice(0, 5) // Get top 5 popular movies
        setMovies(moviesList)

        // Preload all background images
        moviesList.forEach(movie => {
          const img = new Image()
          img.src = movie.backdrop_path
            ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
            : ''
        })

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
    if (!movies.length || isPaused || !isInView) return

    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % movies.length)
    }, 3000) // Change every 3 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [movies.length, isPaused, isInView])

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
    if (index === currentIndex || index >= movies.length) return

    // Instant transition - no animation delay
    setCurrentIndex(index)

    // Pause auto-carousel when manually selecting a movie
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 5000) // Resume after 5 seconds
  }

  // Handle trailer click
  const handleTrailerClick = useCallback(async () => {
    if (!currentMovie) return

    try {
      const videosResponse = await movieService.getMovieVideos(currentMovie.id)
      const movieVideos = videosResponse.results

      // First, try to find an official trailer
      const officialTrailer = movieVideos.find(
        video =>
          video.type === 'Trailer' &&
          video.official === true &&
          video.site === 'YouTube'
      )

      // If no official trailer, find any trailer
      const anyTrailer = movieVideos.find(
        video => video.type === 'Trailer' && video.site === 'YouTube'
      )

      // If no trailer, find any video
      const anyVideo = movieVideos.find(video => video.site === 'YouTube')

      const selectedVideo = officialTrailer || anyTrailer || anyVideo

      if (selectedVideo) {
        const videoUrl = `https://www.youtube.com/watch?v=${selectedVideo.key}`
        window.open(videoUrl, '_blank')
      }
    } catch {
      // Silently handle error - trailer functionality is optional
    }
  }, [currentMovie])

  // Handle more info click
  const handleMoreInfoClick = useCallback(() => {
    if (currentMovie) {
      navigate(`/movie/${currentMovie.id}`)
    }
  }, [currentMovie, navigate])

  // Animate slide-fade on movie change (only for image)
  useEffect(() => {
    if (currentIndex === slideIndex) return

    setIsSliding(true)
    const timeout = setTimeout(() => {
      setSlideIndex(currentIndex)
      setIsSliding(false)
    }, 400) // 400ms slide duration

    return () => clearTimeout(timeout)
  }, [currentIndex, slideIndex])

  return {
    movies,
    currentMovie,
    currentIndex,
    slideIndex,
    isSliding,
    isLoading,
    error,
    isPaused,
    setIsPaused,
    heroRef,
    nextMovie,
    prevMovie,
    goToMovie,
    handleTrailerClick,
    handleMoreInfoClick,
  }
}
