export const getReleaseYear = (date: string | null | undefined): string => {
  if (!date) return 'N/A'
  try {
    return new Date(date).getFullYear().toString()
  } catch {
    return 'N/A'
  }
}

export const formatDate = (date: string | null | undefined): string => {
  if (!date) return 'N/A'
  try {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch {
    return 'N/A'
  }
}

export const getRelativeDate = (date: string): string => {
  if (!date) return 'N/A'
  
  try {
    const now = new Date()
    const releaseDate = new Date(date)
    const diffTime = Math.abs(now.getTime() - releaseDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
    
    return `${Math.floor(diffDays / 365)} years ago`
  } catch {
    return 'N/A'
  }
}