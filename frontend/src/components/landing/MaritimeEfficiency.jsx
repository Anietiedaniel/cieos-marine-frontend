import React from 'react';
// Correct relative import for the asset
import diamondBg from '../../assets/images/Frame Diamond-1.png';

// Reusable Feature Benefit Card
const BenefitCard = ({ icon, text }) => (
  <div className="bg-white/50 backdrop-blur-sm border border-[#C9D6BC] rounded-xl p-5 flex flex-col items-center sm:items-start text-center sm:text-left transition-all duration-300 hover:bg-[#EAEFE3]/80 hover:shadow-md hover:-translate-y-0.5">
    <div className="bg-[#BACDB0]/40 text-[#4E5E3C] p-2 rounded-lg mb-4 flex items-center justify-center w-10 h-10">
      {icon}
    </div>
    <h4 className="text-gray-800 font-semibold text-base sm:text-lg tracking-tight leading-snug">
      {text}
    </h4>
  </div>
);

// Reusable Workflow Step Card
const WorkflowStep = ({ stepNumber, icon, title, description }) => (
  <div className="bg-white/50 backdrop-blur-sm border border-[#C9D6BC] rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#A4BA93] hover:bg-[#EAEFE3]/60 group">
    <div>
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-[#6E8857] text-white p-3 rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-105">
          {icon}
        </div>
        <span className="text-xs uppercase tracking-widest font-bold text-gray-500">
          Step {stepNumber}
        </span>
      </div>
      <h4 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#526640] transition-colors">
        {title}
      </h4>
      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

const MaritimeEfficiency = () => {
  return (
    <section 
      className="relative py-20 px-4 sm:px-6 lg:px-8 font-sans space-y-24 bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `url(${diamondBg})` 
      }}
    >
      {/* Background Mask Tint Overlay to maintain high readability and match color theme */}
      <div className="absolute inset-0 bg-[#F4F7F1]/95 z-0" />
      
      {/* ================= SECTION 1: WHY CIEOS GLOBAL CMMS ================= */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[#6E8857] tracking-widest text-xs font-bold uppercase block mb-3">
            Why CIEOS Global CMMS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            Built To <span className="text-[#6E8857]">Improve Maritime</span> Efficiency
          </h2>
        </div>

        {/* Benefits Grid (Responsive 1, 2, or 4 columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <BenefitCard text="Reduce operational downtime" icon="⏰" />
          <BenefitCard text="Improve maintenance accountability" icon="🛡️" />
          <BenefitCard text="Centralize fleet operations" icon="🌿" />
          <BenefitCard text="Improve compliance tracking" icon="📋" />
          <BenefitCard text="Increase operational visibility" icon="👁️" />
          <BenefitCard text="Streamline crew coordination" icon="👥" />
          <BenefitCard text="Improve reporting accuracy" icon="📊" />
          <BenefitCard text="Make faster operational decisions" icon="⚡" />
        </div>
      </div>

      {/* ================= SECTION 2: WORKFLOW ================= */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[#6E8857] tracking-widest text-xs font-bold uppercase block mb-3">
            Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            From setup <span className="text-[#6E8857]">to insights</span> in three steps
          </h2>
        </div>

        {/* Steps Grid (Responsive stacks on mobile, 3 columns on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <WorkflowStep 
            stepNumber="01" 
            title="Onboard your fleet"
            description="Add vessels, teams, equipment, and operational data into a unified workspace."
            icon="💾"
          />
          <WorkflowStep 
            stepNumber="02" 
            title="Run operations"
            description="Manage inspections, maintenance, defects, and workflows with built-in approvals."
            icon="🌿"
          />
          <WorkflowStep 
            stepNumber="03" 
            title="Optimize & report"
            description="Monitor performance and generate operational insights across the entire fleet."
            icon="📈"
          />
        </div>
      </div>

    </section>
  );
};

export default MaritimeEfficiency;