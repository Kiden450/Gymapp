import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../firebase/config';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If Firebase is configured, listen to real Firebase Auth
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false);
      });
      return unsubscribe;
    } else {
      // Check if demo user session was saved in localStorage
      const savedDemoUser = localStorage.getItem('gym_demo_user');
      if (savedDemoUser) {
        try {
          setCurrentUser(JSON.parse(savedDemoUser));
        } catch {
          setCurrentUser(null);
        }
      }
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    if (isFirebaseConfigured && auth) {
      return await signInWithEmailAndPassword(auth, email, password);
    } else {
      // Demo login
      const demoUser = { uid: 'demo-user-123', email: email || 'usuario@ejemplo.com', isDemo: true };
      localStorage.setItem('gym_demo_user', JSON.stringify(demoUser));
      setCurrentUser(demoUser);
      return demoUser;
    }
  };

  const register = async (email, password) => {
    if (isFirebaseConfigured && auth) {
      return await createUserWithEmailAndPassword(auth, email, password);
    } else {
      // Demo register
      const demoUser = { uid: 'demo-user-123', email, isDemo: true };
      localStorage.setItem('gym_demo_user', JSON.stringify(demoUser));
      setCurrentUser(demoUser);
      return demoUser;
    }
  };

  const logout = async () => {
    if (isFirebaseConfigured && auth) {
      await signOut(auth);
    }
    localStorage.removeItem('gym_demo_user');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    isFirebaseConfigured,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

