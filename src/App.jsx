import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import SolutionsShowcase from './components/SolutionsShowcase';
import WarrantySection from './components/WarrantySection';
import ComparisonSection from './components/ComparisonSection';
import ProjectEstimator from './components/ProjectEstimator';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import LeadModal from './components/LeadModal';
import WhatsAppFloating from './components/WhatsAppFloating';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const handleOpenQuoteModal = (data = {}) => {
    setModalData(data);
    setModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#0B0F19] flex flex-col font-sans selection:bg-panduit-500 selection:text-white">
      {/* 1. Header Navigation */}
      <Navbar onOpenQuoteModal={handleOpenQuoteModal} />

      {/* Main Content */}
      <main className="flex-grow">
        {/* 2. Hero Section (Clean Editorial) */}
        <Hero onOpenQuoteModal={handleOpenQuoteModal} />

        {/* 3. Key Metrics Trust Bar */}
        <TrustBar />

        {/* 4. Minimalist Solutions Showcase (Inspired by reference) */}
        <SolutionsShowcase onOpenQuoteModal={handleOpenQuoteModal} />

        {/* 5. 25-Year Guarantee & Fluke Certification */}
        <WarrantySection onOpenQuoteModal={handleOpenQuoteModal} />

        {/* 6. High-Impact Comparison */}
        <ComparisonSection onOpenQuoteModal={handleOpenQuoteModal} />

        {/* 7. Unified Interactive Estimator & Lead Capture Form */}
        <ProjectEstimator />

        {/* 8. Frequently Asked Questions */}
        <FAQSection />
      </main>

      {/* 9. Minimalist Footer */}
      <Footer onOpenQuoteModal={handleOpenQuoteModal} />

      {/* Interactive Global Modal */}
      <LeadModal
        isOpen={modalOpen}
        onClose={handleCloseQuoteModal}
        modalData={modalData}
      />

      {/* Floating WhatsApp Action */}
      <WhatsAppFloating />
    </div>
  );
}
