"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Quote } from "lucide-react";

const testimonials = [
  { id: 1, quote: "It was fun and engaging" },
  { id: 2, quote: "Significantly more interactive, paired with an interesting topic makes it fun to do" },
  { id: 3, quote: "I like the step-by-step guidance and immediate feedback" },
  { id: 4, quote: "It was quick to use and it didn't feel like I am bothering someone or asking stupid questions" },
  { id: 5, quote: "It was independent so I learnt more" },
  { id: 6, quote: "Quicker and easier to understand" },
  { id: 7, quote: "Interaction with LLMs make this exercise 'fun' and might encourage students to be intentional with their prompts and proof-read answers." },
  { id: 8, quote: "The hands-on experience working directly conversing with an LLM model in the form of a game greatly streamlined the learning process and I thoroughly enjoyed it." },
];

export default function TestimonialsPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });

  // Create duplicate testimonials for seamless looping
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section ref={ref} className="py-28 overflow-hidden bg-slate-50/50 relative border-b border-slate-100">
      {/* Decorative blurred backgrounds */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-accent-sky/5 rounded-full blur-[130px] -z-10" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-navy-900/5 rounded-full blur-[130px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="text-accent-blue font-extrabold tracking-widest uppercase text-xs mb-3 block">
            STUDENT SUCCESS & OUTCOMES
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-navy-900 tracking-tight">
            Student Experiences
          </h2>
          <div className="w-12 h-1 bg-accent-blue mx-auto rounded-full mt-4 mb-6" />
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Hear what students from Brunel University London have to say about their journey using the AI-powered toolkit.
          </p>
        </motion.div>

        {/* Carousel Tracks */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="slider-container relative group">
            {/* Fade edge overlays */}
            <div className="absolute top-0 bottom-0 left-0 w-28 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 bottom-0 right-0 w-28 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>
            
            {/* Horizontal Continuous track */}
            <div className="testimonials-track flex gap-6 py-6">
              {duplicatedTestimonials.map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="min-w-[320px] md:min-w-[360px] lg:min-w-[420px] flex-shrink-0"
                >
                  <div className="bg-white rounded-3xl p-8 shadow-premium hover:shadow-premium-hover hover:border-slate-200 transition-all duration-300 border border-slate-100 relative h-full flex flex-col justify-between group">
                    <div className="relative">
                      <Quote className="w-9 h-9 text-accent-blue/10 absolute -top-2 -left-2 group-hover:scale-110 transition-transform duration-300" />
                      <p className="text-navy-900 font-medium text-base leading-relaxed relative z-10 pt-6 italic">
                        "{testimonial.quote}"
                      </p>
                    </div>
                    
                    {/* Student Avatar Tag */}
                    <div className="mt-8 flex items-center gap-3.5 border-t border-slate-50 pt-6">
                      <div className="w-10 h-10 rounded-full bg-navy-900 flex items-center justify-center text-white font-extrabold text-xs shadow-inner">
                        🎓
                      </div>
                      <div className="flex flex-col">
                        <span className="text-navy-900 font-extrabold text-sm">Student Participant</span>
                        <span className="text-slate-400 text-3xs font-bold tracking-wider uppercase">Verified feedback</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
