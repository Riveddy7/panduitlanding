import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

export default function Navbar({ onOpenQuoteModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-black/[0.04] py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Minimalist Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#0B0F19] text-white flex items-center justify-center font-black text-lg tracking-tight">
              IA
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-[#0B0F19]">
                IAMET
              </span>
              <span className="text-[11px] font-semibold text-panduit-700 bg-panduit-50 px-2 py-0.5 rounded-full border border-panduit-200/50 hidden sm:inline-block">
                Panduit Partner
              </span>
            </div>
          </a>

          {/* Clean Desktop Navigation (Only 3 Essential Links) */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600">
            <a href="#soluciones" className="hover:text-slate-900 transition-colors">Soluciones</a>
            <a href="#garantia" className="hover:text-slate-900 transition-colors">Garantía 25 Años</a>
            <a href="#cotizador" className="hover:text-slate-900 transition-colors">Cotizador Rápido</a>
          </nav>

          {/* Single Clean Primary Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onOpenQuoteModal({ context: 'Navbar CTA' })}
              className="group flex items-center gap-3 pl-5 pr-2 py-2 rounded-full bg-[#0B0F19] hover:bg-panduit-600 text-white text-xs font-bold transition-all shadow-sm"
            >
              <span>Cotizar Proyecto</span>
              <div className="w-6 h-6 rounded-full bg-white/20 group-hover:bg-white text-white group-hover:text-panduit-700 flex items-center justify-center transition-all">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => onOpenQuoteModal({ context: 'Mobile Header' })}
              className="px-3.5 py-1.5 rounded-full bg-[#0B0F19] text-white text-xs font-bold"
            >
              Cotizar
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-700"
              aria-label="Menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-slate-200 px-6 py-5 mt-2 space-y-4 shadow-lg">
          <div className="flex flex-col space-y-3 text-sm font-semibold text-slate-700">
            <a href="#soluciones" onClick={() => setMobileMenuOpen(false)}>Soluciones</a>
            <a href="#garantia" onClick={() => setMobileMenuOpen(false)}>Garantía 25 Años</a>
            <a href="#cotizador" onClick={() => setMobileMenuOpen(false)}>Cotizador Rápido</a>
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenQuoteModal({ context: 'Mobile Menu Drawer' });
            }}
            className="w-full py-2.5 rounded-xl bg-[#0B0F19] text-white text-xs font-bold flex items-center justify-center gap-2"
          >
            Solicitar Cotización Sin Costo
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
}
