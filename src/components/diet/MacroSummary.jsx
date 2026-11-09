import React from 'react';
import { Flame, Beef, Wheat, Droplet, Sparkles } from 'lucide-react';

export const MacroSummary = ({ totals }) => {
  return (
    <div className="bg-[#161F30] border border-[#232F48] rounded-2xl p-4 shadow-lg backdrop-blur-sm">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#232F48]/60">
        <span className="text-xs uppercase tracking-wider font-semibold text-gray-400">
          Resumen Total de la Dieta
        </span>
        <div className="flex items-center gap-1.5 text-blue-400 text-xs font-bold">
          <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
          <span className="text-sm text-white font-extrabold">{totals.calories}</span>
          <span className="text-[11px] text-gray-400">kcal</span>
        </div>
      </div>

      {/* Grid of the 4 macros + Salt (5 values required) */}
      <div className="grid grid-cols-4 gap-2">
        {/* Proteína */}
        <div className="bg-[#0B0F19] border border-[#232F48] rounded-xl p-2.5 text-center flex flex-col justify-between">
          <div className="flex items-center justify-center gap-1 text-red-400 text-[11px] font-semibold mb-1">
            <Beef className="w-3.5 h-3.5" />
            <span>Prot</span>
          </div>
          <div className="text-base font-black text-white tracking-tight">
            {totals.protein}
            <span className="text-[10px] text-gray-400 font-normal ml-0.5">g</span>
          </div>
        </div>

        {/* Carbohidratos */}
        <div className="bg-[#0B0F19] border border-[#232F48] rounded-xl p-2.5 text-center flex flex-col justify-between">
          <div className="flex items-center justify-center gap-1 text-amber-400 text-[11px] font-semibold mb-1">
            <Wheat className="w-3.5 h-3.5" />
            <span>Carbs</span>
          </div>
          <div className="text-base font-black text-white tracking-tight">
            {totals.carbs}
            <span className="text-[10px] text-gray-400 font-normal ml-0.5">g</span>
          </div>
        </div>

        {/* Grasas */}
        <div className="bg-[#0B0F19] border border-[#232F48] rounded-xl p-2.5 text-center flex flex-col justify-between">
          <div className="flex items-center justify-center gap-1 text-emerald-400 text-[11px] font-semibold mb-1">
            <Droplet className="w-3.5 h-3.5" />
            <span>Grasas</span>
          </div>
          <div className="text-base font-black text-white tracking-tight">
            {totals.fats}
            <span className="text-[10px] text-gray-400 font-normal ml-0.5">g</span>
          </div>
        </div>

        {/* Sal */}
        <div className="bg-[#0B0F19] border border-[#232F48] rounded-xl p-2.5 text-center flex flex-col justify-between">
          <div className="flex items-center justify-center gap-1 text-cyan-400 text-[11px] font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sal</span>
          </div>
          <div className="text-base font-black text-white tracking-tight">
            {totals.salt}
            <span className="text-[10px] text-gray-400 font-normal ml-0.5">g</span>
          </div>
        </div>
      </div>
    </div>
  );
};

