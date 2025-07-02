import type { MovieOverviewProps } from './MovieDetailTypes'

export function MovieOverview({ overview }: MovieOverviewProps) {
  if (!overview) return null

  return (
    <section className="mb-8 sm:mb-12 animate-fadeIn">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center sm:text-left">
        Overview
      </h2>
      <div className="bg-gray-800 rounded-lg p-4 sm:p-6 lg:p-8 mx-0 sm:mx-4 shadow-lg border border-gray-700">
        <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
          {overview}
        </p>
      </div>
    </section>
  )
}
