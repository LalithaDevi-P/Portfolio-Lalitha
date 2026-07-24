import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaBriefcase } from "react-icons/fa";

export default function Internship() {
  const internships = [
    {
      role: "Data Analytics Job Simulation",
      company: "Deloitte",
      duration: "July 2025",
      description: [
        "Completed a virtual job simulation focused on data analytics and strategic decision-making.",
        "Analyzed complex datasets to derive actionable insights for business problems.",
        "Gained exposure to Deloitte's data-driven methodology and professional client reporting.",
      ],
      // Ensure this file is in your public/certifications/ folder
      certificate: "/certifications/Deloitte_InternshipCertificate.pdf",
    },
    {
      role: "Frontend Developer Intern",
      company: "Internship Studio",
      duration: "Sep 2024 - Nov 2024",
      description: [
        "Developed a responsive e-commerce platform using HTML, CSS, JavaScript, and Bootstrap, improving mobile accessibility by 30%.",
        "Followed best coding practices, wrote technical documentation, and optimized UI performance.",
        "Collaborated via Git and GitHub for version control and code reviews.",
      ],
      certificate: "/certifications/internshipCertificate.pdf",
    },
  ];

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 40%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="internship"
      // Reduced padding + no min-h-screen so this section only takes the space its content needs
      className="px-6 md:px-20 pt-12 pb-16 bg-[#000000] text-[#ECFDF5]"
    >
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-bold mb-12 text-left md:pl-6 cursor-pointer
                   hover:text-[#10B981] transition-colors duration-300"
      >
        Internships/Work Experience
      </motion.h2>

      <div ref={containerRef} className="relative max-w-4xl mx-auto">
        {/* Faint static guide line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#10B981]/10 -translate-x-1/2" />
        {/* Scroll-driven line that grows as you scroll through this section */}
        <motion.div
          style={{ height: lineHeight }}
          className="hidden md:block absolute left-1/2 top-0 w-[2px] -translate-x-1/2 bg-[#10B981]
                     shadow-[0_0_10px_rgba(16,185,129,0.6)]"
        />

        <div className="space-y-12 md:space-y-16">
          {internships.map((item, idx) => {
            const fromLeft = idx % 2 === 0;
            return (
              <div key={idx} className="relative md:flex items-center">
                {/* Pulsing milestone marker */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 items-center justify-center">
                  <motion.span
                    animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute w-5 h-5 rounded-full bg-[#10B981]"
                  />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#10B981] border-4 border-black" />
                </div>

                <motion.div
                  initial={{ opacity: 0, x: fromLeft ? -60 : 60, rotateY: fromLeft ? -6 : 6 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  style={{ transformPerspective: 1000 }}
                  className={`md:w-[46%] ${
                    fromLeft ? "md:mr-auto md:pr-10" : "md:ml-auto md:pl-10"
                  } bg-[#022C22]/10 backdrop-blur-lg border border-[#10B981]/20 rounded-xl
                     p-6 md:p-8 shadow-xl hover:border-[#10B981]/40 transition-all`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-9 h-9 shrink-0 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] text-sm">
                      <FaBriefcase />
                    </span>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-[#10B981]">{item.role}</h3>
                      <p className="text-[#059669] text-xs md:text-sm font-medium mt-0.5">
                        {item.company} • {item.duration}
                      </p>
                    </div>
                  </div>

                  {/* Bullets type in one at a time */}
                  <ul className="space-y-2 text-[#94A3B8] text-sm md:text-base leading-relaxed">
                    {item.description.map((point, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: fromLeft ? -12 : 12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
                        className="flex gap-2"
                      >
                        <span className="text-[#10B981] mt-0.5 shrink-0">▹</span>
                        <span>{point}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Certificate link */}
                  <motion.a
                    href={item.certificate}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center mt-6 px-5 py-2 text-xs md:text-sm font-bold
                               bg-[#10B981]/10 border border-[#10B981]/30 rounded-lg
                               text-[#ECFDF5] hover:bg-[#10B981]/20 transition-all cursor-pointer"
                  >
                    View Certificate
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </motion.a>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}