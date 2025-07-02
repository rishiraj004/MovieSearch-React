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
  VideosSection,
} from './components'
import { TVHero, TVNetworks, TVOverview } from './components/tv-detail'
import { useTVShowDetails } from './hooks/useTVShowDetails'
import { useTVShowTrailer } from './hooks/useTVShowTrailer'

import type { Cast, TVShow } from '@/features/movies/types/movie.types'
import { filterCrewByJob } from '@/features/movies/utils/crewUtils'
import { WatchProviders } from '@/shared/components/watch-providers'

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
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading TV show details...</p>
        </div>
      </div>
    )
  }

  if (error || !tvShow) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-gray-400 mb-6">{error || 'TV show not found'}</p>
          <button
            onClick={handleBack}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  // Get cast and crew data
  const cast = credits?.cast || []
  const crew = credits?.crew || []

  // Filter crew by specific roles
  const { directors, writers, producers } = filterCrewByJob(crew)

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* TV Show Overview - Using modular component */}
            <TVOverview overview={tvShow.overview || ''} />

            {/* Networks - Using modular component */}
            <TVNetworks
              networks={tvShow.networks}
              onNetworkClick={handleNetworkClick}
            />

            {/* Created By Section */}
            {tvShow.created_by && tvShow.created_by.length > 0 && (
              <CreatedBySection createdBy={tvShow.created_by} />
            )}

            {/* Crew Section */}
            {(directors.length > 0 ||
              writers.length > 0 ||
              producers.length > 0) && (
              <section className="mb-8 sm:mb-12 animate-fadeIn">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center sm:text-left">
                  Key Crew
                </h2>
                <div className="space-y-4 sm:space-y-6">
                  {directors.length > 0 && (
                    <CrewSection
                      title="Directors"
                      crew={directors}
                      color="blue"
                      onPersonClick={person => navigate(`/person/${person.id}`)}
                    />
                  )}
                  {producers.length > 0 && (
                    <CrewSection
                      title="Producers"
                      crew={producers}
                      color="purple"
                      onPersonClick={person => navigate(`/person/${person.id}`)}
                    />
                  )}
                  {writers.length > 0 && (
                    <CrewSection
                      title="Writers"
                      crew={writers}
                      color="green"
                      onPersonClick={person => navigate(`/person/${person.id}`)}
                    />
                  )}
                </div>
              </section>
            )}

            {/* Cast & Crew Dropdown */}
            {(cast.length > 0 || crew.length > 0) && (
              <CastCrewDropdown
                cast={cast}
                crew={crew}
                onPersonClick={person => {
                  if ('character' in person) {
                    // It's a cast member
                    handleCastClick(person as Cast)
                  } else {
                    // It's a crew member, navigate to person page
                    navigate(`/person/${person.id}`)
                  }
                }}
              />
            )}

            {/* Seasons */}
            {tvShow.seasons && tvShow.seasons.length > 0 && (
              <SeasonsSection seasons={tvShow.seasons} tvShowId={tvShow.id} />
            )}

            {/* Videos Section */}
            {videos && videos.length > 0 && <VideosSection videos={videos} />}

            {/* Reviews Section */}
            {reviews && reviews.length > 0 && (
              <ReviewsSection reviews={reviews} totalReviews={reviewsTotal} />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sm:space-y-8">
            {/* TV Show Details Grid */}
            <TVShowDetailsGrid tvShow={tvShow} />

            {/* Watch Providers */}
            <WatchProviders id={tvShow.id} type="tv" />

            {/* Featured Cast */}
            {cast.length > 0 && (
              <section>
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                  Featured Cast
                </h2>
                <div className="space-y-3">
                  {cast.slice(0, 8).map(actor => (
                    <CastCard
                      key={actor.id}
                      cast={actor}
                      onClick={() => handleCastClick(actor)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Production Logo */}
            {tvShow.production_companies &&
              tvShow.production_companies.length > 0 && (
                <section>
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                    Production Companies
                  </h2>
                  <div className="space-y-3">
                    {tvShow.production_companies.map(company => (
                      <ProductionLogo key={company.id} company={company} />
                    ))}
                  </div>
                </section>
              )}
          </div>
        </div>

        {/* Recommendations and Similar TV Shows */}
        <div className="mt-8 sm:mt-12 space-y-8 sm:space-y-12">
          {recommendations && recommendations.length > 0 && (
            <HorizontalTVShowSection
              title="Recommended TV Shows"
              tvShows={recommendations}
              onTVShowClick={handleTVShowClick}
            />
          )}

          {similarTVShows && similarTVShows.length > 0 && (
            <HorizontalTVShowSection
              title="Similar TV Shows"
              tvShows={similarTVShows}
              onTVShowClick={handleTVShowClick}
            />
          )}
        </div>
      </div>
    </div>
  )
}
