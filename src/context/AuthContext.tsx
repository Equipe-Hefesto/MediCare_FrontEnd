import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextData = {
  token: string | null;
  loading: boolean;
  saveToken: (token: string) => Promise<void>;
  removeToken: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextData | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const saveToken = async (newToken: string) => {
    try {
      await AsyncStorage.setItem('@token', newToken);
      setToken(newToken);
    } catch (e) {
      console.error('Erro ao salvar token:', e);
    }
  };

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('@token');
      setToken(null);
    } catch (e) {
      console.error('Erro ao remover token:', e);
    }
  };

  const loadToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('@token');
      if (storedToken) setToken(storedToken);
    } catch (e) {
      console.error('Erro ao carregar token:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, saveToken, removeToken, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
