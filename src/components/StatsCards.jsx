import React from 'react';
import { Camera, Server, Layers, CheckCircle2 } from 'lucide-react';

export default function StatsCards({ totalRecords, uniqueIPs, nvrStats, viewMode }) {
  const multiSensorCount = totalRecords - uniqueIPs;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      
      {/* 1. Primary Highlight: Unique IPs */}
      <div className="glass-card rounded-2xl p-5 border-l-4 border-l-blue-600 relative overflow-hidden transition-all hover:shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Cámaras / IPs Únicas
            </p>
            <div className="flex items-baseline space-x-2 mt-1">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {uniqueIPs}
              </h2>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                1 IP por Dispositivo
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Filtro deduplicado de cámaras físicas
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 2. Total Records */}
      <div className="glass-card rounded-2xl p-5 border-l-4 border-l-slate-400 relative overflow-hidden transition-all hover:shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Registros Encontrados
            </p>
            <div className="flex items-baseline space-x-2 mt-1">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {totalRecords}
              </h2>
              <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                Canales
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Incluye multisensores de 4 lentes
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
            <Camera className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 3. Multi-sensor / Duplicate Channels */}
      <div className="glass-card rounded-2xl p-5 border-l-4 border-l-amber-500 relative overflow-hidden transition-all hover:shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Canales Repetidos (Multisensor)
            </p>
            <div className="flex items-baseline space-x-2 mt-1">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {multiSensorCount}
              </h2>
              <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                Omitidos en lista 1-IP
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Canales (2/4), (3/4), (4/4) agrupados
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Layers className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 4. NVR Breakdown */}
      <div className="glass-card rounded-2xl p-5 border-l-4 border-l-indigo-500 relative overflow-hidden transition-all hover:shadow-md">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Desglose por Grabador (NVR)
          </p>
          <Server className="w-4 h-4 text-indigo-500" />
        </div>
        <div className="space-y-1.5 mt-2">
          {Object.entries(nvrStats).map(([nvrName, stats]) => (
            <div key={nvrName} className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">{nvrName}:</span>
              <span className="text-slate-600 font-medium">
                <strong className="text-blue-700 font-bold">{stats.unique}</strong> IPs únicas{' '}
                <span className="text-slate-400">({stats.total} reg)</span>
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
