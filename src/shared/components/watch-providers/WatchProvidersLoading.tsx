export function WatchProvidersLoading() {
  return (
    <section className="mb-8 sm:mb-12 animate-fadeIn">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center sm:text-left">
        Where to Watch
      </h2>
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
          <span className="ml-3 text-gray-400">Loading watch providers...</span>
        </div>
      </div>
    </section>
  )
}
