import React from 'react';
import { COMPARISON_DATA } from '../data/panduitData';
import { Check, X, ShieldCheck } from 'lucide-react';

export default function ComparisonSection({ onOpenQuoteModal }) {
  return (
    <section className="py-16 md:py-24 bg-[#F8F9FA]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-panduit-700 block">
            / Comparativa Rápida
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B0F19] tracking-tight">
            Panduit + IAMET vs Instalaciones Genéricas
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            El 70% de las caídas de red provienen de una capa física deficiente. Compara los beneficios de un sistema certificado:
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-hidden rounded-3xl border border-black/[0.05] shadow-sm bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-black/[0.06] bg-slate-900 text-white">
                  <th className="p-4 md:p-5 text-xs font-extrabold uppercase tracking-wider w-1/3">
                    Aspecto
                  </th>
                  <th className="p-4 md:p-5 text-xs font-extrabold uppercase tracking-wider w-1/3 bg-panduit-900/90 text-panduit-300">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-panduit-400" />
                      <span>Panduit + IAMET</span>
                    </div>
                  </th>
                  <th className="p-4 md:p-5 text-xs font-extrabold uppercase tracking-wider w-1/3 text-slate-400">
                    Instalación Genérica
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04] text-xs sm:text-sm">
                {COMPARISON_DATA.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 md:p-5 font-bold text-slate-900">
                      {row.feature}
                    </td>
                    <td className="p-4 md:p-5 bg-panduit-50/40 font-medium text-slate-900">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{row.panduitIamet}</span>
                      </div>
                    </td>
                    <td className="p-4 md:p-5 text-slate-500 font-normal">
                      <div className="flex items-start gap-2">
                        <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span>{row.generic}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
