import { ArrowLeft, MapPin, User } from 'lucide-react'

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

  return (
    <>
      {/* Hero Section */}
      <div className="relative">
        <button
          onClick={onBack}
          className="absolute top-6 left-6 z-10 flex items-center gap-2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white px-4 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Background Image */}
        {profileImages.length > 0 && (
          <div className="relative h-[60vh] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent z-10" />
            <img
              src={getPersonImageUrl(
                profileImages[selectedImageIndex]?.file_path
              )}
              alt={person.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
        )}

        {/* Person Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-6 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <img
                  src={getPersonImageUrl(person.profile_path)}
                  alt={person.name}
                  className="w-32 h-32 sm:w-48 sm:h-48 rounded-lg object-cover border-4 border-white shadow-xl"
                />
              </div>

              {/* Person Details */}
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 text-white">
                  {person.name}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-gray-300 mb-4">
                  {person.known_for_department && (
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{person.known_for_department}</span>
                    </div>
                  )}

                  {person.place_of_birth && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{person.place_of_birth}</span>
                    </div>
                  )}
                </div>

                {/* Birth/Death dates */}
                <div className="flex flex-wrap gap-4 text-gray-300 mb-4">
                  {person.birthday && (
                    <div>
                      <span className="font-semibold">Born: </span>
                      <span>{formatDate(person.birthday)}</span>
                    </div>
                  )}

                  {person.deathday && (
                    <div>
                      <span className="font-semibold">Died: </span>
                      <span>{formatDate(person.deathday)}</span>
                    </div>
                  )}
                </div>

                {/* Popularity */}
                {person.popularity && (
                  <div className="text-gray-300">
                    <span className="font-semibold">Popularity: </span>
                    <span>{person.popularity.toFixed(1)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Images Grid */}
      {profileImages.length > 1 && (
        <section className="py-8 bg-gray-800">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-6">Photos</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {profileImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => onImageSelect(index)}
                  className={`relative aspect-[2/3] rounded-lg overflow-hidden transition-all duration-200 hover:scale-105 ${
                    selectedImageIndex === index
                      ? 'ring-4 ring-blue-400 scale-105'
                      : 'hover:ring-2 hover:ring-gray-400'
                  }`}
                >
                  <img
                    src={getPersonImageUrl(image.file_path)}
                    alt={`${person.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
