import { Suspense, lazy } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { PageLoader, ScrollToTop } from './components'

// Lazy load everything possible
const MainLayout = lazy(() =>
  import('./layouts/MainLayout').then(module => ({
    default: module.MainLayout,
  }))
)
const HomePage = lazy(() =>
  import('./pages/HomePage').then(module => ({ default: module.HomePage }))
)

// Lazy load detail pages (they're not needed on initial load)
const MovieDetailPage = lazy(() =>
  import('./pages/MovieDetailPage').then(module => ({
    default: module.MovieDetailPage,
  }))
)
const TVShowDetailPage = lazy(() => import('./pages/TVShowDetailPage'))
const PersonDetailPage = lazy(() => import('./pages/PersonDetailPage'))
const ProductionCompanyPage = lazy(() =>
  import('./pages/ProductionCompanyPage').then(module => ({
    default: module.ProductionCompanyPage,
  }))
)
const NetworkPage = lazy(() =>
  import('./pages/NetworkPage').then(module => ({
    default: module.NetworkPage,
  }))
)
const DiscoverPage = lazy(() =>
  import('./pages/DiscoverPage').then(module => ({
    default: module.DiscoverPage,
  }))
)

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/discover" element={<DiscoverPage />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
            <Route path="/tv/:id" element={<TVShowDetailPage />} />
            <Route path="/person/:id" element={<PersonDetailPage />} />
            <Route path="/company/:id" element={<ProductionCompanyPage />} />
            <Route path="/network/:id" element={<NetworkPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
