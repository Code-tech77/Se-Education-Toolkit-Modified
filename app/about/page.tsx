"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useAnimation, useInView } from "motion/react";
import { ArrowRight, Check, ExternalLink, Mail, Users, BookOpen } from "lucide-react";

export default function AboutPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const controls = useAnimation();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <main
      ref={ref}
      className="min-h-screen flex flex-col relative overflow-hidden bg-slate-50/50"
    >
      {/* Subtle Background Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Background radial highlight shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-accent-sky/5 blur-[120px]" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 rounded-full bg-accent-indigo/5 blur-[140px]" />
      </div>

      {/* Hero section with deep navy backdrop */}
      <section className="bg-navy-950 pt-32 pb-20 px-6 relative overflow-hidden border-b border-white/5 text-center flex flex-col items-center">
        {/* Subtle geometric pattern inside dark banner */}
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-10 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <span className="inline-flex items-center space-x-2 py-1 px-3.5 rounded-full bg-navy-800 border border-white/10 text-accent-sky text-2xs font-extrabold mb-5 tracking-wider uppercase">
              Project Insights
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-white tracking-tighter leading-tight">
              About the Project
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              An educational project exploring how Large Language Models can enhance software engineering education, UML design, and classroom workflows.
            </p>
          </motion.div>

          {/* Sliding Pill Tab Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex p-1 bg-navy-900 border border-white/10 rounded-full mt-12 relative"
          >
            {[
              { id: "overview", label: "Overview", icon: <BookOpen size={14} /> },
              { id: "team", label: "Research Team", icon: <Users size={14} /> }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider relative transition-colors duration-300 z-10 cursor-pointer ${
                    isActive ? "text-navy-950" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="active-about-tab"
                      className="absolute inset-0 bg-white rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Content section */}
      <section className="py-16 px-4 flex-1">
        <div className="max-w-5xl mx-auto">
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-10"
            >
              {/* Detailed Card */}
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-premium border border-slate-150 relative overflow-hidden">
                <h2 className="text-2xl font-extrabold mb-6 text-navy-900 tracking-tight">
                  Project Overview
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-10">
                  This project was developed as part of a research initiative at **Brunel University London** to investigate the integration of Large Language Models (LLMs) into undergraduate software engineering courses. The platform offers hands-on, interactive exercises centered around requirements engineering, writing clear user stories, and diagramming system logic.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  {/* Student Benefits */}
                  <div className="bg-slate-50 border border-slate-150 rounded-2xl p-6">
                    <h3 className="font-extrabold text-sm uppercase tracking-wider mb-4 text-navy-900">
                      Benefits for Students
                    </h3>
                    <ul className="space-y-3.5">
                      {[
                        "Immediate, LLM-guided personalized critiques",
                        "Gamified environment to explore requirements",
                        "Fail-safe workbench for structural practice",
                        "Self-paced learning with step-by-step goals"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="w-5 h-5 rounded-full bg-accent-blue/10 text-accent-blue flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <Check size={12} />
                          </span>
                          <span className="text-slate-600 text-xs sm:text-sm font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Educator Benefits */}
                  <div className="bg-slate-50 border border-slate-150 rounded-2xl p-6">
                    <h3 className="font-extrabold text-sm uppercase tracking-wider mb-4 text-navy-900">
                      Benefits for Educators
                    </h3>
                    <ul className="space-y-3.5">
                      {[
                        "Scalable automated feedback for large cohorts",
                        "Reduced time spent on simple syntax grading",
                        "Valuable insights into student model queries",
                        "Focus resources on high-level architecture tasks"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="w-5 h-5 rounded-full bg-accent-blue/10 text-accent-blue flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <Check size={12} />
                          </span>
                          <span className="text-slate-600 text-xs sm:text-sm font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Funding Info */}
              <div className="bg-white rounded-3xl p-8 shadow-premium border border-slate-150 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-navy-950 text-white flex items-center justify-center flex-shrink-0">
                  🏛️
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-navy-900 mb-1">
                    Funding Support
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    This project is supported by the **Council of Professors and Heads of Computing (CPHC)** Special Projects grant.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "team" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-premium border border-slate-150">
                <h2 className="text-2xl font-extrabold mb-4 text-navy-900 tracking-tight text-center">
                  Research Team
                </h2>
                <p className="text-slate-600 text-sm max-w-2xl mx-auto text-center mb-12 leading-relaxed">
                  Combining expertise in software architecture, computer science pedagogy, and generative model engineering at Brunel University London.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      name: "Dr. Cigdem Sengul",
                      email: "cigdem.sengul@brunel.ac.uk",
                      img: "https://static.wixstatic.com/media/31cbd6_6e99d94e057f40779df469fd471f4a64~mv2.jpg/v1/fill/w_385,h_380,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Profile_Image1.jpg",
                      role: "Co-Investigator"
                    },
                    {
                      name: "Dr. Rumyana Neykova",
                      email: "rumyana.neykova@brunel.ac.uk",
                      img: "https://media.licdn.com/dms/image/v2/C4D03AQFsc1lq5CR_vA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1516587953912?e=2147483647&v=beta&t=zVnsI9K4A00tPOxNcFA7QMQng5JFQ_X5nOOQPnnCfmQ",
                      role: "Principal Investigator"
                    },
                    {
                      name: "Dr. Giuseppe Destefanis",
                      email: "giuseppe.destefanis@brunel.ac.uk",
                      img: "https://media.licdn.com/dms/image/v2/D4E03AQEtb9hrPjv1_g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1677749834673?e=2147483647&v=beta&t=yrxtkyibPkbjrU3Rp76opoWgn_5Oh7RsKhUdtsLY64I",
                      role: "Co-Investigator"
                    }
                  ].map((member, i) => (
                    <div key={i} className="flex flex-col items-center text-center p-6 bg-slate-50 border border-slate-100 rounded-3xl relative overflow-hidden group">
                      <div className="w-28 h-28 rounded-full mb-4 overflow-hidden relative border-2 border-navy-950/5 shadow-md group-hover:scale-105 transition-transform duration-500 bg-slate-200">
                        <Image
                          src={member.img}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-1">{member.role}</span>
                      <h3 className="font-extrabold text-navy-900 text-lg">
                        {member.name}
                      </h3>
                      <p className="text-xs text-slate-400 font-medium">Brunel University London</p>
                      
                      <a
                        href={`mailto:${member.email}`}
                        className="text-xs text-accent-blue hover:text-navy-900 font-bold mt-4 flex items-center gap-1 group/mail"
                      >
                        <Mail size={12} />
                        <span>{member.email}</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Call to action in deep navy banner */}
      <section className="py-20 px-6 bg-navy-950 text-white relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-5 tracking-tight">Ready to Get Started?</h2>
          <p className="text-slate-300 text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
            Explore our interactive AI workbench modules and experience the classroom-tested software toolkit today.
          </p>
          <div className="flex flex-wrap justify-center gap-4 w-full sm:w-auto">
            <Link
              href="/labs"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-navy-950 rounded-full font-extrabold text-xs uppercase tracking-wider hover:bg-slate-100 transition-colors w-full sm:w-auto hover:scale-105 transition-all"
            >
              <span>Explore Labs</span>
              <ArrowRight size={14} className="ml-2" />
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-navy-800 text-white border border-white/10 rounded-full font-extrabold text-xs uppercase tracking-wider hover:bg-navy-700 transition-colors w-full sm:w-auto hover:scale-105 transition-all"
            >
              <span>GitHub Codebase</span>
              <ExternalLink size={14} className="ml-2" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
