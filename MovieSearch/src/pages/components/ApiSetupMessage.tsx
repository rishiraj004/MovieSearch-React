export function ApiSetupMessage() {
  return (
    <div className="flex items-center justify-center py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-red-500/10 backdrop-blur-md border border-red-500/20 rounded-2xl p-8 lg:p-12">
          <div className="text-6xl mb-6">🔑</div>
          <h2 className="text-3xl font-bold text-white mb-4">API Key Required</h2>
          <p className="text-red-300 text-lg mb-8">TMDB API Read Access Token is required</p>
          
          <div className="bg-gray-800/50 rounded-xl p-6 text-left space-y-4">
            <h3 className="text-xl font-semibold text-pink-400 mb-4">Setup Instructions:</h3>
            <ol className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                <span>Go to <a href="https://www.themoviedb.org/settings/api" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300 underline">TMDb API Settings</a></span>
              </li>
              <li className="flex items-start">
                <span className="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                <span>Get your <strong>Read Access Token</strong> (Bearer Token)</span>
              </li>
              <li className="flex items-start">
                <span className="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                <span>Create a <code className="bg-gray-700 px-2 py-1 rounded text-pink-300">.env</code> file in the project root</span>
              </li>
              <li className="flex items-start">
                <span className="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                <span>Add: <code className="bg-gray-700 px-2 py-1 rounded text-pink-300">VITE_TMDB_API_READ_ACCESS_TOKEN=your_token_here</code></span>
              </li>
              <li className="flex items-start">
                <span className="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">5</span>
                <span>Restart the development server</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
