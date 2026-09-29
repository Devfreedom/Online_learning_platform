import { useEffect } from 'react'
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from 'react-router'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import LearnerShell from './components/layout/LearnerShell'
import ProtectedRoute from './components/ProtectedRoute'
import Toast from './components/ui/Toast'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import CourseDetail from './pages/CourseDetail'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/app/Dashboard'
import MyCohorts from './pages/app/MyCohorts'
import Learn from './pages/app/Learn'
import Placeholder from './pages/app/Placeholder'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function PublicLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Toast />
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/courses/:slug" element={<CourseDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<LearnerShell />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/my-cohorts" element={<MyCohorts />} />
              <Route path="/learn/:slug" element={<Learn />} />
              <Route
                path="/assignments"
                element={
                  <Placeholder
                    title="Assignments"
                    description="Review and submit your cohort assignments here."
                  />
                }
              />
              <Route
                path="/progress"
                element={
                  <Placeholder
                    title="Progress"
                    description="Track your progress across every cohort."
                  />
                }
              />
              <Route
                path="/calendar"
                element={
                  <Placeholder
                    title="Calendar"
                    description="Live sessions and deadlines in one schedule."
                  />
                }
              />
              <Route
                path="/certificates"
                element={
                  <Placeholder
                    title="Certificates"
                    description="Your earned certificates will appear here."
                  />
                }
              />
              <Route
                path="/quiz-history"
                element={
                  <Placeholder
                    title="Quiz History"
                    description="Every quiz attempt and score, in one place."
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Placeholder
                    title="Profile"
                    description="Manage how you appear across Anchorpoint."
                  />
                }
              />
              <Route
                path="/settings"
                element={
                  <Placeholder
                    title="Settings"
                    description="Account, learning and notification preferences."
                  />
                }
              />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
