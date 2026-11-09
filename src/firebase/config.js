import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  setPersistence, 
  browserLocalPersistence 
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== "tu_api_key_aqui" &&
  firebaseConfig.projectId &&
  firebaseConfig.projectId !== "tu-proyecto-id"
);

// Initialize Firebase only if valid or fallback gracefully
let app;
let auth;
let db;

if (isFirebaseConfigured) {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  // Ensure persistent session across browser sessions
  setPersistence(auth, browserLocalPersistence).catch((error) => {
    console.error("Error setting Firebase Auth persistence:", error);
  });
  db = getFirestore(app);
} else {
  console.warn(
    "⚠️ Firebase no está configurado aún con credenciales reales. Revisa el archivo .env. Puedes usar el modo demostración para previsualizar la interfaz."
  );
}

export { app, auth, db };

