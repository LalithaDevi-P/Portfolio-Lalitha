import { useState } from "react";
import { motion } from "framer-motion";
import { FaAward } from "react-icons/fa";

const CERTIFICATIONS = [
  {
    title: "Full Stack Web Development",
    organization: "Udemy",
    date: "Dec 2024",
    pdf: "/certifications/UdemyFullStackCertificate.pdf",
    description:
      "Learned to build full-stack web applications using HTML, CSS, JavaScript, React.js, Node.js, Express.js, and MongoDB. Gained skills in REST APIs, user authentication, and deploying applications to cloud platforms.",
  },
  {
    title: "AI Skills Passport",
    organization: "EY & Microsoft",
    date: "Jan 2026",
    pdf: "/certifications/microsoftcertificate.pdf",
    description:
      "Successfully completed the AI Skills Passport program by EY and Microsoft, gaining foundational knowledge in artificial intelligence concepts, real-world applications, and responsible AI practices.",
  },
  {
    title: "Java Spring Framework, Spring Boot, Spring AI – Gen AI",
    organization: "Udemy",
    date: "Jun 2026",
    pdf: "/certifications/JavaSpringBootCertificate.pdf",
    description:
      "Completed an in-depth 55-hour course on the Java Spring Framework, Spring Boot, and Spring AI — covering production-ready backend development and integrating generative AI capabilities into Java applications.",
  },
];

function CertBadge({ cert, index }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        type: "spring",
        stiffness: 140,
        damping: 14,
      }}
      className="h-72 sm:h-80"
      style={{ perspective: 1200 }}
    >
      <motion.div
        onClick={() => setFlipped((f) => !f)}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
        className="relative w-full h-full cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-xl border border-[#10B981]/20 bg-[#0a0a0a]
                     flex flex-col items-center justify-center text-center p-6 gap-4
                     hover:border-[#10B981]/50 transition-colors"
          style={{ backfaceVisibility: "hidden" }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.15 + 0.4,
              type: "spring",
              stiffness: 260,
              damping: 12,
            }}
            className="w-16 h-16 rounded-full bg-[#10B981]/10 border-2 border-[#10B981]
                       flex items-center justify-center text-[#10B981] text-2xl
                       shadow-[0_0_20px_-4px_rgba(16,185,129,0.6)]"
          >
            <FaAward />
          </motion.div>

          <div>
            <h3 className="text-lg font-bold text-[#ECFDF5] leading-snug">{cert.title}</h3>
            <p className="text-[#059669] text-sm font-medium mt-2">
              {cert.organization} <span className="text-[#94A3B8] mx-1.5">•</span> {cert.date}
            </p>
          </div>

          <span className="mt-2 text-[11px] text-zinc-500 tracking-wide uppercase">
            Tap for details
          </span>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-xl border border-[#10B981]/40 bg-[#0a0a0a]
                     flex flex-col justify-between p-6"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div>
            <h3 className="text-sm font-bold text-[#10B981] uppercase tracking-wide">
              {cert.title}
            </h3>
            <p className="text-[#94A3B8] text-sm mt-3 leading-relaxed">{cert.description}</p>

            {(cert.length || cert.instructors) && (
              <div className="mt-4 space-y-1 text-xs text-zinc-500">
                {cert.length && <p>Duration: {cert.length}</p>}
                {cert.instructors && <p>Instructors: {cert.instructors}</p>}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="text-[11px] text-zinc-600 tracking-wide uppercase">
              Tap to flip back
            </span>
            <motion.a
              href={cert.pdf}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-4 py-1.5 text-xs font-semibold
                         bg-[#10B981]/10 border border-[#10B981]/30 rounded-lg
                         text-[#ECFDF5] hover:bg-[#10B981]/20 transition-all"
            >
              View
              <svg className="w-3.5 h-3.5 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="min-h-screen px-6 py-20 bg-[#000000] text-[#ECFDF5]"
    >
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-bold mb-4 text-left md:pl-14 cursor-pointer
                   hover:text-[#10B981] transition-colors duration-300"
      >
        Certifications
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-zinc-500 text-sm mb-14 md:pl-14"
      >
        Tap a badge to flip it and see the details.
      </motion.p>

      {/* Badge grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {CERTIFICATIONS.map((cert, idx) => (
          <CertBadge key={cert.title} cert={cert} index={idx} />
        ))}
      </div>
    </section>
  );
}