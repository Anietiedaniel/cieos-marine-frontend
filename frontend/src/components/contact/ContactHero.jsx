import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import bgImage from "../../assets/images/image-hero.png";

const ContactHero = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center overflow-hidden py-16 lg:py-24"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Modern gradient overlay for improved typography contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-black/70 z-0" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Info */}
          <div className="lg:col-span-5 xl:col-span-5">
            <ContactInfo />
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-7 xl:col-span-7 w-full max-w-2xl mx-auto lg:ml-auto">
            <ContactForm />
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactHero;