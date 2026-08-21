import React from 'react';
import { Camera, Download, Upload, Copy, Check, FileText } from 'lucide-react';

export default function Header({ 
  onFileUpload, 
  onExportCSV, 
  onCopyAllIPs, 
  copiedAll,
  totalUnique,
  datasetName
}) {
  const fileInputRef = React.useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Brand & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                  Visualizador de Cámaras IP
                </h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Formato Claro
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {datasetName || 'Reporte de Dispositivos'} • {totalUnique} IPs Únicas Registradas
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Upload CSV */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept=".csv" 
              className="hidden" 
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors border border-slate-200"
              title="Cargar otro archivo CSV de cámaras"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Cargar CSV</span>
            </button>

            {/* Copy all IPs */}
            <button
              onClick={onCopyAllIPs}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-colors"
              title="Copiar todas las IPs únicas deduplicadas"
            >
              {copiedAll ? (
                <>
                  <Check className="w-3.5 h-3.5 text-indigo-600" />
                  <span>¡IPs Copiadas!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Copiar IPs ({totalUnique})</span>
                </>
              )}
            </button>

            {/* Export CSV */}
            <button
              onClick={onExportCSV}
              className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-500/20 transition-all active:scale-[0.98]"
              title="Exportar reporte deduplicado (Nombre e IP)"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar Reporte (Nombre + IP)</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
