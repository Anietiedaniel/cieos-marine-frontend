import React from 'react';
import { motion } from 'framer-motion';
// Correct relative import for the asset
import diamondBg from '../../assets/images/Frame Diamond-2.png';

const CHALLENGES = [
  {
    title: "Delayed Maintenance",
    desc: "Reactive servicing erodes vessel availability and inflates lifecycle costs.",
    icon: (
      <svg className="w-5 h-5 text-[#2D4A3E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: "Missed Inspections",
    desc: "Paper-based audits and ad-hoc workflows lead to compliance gaps and risk.",
    icon: (
      <svg className="w-5 h-5 text-[#2D4A3E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    )
  },
  {
    title: "Scattered Documentation",
    desc: "Critical vessel records fragmented across drives, ships, and inboxes.",
    icon: (
      <svg className="w-5 h-5 text-[#2D4A3E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
      </svg>
    )
  },
  {
    title: "Inventory Inefficiencies",
    desc: "Stockouts and over-ordering caused by no central spare-parts visibility.",
    icon: (
      <svg className="w-5 h-5 text-[#2D4A3E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    )
  },
  {
    title: "Poor Defect Tracking",
    desc: "Issues go unresolved as defect status is siloed between crew and shore teams.",
    icon: (
      <svg className="w-5 h-5 text-[#2D4A3E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    )
  },
  {
    title: "Operational Downtime",
    desc: "Lack of condition insight turns minor anomalies into costly disruptions.",
    icon: (
      <svg className="w-5 h-5 text-[#2D4A3E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    )
  }
];

const Challenge = () => {
  return (
    <section 
      className="w-full py-24 px-6 md:px-12 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `url(${diamondBg})` 
      }}
    >
      {/* Background Mask Tint Overlay to maintain high readability and match color theme */}
      <div className="absolute inset-0 bg-[#FAFBF9]/95 z-0" />
      
      {/* Subtle Background Accent Diamonds */}
      <div className="absolute top-10 left-5 w-32 h-32  rotate-45 rounded-xl opacity-40 pointer-events-none z-10" />
      
      <div className="max-w-6xl mx-auto relative z-20">
        
        {/* Header Block */}
        <div className="text-left mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5C8A6B]">The Challenge</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#1E3329] mt-2 mb-4 tracking-tight">
            Maritime Operations Become <br />Expensive Without Visibility
          </h2>
          <p className="text-gray-600 max-w-2xl text-base md:text-lg leading-relaxed">
            Fragmented systems, manual processes, and disconnected data turn routine operations into unpredictable, high-cost events.
          </p>
        </div>

        {/* 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CHALLENGES.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white/60 backdrop-blur-sm border border-[#E1EAE1] hover:border-[#CAD6CA] rounded-2xl p-6 md:p-8 flex flex-col items-start gap-4 transition-all hover:shadow-[0_12px_30px_-10px_rgba(45,74,62,0.06)]"
            >
              {/* Icon Container with Sage Accent */}
              <div className="w-10 h-10 rounded-xl bg-[#E2ECE2] flex items-center justify-center">
                {item.icon}
              </div>
              
              {/* Content text */}
              <div>
                <h3 className="text-lg font-bold text-[#1E3329] mb-2">{item.title}</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed font-light">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Challenge;