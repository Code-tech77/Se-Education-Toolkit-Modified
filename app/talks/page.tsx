"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { FileText, Calendar, ShieldCheck, MapPin, Presentation } from "lucide-react";
import Footer from "@/components/Footer";

const TalksPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Hero Header */}
      <section className="bg-navy-950 pt-32 pb-20 px-6 text-center flex flex-col items-center relative border-b border-white/5">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-10 pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl relative z-10 flex flex-col items-center"
        >
          <span className="inline-flex items-center space-x-2 py-1 px-3.5 rounded-full bg-navy-800 border border-white/10 text-accent-sky text-2xs font-extrabold mb-5 tracking-wider uppercase">
            Dissemination & Papers
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-5 text-white tracking-tighter">
            Talks & Presentations
          </h1>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Explore academic presentations, slides, and lectures delivered by the SE Education Toolkit research team.
          </p>
        </motion.div>
      </section>

      {/* Main Content Area */}
      <main className="container mx-auto py-16 px-4 max-w-4xl flex-1 relative z-10">
        <div className="space-y-12">
          
          {/* Talk Card 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-3xl border border-slate-250 shadow-premium hover:shadow-premium-hover transition-all duration-300 overflow-hidden relative"
          >
            {/* Left border indicator line */}
            <div className="absolute top-0 left-0 w-1.5 h-full bg-accent-blue" />
            
            <div className="p-8 md:p-10">
              
              {/* Meta information row */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-bold tracking-wider text-slate-400 uppercase mb-4">
                <span className="flex items-center gap-1.5 bg-slate-105 py-1.5 px-3.5 rounded-full border border-slate-200 text-slate-600">
                  <Calendar className="w-3.5 h-3.5" />
                  April 2025
                </span>
                <span className="flex items-center gap-1.5 bg-slate-105 py-1.5 px-3.5 rounded-full border border-slate-200 text-slate-600">
                  <MapPin className="w-3.5 h-3.5" />
                  IEEE Conference
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl md:text-2xl font-extrabold text-navy-900 mb-4 tracking-tight leading-snug">
                Integrating Large Language Models into Software Engineering Education
              </h2>
              
              {/* Event Callout Box */}
              <div className="bg-slate-50 border border-slate-150 rounded-2xl p-5 mb-6">
                <h3 className="font-extrabold text-xs text-navy-900 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <Presentation size={14} className="text-accent-blue" />
                  Conference Details
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Presented at the prestigious <a 
                    href="https://2025.ieee-educon.org/program/educon-2025-program" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-accent-blue hover:text-navy-900 hover:underline font-extrabold transition-colors inline-flex items-center gap-0.5"
                  >
                    <span>IEEE EDUCON 2025</span>
                  </a> conference program.
                </p>
              </div>

              {/* Abstract */}
              <div className="mb-6">
                <h3 className="font-extrabold text-xs text-slate-450 uppercase tracking-widest mb-2">Abstract</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  This talk examines the integration of Large Language Models into software engineering education, addressing the current gap between industry adoption and educational integration of AI tools. We present our ongoing project on developing an open-source toolkit focusing on requirements engineering and UML design through interactive lab exercises and gamified approaches.
                </p>
              </div>

              {/* Key Topics Badges */}
              <div className="mb-8 border-t border-slate-50 pt-6">
                <h3 className="font-extrabold text-xs text-slate-450 uppercase tracking-widest mb-3">Key Discussion Points</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "AI in SE Industry & Education",
                    "User Story Wizard Game",
                    "Requirements Detective Game",
                    "LLM Comparison Experiments",
                    "Persona-based Prompting"
                  ].map((topic, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1.5 bg-slate-50 border border-slate-150 rounded-lg text-slate-600 font-semibold text-2xs uppercase tracking-wider"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Slides Downloader CTA */}
              <div className="flex items-center pt-2">
                <a 
                  href="/slides/llm-se-education-educon2025.pdf" 
                  className="inline-flex items-center justify-center gap-2.5 bg-navy-950 text-white font-extrabold text-xs uppercase tracking-wider py-4 px-6.5 rounded-full hover:bg-accent-blue hover:scale-102 transition-all shadow-md cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-accent-sky" />
                  <span>Download Presentation Slides</span>
                </a>
              </div>

            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TalksPage;