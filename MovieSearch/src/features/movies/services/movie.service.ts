import type { MovieDetails, MovieSearchResponse } from '../types/movie.types'

import { API_CONFIG } from '@/shared/constants/api.constants'
import type { SearchParams } from '@/shared/types/common.types'

class MovieService {
  private baseUrl = API_CONFIG.BASE_URL
  private apiKey = API_CONFIG.API_KEY

  private async fetchFromApi<T>(endpoint: string): Promise<T> {
    const url = `${this.baseUrl}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${this.apiKey}`

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`)
    }

    return response.json()
  }

  async searchMovies(params: SearchParams): Promise<MovieSearchResponse> {
    const { query, page = 1, language = API_CONFIG.DEFAULT_LANGUAGE } = params

    if (!query.trim()) {
      throw new Error('Search query is required')
    }

    const endpoint = `/search/movie?query=${encodeURIComponent(query)}&page=${page}&language=${language}`
    return this.fetchFromApi<MovieSearchResponse>(endpoint)
  }

  async getMovieDetails(
    movieId: number,
    language = API_CONFIG.DEFAULT_LANGUAGE
  ): Promise<MovieDetails> {
    const endpoint = `/movie/${movieId}?language=${language}`
    return this.fetchFromApi<MovieDetails>(endpoint)
  }

  async getPopularMovies(
    page = 1,
    language = API_CONFIG.DEFAULT_LANGUAGE
  ): Promise<MovieSearchResponse> {
    const endpoint = `/movie/popular?page=${page}&language=${language}`
    return this.fetchFromApi<MovieSearchResponse>(endpoint)
  }

  async getTrendingMovies(
    timeWindow: 'day' | 'week' = 'week'
  ): Promise<MovieSearchResponse> {
    const endpoint = `/trending/movie/${timeWindow}`
    return this.fetchFromApi<MovieSearchResponse>(endpoint)
  }

  getImageUrl(path: string | null, size = 'w500'): string {
    if (!path) return '/placeholder-movie.jpg'
    return `${API_CONFIG.IMAGE_BASE_URL}/${size}${path}`
  }
}

export const movieService = new MovieService()
