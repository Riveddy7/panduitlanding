import React from 'react';
import { Search, Filter, RotateCcw, ShieldCheck, ListFilter } from 'lucide-react';

export default function FilterBar({
  searchTerm,
  setSearchTerm,
  onlyPrimary,
  setOnlyPrimary,
  selectedNVR,
  setSelectedNVR,
  nvrOptions,
  totalFiltered,
  totalUnique,
  totalRecords
}) {
  return (
    <div className="glass-card rounded-2xl p-4 mb-6 transition-all">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        
        {/* Left: Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre de cámara, IP Address, modelo o dispositivo..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
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

        {/* Middle: View Mode Toggle */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setOnlyPrimary(true)}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              onlyPrimary
                ? 'bg-white text-blue-700 shadow-sm border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className={`w-4 h-4 ${onlyPrimary ? 'text-blue-600' : 'text-slate-400'}`} />
            <span>1 IP por Dispositivo ({totalUnique})</span>
          </button>

          <button
            onClick={() => setOnlyPrimary(false)}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              !onlyPrimary
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ListFilter className={`w-4 h-4 ${!onlyPrimary ? 'text-slate-700' : 'text-slate-400'}`} />
            <span>Ver Todos ({totalRecords})</span>
          </button>
        </div>

        {/* Right: NVR Filter & Clear */}
        <div className="flex items-center space-x-3">
          {/* NVR Select */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={selectedNVR}
              onChange={(e) => setSelectedNVR(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
            >
              <option value="ALL">Todos los NVRs</option>
              {nvrOptions.map((nvr) => (
                <option key={nvr} value={nvr}>
                  {nvr}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters if modified */}
          {(searchTerm || !onlyPrimary || selectedNVR !== 'ALL') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setOnlyPrimary(true);
                setSelectedNVR('ALL');
              }}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200"
              title="Restablecer filtros"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          {/* Showing count indicator */}
          <div className="text-xs font-medium text-slate-500 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
            Mostrando <strong className="text-slate-900">{totalFiltered}</strong> resultados
          </div>
        </div>

      </div>
    </div>
  );
}
