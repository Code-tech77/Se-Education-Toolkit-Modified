"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Award, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

const Assessments: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="assessments"
      className="w-full bg-white py-28 px-4 relative overflow-hidden border-b border-slate-100"
      ref={ref}
    >
      {/* Background radial dots */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-45"></div>
      
      <div className="max-w-4xl mx-auto w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <span className="text-accent-blue font-extrabold tracking-widest uppercase text-xs mb-3 block">
            EVALUATE YOUR MODELING SKILLS
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-navy-900 tracking-tight">
            Assessments
          </h2>
          <div className="w-12 h-1 bg-accent-blue mx-auto rounded-full mt-4 mb-16" />
          
          {/* Promotion Card Block */}
          <motion.div 
            whileHover={{ y: -6 }}
            className="bg-slate-50/60 border border-slate-200 p-8 sm:p-10 rounded-3xl shadow-premium relative overflow-hidden max-w-2xl w-full text-left flex flex-col md:flex-row md:items-center gap-8 group"
          >
            {/* Left accent strip */}
            <div className="absolute top-0 left-0 w-[4px] h-full bg-gradient-to-b from-accent-blue to-accent-indigo" />
            
            {/* Graphic Circle Badge */}
            <div className="w-16 h-16 bg-navy-900 text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-500">
              <Award className="w-8 h-8 text-accent-sky" />
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/10 text-emerald-600 text-[10px] font-black uppercase tracking-wider mb-2">
                  <ShieldCheck size={12} /> Live Quiz Active
                </span>
                <h3 className="text-xl font-extrabold text-navy-900 tracking-tight">
                  Adaptive Knowledge Test
                </h3>
              </div>
              
              <p className="text-slate-650 text-xs sm:text-sm leading-relaxed font-semibold">
                Gauge your understanding of Requirements Engineering, User Story writing, Gherkin acceptance criteria, and UML Class modeling. Questions dynamically scale in difficulty as you answer.
              </p>

              {/* Lists of properties */}
              <ul className="grid grid-cols-2 gap-2 text-2xs font-extrabold text-slate-500 uppercase tracking-wide">
                <li className="flex items-center gap-1.5">• 5, 10, or 15 Questions</li>
                <li className="flex items-center gap-1.5">• Adaptive Difficulty</li>
                <li className="flex items-center gap-1.5">• Detailed Explanations</li>
                <li className="flex items-center gap-1.5">• Downloadable Reports</li>
              </ul>
              
              <div className="pt-2">
                <Link
                  href="/assessment"
                  className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-navy-950 hover:bg-accent-blue text-white rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-[1.02] cursor-pointer"
                >
                  <span>Start Assessment</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Assessments;
