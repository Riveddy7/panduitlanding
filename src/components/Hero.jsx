import React from 'react';
import { ArrowRight, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { generateWhatsAppLink } from '../services/leadService';

export default function Hero({ onOpenQuoteModal }) {
  const whatsappUrl = generateWhatsAppLink({
    solucion: 'Cableado Estructurado y Data Centers Panduit',
  });

  return (
    <section className="relative pt-28 pb-14 md:pt-36 md:pb-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Clear & Direct Messaging */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Minimal Sub-tag */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600">
              <span className="w-2 h-2 rounded-full bg-panduit-500"></span>
              <span>/ Integrador Certificado Panduit en México</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0B0F19] leading-[1.12]">
              Cableado estructurado y Data Centers con{' '}
              <span className="text-panduit-600">
                garantía de 25 años
              </span>
            </h1>

            {/* Clean Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
              / Proyectos de infraestructura de red llave en mano con Cobre Cat&nbsp;6A, Fibra Óptica PanMPO™ y Gabinetes Net-Access™. Levantamiento técnico en sitio sin costo.
            </p>

            {/* CTAs: 1 Primary Pill Button + Secondary WhatsApp Link */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={() => onOpenQuoteModal({ context: 'Hero CTA' })}
                className="group flex items-center justify-between sm:justify-center gap-4 px-7 py-4 rounded-full bg-[#0B0F19] hover:bg-panduit-600 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md"
              >
                <span>Solicitar Levantamiento Sin Costo</span>
                <div className="w-6 h-6 rounded-full bg-white/20 group-hover:bg-white text-white group-hover:text-panduit-700 flex items-center justify-center transition-all">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-4 rounded-full text-slate-700 hover:text-emerald-700 font-semibold text-xs transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Atención por WhatsApp</span>
              </a>
            </div>

            {/* 2 Simple Trust Points */}
            <div className="flex items-center gap-6 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-panduit-600" />
                Respuesta en &lt; 2 horas
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-panduit-600" />
                Certificación Fluke DSX-8000
              </span>
            </div>

          </div>

          {/* Right Column: Clean Editorial Visual (Pure Minimalist Style) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-[2.5rem] bg-[#F4F4F6] p-3.5 sm:p-4 shadow-xl border border-black/[0.04] group">
              
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-900">
                <img
                  src="/images/hero-datacenter.jpg"
                  alt="Centro de Datos y Cableado Panduit"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Single Discreet Floating Badge */}
                <div className="absolute top-3.5 right-3.5 badge-floating">
                  <ShieldCheck className="w-3.5 h-3.5 text-panduit-600" />
                  <span className="text-[11px] font-bold text-slate-800">25 Años de Cobertura</span>
                </div>

                {/* Minimalist Bottom Bar on Image (Inspired by reference) */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between">
                  <button
                    onClick={() => onOpenQuoteModal({ context: 'Hero Visual Overlay' })}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0B0F19]/80 hover:bg-[#0B0F19] backdrop-blur-md text-white text-xs font-semibold transition-all"
                  >
                    <span>Cotizar proyecto</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  <div className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-slate-800 text-[11px] font-bold shadow-sm">
                    Net-Access™ & Cat 6A
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
