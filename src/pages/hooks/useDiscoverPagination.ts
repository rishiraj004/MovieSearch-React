// useDiscoverPagination.ts
import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export function useDiscoverPagination() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get('page') || '1', 10)
  )
  const [totalPages, setTotalPages] = useState(0)
  const [totalResults, setTotalResults] = useState(0)

  // Update current page when search params change
  useEffect(() => {
    setCurrentPage(parseInt(searchParams.get('page') || '1', 10))
  }, [searchParams])

  // Handle page change
  const handlePageChange = useCallback(
    (page: number) => {
      const newSearchParams = new URLSearchParams(searchParams)
      newSearchParams.set('page', page.toString())
      setSearchParams(newSearchParams)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [searchParams, setSearchParams]
  )

  return {
    currentPage,
    totalPages,
    totalResults,
    setTotalPages,
    setTotalResults,
    handlePageChange,
  }
}
