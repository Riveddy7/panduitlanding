/**
 * Lead Management Service - IAMET / Panduit Campaign
 * Envía el lead de forma segura al endpoint Serverless /api/lead (que se conecta con el CRM IAMET)
 * y gestiona el fallback y tracking de conversiones de Google Ads.
 */

export const submitLead = async (lead) => {
  const leadId = `LEAD-PANDUIT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const payload = {
    leadId,
    timestamp: new Date().toISOString(),
    campana: 'Google_Ads_Cableado_Panduit_2026',
    nombre: (lead.nombre || '').trim(),
    empresa: (lead.empresa || '').trim(),
    correo: (lead.correo || '').trim().toLowerCase(),
    telefono: (lead.telefono || '').trim(),
    ciudad: lead.ciudad || 'No especificada',
    tipoProyecto: lead.tipoProyecto || 'Cableado de Cobre UTP 6 y 6A',
    nodosEstimados: lead.nodosEstimados || '50 - 150 nodos',
    solicitaVisita: Boolean(lead.solicitaVisita),
    mensaje: lead.mensaje || '',
  };

  // Guardar en historial local del navegador (fallback de seguridad)
  try {
    const existingLeads = JSON.parse(localStorage.getItem('iamet_panduit_leads') || '[]');
    existingLeads.unshift(payload);
    localStorage.setItem('iamet_panduit_leads', JSON.stringify(existingLeads.slice(0, 50)));
  } catch (e) {
    console.warn('No se pudo guardar en almacenamiento local:', e);
  }

  // Intentar envío directo a la Serverless Function /api/lead (integración con CRM)
  let crmSuccess = false;
  try {
    const response = await fetch('/api/lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const resData = await response.json();
      console.log('✅ Lead registrado en CRM IAMET:', resData);
      crmSuccess = true;
    } else {
      console.warn('⚠️ Endpoint /api/lead respondió con estado:', response.status);
    }
  } catch (err) {
    console.warn('ℹ️ Envío a /api/lead (modo local/preview sin serverless activo):', err.message);
  }

  // Disparar evento de conversión de Google Ads si gtag está configurado
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
    crmSuccess,
    payload,
  };
};

export const generateWhatsAppLink = (params = {}) => {
  const basePhone = '5215512345678'; // Teléfono oficial de contacto IAMET
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
