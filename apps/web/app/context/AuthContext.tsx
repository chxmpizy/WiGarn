'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

import Cookies from 'js-cookie';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!Cookies.get('accessToken'),
  );

  const login = (token: string) => {
    Cookies.set('accessToken', token, { expires: 7, sameSite: 'lax' });
    setIsLoggedIn(true);
  };

  const logout = () => {
    Cookies.remove('accessToken', { path: '/' });
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
