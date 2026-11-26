
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBNXq4n1ksAfE5bPdqnxm_rpnFgAwojJzE",
  authDomain: "minesafeai.firebaseapp.com",
  projectId: "minesafeai",
  storageBucket: "minesafeai.firebasestorage.app",
  messagingSenderId: "252037388313",
  appId: "1:252037388313:web:26d1a8f34f187919c3f288",
  measurementId: "G-5LPB145QN9"
};

const app = initializeApp(firebaseConfig);

// Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app, "minesafeai-db");
export const storage = getStorage(app);
