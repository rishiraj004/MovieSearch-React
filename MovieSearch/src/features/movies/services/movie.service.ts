import type { MovieDetails, MovieSearchResponse, TVShowSearchResponse, PersonSearchResponse } from '../types/movie.types'

import { API_CONFIG } from '@/shared/constants/api.constants'
import type { SearchParams } from '@/shared/types/common.types'

interface FetchConfig {
  timeout?: number
  retries?: number
}

// Simple cache implementation for performance optimization
class SimpleCache {
  private cache = new Map<string, { data: unknown; timestamp: number; ttl: number }>()

  set(key: string, data: unknown, ttl: number = 5 * 60 * 1000) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    })
  }

  get(key: string) {
    const item = this.cache.get(key)
    if (!item) return null
    
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key)
      return null
    }
    
    return item.data
  }

  clear() {
    this.cache.clear()
  }
}

class MovieService {
  private baseUrl = API_CONFIG.BASE_URL
  private apiKey = API_CONFIG.API_KEY
  private defaultConfig: FetchConfig = {
    timeout: 8000, // Optimized timeout
    retries: 2, // Reduced retries for faster failure
  }
  private cache = new SimpleCache()
  private requestQueue = new Map<string, Promise<unknown>>() // Request deduplication

  constructor() {
    // API key validation will be handled in fetchFromApi method
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
        // Performance optimizations
        keepalive: true,
        cache: 'default',
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

  private getCacheKey(endpoint: string): string {
    return `tmdb:${endpoint}`
  }

  private async fetchFromApi<T>(
    endpoint: string,
    config: FetchConfig = {},
    method: 'GET' | 'POST' = 'GET'
  ): Promise<T> {
    // Check if API key is configured
    if (!this.apiKey) {
      throw new Error('TMDb API key is not configured. Please add VITE_TMDB_API_READ_ACCESS_TOKEN to your .env file.')
    }

    const cacheKey = this.getCacheKey(endpoint)
    
    // Check cache first
    const cached = this.cache.get(cacheKey)
    if (cached) {
      return cached as T
    }

    // Prevent duplicate requests (deduplication)
    if (this.requestQueue.has(cacheKey)) {
      return this.requestQueue.get(cacheKey) as Promise<T>
    }

    const url = `${this.baseUrl}${endpoint}`
    
    const options: RequestInit = {
      method,
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        // Performance headers
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Cache-Control': 'max-age=300',
      },
      // Additional performance options
      keepalive: true,
      cache: 'force-cache',
    }

    const requestPromise = this.performRequest<T>(url, options, config, cacheKey, endpoint.includes('search'))
    this.requestQueue.set(cacheKey, requestPromise)

    try {
      const result = await requestPromise
      return result
    } finally {
      this.requestQueue.delete(cacheKey)
    }
  }

  private async performRequest<T>(
    url: string,
    options: RequestInit,
    config: FetchConfig,
    cacheKey: string,
    isSearchRequest = false
  ): Promise<T> {
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

        const data = await response.json()
        
        // Cache successful responses with shorter TTL for search
        const cacheTTL = isSearchRequest ? 2 * 60 * 1000 : 5 * 60 * 1000 // 2 min for search, 5 min for others
        this.cache.set(cacheKey, data, cacheTTL)
        
        return data
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error')
        
        // Don't retry on timeout or client errors
        if (
          lastError.message.includes('timeout') ||
          lastError.message.includes('4')
        ) {
          throw lastError
        }

        // Exponential backoff for retries
        if (attempt < retries) {
          await new Promise(resolve =>
            setTimeout(resolve, 300 * Math.pow(2, attempt - 1)) // 300ms, 600ms
          )
        }
      }
    }

    throw lastError
  }

  async searchMulti(params: SearchParams): Promise<MovieSearchResponse> {
    const { query, page = 1, language = API_CONFIG.DEFAULT_LANGUAGE,include_adult = false } = params

    if (!query.trim()) {
      throw new Error('Search query is required')
    }

    const endpoint = `/search/multi?query=${encodeURIComponent(query)}&include_adult=${include_adult}&language=${language}&page=${page}`
    return this.fetchFromApi<MovieSearchResponse>(endpoint)
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

  async getTopRatedMovies(
    page = 1,
    language = API_CONFIG.DEFAULT_LANGUAGE
  ): Promise<MovieSearchResponse> {
    const endpoint = `/movie/top_rated?page=${page}&language=${language}`
    return this.fetchFromApi<MovieSearchResponse>(endpoint)
  }

  // Trending endpoints
  async getTrendingMovies(
    timeWindow: 'day' | 'week' = 'day',
    language = API_CONFIG.DEFAULT_LANGUAGE
  ): Promise<MovieSearchResponse> {
    const endpoint = `/trending/movie/${timeWindow}?language=${language}`
    return this.fetchFromApi<MovieSearchResponse>(endpoint)
  }

  async getTrendingTVShows(
    timeWindow: 'day' | 'week' = 'day',
    language = API_CONFIG.DEFAULT_LANGUAGE
  ): Promise<TVShowSearchResponse> {
    const endpoint = `/trending/tv/${timeWindow}?language=${language}`
    return this.fetchFromApi<TVShowSearchResponse>(endpoint)
  }

  async getTrendingPeople(
    timeWindow: 'day' | 'week' = 'day',
    language = API_CONFIG.DEFAULT_LANGUAGE
  ): Promise<PersonSearchResponse> {
    const endpoint = `/trending/person/${timeWindow}?language=${language}`
    return this.fetchFromApi<PersonSearchResponse>(endpoint)
  }

  async getMovieRecommendations(
    movieId: number,
    page = 1,
    language = API_CONFIG.DEFAULT_LANGUAGE
  ): Promise<MovieSearchResponse> {
    const endpoint = `/movie/${movieId}/recommendations?language=${language}&page=${page}`
    return this.fetchFromApi<MovieSearchResponse>(endpoint)
  }

  // Performance optimization methods
  async preloadData(): Promise<void> {
    try {
      // Fire and forget - don't await these for non-blocking preload
      this.getPopularMovies(1).catch(() => {}) // Ignore errors
      this.getTrendingMovies('week').catch(() => {})
    } catch {
      // Silently fail - this is optimization, not critical
    }
  }

  // Clear cache when needed (useful for testing or memory management)
  clearCache(): void {
    this.cache.clear()
  }

  // Get cache stats for debugging
  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache['cache'].size,
      keys: Array.from(this.cache['cache'].keys())
    }
  }

  getImageUrl(path: string | null, size = 'w500'): string {
    if (!path) return '/placeholder-movie.jpg'
    return `${API_CONFIG.IMAGE_BASE_URL}/${size}${path}`
  }
}

export const movieService = new MovieService()
