import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin, MessageSquare, ArrowUpRight } from 'lucide-react';
import { generateWhatsAppLink } from '../services/leadService';

export default function Footer({ onOpenQuoteModal }) {
  const whatsappUrl = generateWhatsAppLink({
    solucion: 'Cableado Estructurado Panduit',
  });

  return (
    <footer className="bg-[#080C14] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Certification (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white text-[#0B0F19] flex items-center justify-center font-black text-xl tracking-tighter shadow-md">
                IA
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight leading-none text-white block">
                  IAMET
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-0.5 block">
                  Integrador Certificado Panduit
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Especialistas en ingeniería, suministro, instalación y certificación de infraestructura de redes críticas, cableado estructurado Cat&nbsp;6A, fibra óptica y centros de datos con garantía directa de fábrica de 25 años.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-panduit-900/60 border border-panduit-500/30 text-panduit-300 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-panduit-400" />
              <span>Garantía Oficial Certification Plus™ 25 Años</span>
            </div>
          </div>

          {/* Col 2: Soluciones (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-300">
              Soluciones Panduit
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#soluciones" className="hover:text-panduit-300 transition-colors">Cableado Cobre TX6A™ Cat 6A</a></li>
              <li><a href="#soluciones" className="hover:text-panduit-300 transition-colors">Fibra Óptica PanMPO™ & HD Flex™</a></li>
              <li><a href="#soluciones" className="hover:text-panduit-300 transition-colors">Gabinetes Net-Access™ & Pasillos</a></li>
              <li><a href="#soluciones" className="hover:text-panduit-300 transition-colors">SmartZone™ PDU & Monitoreo</a></li>
              <li><a href="#soluciones" className="hover:text-panduit-300 transition-colors">Conectividad Industrial IP67</a></li>
              <li><a href="#garantia" className="hover:text-panduit-300 transition-colors">Certificación Fluke DSX-8000</a></li>
            </ul>
          </div>

          {/* Col 3: Contacto & Sucursales (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-300">
              Contacto & Proyectos
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-panduit-400 shrink-0 mt-0.5" />
                <span>Atención a proyectos en toda la República Mexicana (CDMX, Baja California, Nuevo León, Querétaro, Jalisco).</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-panduit-400 shrink-0" />
                <a href="tel:+525512345678" className="hover:text-white transition-colors">
                  +52 (55) 1234-5678 / +52 (664) 123-4567
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-panduit-400 shrink-0" />
                <a href="mailto:ventas@iamet.com.mx" className="hover:text-white transition-colors">
                  ventas@iamet.com.mx
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline font-semibold">
                  WhatsApp Directo Ventas & Soporte
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenQuoteModal({ context: 'Footer CTA' })}
                className="w-full flex items-center justify-between px-5 py-2.5 rounded-xl bg-white/10 hover:bg-panduit-600 text-white text-xs font-bold transition-colors"
              >
                <span>Solicitar Levantamiento en Sitio</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} IAMET Soluciones Tecnológicas. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[11px]">Panduit®, Net-Access™, PanMPO™, TX6A™ y SmartZone™ son marcas registradas de Panduit Corp.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
