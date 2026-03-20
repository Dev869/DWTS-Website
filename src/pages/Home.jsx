import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Brand from "../components/Brand";
import ProjectGrid from "../components/ProjectGrid";
import Services from "../components/Services";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <Navbar />
      <Brand />
      <ProjectGrid />
      <Services />
      <Contact />
      <Footer />
    </motion.div>
  );
}
