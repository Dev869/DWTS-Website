import { useParams, Link } from "react-router-dom";
import projects from "../data/projects";
import ShowcaseLayout from "../components/highlights/ShowcaseLayout";
import CaseStudyLayout from "../components/highlights/CaseStudyLayout";
import InteractiveLayout from "../components/highlights/InteractiveLayout";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const layouts = {
  showcase: ShowcaseLayout,
  casestudy: CaseStudyLayout,
  interactive: InteractiveLayout,
};

export default function ProjectHighlight() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
          <h1 className="font-[Bungee] text-3xl text-[#2C2C2C]">Project Not Found</h1>
          <Link
            to="/"
            className="font-mono text-sm text-[#049B9F] underline underline-offset-4 hover:text-[#037B7E]"
          >
            &larr; Back to Home
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const LayoutComponent = layouts[project.layout] || ShowcaseLayout;

  return (
    <div>
      <Navbar />
      <LayoutComponent project={project} />
      <Footer />
    </div>
  );
}
