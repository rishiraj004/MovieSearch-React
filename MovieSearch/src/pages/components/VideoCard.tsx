import { Play, ExternalLink, Calendar } from 'lucide-react'

import type { Video } from '@/features/movies/types/movie.types'

interface VideoCardProps {
  video: Video
  onVideoClick?: (video: Video) => void
}

export function VideoCard({ video, onVideoClick }: VideoCardProps) {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    } catch {
      return ''
    }
  }

  const getVideoThumbnail = (key: string, site: string) => {
    if (site === 'YouTube') {
      return `https://img.youtube.com/vi/${key}/hqdefault.jpg`
    }
    // Fallback placeholder
    return 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="320" height="180" viewBox="0 0 320 180"%3E%3Cdefs%3E%3ClinearGradient id="bg" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23374151"/%3E%3Cstop offset="100%25" style="stop-color:%23111827"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="320" height="180" fill="url(%23bg)"/%3E%3Cg fill="%23D1D5DB" opacity="0.6"%3E%3Ccircle cx="160" cy="90" r="30" fill="%23EF4444"/%3E%3Cpath d="M150 80 L150 100 L170 90 Z" fill="white"/%3E%3C/g%3E%3C/svg%3E'
  }

  const getVideoUrl = (key: string, site: string) => {
    if (site === 'YouTube') {
      return `https://www.youtube.com/watch?v=${key}`
    }
    return '#'
  }

  const handleClick = () => {
    if (onVideoClick) {
      onVideoClick(video)
    } else {
      // Default behavior - open video in new tab
      window.open(getVideoUrl(video.key, video.site), '_blank')
    }
  }

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'trailer':
        return 'bg-red-600'
      case 'teaser':
        return 'bg-orange-600'
      case 'clip':
        return 'bg-blue-600'
      case 'featurette':
        return 'bg-purple-600'
      case 'behind the scenes':
        return 'bg-green-600'
      default:
        return 'bg-gray-600'
    }
  }

  return (
    <div
      className="group cursor-pointer animate-fadeInUp hover:scale-105 active:scale-95 transition-all duration-300"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
    >
      <div className="relative rounded-xl overflow-hidden bg-gray-800 shadow-lg group-hover:shadow-xl transition-all duration-300">
        {/* Video Thumbnail */}
        <div className="relative aspect-video">
          <img
            src={getVideoThumbnail(video.key, video.site)}
            alt={video.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
            <div className="bg-red-600 group-hover:bg-red-500 text-white rounded-full p-4 group-hover:scale-110 transition-all duration-300 shadow-lg">
              <Play className="w-6 h-6 ml-1" fill="currentColor" />
            </div>
          </div>

          {/* Video Type Badge */}
          <div className={`absolute top-3 left-3 ${getTypeColor(video.type)} text-white text-xs px-2 py-1 rounded-full font-medium`}>
            {video.type}
          </div>

          {/* External Link Icon */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ExternalLink className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Video Info */}
        <div className="p-4">
          <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors duration-300">
            {video.name}
          </h3>
          
          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(video.published_at)}</span>
            </div>
            
            {video.site && (
              <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs font-medium">
                {video.site}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
