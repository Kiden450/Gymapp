import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Dumbbell, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export const AuthScreen = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register, isFirebaseConfigured } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegistering) {
        await register(email, password);
      } else {
        await login(email, password);
      }
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        setError('Credenciales incorrectas. Comprueba tu correo y contraseña.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('Este correo ya está registrado.');
      } else if (err.code === 'auth/weak-password') {
        setError('La contraseña debe tener al menos 6 caracteres.');
      } else {
        setError('Error al conectar. Por favor intenta de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAccess = async () => {
    setError('');
    setLoading(true);
    try {
      await login('demo@gymapp.local', 'demopass123');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 py-12 max-w-md mx-auto">
      {/* App Branding */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/25 mb-4">
          <Dumbbell className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          GYM<span className="text-blue-500">APP</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Planificador de Dietas y Rendimiento
        </p>
      </div>

      {/* Auth Card */}
      <div className="bg-[#161F30] border border-[#232F48] rounded-2xl p-6 shadow-xl backdrop-blur-sm">
        {/* Toggle Login / Register */}
        <div className="flex bg-[#0B0F19] rounded-xl p-1 mb-6 border border-[#232F48]">
          <button
            type="button"
            onClick={() => { setIsRegistering(false); setError(''); }}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
              !isRegistering
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            onClick={() => { setIsRegistering(true); setError(''); }}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
              isRegistering
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Registrarse
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs leading-relaxed">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full bg-[#0B0F19] border border-[#232F48] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0B0F19] border border-[#232F48] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 active:scale-[0.99] text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50"
          >
            <span>{loading ? 'Cargando...' : isRegistering ? 'Crear Cuenta' : 'Entrar'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Fast Access Option */}
        <div className="mt-6 pt-5 border-t border-[#232F48]/60 text-center">
          <button
            type="button"
            onClick={handleDemoAccess}
            className="w-full py-2.5 px-3 rounded-xl border border-dashed border-gray-600 hover:border-gray-400 text-xs text-gray-300 hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Entrar directo (Acceso de prueba móvil)</span>
          </button>
          {!isFirebaseConfigured && (
            <p className="text-[11px] text-amber-400/80 mt-2">
              ℹ️ Firebase está en modo local. Configura <code className="bg-black/30 px-1 py-0.5 rounded">.env</code> para conectar tu proyecto real.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

