// components/TrustBanner.jsx
import React from 'react';
import { motion } from 'framer-motion';

const TrustBanner = () => {
  const values = [
    "99.9% platform uptime",
    "Enterprise-grade security",
    "Real-time operational visibility",
    "Scalable fleet infrastructure"
  ];

  return (
    <section className="w-full bg-[#FAFBF9] py-12 px-6 border-b border-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Rounded Highlight Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#EAEFEA]/40 border border-[#D8E2D8] rounded-2xl p-6 md:p-8 text-center"
        >
          {/* Key Value Propositions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 justify-center items-center">
            {values.map((text, idx) => (
              <div key={idx} className="flex items-center justify-center gap-2.5 text-[#2D4A3E] font-medium">
                <span className="w-2 h-2 rounded-full bg-[#5C8A6B]" />
                <span className="text-sm md:text-base tracking-wide">{text}</span>
              </div>
            ))}
          </div>

          {/* Sub-text Context */}
          <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mt-4">
            Trusted by Shipping Companies, Offshore Operators and Marine Logistics Teams
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBanner;