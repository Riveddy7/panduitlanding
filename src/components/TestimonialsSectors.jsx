import React from 'react';
import { CLIENT_SECTORS } from '../data/panduitData';
import { Building2, ShieldCheck, CheckCircle2, Factory, Landmark, Stethoscope, Server } from 'lucide-react';

const sectorIcons = [Landmark, Factory, Stethoscope, Building2, Server];

export default function TestimonialsSectors() {
  const standards = [
    { code: 'ANSI/TIA-568.2-D', label: 'Estándar de Cableado de Cobre y Fibra' },
    { code: 'ANSI/TIA-942-B', label: 'Infraestructura de Centros de Datos' },
    { code: 'ISO/IEC 11801', label: 'Cableado Genérico para Clientes' },
    { code: 'BICSI TDMM', label: 'Metodología y Diseño de Telecomunicaciones' },
    { code: 'IEEE 802.3bt', label: 'Estándar PoE++ 4-Pares (hasta 100W)' },
    { code: 'UL 2416 / EIA-310-E', label: 'Estructura de Gabinetes y Racks' },
  ];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-panduit-700">
            <span>/ Sectores de Aplicación & Normativas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B0F19] tracking-tight">
            Infraestructura crítica implementada en industrias de alta exigencia
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Diseñamos bajo los más estrictos estándares internacionales para garantizar continuidad operativa y cumplimiento en auditorías de TI.
          </p>
        </div>

        {/* Sectors Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {CLIENT_SECTORS.map((sector, idx) => {
            const Icon = sectorIcons[idx] || Building2;
            return (
              <div
                key={idx}
                className="bg-[#F4F4F6] rounded-3xl p-5 border border-black/[0.04] flex flex-col justify-between hover:bg-white hover:shadow-card transition-all duration-300"
              >
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-white text-panduit-700 flex items-center justify-center mb-4 shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5 leading-snug">
                    {sector.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {sector.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-black/[0.04] flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Alta Disponibilidad</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Standards & Compliance Badges */}
        <div className="mt-16 pt-12 border-t border-slate-100">
          <div className="text-center mb-8">
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
              Cumplimiento Estricto de Normativas Internacionales
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {standards.map((std, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-[#F8F9FA] border border-slate-200/70 text-center hover:border-panduit-400 transition-colors"
              >
                <span className="block text-xs font-black text-slate-900 tracking-tight">
                  {std.code}
                </span>
                <span className="block text-[10px] text-slate-500 mt-1 leading-tight">
                  {std.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
