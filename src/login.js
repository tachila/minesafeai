import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase.js";

/**
 * Applicants sign in with email + password and leave miningId blank.
 * Miners must provide email + password + the Mining ID stored on their
 * Firestore users/{uid} profile.
 */
export async function logIn(email, password, miningId = "") {
  let user = null;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    user = userCredential.user;

    const profileSnapshot = await getDoc(doc(db, "users", user.uid));

    if (!profileSnapshot.exists()) {
      throw new Error("Your user profile was not found. Please contact the MineSafe AI administrator.");
    }

    const profile = profileSnapshot.data();
    const role = profile.role || "applicant";
    const enteredMiningId = String(miningId || "").trim().toUpperCase();
    const registeredMiningId = String(profile.miningId || "").trim().toUpperCase();

    if (role === "miner") {
      if (!enteredMiningId) {
        throw new Error("Please enter your Mining ID to sign in as a miner.");
      }

      if (!registeredMiningId || enteredMiningId !== registeredMiningId) {
        throw new Error("The Mining ID does not match this miner account.");
      }
    } else if (enteredMiningId) {
      throw new Error("This account is not registered as a miner. Leave the Mining ID field blank to sign in as an applicant.");
    }

    return user;
  } catch (error) {
    // If email/password were valid but the profile/Mining ID check failed,
    // immediately close the Firebase session so the user is not signed in.
    if (user) {
      try {
        await signOut(auth);
      } catch (signOutError) {
        console.error("Could not close rejected login session:", signOutError);
      }
    }
    throw error;
  }
}
