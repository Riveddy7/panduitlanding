import React, { useState, useEffect } from 'react';
import { X, ArrowRight, CheckCircle2, ShieldCheck, MessageSquare, Clock } from 'lucide-react';
import { submitLead, generateWhatsAppLink } from '../services/leadService';
import confetti from 'canvas-confetti';

export default function LeadModal({ isOpen, onClose, modalData = {} }) {
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    correo: '',
    telefono: '',
    ciudad: '',
    tipoProyecto: modalData.solucion || 'Cableado de Cobre UTP 6 y 6A',
    nodosEstimados: '50 - 150 nodos',
    solicitaVisita: true,
    mensaje: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (modalData.solucion) {
      setFormData(prev => ({ ...prev, tipoProyecto: modalData.solucion }));
    }
  }, [modalData]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.nombre.trim() || !formData.correo.trim() || !formData.telefono.trim()) {
      setErrorMessage('Por favor completa todos los campos requeridos (*).');
      return;
    }

    setIsSubmitting(true);

    try {
      await submitLead({
        nombre: formData.nombre,
        empresa: formData.empresa,
        correo: formData.correo,
        telefono: formData.telefono,
        ciudad: formData.ciudad,
        tipoProyecto: formData.tipoProyecto,
        nodosEstimados: formData.nodosEstimados,
        solicitaVisita: formData.solicitaVisita,
        mensaje: formData.mensaje || `Solicitud iniciada desde: ${modalData.context || 'Modal General'}`,
        origenCampana: `Modal: ${modalData.context || 'General'}`,
      });

      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.5 }
        });
      } catch (err) {}

      setSubmitted(true);
    } catch (error) {
      setErrorMessage('Ocurrió un error. Por favor intenta por WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappUrl = generateWhatsAppLink({
    solucion: formData.tipoProyecto,
    empresa: formData.empresa,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#F4F4F6] rounded-[2.2rem] p-6 sm:p-8 shadow-2xl border border-black/10 text-slate-900 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white text-slate-500 hover:text-slate-900 flex items-center justify-center shadow-sm hover:scale-105 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-slate-900">¡Cotización Solicitada con Éxito!</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Hemos registrado tu proyecto. Uno de nuestros ingenieros certificados de IAMET te contactará en menos de 2 horas.
              </p>
            </div>
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Continuar por WhatsApp</span>
              </a>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold"
              >
                Cerrar
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-panduit-100 text-panduit-800 text-[10px] font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-3 h-3 text-panduit-600" />
                <span>Partner Certificado Panduit</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B0F19] tracking-tight">
                Solicitar Cotización y Levantamiento
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Visita técnica sin costo con memoria técnica y garantía de 25 años.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                {errorMessage}
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Ing. Laura Gómez"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-panduit-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Empresa *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Empresa / Razón Social"
                    value={formData.empresa}
                    onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-panduit-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. CDMX / Tijuana"
                    value={formData.ciudad}
                    onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-panduit-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Correo Corporativo *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="laura@empresa.com"
                    value={formData.correo}
                    onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-panduit-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="55 1234 5678"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-panduit-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Solución Solicitada
                  </label>
                  <select
                    value={formData.tipoProyecto}
                    onChange={(e) => setFormData({ ...formData, tipoProyecto: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-panduit-500"
                  >
                    <option value="Cableado de Cobre UTP 6 y 6A">Cableado de Cobre UTP 6 y 6A</option>
                    <option value="Fibra Óptica">Fibra Óptica</option>
                    <option value="Datacenter">Datacenter</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Nodos Estimados
                  </label>
                  <select
                    value={formData.nodosEstimados}
                    onChange={(e) => setFormData({ ...formData, nodosEstimados: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-panduit-500"
                  >
                    <option value="1 a 50 nodos">1 a 50 nodos</option>
                    <option value="50 a 150 nodos">50 a 150 nodos</option>
                    <option value="150 a 500 nodos">150 a 500 nodos</option>
                    <option value="500+ nodos">Más de 500 nodos</option>
                  </select>
                </div>
              </div>

              <label className="flex items-center gap-2 pt-1 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.solicitaVisita}
                  onChange={(e) => setFormData({ ...formData, solicitaVisita: e.target.checked })}
                  className="w-4 h-4 rounded text-panduit-600 focus:ring-panduit-500 border-slate-300"
                />
                <span className="text-xs text-slate-700 font-medium">
                  Solicito visita técnica en mis instalaciones para levantamiento sin costo.
                </span>
              </label>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-between px-6 py-3.5 rounded-full bg-[#0B0F19] hover:bg-panduit-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Registrando solicitud...' : 'Enviar y Recibir Cotización'}</span>
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 pt-1">
              <Clock className="w-3 h-3 text-panduit-600" />
              <span>Un especialista te contactará en menos de 2 horas hábiles.</span>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
