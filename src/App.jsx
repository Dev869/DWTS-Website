import Navbar from './components/Navbar'
import Brand from './components/Brand'
import Clients from './components/Clients'
import ProjectGrid from './components/ProjectGrid'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="paper-grain binary-watermark relative">
      <main className="min-h-screen bg-[#EDE6D6]">
        <Navbar />
        <Brand />
        <ProjectGrid />
        <Services />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}

export default App
