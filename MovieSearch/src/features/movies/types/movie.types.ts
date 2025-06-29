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

export interface ProductionCountry {
  iso_3166_1: string
  name: string
}

export interface SpokenLanguage {
  iso_639_1: string
  name: string
  english_name: string
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
