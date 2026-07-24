import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// Import your local project images
import newspaperImg from "../assets/projects/newspaper.jpg";
import aiMockImg from "../assets/projects/ai-mock.jpg";
import cableOperatorImg from "../assets/projects/cable-operator.jpg";
import amusementParkImg from "../assets/projects/amusement-park.jpg";

// GigWatch carousel images
import gigWatchImg1 from "../assets/projects/gig1.jpeg";
import gigWatchImg2 from "../assets/projects/gig2.jpeg";
import gigWatchImg3 from "../assets/projects/gig3.jpeg";
import gigWatchImg4 from "../assets/projects/gig4.jpeg";
import gigWatchImg5 from "../assets/projects/gig5.jpeg";
import gigWatchImg6 from "../assets/projects/gig6.jpeg";

// Stampede carousel images
import stampedeImg1 from "../assets/projects/stamp1.jpeg";
import stampedeImg2 from "../assets/projects/stamp2.jpeg";
import stampedeImg3 from "../assets/projects/stamp3.jpeg";

/**
 * ScanReveal — the section's signature entrance.
 * A thin emerald scan-line sweeps left→right across the card as it
 * enters the viewport, "reading" the image into visibility (clip-path
 * wipe) while the card itself slides in from alternating sides with
 * a slight 3D tilt. Ties visually into the detection/analytics theme
 * of the projects themselves.
 */
function ScanReveal({ children, fromLeft = true, delay = 0 }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: fromLeft ? -60 : 60,
        rotateY: fromLeft ? -8 : 8,
      }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformPerspective: 1000 }}
      className="relative"
    >
      {children}
    </motion.div>
  );
}

/**
 * ScanImage — wraps a single image or carousel with the clip-path
 * scan-line wipe. The line itself is a thin emerald bar that travels
 * across the frame once, in sync with the reveal.
 */
