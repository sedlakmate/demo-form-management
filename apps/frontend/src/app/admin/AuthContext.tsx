"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  token: string | null;
  // eslint-disable-next-line no-unused-vars
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Initialize token synchronously from localStorage for immediate availability
  const [token, setTokenState] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("admin-token") : null,
  );

  // Keep useEffect for hydration safety (in case of SSR mismatch)
  useEffect(() => {
    const stored = localStorage.getItem("admin-token");
    if (stored !== token) setTokenState(stored);
  }, []);

  const setToken = (token: string | null) => {
    if (token) {
      localStorage.setItem("admin-token", token);
    } else {
      localStorage.removeItem("admin-token");
    }
    setTokenState(token);
  };

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
