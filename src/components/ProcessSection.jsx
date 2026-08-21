import React from 'react';
import { PROCESS_STEPS } from '../data/panduitData';
import { ArrowRight, MapPin, DraftingCompass, Wrench, Award } from 'lucide-react';

const icons = [MapPin, DraftingCompass, Wrench, Award];

export default function ProcessSection({ onOpenQuoteModal }) {
  return (
    <section id="proceso" className="py-20 md:py-28 bg-[#F8F9FA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-panduit-700">
            <span>/ Metodología de Ejecución</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B0F19] tracking-tight">
            De la visita inicial a la certificación de 25 años en 4 pasos
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Garantizamos tiempos de entrega rigurosos, cero interrupciones en la operación diaria y documentación técnica exhaustiva para cada enlace.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = icons[idx] || Award;
            return (
              <div
                key={idx}
                className="bg-[#F4F4F6] rounded-[2rem] p-6 md:p-7 border border-black/[0.04] flex flex-col justify-between hover:shadow-card-hover transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-black text-slate-300 group-hover:text-panduit-500 transition-colors">
                      {step.step}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-white text-slate-800 group-hover:bg-panduit-500 group-hover:text-white flex items-center justify-center shadow-sm transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-black/[0.04]">
                  <span className="text-[11px] font-bold text-panduit-700 uppercase tracking-wider">
                    {idx === 0 ? 'Sin Costo / 24-48h' : idx === 3 ? 'Póliza Directa' : 'Normativa TIA/EIA'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner CTA */}
        <div className="mt-14 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-panduit-50 text-panduit-600 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">¿Listo para agendar el levantamiento en tu inmueble?</h4>
              <p className="text-xs text-slate-500">Un ingeniero visita tus instalaciones en menos de 48 horas sin compromiso.</p>
            </div>
          </div>
          <button
            onClick={() => onOpenQuoteModal({ context: 'Process Section Bottom CTA' })}
            className="shrink-0 px-6 py-3 rounded-full bg-[#0B0F19] hover:bg-panduit-600 text-white font-bold text-xs uppercase tracking-wider transition-all"
          >
            Agendar Visita Ahora
          </button>
        </div>

      </div>
    </section>
  );
}
