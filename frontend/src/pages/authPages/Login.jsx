import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import managerBg from "../../assets/images/image-hero.png"; 
import adminBg from "../../assets/images/image-hero.png";   

const Login = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false); // Controls dynamic view state switcher
  const [formData, setFormData] = useState({
    email: "",
    companyId: "",
    password: "",
    rememberMe: false,
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
    console.log(`Logging in as ${isAdmin ? "Admin" : "Manager"}:`, formData);
    // Authentication handling logic here...
    navigate("/dashboard");
  };

  return (
    <main className="min-h-screen w-full flex bg-gray-100 font-sans transition-all duration-500">
      
      {/* LEFT COLUMN: Dynamic Background Narrative Image Frame */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center items-end p-12 transition-all duration-500"
        style={{ backgroundImage: `url(${isAdmin ? adminBg : managerBg})` }}
      >
        {/* Shadow Overlay Matrix */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-0" />
        
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

        {/* ROLE TOGGLE TRIGGER BOX BUTTONS */}
        <div className="relative z-10 w-full max-w-sm">
          {!isAdmin ? (
            <button
              type="button"
              onClick={() => setIsAdmin(true)}
              className="w-full text-left bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl hover:bg-white/20 transition-all group"
            >
              <p className="text-white font-bold text-lg tracking-wide flex items-center justify-between">
                SIGN IN as an Administrator
                <span className="text-sm font-normal opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">→</span>
              </p>
            </button>
          ) : (
            <div className="flex flex-col gap-4 items-start w-full">
              {/* Back Circle Button Arrow */}
              <button
                type="button"
                onClick={() => setIsAdmin(false)}
                className="p-3 bg-white text-gray-800 rounded-xl shadow-md hover:bg-gray-100 transition-all"
                aria-label="Back to Manager Login"
              >
                <svg className="w-5 h-5 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              <div className="w-full text-left bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                <p className="text-gray-900 font-bold text-lg tracking-wide">
                  SIGN IN as a Manager
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: White Interactive Entry Form Wrapper Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-20 bg-[#FAFBF9]">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl lg:shadow-none border border-gray-100 lg:border-none p-8 sm:p-12 space-y-8">
          
          {/* Header Title Information Row Group */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              {isAdmin ? "Welcome Aboard Admin!" : "Welcome Aboard!"}
            </h1>
            <p className="text-xs text-gray-500 font-medium tracking-wide">
              Sign in to access your fleet management dashboard.
            </p>
          </div>

          {/* Form Action Submitter Layer */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Field Block 1: Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-700 tracking-wide">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Input your company email"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none text-sm text-gray-800 placeholder-gray-400 focus:border-[#88A96B] focus:ring-1 focus:ring-[#88A96B] transition-all"
              />
            </div>

            {/* Conditional Field Block: Admin Company ID Code Input */}
            {isAdmin && (
              <div className="flex flex-col gap-1.5 transition-all duration-300">
                <label className="text-xs font-semibold text-gray-700 tracking-wide">Company ID</label>
                <input
                  type="text"
                  name="companyId"
                  required={isAdmin}
                  value={formData.companyId}
                  onChange={handleInputChange}
                  placeholder="Input Company ID"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none text-sm text-gray-800 placeholder-gray-400 focus:border-[#88A96B] focus:ring-1 focus:ring-[#88A96B] transition-all"
                />
              </div>
            )}

            {/* Field Block 2: Password Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-700 tracking-wide">Password</label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Input your password"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none text-sm text-gray-800 placeholder-gray-400 focus:border-[#88A96B] focus:ring-1 focus:ring-[#88A96B] transition-all"
              />
            </div>

            {/* Auxiliary Options Action Row Block */}
            <div className="flex items-center justify-between pt-1 text-xs">
              <label className="flex items-center gap-2 cursor-pointer select-none text-gray-600 font-medium">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded text-[#88A96B] focus:ring-[#88A96B] border-gray-300"
                />
                Remember Me
              </label>
              <Link 
                to="/forgot-password" 
                className="text-gray-500 font-semibold hover:text-gray-800 hover:underline transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submission Interactive Button Target */}
            <button
              type="submit"
              className="w-full bg-[#7fa361] hover:bg-[#6e9151] text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-emerald-950/10 tracking-wide mt-4"
            >
              Login
            </button>
          </form>

          {/* Bottom Context Router Switching Link Panel */}
          <div className="space-y-4 pt-2 text-center">
            <p className="text-xs text-gray-500 font-medium">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#88A96B] font-bold hover:underline">
                Create account
              </Link>
            </p>
            
            {/* Responsive alternative switcher fallback display layer on smaller screen frame viewports */}
            <button
              type="button"
              onClick={() => setIsAdmin(!isAdmin)}
              className="lg:hidden text-xs text-gray-600 font-bold uppercase tracking-wider underline block mx-auto pt-2"
            >
              Switch to {isAdmin ? "Manager Login" : "Admin Login"}
            </button>

            {/* Dynamic disclaimer footer */}
            <p className="text-[10px] text-gray-400 leading-relaxed max-w-xs mx-auto">
              By signing in and using our subscription services, you agree to CIEOS Global's{" "}
              <a href="#" className="underline font-medium hover:text-gray-600">Terms of Service</a> and{" "}
              <a href="#" className="underline font-medium hover:text-gray-600">Privacy Policy</a>.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
};

export default Login;