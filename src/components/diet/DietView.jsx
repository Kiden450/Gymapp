import React, { useState } from 'react';
import { DietHeader } from './DietHeader';
import { MacroSummary } from './MacroSummary';
import { MealSection } from './MealSection';
import { FIXED_MEAL_TYPES, initialDiets, sumMacros } from '../../data/mockDiets';
import { Camera, Sparkles } from 'lucide-react';

export const DietView = ({ onBackToMenu }) => {
  const [diets, setDiets] = useState(() => {
    const saved = localStorage.getItem('gym_saved_diets');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return initialDiets;
  });

  const [activeDietIndex, setActiveDietIndex] = useState(0);
  const [scannerNotification, setScannerNotification] = useState(false);

  const currentDiet = diets[activeDietIndex] || diets[0];

  // Save changes to localStorage for local persistence
  const updateDiets = (newDiets) => {
    setDiets(newDiets);
    localStorage.setItem('gym_saved_diets', JSON.stringify(newDiets));
  };

  // Switch diets
  const handlePrevDiet = () => {
    setActiveDietIndex((prev) => (prev > 0 ? prev - 1 : diets.length - 1));
  };

  const handleNextDiet = () => {
    setActiveDietIndex((prev) => (prev < diets.length - 1 ? prev + 1 : 0));
  };

  // Rename current diet
  const handleRenameDiet = (newName) => {
    const updated = diets.map((diet, idx) => 
      idx === activeDietIndex ? { ...diet, name: newName } : diet
    );
    updateDiets(updated);
  };

  // Create new diet
  const handleNewDiet = () => {
    const newDietNumber = diets.length + 1;
    const newDiet = {
      id: `dieta-${Date.now()}`,
      name: `Dieta ${newDietNumber}`,
      meals: {
        desayuno: [],
        entre_desayuno: [],
        almuerzo: [],
        merienda: [],
        cena: []
      }
    };
    const updated = [...diets, newDiet];
    updateDiets(updated);
    setActiveDietIndex(updated.length - 1);
  };

  // Remove a food item from a meal
  const handleRemoveFood = (mealId, foodId) => {
    const updatedMeals = {
      ...currentDiet.meals,
      [mealId]: (currentDiet.meals[mealId] || []).filter((f) => f.id !== foodId)
    };
    const updatedDiets = diets.map((d, idx) => 
      idx === activeDietIndex ? { ...d, meals: updatedMeals } : d
    );
    updateDiets(updatedDiets);
  };

  // Calculate total macros for the whole diet
  const calculateTotalDietMacros = () => {
    const allFoods = Object.values(currentDiet?.meals || {}).flat();
    return sumMacros(allFoods);
  };

  const totalMacros = calculateTotalDietMacros();

  // Placeholder scanner action until Phase 2 is validated
  const handleTriggerScanner = () => {
    setScannerNotification(true);
    setTimeout(() => setScannerNotification(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 flex flex-col max-w-md mx-auto pb-24">
      {/* Top sticky navigation & totals */}
      <div className="sticky top-0 z-20 bg-[#0B0F19]/95 backdrop-blur-md px-4 pt-2 pb-3 border-b border-[#232F48]/60 space-y-3">
        <DietHeader
          dietName={currentDiet?.name || 'Dieta'}
          currentIndex={activeDietIndex}
          totalDiets={diets.length}
          onPrevDiet={handlePrevDiet}
          onNextDiet={handleNextDiet}
          onRenameDiet={handleRenameDiet}
          onNewDiet={handleNewDiet}
          onBackToMenu={onBackToMenu}
        />

        {/* Global Diet Macro Summary (5 values) */}
        <MacroSummary totals={totalMacros} />
      </div>

      {/* 5 Fixed Meal Sections */}
      <main className="px-4 py-4 space-y-4 flex-1">
        {FIXED_MEAL_TYPES.map((mealType) => (
          <MealSection
            key={mealType.id}
            mealId={mealType.id}
            title={mealType.name}
            foods={currentDiet?.meals?.[mealType.id] || []}
            onRemoveFood={handleRemoveFood}
            onAddFoodClick={handleTriggerScanner}
          />
        ))}
      </main>

      {/* Floating Action Button (FAB): Accessible Camera / Gemini Scanner */}
      <div className="fixed bottom-5 left-0 right-0 max-w-md mx-auto px-4 z-30 pointer-events-none">
        <div className="pointer-events-auto flex items-center justify-center">
          <button
            onClick={handleTriggerScanner}
            className="flex items-center gap-2.5 py-3.5 px-6 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-sm shadow-xl shadow-blue-500/30 active:scale-95 hover:shadow-blue-500/40 transition-all border border-white/20"
          >
            <Camera className="w-5 h-5 text-white" />
            <span>Escanear con Cámara (IA)</span>
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          </button>
        </div>
      </div>

      {/* Feedback Toast for validation phase */}
      {scannerNotification && (
        <div className="fixed bottom-20 left-4 right-4 max-w-sm mx-auto z-40 p-3 bg-blue-600 text-white rounded-xl shadow-2xl text-center text-xs font-semibold animate-bounce">
          📸 Botón de escáner preparado. La lógica de Gemini y confirmación se activará en la Fase 2 tras validar la interfaz.
        </div>
      )}
    </div>
  );
};

