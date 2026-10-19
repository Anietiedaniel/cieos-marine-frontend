import bgImage from "../../assets/images/image-hero-demo.png";

const DemoHero2 = ({ formData, setFormData, onNext }) => {
  const dates = ["35 June", "35 June", "35 June", "35 June", "35 June", "35 June", "35 June"];
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const timeSlots = Array(12).fill("8:00 am");

  const handleSubmit = () => {
    if (!formData.selectedTime) {
      alert("Please choose an optimized calendar time-slot.");
      return;
    }
    onNext();
  };

  return (
    <section 
      className="relative min-h-[90vh] flex flex-col justify-center items-center bg-cover bg-center pt-28 pb-12 px-6"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-emerald-950/40 to-black/80 z-0" />

      <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 text-white space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            Schedule Your Personalized Demo
          </h1>
          <p className="text-[#88A96B] font-semibold text-lg tracking-wide">
            Every Great Fleet Starts With Better Visibility
          </p>
          <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
            Choose a convenient date and time, and we'll reserve a session with one of our product specialists.
          </p>
        </div>

        {/* Time and Date Matrix Grid Frame picker */}
        <div className="lg:col-span-7 w-full max-w-xl mx-auto lg:ml-auto">
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 text-white space-y-6">
            <div>
              <h3 className="text-xl font-semibold">Schedule your time</h3>
              <p className="text-xs text-gray-300 mt-1">What day is best for you?</p>
            </div>

            {/* Calendar dates slider simulation */}
            <div className="flex gap-2 justify-between items-center overflow-x-auto pb-1">
              {dates.map((date, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setFormData(p => ({ ...prev, selectedDate: `${idx + 1} June` }))}
                  className={`flex flex-col items-center p-2 rounded-lg min-w-[52px] ${idx === 0 ? "bg-white text-gray-800 font-bold" : "bg-white/10 text-white"}`}
                >
                  <span className="text-[10px] opacity-70">{days[idx]}</span>
                  <span className="text-sm font-bold block">{date.split(" ")[0]}</span>
                  <span className="text-[9px] block">{date.split(" ")[1]}</span>
                </button>
              ))}
            </div>

            {/* Grid display timeslots */}
            <div className="space-y-2">
              <p className="text-xs text-gray-300">What time works best for you?</p>
              <div className="grid grid-cols-4 gap-2 max-h-[160px] overflow-y-auto pr-1">
                {timeSlots.map((time, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFormData(p => ({ ...p, selectedTime: `${time}-${idx}` }))}
                    className={`p-2.5 text-xs rounded-lg text-center font-medium ${formData.selectedTime === `${time}-${idx}` ? "bg-[#7fa361] text-white" : "bg-[#e2e8dd] text-gray-800 hover:bg-[#d5ded0]"}`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <button type="button" onClick={handleSubmit} className="w-full bg-[#7fa361] text-white font-semibold py-3 rounded-lg transition-all">Confirm</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoHero2;