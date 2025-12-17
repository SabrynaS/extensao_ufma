import React, { createContext, useContext, useEffect, useState } from "react";
import { User, users as mockUsers } from "@/data/mockData";

type AuthContextType = {
  user: User | null;
  setUser: (u: User | null) => void;
  loading: boolean;
  isAuthenticated: boolean;
  login: (payload: { email: string; password?: string }) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    try {
      const raw = localStorage.getItem("auth_user");
      if (raw) {
        const parsed = JSON.parse(raw) as User;
        setUser(parsed);
        console.info("[AuthContext] loaded user from localStorage:", parsed);
      } else {
        console.info("[AuthContext] no user in localStorage");
        setUser(null);
      }
    } catch (err) {
      console.error("[AuthContext] error reading localStorage auth_user", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async ({ email }: { email: string; password?: string }) => {
    await new Promise((r) => setTimeout(r, 200));
    const normalized = email?.trim().toLowerCase() ?? "";
    const found = Object.values(mockUsers).find((u) => (u.email ?? "").toLowerCase() === normalized);
    if (found) {
      setUser(found as User);
      localStorage.setItem("auth_user", JSON.stringify(found));
      console.info("[AuthContext] login success:", found.email);
      return true;
    }
    console.info("[AuthContext] login failed for:", email);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
    console.info("[AuthContext] logout");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
