import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Ternary operator to select development or production config
const firebaseConfig = import.meta.env.MODE === "production" ? {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY_PROD,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN_PROD,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID_PROD,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET_PROD,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID_PROD,
  appId: import.meta.env.VITE_FIREBASE_APP_ID_PROD
} : {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY_DEV,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN_DEV,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID_DEV,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET_DEV,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID_DEV,
  appId: import.meta.env.VITE_FIREBASE_APP_ID_DEV
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
