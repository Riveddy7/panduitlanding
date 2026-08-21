import React from 'react';
import { TRUST_STATS } from '../data/panduitData';
import { ShieldCheck, CheckCircle2, Clock, Award } from 'lucide-react';

const icons = [Award, ShieldCheck, CheckCircle2, Clock];

export default function TrustBar() {
  return (
    <section className="py-8 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {TRUST_STATS.map((stat, idx) => {
            const Icon = icons[idx] || ShieldCheck;
            return (
              <div key={idx} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3.5 group">
                <div className="w-12 h-12 rounded-2xl bg-panduit-50 text-panduit-600 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-panduit-500 group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#0B0F19] tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    {stat.label}
                  </div>
                  <div className="text-xs text-slate-500">
                    {stat.subtext}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
