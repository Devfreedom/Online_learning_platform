import Header from './components/layout/Header'
import Hero from './components/sections/Hero'
import CategoryBrowse from './components/sections/CategoryBrowse'
import CourseGrid from './components/sections/CourseGrid'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CategoryBrowse />
        <CourseGrid />
      </main>
    </>
  )
}

export default App
