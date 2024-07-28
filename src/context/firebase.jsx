import { createContext } from "react";
import { firebase, auth, firestore } from "../lib/firebase";

const FirebaseContext = createContext({ firebase, auth, firestore });
export default FirebaseContext;
