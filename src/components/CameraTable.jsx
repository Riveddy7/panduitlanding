import React, { useState } from 'react';
import { Copy, Check, ArrowUpDown, Shield, AlertCircle, Info } from 'lucide-react';

export default function CameraTable({ records, onlyPrimary }) {
  const [copiedId, setCopiedId] = useState(null);
  const [sortField, setSortField] = useState('ipAddress');
  const [sortDirection, setSortDirection] = useState('asc');

  // Sort logic
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedRecords = [...records].sort((a, b) => {
    let aVal = a[sortField] || '';
    let bVal = b[sortField] || '';

    // Numeric sorting for IP or numeric prefixes
    if (sortField === 'ipAddress') {
      const aParts = aVal.split('.').map(Number);
      const bParts = bVal.split('.').map(Number);
      for (let i = 0; i < 4; i++) {
        if ((aParts[i] || 0) !== (bParts[i] || 0)) {
          return sortDirection === 'asc' 
            ? (aParts[i] || 0) - (bParts[i] || 0) 
            : (bParts[i] || 0) - (aParts[i] || 0);
        }
      }
      return 0;
    }

    return sortDirection === 'asc' 
      ? aVal.toString().localeCompare(bVal.toString()) 
      : bVal.toString().localeCompare(aVal.toString());
  });

  const handleCopyIP = (ip, id) => {
    navigator.clipboard.writeText(ip);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden shadow-sm border border-slate-200">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100/80 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider">
              <th className="py-3.5 px-4 w-12 text-center">#</th>
              
              <th 
                onClick={() => handleSort('cameraName')}
                className="py-3.5 px-4 cursor-pointer hover:bg-slate-200/60 transition-colors select-none"
              >
                <div className="flex items-center space-x-1.5">
                  <span>Nombre de la Cámara</span>
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </th>

              <th 
                onClick={() => handleSort('ipAddress')}
                className="py-3.5 px-4 cursor-pointer hover:bg-slate-200/60 transition-colors select-none"
              >
                <div className="flex items-center space-x-1.5">
                  <span>Dirección IP</span>
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </th>

              <th className="py-3.5 px-4">Estado IP / Dispositivo</th>

              <th 
                onClick={() => handleSort('deviceName')}
                className="py-3.5 px-4 cursor-pointer hover:bg-slate-200/60 transition-colors select-none"
              >
                <div className="flex items-center space-x-1.5">
                  <span>Grabador (NVR)</span>
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </th>

              <th className="py-3.5 px-4">Modelo / Fabricante</th>
              
              <th className="py-3.5 px-4 text-center">Acción</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {sortedRecords.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-12 text-center text-slate-500 font-medium">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Info className="w-8 h-8 text-slate-300" />
                    <p className="text-sm">No se encontraron cámaras que coincidan con los criterios de búsqueda.</p>
                  </div>
                </td>
              </tr>
            ) : (
              sortedRecords.map((item, index) => (
                <tr key={item.id} className="table-row-hover transition-colors">
                  
                  {/* Index */}
                  <td className="py-3.5 px-4 text-center font-bold text-slate-400">
                    {index + 1}
                  </td>

                  {/* Camera Name */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">
                      {item.cameraName}
                    </div>
                    {item.locationName && (
                      <div className="text-[11px] text-slate-400 font-medium">
                        {item.locationName}
                      </div>
                    )}
                  </td>

                  {/* IP Address */}
                  <td className="py-3.5 px-4">
                    <div className="inline-flex items-center space-x-2 font-mono font-bold text-blue-700 bg-blue-50/70 border border-blue-200/80 px-2.5 py-1 rounded-lg">
                      <span>{item.ipAddress}</span>
                    </div>
                  </td>

                  {/* IP Status */}
                  <td className="py-3.5 px-4">
                    {item.isPrimaryForIP ? (
                      item.channelCount > 1 ? (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <Shield className="w-3 h-3 text-emerald-600" />
                          <span>IP Única ({item.channelCount} canales)</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                          <span>IP Única</span>
                        </span>
                      )
                    ) : (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                        <AlertCircle className="w-3 h-3 text-amber-600" />
                        <span>Canal Secundario</span>
                      </span>
                    )}
                  </td>

                  {/* NVR */}
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {item.deviceName || 'N/A'}
                    </span>
                  </td>

                  {/* Model / Manufacturer */}
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-slate-800">
                      {item.modelName || item.manufacturer || 'OpenEye'}
                    </div>
                    {item.macAddress && (
                      <div className="text-[11px] font-mono text-slate-400">
                        MAC: {item.macAddress}
                      </div>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => handleCopyIP(item.ipAddress, item.id)}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 text-[11px] font-bold rounded-lg text-slate-600 hover:text-blue-700 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 transition-all"
                      title="Copiar dirección IP"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-600">Copiada</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copiar IP</span>
                        </>
                      )}
                    </button>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
