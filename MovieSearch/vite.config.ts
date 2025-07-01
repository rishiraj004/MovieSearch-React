import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Node modules chunking
          if (id.includes('node_modules')) {
            // React ecosystem
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react'
            }
            if (id.includes('react-router')) {
              return 'react-router'
            }
            
            // Large UI libraries
            if (id.includes('lucide-react')) {
              return 'lucide-react'
            }
            
            // Other vendor libraries
            return 'vendor'
          }
          
          // App code chunking
          
          // Core movie business logic
          if (id.includes('src/features/movies/services') || 
              id.includes('src/features/movies/types') ||
              id.includes('src/features/movies/hooks')) {
            return 'movie-core'
          }
          
          // Movie feature components (hero, search, etc.)
          if (id.includes('src/features/movies/components')) {
            return 'movie-components'
          }
          
          // Page components (detail grids, sections, etc.)
          if (id.includes('src/pages/components')) {
            return 'page-components'
          }
          
          // Utility functions
          if (id.includes('src/features/movies/utils') || 
              id.includes('src/shared/utils')) {
            return 'utils'
          }
          
          // Shared components
          if (id.includes('src/shared/components')) {
            return 'shared-components'
          }
          
          // Main app and layout
          if (id.includes('src/App.tsx') || 
              id.includes('src/layouts') ||
              id.includes('src/pages/HomePage.tsx')) {
            return 'app'
          }
          
          // Detail pages (should be lazy loaded)
          if (id.includes('src/pages/') && 
              (id.includes('DetailPage') || id.includes('ProductionCompanyPage'))) {
            return 'detail-pages'
          }
        },
        // Split CSS files as well
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'assets/styles/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    },
    // Optimize CSS as well
    cssCodeSplit: true,
    // Keep the chunk size warning limit
    chunkSizeWarningLimit: 750
  }
})