function ScanImage({ children, delay = 0 }) {
  return (
    <div className="relative h-48 w-full overflow-hidden">
      <motion.div
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        whileInView={{ clipPath: "inset(0 0% 0 0)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, delay: delay + 0.15, ease: [0.65, 0, 0.35, 1] }}
        className="absolute inset-0"
      >
        {children}
      </motion.div>
      {/* The travelling scan line */}
      <motion.div
        initial={{ left: "0%", opacity: 0 }}
        whileInView={{ left: "100%", opacity: [0, 1, 1, 0] }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, delay: delay + 0.15, ease: [0.65, 0, 0.35, 1] }}
        className="absolute top-0 h-full w-[2px] bg-[#10B981] shadow-[0_0_12px_2px_rgba(16,185,129,0.7)] pointer-events-none z-20"
      />
    </div>
  );
}

/**
 * Simple, dependency-free image carousel.
 * - Auto-advances every `interval` ms
 * - Pauses auto-advance while the user hovers
 * - Manual prev/next arrows + dot indicators
 */
function ImageCarousel({ images, alt, interval = 3500 }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [paused, images.length, interval]);

  const goTo = (i) => setIndex((i + images.length) % images.length);

  return (
    <div
      className="relative h-48 w-full overflow-hidden group"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          alt={`${alt} - slide ${index + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all"
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          {/* Prev / Next arrows - only visible on hover */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              goTo(index - 1);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10
                       w-7 h-7 flex items-center justify-center rounded-full
                       bg-black/40 text-[#ECFDF5] opacity-0 group-hover:opacity-100
                       hover:bg-[#10B981]/60 transition-all"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              goTo(index + 1);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10
                       w-7 h-7 flex items-center justify-center rounded-full
                       bg-black/40 text-[#ECFDF5] opacity-0 group-hover:opacity-100
                       hover:bg-[#10B981]/60 transition-all"
            aria-label="Next image"
          >
            ›
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  goTo(i);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === index ? "bg-[#10B981] w-4" : "bg-[#ECFDF5]/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/**
 * SectionHeading — replaces the old per-letter whileInView animation.
 * That version could silently fail to render any visible text if the
 * IntersectionObserver never fired (e.g. section already in view on
 * load, combined with the parent's overflow-hidden clipping the
 * off-screen "y: 110%" starting position permanently).
 *
 * This version uses useInView on a ref with a fallback: text is
 * ALWAYS in the DOM and visible by default (opacity/transform reset
 * via `animate`, not gated behind an observer that might not trigger).
 * If already in view on mount, useInView returns true immediately.
 */
function SectionHeading({ text }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });

  return (
    <h2
      ref={ref}
      className="text-4xl md:text-5xl font-bold text-left cursor-pointer flex flex-wrap"
    >
      {text.split("").map((letter, i) => (
        <motion.span
          key={i}
          initial={{ y: "60%", opacity: 0 }}
          animate={isInView ? { y: "0%", opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ color: "#10B981" }}
          className="inline-block transition-colors"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </h2>
  );
}

export default function Projects() {
  const projects = [
    {
      title: "WageWatch – Geospatial Wage Fairness Analytics Engine",
      images: [gigWatchImg1, gigWatchImg2, gigWatchImg3, gigWatchImg4, gigWatchImg5, gigWatchImg6],
      description:
        "An AI-powered platform that audits gig worker earnings by verifying platform-claimed delivery distances against actual road routes, detecting wage discrepancies, and visualizing underpaid zones through interactive geospatial heatmaps.",
      github:
        "https://github.com/LalithaDevi-P/WageWatch-Gig-Driver-Fraud-Detection-Fair-Pay-Verification-Platform",
      tech: [
        "Java",
        "Spring Boot",
        "Spring Data JPA",
        "PostgreSQL",
        "React",
        "Leaflet",
        "Gemini API",
        "OSRM",
      ],
    },
    {
      title: "AI Stampede Detection System",
      images: [stampedeImg1, stampedeImg2, stampedeImg3],
      description:
        "A real-time AI-powered crowd safety system that predicts stampede risks by analyzing crowd dynamics, turbulence, and bottlenecks using computer vision and machine learning. The platform features instant YOLOv8-based fall detection, risk prediction, and live monitoring for proactive emergency response.",
      github: "https://github.com/LalithaDevi-P/AI-Stampede-Detection-Crowd-Analysis-System",
      tech: [
        "Python",
        "FastAPI",
        "OpenCV",
        "YOLOv8",
        "Random Forest",
        "Scikit-Learn",
        "NumPy",
        "Pandas",
        "WebSockets",
        "PostgreSQL",
      ],
    },
    {
      title: "Newspaper Distribution System",
      image: newspaperImg,
      description:
        "A full-stack system to manage newspaper delivery routes, subscriptions, billing, and distribution automation.",
      github: "https://github.com/LalithaDevi-P/newspaper-distribution-admin-system.git",
      tech: ["HTML", "CSS", "JS", "Node.js", "Express", "MongoDB"],
    },
    {
      title: "AI Mock Interview System",
      image: aiMockImg,
      description:
        "An AI-powered mock interview platform that asks questions, analyzes responses, scores performance, and provides improvement feedback.",
      github: "https://github.com/your-repo-link",
      tech: ["TypeScript", "React", "Firebase"],
    },
    {
      title: "Cable Operator Management System",
      image: cableOperatorImg,
      description:
        "A system to manage cable operator customer details, monthly payments, complaints, and connection tracking.",
      github: "https://github.com/LalithaDevi-P/Cable-Operator-Management-System.git",
      tech: ["HTML", "CSS", "JS", "Node.js", "Express", "MongoDB"],
    },
    {
      title: "Amusement Park Management System",
      image: amusementParkImg,
      description:
        "Software for managing rides, visitor bookings, ticketing, staff allocation, and park operations.",
      github: "https://github.com/LalithaDevi-P/Amusement-Park-Management-System.git",
      tech: ["HTML", "CSS", "JS", "Node.js", "Express", "MongoDB"],
    },
  ];

  return (
    <section
      id="projects"
      className="min-h-screen px-6 md:px-14 py-20 bg-[black] text-[#ECFDF5]"
    >
      {/* Heading - word reveal + drawn underline */}
      <div className="mb-14 inline-block">
        <SectionHeading text="Projects" />
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.65, 0, 0.35, 1] }}
          style={{ transformOrigin: "left" }}
          className="h-[2px] bg-[#10B981] mt-2"
        />
      </div>

      {/* Projects Grid → 2 per row */}
      <div className="max-w-6xl mx-auto space-y-10">
        {Array.from({ length: Math.ceil(projects.length / 2) }).map((_, rowIdx) => (
          <div key={rowIdx} className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
            {projects
              .slice(rowIdx * 2, rowIdx * 2 + 2)
              .map((p, idx) => (
                <ScanReveal key={p.title} fromLeft={idx === 0} delay={idx * 0.15}>
                  <motion.div
                    whileHover={{ scale: 1.03, rotateX: 2, rotateY: -2 }}
                    className="w-[90%] md:w-[90%] mx-auto
                               bg-[#022C22]/10 border border-[#10B981]/20 backdrop-blur-lg 
                               rounded-xl overflow-hidden shadow-xl 
                               hover:shadow-[#10B981]/10 hover:border-[#10B981]/40 transition-all"
                  >
                    {/* Project Image or Carousel, revealed via scan-line wipe */}
                    <ScanImage delay={idx * 0.15}>
                      {p.images ? (
                        <ImageCarousel images={p.images} alt={p.title} />
                      ) : (
                        <motion.img
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                          src={p.image}
                          alt={p.title}
                          className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all"
                        />
                      )}
                    </ScanImage>

                    {/* Content */}
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.5, delay: idx * 0.15 + 0.5 }}
                      className="p-5 space-y-4"
                    >
                      <h3 className="text-xl font-semibold text-[#10B981]">{p.title}</h3>
                      <p className="text-[#94A3B8] text-sm leading-relaxed">{p.description}</p>

                      <div className="flex flex-wrap gap-2 mt-2">
                        {p.tech.map((t, tIdx) => (
                          <motion.span
                            key={t}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.3, delay: idx * 0.15 + 0.6 + tIdx * 0.04 }}
                            className="px-2 py-1 text-xs rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-[#6EE7B7]"
                          >
                            {t}
                          </motion.span>
                        ))}
                      </div>

                      <a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block mt-4 px-4 py-2 text-sm bg-[#10B981]/20 
                                   border border-[#10B981]/30 rounded-lg text-[#ECFDF5]
                                   hover:bg-[#10B981]/40 transition-colors"
                      >
                        GitHub Source
                      </a>
                    </motion.div>
                  </motion.div>
                </ScanReveal>
              ))}
          </div>
        ))}
      </div>
    </section>
  );
}