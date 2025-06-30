import { motion } from 'framer-motion'
import { Calendar, Eye } from 'lucide-react'

import { MovieCard } from './MovieCard'

import type { CollectionDetails, Movie } from '@/features/movies/types/movie.types'
import { getImageUrl, getBackdropUrl } from '@/features/movies/utils/imageUtils'

interface CollectionSectionProps {
  collection: CollectionDetails
  onMovieClick: (movie: Movie) => void
}

export function CollectionSection({ collection, onMovieClick }: CollectionSectionProps) {
  // Sort movies by release date (newest first)
  const sortedMovies = [...collection.parts].sort((a, b) => {
    const dateA = new Date(a.release_date || '').getTime()
    const dateB = new Date(b.release_date || '').getTime()
    return dateB - dateA
  })

  const backdropUrl = collection.backdrop_path 
    ? getBackdropUrl(collection.backdrop_path, 'W1280')
    : ''

  return (
    <motion.section
      className="mb-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="relative rounded-xl overflow-hidden border border-purple-500/20">
        {/* Backdrop Image with Blur */}
        {backdropUrl && (
          <div className="absolute inset-0">
            <img
              src={backdropUrl}
              alt={collection.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          </div>
        )}
        
        {/* Fallback gradient background */}
        {!backdropUrl && (
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-blue-900/40" />
        )}
        
        {/* Content overlay */}
        <div className="relative z-10 p-8 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
          {/* Collection Header */}
          <div className="flex items-start gap-6 mb-8">
            {collection.poster_path && (
              <img
                src={getImageUrl(collection.poster_path, 'W342')}
                alt={collection.name}
                className="w-32 h-48 object-cover rounded-lg shadow-2xl flex-shrink-0 border-2 border-white/20"
              />
            )}
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 drop-shadow-lg">
                  {collection.name}
                </h2>
                <div className="flex items-center gap-2 px-3 py-1 bg-purple-600/30 rounded-full border border-purple-500/40 backdrop-blur-sm">
                  <Eye className="w-4 h-4 text-purple-300" />
                  <span className="text-purple-200 text-sm font-medium">
                    {collection.parts.length} {collection.parts.length === 1 ? 'Movie' : 'Movies'}
                  </span>
                </div>
              </div>
              
              {collection.overview && (
                <p className="text-gray-200 text-lg leading-relaxed mb-4 drop-shadow-sm">
                  {collection.overview}
                </p>
              )}
              
              <div className="flex items-center gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {sortedMovies.length > 0 && sortedMovies[sortedMovies.length - 1].release_date
                      ? `${new Date(sortedMovies[sortedMovies.length - 1].release_date).getFullYear()}`
                      : 'Unknown'
                    } - {sortedMovies.length > 0 && sortedMovies[0].release_date
                      ? `${new Date(sortedMovies[0].release_date).getFullYear()}`
                      : 'Present'
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Collection Movies Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {sortedMovies.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <MovieCard
                  movie={movie}
                  onClick={onMovieClick}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
