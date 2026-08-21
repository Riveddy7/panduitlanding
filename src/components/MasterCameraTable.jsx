import React, { useState } from 'react';
import { Copy, Check, ArrowUpDown, CheckCircle2, Clock, Info, ShieldCheck } from 'lucide-react';

export default function MasterCameraTable({ records }) {
  const [copiedId, setCopiedId] = useState(null);
  const [sortField, setSortField] = useState('ip');
  const [sortDirection, setSortDirection] = useState('asc');

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

    if (sortField === 'ip') {
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

    if (sortField === 'number') {
      const aNum = parseInt(aVal, 10) || 0;
      const bNum = parseInt(bVal, 10) || 0;
      return sortDirection === 'asc' ? aNum - bNum : bNum - aNum;
    }

    return sortDirection === 'asc' 
      ? aVal.toString().localeCompare(bVal.toString()) 
      : bVal.toString().localeCompare(aVal.toString());
  });

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden shadow-sm border border-slate-200">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100/80 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider">
              <th 
                onClick={() => handleSort('number')}
                className="py-3.5 px-4 w-16 text-center cursor-pointer hover:bg-slate-200/60 select-none"
              >
                <div className="flex items-center justify-center space-x-1">
                  <span># ID</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              
              <th 
                onClick={() => handleSort('name')}
                className="py-3.5 px-4 cursor-pointer hover:bg-slate-200/60 transition-colors select-none"
              >
                <div className="flex items-center space-x-1.5">
                  <span>Nombre de Cámara (Proyecto)</span>
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </th>

              <th 
                onClick={() => handleSort('ip')}
                className="py-3.5 px-4 cursor-pointer hover:bg-slate-200/60 transition-colors select-none"
              >
                <div className="flex items-center space-x-1.5">
                  <span>Dirección IP</span>
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </th>

              <th 
                onClick={() => handleSort('status')}
                className="py-3.5 px-4 cursor-pointer hover:bg-slate-200/60 transition-colors select-none"
              >
                <div className="flex items-center space-x-1.5">
                  <span>Estado VPS / Red</span>
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </th>

              <th className="py-3.5 px-4">Grabador VPS / Nombre en Sistema</th>

              <th className="py-3.5 px-4">Dirección MAC</th>
              
              <th className="py-3.5 px-4 text-center">Acción</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {sortedRecords.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-12 text-center text-slate-500 font-medium">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Info className="w-8 h-8 text-slate-300" />
                    <p className="text-sm">No se encontraron cámaras que coincidan con la búsqueda.</p>
                  </div>
                </td>
              </tr>
            ) : (
              sortedRecords.map((item) => (
                <tr 
                  key={item.id} 
                  className={`table-row-hover transition-colors ${
                    !item.isInstalled ? 'bg-rose-50/30' : ''
                  }`}
                >
                  
                  {/* Number */}
                  <td className="py-3.5 px-4 text-center font-bold text-slate-500">
                    {item.number}
                  </td>

                  {/* Camera Name */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">
                      {item.name}
                    </div>
                  </td>

                  {/* IP Address */}
                  <td className="py-3.5 px-4">
                    <div className="inline-flex items-center space-x-2 font-mono font-bold text-blue-700 bg-blue-50/70 border border-blue-200/80 px-2.5 py-1 rounded-lg">
                      <span>{item.ip}</span>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-4">
                    {item.isInstalled ? (
                      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>INSTALADA / ONLINE</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
                        <Clock className="w-3.5 h-3.5 text-rose-600" />
                        <span>FALTA POR INSTALAR</span>
                      </span>
                    )}
                  </td>

                  {/* NVR & VMS Name */}
                  <td className="py-3.5 px-4">
                    {item.isInstalled ? (
                      <div>
                        <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          {item.nvrDevice}
                        </span>
                        {item.vmsName && (
                          <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                            {item.vmsName}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-slate-400 italic">No detectada en VPS</span>
                    )}
                  </td>

                  {/* MAC Address */}
                  <td className="py-3.5 px-4 font-mono text-slate-500">
                    {item.mac || 'N/A'}
                  </td>

                  {/* Copy Button */}
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => handleCopy(item.ip, item.id)}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 text-[11px] font-bold rounded-lg text-slate-600 hover:text-blue-700 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 transition-all"
                      title="Copiar IP Address"
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
