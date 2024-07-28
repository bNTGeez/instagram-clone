import { firebase } from "../lib/firebase";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const firestore = getFirestore(firebase);

export async function doesUsernameExist(username) {
  // Define the collection reference
  const usersRef = collection(firestore, "users");

  // Create a query against the collection
  const q = query(usersRef, where("username", "==", username));

  // Execute the query and get the results
  const querySnapshot = await getDocs(q);

  // Check if any documents exist
  return querySnapshot.size > 0;
}
