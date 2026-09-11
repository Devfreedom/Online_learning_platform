import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import CategoryBrowse from './components/sections/CategoryBrowse'
import CourseGrid from './components/sections/CourseGrid'
import HowCohortsWork from './components/sections/HowCohortsWork'
import InstructorSpotlight from './components/sections/InstructorSpotlight'
import Testimonials from './components/sections/Testimonials'
import FinalCTA from './components/sections/FinalCTA'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CategoryBrowse />
        <CourseGrid />
        <HowCohortsWork />
        <InstructorSpotlight />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}

export default App
