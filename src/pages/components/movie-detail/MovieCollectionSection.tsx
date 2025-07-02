import type { MovieCollectionSectionProps } from './MovieDetailTypes'

import { getBackdropUrl, getImageUrl } from '@/features/movies/utils/imageUtils'

export function MovieCollectionSection({
  movie,
  collection,
  loadingCollection,
  onFetchCollection,
  onMovieClick,
}: MovieCollectionSectionProps) {
  if (!movie.belongs_to_collection) return null

  return (
    <section className="mb-12 animate-fadeIn">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">
          Part of Collection
        </h2>
      </div>

      {!collection ? (
        <div className="relative rounded-xl overflow-hidden border border-purple-500/20">
          {/* Backdrop Image with Blur */}
          {movie.belongs_to_collection.backdrop_path && (
            <div className="absolute inset-0">
              <img
                src={getBackdropUrl(
                  movie.belongs_to_collection.backdrop_path,
                  'W1280'
                )}
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
                  src={getImageUrl(
                    movie.belongs_to_collection.poster_path,
                    'W185'
                  )}
                  alt={movie.belongs_to_collection.name}
                  className="w-16 h-24 object-cover rounded-lg shadow-2xl border-2 border-white/20"
                />
              )}
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2 drop-shadow-lg">
                  {movie.belongs_to_collection.name}
                </h3>
                <p className="text-gray-200 mb-4 drop-shadow-sm">
                  This movie is part of the {movie.belongs_to_collection.name}{' '}
                  collection.
                </p>
                <button
                  onClick={onFetchCollection}
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
        <div className="space-y-6">
          <div className="relative rounded-xl overflow-hidden border border-purple-500/20 mb-6">
            {/* Collection Header */}
            {collection.backdrop_path && (
              <div className="relative h-48 md:h-64 lg:h-80 overflow-hidden">
                <img
                  src={getBackdropUrl(collection.backdrop_path, 'ORIGINAL')}
                  alt={collection.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute inset-0 flex items-end p-6">
                  <div className="flex items-center gap-4">
                    {collection.poster_path && (
                      <img
                        src={getImageUrl(collection.poster_path, 'W185')}
                        alt={collection.name}
                        className="w-20 h-30 object-cover rounded-lg shadow-2xl border-2 border-white/20 hidden sm:block"
                      />
                    )}
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                        {collection.name}
                      </h3>
                      {collection.overview && (
                        <p className="text-white/90 text-sm md:text-base line-clamp-2 drop-shadow-sm max-w-2xl">
                          {collection.overview}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Collection Movies */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {collection.parts
              .sort((a, b) => {
                // Sort by release date (chronologically)
                if (!a.release_date && !b.release_date) return 0
                if (!a.release_date) return 1
                if (!b.release_date) return -1
                return (
                  new Date(a.release_date).getTime() -
                  new Date(b.release_date).getTime()
                )
              })
              .map(collectionMovie => (
                <button
                  key={collectionMovie.id}
                  className={`block w-full text-left relative rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform duration-200 hover:scale-105 ${
                    collectionMovie.id === movie.id
                      ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-900'
                      : ''
                  }`}
                  onClick={() =>
                    collectionMovie.id !== movie.id &&
                    onMovieClick(collectionMovie)
                  }
                  disabled={collectionMovie.id === movie.id}
                  aria-label={`View details for ${collectionMovie.title}`}
                >
                  <img
                    src={
                      collectionMovie.poster_path
                        ? getImageUrl(collectionMovie.poster_path, 'W342')
                        : '/placeholder-movie.jpg'
                    }
                    alt={collectionMovie.title}
                    className="w-full h-auto aspect-[2/3] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                  <div className="absolute bottom-0 left-0 w-full p-3">
                    <h4 className="text-white font-semibold line-clamp-2 text-sm">
                      {collectionMovie.title}
                    </h4>
                    {collectionMovie.release_date && (
                      <p className="text-gray-300 text-xs mt-1">
                        {new Date(collectionMovie.release_date).getFullYear()}
                      </p>
                    )}
                  </div>
                  {collectionMovie.id === movie.id && (
                    <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      Current
                    </div>
                  )}
                </button>
              ))}
          </div>
        </div>
      )}
    </section>
  )
}
