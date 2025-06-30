import { useNavigate } from 'react-router-dom'

import { TopRatedSection } from '@/features/movies/components/TopRatedSection'
import type { Movie, TVShow } from '@/features/movies/types/movie.types'

export function TopRatedContainer() {
  const navigate = useNavigate()

  const handleMovieClick = (item: Movie | TVShow) => {
    if ('title' in item) {
      // It's a Movie
      navigate(`/movie/${item.id}`)
    }
  }

  const handleTVClick = (item: Movie | TVShow) => {
    if ('name' in item) {
      // It's a TV Show - in a real app, you might navigate to a TV show details page
      void item // Silence the unused variable warning
    }
  }

  return (
    <section id="top-rated-section" className="py-8 bg-gray-900/80">
      <TopRatedSection
        title="Top Rated Movies"
        type="movie"
        onItemClick={handleMovieClick}
      />
      
      <div className="mt-8">
        <TopRatedSection
          title="Top Rated TV Shows"
          type="tv"
          onItemClick={handleTVClick}
        />
      </div>
    </section>
  )
}
