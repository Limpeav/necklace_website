import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("lunelle_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem("lunelle_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("lunelle_user");
    }
  }, [user]);

  const persistAuth = (payload) => {
    localStorage.setItem("lunelle_token", payload.token);
    setUser(payload.user);
  };

  const login = async (form) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", form);
      persistAuth(data);
      return data.user;
    } finally {
      setLoading(false);
    }
  };

  const register = async (form) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", form);
      persistAuth(data);
      return data.user;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("lunelle_token");
    localStorage.removeItem("lunelle_user");
    setUser(null);
  };

  const updateProfile = async (form) => {
    const { data } = await api.put("/auth/profile", form);
    setUser(data);
    return data;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
