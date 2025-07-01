import { MapPin, User, Film, Tv, Camera } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { MovieCard } from './components'
import { TVShowCard } from './components/TVShowCard'

import { movieService } from '@/features/movies/services/movie.service'
import type { PersonDetails, PersonMovieCredits, PersonTVCredits, PersonImagesResponse, Movie, TVShow } from '@/features/movies/types/movie.types'
import { getPersonImageUrl, getImageUrl } from '@/features/movies/utils/imageUtils'

export function PersonDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [person, setPerson] = useState<PersonDetails | null>(null)
  const [movieCredits, setMovieCredits] = useState<PersonMovieCredits | null>(null)
  const [tvCredits, setTVCredits] = useState<PersonTVCredits | null>(null)
  const [images, setImages] = useState<PersonImagesResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [_selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    if (!id) {
      setError('Person ID is required')
      setLoading(false)
      return
    }

    const fetchPersonData = async () => {
      try {
        setLoading(true)
        setError(null)

        const personId = parseInt(id, 10)
        if (isNaN(personId)) {
          throw new Error('Invalid person ID')
        }

        const [personDetails, personMovieCredits, personTVCredits, personImages] = await Promise.all([
          movieService.getPersonDetails(personId),
          movieService.getPersonMovieCredits(personId),
          movieService.getPersonTVCredits(personId),
          movieService.getPersonImages(personId)
        ])

        setPerson(personDetails)
        setMovieCredits(personMovieCredits)
        setTVCredits(personTVCredits)
        setImages(personImages)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch person details')
      } finally {
        setLoading(false)
      }
    }

    fetchPersonData()
  }, [id])

  const handleMovieClick = (movie: Movie) => {
    navigate(`/movie/${movie.id}`)
  }

  const handleTVShowClick = (tvShow: TVShow) => {
    navigate(`/tv/${tvShow.id}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center animate-fadeIn">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading person details...</p>
        </div>
      </div>
    )
  }

  if (error || !person) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center animate-fadeIn">
          <div className="text-6xl mb-4">👤</div>
          <h2 className="text-2xl font-bold mb-2">Person Not Found</h2>
          <p className="text-gray-400 mb-6">{error || 'The requested person could not be found.'}</p>
        </div>
      </div>
    )
  }

  const age = person.birthday && !person.deathday 
    ? new Date().getFullYear() - new Date(person.birthday).getFullYear()
    : null

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Unknown'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const sortedMovieCredits = movieCredits?.cast
    .filter(credit => credit.release_date)
    .sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime())
    .slice(0, 20)
    .map(credit => ({
      id: credit.id,
      title: credit.title,
      overview: credit.overview,
      poster_path: credit.poster_path,
      backdrop_path: credit.backdrop_path,
      release_date: credit.release_date,
      vote_average: credit.vote_average,
      vote_count: credit.vote_count,
      genre_ids: credit.genre_ids,
      adult: credit.adult,
      original_language: credit.original_language,
      original_title: credit.original_title,
      popularity: credit.popularity,
      video: credit.video
    } as Movie)) || []

  const sortedTVCredits = tvCredits?.cast
    .filter(credit => credit.first_air_date)
    .sort((a, b) => new Date(b.first_air_date).getTime() - new Date(a.first_air_date).getTime())
    .slice(0, 20)
    .map(credit => ({
      id: credit.id,
      name: credit.name,
      overview: credit.overview,
      poster_path: credit.poster_path,
      backdrop_path: credit.backdrop_path,
      first_air_date: credit.first_air_date,
      vote_average: credit.vote_average,
      vote_count: credit.vote_count,
      genre_ids: credit.genre_ids,
      adult: credit.adult,
      original_language: credit.original_language,
      original_name: credit.original_name,
      popularity: credit.popularity,
      origin_country: credit.origin_country
    } as TVShow)) || []

  const profileImages = images?.profiles.slice(0, 10) || []

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-2 sm:py-4 animate-fadeIn">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Image */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="aspect-[2/3] rounded-lg overflow-hidden bg-gray-800 mb-6">
                  <img
                    src={getPersonImageUrl(person.profile_path)}
                    alt={person.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Personal Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <User className="w-5 h-5 text-purple-400" />
                      Personal Info
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-400">Known For:</span>
                        <span className="ml-2">{person.known_for_department}</span>
                      </div>
                      
                      {person.gender !== 0 && (
                        <div>
                          <span className="text-gray-400">Gender:</span>
                          <span className="ml-2">{person.gender === 1 ? 'Female' : person.gender === 2 ? 'Male' : 'Non-binary'}</span>
                        </div>
                      )}
                      
                      <div>
                        <span className="text-gray-400">Birthday:</span>
                        <span className="ml-2">{formatDate(person.birthday)}</span>
                        {age && <span className="text-gray-500"> ({age} years old)</span>}
                      </div>
                      
                      {person.deathday && (
                        <div>
                          <span className="text-gray-400">Died:</span>
                          <span className="ml-2">{formatDate(person.deathday)}</span>
                        </div>
                      )}
                      
                      {person.place_of_birth && (
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                          <span>{person.place_of_birth}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {person.also_known_as && person.also_known_as.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Also Known As</h4>
                      <div className="text-sm text-gray-300 space-y-1">
                        {person.also_known_as.slice(0, 5).map((alias, index) => (
                          <div key={index}>{alias}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Name and Basic Info */}
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold mb-4">{person.name}</h1>
                
                {/* Biography */}
                {person.biography && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Biography</h2>
                    <div className="text-gray-300 leading-relaxed space-y-4">
                      {person.biography.split('\n\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Photo Gallery */}
              {profileImages.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Camera className="w-6 h-6 text-purple-400" />
                    Photos
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {profileImages.map((image, index) => (
                      <button
                        key={index}
                        className="aspect-[2/3] rounded-lg overflow-hidden bg-gray-800 cursor-pointer hover:ring-2 hover:ring-purple-400 transition-all hover:scale-[1.05] active:scale-[0.95]"
                        onClick={() => setSelectedImageIndex(index)}
                        aria-label={`View photo ${index + 1} of ${person.name}`}
                      >
                        <img
                          src={getImageUrl(image.file_path, 'W185')}
                          alt={`${person.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Movie Credits */}
      {sortedMovieCredits.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 py-2 sm:py-4 animate-fadeInUp">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-2">
              <Film className="w-6 h-6 text-blue-400" />
              Known For (Movies)
            </h2>
            <div className="flex overflow-x-auto scrollbar-hide gap-6 pb-4">
              {sortedMovieCredits.map((movie, index) => (
                <div key={`${movie.id}-${index}`} className="flex-shrink-0 w-48">
                  <MovieCard
                    movie={movie}
                    onClick={handleMovieClick}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TV Credits */}
      {sortedTVCredits.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 py-2 sm:py-4 animate-fadeInUp">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-2">
              <Tv className="w-6 h-6 text-green-400" />
              Known For (TV Shows)
            </h2>
            <div className="flex overflow-x-auto scrollbar-hide gap-6 pb-4">
              {sortedTVCredits.map((tvShow, index) => (
                <div key={`${tvShow.id}-${index}`} className="flex-shrink-0 w-48">
                  <TVShowCard
                    tvShow={tvShow}
                    onClick={handleTVShowClick}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

