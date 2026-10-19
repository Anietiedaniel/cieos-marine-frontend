const DemoStats = () => {
  const stats = [
    { value: "6.5M +", label: "We are a leading fleet management solution helping." },
    { value: "190K +", label: "We are a leading fleet management solution helping." },
    { value: "90K +", label: "We are a leading fleet management solution helping." }
  ];

  return (
    <section className="bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-[#edf2e8] via-[#f5f8f3] to-white border border-gray-100 rounded-2xl p-8 shadow-xl flex flex-col md:flex-row items-stretch justify-between gap-8">
          
          {/* Main platform status badge card */}
          <div className="bg-[#7fa361] p-6 rounded-xl text-white md:max-w-xs flex flex-col justify-center">
            <h3 className="text-3xl font-extrabold mb-1">NO 1</h3>
            <p className="text-sm font-bold opacity-90 uppercase tracking-wide">CMMS Platform for Vessel management</p>
            <p className="text-xs opacity-75 mt-3 leading-relaxed">
              We are a leading fleet management solution helping maritime organizations manage vessels, optimize operations, and drive growth.
            </p>
          </div>

          {/* Metric list blocks */}
          <div className="flex-1 grid sm:grid-cols-3 gap-6 items-center px-4">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-1.5 border-l-2 border-gray-100 pl-4 sm:pl-6 first:border-none">
                <h4 className="text-3xl lg:text-4xl font-black text-gray-800 tracking-tight">{stat.value}</h4>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">{stat.label}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default DemoStats;