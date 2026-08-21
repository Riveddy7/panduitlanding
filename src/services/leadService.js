/**
 * Lead Management Service - IAMET / Panduit Campaign
 * Prepara los datos para envío a CRM por API (HubSpot, Salesforce, Zoho, Webhooks)
 * y simula el despacho de correo de confirmación interna y al prospecto.
 */

export const submitLead = async (lead) => {
  // Simular latencia de red de API
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const leadId = `LEAD-PANDUIT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const payload = {
    leadId,
    timestamp: new Date().toISOString(),
    campana: 'Google_Ads_Cableado_Panduit_2026',
    utm_source: 'google_ads',
    utm_medium: 'cpc',
    utm_campaign: 'cableado_estructurado_datacenter_panduit',
    contacto: {
      nombreCompleto: (lead.nombre || '').trim(),
      empresa: (lead.empresa || '').trim(),
      correoCorporativo: (lead.correo || '').trim().toLowerCase(),
      telefonoWhatsApp: (lead.telefono || '').trim(),
      ciudadUbicacion: lead.ciudad || 'No especificada',
      medioPreferido: lead.medioContactoPreferido || 'whatsapp',
    },
    proyecto: {
      tipoProyecto: lead.tipoProyecto || 'Cableado Estructurado General',
      nodosEstimados: lead.nodosEstimados || '1 a 50 nodos',
      categoriaInteres: lead.categoriaInteres || 'Panduit TX6A Cat 6A / Fibra Óptica',
      solicitaLevantamientoPresencial: Boolean(lead.solicitaVisita),
      notasAdicionales: lead.mensaje || 'Solicitud generada desde Landing Page Panduit + IAMET',
    },
    meta: {
      garantiaAplicable: 'Certification Plus™ 25 Años de Fábrica Panduit',
      integradorAsignado: 'IAMET Soluciones Tecnológicas',
      estadoCRM: 'PENDING_VALIDATION_WEBHOOK',
      prioridad: lead.solicitaVisita || (lead.nodosEstimados && lead.nodosEstimados.includes('500+')) ? 'ALTA' : 'MEDIA',
    }
  };

  // Guardar en historial local del navegador (fallback de seguridad)
  try {
    const existingLeads = JSON.parse(localStorage.getItem('iamet_panduit_leads') || '[]');
    existingLeads.unshift(payload);
    localStorage.setItem('iamet_panduit_leads', JSON.stringify(existingLeads.slice(0, 50)));
  } catch (e) {
    console.warn('No se pudo guardar en almacenamiento local:', e);
  }

  // Notificación en consola para trazabilidad técnica
  console.group(`🚀 [IAMET CRM Webhook Dispatch] - Lead ${leadId}`);
  console.log('Payload formateado listo para API CRM:', payload);
  console.log('Disparador de correo interno: ventas@iamet.com.mx (Asunto: Nueva Cotización Panduit)');
  console.groupEnd();

  // Disparar evento de conversión de Google Ads si gtag está disponible
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL',
      value: 1.0,
      currency: 'MXN',
      transaction_id: leadId,
    });
  }

  return {
    success: true,
    message: 'Tu solicitud ha sido recibida con éxito. Un ingeniero especialista de IAMET se comunicará contigo en menos de 2 horas para coordinar la visita y cotización.',
    leadId,
    payload,
  };
};

export const generateWhatsAppLink = (params = {}) => {
  const basePhone = '5215512345678'; // Teléfono placeholder oficial de IAMET
  let texto = 'Hola equipo de IAMET, vi su anuncio de soluciones Panduit y requiero cotizar un proyecto de cableado estructurado.';

  if (params.solucion) {
    texto = `Hola IAMET, me interesa cotizar la solución de *${params.solucion}* de Panduit para mi empresa.`;
  }
  if (params.nodos) {
    texto += ` Estimamos aproximadamente *${params.nodos}*.`;
  }
  if (params.empresa) {
    texto += ` Empresa: *${params.empresa}*.`;
  }
  texto += ' ¿Podrían agendar un levantamiento técnico o asesoría? Gracias.';

  return `https://wa.me/${basePhone}?text=${encodeURIComponent(texto)}`;
};
