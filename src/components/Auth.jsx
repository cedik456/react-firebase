import { useEffect, useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Sign in with email and password
  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
    } catch (err) {
      console.log(err);
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.log(err);
    }
  };

  // Logout
  const logout = () => {
    try {
      signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <input
        type="text"
        placeholder="Email..."
        className="mb-1 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password..."
        className="mb-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex gap-8">
        <button
          onClick={signIn}
          className="px-3 py-1 text-white bg-black border rounded "
        >
          Signin
        </button>

        <button
          onClick={logout}
          className="px-3 py-1 text-white bg-black border rounded "
        >
          Logout
        </button>
      </div>
      <button
        onClick={signInWithGoogle}
        className="mt-3 text-white bg-orange-500 border rounded"
      >
        SignIn with Google
      </button>
    </div>
  );
};

export default Auth;
