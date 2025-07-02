import { Tv } from 'lucide-react'

import { CountryDropdown } from './CountryDropdown'

import type { Country } from '@/features/movies/types/movie.types'

interface NoProvidersProps {
  selectedCountryName: string
  countries: Country[]
  selectedCountry: string
  onCountrySelect: (countryCode: string) => void
}

export function NoProviders({
  selectedCountryName,
  countries,
  selectedCountry,
  onCountrySelect,
}: NoProvidersProps) {
  return (
    <section className="mb-8 sm:mb-12 animate-fadeIn">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold">Where to Watch</h2>

        <CountryDropdown
          countries={countries}
          selectedCountry={selectedCountry}
          selectedCountryName={selectedCountryName}
          onCountrySelect={onCountrySelect}
        />
      </div>

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center">
        <div className="text-gray-400 mb-2">
          <Tv className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-lg">Not available in {selectedCountryName}</p>
          <p className="text-sm mt-2">
            Try selecting a different country to see available streaming
            options.
          </p>
        </div>
      </div>
    </section>
  )
}
