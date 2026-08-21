/**
 * Vercel Serverless Function: /api/lead
 * Endpoint seguro para procesar leads de la landing page y registrarlos
 * directamente en el CRM IAMET (https://crm.iamet.mx) como Prospecto en la etapa "Identificado".
 */

export default async function handler(req, res) {
  // Solo permitir solicitudes POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método no permitido. Utilizar POST.' });
  }

  const {
    nombre,
    empresa,
    correo,
    telefono,
    ciudad,
    tipoProyecto,
    nodosEstimados,
    solicitaVisita,
    mensaje,
  } = req.body || {};

  if (!nombre || !correo || !telefono) {
    return res.status(400).json({
      success: false,
      message: 'Faltan campos obligatorios: nombre, correo o teléfono.'
    });
  }

  const baseUrl = (process.env.CRM_BASE_URL || 'https://crm.iamet.mx').replace(/\/$/, '');
  const username = process.env.CRM_USERNAME || 'eduardo.rivera@baja-net.com';
  const password = process.env.CRM_PASSWORD || 'fufmib-buNcyq-4fynko';
  const assignedUserId = parseInt(process.env.CRM_ASSIGNED_USER_ID || '26', 10); // Eduardo Rivera (ID 26)

  try {
    // 1. Obtener CSRF Token inicial de la página de login
    const loginPageRes = await fetch(`${baseUrl}/app/login/`, {
      method: 'GET',
      redirect: 'manual',
      headers: {
        'User-Agent': 'IAMET-Landing-Lead-Collector/1.0',
      }
    });

    const loginHtml = await loginPageRes.text();
    const csrfFormMatch = loginHtml.match(/name="csrfmiddlewaretoken" value="([^"]+)"/);
    const csrfForm = csrfFormMatch ? csrfFormMatch[1] : null;

    const rawSetCookie = loginPageRes.headers.get('set-cookie') || '';
    const csrfCookieMatch = rawSetCookie.match(/csrftoken=([^;]+)/);
    const csrfCookie = csrfCookieMatch ? csrfCookieMatch[1] : null;

    if (!csrfForm || !csrfCookie) {
      throw new Error('No se pudo obtener el token de seguridad CSRF del CRM');
    }

    // 2. Iniciar sesión en el CRM
    const loginBody = new URLSearchParams({
      csrfmiddlewaretoken: csrfForm,
      username,
      password,
    });

    const loginRes = await fetch(`${baseUrl}/app/login/`, {
      method: 'POST',
      redirect: 'manual',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': `csrftoken=${csrfCookie}`,
        'Referer': `${baseUrl}/app/login/`,
        'User-Agent': 'IAMET-Landing-Lead-Collector/1.0',
      },
      body: loginBody,
    });

    const loginCookies = loginRes.headers.get('set-cookie') || '';
    const sessionMatch = loginCookies.match(/sessionid=([^;]+)/);
    const sessionId = sessionMatch ? sessionMatch[1] : null;
    const authCsrfMatch = loginCookies.match(/csrftoken=([^;]+)/);
    const authCsrf = authCsrfMatch ? authCsrfMatch[1] : csrfCookie;

    if (!sessionId) {
      throw new Error('El CRM no devolvió una sesión válida. Verifica usuario y contraseña.');
    }

    const sessionCookieHeader = `csrftoken=${authCsrf}; sessionid=${sessionId}`;

    // 3. Formatear la información del prospecto para el CRM
    const notasDetalladas = [
      `🎯 LEAD GENERADO DESDE GOOGLE ADS (Landing Panduit)`,
      `• Solución de interés: ${tipoProyecto || 'Cableado de Cobre UTP 6 y 6A'}`,
      `• Nodos / Puntos de red estimados: ${nodosEstimados || '50 - 150 nodos'}`,
      `• Ubicación / Ciudad: ${ciudad || 'No especificada'}`,
      `• Teléfono / WhatsApp: ${telefono}`,
      `• Correo Corporativo: ${correo}`,
      `• Solicita Levantamiento Presencial: ${solicitaVisita ? 'SÍ (Agendar visita técnica gratuita)' : 'NO (Solo cotización)'}`,
      mensaje ? `• Comentarios adicionales: ${mensaje}` : '',
    ].filter(Boolean).join('\n');

    const prospectoPayload = {
      nombre: `Google Ads: ${empresa || 'Prospecto'} - ${tipoProyecto || 'Panduit'}`,
      cliente: empresa || 'Empresa por Calificar',
      cliente_email: correo,
      contacto: nombre,
      contacto_email: correo,
      telefono: telefono,
      producto: 'PANDUIT',
      area: 'SISTEMAS',
      tipo_pipeline: 'proyecto',
      etapa: 'identificado',
      usuario_id: assignedUserId,
      comentarios: notasDetalladas,
      probabilidad: 10,
    };

    // 4. Crear el prospecto en el endpoint del CRM
    const createRes = await fetch(`${baseUrl}/app/api/crear-prospecto/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRFToken': authCsrf,
        'X-Requested-With': 'XMLHttpRequest',
        'Cookie': sessionCookieHeader,
        'Referer': `${baseUrl}/app/home/`,
      },
      body: JSON.stringify(prospectoPayload),
    });

    let crmData = null;
    try {
      crmData = await createRes.json();
    } catch (e) {
      crmData = { status: createRes.status, statusText: createRes.statusText };
    }

    return res.status(200).json({
      success: true,
      message: 'Prospecto registrado exitosamente en el CRM IAMET.',
      lead: {
        nombre,
        empresa,
        correo,
        tipoProyecto,
      },
      crmResponse: crmData,
    });

  } catch (error) {
    console.error('Error al registrar prospecto en el CRM:', error);
    return res.status(500).json({
      success: false,
      message: 'Ocurrió un error al procesar el prospecto en el CRM.',
      error: error.message,
    });
  }
}
