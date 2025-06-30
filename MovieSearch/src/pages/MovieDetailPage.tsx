import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, Star, Play, Camera, Edit, Megaphone } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { CastCard, ProductionLogo, MovieDetailsGrid, CollectionSection, CrewSection, CastCrewDropdown, ReviewsSection, HorizontalMovieSection, VideosSection } from './components'

import { movieService } from '@/features/movies/services/movie.service'
import type { MovieDetailsExtended, Cast, Movie, CollectionDetails, Credits, Review, Video } from '@/features/movies/types/movie.types'
import { filterCrewByJob } from '@/features/movies/utils/crewUtils'
import { getImageUrl, getBackdropUrl } from '@/features/movies/utils/imageUtils'

export function MovieDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [movie, setMovie] = useState<MovieDetailsExtended | null>(null)
  const [credits, setCredits] = useState<Credits | null>(null)
  const [recommendations, setRecommendations] = useState<Movie[]>([])
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [reviewsTotal, setReviewsTotal] = useState(0)
  const [videos, setVideos] = useState<Video[]>([])
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

        const [movieDetails, movieCredits, movieRecommendations, movieSimilar, movieReviews, movieVideos] = await Promise.all([
          movieService.getMovieDetailsExtended(movieId),
          movieService.getMovieCredits(movieId),
          movieService.getMovieRecommendations(movieId),
          movieService.getSimilarMovies(movieId),
          movieService.getMovieReviews(movieId),
          movieService.getMovieVideos(movieId)
        ])

        setMovie(movieDetails)
        setCredits(movieCredits)
        setRecommendations(movieRecommendations.results.slice(0, 10))
        setSimilarMovies(movieSimilar.results.slice(0, 10))
        setReviews(movieReviews.results)
        setVideos(movieVideos.results)
        setReviewsTotal(movieReviews.total_results)
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
  
  // Get filtered crew members
  const { directors, producers, writers } = credits ? filterCrewByJob(credits.crew) : { directors: [], producers: [], writers: [] }

  const backdropUrl = movie.backdrop_path 
    ? getBackdropUrl(movie.backdrop_path, 'ORIGINAL')
    : ''

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <motion.section
        className="relative min-h-[85vh] sm:min-h-[80vh] lg:min-h-[95vh] overflow-hidden"
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
        <div className="absolute inset-0 z-10 bg-black/40 sm:bg-black/30" />
        
        {/* Content Container - highest z-index */}
        <div className="absolute inset-0 z-20 flex items-end">
          <div className="container mx-auto px-4 sm:px-6 pb-6 sm:pb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6 lg:gap-8">
              {/* Movie Poster */}
              <motion.div
                className="flex-shrink-0 order-1 sm:order-none"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <img
                  src={movie.poster_path ? getImageUrl(movie.poster_path, 'W500') : '/placeholder-movie.jpg'}
                  alt={movie.title}
                  className="w-40 h-60 sm:w-48 sm:h-72 lg:w-64 lg:h-96 object-cover rounded-lg shadow-2xl mx-auto sm:mx-0"
                />
              </motion.div>

              {/* Movie Info */}
              <motion.div
                className="flex-1 max-w-full sm:max-w-2xl text-center sm:text-left order-2 sm:order-none"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 leading-tight">{movie.title}</h1>
                {movie.tagline && (
                  <p className="text-base sm:text-lg lg:text-xl text-gray-300 italic mb-3 sm:mb-4">{movie.tagline}</p>
                )}
                
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <span className="text-sm sm:text-base text-gray-300">{year}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <span className="text-sm sm:text-base text-gray-300">{runtime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                    <span className="text-sm sm:text-base text-gray-300">{rating}/10</span>
                  </div>
                </div>

                {movie.genres && movie.genres.length > 0 && (
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4 sm:mb-6">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-2 py-1 sm:px-3 sm:py-1 bg-red-600/90 text-white rounded-full text-xs sm:text-sm border border-blue-600/30"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                  <button
                    onClick={handleTrailerClick}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg transition-colors inline-flex items-center justify-center gap-2 font-semibold text-sm sm:text-base"
                  >
                    <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                    Watch Trailer
                  </button>
                  <button
                    onClick={handleBack}
                    className="w-full sm:w-auto bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg transition-colors inline-flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    Back
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Overview Section */}
        {movie.overview && (
          <motion.section
            className="mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center sm:text-left">Overview</h2>
            <div className="bg-gray-800 rounded-lg p-4 sm:p-6 lg:p-8 mx-0 sm:mx-4 shadow-lg border border-gray-700">
              <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
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
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">Part of Collection</h2>
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
          className="mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center sm:text-left">Movie Details</h2>
          <MovieDetailsGrid movie={movie} />
        </motion.section>

        {/* Cast Section */}
        {topCast.length > 0 && (
          <motion.section
            className="mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 sm:gap-0 mb-4 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">Cast</h2>
              {credits && (
                <CastCrewDropdown 
                  cast={credits.cast} 
                  crew={credits.crew}
                  onPersonClick={(person) => {
                    // In a real app, you might navigate to a person details page
                    void person
                  }}
                />
              )}
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3 sm:gap-4 lg:gap-6">
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

        {/* Crew Section */}
        {credits && (directors.length > 0 || producers.length > 0 || writers.length > 0) && (
          <motion.section
            className="mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center sm:text-left">Key Crew</h2>
            <div className="space-y-4 sm:space-y-6">
              <CrewSection 
                title="Directors" 
                crew={directors} 
                icon={Camera}
                color="blue"
              />
              <CrewSection 
                title="Producers" 
                crew={producers} 
                icon={Megaphone}
                color="purple"
              />
              <CrewSection 
                title="Writers" 
                crew={writers} 
                icon={Edit}
                color="green"
              />
            </div>
          </motion.section>
        )}

        {/* Videos Section */}
        <VideosSection 
          videos={videos}
          onVideoClick={(video) => {
            // Open video in new tab
            const videoUrl = video.site === 'YouTube' 
              ? `https://www.youtube.com/watch?v=${video.key}`
              : '#'
            window.open(videoUrl, '_blank')
          }}
        />

        {/* Reviews Section */}
        {reviews.length > 0 && (
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <ReviewsSection 
              reviews={reviews}
              totalReviews={reviewsTotal}
            />
          </motion.section>
        )}

        {/* Production Companies */}
        {movie.production_companies && movie.production_companies.length > 0 && (
          <motion.section
            className="mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center sm:text-left">Production Companies</h2>
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 lg:gap-8">
              {movie.production_companies.map((company) => (
                <ProductionLogo key={company.id} company={company} />
              ))}
            </div>
          </motion.section>
        )}

        {/* Recommendations - Horizontal Scrollable */}
        <HorizontalMovieSection
          title="You May Also Like"
          movies={recommendations}
          onMovieClick={handleMovieClick}
          delay={0.8}
        />

        {/* Similar Movies - Horizontal Scrollable */}
        <HorizontalMovieSection
          title="Similar Movies"
          movies={similarMovies}
          onMovieClick={handleMovieClick}
          delay={0.9}
        />
      </div>
    </div>
  )
}
