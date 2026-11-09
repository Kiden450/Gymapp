import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthScreen } from './components/auth/AuthScreen';
import { MainMenu } from './components/menu/MainMenu';
import { DietView } from './components/diet/DietView';

function AppContent() {
  const { currentUser } = useAuth();
  const [currentView, setCurrentView] = useState('menu'); // 'menu' | 'diet'

  // 1. If not logged in, show Auth Screen (persistent session handled via AuthContext)
  if (!currentUser) {
    return <AuthScreen />;
  }

  // 2. Main Navigation flow
  if (currentView === 'diet') {
    return <DietView onBackToMenu={() => setCurrentView('menu')} />;
  }

  // Default view: Main Menu (with Dieta, Entrenamiento, Seguimiento)
  return <MainMenu onSelectModule={(module) => setCurrentView(module)} />;
}

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#0B0F19] text-gray-100 selection:bg-blue-600 selection:text-white">
        <AppContent />
      </div>
    </AuthProvider>
  );
}
