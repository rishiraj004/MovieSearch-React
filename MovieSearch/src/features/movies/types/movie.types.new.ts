// Add new discover interfaces at the end of the file

// Discover Movie params
export interface DiscoverMovieParams {
  with_genres?: string
  sort_by?: string
  'vote_average.gte'?: string
  'vote_average.lte'?: string
  'vote_count.gte'?: string
  with_original_language?: string
  year?: string
  'primary_release_date.gte'?: string
  'primary_release_date.lte'?: string
  with_runtime?: string
  with_companies?: string
  include_adult?: boolean
  page?: number
  [key: string]: string | number | boolean | undefined
}

// Discover TV params
export interface DiscoverTVParams {
  with_genres?: string
  sort_by?: string
  'vote_average.gte'?: string
  'vote_average.lte'?: string
  'vote_count.gte'?: string
  with_original_language?: string
  'first_air_date.gte'?: string
  'first_air_date.lte'?: string
  with_networks?: string
  include_adult?: boolean
  page?: number
  [key: string]: string | number | boolean | undefined
}

// Genre response
export interface GenresResponse {
  genres: Genre[]
}
