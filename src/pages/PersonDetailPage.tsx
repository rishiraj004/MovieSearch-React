import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import {
  PersonCredits,
  PersonHero,
  PersonInfo,
} from './components/person-detail'
import { usePersonDetails } from './hooks/usePersonDetails'

import type { Movie, TVShow } from '@/features/movies/types/movie.types'

export default function PersonDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  // Use custom hook
  const {
    person,
    loading,
    error,
    sortedMovieCredits,
    sortedTVCredits,
    profileImages,
  } = usePersonDetails(id)

  const handleBack = () => {
    navigate(-1)
  }

  const handleMovieClick = (movie: Movie) => {
    navigate(`/movie/${movie.id}`)
  }

  const handleTVShowClick = (tvShow: TVShow) => {
    navigate(`/tv/${tvShow.id}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading person details...</p>
        </div>
      </div>
    )
  }

  if (error || !person) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-gray-400 mb-6">{error || 'Person not found'}</p>
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

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <PersonHero
        person={person}
        profileImages={profileImages}
        selectedImageIndex={selectedImageIndex}
        onImageSelect={setSelectedImageIndex}
        onBack={handleBack}
      />

      <PersonInfo person={person} />

      <PersonCredits
        movieCredits={sortedMovieCredits}
        tvCredits={sortedTVCredits}
        onMovieClick={handleMovieClick}
        onTVShowClick={handleTVShowClick}
      />
    </div>
  )
}
