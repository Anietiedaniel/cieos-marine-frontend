import Navbar from "../../components/landing/Navbar";
import Footer from "../../components/landing/Footer";

import ContactHero from "../../components/contact/ContactHero";
import Testimonials from "../../components/contact/Testimonials";
import ContactCTA from "../../components/contact/ContactCTA";

const Contact = () => {
  return (
    <>
      <Navbar />

      <ContactHero />

      <Testimonials />

       <ContactCTA />

      <Footer />
    </>
  );
};

export default Contact;