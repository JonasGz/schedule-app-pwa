"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth } from "../public/utils/firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          setLoading(false);
        });
      })
      .catch((error) => {
        console.error("Erro ao definir persistência", error);
      });
  }, [user, loading]);

  useEffect(() => {
    if (!loading && user) {
      setName(user.displayName);
      router.push('/dashboard')
    } else {
      setUser(null);
      setLoading(true);
    }
  }, [loading, user, router]);

  return (
    <AuthContext.Provider value={{ user, loading, name }}>
      {children}
    </AuthContext.Provider>
  );
};
