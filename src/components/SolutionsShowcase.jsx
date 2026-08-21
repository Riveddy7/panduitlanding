import React, { useState } from 'react';
import { PANDUIT_SOLUTIONS } from '../data/panduitData';
import { ArrowRight, ShieldCheck, X, Check, MessageSquare, Sparkles } from 'lucide-react';
import { generateWhatsAppLink } from '../services/leadService';

export default function SolutionsShowcase({ onOpenQuoteModal }) {
  const [selectedSolution, setSelectedSolution] = useState(null);

  const featuredSolution = PANDUIT_SOLUTIONS[0]; // Cobre Cat 6A
  const secondarySolutions = PANDUIT_SOLUTIONS.slice(1, 4); // Fibra, Gabinetes, SmartZone PDU

  const handleOpenDetail = (solution) => {
    setSelectedSolution(solution);
  };

  const handleCloseDetail = () => {
    setSelectedSolution(null);
  };

  const handleRequestQuote = (solution) => {
    setSelectedSolution(null);
    onOpenQuoteModal({
      context: `Detalle Solución: ${solution.title}`,
      solucion: solution.title,
    });
  };

  return (
    <section id="soluciones" className="py-20 md:py-28 bg-[#F8F9FA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Minimalist Header (Matching Reference Image) */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-slate-800 text-[11px] font-bold uppercase tracking-wider border border-black/[0.06] shadow-xs">
            <span>Soluciones Panduit</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B0F19] tracking-tight leading-[1.15]">
            Infraestructura crítica para operar a <span className="italic font-serif font-normal text-panduit-700">máxima velocidad</span>.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
            Sistemas de cableado y Data Centers diseñados para disponibilidad continua y respaldados por 25 años de garantía directa de fábrica.
          </p>
        </div>

        {/* 1. Featured Top Hero Card (Layout identical to the top card in reference image) */}
        <div
          onClick={() => handleOpenDetail(featuredSolution)}
          className="bg-white rounded-[2.2rem] p-4 sm:p-6 border border-black/[0.06] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
            
            {/* Left Image (Fills half width) */}
            <div className="md:col-span-6 relative aspect-[16/10] md:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900">
              <img
                src={featuredSolution.image}
                alt={featuredSolution.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-3 right-3 badge-floating text-[10px]">
                <ShieldCheck className="w-3.5 h-3.5 text-panduit-600" />
                <span>25 Años Cobertura</span>
              </div>
            </div>

            {/* Right Content */}
            <div className="md:col-span-6 flex flex-col justify-between py-2 space-y-4">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider">
                  <span>Cobre 10G & PoE++</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B0F19] tracking-tight leading-snug group-hover:text-panduit-700 transition-colors">
                  {featuredSolution.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {featuredSolution.description} Diseñado para eliminar la diafonía y asegurar transmisiones sin pérdida en oficinas corporativas y cuartos de telecomunicaciones.
                </p>
              </div>

              {/* Card Footer: Metadata + Action */}
              <div className="pt-4 border-t border-black/[0.05] flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-panduit-500"></span>
                  <span className="font-semibold text-slate-600">Certification Plus™ 25 Años</span>
                </div>
                <div className="flex items-center gap-1 font-serif italic text-slate-800 text-sm font-semibold group-hover:text-panduit-700 transition-colors">
                  <span>by IAMET</span>
                  <ArrowRight className="w-3.5 h-3.5 not-italic ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* 2. Bottom 3-Card Grid (Matching Reference Image) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {secondarySolutions.map((sol) => (
            <div
              key={sol.id}
              onClick={() => handleOpenDetail(sol)}
              className="bg-white rounded-[2rem] p-4 border border-black/[0.06] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Image Container with Tag in Top Right */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 mb-4">
                  <img
                    src={sol.image}
                    alt={sol.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold tracking-wide">
                    {sol.tabTitle}
                  </div>
                </div>

                {/* Text Content */}
                <div className="space-y-1.5 px-1">
                  <h4 className="text-base font-bold text-[#0B0F19] leading-snug group-hover:text-panduit-700 transition-colors">
                    {sol.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {sol.description}
                  </p>
                </div>
              </div>

              {/* Bottom Meta */}
              <div className="mt-4 pt-3 px-1 border-t border-black/[0.04] flex items-center justify-between text-[11px] text-slate-400">
                <span>{sol.badge}</span>
                <span className="text-panduit-700 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Ver detalle →
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* 3. Dedicated Minimalist Solution Detail Pop-up Modal */}
      {selectedSolution && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-2xl border border-black/10 text-slate-900 my-8">
            
            {/* Close Button */}
            <button
              onClick={handleCloseDetail}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 flex items-center justify-center transition-all z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Body */}
            <div className="space-y-6">
              
              {/* Header Image */}
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <img
                  src={selectedSolution.image}
                  alt={selectedSolution.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 badge-floating text-[11px]">
                  <ShieldCheck className="w-4 h-4 text-panduit-600" />
                  <span className="font-bold text-slate-900">Garantía Certification Plus™ 25 Años</span>
                </div>
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-bold">
                  {selectedSolution.badge}
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-panduit-700">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Solución Oficial Panduit</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B0F19] tracking-tight">
                  {selectedSolution.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {selectedSolution.description}
                </p>
              </div>

              {/* 3 Value Highlights inside Modal */}
              <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-black/[0.04] space-y-2.5">
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span><strong>Garantía de Fábrica de 25 Años:</strong> Cobertura directa de Panduit en materiales y rendimiento.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span><strong>Certificación Fluke Networks:</strong> Memoria técnica y reporte punto por punto con analizador DSX-8000.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span><strong>Levantamiento en Sitio Gratuito:</strong> Ingenieros certificados visitan tus instalaciones para cotizar.</span>
                </div>
              </div>

              {/* Action Buttons inside Pop-up Modal */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={() => handleRequestQuote(selectedSolution)}
                  className="w-full sm:flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-[#0B0F19] hover:bg-panduit-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                >
                  <span>Solicitar Levantamiento y Cotización</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={generateWhatsAppLink({ solucion: selectedSolution.title })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-4 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
