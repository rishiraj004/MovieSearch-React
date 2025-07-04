import { useState, useEffect } from 'react'

/**
 * Custom hook for debouncing a value
 * @param value The value to debounce
 * @param delay The delay in milliseconds
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Set a timeout to update the debounced value after the specified delay
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Clear the timeout if the value changes before the delay has passed
    return () => {
      clearTimeout(timeoutId)
    }
  }, [value, delay])

  return debouncedValue
}
