"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Clock, GraduationCap } from "lucide-react";

const Assessments: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section
      id="assessments"
      className="w-full bg-white py-28 px-4 relative overflow-hidden"
      ref={ref}
    >
      {/* Background Dots */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-40"></div>
      
      <div className="max-w-4xl mx-auto w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-accent-blue font-extrabold tracking-widest uppercase text-xs mb-3 block">
            KNOWLEDGE TESTING & CERTIFICATION
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-navy-900 tracking-tight">
            Assessments
          </h2>
          <div className="w-12 h-1 bg-accent-blue mx-auto rounded-full mt-4 mb-16" />
          
          {/* Coming Soon Card */}
          <motion.div 
            whileHover={{ y: -6 }}
            className="inline-block bg-slate-50/50 border border-slate-200 px-10 py-12 rounded-3xl shadow-premium relative overflow-hidden max-w-lg w-full group"
          >
            {/* Top gradient highlight line */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-accent-blue via-accent-sky to-accent-indigo" />
            
            <div className="flex flex-col items-center gap-5">
              
              {/* Rotating Clock Container */}
              <div className="relative w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-accent-blue shadow-md">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                >
                  <Clock className="w-8 h-8 text-accent-blue" />
                </motion.div>
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-2xl border border-accent-blue/20 animate-ping pointer-events-none" />
              </div>
              
              <h3 className="text-2xl font-extrabold text-navy-900 mt-2">
                Modules Coming Soon
              </h3>
              
              <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
                We are developing structured testing criteria, rubric checkers, and instant AI grading to certify your software engineering skills. Stay tuned!
              </p>
              
              {/* Status capsule */}
              <span className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-blue/5 border border-accent-blue/10 text-accent-blue text-xs font-bold uppercase tracking-wider">
                <GraduationCap size={14} /> Under Construction
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Assessments;
