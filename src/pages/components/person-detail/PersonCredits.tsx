import { Film, Tv } from 'lucide-react'

import { MovieCard } from '../MovieCard'
import { TVShowCard } from '../TVShowCard'

import type { PersonCreditsProps } from './PersonDetailTypes'

export function PersonCredits({
  movieCredits,
  tvCredits,
  onMovieClick,
  onTVShowClick,
}: PersonCreditsProps) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-8 sm:space-y-12">
      {/* Movie Credits */}
      {movieCredits.length > 0 && (
        <section className="animate-fadeIn">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Film className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold">Movies</h2>
                  <p className="text-gray-400 text-sm">{movieCredits.length} credit{movieCredits.length !== 1 ? 's' : ''}</p>
                </div>
              </div>
            </div>
            {/* Horizontal Scrolling Container */}
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-4 sm:gap-6 horizontal-scroll-container">
                {movieCredits.map(movie => (
                  <div key={movie.id} className="flex-shrink-0 w-40 sm:w-48 group">
                    <MovieCard
                      movie={movie}
                      onClick={() => onMovieClick(movie)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TV Credits */}
      {tvCredits.length > 0 && (
        <section className="animate-fadeIn">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Tv className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold">TV Shows</h2>
                  <p className="text-gray-400 text-sm">{tvCredits.length} credit{tvCredits.length !== 1 ? 's' : ''}</p>
                </div>
              </div>
            </div>
            {/* Horizontal Scrolling Container */}
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-4 sm:gap-6 horizontal-scroll-container">
                {tvCredits.map(show => (
                  <div key={show.id} className="flex-shrink-0 w-40 sm:w-48 group">
                    <TVShowCard
                      tvShow={show}
                      onClick={() => onTVShowClick(show)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
