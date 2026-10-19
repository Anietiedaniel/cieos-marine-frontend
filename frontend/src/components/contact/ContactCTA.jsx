import { Link } from "react-router-dom";

const ContactCTA = () => {
  return (
    <section className="py-24 bg-[#88A96B]">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <span className="uppercase tracking-widest text-white/80 text-sm">
          Ready To Get Started?
        </span>

        <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white">
          Transform Maritime Operations
        </h2>

        <p className="mt-6 text-white/90 max-w-2xl mx-auto">
          Join organizations using CIEOS CMMS to improve visibility,
          reduce downtime, and streamline maintenance workflows.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">

          <Link
            to="/book-a-demo"
            className="px-8 py-4 rounded-xl bg-white text-[#88A96B] font-semibold"
          >
            Book a Demo
          </Link>

          <Link
            to="/contact"
            className="px-8 py-4 rounded-xl border border-white text-white font-semibold"
          >
            Contact Sales
          </Link>

        </div>

      </div>
    </section>
  );
};

export default ContactCTA;