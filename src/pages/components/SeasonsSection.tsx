import { Calendar, Clock, Play, Star, ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'

import { movieService } from '@/features/movies/services/movie.service'
import type { Season, SeasonDetails, Episode } from '@/features/movies/types/movie.types'
import { getImageUrl } from '@/features/movies/utils/imageUtils'

interface SeasonsSectionProps {
  seasons: Season[]
  tvShowId: number
}

export function SeasonsSection({ seasons, tvShowId }: SeasonsSectionProps) {
  const [expandedSeasons, setExpandedSeasons] = useState<Set<number>>(new Set())
  const [seasonDetails, setSeasonDetails] = useState<Record<number, SeasonDetails>>({})
  const [loadingSeasons, setLoadingSeasons] = useState<Set<number>>(new Set())

  const toggleSeason = async (seasonNumber: number) => {
    const newExpanded = new Set(expandedSeasons)
    
    if (expandedSeasons.has(seasonNumber)) {
      newExpanded.delete(seasonNumber)
    } else {
      newExpanded.add(seasonNumber)
      
      // Fetch season details if not already loaded
      if (!seasonDetails[seasonNumber] && !loadingSeasons.has(seasonNumber)) {
        setLoadingSeasons(prev => new Set(prev).add(seasonNumber))
        
        try {
          const details = await movieService.getTVShowSeasonDetails(tvShowId, seasonNumber)
          setSeasonDetails(prev => ({ ...prev, [seasonNumber]: details }))
        } catch (error) {
          // Handle error silently, episodes will show as unavailable
          void error
        } finally {
          setLoadingSeasons(prev => {
            const newSet = new Set(prev)
            newSet.delete(seasonNumber)
            return newSet
          })
        }
      }
    }
    
    setExpandedSeasons(newExpanded)
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'TBA'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Filter out season 0 (specials) and sort by season number
  const regularSeasons = seasons
    .filter(season => season.season_number > 0)
    .sort((a, b) => a.season_number - b.season_number)

  if (regularSeasons.length === 0) return null

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center sm:text-left">Seasons</h2>
        
        <div className="space-y-4">
          {regularSeasons.map((season) => (
            <div
              key={season.id}
              className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden animate-fadeInUp"
            >
              <button
                onClick={() => toggleSeason(season.season_number)}
                className="w-full p-4 sm:p-6 flex items-center gap-4 hover:bg-gray-750 transition-colors text-left"
              >
                <div className="flex-shrink-0">
                  {expandedSeasons.has(season.season_number) ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                
                <div className="flex-shrink-0">
                  <img
                    src={getImageUrl(season.poster_path, 'W154')}
                    alt={season.name}
                    className="w-16 h-24 sm:w-20 sm:h-30 object-cover rounded-md"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                    {season.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(season.air_date)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Play className="w-4 h-4" />
                      {season.episode_count} episodes
                    </div>
                    {season.vote_average > 0 && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        {season.vote_average.toFixed(1)}
                      </div>
                    )}
                  </div>
                  {season.overview && (
                    <p className="text-sm text-gray-300 line-clamp-2">
                      {season.overview}
                    </p>
                  )}
                </div>
              </button>
              
              {expandedSeasons.has(season.season_number) && (
                <div className="border-t border-gray-700 bg-gray-850 animate-fadeIn">
                  {loadingSeasons.has(season.season_number) ? (
                    <div className="p-6 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-2"></div>
                      <p className="text-gray-400">Loading episodes...</p>
                    </div>
                  ) : (
                    <EpisodesList 
                      episodes={seasonDetails[season.season_number]?.episodes || []} 
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

interface EpisodesListProps {
  episodes: Episode[]
}

function EpisodesList({ episodes }: EpisodesListProps) {
  if (episodes.length === 0) {
    return (
      <div className="p-6 text-center text-gray-400">
        <p>No episode details available</p>
      </div>
    )
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'TBA'
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatRuntime = (runtime: number | null) => {
    if (!runtime) return 'N/A'
    return `${runtime}m`
  }

  return (
    <div className="p-4 sm:p-6">
      <h4 className="text-lg font-semibold text-white mb-4">Episodes</h4>
      <div className="space-y-3">
        {episodes.map((episode) => (
          <div
            key={episode.id}
            className="flex gap-4 p-3 rounded-lg bg-gray-800 hover:bg-gray-750 transition-colors animate-slideInLeft"
          >
            <div className="flex-shrink-0">
              <img
                src={getImageUrl(episode.still_path, 'W342')}
                alt={episode.name}
                className="w-20 h-12 sm:w-24 sm:h-14 object-cover rounded"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h5 className="font-medium text-white text-sm sm:text-base line-clamp-1">
                  {episode.episode_number}. {episode.name}
                </h5>
                {episode.vote_average > 0 && (
                  <div className="flex items-center gap-1 text-xs text-yellow-400 flex-shrink-0">
                    <Star className="w-3 h-3 fill-current" />
                    {episode.vote_average.toFixed(1)}
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mb-2">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(episode.air_date)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatRuntime(episode.runtime)}
                </div>
              </div>
              
              {episode.overview && (
                <p className="text-xs sm:text-sm text-gray-300 line-clamp-2">
                  {episode.overview}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
