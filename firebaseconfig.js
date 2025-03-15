import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // Firestore instance
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA8hQ66Y5k11kSPeMy71HRr17gOLtohfD4",
  authDomain: "fantom-a3853.firebaseapp.com",
  projectId: "fantom-a3853",
  storageBucket: "fantom-a3853.firebasestorage.app",
  messagingSenderId: "1019131022345",
  appId: "1:1019131022345:web:a142be7e94c4d3fa6c3cd8",
  measurementId: "G-WLTZ94YMXR"
};

const app = initializeApp(firebaseConfig);

// Firebase services
const db = getFirestore(app); // Firestore instance
const auth = getAuth(app); // Authentication instance

export { app, db , auth };
