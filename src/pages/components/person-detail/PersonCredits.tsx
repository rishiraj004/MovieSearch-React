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
    <div className="space-y-12">
      {/* Movie Credits */}
      {movieCredits.length > 0 && (
        <section className="py-8">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-6">
              <Film className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold">Movies</h2>
              <span className="text-gray-400">({movieCredits.length})</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {movieCredits.map(movie => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={() => onMovieClick(movie)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TV Credits */}
      {tvCredits.length > 0 && (
        <section className="py-8">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-6">
              <Tv className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold">TV Shows</h2>
              <span className="text-gray-400">({tvCredits.length})</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {tvCredits.map(show => (
                <TVShowCard
                  key={show.id}
                  tvShow={show}
                  onClick={() => onTVShowClick(show)}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
