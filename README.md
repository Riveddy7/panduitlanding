# Landing Page IAMET — Soluciones Panduit & Data Centers

Landing page B2B de **máxima conversión** optimizada para campañas de **Google Ads** de Cableado Estructurado (Cobre UTP Cat 6 y 6A, Fibra Óptica y Datacenters) con **Garantía Certification Plus™ de 25 Años directa de fábrica Panduit**.

---

## 🎯 Soluciones para Cotización

1. **Cableado de Cobre UTP 6 y 6A** (Panduit TX6A™ 10G, PoE++ hasta 100W, supresión de diafonía con tecnología Matrix).
2. **Fibra Óptica** (Troncales PanMPO™ & HD Flex™ con polaridad conmutable en campo de 10G a 400G).
3. **Datacenter** (Gabinetes Net-Access™ con pasillos térmicos, confinamiento frío/caliente y PDUs inteligentes SmartZone™).

---

## 🚀 Tecnologías Utilizadas

- **React 18** + **Vite 5** (Carga ultrarrápida de 98ms, optimizada para Core Web Vitals y Google Ads Quality Score).
- **Tailwind CSS** (Paleta oficial Panduit Teal `#00A3AD`, dark slate y componentes de diseño editorial minimalista).
- **Lucide React** (Iconografía moderna y ligera).
- **Canvas Confetti** (Micro-interacción de celebración al enviar cotización).
- **Lead Service / CRM Webhook API Ready** (Capa de captura en `src/services/leadService.js` lista para conectar a HubSpot, Salesforce, Zoho o webhook).

---

## 📦 Instalación y Uso

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Iniciar Servidor de Desarrollo
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:3000/`.

### 3. Compilar para Producción
```bash
npm run build
```
Los archivos optimizados para despliegue se generarán en la carpeta `/dist`.

---

## 🛠️ Subir a un Nuevo Repositorio de Git

Para inicializar y subir este proyecto a GitHub / GitLab / Bitbucket:

```bash
cd /Users/eduardo/Documents/antigravity/landing-panduit-iamet

# 1. Inicializar repositorio git
git init

# 2. Agregar todos los archivos limpios
git add .

# 3. Primer commit
git commit -m "feat: initial commit landing page IAMET Panduit Google Ads"

# 4. Vincular con tu repositorio remoto (reemplaza con tu URL)
git branch -M main
git remote add origin https://github.com/TU_USUARIO/landing-panduit-iamet.git

# 5. Subir cambios
git push -u origin main
```

---

## 📈 Integración de Google Ads & CRM

- **Google Ads Conversion Tracking**: En [`src/services/leadService.js`](src/services/leadService.js), se incluye el disparador automático `gtag('event', 'conversion', ...)` al enviar el formulario.
- **Conexión CRM**: Reemplazar `CRM_API_ENDPOINT` en `src/services/leadService.js` con la URL de tu webhook o endpoint de producción.

---

© 2026 IAMET Soluciones Tecnológicas — Integrador Certificado Panduit.
# panduitlanding
