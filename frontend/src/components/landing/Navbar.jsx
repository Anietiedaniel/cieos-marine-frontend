import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// /book-a-demo

// Structured link data with dropdown menus
const NAV_LINKS = [
  {
    label: 'Features',
    hasDropdown: true,
    dropdownItems: [
      { name: 'Platform', desc: 'Manage schedules and planned servicing.' },
      { name: 'Challenge', desc: 'Structured workflows with digital reporting.' },
      { name: 'Solution', desc: 'Real-time asset health and telemetry.' },
      { name: 'Dashboard', desc: 'Track and complete tasks efficiently.' },
      { name: 'Serurity', desc: 'Track and complete tasks efficiently.' }
    ]
  },
  { label: 'Pricing', 
     hasDropdown: true,
    dropdownItems: [
      { name: 'Basic', desc: 'Centralized multi-vessel telemetry.' },
      { name: 'Pro plan', desc: 'Compliance and inventory safety.' },
      { name: 'Premium plan', desc: 'Compliance and inventory safety.' }
    ]
  },

  { label: 'Resources', 
    hasDropdown: true,
    dropdownItems: [
      { name: 'Blog', desc: 'Centralized multi-vessel telemetry.' },
      { name: 'Product update', desc: 'Compliance and inventory safety.' },
      { name: 'Help center', desc: 'Compliance and inventory safety.' }
    ]
  },
];

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }} 
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-4 flex items-center justify-between bg-[#2D4A3E]/30 backdrop-blur-xl border-b border-white/10"
      >
        {/* Logo and Brand Name */}
        <div className="flex items-center gap-3 cursor-pointer">
          <img 
            src="src\assets\images\logo (2).png" 
            alt="CIEOS Global Logo" 
            className="w-8 h-8 object-contain"
            onError={(e) => {
              // Fallback if asset isn't ready
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          {/* Fallback geometric element matching your asset style */}
          <div className="hidden w-8 h-8 bg-emerald-500 rounded-lg transform rotate-45 border border-white/20" />
          <span className="text-xl font-bold tracking-tight text-white">CIEOS Global</span>
        </div>
        
        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-white/80 font-medium">
          {NAV_LINKS.map((link, index) => (
            <div 
              key={index}
              className="relative py-2 group"
              onMouseEnter={() => link.hasDropdown && setActiveDropdown(index)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 hover:text-white transition-colors duration-200">
                <span>{link.label}</span>
                {link.hasDropdown && (
                  <svg 
                    className={`w-4 h-4 transform transition-transform duration-200 ${activeDropdown === index ? 'rotate-180' : ''}`} 
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>

              {/* Desktop Mega Dropdown Overlay */}
              <AnimatePresence>
                {link.hasDropdown && activeDropdown === index && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-80 bg-neutral-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-2xl z-50 grid gap-2"
                  >
                    {link.dropdownItems.map((item, itemIdx) => (
                      <a 
                        key={itemIdx} 
                        href="#" 
                        className="p-3 rounded-xl hover:bg-white/5 transition flex flex-col gap-0.5 group/item"
                      >
                        <span className="text-sm font-semibold text-white group-hover/item:text-emerald-400 transition-colors">
                          {item.name}
                        </span>
                        <span className="text-xs text-white/50 font-normal leading-relaxed">
                          {item.desc}
                        </span>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-5">
          <button className="text-white/90 hover:text-white font-semibold transition-colors">Log In</button>
          <button className="text-white/90 hover:text-white font-semibold transition-colors">Sign UP</button>
          <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          onClick={() => window.location.href = '/book-a-demo'}>
          
            Book a Demo
          </button>
        </div>

        {/* Mobile Hamburger Button Trigger */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white focus:outline-none z-50 p-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </motion.nav>

      {/* Mobile Nav Overlay drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="fixed inset-0 bg-neutral-950/95 backdrop-blur-2xl z-40 md:hidden pt-28 px-6 flex flex-col gap-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link, idx) => (
                <div key={idx} className="border-b border-white/5 pb-3">
                  <div className="text-lg font-bold text-white mb-2">{link.label}</div>
                  {link.hasDropdown && (
                    <div className="pl-4 grid gap-2.5 mt-2">
                      {link.dropdownItems.map((item, itemIdx) => (
                        <a key={itemIdx} href="#" className="flex flex-col">
                          <span className="text-sm font-medium text-emerald-400">{item.name}</span>
                          <span className="text-xs text-white/40">{item.desc}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 mt-auto mb-12">
              <button className="w-full border border-white/20 text-white font-bold py-3.5 rounded-xl hover:bg-white/5 transition">
                Log In
              </button>
              <button className="w-full bg-emerald-600 border border-white/20 text-white font-bold py-3.5 rounded-xl hover:bg-white/5 transition">
                Sign Up
              </button>
              <button className="w-full bg-emerald-600 text-white font-bold py-3.5 rounded-xl shadow-lg">
                Book a Demo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;