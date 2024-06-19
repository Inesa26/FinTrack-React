import React, { ReactNode, createContext, useContext, useState } from "react";
import {
  LoginCommand,
  LoginDto,
  login as accountLogin,
} from "../services/AccountService";

interface AuthContextType {
  isAuthenticated: boolean;
  authToken: string | null;
  login: (loginUser: LoginCommand) => Promise<LoginDto>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);

  const login = async (loginUser: LoginCommand) => {
    try {
      const authResult = await accountLogin(loginUser);
      if (authResult.token) {
        setIsAuthenticated(true);
        setAuthToken(authResult.token);
        localStorage.setItem("token", authResult.token);
        return authResult;
      } else {
        console.error("Login failed: No token received");
        throw new Error("Login failed: No token received");
      }
    } catch (error) {
      const unknownError = error as Error;
      console.error("Login failed:", unknownError.message);
      throw unknownError;
    }
  };

  const value: AuthContextType = {
    isAuthenticated,
    authToken,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
