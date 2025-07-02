import { Info, Play, Star } from 'lucide-react'

import type { HeroContentProps } from './HeroSectionTypes'

import { Button } from '@/shared/components/ui/button'

export function HeroContent({
  movie,
  onTrailerClick,
  onMoreInfoClick,
}: HeroContentProps) {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return `${text.substring(0, maxLength)}...`
  }

  return (
    <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16 lg:px-24">
      <div className="max-w-2xl">
        {/* Featured Badge */}
        <div className="inline-flex items-center bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
          Featured
        </div>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex items-center bg-yellow-500 text-black px-2 py-1 rounded-lg">
            <Star className="w-4 h-4 mr-1 fill-current" />
            <span className="font-bold">{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>

        {/* Movie Title */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
          {movie.title}
        </h2>

        {/* Overview */}
        <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
          {truncateText(movie.overview, 200)}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button
            onClick={onTrailerClick}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-xl flex items-center justify-center"
            size="lg"
          >
            <Play className="w-5 h-5 mr-2 fill-current" />
            Watch Trailer
          </Button>
          <Button
            onClick={onMoreInfoClick}
            variant="outline"
            className="border-2 border-white/80 bg-black/40 backdrop-blur-md text-white hover:bg-white hover:text-black px-8 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-xl"
            size="lg"
          >
            <Info className="w-5 h-5 mr-2" />
            More Info
          </Button>
        </div>
      </div>
    </div>
  )
}
