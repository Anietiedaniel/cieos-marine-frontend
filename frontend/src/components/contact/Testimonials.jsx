import { useState, useEffect, useRef } from "react";
import testimonial1 from "../../assets/images/image-hero.png"; 
import testimonial2 from "../../assets/images/image-hero.png";
import testimonial3 from "../../assets/images/image-hero.png";
import testimonial4 from "../../assets/images/image-hero.png";

// Import your local video assets here
import video1 from "../../assets/videos/vid.mp4";
import video2 from "../../assets/videos/vid.mp4";
import video3 from "../../assets/videos/vid.mp4";
import video4 from "../../assets/videos/vid.mp4";

const testimonialsData = [
  { name: "Rhythm Bryce", role: "FACILITY MANAGER", image: testimonial1, video: video1 },
  { name: "Bryan Bryce", role: "FACILITY MANAGER", image: testimonial2, video: video2 },
  { name: "Rhythm Bryce", role: "FACILITY MANAGER", image: testimonial3, video: video3 },
  { name: "Rhythm Bryce", role: "FACILITY MANAGER", image: testimonial4, video: video4 },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(null); // Manages currently playing video asset
  const scrollContainerRef = useRef(null);

  // Auto Scroll logic
  useEffect(() => {
    if (currentVideo) return; // Pause auto-scrolling if user is watching a video

    const interval = setInterval(() => {
      handleNext();
    }, 4000); 

    return () => clearInterval(interval);
  }, [activeIndex, currentVideo]);

  const handleScrollTo = (index) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cards = container.children;
    
    if (cards[index]) {
      container.scrollTo({
        left: cards[index].offsetLeft - container.offsetLeft,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % testimonialsData.length;
    handleScrollTo(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (activeIndex - 1 + testimonialsData.length) % testimonialsData.length;
    handleScrollTo(prevIndex);
  };

  const handlePlayVideo = (videoAsset) => {
    if (videoAsset) {
      setCurrentVideo(videoAsset);
    }
  };

  const handleCloseVideo = () => {
    setCurrentVideo(null);
  };

  return (
    <section className="relative py-24 bg-[#FAFBF9] overflow-hidden">
      
      {/* Decorative Geometric Diamond Accents */}
      <div className="absolute right-0 top-1/4 w-96 h-96 opacity-10 pointer-events-none select-none hidden md:block">
        <div className="absolute transform rotate-45 border-4 border-[#88A96B] w-32 h-32 top-0 right-12"></div>
        <div className="absolute transform rotate-45 bg-[#88A96B] w-24 h-24 top-20 right-36"></div>
        <div className="absolute transform rotate-45 border-4 border-[#88A96B] w-40 h-40 top-36 right-0"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Top Header Group */}
        <div className="space-y-1">
          <span className="text-xs uppercase font-bold tracking-widest text-[#88A96B]">
            THE IMPACT
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3329] tracking-tight">
            Results and testimonials <span className="font-normal text-gray-700">from our clients</span>
          </h2>
        </div>

        {/* Scrollable Container Wrapper Grid */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-5 mt-12 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonialsData.map((item, index) => (
            <div
              key={index}
              className="relative min-w-[280px] sm:min-w-[320px] md:flex-1 snap-start overflow-hidden rounded-xl group bg-gray-100 cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Profile Image Asset */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-[440px] object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Tint overlay matching the design screenshot */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

              {/* Centered Play Interactive Button Trigger */}
              <button 
                onClick={() => handlePlayVideo(item.video)}
                className="absolute inset-0 flex items-center justify-center group/btn"
                aria-label={`Play testimonial video from ${item.name}`}
              >
                <div className="w-14 h-14 rounded-full bg-black/30 border-2 border-[#88A96B] flex items-center justify-center backdrop-blur-sm group-hover/btn:scale-110 group-hover/btn:bg-[#88A96B]/20 transition-all duration-300">
                  <svg className="w-5 h-5 text-[#88A96B] fill-current translate-x-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="absolute mt-20 text-[11px] font-semibold text-white tracking-widest uppercase opacity-80 group-hover/btn:opacity-100 transition-opacity">
                  Play
                </span>
              </button>

              {/* Text Meta Info Anchored to Card Footer */}
              <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
                <p className="text-[10px] uppercase tracking-widest font-bold text-gray-300 mb-1">
                  {item.role}
                </p>
                <h3 className="text-lg font-bold tracking-wide">
                  {item.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Navigation Controls Panel */}
        <div className="flex items-center justify-between mt-10">
          
          {/* Left Arrow Controls Layout */}
          <div className="flex items-center gap-3">
            <button 
              onClick={handlePrev}
              className="p-3 rounded-lg bg-[#e2e8dd] hover:bg-[#d4ded0] text-gray-700 transition-colors"
              aria-label="Previous testimonial"
            >
              <svg className="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button 
              onClick={handleNext}
              className="p-3 rounded-lg bg-[#e2e8dd] hover:bg-[#d4ded0] text-gray-700 transition-colors"
              aria-label="Next testimonial"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Right Pagination Indicators Match */}
          <div className="flex items-center gap-2">
            {testimonialsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleScrollTo(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? "w-6 bg-[#88A96B]" : "w-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal Player Portal */}
      {currentVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-md transition-opacity duration-300">
          {/* Close Area Trigger Button */}
          <button 
            onClick={handleCloseVideo}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 bg-white/10 rounded-full"
            aria-label="Close video player"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* HTML5 Video Element rendering local source asset path */}
          <div className="w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-2xl bg-black border border-white/10">
            <video 
              src={currentVideo} 
              autoPlay 
              controls 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;