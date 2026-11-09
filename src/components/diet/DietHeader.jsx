import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Edit2, Check, ArrowLeft, Plus } from 'lucide-react';

export const DietHeader = ({ 
  dietName, 
  onRenameDiet, 
  onPrevDiet, 
  onNextDiet, 
  onNewDiet,
  currentIndex, 
  totalDiets,
  onBackToMenu 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(dietName);
  const inputRef = useRef(null);

  useEffect(() => {
    setNameInput(dietName);
  }, [dietName]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (nameInput.trim()) {
      onRenameDiet(nameInput.trim());
    } else {
      setNameInput(dietName);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setNameInput(dietName);
      setIsEditing(false);
    }
  };

  return (
    <header className="flex flex-col gap-3 pt-2 pb-2">
      {/* Top action row: Back to menu & new diet button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToMenu}
          className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-[#161F30] border border-[#232F48] text-gray-300 hover:text-white text-xs font-semibold active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Menú</span>
        </button>

        <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">
          Dieta {currentIndex + 1} de {totalDiets}
        </span>

        <button
          onClick={onNewDiet}
          title="Crear nueva dieta"
          className="flex items-center gap-1 py-1.5 px-2.5 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:bg-blue-600 hover:text-white text-xs font-medium active:scale-95 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Nueva</span>
        </button>
      </div>

      {/* Diet Switcher with Left/Right arrows & editable name */}
      <div className="flex items-center justify-between bg-[#161F30] border border-[#232F48] rounded-2xl p-2 shadow-md">
        {/* Left Arrow */}
        <button
          onClick={onPrevDiet}
          disabled={totalDiets <= 1}
          aria-label="Dieta anterior"
          className="p-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-[#232F48] disabled:opacity-30 disabled:hover:bg-transparent active:scale-90 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Center: Diet Name (Editable) */}
        <div className="flex-1 px-2 text-center">
          {isEditing ? (
            <div className="flex items-center justify-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={handleKeyDown}
                maxLength={32}
                className="w-full max-w-[200px] text-center bg-[#0B0F19] text-white font-bold text-base px-2.5 py-1 rounded-lg border border-blue-500 focus:outline-none"
              />
              <button
                onClick={handleSave}
                className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm"
              >
                <Check className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="group inline-flex items-center justify-center gap-2 max-w-full py-1 px-2 rounded-lg hover:bg-[#0B0F19]/60 transition-colors"
              title="Toca para editar el nombre"
            >
              <h1 className="text-lg font-black text-white tracking-tight truncate">
                {dietName}
              </h1>
              <Edit2 className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-400 transition-colors shrink-0" />
            </button>
          )}
        </div>

        {/* Right Arrow */}
        <button
          onClick={onNextDiet}
          disabled={totalDiets <= 1}
          aria-label="Dieta siguiente"
          className="p-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-[#232F48] disabled:opacity-30 disabled:hover:bg-transparent active:scale-90 transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

