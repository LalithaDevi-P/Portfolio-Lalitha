import { motion } from "framer-motion";
import { FaTrophy, FaMedal } from "react-icons/fa";

export default function Achievements() {
  const achievements = [
    {
      title: "2nd Place - Evogen",
      organization: "Gogte College, Belagaum",
      description:
        "Secured the second position in 'Evogen', a high-level coding competition, demonstrating proficiency in logic-building and rapid problem-solving.",
      icon: <FaMedal />, 
      year: "2025",
      // Ensure this file is in your public/certifications/ folder
      certificate: "/certifications/EvogenGogte.pdf",
    },
    {
      title: "3rd Place - Anustanam (National Tech Fest)",
      organization: "KLE College, Hubli",
      description:
        "Achieved 3rd rank in the 'SAS Anustanam' coding event, competing against talented developers in a series of algorithmic challenges.",
      icon: <FaTrophy />, 
      year: "2025",
      // Ensure this file is in your public/certifications/ folder
      certificate: "/certifications/AnustanamKLE.pdf",
    },
  ];

  return (
    <section
      id="achievements"
      className="min-h-screen px-6 md:px-20 py-20 bg-[#000000] text-[#ECFDF5]"
    >
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-bold mb-14 text-left md:pl-6 cursor-pointer
                   hover:text-[#10B981] transition-colors duration-300"
      >
        Achievements
      </motion.h2>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {achievements.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-[#022C22]/10 backdrop-blur-lg border border-[#10B981]/20 rounded-2xl p-8 flex flex-col items-start gap-4 shadow-xl hover:border-[#10B981]/50 transition-all"
          >
            {/* Rank Icon - Styled to match Emerald Theme */}
            <div className="p-4 bg-[#10B981]/10 rounded-full text-3xl text-[#10B981] shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              {item.icon}
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#ECFDF5]">{item.title}</h3>
              <p className="text-[#10B981] font-medium text-sm mt-1">
                {item.organization} • {item.year}
              </p>
            </div>

            <p className="text-[#94A3B8] text-sm md:text-base leading-relaxed mt-2 flex-grow">
              {item.description}
            </p>

            {/* View Certificate Button */}
            <div className="mt-6 w-full">
              <motion.a
                href={item.certificate}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-5 py-2 text-sm font-bold 
                           bg-[#10B981]/10 border border-[#10B981]/30 rounded-lg 
                           text-[#ECFDF5] hover:bg-[#10B981]/20 transition-all cursor-pointer"
              >
                View Certificate
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </motion.a>
            </div>

            {/* Subtle Decoration Line */}
            <div className="w-12 h-1 bg-[#10B981]/30 rounded-full mt-2"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}