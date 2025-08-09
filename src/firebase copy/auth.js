import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebaseConfig";

const auth = getAuth(app);

export const logInWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Logged in successfully:", user.email);
    return user;
  } catch (error) {
    console.error("Login failed:", error.code, error.message);
    throw error;
  }
};
