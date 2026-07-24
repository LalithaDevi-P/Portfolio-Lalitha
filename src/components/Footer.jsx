import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

export default function Footer() {
  return (
    // Background set to solid black
    <footer className="bg-black border-t border-zinc-900 py-12 px-6 text-center">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
        
        {/* Branding */}
        <h2 className="text-2xl font-black font-heading tracking-tighter text-white">
          PORT<span className="text-[#10B981]">FOLIO</span>.
        </h2>

        {/* Contact Links */}
        <div className="flex flex-wrap justify-center gap-8 text-slate-400 text-sm font-medium">
          <a 
            href="mailto:r363523@gmail.com" 
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <FaEnvelope className="text-[#10B981]" /> r363523@gmail.com
          </a>
          <a 
            href="tel:+919019818281" 
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <FaPhoneAlt className="text-[#10B981]" /> +91 9019818281
          </a>
        </div>

        {/* Copyright */}
        <p className="text-[10px] text-zinc-600 mt-4 tracking-[0.2em] uppercase font-bold">
          © {new Date().getFullYear()} P Lalithadevi • Built with Passion
        </p>

      </div>
    </footer>
  );
}