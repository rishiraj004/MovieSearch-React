import { motion } from 'framer-motion'
import { ArrowLeft, Building2, Globe, MapPin } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { movieService } from '@/features/movies/services/movie.service'
import type { ProductionCompanyDetails } from '@/features/movies/types/movie.types'
import { getImageUrl } from '@/features/movies/utils/imageUtils'

export function ProductionCompanyPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [company, setCompany] = useState<ProductionCompanyDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setError('Company ID is required')
      setLoading(false)
      return
    }

    const fetchCompanyData = async () => {
      try {
        setLoading(true)
        setError(null)

        const companyId = parseInt(id, 10)
        if (isNaN(companyId)) {
          throw new Error('Invalid company ID')
        }

        const companyDetails = await movieService.getProductionCompany(companyId)
        setCompany(companyDetails)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch company details')
      } finally {
        setLoading(false)
      }
    }

    fetchCompanyData()
  }, [id])

  const handleBack = () => {
    navigate(-1)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading company details...</p>
        </motion.div>
      </div>
    )
  }

  if (error || !company) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-6xl mb-4">🏢</div>
          <h2 className="text-2xl font-bold mb-2">Company Not Found</h2>
          <p className="text-gray-400 mb-6">{error || 'The requested company could not be found.'}</p>
          <button
            onClick={handleBack}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <motion.section
        className="relative bg-gradient-to-br from-blue-900/30 to-purple-900/30 py-12 sm:py-16 lg:py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 opacity-50" />
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 max-w-4xl">
            {/* Company Logo */}
            <motion.div
              className="flex-shrink-0 order-1 sm:order-none"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-white/10 rounded-2xl border-2 border-white/20 shadow-2xl flex items-center justify-center p-4 sm:p-6">
                {company.logo_path ? (
                  <img
                    src={getImageUrl(company.logo_path, 'W500')}
                    alt={company.name}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <Building2 className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-gray-400" />
                )}
              </div>
            </motion.div>

            {/* Company Info */}
            <motion.div
              className="flex-1 text-center sm:text-left order-2 sm:order-none"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 leading-tight">
                {company.name}
              </h1>
              
              {company.description && (
                <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed mb-4 sm:mb-6">
                  {company.description}
                </p>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <button
                  onClick={handleBack}
                  className="w-full sm:w-auto bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg transition-colors inline-flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  Back
                </button>
                {company.homepage && (
                  <a
                    href={company.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg transition-colors inline-flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                    Visit Website
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Company Information */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.section
          className="mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center sm:text-left">Company Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Headquarters */}
            {company.headquarters && (
              <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                  <h3 className="text-lg sm:text-xl font-semibold">Headquarters</h3>
                </div>
                <p className="text-gray-300 text-base sm:text-lg">{company.headquarters}</p>
              </div>
            )}

            {/* Origin Country */}
            {company.origin_country && (
              <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                  <h3 className="text-lg sm:text-xl font-semibold">Origin Country</h3>
                </div>
                <p className="text-gray-300 text-base sm:text-lg">{company.origin_country}</p>
              </div>
            )}

            {/* Parent Company */}
            {company.parent_company && (
              <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                  <h3 className="text-lg sm:text-xl font-semibold">Parent Company</h3>
                </div>
                <p className="text-gray-300 text-base sm:text-lg">{company.parent_company.name}</p>
              </div>
            )}
          </div>
        </motion.section>
      </div>
    </div>
  )
}
