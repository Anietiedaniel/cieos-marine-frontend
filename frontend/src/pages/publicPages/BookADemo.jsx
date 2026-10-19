import { useState } from "react";
import Navbar from "../../components/landing/Navbar"; 
import Footer from "../../components/landing/Footer"; 
import DemoHero1 from "../../components/demo/DemoHero1";
import DemoHero2 from "../../components/demo/DemoHero2";
import DemoSuccess from "../../components/demo/DemoSuccess";
import DemoStats from "../../components/demo/DemoStats";

const BookADemo = () => {
  const [step, setStep] = useState(1);
  
  // Single source of truth for the multi-step form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    companyEmail: "",
    phoneNumber: "",
    selectedDate: "35 June",
    selectedTime: "",
  });

  return (
    <>
      {/* Top Global Navigation Bar */}
      <Navbar />

      {/* Step 1: Initial Info Gathering Header & Form */}
      {step === 1 && (
        <DemoHero1 
          formData={formData} 
          setFormData={setFormData} 
          onNext={() => setStep(2)} 
        />
      )}

      {/* Step 2: Date & Time Scheduler Header & Grid Matrix */}
      {step === 2 && (
        <DemoHero2 
          formData={formData} 
          setFormData={setFormData} 
          onNext={() => setStep(3)} 
        />
      )}

      {/* Step 3: Success Acknowledgement Screen */}
      {step === 3 && <DemoSuccess />}

      {/* Shared Bottom Section: Metric Stats Display Row (Shows on Steps 1 & 2) */}
      {step < 3 && <DemoStats />}

      {/* Bottom Global Footer Links */}
      <Footer />
    </>
  );
};

export default BookADemo;