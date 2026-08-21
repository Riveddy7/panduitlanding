import React, { useState } from 'react';
import { MessageSquare, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { generateWhatsAppLink } from '../services/leadService';

export default function WhatsAppFloating() {
  const [isOpen, setIsOpen] = useState(false);

  const quickOptions = [
    { label: 'Cotizar Cableado Cat 6A', msg: 'Panduit Cat 6A 10G' },
    { label: 'Cotizar Fibra Óptica PanMPO', msg: 'Fibra PanMPO / HD Flex' },
    { label: 'Solicitar Visita Técnica Gratuita', msg: 'Levantamiento presencial en sitio' },
    { label: 'Preguntas sobre Garantía 25 Años', msg: 'Garantía Certification Plus de 25 años' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Expanded Quick Chat Window */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-white rounded-3xl p-5 shadow-2xl border border-slate-200/80 animate-fadeIn text-slate-800">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                  IA
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white"></span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Ingeniería & Ventas IAMET</h4>
                <p className="text-[10px] text-emerald-600 font-semibold">En línea • Respuesta en &lt;15 min</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-600 mb-3 leading-relaxed">
            Hola 👋 ¿Qué solución de infraestructura o cableado Panduit requieres para tu empresa?
          </p>

          {/* Quick Option Buttons */}
          <div className="space-y-1.5 mb-3">
            {quickOptions.map((opt, idx) => {
              const url = generateWhatsAppLink({ solucion: opt.msg });
              return (
                <a
                  key={idx}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-800 text-xs font-semibold text-slate-700 transition-all border border-slate-100 hover:border-emerald-200 group"
                >
                  <span>{opt.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </a>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-panduit-600" />
              Partner Oficial Panduit
            </span>
            <span>Atención México</span>
          </div>

        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-3 pl-4 pr-5 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:shadow-emerald-600/30 transition-all duration-300 transform hover:scale-105"
        title="Chat de WhatsApp con un especialista"
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
        </div>
        <div className="text-left">
          <span className="block text-[10px] uppercase font-bold text-emerald-100 tracking-wider">Asesoría Inmediata</span>
          <span className="block text-xs font-extrabold text-white">WhatsApp IAMET</span>
        </div>
      </button>

    </div>
  );
}
