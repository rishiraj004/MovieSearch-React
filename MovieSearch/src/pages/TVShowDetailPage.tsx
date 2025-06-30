import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, Star, Play, Camera, Edit, Megaphone, Tv } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { CastCard, ProductionLogo, TVShowDetailsGrid, CreatedBySection, CrewSection, CastCrewDropdown, ReviewsSection, HorizontalTVShowSection, VideosSection, TVShowWatchProvidersSection, SeasonsSection } from './components'

import { movieService } from '@/features/movies/services/movie.service'
import type { TVShowDetails, Cast, TVShow, Credits, Review, Video } from '@/features/movies/types/movie.types'
import { filterCrewByJob } from '@/features/movies/utils/crewUtils'
import { getImageUrl, getBackdropUrl } from '@/features/movies/utils/imageUtils'

export function TVShowDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [tvShow, setTvShow] = useState<TVShowDetails | null>(null)
  const [credits, setCredits] = useState<Credits | null>(null)
  const [recommendations, setRecommendations] = useState<TVShow[]>([])
  const [similarTVShows, setSimilarTVShows] = useState<TVShow[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [reviewsTotal, setReviewsTotal] = useState(0)
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setError('TV Show ID is required')
      setLoading(false)
      return
    }

    const fetchTVShowData = async () => {
      try {
        setLoading(true)
        setError(null)

        const tvShowId = parseInt(id, 10)
        if (isNaN(tvShowId)) {
          throw new Error('Invalid TV show ID')
        }

        const [tvShowDetails, tvShowCredits, tvShowRecommendations, tvShowSimilar, tvShowReviews, tvShowVideos] = await Promise.all([
          movieService.getTVShowDetails(tvShowId),
          movieService.getTVShowCredits(tvShowId),
          movieService.getTVShowRecommendations(tvShowId),
          movieService.getSimilarTVShows(tvShowId),
          movieService.getTVShowReviews(tvShowId),
          movieService.getTVShowVideos(tvShowId)
        ])

        setTvShow(tvShowDetails)
        setCredits(tvShowCredits)
        setRecommendations(tvShowRecommendations.results.slice(0, 10))
        setSimilarTVShows(tvShowSimilar.results.slice(0, 10))
        setReviews(tvShowReviews.results)
        setVideos(tvShowVideos.results)
        setReviewsTotal(tvShowReviews.total_results)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch TV show details')
      } finally {
        setLoading(false)
      }
    }

    fetchTVShowData()
  }, [id])

  const handleBack = () => {
    navigate(-1)
  }

  const handleTVShowClick = (selectedTVShow: TVShow) => {
    navigate(`/tv/${selectedTVShow.id}`)
  }

  const handleCastClick = (cast: Cast) => {
    navigate(`/person/${cast.id}`)
  }

  const handleTrailerClick = () => {
    // First, try to find an official trailer
    const officialTrailer = videos.find(video => 
      video.type === 'Trailer' && 
      video.official === true && 
      video.site === 'YouTube'
    )
    
    // If no official trailer, find any trailer
    const anyTrailer = videos.find(video => 
      video.type === 'Trailer' && 
      video.site === 'YouTube'
    )
    
    // If no trailer, find any video
    const anyVideo = videos.find(video => 
      video.site === 'YouTube'
    )
    
    const selectedVideo = officialTrailer || anyTrailer || anyVideo
    
    if (selectedVideo) {
      const videoUrl = `https://www.youtube.com/watch?v=${selectedVideo.key}`
      window.open(videoUrl, '_blank')
    } else if (tvShow?.homepage) {
      // Fallback to TV show homepage if no videos available
      window.open(tvShow.homepage, '_blank')
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
          <p className="text-gray-400">Loading TV show details...</p>
        </motion.div>
      </div>
    )
  }

  if (error || !tvShow) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-6xl mb-4">📺</div>
          <h2 className="text-2xl font-bold mb-2">TV Show Not Found</h2>
          <p className="text-gray-400 mb-6">{error || 'The requested TV show could not be found.'}</p>
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

  const year = tvShow.first_air_date ? new Date(tvShow.first_air_date).getFullYear() : ''
  const lastAirYear = tvShow.last_air_date ? new Date(tvShow.last_air_date).getFullYear() : ''
  const dateRange = year && lastAirYear && year !== lastAirYear ? `${year} - ${lastAirYear}` : year
  const rating = tvShow.vote_average ? tvShow.vote_average.toFixed(1) : 'N/A'
  const avgRuntime = tvShow.episode_run_time.length > 0 ? `${tvShow.episode_run_time[0]}m` : 'N/A'
  const topCast = credits?.cast.slice(0, 10) || []
  
  // Check if we have a trailer available
  const hasTrailer = videos.some(video => 
    (video.type === 'Trailer' || video.type === 'Teaser') && 
    video.site === 'YouTube'
  ) || tvShow?.homepage
  
  // Get filtered crew members
  const { directors, producers, writers } = credits ? filterCrewByJob(credits.crew) : { directors: [], producers: [], writers: [] }

  const backdropUrl = tvShow.backdrop_path 
    ? getBackdropUrl(tvShow.backdrop_path, 'ORIGINAL')
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
        {/* Backdrop Image */}
        {backdropUrl && (
          <div className="absolute inset-0 z-0 bg-gray-900">
            <img
              src={backdropUrl}
              alt={tvShow.name}
              className="w-full h-full object-cover object-center"
              onLoad={() => {
                // Backdrop loaded successfully
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>
        )}
        
        {/* Fallback Background */}
        {!backdropUrl && (
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-800 to-gray-900" />
        )}
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 z-10 bg-black/40 sm:bg-black/30" />
        
        {/* Content Container */}
        <div className="absolute inset-0 z-20 flex items-end">
          <div className="container mx-auto px-4 sm:px-6 pb-6 sm:pb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6 lg:gap-8">
              {/* TV Show Poster */}
              <motion.div
                className="flex-shrink-0 order-1 sm:order-none"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <img
                  src={tvShow.poster_path ? getImageUrl(tvShow.poster_path, 'W500') : '/placeholder-tv.jpg'}
                  alt={tvShow.name}
                  className="w-40 h-60 sm:w-48 sm:h-72 lg:w-64 lg:h-96 object-cover rounded-lg shadow-2xl mx-auto sm:mx-0"
                />
              </motion.div>

              {/* TV Show Info */}
              <motion.div
                className="flex-1 max-w-full sm:max-w-2xl text-center sm:text-left order-2 sm:order-none"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 leading-tight">{tvShow.name}</h1>
                {tvShow.tagline && (
                  <p className="text-base sm:text-lg lg:text-xl text-gray-300 italic mb-3 sm:mb-4">{tvShow.tagline}</p>
                )}
                
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <span className="text-sm sm:text-base text-gray-300">{dateRange}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <span className="text-sm sm:text-base text-gray-300">{avgRuntime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                    <span className="text-sm sm:text-base text-gray-300">{rating}/10</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tv className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <span className="text-sm sm:text-base text-gray-300">{tvShow.number_of_seasons} Season{tvShow.number_of_seasons !== 1 ? 's' : ''}</span>
                  </div>
                </div>

                {tvShow.genres && tvShow.genres.length > 0 && (
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4 sm:mb-6">
                    {tvShow.genres.map((genre) => (
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
                    disabled={!hasTrailer}
                    className={`w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 rounded-lg transition-colors inline-flex items-center justify-center gap-2 font-semibold text-sm sm:text-base ${
                      hasTrailer 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                    {hasTrailer ? 'Watch Trailer' : 'No Trailer Available'}
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
        {tvShow.overview && (
          <motion.section
            className="mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center sm:text-left">Overview</h2>
            <div className="bg-gray-800 rounded-lg p-4 sm:p-6 lg:p-8 mx-0 sm:mx-4 shadow-lg border border-gray-700">
              <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
                {tvShow.overview}
              </p>
            </div>
          </motion.section>
        )}

        {/* TV Show Details Grid */}
        <motion.section
          className="mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center sm:text-left">Show Details</h2>
          <TVShowDetailsGrid tvShow={tvShow} />
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
                    navigate(`/person/${person.id}`)
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
              <CreatedBySection 
                createdBy={tvShow.created_by} 
                onCreatorClick={(creator) => navigate(`/person/${creator.id}`)}
              />
              <CrewSection 
                title="Directors" 
                crew={directors} 
                icon={Camera}
                color="blue"
                onPersonClick={(person) => navigate(`/person/${person.id}`)}
              />
              <CrewSection 
                title="Producers" 
                crew={producers} 
                icon={Megaphone}
                color="purple"
                onPersonClick={(person) => navigate(`/person/${person.id}`)}
              />
              <CrewSection 
                title="Writers" 
                crew={writers} 
                icon={Edit}
                color="green"
                onPersonClick={(person) => navigate(`/person/${person.id}`)}
              />
            </div>
          </motion.section>
        )}

        {/* Seasons Section */}
        <SeasonsSection seasons={tvShow.seasons} tvShowId={parseInt(id!, 10)} />

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

        {/* Watch Providers Section */}
        <TVShowWatchProvidersSection tvShowId={parseInt(id!, 10)} />

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
        {tvShow.production_companies && tvShow.production_companies.length > 0 && (
          <motion.section
            className="mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center sm:text-left">Production Companies</h2>
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 lg:gap-8">
              {tvShow.production_companies.map((company) => (
                <ProductionLogo key={company.id} company={company} />
              ))}
            </div>
          </motion.section>
        )}

        {/* Networks */}
        {tvShow.networks && tvShow.networks.length > 0 && (
          <motion.section
            className="mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center sm:text-left">Networks</h2>
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 lg:gap-8">
              {tvShow.networks.map((network) => (
                <div key={network.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors">
                  {network.logo_path ? (
                    <img
                      src={getImageUrl(network.logo_path, 'W185')}
                      alt={network.name}
                      className="h-16 w-auto object-contain mx-auto"
                    />
                  ) : (
                    <div className="h-16 flex items-center justify-center">
                      <span className="text-gray-300 text-sm font-medium">{network.name}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Recommendations - Horizontal Scrollable */}
        <HorizontalTVShowSection
          title="You May Also Like"
          tvShows={recommendations}
          onTVShowClick={handleTVShowClick}
          delay={0.8}
        />

        {/* Similar TV Shows - Horizontal Scrollable */}
        <HorizontalTVShowSection
          title="Similar TV Shows"
          tvShows={similarTVShows}
          onTVShowClick={handleTVShowClick}
          delay={0.9}
        />
      </div>
    </div>
  )
}
