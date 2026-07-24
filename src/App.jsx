import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Internship from "./components/Internship";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white">
      <Navbar />
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Certifications />
      <Internship />
      <Achievements />
      <Contact />
      <Footer />
      {/* Add other sections like Skills, Projects, Contact here */}
    </div>
  );
}

export default App;
