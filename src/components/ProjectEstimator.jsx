import React, { useState } from 'react';
import { Building2, Server, Factory, RefreshCw, CheckCircle2, ArrowRight, MessageSquare } from 'lucide-react';
import { submitLead, generateWhatsAppLink } from '../services/leadService';
import confetti from 'canvas-confetti';

export default function ProjectEstimator() {
  const [inmueble, setInmueble] = useState('oficinas');
  const [nodos, setNodos] = useState('50-150');
  const [categoria, setCategoria] = useState('cobre-6-6a');
  
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    correo: '',
    telefono: '',
    ciudad: '',
    solicitaVisita: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const inmueblesOptions = [
    { id: 'oficinas', label: 'Oficinas', icon: Building2 },
    { id: 'datacenter', label: 'Data Center', icon: Server },
    { id: 'industrial', label: 'Nave / Planta', icon: Factory },
    { id: 'renovacion', label: 'Migración', icon: RefreshCw },
  ];

  const nodosOptions = [
    { id: '1-50', label: '1 - 50 nodos' },
    { id: '50-150', label: '50 - 150 nodos' },
    { id: '150-500', label: '150 - 500 nodos' },
    { id: '500+', label: '500+ nodos' },
  ];

  const categoriaOptions = [
    { id: 'cobre-6-6a', label: 'Cableado de Cobre UTP 6 y 6A' },
    { id: 'fibra-optica', label: 'Fibra Óptica' },
    { id: 'datacenter', label: 'Datacenter' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.nombre.trim() || !formData.correo.trim() || !formData.telefono.trim()) {
      setErrorMessage('Por favor completa tu nombre, correo y teléfono.');
      return;
    }

    setIsSubmitting(true);

    try {
      const inmuebleObj = inmueblesOptions.find(i => i.id === inmueble);
      const catObj = categoriaOptions.find(c => c.id === categoria);

      await submitLead({
        nombre: formData.nombre,
        empresa: formData.empresa,
        correo: formData.correo,
        telefono: formData.telefono,
        ciudad: formData.ciudad,
        tipoProyecto: `${inmuebleObj?.label || inmueble} - ${catObj?.label || categoria}`,
        nodosEstimados: nodos,
        categoriaInteres: catObj?.label || categoria,
        solicitaVisita: formData.solicitaVisita,
        origenCampana: 'Configurador de Proyecto',
      });

      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch (err) {}

      setSubmitted(true);
    } catch (error) {
      setErrorMessage('Ocurrió un error. Por favor contáctanos por WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappLink = generateWhatsAppLink({
    solucion: `${inmueblesOptions.find(i => i.id === inmueble)?.label} (${categoriaOptions.find(c => c.id === categoria)?.label})`,
    nodos: nodos,
    empresa: formData.empresa || '',
  });

  return (
    <section id="cotizador" className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-panduit-50 text-panduit-800 text-[11px] font-bold uppercase tracking-wider border border-panduit-200/40">
            <span>Cotizador Rápido</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B0F19] tracking-tight">
            Configura y cotiza tu proyecto en 3 clics
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Recibe una propuesta económica formal con levantamiento técnico presencial sin costo.
          </p>
        </div>

        {/* 2-Column Clean Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 3 Quick Selectors (6 cols) */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* Step 1: Inmueble */}
            <div className="bg-[#F4F4F6] rounded-3xl p-5 border border-black/[0.03] space-y-3">
              <span className="text-xs font-bold text-slate-800">1. Tipo de Instalación</span>
              <div className="grid grid-cols-2 gap-2">
                {inmueblesOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = inmueble === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setInmueble(opt.id)}
                      className={`p-3 rounded-2xl text-left transition-all flex items-center gap-2.5 border ${
                        isSelected
                          ? 'bg-[#0B0F19] text-white border-black shadow-sm'
                          : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-panduit-400' : 'text-panduit-600'}`} />
                      <span className="text-xs font-bold">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Nodos */}
            <div className="bg-[#F4F4F6] rounded-3xl p-5 border border-black/[0.03] space-y-3">
              <span className="text-xs font-bold text-slate-800">2. Puntos de Red (Nodos)</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {nodosOptions.map((opt) => {
                  const isSelected = nodos === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setNodos(opt.id)}
                      className={`p-2.5 rounded-2xl text-center text-xs font-bold transition-all border ${
                        isSelected
                          ? 'bg-[#0B0F19] text-white border-black shadow-sm'
                          : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Categoría */}
            <div className="bg-[#F4F4F6] rounded-3xl p-5 border border-black/[0.03] space-y-3">
              <span className="text-xs font-bold text-slate-800">3. Solución Requerida</span>
              <div className="space-y-2">
                {categoriaOptions.map((cat) => {
                  const isSelected = categoria === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategoria(cat.id)}
                      className={`w-full p-3.5 rounded-2xl text-left text-xs font-bold transition-all border flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#0B0F19] text-white border-black shadow-sm'
                          : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span>{cat.label}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-panduit-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Fast Contact Form (6 cols) */}
          <div className="lg:col-span-6 bg-[#F4F4F6] rounded-3xl p-6 border border-black/[0.04] shadow-sm">
            
            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-slate-900">¡Solicitud Enviada con Éxito!</h4>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto">
                    Un ingeniero de IAMET revisará tu requerimiento y te contactará en menos de 2 horas.
                  </p>
                </div>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Acelerar por WhatsApp</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">Datos para la Cotización</h4>
                  <p className="text-[11px] text-slate-500">Garantía de 25 años y levantamiento sin costo incluidos.</p>
                </div>

                {errorMessage && (
                  <div className="p-2.5 rounded-xl bg-red-50 text-red-700 text-xs font-medium">
                    {errorMessage}
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Ing. Roberto Sánchez"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-panduit-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Empresa *</label>
                    <input
                      type="text"
                      required
                      placeholder="Empresa"
                      value={formData.empresa}
                      onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-panduit-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Ciudad</label>
                    <input
                      type="text"
                      placeholder="Ej. CDMX / Tijuana"
                      value={formData.ciudad}
                      onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-panduit-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Correo Corporativo *</label>
                    <input
                      type="email"
                      required
                      placeholder="roberto@empresa.com"
                      value={formData.correo}
                      onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-panduit-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Teléfono / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="55 1234 5678"
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-panduit-500"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 pt-1 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.solicitaVisita}
                    onChange={(e) => setFormData({ ...formData, solicitaVisita: e.target.checked })}
                    className="w-4 h-4 rounded text-panduit-600 focus:ring-panduit-500 border-slate-300"
                  />
                  <span className="text-xs text-slate-700">Deseo agendar levantamiento técnico sin costo.</span>
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-between px-6 py-3.5 rounded-full bg-[#0B0F19] hover:bg-panduit-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md disabled:opacity-50 mt-2"
                >
                  <span>{isSubmitting ? 'Enviando...' : 'Solicitar Cotización y Visita'}</span>
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
