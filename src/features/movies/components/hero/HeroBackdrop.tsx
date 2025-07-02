import { getBackdropUrl } from '../../utils/imageUtils'

import type { HeroBackdropProps } from './HeroSectionTypes'

export function HeroBackdrop({
  movie,
  isSliding,
  slideIndex,
  movies,
}: HeroBackdropProps) {
  return (
    <>
      {/* Outgoing Background Image (fading out) */}
      {isSliding && (
        <div className="absolute inset-0 transition-opacity duration-400 ease-in-out opacity-0 z-0">
          <img
            key={movies[slideIndex]?.id}
            src={getBackdropUrl(movies[slideIndex]?.backdrop_path, 'ORIGINAL')}
            alt={movies[slideIndex]?.title}
            className="w-full h-full object-cover transition-opacity-smooth"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>
      )}

      {/* Incoming Background Image (fading in) */}
      <div className="absolute inset-0 transition-opacity duration-400 ease-in-out opacity-100 z-0">
        <img
          key={movie.id}
          src={getBackdropUrl(movie.backdrop_path, 'ORIGINAL')}
          alt={movie.title}
          className="w-full h-full object-cover transition-opacity-smooth"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>
    </>
  )
}
