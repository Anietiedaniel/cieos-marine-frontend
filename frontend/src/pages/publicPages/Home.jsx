import React from 'react';
import Navbar from '../../components/landing/Navbar';
import Hero from '../../components/landing/Hero';
import TrustBanner from '../../components/landing/TrustBanner';
import Features from '../../components/landing/Features';
import CommandCenter from '../../components/landing/CommandCenter';
import MaritimeEfficiency from '../../components/landing/MaritimeEfficiency';
import Challenge from '../../components/landing/Challenge';
import SecurityAndCta from '../../components/landing/SecurityAndCta';
import Footer from '../../components/landing/Footer';
import BackToTop from '../../components/landing/BackToTop';
// import SocialProof from '../../components/landing/SocialProof';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <TrustBanner />
        <Features />
        <CommandCenter />
        <MaritimeEfficiency /> 
        
        <Challenge />

          {/* Inserted Trust and Call-To-Action Sections */}
        <SecurityAndCta />
        {/* <SocialProof /> */}
        {/* Footer rendered perfectly at the bottom */}
      <Footer />
      {/* Floating Back to Top Button */}
      <BackToTop />
      </main>
    </div>
  );
};

export default Home;