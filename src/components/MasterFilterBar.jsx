import React from 'react';
import { Search, Filter, RotateCcw, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

export default function MasterFilterBar({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  selectedNVR,
  setSelectedNVR,
  nvrOptions,
  totalFiltered,
  totalMaster,
  totalInstalled,
  totalPending
}) {
  return (
    <div className="glass-card rounded-2xl p-4 mb-6 transition-all">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        
        {/* Left: Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por Nombre de Cámara, IP Address, Número o MAC..."
            className="w-full pl-10 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 bg-slate-200 rounded-full w-4 h-4 flex items-center justify-center"
            >
              ×
            </button>
          )}
        </div>

        {/* Middle: Status Toggle (Todas, Instaladas, Faltantes) */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              statusFilter === 'ALL'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-slate-500" />
            <span>Todas ({totalMaster})</span>
          </button>

          <button
            onClick={() => setStatusFilter('INSTALLED')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              statusFilter === 'INSTALLED'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Instaladas ({totalInstalled})</span>
          </button>

          <button
            onClick={() => setStatusFilter('PENDING')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              statusFilter === 'PENDING'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-rose-700 hover:bg-rose-50'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Faltantes ({totalPending})</span>
          </button>
        </div>

        {/* Right: NVR Select & Reset */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={selectedNVR}
              onChange={(e) => setSelectedNVR(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
            >
              <option value="ALL">Todos los NVRs VPS</option>
              {nvrOptions.map((nvr) => (
                <option key={nvr} value={nvr}>
                  {nvr}
                </option>
              ))}
            </select>
          </div>

          {(searchTerm || statusFilter !== 'ALL' || selectedNVR !== 'ALL') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('ALL');
                setSelectedNVR('ALL');
              }}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200"
              title="Restablecer filtros"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          <div className="text-xs font-medium text-slate-500 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
            Mostrando <strong className="text-slate-900">{totalFiltered}</strong>
          </div>
        </div>

      </div>
    </div>
  );
}
