// Movie API Types
export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  adult: boolean
  original_language: string
  original_title: string
  popularity: number
  video: boolean
}

// TV Show API Types
export interface TVShow {
  id: number
  name: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  first_air_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  adult: boolean
  original_language: string
  original_name: string
  popularity: number
  origin_country: string[]
}

// Person API Types
export interface Person {
  id: number
  name: string
  profile_path: string | null
  adult: boolean
  popularity: number
  known_for_department: string
  known_for: (Movie | TVShow)[]
  gender: number
}

export interface MovieDetails extends Movie {
  genres: Genre[]
  runtime: number
  status: string
  tagline: string
  budget: number
  revenue: number
  homepage: string
  imdb_id: string
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  spoken_languages: SpokenLanguage[]
}

export interface Genre {
  id: number
  name: string
}

export interface ProductionCompany {
  id: number
  logo_path: string | null
  name: string
  origin_country: string
}

export interface ProductionCompanyDetails extends ProductionCompany {
  description: string
  headquarters: string
  homepage: string
  parent_company: ProductionCompany | null
}

export interface ProductionCountry {
  iso_3166_1: string
  name: string
}

export interface SpokenLanguage {
  iso_639_1: string
  name: string
  english_name: string
}

// Extended types for movie detail page
export interface MovieDetailsExtended extends MovieDetails {
  belongs_to_collection: Collection | null
}

export interface Collection {
  id: number
  name: string
  poster_path: string | null
  backdrop_path: string | null
}

export interface CollectionDetails extends Collection {
  overview: string
  parts: Movie[]
}

export interface Cast {
  id: number
  name: string
  character: string
  profile_path: string | null
  order: number
  cast_id: number
  credit_id: string
  adult: boolean
  gender: number
  known_for_department: string
  original_name: string
  popularity: number
}

export interface Crew {
  id: number
  name: string
  job: string
  department: string
  profile_path: string | null
  credit_id: string
  adult: boolean
  gender: number
  known_for_department: string
  original_name: string
  popularity: number
}

export interface Credits {
  id: number
  cast: Cast[]
  crew: Crew[]
}

export interface Review {
  id: string
  author: string
  author_details: {
    name: string
    username: string
    avatar_path: string | null
    rating: number | null
  }
  content: string
  created_at: string
  updated_at: string
  url: string
}

export interface ReviewsResponse {
  id: number
  page: number
  results: Review[]
  total_pages: number
  total_results: number
}

export interface RecommendationsResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

// API Response Types
export interface MovieSearchResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export interface TVShowSearchResponse {
  page: number
  results: TVShow[]
  total_pages: number
  total_results: number
}

export interface PersonSearchResponse {
  page: number
  results: Person[]
  total_pages: number
  total_results: number
}

export interface ApiError {
  status_code: number
  status_message: string
  success: boolean
}

export interface Video {
  id: string
  iso_639_1: string
  iso_3166_1: string
  key: string
  name: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
}

export interface VideosResponse {
  id: number
  results: Video[]
}

export interface WatchProvider {
  display_priority: number
  logo_path: string
  provider_id: number
  provider_name: string
}

export interface CountryWatchProviders {
  link?: string
  flatrate?: WatchProvider[]
  rent?: WatchProvider[]
  buy?: WatchProvider[]
  ads?: WatchProvider[]
}

export interface WatchProvidersResponse {
  id: number
  results: {
    [countryCode: string]: CountryWatchProviders
  }
}

export interface Country {
  iso_3166_1: string
  english_name: string
  native_name: string
}

export interface CountriesResponse {
  countries: Country[]
}
