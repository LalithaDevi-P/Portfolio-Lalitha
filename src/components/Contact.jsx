import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

export default function Contact() {
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    const formData = new FormData(e.target);

    // 🔑 PASTE YOUR ACCESS KEY HERE
    formData.append("access_key", "057b47fd-69ec-4e3b-8083-8067ad090560");

    // Optional but recommended
    formData.append("subject", "New Portfolio Contact Message");
    formData.append("from_name", "Portfolio Website");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("Message sent successfully!");
        e.target.reset();
      } else {
        setStatus("Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("Network error. Please try again later.");
    }

    setIsSubmitting(false);
  };

  return (
    <section
      id="contact"
      className="min-h-screen px-6 md:px-20 py-20 bg-[#000000] text-[#ECFDF5]"
    >
      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="text-4xl md:text-5xl font-bold mb-14 md:pl-6 hover:text-[#10B981] transition-colors"
      >
        Get In Touch
      </motion.h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* LEFT: Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <p className="text-[#94A3B8] text-lg max-w-md">
            I'm currently looking for new opportunities. Whether you have a question
            or just want to say hi, I’ll try my best to get back to you!
          </p>

          <div className="space-y-6">
            <ContactItem icon={<FaEnvelope />} title="Email" value="r363523@gmail.com" />
            <ContactItem icon={<FaPhone />} title="Phone" value="+91 9019818281" />
            <ContactItem icon={<FaMapMarkerAlt />} title="Location" value="Sindhanur, Karnataka" />
          </div>
        </motion.div>

        {/* RIGHT: Contact Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-[#022C22]/10 backdrop-blur-lg border border-[#10B981]/20 p-8 rounded-2xl shadow-2xl"
        >
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
            
            {/* Anti-spam honeypot */}
            <input type="checkbox" name="botcheck" className="hidden" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="bg-black border border-[#10B981]/30 rounded-lg p-3 focus:outline-none focus:border-[#10B981]"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="bg-black border border-[#10B981]/30 rounded-lg p-3 focus:outline-none focus:border-[#10B981]"
              />
            </div>

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              required
              className="bg-black border border-[#10B981]/30 rounded-lg p-3 w-full focus:outline-none focus:border-[#10B981]"
            />

            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              required
              className="bg-black border border-[#10B981]/30 rounded-lg p-3 w-full focus:outline-none focus:border-[#10B981]"
            ></textarea>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              className="w-full py-4 bg-[#10B981] text-[#022C22] font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-[#34D399] disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
              <FaPaperPlane />
            </motion.button>

            {status && (
              <p
                className={`text-center mt-4 ${
                  status.includes("successfully")
                    ? "text-[#10B981]"
                    : "text-red-400"
                }`}
              >
                {status}
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}

/* Small reusable component */
function ContactItem({ icon, title, value }) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="p-4 bg-[#10B981]/10 rounded-full text-[#10B981] group-hover:bg-[#10B981]/20 transition-all">
        {icon}
      </div>
      <div>
        <h4 className="text-sm text-[#94A3B8]">{title}</h4>
        <p className="text-lg font-semibold">{value}</p>
      </div>
    </div>
  );
}
