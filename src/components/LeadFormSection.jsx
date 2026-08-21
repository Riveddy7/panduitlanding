import React, { useState } from 'react';
import { submitLead, generateWhatsAppLink } from '../services/leadService';
import { ArrowRight, CheckCircle2, ShieldCheck, Phone, MessageSquare, Clock, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LeadFormSection() {
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    correo: '',
    telefono: '',
    ciudad: '',
    tipoProyecto: 'Cableado Estructurado Panduit Cat 6A',
    nodosEstimados: '50 - 150 nodos',
    solicitaVisita: true,
    mensaje: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
        mensaje: formData.mensaje,
        origenCampana: 'Formulario Principal de Landing Page',
      });

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {}

      setSubmitted(true);
    } catch (error) {
      setErrorMessage('Ocurrió un error al enviar el formulario. Por favor contáctanos por WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappUrl = generateWhatsAppLink({
    solucion: formData.tipoProyecto,
    nodos: formData.nodosEstimados,
    empresa: formData.empresa,
    nombre: formData.nombre,
  });

  return (
    <section id="contacto" className="py-20 md:py-28 bg-[#0B0F19] text-white relative overflow-hidden">
      {/* Decorative background lights */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-panduit-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Direct Contact & Guarantees (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-panduit-300 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Cotización Formal Inmediata</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Inicia tu proyecto de cableado certificado hoy mismo
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Completa el formulario y uno de nuestros ingenieros de infraestructura asignados te contactará en menos de <strong>2 horas hábiles</strong> para coordinar el levantamiento técnico o enviarte la memoria de cotización.
            </p>

            {/* Direct Contact Pillars */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-panduit-500/20 text-panduit-300 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Tiempo de Respuesta</h4>
                  <p className="text-sm font-semibold text-slate-300">Menos de 2 horas hábiles</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Atención Inmediata por WhatsApp</h4>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-emerald-400 hover:underline">
                    Chatear con un Asesor Técnico
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Línea Directa de Proyectos</h4>
                  <a href="tel:+525512345678" className="text-sm font-semibold text-sky-400 hover:underline">
                    +52 (55) 1234-5678
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-panduit-400" />
              <span>Garantía de 25 años directa de fábrica Panduit.</span>
            </div>
          </div>

          {/* Right Column: Lead Form Card (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-[#111827] rounded-[2.5rem] p-6 sm:p-10 border border-white/10 shadow-2xl">
              
              {submitted ? (
                <div className="py-12 text-center space-y-5">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-extrabold text-white">¡Gracias por contactar a IAMET!</h3>
                    <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      Hemos recibido los datos de tu proyecto. Un ingeniero especialista revisará tu requerimiento y se comunicará contigo a la brevedad.
                    </p>
                  </div>
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Abrir Chat WhatsApp Ahora</span>
                    </a>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all"
                    >
                      Enviar otra consulta
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                      Solicitud de Visita y Cotización
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Sin costo ni compromiso para empresas y corporativos.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-900/50 border border-red-500/50 text-red-200 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Nombre y Apellidos *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Ing. Roberto Sánchez"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-panduit-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Empresa / Razón Social *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Grupo Industrial Delta"
                        value={formData.empresa}
                        onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-panduit-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Correo Corporativo *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="roberto@empresa.com"
                        value={formData.correo}
                        onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-panduit-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="55 1234 5678"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-panduit-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Solución Principal
                      </label>
                      <select
                        value={formData.tipoProyecto}
                        onChange={(e) => setFormData({ ...formData, tipoProyecto: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#1f2937] border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-panduit-400"
                      >
                        <option value="Panduit TX6A Cat 6A 10G">Cableado de Cobre Cat 6A / TX6A™</option>
                        <option value="Fibra Óptica PanMPO / HD Flex">Fibra Óptica PanMPO™ & HD Flex™</option>
                        <option value="Gabinetes Net-Access & Racks">Gabinetes Net-Access™ y Pasillos</option>
                        <option value="SmartZone PDU & Monitoreo">SmartZone™ PDU & Monitoreo</option>
                        <option value="Redes Industriales IP67">Redes Industriales IP67</option>
                        <option value="Data Center Llave en Mano">Data Center Completo Llave en Mano</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Nodos / Puntos de Red
                      </label>
                      <select
                        value={formData.nodosEstimados}
                        onChange={(e) => setFormData({ ...formData, nodosEstimados: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#1f2937] border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-panduit-400"
                      >
                        <option value="1 a 50 nodos">1 a 50 nodos</option>
                        <option value="50 a 150 nodos">50 a 150 nodos</option>
                        <option value="150 a 500 nodos">150 a 500 nodos</option>
                        <option value="500+ nodos (Misión Crítica)">Más de 500 nodos</option>
                        <option value="Solo Racks / Gabinetes">Solo Gabinetes / PDU / Racks</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Detalles o requerimientos adicionales (Opcional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Indica si cuentas con planos, fecha límite de entrega, o ciudad de instalación..."
                      value={formData.mensaje}
                      onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-panduit-400 resize-none"
                    ></textarea>
                  </div>

                  {/* Request Visit Checkbox */}
                  <label className="flex items-start gap-2.5 pt-1 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.solicitaVisita}
                      onChange={(e) => setFormData({ ...formData, solicitaVisita: e.target.checked })}
                      className="w-4 h-4 rounded text-panduit-500 focus:ring-panduit-400 border-white/20 bg-white/5 mt-0.5"
                    />
                    <span className="text-xs text-slate-300">
                      Requiero visita técnica presencial en mi inmueble para levantamiento sin costo.
                    </span>
                  </label>

                  {/* Main Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-between px-8 py-4 rounded-full bg-panduit-500 hover:bg-panduit-400 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-panduit-500/30 disabled:opacity-50 mt-2"
                  >
                    <span>{isSubmitting ? 'Procesando y registrando lead...' : 'Solicitar Levantamiento y Cotización'}</span>
                    <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>

                  <div className="flex items-center justify-center gap-4 text-[10px] text-slate-400 pt-2">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-panduit-400" />
                      Privacidad 100% garantizada
                    </span>
                    <span>•</span>
                    <span>Sin compromiso de compra</span>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
