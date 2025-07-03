import { Camera, Edit, Megaphone } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

import {
  CastCard,
  CastCrewDropdown,
  CreatedBySection,
  CrewSection,
  HorizontalTVShowSection,
  ProductionLogo,
  ReviewsSection,
  SeasonsSection,
  TVShowDetailsGrid,
  TVShowWatchProvidersSection,
  VideosSection,
} from './components'
import { TVHero, TVNetworks, TVOverview } from './components/tv-detail'
import { useTVShowDetails } from './hooks/useTVShowDetails'
import { useTVShowTrailer } from './hooks/useTVShowTrailer'

import type { Cast, TVShow } from '@/features/movies/types/movie.types'
import { filterCrewByJob } from '@/features/movies/utils/crewUtils'

export default function TVShowDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  // Use custom hooks
  const {
    tvShow,
    credits,
    recommendations,
    similarTVShows,
    reviews,
    reviewsTotal,
    videos,
    loading,
    error,
  } = useTVShowDetails(id)

  const { hasTrailer, handleTrailerClick } = useTVShowTrailer(videos, tvShow)

  const handleBack = () => {
    navigate(-1)
  }

  const handleTVShowClick = (selectedTVShow: TVShow) => {
    navigate(`/tv/${selectedTVShow.id}`)
  }

  const handleCastClick = (cast: Cast) => {
    navigate(`/person/${cast.id}`)
  }

  const handleNetworkClick = (networkId: number) => {
    navigate(`/network/${networkId}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center animate-fadeIn">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading TV show details...</p>
        </div>
      </div>
    )
  }

  if (error || !tvShow) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center animate-fadeIn">
          <div className="text-6xl mb-4">📺</div>
          <h2 className="text-2xl font-bold mb-2">TV Show Not Found</h2>
          <p className="text-gray-400 mb-6">
            {error || 'The requested TV show could not be found.'}
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
      {/* Hero Section - Using modular component */}
      <TVHero
        tvShow={tvShow}
        hasTrailer={!!hasTrailer}
        onBack={handleBack}
        onTrailerClick={handleTrailerClick}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-2 sm:py-4">
        {/* Overview Section - Using modular component */}
        <TVOverview overview={tvShow.overview || ''} />

        {/* TV Show Details Grid */}
        <section className="mb-8 sm:mb-12 animate-fadeIn">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center sm:text-left">
            TV Show Details
          </h2>
          <TVShowDetailsGrid tvShow={tvShow} />
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

        {/* Seasons Section */}
        {tvShow.seasons && tvShow.seasons.length > 0 && (
          <SeasonsSection seasons={tvShow.seasons} tvShowId={tvShow.id} />
        )}

        {/* Production Companies */}
        {tvShow.production_companies &&
          tvShow.production_companies.length > 0 && (
            <section className="mb-8 sm:mb-12 animate-fadeIn">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center sm:text-left">
                Production Companies
              </h2>
              <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 lg:gap-8">
                {tvShow.production_companies.map(company => (
                  <ProductionLogo key={company.id} company={company} />
                ))}
              </div>
            </section>
          )}

        {/* Networks Section - Using modular component */}
        {tvShow.networks && tvShow.networks.length > 0 && (
          <TVNetworks
            networks={tvShow.networks}
            onNetworkClick={handleNetworkClick}
          />
        )}

        {/* Watch Providers Section */}
        <TVShowWatchProvidersSection tvShowId={parseInt(id!, 10)} />

        {/* Reviews Section */}
        {reviews.length > 0 && (
          <section className="mb-12 animate-fadeIn">
            <ReviewsSection reviews={reviews} totalReviews={reviewsTotal} />
          </section>
        )}

        {/* Created By Section */}
        {tvShow.created_by && tvShow.created_by.length > 0 && (
          <section className="mb-8 sm:mb-12 animate-fadeIn">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center sm:text-left">
              Created By
            </h2>
            <CreatedBySection
              createdBy={tvShow.created_by}
              onCreatorClick={(creator) => navigate(`/person/${creator.id}`)}
            />
          </section>
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
