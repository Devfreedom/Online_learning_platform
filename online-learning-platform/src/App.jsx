import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import CourseDetail from './pages/CourseDetail'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/courses/:slug" element={<CourseDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
