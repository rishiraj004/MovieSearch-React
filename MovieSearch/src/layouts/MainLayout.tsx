import type { ReactNode } from 'react'

import { Footer, SearchBar } from '@/shared'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Global Search Bar Overlay on ALL pages */}
      <SearchBar />
      
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
