import type { ReactNode } from 'react'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                🎬 MovieSearch
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                Home
              </button>
              <button className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                Popular
              </button>
              <button className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                Trending
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>&copy; 2025 MovieSearch. Powered by The Movie Database (TMDb)</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
