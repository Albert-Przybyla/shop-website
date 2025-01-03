import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { TOKEN_KEY } from "@/lib/constants";

interface User {
  id: string;
  email: string;
  exp: number;
  iat: number;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (token: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const decodeToken = (token: string): User | null => {
  try {
    return jwtDecode<User>(token);
  } catch {
    return null;
  }
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = Cookies.get(TOKEN_KEY);
    if (token) {
      const decodedUser = decodeToken(token);
      setUser(decodedUser);
    }
  }, []);

  const login = (token: string) => {
    Cookies.set(TOKEN_KEY, token, { expires: 7 });
    const decodedUser = decodeToken(token);

    setUser(decodedUser);
  };

  const logout = () => {
    Cookies.remove(TOKEN_KEY);
    setUser(null);
  };

  return <UserContext.Provider value={{ user, setUser, login, logout }}>{children}</UserContext.Provider>;
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
