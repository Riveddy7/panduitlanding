import React from 'react';
import { Camera, CheckCircle2, Clock, ListFilter, Server } from 'lucide-react';

export default function MasterStatsCards({ totalMaster, totalInstalled, totalPending, nvrStats }) {
  const installedPercentage = Math.round((totalInstalled / totalMaster) * 100);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      
      {/* 1. Total Project Cameras */}
      <div className="glass-card rounded-2xl p-5 border-l-4 border-l-slate-600 relative overflow-hidden transition-all hover:shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Cámaras Proyecto
            </p>
            <div className="flex items-baseline space-x-2 mt-1">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {totalMaster}
              </h2>
              <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                Planificadas
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Inventario oficial de cámaras
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
            <Camera className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 2. Installed & Online (VPS / VMS) */}
      <div className="glass-card rounded-2xl p-5 border-l-4 border-l-emerald-500 relative overflow-hidden transition-all hover:shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Instaladas y Online (VPS)
            </p>
            <div className="flex items-baseline space-x-2 mt-1">
              <h2 className="text-3xl font-extrabold text-emerald-700 tracking-tight">
                {totalInstalled}
              </h2>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                {installedPercentage}% Completado
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Confirmadas activas en el sistema
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 3. Pending / Missing Installation */}
      <div className="glass-card rounded-2xl p-5 border-l-4 border-l-rose-500 relative overflow-hidden transition-all hover:shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Faltan por Instalar / No Online
            </p>
            <div className="flex items-baseline space-x-2 mt-1">
              <h2 className="text-3xl font-extrabold text-rose-600 tracking-tight">
                {totalPending}
              </h2>
              <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                Pendientes
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Cámaras que aún no responden en la red
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 4. Installed by NVR breakdown */}
      <div className="glass-card rounded-2xl p-5 border-l-4 border-l-blue-500 relative overflow-hidden transition-all hover:shadow-md">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Grabadores VPS Activos
          </p>
          <Server className="w-4 h-4 text-blue-500" />
        </div>
        <div className="space-y-1.5 mt-2">
          {Object.entries(nvrStats).map(([nvrName, count]) => (
            <div key={nvrName} className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">{nvrName}:</span>
              <span className="text-slate-600 font-medium">
                <strong className="text-blue-700 font-bold">{count}</strong> instaladas
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
