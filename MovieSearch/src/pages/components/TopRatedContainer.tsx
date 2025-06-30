import { TopRatedSection } from '@/features/movies/components/TopRatedSection'

export function TopRatedContainer() {
  return (
    <section id="top-rated-section" className="py-8 bg-gray-900/80">
      <TopRatedSection
        title="Top Rated Movies"
        type="movie"
      />
      
      <div className="mt-8">
        <TopRatedSection
          title="Top Rated TV Shows"
          type="tv"
        />
      </div>
    </section>
  )
}
