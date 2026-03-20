import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import ProjectHighlight from "./pages/ProjectHighlight";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const location = useLocation();

  return (
    <div className="paper-grain binary-watermark relative">
      <main className="min-h-screen bg-[#EDE6D6]">
        <ScrollToTop />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/project/:slug" element={<ProjectHighlight />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
