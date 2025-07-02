export const formatRating = (rating: number): string => rating.toFixed(1)

export const formatPopularity = (popularity: number): string => {
  if (popularity >= 1000) {
    return `${(popularity / 1000).toFixed(1)}k`
  }
  return popularity.toFixed(0)
}

export const formatVoteCount = (voteCount: number): string => {
  if (voteCount >= 1000000) {
    return `${(voteCount / 1000000).toFixed(1)}M`
  }
  if (voteCount >= 1000) {
    return `${(voteCount / 1000).toFixed(1)}k`
  }
  return voteCount.toString()
}

export const formatRuntime = (runtime: number): string => {
  if (runtime < 60) {
    return `${runtime}min`
  }
  const hours = Math.floor(runtime / 60)
  const minutes = runtime % 60
  return minutes > 0 ? `${hours}h ${minutes}min` : `${hours}h`
}

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return `${text.substring(0, maxLength)}...`
}