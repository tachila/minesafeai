import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

// Inside your sign-in function
const userCredential = await signInWithEmailAndPassword(auth, email, password);
export async function signin(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}