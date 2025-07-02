import { ArrowLeft, Calendar, Clock, Play, Star, Tv } from 'lucide-react'

import type { TVHeroProps } from './TVShowDetailTypes'

import { getBackdropUrl, getImageUrl } from '@/features/movies/utils/imageUtils'

export function TVHero({
  tvShow,
  hasTrailer,
  onBack,
  onTrailerClick,
}: TVHeroProps) {
  const year = tvShow.first_air_date
    ? new Date(tvShow.first_air_date).getFullYear()
    : ''
  const lastAirYear = tvShow.last_air_date
    ? new Date(tvShow.last_air_date).getFullYear()
    : ''
  const dateRange =
    year && lastAirYear && year !== lastAirYear
      ? `${year} - ${lastAirYear}`
      : year
  const rating = tvShow.vote_average ? tvShow.vote_average.toFixed(1) : 'N/A'
  const avgRuntime =
    tvShow.episode_run_time.length > 0
      ? `${tvShow.episode_run_time[0]}m`
      : 'N/A'

  const backdropUrl = tvShow.backdrop_path
    ? getBackdropUrl(tvShow.backdrop_path, 'ORIGINAL')
    : ''

  return (
    <section className="relative min-h-[85vh] sm:min-h-[80vh] lg:min-h-[95vh] overflow-hidden animate-fadeIn">
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
            onError={e => {
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
            <div className="flex-shrink-0 order-1 sm:order-none">
              <img
                src={
                  tvShow.poster_path
                    ? getImageUrl(tvShow.poster_path, 'W500')
                    : '/placeholder-tv.jpg'
                }
                alt={tvShow.name}
                className="w-40 h-60 sm:w-48 sm:h-72 lg:w-64 lg:h-96 object-cover rounded-lg shadow-2xl mx-auto sm:mx-0"
              />
            </div>

            {/* TV Show Info */}
            <div className="flex-1 max-w-full sm:max-w-2xl text-center sm:text-left order-2 sm:order-none">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 leading-tight">
                {tvShow.name}
              </h1>
              {tvShow.tagline && (
                <p className="text-base sm:text-lg lg:text-xl text-gray-300 italic mb-3 sm:mb-4">
                  {tvShow.tagline}
                </p>
              )}

              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <span className="text-sm sm:text-base text-gray-300">
                    {dateRange}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <span className="text-sm sm:text-base text-gray-300">
                    {avgRuntime}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                  <span className="text-sm sm:text-base text-gray-300">
                    {rating}/10
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Tv className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <span className="text-sm sm:text-base text-gray-300">
                    {tvShow.number_of_seasons} Season
                    {tvShow.number_of_seasons !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              {tvShow.genres && tvShow.genres.length > 0 && (
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4 sm:mb-6">
                  {tvShow.genres.map(genre => (
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
                  onClick={onTrailerClick}
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
                  onClick={onBack}
                  className="w-full sm:w-auto bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg transition-colors inline-flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
