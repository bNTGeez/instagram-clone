import { seedDatabase } from "../seed";
import { initializeApp } from "firebase/app";
import { getFirestore, FieldValue } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const config = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
};

const firebase = initializeApp(config);
const firestore = getFirestore(firebase);
//const analytics = getAnalytics(firebase);

seedDatabase(firestore);

export { firebase, firestore, FieldValue };
