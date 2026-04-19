import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import ProjectHighlight from "./pages/ProjectHighlight";
import Admin from "./pages/Admin";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const location = useLocation();

  return (
    <div className="relative">
      <main className="min-h-screen bg-[#F5F6F8]">
        <ScrollToTop />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/project/:slug" element={<ProjectHighlight />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
