export function EmptySearchState() {
  return (
    <div className="max-w-4xl mx-auto text-center animate-fade-in">
      <div className="bg-gray-500/10 backdrop-blur-md border border-gray-500/20 rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-12">
        <div className="text-6xl md:text-7xl lg:text-8xl mb-4 md:mb-6">🎬</div>
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4">
          No Movies Found
        </h3>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed px-4">
          Discover amazing movies with our intelligent search. Find by title, actor, director, or genre.
        </p>
      </div>
    </div>
  )
}
