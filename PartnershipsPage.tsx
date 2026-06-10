"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, X, ArrowUpRight, HelpCircle } from "lucide-react";

const Partnership = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      className="relative w-full bg-navy-950 py-28 px-4 overflow-hidden border-b border-white/5"
      id="partners"
    >
      {/* Background radial overlays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[60%] h-[60%] rounded-full bg-navy-900 blur-[130px] opacity-70" />
        <div className="absolute bottom-[10%] right-[5%] w-[40%] h-[50%] rounded-full bg-accent-blue/15 blur-[120px] opacity-35" />
      </div>

      <div className="max-w-4xl mx-auto w-full text-center relative z-10">
        
        {/* Title Group */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-accent-sky font-extrabold tracking-widest uppercase text-xs mb-3 block">
            RESEARCH & INTEGRATION
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-white tracking-tight">
            Looking for Partners!
          </h2>

          {/* Main Card */}
          <div className="glass-dark-card rounded-3xl p-8 md:p-12 shadow-2xl mb-12 max-w-3xl mx-auto border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-accent-sky" />
            <p className="text-slate-200 text-base md:text-lg leading-relaxed text-left md:text-center font-medium">
              Join our educational research initiative by implementing the toolkit at your academic institution.
              Help us evaluate the learning impacts of LLMs in Software Engineering courses and shape the future of teaching core technical skills.
            </p>
          </div>

          {/* Contact Trigger Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="group relative inline-flex items-center justify-center px-10 py-4.5 font-bold text-navy-950 bg-white rounded-full overflow-hidden transition-all shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_30px_rgba(255,255,255,0.45)] cursor-pointer"
          >
            <Mail className="mr-2.5 w-5 h-5 text-navy-950 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-sm tracking-wider uppercase font-extrabold">Connect With Researchers</span>
          </motion.button>
        </motion.div>

        {/* Modal Popup Dialog */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              {/* Blur Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-navy-950/80 backdrop-blur-md"
              />
              
              {/* Modal Card */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                transition={{ type: "spring", damping: 26, stiffness: 280 }}
                className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden z-10 border border-slate-100"
              >
                {/* Header Section */}
                <div className="bg-navy-900 p-7 text-center relative border-b border-navy-850">
                  <h3 className="text-xl font-extrabold text-white flex items-center justify-center gap-2.5">
                    <Mail className="w-5 h-5 text-accent-sky" /> 
                    <span className="tracking-wide uppercase">Get In Touch</span>
                  </h3>
                  <p className="text-2xs text-slate-400 mt-1 font-mono uppercase tracking-widest">Research Coordination</p>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                {/* Contacts List */}
                <div className="p-8 space-y-5 bg-white">
                  {[
                    { name: "Dr. Rumyana Neykova", email: "rumyana.neykova@brunel.ac.uk", role: "Principal Researcher" },
                    { name: "Dr. Cigdem Sengul", email: "cigdem.sengul@brunel.ac.uk", role: "Co-Investigator" },
                    { name: "Dr. Giuseppe Destefanis", email: "giuseppe.destefanis@brunel.ac.uk", role: "Co-Investigator" },
                  ].map((contact, idx) => (
                    <motion.div 
                      key={idx} 
                      whileHover={{ x: 4 }}
                      className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100/50 hover:border-slate-200 transition-all duration-300"
                    >
                      <div className="flex flex-col min-w-0 pr-3">
                        <span className="text-2xs font-extrabold text-slate-400 uppercase tracking-wider mb-0.5">{contact.role}</span>
                        <span className="text-navy-900 font-extrabold text-base truncate">{contact.name}</span>
                        <a
                          href={`mailto:${contact.email}`}
                          className="text-accent-blue hover:text-navy-800 font-bold text-xs truncate mt-1 flex items-center gap-1 w-fit group"
                        >
                          <span>{contact.email}</span>
                          <ArrowUpRight size={12} className="opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                      </div>
                      <a 
                        href={`mailto:${contact.email}`}
                        className="w-10 h-10 rounded-full bg-navy-900 text-white flex items-center justify-center hover:bg-accent-blue transition-colors flex-shrink-0"
                      >
                        <Mail size={16} />
                      </a>
                    </motion.div>
                  ))}
                </div>
                
                {/* Footer buttons */}
                <div className="bg-slate-50 p-6 text-center border-t border-slate-100 flex items-center justify-end">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="py-3 px-6 bg-slate-200 text-navy-900 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-300 transition-colors cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Partnership;
