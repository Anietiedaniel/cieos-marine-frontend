import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/images/image-hero-demo.png";

const DemoSuccess = () => {
  const navigate = useNavigate();
  return (
    <section 
      className="relative min-h-screen flex flex-col justify-center items-center bg-cover bg-center px-6 text-center text-white"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-emerald-950/40 to-black/90" />
      
      <div className="relative z-10 max-w-2xl mx-auto space-y-6">
        <p className="text-xl font-semibold opacity-90">Thank you for requesting a demo</p>
        <h1 className="text-4xl lg:text-6xl font-black tracking-tight leading-tight uppercase">
          you'd be contacted by us soon as possible
        </h1>
        <div className="pt-4 flex justify-center">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-3 bg-white text-gray-900 hover:bg-gray-100 px-8 py-3.5 rounded-lg text-sm font-bold transition-all shadow-xl"
          >
            <svg className="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
            Back to page
          </button>
        </div>
      </div>
    </section>
  );
};

export default DemoSuccess;