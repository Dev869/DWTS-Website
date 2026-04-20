import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Admin from "./pages/Admin";
import Home from "./pages/Mockup";
import About from "./pages/mockup/About";
import Work from "./pages/mockup/Work";
import Contact from "./pages/mockup/Contact";
import ProjectDetail from "./pages/mockup/ProjectDetail";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const location = useLocation();

  return (
    <div className="relative">
      <main className="min-h-screen bg-[#F1EEE6]">
        <ScrollToTop />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/project/:slug" element={<ProjectDetail />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
