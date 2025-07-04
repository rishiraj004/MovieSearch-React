// Get environment variable
const getApiKey = () => {
  const apiKey = import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN || '';
  return apiKey;
};

// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
  API_KEY: getApiKey(),
  DEFAULT_LANGUAGE: 'en-US',
  DEFAULT_REGION: 'US',
} as const

// Image Sizes
export const IMAGE_SIZES = {
  BACKDROP: {
    W300: 'w300',
    W780: 'w780',
    W1280: 'w1280',
    ORIGINAL: 'original',
  },
  POSTER: {
    W92: 'w92',
    W154: 'w154',
    W185: 'w185',
    W342: 'w342',
    W500: 'w500',
    W780: 'w780',
    ORIGINAL: 'original',
  },
} as const

// Search Configuration
export const SEARCH_CONFIG = {
  MIN_QUERY_LENGTH: 3,
  DEBOUNCE_DELAY: 300,
  DEFAULT_PAGE: 1,
  RESULTS_PER_PAGE: 20,
} as const

// Cache Configuration
export const CACHE_CONFIG = {
  SEARCH_TTL: 5 * 60 * 1000, // 5 minutes
  MOVIE_DETAILS_TTL: 30 * 60 * 1000, // 30 minutes
} as const
