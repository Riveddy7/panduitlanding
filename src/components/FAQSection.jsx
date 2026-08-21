import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/panduitData';
import { Plus, Minus } from 'lucide-react';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggleFAQ = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-panduit-700 block">
            / Preguntas Frecuentes
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B0F19] tracking-tight">
            Respuestas a dudas comunes
          </h2>
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-[#F4F4F6] rounded-2xl border border-black/[0.03] overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-xs sm:text-sm hover:text-panduit-700 transition-colors"
                >
                  <span>{item.question}</span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${isOpen ? 'bg-[#0B0F19] text-white' : 'bg-white text-slate-600'}`}>
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-black/[0.03]">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
