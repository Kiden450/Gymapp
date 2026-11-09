import React from 'react';
import { Utensils, Dumbbell, Activity, Lock, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const MainMenu = ({ onSelectModule }) => {
  const { currentUser, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col justify-between p-6 max-w-md mx-auto">
      {/* Top Bar with user info & logout */}
      <header className="flex items-center justify-between pt-2 pb-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
            Bienvenido
          </span>
          <h2 className="text-lg font-bold text-white truncate max-w-[220px]">
            {currentUser?.email ? currentUser.email.split('@')[0] : 'Atleta'}
          </h2>
        </div>
        <button
          onClick={logout}
          title="Cerrar sesión"
          className="p-2.5 rounded-xl bg-[#161F30] border border-[#232F48] text-gray-400 hover:text-red-400 active:scale-95 transition-all"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </header>

      {/* Center: 3 Big Vertical Buttons */}
      <main className="flex-1 flex flex-col justify-center gap-5 my-auto">
        {/* 1. DIETA (Active) */}
        <button
          onClick={() => onSelectModule('diet')}
          className="group relative w-full p-6 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-left shadow-lg shadow-blue-600/30 active:scale-[0.98] transition-all duration-200 border border-blue-400/30 overflow-hidden"
        >
          {/* Subtle background glow effect */}
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-xl bg-white/15 backdrop-blur-md text-white shadow-inner">
                <Utensils className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white tracking-wide uppercase">
                  Dieta
                </h3>
                <p className="text-xs text-blue-100/90 font-medium mt-0.5">
                  Planificador de comidas y macros
                </p>
              </div>
            </div>
            <div className="w-3 h-3 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20" />
          </div>
        </button>

        {/* 2. ENTRENAMIENTO (Disabled) */}
        <button
          disabled
          aria-disabled="true"
          className="relative w-full p-6 rounded-2xl bg-[#161F30]/60 border border-[#232F48] text-left opacity-50 cursor-not-allowed select-none"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-xl bg-gray-800/80 text-gray-400">
                <Dumbbell className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-300 tracking-wide uppercase">
                  Entrenamiento
                </h3>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  Rutinas, cargas y volumen
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-800 border border-gray-700 text-gray-400 text-[11px] font-semibold">
              <Lock className="w-3 h-3" />
              <span>Pronto</span>
            </div>
          </div>
        </button>

        {/* 3. SEGUIMIENTO (Disabled) */}
        <button
          disabled
          aria-disabled="true"
          className="relative w-full p-6 rounded-2xl bg-[#161F30]/60 border border-[#232F48] text-left opacity-50 cursor-not-allowed select-none"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-xl bg-gray-800/80 text-gray-400">
                <Activity className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-300 tracking-wide uppercase">
                  Seguimiento
                </h3>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  Peso, progreso corporal y fotos
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-800 border border-gray-700 text-gray-400 text-[11px] font-semibold">
              <Lock className="w-3 h-3" />
              <span>Pronto</span>
            </div>
          </div>
        </button>
      </main>

      {/* Footer / App Version info */}
      <footer className="text-center py-3 text-[11px] text-gray-500">
        GymApp PWA v1.0 • Formato vertical móvil
      </footer>
    </div>
  );
};

