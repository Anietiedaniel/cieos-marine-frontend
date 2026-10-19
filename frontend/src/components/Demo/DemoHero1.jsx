import bgImage from "../../assets/images/image-hero-demo.png";

const DemoHero1 = ({ formData, setFormData, onNext }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <section 
      className="relative min-h-[90vh] flex flex-col justify-center items-center bg-cover bg-center pt-28 pb-12 px-6"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-emerald-950/40 to-black/80 z-0" />

      <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Bullet points */}
        <div className="lg:col-span-6 text-white space-y-6">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            Let's Build a Smarter Fleet Together
          </h1>
          <p className="text-[#88A96B] font-semibold text-lg tracking-wide">
            Every Great Fleet Starts With Better Visibility
          </p>
          <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
            We're excited to learn about your operations and understand your goals. During your personalized demo, we'll show you how CIEOS Global helps maritime organizations streamline maintenance.
          </p>
          
          <div className="space-y-4 pt-2">
            <h3 className="text-lg font-bold uppercase tracking-wider">What You Can Expect</h3>
            <ul className="space-y-3 text-sm text-gray-200">
              {["A one-on-one walkthrough with a product specialist", "A demo tailored to your fleet and operational processes", "Practical solutions for maintenance, inspections, and reporting"].map((bullet, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#88A96B] shrink-0" />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Input Glassmorphism form */}
        <div className="lg:col-span-6 w-full max-w-xl mx-auto lg:ml-auto">
          <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl text-white space-y-4">
            <div>
              <span className="text-xs font-semibold tracking-wider opacity-80">Let's Start the Conversation</span>
              <h2 className="text-3xl font-bold">Book a Demo</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium opacity-90">First Name</label>
                <input type="text" name="firstName" required value={formData.firstName} onChange={handleInputChange} placeholder="John" className="bg-[#e2e8dd] text-gray-800 placeholder-gray-400 text-sm p-3 rounded-lg outline-none w-full" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium opacity-90">Last Name</label>
                <input type="text" name="lastName" required value={formData.lastName} onChange={handleInputChange} placeholder="Doe" className="bg-[#e2e8dd] text-gray-800 placeholder-gray-400 text-sm p-3 rounded-lg outline-none w-full" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium opacity-90">Company Name</label>
              <input type="text" name="companyName" required value={formData.companyName} onChange={handleInputChange} placeholder="Company Name" className="bg-[#e2e8dd] text-gray-800 placeholder-gray-400 text-sm p-3 rounded-lg outline-none w-full" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium opacity-90">Company Email</label>
              <input type="email" name="companyEmail" required value={formData.companyEmail} onChange={handleInputChange} placeholder="me@Companymail.com" className="bg-[#e2e8dd] text-gray-800 placeholder-gray-400 text-sm p-3 rounded-lg outline-none w-full" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium opacity-90">Phone Number</label>
              <input type="tel" name="phoneNumber" required value={formData.phoneNumber} onChange={handleInputChange} placeholder="+234 80989 7973" className="bg-[#e2e8dd] text-gray-800 placeholder-gray-400 text-sm p-3 rounded-lg outline-none w-full" />
            </div>

            <button type="submit" className="w-full bg-[#7fa361] hover:bg-[#6e9151] text-white font-semibold py-3 rounded-lg transition-all mt-2">Confirm</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DemoHero1;