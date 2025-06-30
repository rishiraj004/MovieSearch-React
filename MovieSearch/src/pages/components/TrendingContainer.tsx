import { useNavigate } from 'react-router-dom'

import { TrendingSection } from '@/features/movies/components/TrendingSection'
import type { Movie, TVShow, Person } from '@/features/movies/types/movie.types'

export function TrendingContainer() {
  const navigate = useNavigate()

  const handleMovieClick = (item: Movie | TVShow | Person) => {
    if ('title' in item) {
      // It's a Movie
      navigate(`/movie/${item.id}`)
    }
  }

  const handleTVClick = (item: Movie | TVShow | Person) => {
    if ('name' in item && 'first_air_date' in item) {
      // It's a TV Show
      navigate(`/tv/${item.id}`)
    }
  }

  const handlePersonClick = (item: Movie | TVShow | Person) => {
    if ('name' in item && 'profile_path' in item) {
      // It's a Person
      navigate(`/person/${item.id}`)
    }
  }

  return (
    <div id="trending-section" className="min-h-screen bg-[#1a1a1a] text-white py-8">
      <div className="space-y-8">
        <TrendingSection
          title="Trending Movies"
          type="movie"
          onItemClick={handleMovieClick}
        />

        <TrendingSection
          title="Trending TV Shows"
          type="tv"
          onItemClick={handleTVClick}
        />

        <TrendingSection
          title="Trending People"
          type="person"
          onItemClick={handlePersonClick}
        />
      </div>
    </div>
  )
}
