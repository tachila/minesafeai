
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  doc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";

import { auth, db } from "./firebase.js";

export async function signUp(email, password, profileData) {
  try {
    const role = profileData.role || "applicant";

    if (!["applicant", "miner"].includes(role)) {
      throw new Error("Invalid account type.");
    }

    const miningId = String(profileData.miningId || "")
      .trim()
      .toUpperCase();

    if (role === "miner" && !miningId) {
      throw new Error("Please enter your Mining ID.");
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );

    const user = userCredential.user;

    const userProfile = {
      uid: user.uid,
      email: user.email,
      firstname: profileData.firstname,
      lastname: profileData.lastname,
      dateOfBirth: profileData.dateOfBirth,
      phone: profileData.phone,
      role: role,
      accountStatus: "ACTIVE",
      createdAt: serverTimestamp()
    };

    if (role === "miner") {
      userProfile.miningId = miningId;
    }

    await setDoc(doc(db, "users", user.uid), userProfile);

    return user;

  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}
