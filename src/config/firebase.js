// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDr2fEAFH_Xf5TCZykWOqLc6OiInoynrSI",
  authDomain: "danceinmalta.firebaseapp.com",
  projectId: "danceinmalta",
  storageBucket: "danceinmalta.firebasestorage.app",
  messagingSenderId: "261698824458",
  appId: "1:261698824458:web:8ab477164a0e31509232f3",
  measurementId: "G-XLGRQ6NBQJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics = null;

// Initialize Analytics only in browser environment (evita errore che causa pagina bianca)
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
  } catch (e) {
    console.warn('Firebase Analytics non disponibile:', e.message);
  }
}

// Initialize Firebase Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
