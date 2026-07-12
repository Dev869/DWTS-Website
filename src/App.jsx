import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const location = useLocation();

  return (
    <div className="relative">
      <main className="min-h-screen bg-[#ECE9E2]">
        <ScrollToTop />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            {/* Old routes (/work, /about, /engagement, ...) fall back to Home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
