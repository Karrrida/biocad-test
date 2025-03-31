import { createContext, useState, useEffect, ReactNode } from 'react';
import Api from '../api.ts';

interface AuthContext {
  isAuthenticated: boolean | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContext | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const checkAuth = async () => {
    try {
      const response = await Api.authMe();
      if (response.status) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }

    } catch (err) {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {

    checkAuth();
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

