import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#EAEFE3]/60 border-t border-[#C9D6BC] pt-16 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12 items-start mb-12">
          
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              {/* Logo icon match */}
              <div className="w-6 h-6 flex items-center justify-center bg-[#6E8857] text-white rounded-md text-xs font-serif font-bold italic">
                G
              </div>
              <span className="text-gray-900 font-extrabold text-base tracking-tight">
                CIEOS Global
              </span>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              The intelligent maritime management platform for modern shipping companies, offshore operators, and marine logistics teams.
            </p>
          </div>

          {/* Column 2: Company Links */}
          <div>
            <h4 className="text-xs font-extrabold text-gray-900 tracking-wider uppercase mb-4">
              Company
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><a href="#contact" className="text-gray-600 hover:text-[#5B7043] font-medium transition-colors">Contact</a></li>
              <li><a href="#privacy" className="text-gray-600 hover:text-[#5B7043] font-medium transition-colors">Privacy policy</a></li>
              <li><a href="#help" className="text-gray-600 hover:text-[#5B7043] font-medium transition-colors">Help center</a></li>
            </ul>
          </div>

          {/* Column 3: Features Links */}
          <div>
            <h4 className="text-xs font-extrabold text-gray-900 tracking-wider uppercase mb-4">
              Features
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><a href="#platform" className="text-gray-600 hover:text-[#5B7043] font-medium transition-colors">Platform</a></li>
              <li><a href="#challenges" className="text-gray-600 hover:text-[#5B7043] font-medium transition-colors">Challenges</a></li>
              <li><a href="#solution" className="text-gray-600 hover:text-[#5B7043] font-medium transition-colors">Solution</a></li>
              <li><a href="#dashboard" className="text-gray-600 hover:text-[#5B7043] font-medium transition-colors">Dashboard</a></li>
              <li><a href="#security" className="text-gray-600 hover:text-[#5B7043] font-medium transition-colors">Security</a></li>
            </ul>
          </div>

          {/* Column 4: Pricing & Resources Links */}
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-extrabold text-gray-900 tracking-wider uppercase mb-4">
                Pricing
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li><a href="#basic" className="text-gray-600 hover:text-[#5B7043] font-medium transition-colors">Basic Plan</a></li>
                <li><a href="#pro" className="text-gray-600 hover:text-[#5B7043] font-medium transition-colors">Pro Plan</a></li>
                <li><a href="#premium" className="text-gray-600 hover:text-[#5B7043] font-medium transition-colors">Premium Plan</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-gray-900 tracking-wider uppercase mb-4">
                Resources
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li><a href="#blog" className="text-gray-600 hover:text-[#5B7043] font-medium transition-colors">Blog Post</a></li>
                <li><a href="#updates" className="text-gray-600 hover:text-[#5B7043] font-medium transition-colors">Product Update</a></li>
                <li><a href="#help" className="text-gray-600 hover:text-[#5B7043] font-medium transition-colors">Help center</a></li>
              </ul>
            </div>
          </div>

          {/* Column 5: Newsletter Card & Demo Action */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-1 bg-[#DEE5D8]/60 border border-[#BACDB0] rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 bg-transparent text-gray-700 text-xs sm:text-sm leading-relaxed">
              Sign up for our newsletter to get notifications of our upgrades
            </div>
            <button className="w-full bg-[#6E8857] hover:bg-[#5B7043] text-white text-sm font-bold py-3.5 px-4 text-center transition-colors shadow-inner"
            onClick={() => window.location.href = '/book-a-demo'}
            >
              Book a Demo
            </button>
          </div>

        </div>

        {/* Bottom Horizontal Separation Accent */}
        <div className="border-t border-[#BACDB0]/40 pt-6 flex flex-col sm:flex-row justify-between items-center text-[11px] text-gray-500 font-medium">
          <p>© {new Date().getFullYear()} CIEOS Global Inc. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;