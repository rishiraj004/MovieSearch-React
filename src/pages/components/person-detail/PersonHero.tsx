import { ArrowLeft, Calendar, MapPin, Star, User } from 'lucide-react'

import type { PersonHeroProps } from './PersonDetailTypes'

import { getPersonImageUrl } from '@/features/movies/utils/imageUtils'

export function PersonHero({
  person,
  profileImages,
  selectedImageIndex,
  onImageSelect,
  onBack,
}: PersonHeroProps) {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

  const calculateAge = (birthday: string, deathday?: string) => {
    const birthDate = new Date(birthday)
    const endDate = deathday ? new Date(deathday) : new Date()
    return endDate.getFullYear() - birthDate.getFullYear()
  }

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 sm:top-6 sm:left-6 z-30 flex items-center gap-2 bg-black/60 hover:bg-black/80 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg back-button-hover backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back</span>
        </button>

        {/* Background Image with Better Overlay */}
        {profileImages.length > 0 && (
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-gray-900/20 z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-transparent to-gray-900/40 z-10" />
            <img
              src={getPersonImageUrl(
                profileImages[selectedImageIndex]?.file_path
              )}
              alt={person.name}
              className="w-full h-full object-cover object-center opacity-40"
            />
          </div>
        )}

        {/* Main Content */}
        <div className="relative z-20 min-h-[70vh] flex items-end">
          <div className="container mx-auto px-4 sm:px-6 pb-8 sm:pb-12">
            <div className="max-w-4xl">
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
                {/* Profile Image */}
                <div className="flex-shrink-0">
                  <div className="relative profile-image-container">
                    <img
                      src={getPersonImageUrl(person.profile_path)}
                      alt={person.name}
                      className="w-32 h-32 sm:w-40 sm:h-40 lg:w-56 lg:h-56 rounded-2xl object-cover border-4 border-white/20 shadow-2xl backdrop-blur-sm"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </div>

                {/* Person Details */}
                <div className="flex-1 min-w-0 space-y-4">
                  <div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 text-white leading-tight">
                      {person.name}
                    </h1>

                    {person.known_for_department && (
                      <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm text-blue-300 px-3 py-1 rounded-full border border-blue-400/30">
                        <User className="w-4 h-4" />
                        <span className="font-medium">{person.known_for_department}</span>
                      </div>
                    )}
                  </div>

                  {/* Info Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {person.birthday && (
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20 info-card-hover">
                        <div className="flex items-center gap-2 text-gray-300 mb-1">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm font-medium">Born</span>
                        </div>
                        <p className="text-white font-semibold">{formatDate(person.birthday)}</p>
                        {person.birthday && (
                          <p className="text-gray-400 text-sm">
                            Age {calculateAge(person.birthday, person.deathday || undefined)}
                            {person.deathday && ' (at death)'}
                          </p>
                        )}
                      </div>
                    )}

                    {person.place_of_birth && (
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20 info-card-hover">
                        <div className="flex items-center gap-2 text-gray-300 mb-1">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm font-medium">Birthplace</span>
                        </div>
                        <p className="text-white font-semibold">{person.place_of_birth}</p>
                      </div>
                    )}

                    {person.popularity && (
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20 info-card-hover">
                        <div className="flex items-center gap-2 text-gray-300 mb-1">
                          <Star className="w-4 h-4" />
                          <span className="text-sm font-medium">Popularity</span>
                        </div>
                        <p className="text-white font-semibold">{person.popularity.toFixed(1)}</p>
                      </div>
                    )}

                    {person.deathday && (
                      <div className="bg-red-500/20 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-red-400/30 sm:col-span-2 lg:col-span-3 info-card-hover">
                        <div className="flex items-center gap-2 text-red-300 mb-1">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm font-medium">Died</span>
                        </div>
                        <p className="text-white font-semibold">{formatDate(person.deathday)}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Images Grid */}
      {profileImages.length > 1 && (
        <section className="py-8 sm:py-12 bg-gradient-to-b from-gray-800 to-gray-900">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center lg:text-left">
                Photo Gallery
              </h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4">
                {profileImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => onImageSelect(index)}
                    className={`group relative aspect-[2/3] rounded-lg overflow-hidden photo-gallery-item ${
                      selectedImageIndex === index
                        ? 'ring-4 ring-blue-400 scale-105 shadow-2xl'
                        : 'hover:ring-2 hover:ring-white/50 hover:shadow-xl'
                    }`}
                  >
                    <img
                      src={getPersonImageUrl(image.file_path)}
                      alt={`${person.name} ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {selectedImageIndex === index && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-blue-500 rounded-full p-2">
                          <Star className="w-4 h-4 text-white fill-current" />
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
