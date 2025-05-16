// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBvcUFAOAiQTxUTmumAtjAf8KH8seRQrHs",
  authDomain: "feastly-admin.firebaseapp.com",
  projectId: "feastly-admin",
  storageBucket: "feastly-admin.appspot.com",
  messagingSenderId: "259212097054",
  appId: "1:259212097054:web:dbfbef19215e0f04d6200f"
};


// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
