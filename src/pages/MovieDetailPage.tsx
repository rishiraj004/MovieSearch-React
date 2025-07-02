import { Camera, Edit, Megaphone } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

import {
  CastCard,
  CastCrewDropdown,
  CrewSection,
  HorizontalMovieSection,
  MovieDetailsGrid,
  ProductionLogo,
  ReviewsSection,
  VideosSection,
  WatchProvidersSection,
} from './components'
import {
  MovieCollectionSection,
  MovieHero,
  MovieOverview,
} from './components/movie-detail'
import { useMovieDetails, useMovieTrailer } from './hooks'

import type { Cast, Movie } from '@/features/movies/types/movie.types'
import { filterCrewByJob } from '@/features/movies/utils/crewUtils'

export function MovieDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  // Use our custom hooks
  const {
    movie,
    credits,
    recommendations,
    similarMovies,
    reviews,
    reviewsTotal,
    videos,
    collection,
    loadingCollection,
    loading,
    error,
    fetchCollection,
  } = useMovieDetails(id)

  const { hasTrailer, handleTrailerClick } = useMovieTrailer(videos, movie)

  const handleBack = () => {
    navigate(-1)
  }

  const handleMovieClick = (selectedMovie: Movie) => {
    navigate(`/movie/${selectedMovie.id}`)
  }

  const handleCastClick = (cast: Cast) => {
    navigate(`/person/${cast.id}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center animate-fadeIn">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading movie details...</p>
        </div>
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center animate-fadeIn">
          <div className="text-6xl mb-4">🎬</div>
          <h2 className="text-2xl font-bold mb-2">Movie Not Found</h2>
          <p className="text-gray-400 mb-6">
            {error || 'The requested movie could not be found.'}
          </p>
          <button
            onClick={handleBack}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const topCast = credits?.cast.slice(0, 10) || []

  // Get filtered crew members
  const { directors, producers, writers } = credits
    ? filterCrewByJob(credits.crew)
    : { directors: [], producers: [], writers: [] }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section - Using our new component */}
      <MovieHero
        movie={movie}
        hasTrailer={!!hasTrailer}
        onBack={handleBack}
        onTrailerClick={handleTrailerClick}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-2 sm:py-4">
        {/* Overview Section - Using our new component */}
        <MovieOverview overview={movie.overview} />

        {/* Collection Section - Using our new component */}
        {movie.belongs_to_collection && (
          <MovieCollectionSection
            movie={movie}
            collection={collection}
            loadingCollection={loadingCollection}
            onFetchCollection={fetchCollection}
            onMovieClick={handleMovieClick}
          />
        )}

        {/* Movie Details Grid */}
        <section className="mb-8 sm:mb-12 animate-fadeIn">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center sm:text-left">
            Movie Details
          </h2>
          <MovieDetailsGrid movie={movie} />
        </section>

        {/* Cast Section */}
        {topCast.length > 0 && (
          <section className="mb-8 sm:mb-12 animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 sm:gap-0 mb-4 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">
                Cast
              </h2>
              {credits && (
                <CastCrewDropdown
                  cast={credits.cast}
                  crew={credits.crew}
                  onPersonClick={person => {
                    navigate(`/person/${person.id}`)
                  }}
                />
              )}
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3 sm:gap-4 lg:gap-6">
              {topCast.map(actor => (
                <CastCard
                  key={actor.id}
                  cast={actor}
                  onClick={handleCastClick}
                />
              ))}
            </div>
          </section>
        )}

        {/* Crew Section */}
        {credits &&
          (directors.length > 0 ||
            producers.length > 0 ||
            writers.length > 0) && (
            <section className="mb-8 sm:mb-12 animate-fadeIn">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center sm:text-left">
                Key Crew
              </h2>
              <div className="space-y-4 sm:space-y-6">
                <CrewSection
                  title="Directors"
                  crew={directors}
                  icon={Camera}
                  color="blue"
                  onPersonClick={person => navigate(`/person/${person.id}`)}
                />
                <CrewSection
                  title="Producers"
                  crew={producers}
                  icon={Megaphone}
                  color="purple"
                  onPersonClick={person => navigate(`/person/${person.id}`)}
                />
                <CrewSection
                  title="Writers"
                  crew={writers}
                  icon={Edit}
                  color="green"
                  onPersonClick={person => navigate(`/person/${person.id}`)}
                />
              </div>
            </section>
          )}

        {/* Videos Section */}
        <VideosSection
          videos={videos}
          onVideoClick={video => {
            // Open video in new tab
            const videoUrl =
              video.site === 'YouTube'
                ? `https://www.youtube.com/watch?v=${video.key}`
                : '#'
            window.open(videoUrl, '_blank')
          }}
        />

        {/* Watch Providers Section */}
        <WatchProvidersSection movieId={parseInt(id!, 10)} />

        {/* Reviews Section */}
        {reviews.length > 0 && (
          <section className="mb-12 animate-fadeIn">
            <ReviewsSection reviews={reviews} totalReviews={reviewsTotal} />
          </section>
        )}

        {/* Production Companies */}
        {movie.production_companies &&
          movie.production_companies.length > 0 && (
            <section className="mb-8 sm:mb-12 animate-fadeIn">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center sm:text-left">
                Production Companies
              </h2>
              <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 lg:gap-8">
                {movie.production_companies.map(company => (
                  <ProductionLogo key={company.id} company={company} />
                ))}
              </div>
            </section>
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

export default MovieDetailPage
