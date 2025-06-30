import { motion } from 'framer-motion'
import { ArrowLeft, Play, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { movieService } from '../features/movies/services/movie.service'
import type { MovieDetailsExtended, Credits, Movie, Cast } from '../features/movies/types/movie.types'
import { getImageUrl, getBackdropUrl } from '../features/movies/utils/imageUtils'

import { CastCard, MetaItem, MovieCard, ProductionLogo } from './components'

export function MovieDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  const [movie, setMovie] = useState<MovieDetailsExtended | null>(null)
  const [credits, setCredits] = useState<Credits | null>(null)
  const [recommendations, setRecommendations] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMovieData = async () => {
      if (!id) return

      setLoading(true)
      setError(null)

      try {
        const movieId = parseInt(id, 10)
        
        // Fetch movie details, credits, and recommendations in parallel
        const [movieDetails, movieCredits, movieRecommendations] = await Promise.all([
          movieService.getMovieDetailsExtended(movieId),
          movieService.getMovieCredits(movieId),
          movieService.getMovieRecommendations(movieId)
        ])

        setMovie(movieDetails)
        setCredits(movieCredits)
        setRecommendations(movieRecommendations.results.slice(0, 10)) // Limit to 10 recommendations
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
    // For now, we'll just handle the click silently
    void cast
  }

  const handleTrailerClick = () => {
    // In a real app, you might open a modal with the trailer
    if (movie?.homepage) {
      window.open(movie.homepage, '_blank')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] text-white flex items-center justify-center">
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
      <div className="min-h-screen bg-[#1a1a1a] text-white flex items-center justify-center">
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

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Hero Section */}
      <motion.section
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Backdrop Image */}
        {movie.backdrop_path && (
          <div className="absolute inset-0 z-0">
            <img
              src={getBackdropUrl(movie.backdrop_path, 'W1280')}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent"></div>
          </div>
        )}

        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Back Button */}
          <motion.button
            onClick={handleBack}
            className="mb-6 bg-black bg-opacity-50 hover:bg-opacity-70 text-white px-4 py-2 rounded-lg transition-all inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </motion.button>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Poster */}
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-64 lg:w-80 mx-auto lg:mx-0">
                <div className="aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden shadow-2xl">
                  <img
                    src={getImageUrl(movie.poster_path, 'W500')}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Movie Info */}
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h1 className="text-3xl lg:text-5xl font-bold mb-2">{movie.title}</h1>
              
              {movie.tagline && (
                <p className="text-gray-400 text-lg lg:text-xl italic mb-4">{movie.tagline}</p>
              )}

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="text-gray-300">{year}</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-300">{runtime}</span>
                <span className="text-gray-300">•</span>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-yellow-400 font-bold">{rating}</span>
                  <span className="text-gray-400">({movie.vote_count} votes)</span>
                </div>
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-blue-600 bg-opacity-20 text-blue-400 px-3 py-1 rounded-full text-sm border border-blue-600 border-opacity-30"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                {(movie.homepage || movie.imdb_id) && (
                  <motion.button
                    onClick={handleTrailerClick}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2 font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="w-5 h-5" />
                    Watch Trailer
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Overview */}
        {movie.overview && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-gray-300 text-lg leading-relaxed">{movie.overview}</p>
          </motion.section>
        )}

        {/* Meta Data */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold mb-6">Details</h2>
          <div className="bg-gray-800 rounded-lg p-6 space-y-2">
            <MetaItem label="Status" value={movie.status} />
            <MetaItem label="Budget" value={movie.budget} type="currency" />
            <MetaItem label="Revenue" value={movie.revenue} type="currency" />
            <MetaItem 
              label="Original Language" 
              value={movie.spoken_languages?.[0]?.english_name || movie.original_language} 
            />
            <MetaItem 
              label="Country" 
              value={movie.production_countries?.[0]?.name} 
            />
            {movie.imdb_id && (
              <MetaItem 
                label="IMDb" 
                value="View on IMDb" 
                type="link" 
                href={`https://www.imdb.com/title/${movie.imdb_id}`} 
              />
            )}
            {movie.homepage && (
              <MetaItem 
                label="Homepage" 
                value="Visit Official Site" 
                type="link" 
                href={movie.homepage} 
              />
            )}
          </div>
        </motion.section>

        {/* Production Companies */}
        {movie.production_companies && movie.production_companies.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <h2 className="text-2xl font-bold mb-6">Production Companies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {movie.production_companies.map((company) => (
                <ProductionLogo key={company.id} company={company} />
              ))}
            </div>
          </motion.section>
        )}

        {/* Collection */}
        {movie.belongs_to_collection && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <h2 className="text-2xl font-bold mb-6">Part of Collection</h2>
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                {movie.belongs_to_collection.poster_path && (
                  <div className="w-full sm:w-32 h-48 sm:h-auto">
                    <img
                      src={getImageUrl(movie.belongs_to_collection.poster_path, 'W185')}
                      alt={movie.belongs_to_collection.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6 flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {movie.belongs_to_collection.name}
                  </h3>
                  <p className="text-gray-400">
                    This movie is part of the {movie.belongs_to_collection.name}.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Top Cast */}
        {topCast.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <h2 className="text-2xl font-bold mb-6">Top Cast</h2>
            <div className="flex overflow-x-auto scrollbar-hide gap-4 pb-4">
              {topCast.map((cast) => (
                <CastCard key={cast.id} cast={cast} onClick={handleCastClick} />
              ))}
            </div>
          </motion.section>
        )}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
            <div className="flex overflow-x-auto scrollbar-hide gap-4 pb-4">
              {recommendations.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onClick={handleMovieClick} />
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  )
}
