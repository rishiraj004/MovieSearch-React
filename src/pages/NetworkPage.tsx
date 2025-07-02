import { ArrowLeft, Tv, Globe, MapPin } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { movieService } from '@/features/movies/services/movie.service'
import type { NetworkDetails } from '@/features/movies/types/movie.types'
import { getImageUrl } from '@/features/movies/utils/imageUtils'

export function NetworkPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [network, setNetwork] = useState<NetworkDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setError('Network ID is required')
      setLoading(false)
      return
    }

    const fetchNetworkData = async () => {
      try {
        setLoading(true)
        setError(null)

        const networkId = parseInt(id, 10)
        if (isNaN(networkId)) {
          throw new Error('Invalid network ID')
        }

        const networkDetails = await movieService.getNetwork(networkId)
        setNetwork(networkDetails)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch network details')
      } finally {
        setLoading(false)
      }
    }

    fetchNetworkData()
  }, [id])

  const handleBack = () => {
    navigate(-1)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center animate-fadeIn">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading network details...</p>
        </div>
      </div>
    )
  }

  if (error || !network) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center animate-fadeIn">
          <div className="text-6xl mb-4">📺</div>
          <h2 className="text-2xl font-bold mb-2">Network Not Found</h2>
          <p className="text-gray-400 mb-6">{error || 'The requested network could not be found.'}</p>
          <button
            onClick={handleBack}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-br from-blue-900/30 to-purple-900/30 py-4 sm:py-6 lg:py-8 animate-fadeIn"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 opacity-50" />
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 max-w-4xl">
            {/* Network Logo */}
            <div className="flex-shrink-0 order-1 sm:order-none animate-fadeInUp">
              <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-white/10 rounded-2xl border-2 border-white/20 shadow-2xl flex items-center justify-center p-4 sm:p-6">
                {network.logo_path ? (
                  <img
                    src={getImageUrl(network.logo_path, 'W500')}
                    alt={network.name}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <Tv className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-gray-400" />
                )}
              </div>
            </div>

            {/* Network Info */}
            <div className="flex-1 text-center sm:text-left order-2 sm:order-none animate-fadeInUp">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 leading-tight">
                {network.name}
              </h1>

              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <button
                  onClick={handleBack}
                  className="w-full sm:w-auto bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg transition-colors inline-flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  Back
                </button>
                {network.homepage && (
                  <a
                    href={network.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg transition-colors inline-flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Network Information */}
      <div className="container mx-auto px-4 sm:px-6 py-2 sm:py-4">
        <section className="mb-8 sm:mb-12 animate-fadeIn">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center sm:text-left">Network Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Origin Country */}
            {network.origin_country && (
              <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                  <h3 className="text-lg sm:text-xl font-semibold">Origin Country</h3>
                </div>
                <p className="text-gray-300 text-base sm:text-lg">{network.origin_country}</p>
              </div>
            )}

            {/* Headquarters */}
            {network.headquarters && (
              <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                  <h3 className="text-lg sm:text-xl font-semibold">Headquarters</h3>
                </div>
                <p className="text-gray-300 text-base sm:text-lg">{network.headquarters}</p>
              </div>
            )}

            {/* Network Type */}
            <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <Tv className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                <h3 className="text-lg sm:text-xl font-semibold">Network Type</h3>
              </div>
              <p className="text-gray-300 text-base sm:text-lg">Television Network</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
