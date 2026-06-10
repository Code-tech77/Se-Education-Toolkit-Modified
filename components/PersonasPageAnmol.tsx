"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { UserCheck, MessageSquare, Award } from "lucide-react";

const personas = [
  {
    icon: "👨‍🏫",
    title: "Tutor",
    description: "Explains concepts step-by-step and guides you through software exercises with patience and clarity. Ideal for beginners or clarifying new terms.",
    tag: "PATIENT & STRUCTURED",
    highlight: "from-accent-sky to-accent-blue"
  },
  {
    icon: "👩‍💼",
    title: "Expert",
    description: "Provides strict, industry-level reviews. Evaluates edge cases, system trade-offs, and compliance with specifications to prepare you for professional roles.",
    tag: "TECHNICAL & CRITICAL",
    highlight: "from-accent-indigo to-accent-violet"
  },
  {
    icon: "👥",
    title: "Peer",
    description: "Facilitates collaborative design sessions, brainstorms criteria, and provides friendly constructive suggestions. Great for practicing joint planning.",
    tag: "SUPPORTIVE & COLLABORATIVE",
    highlight: "from-accent-sky to-accent-indigo"
  },
];

const Personas: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="personas" className="py-28 px-4 bg-white relative overflow-hidden border-b border-slate-100">
      {/* Background Dots Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1.5px,transparent_1.5px),linear-gradient(to_bottom,#f1f5f9_1.5px,transparent_1.5px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)] opacity-25"></div>
      
      <div className="max-w-6xl mx-auto w-full text-center relative z-10" ref={ref}>
        
        {/* Section Title */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-accent-blue font-extrabold tracking-widest uppercase text-xs mb-3 block">
            INTERACT WITH CUSTOM ROLES
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-navy-900 tracking-tight">
            AI Personas
          </h2>
          <div className="w-12 h-1 bg-accent-blue mx-auto rounded-full mt-4 mb-20" />
        </motion.div>

        {/* Personas Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {personas.map((persona, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className="bg-slate-50/50 rounded-3xl p-8 border border-slate-200 shadow-premium hover:shadow-premium-hover transition-all duration-500 flex flex-col items-center relative group"
            >
              {/* Profile Card Header Tag */}
              <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-6 block">
                {persona.tag}
              </span>

              {/* Float Avatar Wrapper */}
              <div className="w-24 h-24 rounded-full bg-navy-900 text-white text-5xl flex items-center justify-center mb-6 shadow-lg relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                {/* Rotating background ring on hover */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${persona.highlight} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                <span className="relative z-10">{persona.icon}</span>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl font-extrabold text-navy-900 mb-3 group-hover:text-accent-blue transition-colors duration-300">
                {persona.title}
              </h3>
              
              <p className="text-slate-600 text-sm leading-relaxed text-center">
                {persona.description}
              </p>

              {/* Status bar */}
              <div className="mt-8 flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-3xs font-extrabold tracking-wider text-slate-400 uppercase">Available in Labs</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Personas;
