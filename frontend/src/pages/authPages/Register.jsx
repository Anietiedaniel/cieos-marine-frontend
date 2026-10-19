import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signupBg from "../../assets/images/image-hero.png"; 

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreeToTerms) {
      alert("You must agree to the platform legal guidelines.");
      return;
    }
    console.log("Registering User Account:", formData);
    navigate("/login");
  };
  

  return (
    <main className="min-h-screen w-full flex bg-gray-100 font-sans">
      
      {/* LEFT COLUMN: Visual Narrative Asset Cover Frame */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center items-end p-12"
        style={{ backgroundImage: `url(${signupBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 z-0" />
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
        
        <div className="relative z-10 text-white max-w-md space-y-2">
          <h2 className="text-2xl font-bold tracking-wide">Enterprise Fleet Scale Solutions</h2>
          <p className="text-xs opacity-80 leading-relaxed">
            Gain unified control metrics over modern vessel operations, preventative safety procedures, and structured compliance data management frameworks.
          </p>
        </div>
      </div>

      {/* RIGHT COLUMN: White Inputs Portal Component Wrapper Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-20 bg-[#FAFBF9]">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl lg:shadow-none p-8 sm:p-12 space-y-8">
          
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Create an Account</h1>
            <p className="text-xs text-gray-500 font-medium tracking-wide">Register your operations dashboard credentials.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-700 tracking-wide">Full Name</label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="e.g. Captain John Doe"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none text-sm focus:border-[#88A96B] focus:ring-1 focus:ring-[#88A96B] transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-700 tracking-wide">Company Operational Name</label>
              <input
                type="text"
                name="companyName"
                required
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="e.g. Maritime Logistics Ltd"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none text-sm focus:border-[#88A96B] focus:ring-1 focus:ring-[#88A96B] transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-700 tracking-wide">Company Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="me@companymail.com"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none text-sm focus:border-[#88A96B] focus:ring-1 focus:ring-[#88A96B] transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-700 tracking-wide">Account Security Password</label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create secure password"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none text-sm focus:border-[#88A96B] focus:ring-1 focus:ring-[#88A96B] transition-all"
              />
            </div>

            <div className="flex items-start gap-2 pt-1 text-xs">
              <input
                type="checkbox"
                name="agreeToTerms"
                id="agreeToTerms"
                required
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="w-4 h-4 rounded text-[#88A96B] focus:ring-[#88A96B] border-gray-300 mt-0.5"
              />
              <label htmlFor="agreeToTerms" className="text-gray-600 leading-relaxed font-medium">
                I hereby declare all info authentic and accept the operational platform management service terms conditions.
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#7fa361] hover:bg-[#6e9151] text-white font-bold py-3.5 rounded-xl transition-all shadow-md mt-4 tracking-wide"
            >
              Sign Up
            </button>
          </form>

          <p className="text-xs text-center text-gray-500 font-medium">
            Already registered?{" "}
            <Link to="/login" className="text-[#88A96B] font-bold hover:underline">
              Sign in instead
            </Link>
          </p>

        </div>
      </div>
    </main>
  );
};

export default Signup;