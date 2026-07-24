import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaJava, FaReact, FaPython } from "react-icons/fa";
import { SiLeetcode, SiSpring, SiHtml5, SiCss3 } from "react-icons/si";

// Orbit config — inner ring (closer, faster) and outer ring (farther, slower),
// spinning in opposite directions so the motion reads as two independent orbits
// rather than one spinning wheel.
const INNER_SKILLS = [
  { label: "Java", icon: <FaJava /> },
  { label: "Spring Boot", icon: <SiSpring /> },
  { label: "React.js", icon: <FaReact /> },
  { label: "Python", icon: <FaPython /> },
];

const OUTER_SKILLS = [
  { label: "Hibernate", badge: "Hib" },
  { label: "JDBC", badge: "JDBC" },
  { label: "HTML", icon: <SiHtml5 /> },
  { label: "CSS", icon: <SiCss3 /> },
];

function OrbitItem({ skill, angle, radiusPercent, duration, reverse }) {
  const rad = (angle * Math.PI) / 180;
  const x = 50 + radiusPercent * Math.cos(rad);
  const y = 50 + radiusPercent * Math.sin(rad);

  return (
    <div
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
    >
      {/* Counter-rotation cancels the ring's spin so the icon itself stays upright */}
      <div
        className={reverse ? "orbit-counter-ccw" : "orbit-counter-cw"}
        style={{ "--duration": `${duration}s` }}
      >
        <motion.div
          whileHover={{ scale: 1.25 }}
          className="group relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/70
                     border border-[#10B981]/30 backdrop-blur-sm shadow-lg
                     flex items-center justify-center text-[#10B981]
                     text-lg sm:text-xl hover:border-[#10B981] hover:shadow-[#10B981]/40 transition-colors"
        >
          {skill.icon ?? (
            <span className="text-[9px] sm:text-[10px] font-bold text-[#6EE7B7]">
              {skill.badge}
            </span>
          )}
          <span
            className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2
                       whitespace-nowrap text-[10px] font-medium text-[#6EE7B7]
                       bg-black/80 px-2 py-0.5 rounded-full border border-[#10B981]/20
                       opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {skill.label}
          </span>
        </motion.div>
      </div>
    </div>
  );
}

/** A single vertical "matrix rain" column of glyphs, looping downward. */
function RainColumn({ leftPercent, delay, duration, chars }) {
  return (
    <motion.div
      animate={{ y: ["-120%", "220%"] }}
      transition={{ duration, repeat: Infinity, delay, ease: "linear" }}
      className="absolute top-0 flex flex-col items-center gap-1 font-mono text-[9px] leading-none select-none"
      style={{ left: `${leftPercent}%` }}
    >
      {chars.map((c, i) => (
        <span
          key={i}
          style={{ opacity: i === 0 ? 1 : Math.max(0.08, 0.55 - i * 0.09) }}
          className={i === 0 ? "text-[#D1FAE5]" : "text-[#10B981]"}
        >
          {c}
        </span>
      ))}
    </motion.div>
  );
}

/** A tiny spark that loops around a small circular path close to the cube. */
function Spark({ radius, duration, delay, size = 2 }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear", delay }}
      className="absolute inset-0"
      style={{ transformOrigin: "50% 50%" }}
    >
      <div
        className="absolute rounded-full bg-[#6EE7B7] shadow-[0_0_6px_2px_rgba(16,185,129,0.8)]"
        style={{
          width: size,
          height: size,
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) translateY(-${radius}px)`,
        }}
      />
    </motion.div>
  );
}

const CUBE_FACES = [
  { label: "Java", color: "#F89820", rotate: "rotateY(0deg)" },
  { label: "</>", color: "#10B981", rotate: "rotateY(90deg)" },
  { label: "React", color: "#61DAFB", rotate: "rotateY(180deg)" },
  { label: "{ }", color: "#6EE7B7", rotate: "rotateY(-90deg)" },
];

/**
 * HoloCore — the "sun" the orbit rings revolve around, replacing the
 * profile photo. Layers, back to front:
 *  1. Circular clipped "matrix rain" of falling glyphs
 *  2. A slowly counter-rotating dashed circuit ring
 *  3. A rotating conic-gradient halo glow
 *  4. A genuine 3D cube (CSS preserve-3d) spinning on its Y axis,
 *     each face labeled with a language/tech glyph
 *  5. A few tiny sparks orbiting close to the cube
 * All CSS/SVG/Framer Motion — no external image needed.
 */
function HoloCore() {
  const glyphPool = "01{}<>/;=+-*JS✓#";
  const columns = [12, 26, 40, 54, 68, 82].map((left, i) => ({
    left,
    delay: i * 0.4,
    duration: 3.5 + (i % 3),
    chars: Array.from({ length: 6 }, () =>
      glyphPool[Math.floor(Math.random() * glyphPool.length)]
    ),
  }));

  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.05 }}
      className="relative z-10 w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64"
      style={{ perspective: 900 }}
    >
      {/* Rotating conic-gradient halo */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full opacity-70"
        style={{
          background:
            "conic-gradient(from 0deg, #10B981, transparent 30%, transparent 70%, #10B981)",
          filter: "blur(2px)",
        }}
      />

      {/* Glass disc body — houses the matrix rain */}
      <div
        className="absolute inset-[6px] rounded-full bg-black/85 backdrop-blur-md
                   border border-[#10B981]/40 shadow-[0_0_60px_-5px_rgba(16,185,129,0.55)]
                   overflow-hidden"
      >
        {columns.map((col, i) => (
          <RainColumn key={i} leftPercent={col.left} delay={col.delay} duration={col.duration} chars={col.chars} />
        ))}
        {/* Vignette so rain fades near the edges instead of hard-clipping */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, transparent 40%, rgba(0,0,0,0.85) 85%)",
          }}
        />
      </div>

      {/* Counter-rotating dashed circuit ring, sitting between rain and cube */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[16%] rounded-full border border-dashed border-[#10B981]/50 pointer-events-none"
      />

      {/* Sparks orbiting close around the cube */}
      <Spark radius={46} duration={6} delay={0} size={2.5} />
      <Spark radius={46} duration={6} delay={2} size={2} />
      <Spark radius={46} duration={6} delay={4} size={2} />

      {/* The 3D cube itself, floating at the core */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ rotateY: 360 }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
          className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
          style={{ transformStyle: "preserve-3d" }}
        >
          {CUBE_FACES.map((face) => {
            const halfSize = "calc(clamp(24px, 8vw, 40px))";
            return (
              <div
                key={face.label}
                className="absolute inset-0 flex items-center justify-center
                           font-mono font-bold text-xs sm:text-sm md:text-base
                           bg-black/70 border rounded-md backdrop-blur-sm"
                style={{
                  transform: `${face.rotate} translateZ(${halfSize})`,
                  borderColor: `${face.color}66`,
                  color: face.color,
                  boxShadow: `0 0 16px -2px ${face.color}88`,
                  backfaceVisibility: "hidden",
                }}
              >
                {face.label}
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Pulsing core glow beneath the cube for depth */}
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.9, 1.05, 0.9] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-[#10B981]/30 blur-xl" />
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const roles = ["Frontend Developer", "Full Stack Developer", "MERN Developer"];
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const innerAngleStep = 360 / INNER_SKILLS.length;
  const outerAngleStep = 360 / OUTER_SKILLS.length;

  return (
    <section
      id="home"
      // Clean pure black background with white text
      className="min-h-screen flex items-center justify-center px-6 md:px-20 pt-24 bg-black text-white"
    >
      {/* Keyframes + reduced-motion handling for the orbit system */}
      <style>{`
        @keyframes orbit-cw { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes orbit-ccw { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        @keyframes counter-cw { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes counter-ccw { from { transform: rotate(-360deg); } to { transform: rotate(0deg); } }
        .orbit-ring-cw { animation: orbit-cw var(--duration) linear infinite; }
        .orbit-ring-ccw { animation: orbit-ccw var(--duration) linear infinite; }
        .orbit-counter-cw { animation: counter-cw var(--duration) linear infinite; }
        .orbit-counter-ccw { animation: counter-ccw var(--duration) linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          [class*="orbit-"] { animation: none !important; }
        }
      `}</style>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT — TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >
          {/* Reduced from font-extrabold to font-bold and adjusted sizes */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-slate-100">
            Hi, I'm{" "}
            <span className="text-[#10B981]">
              P Lalithadevi
            </span>
          </h1>

          {/* Animated Role */}
          <div className="h-8 mt-2">
            <AnimatePresence mode="wait">
              <motion.h2
                key={currentRole}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.4 }}
                className="text-lg sm:text-xl md:text-2xl font-medium text-[#34D399]"
              >
                {roles[currentRole]}
              </motion.h2>
            </AnimatePresence>
          </div>

          <p className="mt-6 text-base text-slate-400 leading-relaxed max-w-xl mx-auto md:mx-0">
            Full Stack Web Developer with experience building modern web
            applications using Java, Spring Boot, Hibernate, JDBC, React.js,
            and MongoDB, along with HTML, CSS, and Python. Completed an
            internship focused on clean UI design and best coding practices.
          </p>

          {/* SOCIAL ICONS + BUTTON */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex flex-col items-center md:items-start gap-6"
          >
            <div className="flex gap-6 text-2xl">
              {[
                { icon: <FaGithub />, href: "https://github.com/LalithaDevi-P" },
                { icon: <FaLinkedin />, href: "https://www.linkedin.com/feed/" },
                { icon: <SiLeetcode />, href: "https://leetcode.com/progress/" }
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  target="_blank"
                  whileHover={{ scale: 1.1, color: "#10B981" }}
                  whileTap={{ scale: 0.9 }}
                  className="text-slate-400 transition-colors"
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>

            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              // Solid Emerald Button - No gradients
              className="px-8 py-3 bg-[#10B981] text-black rounded-lg font-bold shadow-md hover:bg-[#059669] transition-all"
            >
              Download Resume
            </motion.a>
          </motion.div>
        </motion.div>

        {/* RIGHT — PROFILE ORBIT SYSTEM */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <div
            className="relative flex items-center justify-center
                       w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[460px] md:h-[460px]"
          >
            {/* Ambient pulsing glow behind everything */}
            <motion.div
              animate={{ opacity: [0.25, 0.5, 0.25], scale: [1, 1.08, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-[#10B981]/20 blur-3xl"
            />

            {/* Dashed orbit path guides */}
            <div
              className="absolute rounded-full border border-dashed border-[#10B981]/25"
              style={{ width: "58%", height: "58%" }}
            />
            <div
              className="absolute rounded-full border border-dashed border-[#10B981]/15"
              style={{ width: "94%", height: "94%" }}
            />

            {/* Inner ring — Java, Spring Boot, React.js, Python */}
            <div className="absolute inset-0 orbit-ring-cw" style={{ "--duration": "18s" }}>
              {INNER_SKILLS.map((skill, i) => (
                <OrbitItem
                  key={skill.label}
                  skill={skill}
                  angle={i * innerAngleStep}
                  radiusPercent={29}
                  duration={18}
                  reverse={false}
                />
              ))}
            </div>

            {/* Outer ring — Hibernate, JDBC, HTML, CSS (opposite direction) */}
            <div className="absolute inset-0 orbit-ring-ccw" style={{ "--duration": "28s" }}>
              {OUTER_SKILLS.map((skill, i) => (
                <OrbitItem
                  key={skill.label}
                  skill={skill}
                  angle={i * outerAngleStep + 45}
                  radiusPercent={47}
                  duration={28}
                  reverse={true}
                />
              ))}
            </div>

            {/* Animated developer "core" — the sun the orbit rings revolve around */}
            <HoloCore />
          </div>
        </motion.div>
      </div>
    </section>
  );
}