import { API_CONFIG, IMAGE_SIZES } from '@/shared/constants/api.constants'

export const getImageUrl = (path: string | null, size: keyof typeof IMAGE_SIZES.POSTER = 'W500'): string => {
  if (!path) return '/placeholder-movie.jpg'
  return `${API_CONFIG.IMAGE_BASE_URL}/${IMAGE_SIZES.POSTER[size]}${path}`
}

export const getPersonImageUrl = (path: string | null): string => {
  if (!path) {
    // Modern social media style profile placeholder with gradient background and refined silhouette
    return 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"%3E%3Cdefs%3E%3ClinearGradient id="bg" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%234B5563"/%3E%3Cstop offset="100%25" style="stop-color:%23374151"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="128" height="128" fill="url(%23bg)"/%3E%3Cg fill="%23D1D5DB" opacity="0.8"%3E%3Ccircle cx="64" cy="45" r="18"/%3E%3Cpath d="M35 96c0-16 13-29 29-29h0c16 0 29 13 29 29v32H35z"/%3E%3C/g%3E%3C/svg%3E'
  }
  return `${API_CONFIG.IMAGE_BASE_URL}/${IMAGE_SIZES.POSTER.W500}${path}`
}

export const getBackdropUrl = (path: string | null, size: keyof typeof IMAGE_SIZES.BACKDROP = 'W1280'): string => {
  if (!path) return '/placeholder-backdrop.jpg'
  return `${API_CONFIG.IMAGE_BASE_URL}/${IMAGE_SIZES.BACKDROP[size]}${path}`
}