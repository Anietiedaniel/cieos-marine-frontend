import React from 'react';
import { motion } from 'framer-motion';

const TRUSTED_ITEMS = [
  "99.9% platform uptime",
  "Enterprise-grade security",
  "Real-time operational visibility",
  "Scalable fleet infrastructure"
];

const SocialProof = () => {
  return (
    <section className="w-full bg-white py-12 px-6 md:px-12 relative border-b border-gray-100">
      <div className="max-w-6xl mx-auto">
        
        {/* Outer Rounded Container Border Frame matching the design specification */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-[#FAFBF9] border border-[#CBD5E1]/40 rounded-[24px] p-8 md:py-10 md:px-12 shadow-[0_4px_20px_rgba(45,74,62,0.02)]"
        >
          {/* Key Deliverable Badges Flex List */}
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 md:gap-x-16">
            {TRUSTED_ITEMS.map((text, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 text-[#334155] font-medium tracking-wide text-sm md:text-base"
              >
                {/* Sage Green Circular List Indicator */}
                <span className="w-2.5 h-2.5 rounded-full bg-[#5C8A6B] flex-shrink-0 animate-pulse" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          {/* Underline Sub-Context Label */}
          <div className="w-full text-center mt-8 pt-6 border-t border-gray-200/50">
            <p className="text-xs md:text-sm font-bold uppercase tracking-[0.12em] text-gray-400">
              Trusted by Shipping Companies, Offshore Operators and Marine Logistics Team
            </p>
          </div>

          {/* Asset Integration Block for Company Logos */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-300">
            {/* Replace the placeholders below with your actual asset vectors when ready:
                <img src="/assets/client-logo-1.png" alt="Operator logo" className="h-8 object-contain" />
            */}
            <div className="h-6 w-24 bg-current text-slate-400 rounded opacity-60" />
            <div className="h-6 w-28 bg-current text-slate-400 rounded opacity-60" />
            <div className="h-6 w-20 bg-current text-slate-400 rounded opacity-60" />
            <div className="h-6 w-32 bg-current text-slate-400 rounded opacity-60" />
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;