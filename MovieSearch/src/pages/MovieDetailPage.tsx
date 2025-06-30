import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, Star, Play } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { CastCard, MovieCard, ProductionLogo, MovieDetailsGrid, CollectionSection } from './components'

import { movieService } from '@/features/movies/services/movie.service'
import type { MovieDetailsExtended, Cast, Movie, CollectionDetails } from '@/features/movies/types/movie.types'
import { getImageUrl, getBackdropUrl } from '@/features/movies/utils/imageUtils'

export function MovieDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [movie, setMovie] = useState<MovieDetailsExtended | null>(null)
  const [credits, setCredits] = useState<{ cast: Cast[] } | null>(null)
  const [recommendations, setRecommendations] = useState<Movie[]>([])
  const [collection, setCollection] = useState<CollectionDetails | null>(null)
  const [loadingCollection, setLoadingCollection] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setError('Movie ID is required')
      setLoading(false)
      return
    }

    const fetchMovieData = async () => {
      try {
        setLoading(true)
        setError(null)
        // Reset collection state when fetching new movie data
        setCollection(null)
        setLoadingCollection(false)

        const movieId = parseInt(id, 10)
        if (isNaN(movieId)) {
          throw new Error('Invalid movie ID')
        }

        const [movieDetails, movieCredits, movieRecommendations] = await Promise.all([
          movieService.getMovieDetailsExtended(movieId),
          movieService.getMovieCredits(movieId),
          movieService.getMovieRecommendations(movieId)
        ])

        setMovie(movieDetails)
        setCredits(movieCredits)
        setRecommendations(movieRecommendations.results.slice(0, 10))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch movie details')
      } finally {
        setLoading(false)
      }
    }

    fetchMovieData()
  }, [id])

  const handleBack = () => {
    navigate(-1)
  }

  const handleMovieClick = (selectedMovie: Movie) => {
    navigate(`/movie/${selectedMovie.id}`)
  }

  const handleCastClick = (cast: Cast) => {
    // In a real app, you might navigate to a person details page
    void cast
  }

  const handleTrailerClick = () => {
    // In a real app, you might open a modal with the trailer
    if (movie?.homepage) {
      window.open(movie.homepage, '_blank')
    }
  }

  const handleFetchCollection = async () => {
    if (!movie?.belongs_to_collection) return

    try {
      setLoadingCollection(true)
      const collectionData = await movieService.getCollection(movie.belongs_to_collection.id)
      setCollection(collectionData)
    } catch {
      // Reset collection state on error
      setCollection(null)
      // In a production app, you might want to show a toast notification or error message
    } finally {
      setLoadingCollection(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading movie details...</p>
        </motion.div>
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-6xl mb-4">🎬</div>
          <h2 className="text-2xl font-bold mb-2">Movie Not Found</h2>
          <p className="text-gray-400 mb-6">{error || 'The requested movie could not be found.'}</p>
          <button
            onClick={handleBack}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </motion.div>
      </div>
    )
  }

  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : ''
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : 'N/A'
  const topCast = credits?.cast.slice(0, 10) || []

  const backdropUrl = movie.backdrop_path 
    ? getBackdropUrl(movie.backdrop_path, 'ORIGINAL')
    : ''

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <motion.section
        className="relative h-[85vh] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Backdrop Image - Make sure this is the bottom layer */}
        {backdropUrl && (
          <div className="absolute inset-0 z-0 bg-gray-900">
            <img
              src={backdropUrl}
              alt={movie.title}
              className="w-full h-full object-cover object-center"
              style={{ objectPosition: '50% 25%' }}
              onLoad={() => {
                // Backdrop loaded successfully
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>
        )}
        
        {/* Fallback Background - only show if no backdrop */}
        {!backdropUrl && (
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-800 to-gray-900" />
        )}
        
        {/* Dark Overlay - lighter so we can see the image */}
        <div className="absolute inset-0 z-10 bg-black/30" />
        
        {/* Content Container - highest z-index */}
        <div className="absolute inset-0 z-20 flex items-end">
          <div className="container mx-auto px-6 pb-8">
            <div className="flex items-end gap-8">
              {/* Movie Poster */}
              <motion.div
                className="flex-shrink-0"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <img
                  src={movie.poster_path ? getImageUrl(movie.poster_path, 'W500') : '/placeholder-movie.jpg'}
                  alt={movie.title}
                  className="w-64 h-96 object-cover rounded-lg shadow-2xl"
                />
              </motion.div>

              {/* Movie Info */}
              <motion.div
                className="flex-1 max-w-2xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h1 className="text-5xl font-bold mb-2">{movie.title}</h1>
                {movie.tagline && (
                  <p className="text-xl text-gray-300 italic mb-4">{movie.tagline}</p>
                )}
                
                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-300">{year}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-300">{runtime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="text-gray-300">{rating}/10</span>
                  </div>
                </div>

                {movie.genres && movie.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-red-600/90 text-white rounded-full text-sm border border-blue-600/30"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <button
                    onClick={handleTrailerClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2 font-semibold"
                  >
                    <Play className="w-5 h-5" />
                    Watch Trailer
                  </button>
                  <button
                    onClick={handleBack}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Overview Section */}
        {movie.overview && (
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-6">Overview</h2>
            <div className="bg-gray-800 rounded-lg p-8 mx-4 shadow-lg border border-gray-700">
              <p className="text-gray-300 text-lg leading-relaxed">
                {movie.overview}
              </p>
            </div>
          </motion.section>
        )}

        {/* Collection Section */}
        {movie.belongs_to_collection && (
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">Part of Collection</h2>
            </div>
            
            {!collection ? (
              <div className="relative rounded-xl overflow-hidden border border-purple-500/20">
                {/* Backdrop Image with Blur */}
                {movie.belongs_to_collection.backdrop_path && (
                  <div className="absolute inset-0">
                    <img
                      src={getBackdropUrl(movie.belongs_to_collection.backdrop_path, 'W1280')}
                      alt={movie.belongs_to_collection.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
                  </div>
                )}
                
                {/* Fallback gradient background */}
                {!movie.belongs_to_collection.backdrop_path && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-blue-900/40" />
                )}
                
                {/* Content overlay */}
                <div className="relative z-10 p-8 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
                  <div className="flex items-center gap-4 mb-4">
                    {movie.belongs_to_collection.poster_path && (
                      <img
                        src={getImageUrl(movie.belongs_to_collection.poster_path, 'W185')}
                        alt={movie.belongs_to_collection.name}
                        className="w-16 h-24 object-cover rounded-lg shadow-2xl border-2 border-white/20"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2 drop-shadow-lg">
                        {movie.belongs_to_collection.name}
                      </h3>
                      <p className="text-gray-200 mb-4 drop-shadow-sm">
                        This movie is part of the {movie.belongs_to_collection.name} collection.
                      </p>
                      <button
                        onClick={handleFetchCollection}
                        disabled={loadingCollection}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 text-white px-6 py-3 rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-xl disabled:cursor-not-allowed backdrop-blur-sm"
                      >
                        {loadingCollection ? (
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Loading Collection...
                          </div>
                        ) : (
                          'View All Movies'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <CollectionSection collection={collection} onMovieClick={handleMovieClick} />
            )}
          </motion.section>
        )}

        {/* Movie Details Grid */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-6">Movie Details</h2>
          <MovieDetailsGrid movie={movie} />
        </motion.section>

        {/* Cast Section */}
        {topCast.length > 0 && (
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-6">Cast</h2>
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-6">
              {topCast.map((actor) => (
                <CastCard
                  key={actor.id}
                  cast={actor}
                  onClick={handleCastClick}
                />
              ))}
            </div>
          </motion.section>
        )}

        {/* Production Companies */}
        {movie.production_companies && movie.production_companies.length > 0 && (
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">Production Companies</h2>
            <div className="flex flex-wrap gap-8">
              {movie.production_companies.map((company) => (
                <ProductionLogo key={company.id} company={company} />
              ))}
            </div>
          </motion.section>
        )}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {recommendations.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={handleMovieClick}
                />
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  )
}
