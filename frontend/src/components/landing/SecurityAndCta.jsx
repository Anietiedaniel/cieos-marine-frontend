import React from 'react';
// Correct relative import for your asset background
import diamondBg from '../../assets/images/image-hero.png';

// Reusable Security Feature Card Component
const SecurityCard = ({ icon, title, description }) => (
  <div className="bg-[#EAEFE3]/40 border border-[#C9D6BC] rounded-2xl p-6 flex flex-col justify-start transition-all duration-300 hover:bg-[#EAEFE3]/70 hover:shadow-sm">
    <div className="flex items-center gap-3 mb-4">
      <div className="bg-[#5B7043] text-white p-2 rounded-lg flex items-center justify-center w-9 h-9 text-sm">
        {icon}
      </div>
      <h3 className="text-gray-800 font-bold text-base tracking-tight">
        {title}
      </h3>
    </div>
    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
      {description}
    </p>
  </div>
);

const SecurityAndCta = () => {
  return (
    <section className="bg-[#F4F7F1] py-20 px-4 sm:px-6 lg:px-8 font-sans space-y-24">
      
      {/* ================= TRUST / SECURITY SECTION ================= */}
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mb-12">
          <span className="text-[#6E8857] tracking-widest text-xs font-bold uppercase block mb-3">
            Trust
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Enterprise Security & <br className="hidden sm:inline" />
            <span className="text-[#6E8857]">Operational Reliability</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl leading-relaxed">
            CIEOS Global is built to meet the security and compliance standards of regulated maritime operators worldwide.
          </p>
        </div>

        {/* 3-Column Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SecurityCard 
            icon="☁️" 
            title="Secure cloud infrastructure" 
            description="Multi-region deployments hardened to maritime industry standards." 
          />
          <SecurityCard 
            icon="🔒" 
            title="Role-based access control" 
            description="Granular permissions across fleet, vessel, department, and role." 
          />
          <SecurityCard 
            icon="🔑" 
            title="Encrypted operational data" 
            description="AES-256 at rest, TLS 1.3 in transit, customer-managed keys available." 
          />
          <SecurityCard 
            icon="🔄" 
            title="Continuous backups" 
            description="Point-in-time recovery with geo-redundant storage and failover." 
          />
          <SecurityCard 
            icon="📊" 
            title="Scalable architecture" 
            description="From single-vessel pilots to global fleets of hundreds of ships." 
          />
          <SecurityCard 
            icon="🛡️" 
            title="System reliability" 
            description="SLA-backed 99.9% uptime, monitored 24/7 by our operations team." 
          />
        </div>
      </div>

      {/* ================= MODERNIZE / CTA SECTION ================= */}
      <div className="max-w-5xl mx-auto px-2">
        <div 
          className="relative overflow-hidden rounded-[2.5rem] bg-cover bg-center bg-no-repeat border border-[#BACDB0] p-8 sm:p-12 lg:p-16 text-center shadow-xl"
          style={{ 
            backgroundImage: `url(${diamondBg})` 
          }}
        >
          {/* Layer 1: Dark-green gradient overlay to give depth and blend with the asset */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#5B7043]/50 via-[#6E8857]/65 to-[#8EA475]/70 z-0" />
          
          {/* Layer 2: Subtle Radial light beam effect over the background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15)_0%,transparent_60%)] pointer-events-none z-10" />

          {/* Interactive Content Container */}
          <div className="relative z-20 flex flex-col items-center max-w-3xl mx-auto">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-1 mb-8 text-xs font-semibold text-white">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              Ready when you are
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6">
              Modernize Your Maritime Operations
            </h2>

            {/* Description */}
            <p className="text-emerald-50 text-sm sm:text-base lg:text-lg font-medium leading-relaxed mb-10 max-w-2xl opacity-95">
              Bring maintenance, inspections, equipment, inventory, documents, teams, and fleet operations into one intelligent vessel management platform.
            </p>

            {/* Interactive Actions */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button 
              className="bg-white hover:bg-emerald-50 text-[#4E5E3C] font-bold text-sm px-6 py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-black/10"
              onClick={() => window.location.href = '/contact'}
              >
                Contact Sales 📞
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-6 py-3.5 rounded-xl border border-white/20 transition-all duration-200 shadow-sm"
              onClick={() => window.location.href = '/book-a-demo'}
              >
                Book a Demo
              </button>
            </div>
          </div>
          
        </div>
      </div>

    </section>
  );
};

export default SecurityAndCta;