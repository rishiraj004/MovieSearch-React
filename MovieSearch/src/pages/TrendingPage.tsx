import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

import type { Movie, TVShow, Person } from '../features/movies/types/movie.types'

import { TrendingSection } from '@/features/movies/components/TrendingSection'

interface TrendingPageProps {
  onBackToHome?: () => void
}

export function TrendingPage({ onBackToHome }: TrendingPageProps) {

  const handleItemClick = (item: Movie | TVShow | Person) => {
    // Handle item click based on type
    if ('title' in item) {
      // It's a movie - could navigate to movie details
      // Navigate to movie details page or handle as needed
    } else if ('name' in item && 'first_air_date' in item) {
      // It's a TV show - could navigate to TV show details
      // Navigate to TV show details page or handle as needed
    } else if ('name' in item && 'known_for_department' in item) {
      // It's a person - could navigate to person details
      // Navigate to person details page or handle as needed
    }
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Navigation Header */}
      <motion.div
        className="flex items-center justify-between p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {onBackToHome && (
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200 text-white font-medium"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
        )}
        <div className="flex-1" />
      </motion.div>

      {/* Hero Header */}
      <motion.div
        className="text-center py-8 px-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Trending Now
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Discover what&apos;s hot in movies, TV shows, and entertainment personalities
        </p>
        
        {/* Decorative Elements */}
        <div className="flex justify-center mt-8 space-x-8">
          <motion.div
            className="text-4xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            🎬
          </motion.div>
          <motion.div
            className="text-4xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            📺
          </motion.div>
          <motion.div
            className="text-4xl"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            ⭐
          </motion.div>
        </div>
      </motion.div>

      {/* Trending Sections */}
      <div className="space-y-16 pb-16">
        <TrendingSection
          title="Trending Movies"
          type="movie"
          onItemClick={handleItemClick}
        />

        <TrendingSection
          title="Trending TV Shows"
          type="tv"
          onItemClick={handleItemClick}
        />

        <TrendingSection
          title="Trending People"
          type="person"
          onItemClick={handleItemClick}
        />
      </div>

      {/* Footer */}
      <motion.footer
        className="text-center py-12 border-t border-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <p className="text-gray-500">
          Data powered by{' '}
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-400 hover:text-pink-300 transition-colors"
          >
            The Movie Database (TMDb)
          </a>
        </p>
      </motion.footer>
    </div>
  )
}
