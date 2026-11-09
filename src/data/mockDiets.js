// Estructura fija de comidas
export const FIXED_MEAL_TYPES = [
  { id: 'desayuno', name: 'Desayuno' },
  { id: 'entre_desayuno', name: 'Entre desayuno' },
  { id: 'almuerzo', name: 'Almuerzo' },
  { id: 'merienda', name: 'Merienda' },
  { id: 'cena', name: 'Cena' },
];

// Dieta inicial de demostración con datos realistas para verificar los cálculos de macros
export const initialDiets = [
  {
    id: 'dieta-1',
    name: 'Dieta 1',
    meals: {
      desayuno: [
        {
          id: 'f1',
          name: 'Copos de Avena',
          grams: 80,
          per100g: { calories: 375, protein: 13.5, carbs: 62.0, fats: 7.0, salt: 0.02 }
        },
        {
          id: 'f2',
          name: 'Huevos enteros (2 uds)',
          grams: 120,
          per100g: { calories: 155, protein: 13.0, carbs: 1.1, fats: 11.0, salt: 0.3 }
        }
      ],
      entre_desayuno: [
        {
          id: 'f3',
          name: 'Plátano maduro',
          grams: 150,
          per100g: { calories: 89, protein: 1.1, carbs: 23.0, fats: 0.3, salt: 0.01 }
        },
        {
          id: 'f4',
          name: 'Nueces peladas',
          grams: 25,
          per100g: { calories: 654, protein: 15.0, carbs: 14.0, fats: 65.0, salt: 0.01 }
        }
      ],
      almuerzo: [
        {
          id: 'f5',
          name: 'Pechuga de pollo a la plancha',
          grams: 200,
          per100g: { calories: 165, protein: 31.0, carbs: 0.0, fats: 3.6, salt: 0.15 }
        },
        {
          id: 'f6',
          name: 'Arroz blanco cocido',
          grams: 180,
          per100g: { calories: 130, protein: 2.7, carbs: 28.0, fats: 0.3, salt: 0.02 }
        },
        {
          id: 'f7',
          name: 'Aceite de oliva virgen extra',
          grams: 10,
          per100g: { calories: 884, protein: 0.0, carbs: 0.0, fats: 100.0, salt: 0.0 }
        }
      ],
      merienda: [
        {
          id: 'f8',
          name: 'Queso fresco batido 0%',
          grams: 200,
          per100g: { calories: 48, protein: 8.5, carbs: 3.5, fats: 0.1, salt: 0.1 }
        },
        {
          id: 'f9',
          name: 'Arándanos frescos',
          grams: 80,
          per100g: { calories: 57, protein: 0.7, carbs: 14.5, fats: 0.3, salt: 0.01 }
        }
      ],
      cena: [
        {
          id: 'f10',
          name: 'Filete de Salmón',
          grams: 180,
          per100g: { calories: 208, protein: 20.0, carbs: 0.0, fats: 13.0, salt: 0.12 }
        },
        {
          id: 'f11',
          name: 'Patata asada',
          grams: 200,
          per100g: { calories: 93, protein: 2.5, carbs: 21.0, fats: 0.1, salt: 0.02 }
        }
      ]
    }
  },
  {
    id: 'dieta-2',
    name: 'Día de Descanso',
    meals: {
      desayuno: [
        {
          id: 'f12',
          name: 'Tortilla de 3 claras y 1 huevo',
          grams: 150,
          per100g: { calories: 110, protein: 12.0, carbs: 1.0, fats: 5.0, salt: 0.25 }
        }
      ],
      entre_desayuno: [],
      almuerzo: [
        {
          id: 'f13',
          name: 'Ternera magra',
          grams: 200,
          per100g: { calories: 180, protein: 26.0, carbs: 0.0, fats: 8.0, salt: 0.1 }
        }
      ],
      merienda: [],
      cena: []
    }
  }
];

// Helper para calcular los macros reales a partir de los gramos y el valor por 100g
export const calculateFoodMacros = (food) => {
  const factor = (food.grams || 0) / 100;
  return {
    calories: Math.round((food.per100g?.calories || 0) * factor),
    protein: Number(((food.per100g?.protein || 0) * factor).toFixed(1)),
    carbs: Number(((food.per100g?.carbs || 0) * factor).toFixed(1)),
    fats: Number(((food.per100g?.fats || 0) * factor).toFixed(1)),
    salt: Number(((food.per100g?.salt || 0) * factor).toFixed(2)),
  };
};

// Helper para sumar macros de una lista de alimentos
export const sumMacros = (foodList = []) => {
  return foodList.reduce(
    (acc, food) => {
      const macros = calculateFoodMacros(food);
      return {
        calories: acc.calories + macros.calories,
        protein: Number((acc.protein + macros.protein).toFixed(1)),
        carbs: Number((acc.carbs + macros.carbs).toFixed(1)),
        fats: Number((acc.fats + macros.fats).toFixed(1)),
        salt: Number((acc.salt + macros.salt).toFixed(2)),
      };
    },
    { calories: 0, protein: 0, carbs: 0, fats: 0, salt: 0 }
  );
};

