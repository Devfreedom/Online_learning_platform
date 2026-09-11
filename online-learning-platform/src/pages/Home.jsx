import Hero from '../components/sections/Hero'
import TrustStrip from '../components/sections/TrustStrip'
import CategoryBrowse from '../components/sections/CategoryBrowse'
import CourseGrid from '../components/sections/CourseGrid'
import HowCohortsWork from '../components/sections/HowCohortsWork'
import InstructorSpotlight from '../components/sections/InstructorSpotlight'
import Testimonials from '../components/sections/Testimonials'
import FinalCTA from '../components/sections/FinalCTA'

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <CategoryBrowse />
      <CourseGrid />
      <HowCohortsWork />
      <InstructorSpotlight />
      <Testimonials />
      <FinalCTA />
    </main>
  )
}
