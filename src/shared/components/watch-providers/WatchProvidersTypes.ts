import type { WatchProvider } from '@/features/movies/types/movie.types'

export interface WatchProvidersSectionProps {
  id: number
  type: 'movie' | 'tv'
}

export interface CountryDropdownProps {
  countries: Country[]
  selectedCountry: string
  selectedCountryName: string
  isDropdownOpen: boolean
  searchTerm: string
  filteredCountries: Country[]
  onCountrySelect: (countryCode: string) => void
  onDropdownToggle: () => void
  onSearchChange: (term: string) => void
  dropdownRef: React.RefObject<HTMLDivElement>
  searchInputRef: React.RefObject<HTMLInputElement>
}

export interface ProviderGroupProps {
  providers: WatchProvider[]
  title: string
  icon: React.ReactNode
  color: string
}

export interface WatchProvidersData {
  watchProviders: WatchProvidersResponse | null
  countries: Country[]
  selectedCountry: string
  selectedCountryName: string
  currentCountryProviders:
    | {
        flatrate?: WatchProvider[]
        rent?: WatchProvider[]
        buy?: WatchProvider[]
        ads?: WatchProvider[]
      }
    | undefined
  loading: boolean
}

export interface Country {
  iso_3166_1: string
  english_name: string
}

export interface WatchProvidersResponse {
  results: Record<
    string,
    {
      flatrate?: WatchProvider[]
      rent?: WatchProvider[]
      buy?: WatchProvider[]
      ads?: WatchProvider[]
    }
  >
}
