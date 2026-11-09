import React from 'react';
import { calculateFoodMacros, sumMacros } from '../../data/mockDiets';
import { Plus, Trash2, Utensils } from 'lucide-react';

export const MealSection = ({ 
  title, 
  mealId, 
  foods = [], 
  onRemoveFood,
  onAddFoodClick 
}) => {
  const mealMacros = sumMacros(foods);

  return (
    <section className="bg-[#161F30] border border-[#232F48] rounded-2xl overflow-hidden shadow-md">
      {/* Meal Header with Title & Calories */}
      <div className="p-3.5 bg-gradient-to-r from-[#161F30] to-[#1c273d] border-b border-[#232F48] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wide">
            {title}
          </h2>
          <span className="text-[11px] text-gray-400 font-medium">
            ({foods.length})
          </span>
        </div>

        {/* Meal Calories Badge */}
        <div className="px-2.5 py-1 rounded-lg bg-[#0B0F19] border border-[#232F48] text-xs font-bold text-white flex items-center gap-1">
          <span className="text-orange-400">{mealMacros.calories}</span>
          <span className="text-[10px] text-gray-400 font-normal">kcal</span>
        </div>
      </div>

      {/* Meal Macros Breakdown Bar (5 values) */}
      <div className="px-3.5 py-2 bg-[#0B0F19]/50 border-b border-[#232F48]/60 grid grid-cols-4 gap-1 text-[11px] text-center">
        <div>
          <span className="text-gray-400 text-[10px] block">P:</span>
          <span className="font-bold text-red-400">{mealMacros.protein}g</span>
        </div>
        <div>
          <span className="text-gray-400 text-[10px] block">C:</span>
          <span className="font-bold text-amber-400">{mealMacros.carbs}g</span>
        </div>
        <div>
          <span className="text-gray-400 text-[10px] block">G:</span>
          <span className="font-bold text-emerald-400">{mealMacros.fats}g</span>
        </div>
        <div>
          <span className="text-gray-400 text-[10px] block">Sal:</span>
          <span className="font-bold text-cyan-400">{mealMacros.salt}g</span>
        </div>
      </div>

      {/* Food items list */}
      <div className="p-3 space-y-2">
        {foods.length === 0 ? (
          <div className="py-4 text-center text-xs text-gray-500 border border-dashed border-[#232F48] rounded-xl">
            No hay alimentos añadidos en {title.toLowerCase()}
          </div>
        ) : (
          foods.map((food) => {
            const foodMacro = calculateFoodMacros(food);
            return (
              <div 
                key={food.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#0B0F19]/80 border border-[#232F48]/80 text-xs"
              >
                <div className="flex-1 min-w-0 pr-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-white truncate max-w-[170px]">
                      {food.name}
                    </span>
                    <span className="text-[11px] font-bold text-gray-300 ml-1">
                      {food.grams}g
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-400">
                    <span className="text-purple-300 font-semibold">{foodMacro.calories} kcal</span>
                    <span>•</span>
                    <span className="text-red-400/90 font-medium">P: {foodMacro.protein}g</span>
                    <span>•</span>
                    <span className="text-amber-400/90 font-medium">C: {foodMacro.carbs}g</span>
                    <span>•</span>
                    <span className="text-emerald-400/90 font-medium">G: {foodMacro.fats}g</span>
                    <span>•</span>
                    <span className="text-cyan-400/90 font-medium">S: {foodMacro.salt}g</span>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveFood && onRemoveFood(mealId, food.id)}
                  title="Eliminar alimento"
                  className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 active:scale-90 transition-all shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })
        )}

        {/* Add food button */}
        <button
          onClick={() => onAddFoodClick && onAddFoodClick(mealId, title)}
          className="w-full py-2 px-3 rounded-xl border border-dashed border-[#232F48] hover:border-blue-500/50 hover:bg-blue-500/5 text-gray-400 hover:text-blue-400 text-xs font-medium flex items-center justify-center gap-1.5 transition-all active:scale-[0.99]"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Añadir alimento</span>
        </button>
      </div>
    </section>
  );
};

