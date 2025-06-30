import type { Movie } from '@/features/movies/types/movie.types'

interface SelectedMovieDebugProps {
  selectedMovie: Movie
}

export function SelectedMovieDebug({ selectedMovie }: SelectedMovieDebugProps) {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="bg-blue-500/10 backdrop-blur-md border border-blue-500/20 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8">
        <h3 className="font-bold text-blue-300 text-lg md:text-xl mb-3 md:mb-4">Selected Movie:</h3>
        <p className="text-white text-base md:text-lg">
          {selectedMovie.title} 
          <span className="text-gray-400 ml-2">
            ({new Date(selectedMovie.release_date).getFullYear()})
          </span>
        </p>
      </div>
    </div>
  )
}
