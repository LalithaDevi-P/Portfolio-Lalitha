import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValue,
  useSpring,
} from "framer-motion";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Certifications", href: "#certifications" },
  { name: "Internship", href: "#internship" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact", isCta: true },
];

/** Nav link that gently pulls toward the cursor on hover. */
function MagneticLink({ children, className, ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.2 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      {...props}
    >
      {children}
    </motion.a>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-track which section is in view, instead of relying only on clicks.
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#022C22]/80 backdrop-blur-xl border-b border-emerald-900/50 py-3"
          : "bg-transparent py-5"
      }`}
    >
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="absolute bottom-0 left-0 h-[2px] w-full bg-[#10B981] origin-left
                   shadow-[0_0_8px_rgba(16,185,129,0.7)]"
      />

      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        {/* LOGO */}
        <a
          href="#home"
          className="text-2xl md:text-3xl font-extrabold text-[#ECFDF5] relative group tracking-tight flex items-center gap-2"
          onClick={() => setActiveLink("#home")}
        >
          <motion.span
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.8)]"
          />
          DEV Port<span className="text-[#10B981]">folio</span>.
          <motion.span
            className="absolute left-0 -bottom-1 h-[2px] bg-[#10B981] rounded-full"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </a>

        {/* DESKTOP LINKS */}
        <ul className="hidden md:flex items-center gap-1 text-md font-medium text-[#ECFDF5]/90">
          {navLinks.map((link) =>
            link.isCta ? (
              <li key={link.name}>
                <motion.a
                  href={link.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveLink(link.href)}
                  className="ml-3 px-5 py-2 bg-gradient-to-r from-[#10B981] to-[#059669] rounded-full text-[#022C22] font-bold shadow-lg hover:shadow-emerald-500/30 transition-all"
                >
                  {link.name}
                </motion.a>
              </li>
            ) : (
              <li key={link.name} className="relative">
                {activeLink === link.href && (
                  <motion.span
                    layoutId="navPill"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    className="absolute inset-0 bg-[#10B981]/10 border border-[#10B981]/30 rounded-full"
                  />
                )}
                <MagneticLink
                  href={link.href}
                  onClick={() => setActiveLink(link.href)}
                  className={`relative z-10 block px-4 py-2 transition-colors ${
                    activeLink === link.href
                      ? "text-[#10B981]"
                      : "hover:text-[#10B981]"
                  }`}
                >
                  {link.name}
                </MagneticLink>
              </li>
            )
          )}
        </ul>

        {/* MOBILE MENU ICON — morphs from burger to X */}
        <button
          className="md:hidden relative w-8 h-8 z-50 flex flex-col justify-center items-center gap-[6px]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-7 h-[2px] bg-[#ECFDF5] rounded-full origin-center"
          />
          <motion.span
            animate={open ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="w-7 h-[2px] bg-[#ECFDF5] rounded-full"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-7 h-[2px] bg-[#ECFDF5] rounded-full origin-center"
          />
        </button>
      </div>

      {/* MOBILE MENU — slide-in panel + backdrop */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden z-30"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
              className="fixed top-0 right-0 h-screen w-[78%] max-w-sm bg-[#022C22]/95
                         backdrop-blur-2xl border-l border-[#10B981]/20
                         flex flex-col justify-center items-start px-10 md:hidden z-40"
            >
              <ul className="flex flex-col gap-7">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.08 * index, duration: 0.35 }}
                  >
                    <a
                      href={link.href}
                      className={`text-2xl font-bold ${
                        link.isCta
                          ? "text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#34D399]"
                          : activeLink === link.href
                          ? "text-[#10B981]"
                          : "text-[#ECFDF5] hover:text-[#10B981]"
                      }`}
                      onClick={() => {
                        setOpen(false);
                        setActiveLink(link.href);
                      }}
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}