import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Correct relative import for the background asset
import diamondBg from '../../assets/images/image-hero.png';

const STATUS_UPDATES = [
  { id: 1, label: "Engine Alpha", value: "Uptime 99.9%", color: "text-emerald-400" },
  { id: 2, label: "Active Work Orders", value: "1,378 Pending", color: "text-amber-400" },
  { id: 3, label: "Maintenance Backlog", value: "Reduced by 24%", color: "text-green-400" },
  { id: 4, label: "Defect Tracking", value: "0 Critical Issues", color: "text-emerald-400" }
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % STATUS_UPDATES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 text-white overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `url(${diamondBg})` 
      }}
    >
      {/* Background Mask Tint Overlay to maintain high readability and match deep-green theme */}
      <div className="absolute inset-0 bg-[#2D4A3E]/50 z-0" />

      {/* Floating Kinetic Elements (Background Telemetry Orbs) */}
      <motion.div 
        animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-1/4 left-10 md:left-32 w-24 h-24 rounded-full bg-emerald-500/10 blur-xl pointer-events-none z-10"
      />
      <motion.div 
        animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-10 md:right-32 w-32 h-32 rounded-full bg-green-400/10 blur-2xl pointer-events-none z-10"
      />

      {/* Main Content Area */}
      <div className="relative max-w-5xl px-6 mx-auto text-center z-20 flex flex-col items-center">
        
        {/* Badge Indicator */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs md:text-sm font-semibold tracking-wider text-emerald-100 uppercase">
            Built for Modern Fleets & Industry 4.0
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight bg-gradient-to-b from-white via-white to-emerald-100/90 bg-clip-text text-transparent"
        >
          Smarter Vessel Operations <br />From One Intelligent Platform
        </motion.h1>
        
        {/* Subtitle Text */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-emerald-100/80 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
        >
          Manage maintenance, inspections, crew operations, vessel performance, documentation, inventory, and fleet reporting from one centralized maritime management system.
        </motion.p>

        {/* High-End Interactive UI Terminal & CTA Component */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-xl bg-neutral-900/40 backdrop-blur-xl rounded-2xl border border-white/10 p-5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          {/* Live Changing Data Interface */}
          <div className="flex items-center gap-4 text-left w-full sm:w-auto">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            
            <div className="h-12 flex flex-col justify-center overflow-hidden">
              <span className="text-xs text-emerald-300/60 font-mono tracking-wider uppercase">Live Fleet Status</span>
              <div className="relative h-6 w-48">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={STATUS_UPDATES[currentIndex].id}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute text-sm font-medium text-white flex gap-1.5 items-center"
                  >
                    <span>{STATUS_UPDATES[currentIndex].label}:</span>
                    <span className={`${STATUS_UPDATES[currentIndex].color} font-bold font-mono`}>
                      {STATUS_UPDATES[currentIndex].value}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Action CTA Button */}
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-xl shadow-[0_4px_20px_rgba(16,185,129,0.3)] transition-all duration-200 text-center flex items-center justify-center gap-2 group whitespace-nowrap"
            onClick={() => window.location.href = '/book-a-demo'}
          >
            Book a Demo
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
