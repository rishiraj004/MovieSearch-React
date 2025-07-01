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

export interface PersonDetails extends Person {
  also_known_as: string[]
  biography: string
  birthday: string | null
  deathday: string | null
  homepage: string | null
  imdb_id: string | null
  place_of_birth: string | null
}

export interface PersonMovieCredits {
  id: number
  cast: PersonMovieCast[]
  crew: PersonMovieCrew[]
}

export interface PersonTVCredits {
  id: number
  cast: PersonTVCast[]
  crew: PersonTVCrew[]
}

export interface PersonMovieCast {
  id: number
  title: string
  character: string
  credit_id: string
  order: number
  adult: boolean
  backdrop_path: string | null
  genre_ids: number[]
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  release_date: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface PersonMovieCrew {
  id: number
  title: string
  job: string
  department: string
  credit_id: string
  adult: boolean
  backdrop_path: string | null
  genre_ids: number[]
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  release_date: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface PersonTVCast {
  id: number
  name: string
  character: string
  credit_id: string
  order: number
  adult: boolean
  backdrop_path: string | null
  genre_ids: number[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string | null
  first_air_date: string
  vote_average: number
  vote_count: number
  origin_country: string[]
  episode_count: number
}

export interface PersonTVCrew {
  id: number
  name: string
  job: string
  department: string
  credit_id: string
  adult: boolean
  backdrop_path: string | null
  genre_ids: number[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string | null
  first_air_date: string
  vote_average: number
  vote_count: number
  origin_country: string[]
  episode_count: number
}

export interface PersonImage {
  aspect_ratio: number
  file_path: string
  height: number
  width: number
  vote_average: number
  vote_count: number
}

export interface PersonImagesResponse {
  id: number
  profiles: PersonImage[]
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

// TV Show Details (similar to MovieDetails but with TV-specific fields)
export interface TVShowDetails extends TVShow {
  genres: Genre[]
  episode_run_time: number[]
  status: string
  tagline: string
  homepage: string
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  spoken_languages: SpokenLanguage[]
  number_of_episodes: number
  number_of_seasons: number
  seasons: Season[]
  networks: Network[]
  created_by: CreatedBy[]
  in_production: boolean
  languages: string[]
  last_air_date: string | null
  next_episode_to_air: Episode | null
  last_episode_to_air: Episode | null
  type: string
}

export interface Season {
  id: number
  air_date: string | null
  episode_count: number
  name: string
  overview: string
  poster_path: string | null
  season_number: number
  vote_average: number
}

export interface SeasonDetails extends Season {
  episodes: Episode[]
}

export interface Episode {
  id: number
  air_date: string | null
  episode_number: number
  name: string
  overview: string
  runtime: number | null
  season_number: number
  still_path: string | null
  vote_average: number
  vote_count: number
  production_code: string
  show_id: number
  crew: Crew[]
  guest_stars: Cast[]
}

export interface Network {
  id: number
  logo_path: string | null
  name: string
  origin_country: string
}

export interface CreatedBy {
  id: number
  credit_id: string
  name: string
  gender: number
  profile_path: string | null
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

// Extended types for TV show detail page (currently alias, can be extended later)
export type TVShowDetailsExtended = TVShowDetails

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

// Multi-search types
export interface MultiSearchItem extends Partial<Movie>, Partial<TVShow>, Partial<Person> {
  media_type: 'movie' | 'tv' | 'person'
}

export interface MultiSearchResponse {
  page: number
  results: MultiSearchItem[]
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
