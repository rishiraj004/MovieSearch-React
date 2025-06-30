import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { MainLayout } from './layouts/MainLayout'
import { HomePage } from './pages/HomePage'
import { MovieDetailPage } from './pages/MovieDetailPage'
import { ProductionCompanyPage } from './pages/ProductionCompanyPage'

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="/company/:id" element={<ProductionCompanyPage />} />
        </Routes>
      </MainLayout>
    </Router>
  )
}

export default App
