

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCkoUrSelNGq5EmAaNSynvGjP9AkV7Y6E4",
  authDomain: "techxlerate.firebaseapp.com",
  projectId: "techxlerate",
  storageBucket: "techxlerate.firebasestorage.app",
  messagingSenderId: "261514533044",
  appId: "1:261514533044:web:dad61465d0894f4c6c5fe1",
  measurementId: "G-XPWWDSX1CG"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
export const storage = getStorage(app); 