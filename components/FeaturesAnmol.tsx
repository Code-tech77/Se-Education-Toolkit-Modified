"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Bot, Gamepad2, LineChart, ShieldAlert } from "lucide-react";

const features = [
  {
    icon: <Bot className="w-7 h-7 text-accent-sky" />,
    title: "AI-Powered Mentors",
    description: "Leverage advanced Large Language Models tailored as Tutors, Peers, or Experts to provide immediate, personalized feedback on software designs.",
    tag: "INTELLIGENT FEEDBACK"
  },
  {
    icon: <Gamepad2 className="w-7 h-7 text-accent-sky" />,
    title: "Gamified Workflows",
    description: "Navigate software challenges through gamified roles. Earn progress points, solve structural mysteries, and unlock learning badges.",
    tag: "ENGAGING LEARN"
  },
  {
    icon: <LineChart className="w-7 h-7 text-accent-sky" />,
    title: "Hands-on Workbench",
    description: "Gain industry-ready skills by practicing requirements engineering, writing user stories, and drawing conceptual diagrams on our interactive canvas.",
    tag: "PRACTICAL EXPERIENCE"
  }
];

export default function FeaturesAnmol() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="features" className="relative w-full bg-slate-50/50 py-28 px-4 overflow-hidden border-b border-slate-100">
      {/* Subtle Background Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full px-4 relative z-10" ref={ref}>
        
        {/* Header Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="text-accent-blue font-extrabold tracking-widest uppercase text-xs mb-3 block">
            CORE PLATFORM CAPABILITIES
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-navy-900 tracking-tight mb-4">
            Key Features
          </h2>
          <div className="w-12 h-1 bg-accent-blue mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl p-8 border border-slate-100 shadow-premium hover:shadow-premium-hover transition-all duration-500 group relative overflow-hidden flex flex-col justify-between"
            >
              {/* Glowing Top Reveal Border on Hover */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-accent-blue via-accent-sky to-accent-indigo transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              
              <div>
                {/* Decorative circle backdrop */}
                <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-accent-sky/5 rounded-full blur-xl group-hover:bg-accent-sky/15 transition-all duration-500" />
                
                <span className="text-3xs font-extrabold text-slate-400 uppercase tracking-widest block mb-4">
                  {feature.tag}
                </span>

                {/* Styled Icon Wrapper */}
                <div className="w-14 h-14 rounded-2xl bg-navy-900 flex items-center justify-center mb-6 shadow-md transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-extrabold text-navy-900 mb-3 group-hover:text-accent-blue transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Read More / Indicator arrow on hover */}
              <div className="mt-8 pt-4 border-t border-slate-50 flex items-center text-xs font-bold text-accent-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Learn more</span>
                <motion.span 
                  className="ml-1" 
                  animate={{ x: [0, 4, 0] }} 
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  →
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
