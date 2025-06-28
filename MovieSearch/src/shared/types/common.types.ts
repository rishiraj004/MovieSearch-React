export interface ApiResponse<T> {
  data?: T
  error?: string
  loading: boolean
  success: boolean
}

export interface PaginationParams {
  page?: number
  limit?: number
}

export interface SearchParams extends PaginationParams {
  query: string
  language?: string
  region?: string
  include_adult?: boolean
}

export interface BaseEntity {
  id: number
  created_at?: string
  updated_at?: string
}
