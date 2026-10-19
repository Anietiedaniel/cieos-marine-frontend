const ContactInfo = () => {
  return (
    <div className="text-white space-y-8 lg:max-w-xl">
      {/* Badge with Green Dot indicator */}
      <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs font-semibold tracking-widest uppercase">
        <span className="h-2 w-2 rounded-full bg-[#88a96b] animate-pulse"></span>
        Lets Work Together
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight uppercase">
        Get in touch with CIEOS GLOBAL
      </h1>

      {/* Structured Info Rows matching the Image */}
      <div className="space-y-4 pt-4">
        
        {/* Phone Row */}
        <div className="flex items-center justify-between border-b border-white/30 pb-4">
          <span className="text-xs font-bold tracking-wider opacity-80 uppercase w-24">Phone</span>
          <a href="tel:+2348087971648" className="text-base font-medium tracking-wide hover:text-[#88a96b] transition-colors flex-1 text-left pl-4">
            +2348087971648
          </a>
        </div>

        {/* Address Row */}
        <div className="flex items-center justify-between border-b border-white/30 pb-4">
          <span className="text-xs font-bold tracking-wider opacity-80 uppercase w-24">Address</span>
          <span className="text-base font-medium tracking-wide flex-1 text-left pl-4">
            Iwofe Road, opposite Total child
          </span>
        </div>

        {/* Email Row */}
        <div className="flex items-center justify-between border-b border-white/30 pb-4">
          <span className="text-xs font-bold tracking-wider opacity-80 uppercase w-24">Email</span>
          <a href="mailto:Info@cieosglobal.com" className="text-base font-medium tracking-wide hover:text-[#88a96b] transition-colors flex-1 text-left pl-4">
            Info@cieosglobal.com
          </a>
        </div>

      </div>
    </div>
  );
};

export default ContactInfo;