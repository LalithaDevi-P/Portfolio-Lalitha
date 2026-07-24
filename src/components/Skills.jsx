import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaJava,
  FaPython,
  FaDatabase,
  FaGitAlt,
  FaFileWord,
  FaFileExcel,
  FaExchangeAlt,
} from "react-icons/fa";
import {
  SiJavascript,
  SiPostgresql,
  SiMysql,
  SiSpringboot,
  SiSpring,
} from "react-icons/si";

const CATEGORIES = [
  {
    title: "Programming",
    skills: [
      { name: "Java", level: 85, icon: <FaJava /> },
      { name: "Python", level: 80, icon: <FaPython /> },
    ],
  },
  {
    title: "Web Development",
    skills: [
      { name: "HTML", level: 95, icon: <FaHtml5 /> },
      { name: "CSS", level: 90, icon: <FaCss3Alt /> },
      { name: "JavaScript", level: 90, icon: <SiJavascript /> },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Spring Boot", level: 85, icon: <SiSpringboot /> },
      { name: "Spring Framework", level: 83, icon: <SiSpring /> },
      { name: "Spring MVC", level: 82, icon: <SiSpring /> },
      { name: "Spring JPA", level: 82, icon: <FaDatabase /> },
      { name: "Hibernate", level: 82, icon: <FaDatabase /> },
      { name: "JDBC", level: 80, icon: <FaDatabase /> },
      { name: "REST API", level: 85, icon: <FaExchangeAlt /> },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "PostgreSQL", level: 80, icon: <SiPostgresql /> },
      { name: "MySQL", level: 82, icon: <SiMysql /> },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git & GitHub", level: 90, icon: <FaGitAlt /> },
      { name: "MS Word", level: 85, icon: <FaFileWord /> },
      { name: "MS Excel", level: 80, icon: <FaFileExcel /> },
    ],
  },
];

const SOFT_SKILLS = [
  "Communication",
  "Teamwork",
  "Problem Solving",
  "Time Management",
  "Leadership",
  "Adaptability",
];

function levelLabel(level) {
  if (level >= 90) return "Expert";
  if (level >= 82) return "Advanced";
  if (level >= 70) return "Proficient";
  return "Familiar";
}

/** Circular proficiency gauge — replaces the old linear progress bar. */
function GaugeCard({ skill, index }) {
  const size = 88;
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (skill.level / 100) * circumference;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.85, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.35, delay: index * 0.03, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group relative bg-[#0a0a0a] border border-zinc-900 hover:border-[#10B981]/50
                 rounded-xl p-5 flex flex-col items-center gap-3 transition-colors"
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#18181b"
            strokeWidth={stroke}
            fill="none"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#10B981"
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.1, ease: "easeOut", delay: index * 0.03 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-2xl text-[#10B981] group-hover:scale-110 transition-transform">
          {skill.icon}
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm font-semibold text-slate-200">{skill.name}</p>
        <p className="text-[10px] text-zinc-500 mt-0.5 tracking-wide">
          {skill.level}% · {levelLabel(skill.level)}
        </p>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const filterOptions = ["All", ...CATEGORIES.map((c) => c.title)];
  const [activeFilter, setActiveFilter] = useState("All");

  const flatSkills = useMemo(
    () =>
      CATEGORIES.flatMap((cat) =>
        cat.skills.map((s) => ({ ...s, category: cat.title }))
      ),
    []
  );

  const filteredSkills =
    activeFilter === "All"
      ? flatSkills
      : flatSkills.filter((s) => s.category === activeFilter);

  return (
    <section id="skills" className="min-h-screen px-6 py-20 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold text-left cursor-pointer hover:text-[#10B981] transition-colors duration-300"
        >
          My Skills
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-zinc-500 text-sm mt-3 mb-10"
        >
          Filter by category to explore proficiency at a glance.
        </motion.p>

        {/* Sliding-pill category filter */}
        <div className="flex flex-wrap gap-2 mb-12">
          {filterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setActiveFilter(opt)}
              className={`relative px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-colors ${
                activeFilter === opt
                  ? "text-black"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {activeFilter === opt && (
                <motion.span
                  layoutId="activeSkillTab"
                  className="absolute inset-0 bg-[#10B981] rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                />
              )}
              <span className="relative z-10">{opt}</span>
            </button>
          ))}
        </div>

        {/* Gauge grid — reflows and re-animates as the filter changes */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mb-16"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, i) => (
              <GaugeCard key={`${skill.category}-${skill.name}`} skill={skill} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Soft skills — floating bubble cloud instead of a static grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#0a0a0a] border border-zinc-900 rounded-xl p-10"
        >
          <h3 className="text-xl font-bold mb-10 text-center font-heading uppercase tracking-widest text-slate-300">
            Professional Strengths
          </h3>

          <div className="flex flex-wrap justify-center gap-3">
            {SOFT_SKILLS.map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
              >
                <motion.span
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 3 + (i % 3),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                  whileHover={{ scale: 1.08 }}
                  className="inline-block px-5 py-2.5 rounded-full border border-zinc-800 bg-black
                             text-sm font-medium text-zinc-300 cursor-default
                             hover:border-[#10B981] hover:text-[#10B981]
                             hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)] transition-all"
                >
                  {skill}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}