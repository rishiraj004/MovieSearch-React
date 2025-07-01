// Add new methods to the MovieService class

// Get genres for movies or TV shows
async getGenres(type: 'movie' | 'tv'): Promise<GenresResponse> {
  const endpoint = `/genre/${type}/list?api_key=${this.apiKey}&language=en-US`
  return this.fetchFromApi<GenresResponse>(endpoint)
}

// Search TV shows
async searchTVShows(query: string, page: number = 1): Promise<TVShowSearchResponse> {
  const endpoint = `/search/tv?api_key=${this.apiKey}&query=${encodeURIComponent(query)}&page=${page}&language=en-US`
  return this.fetchFromApi<TVShowSearchResponse>(endpoint)
}

// Discover movies with filters
async discoverMovies(params: DiscoverMovieParams): Promise<MovieSearchResponse> {
  let queryParams = new URLSearchParams()
  queryParams.append('api_key', this.apiKey)
  queryParams.append('language', 'en-US')
  
  // Add all params to the query
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      queryParams.append(key, value.toString())
    }
  })
  
  const endpoint = `/discover/movie?${queryParams.toString()}`
  return this.fetchFromApi<MovieSearchResponse>(endpoint)
}

// Discover TV shows with filters
async discoverTVShows(params: DiscoverTVParams): Promise<TVShowSearchResponse> {
  let queryParams = new URLSearchParams()
  queryParams.append('api_key', this.apiKey)
  queryParams.append('language', 'en-US')
  
  // Add all params to the query
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      queryParams.append(key, value.toString())
    }
  })
  
  const endpoint = `/discover/tv?${queryParams.toString()}`
  return this.fetchFromApi<TVShowSearchResponse>(endpoint)
}
