/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gym: {
          dark: '#0B0F19',
          card: '#161F30',
          cardBorder: '#232F48',
          accent: '#3B82F6',
          accentHover: '#2563EB',
          protein: '#EF4444',   // Red/Coral
          carbs: '#F59E0B',     // Amber/Orange
          fats: '#10B981',      // Emerald/Green
          calories: '#8B5CF6',  // Purple/Indigo
          salt: '#06B6D4',      // Cyan
        }
      }
    },
  },
  plugins: [],
}
