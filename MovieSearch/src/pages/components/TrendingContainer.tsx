import { TrendingSection } from '@/features/movies/components/TrendingSection'

export function TrendingContainer() {
  return (
    <div id="trending-section" className="min-h-screen bg-[#1a1a1a] text-white py-8">
      <div className="space-y-8">
        <TrendingSection
          title="Trending Movies"
          type="movie"
        />

        <TrendingSection
          title="Trending TV Shows"
          type="tv"
        />

        <TrendingSection
          title="Trending People"
          type="person"
        />
      </div>
    </div>
  )
}
