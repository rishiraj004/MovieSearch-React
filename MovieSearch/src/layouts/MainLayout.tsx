import { Outlet } from 'react-router-dom'

import { Footer, SearchBar, BackToHomeButton } from '@/shared'

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Global Search Bar Overlay on ALL pages */}
      <SearchBar />
      
      {/* Header section with Back to Home Button - only shows on non-home pages */}
      <div className="discover-page-home-btn-container">
        <div className="container mx-auto px-4 relative">
          <div className="absolute top-4 left-4 z-50">
            <BackToHomeButton className="discover-page-home-btn" />
          </div>
        </div>
      </div>
      
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
