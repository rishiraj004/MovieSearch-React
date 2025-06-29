import { API_CONFIG, IMAGE_SIZES } from '@/shared/constants/api.constants'

export const getImageUrl = (path: string | null, size: keyof typeof IMAGE_SIZES.POSTER = 'W500'): string => {
  if (!path) return '/placeholder-movie.jpg'
  return `${API_CONFIG.IMAGE_BASE_URL}/${IMAGE_SIZES.POSTER[size]}${path}`
}

export const getPersonImageUrl = (path: string | null): string => {
  if (!path) return '/placeholder-person.jpg'
  return `${API_CONFIG.IMAGE_BASE_URL}/${IMAGE_SIZES.POSTER.W500}${path}`
}

export const getBackdropUrl = (path: string | null, size: keyof typeof IMAGE_SIZES.BACKDROP = 'W1280'): string => {
  if (!path) return '/placeholder-backdrop.jpg'
  return `${API_CONFIG.IMAGE_BASE_URL}/${IMAGE_SIZES.BACKDROP[size]}${path}`
}