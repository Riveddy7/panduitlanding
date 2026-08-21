import React from 'react';
import { ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function WarrantySection({ onOpenQuoteModal }) {
  return (
    <section id="garantia" className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Image with Fluke Verification */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[2.2rem] overflow-hidden bg-slate-900 shadow-xl border border-black/[0.04]">
              <img
                src="/images/fluke-engineer.jpg"
                alt="Ingeniero Certificado IAMET con Fluke Networks"
                className="w-full aspect-[4/3] object-cover"
              />

              {/* Discreet Status Pill */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-black/5 shadow-md flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <strong className="text-slate-900">Fluke DSX-8000 PASS</strong>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  100% Certificado
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean 3-Point Guarantee */}
          <div className="lg:col-span-7 space-y-5">
            
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-panduit-700">
              <ShieldCheck className="w-4 h-4 text-panduit-600" />
              <span>Garantía Certification Plus™ de 25 Años</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B0F19] tracking-tight leading-tight">
              25 años de garantía de fábrica respaldada directamente por Panduit
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              Panduit emite una póliza de garantía global que protege tu infraestructura durante 25 años contra defectos de componentes y pérdidas de rendimiento, tramitada directamente por IAMET como Partner Certificado.
            </p>

            {/* 3 Simple Value Points */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F4F4F6] border border-black/[0.03]">
                <CheckCircle2 className="w-4 h-4 text-panduit-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">Cobertura Integral de Materiales y Mano de Obra</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Sustitución de componentes y servicio técnico certificado sin costo.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F4F4F6] border border-black/[0.03]">
                <CheckCircle2 className="w-4 h-4 text-panduit-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">Reporte de Enlace Punto por Punto</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Entrega de memoria técnica con pruebas de velocidad y diafonía Fluke Networks.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F4F4F6] border border-black/[0.03]">
                <CheckCircle2 className="w-4 h-4 text-panduit-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">Soporte para Tecnologías Futuras</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Garantiza el ancho de banda necesario para las próximas generaciones de red.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenQuoteModal({ context: 'Garantía Section CTA' })}
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#0B0F19] hover:bg-panduit-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
              >
                <span>Cotizar Proyecto Certificado</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
