interface LoadingSkeletonProps {
  type: 'movie' | 'tv' | 'person'
  count?: number
}

export function LoadingSkeleton({ type, count = 10 }: LoadingSkeletonProps) {
  const getSkeletonDimensions = () => {
    switch (type) {
      case 'person':
        return 'w-[100px] sm:w-[120px] h-[140px]'
      default:
        return 'w-[140px] sm:w-[160px] h-[220px] sm:h-[240px]'
    }
  }

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex-shrink-0 animate-pulse"
        >
          <div className={`bg-gray-700/50 rounded-xl ${getSkeletonDimensions()}`} />
        </div>
      ))}
    </>
  )
}