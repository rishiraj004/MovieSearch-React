import type { MovieDetails, MovieSearchResponse } from '../types/movie.types'

import { API_CONFIG } from '@/shared/constants/api.constants'
import type { SearchParams } from '@/shared/types/common.types'

interface FetchConfig {
  timeout?: number
  retries?: number
}

class MovieService {
  private baseUrl = API_CONFIG.BASE_URL
  private apiKey = API_CONFIG.API_KEY
  private defaultConfig: FetchConfig = {
    timeout: 10000, // 10 seconds
    retries: 3,
  }

  private async fetchWithTimeout(
    url: string,
    options: RequestInit = {},
    timeout?: number
  ): Promise<Response> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout || this.defaultConfig.timeout!)

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      })
      clearTimeout(timeoutId)
      return response
    } catch (error) {
      clearTimeout(timeoutId)
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout')
      }
      throw error
    }
  }

  private async fetchFromApi<T>(
    endpoint: string,
    config: FetchConfig = {},
    method: 'GET' | 'POST' = 'GET'
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    
    const options = {
      method,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${this.apiKey}`
      }
    }

    const { timeout, retries = this.defaultConfig.retries! } = { ...this.defaultConfig, ...config }
    let lastError: Error = new Error('Unknown error')

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await this.fetchWithTimeout(url, options, timeout)

        if (!response.ok) {
          // Don't retry on client errors (4xx)
          if (response.status >= 400 && response.status < 500) {
            throw new Error(
              `API Error: ${response.status} - ${response.statusText}`
            )
          }
          // Retry on server errors (5xx)
          throw new Error(
            `API Error: ${response.status} - ${response.statusText}`
          )
        }

        return response.json()
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error')
        
        // Don't retry on timeout or client errors
        if (
          lastError.message.includes('timeout') ||
          lastError.message.includes('4')
        ) {
          throw lastError
        }

        // Wait before retry (exponential backoff)
        if (attempt < retries) {
          await new Promise(resolve =>
            setTimeout(resolve, Math.pow(2, attempt) * 1000)
          )
        }
      }
    }

    throw lastError
  }

  async searchMovies(params: SearchParams): Promise<MovieSearchResponse> {
    const { query, page = 1, language = API_CONFIG.DEFAULT_LANGUAGE,include_adult = false } = params

    if (!query.trim()) {
      throw new Error('Search query is required')
    }

    const endpoint = `/search/movie?query=${encodeURIComponent(query)}&include_adult=${include_adult}&language=${language}&page=${page}`
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

  async getMovieRecommendations(
    movieId: number,
    page = 1,
    language = API_CONFIG.DEFAULT_LANGUAGE
  ): Promise<MovieSearchResponse> {
    const endpoint = `/movie/${movieId}/recommendations?language=${language}&page=${page}`
    return this.fetchFromApi<MovieSearchResponse>(endpoint)
  }

  getImageUrl(path: string | null, size = 'w500'): string {
    if (!path) return '/placeholder-movie.jpg'
    return `${API_CONFIG.IMAGE_BASE_URL}/${size}${path}`
  }
}

export const movieService = new MovieService()
