import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextData = {
  id: number | null;
  token: string | null;
  loading: boolean;
  perfilSelecionado: string | null;
  setPerfilSelecionado: (perfil: string) => void;
  saveToken: (token: string) => Promise<void>;
  removeToken: () => Promise<void>;
};

type DecodedToken = {
  nameid: string;
  unique_name: string;
  role: string[] | string;
  [key: string]: any;
};

export const AuthContext = createContext<AuthContextData | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [id, setId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [perfilSelecionado, setPerfilSelecionado] = useState<string | null>(null);

  const extractIdFromToken = (jwt: string) => {
    try {
      const decoded: DecodedToken = jwtDecode(jwt);
      return parseInt(decoded.nameid, 10);
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
      return null;
    }
  };

  const saveToken = async (newToken: string) => {
    try {
      await AsyncStorage.setItem('@token', newToken);
      setToken(newToken);
      const extractedId = extractIdFromToken(newToken);
      setId(extractedId);
    } catch (e) {
      console.error('Erro ao salvar token:', e);
    }
  };

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('@token');
      await AsyncStorage.removeItem('@imageSource');
      await AsyncStorage.removeItem('@perfilSelecionado');
      setToken(null);
      setId(null);
      setPerfilSelecionado(null);
    } catch (e) {
      console.error('Erro ao remover dados:', e);
    }
  };

  const loadToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('@token');
      const storedImage = await AsyncStorage.getItem('@imageSource');
      const storedPerfil = await AsyncStorage.getItem('@perfilSelecionado');

      if (storedToken) {
        setToken(storedToken);
        setId(extractIdFromToken(storedToken));
      }
      if (storedPerfil) {
        setPerfilSelecionado(storedPerfil);
      }
    } catch (e) {
      console.error('Erro ao carregar dados:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadToken();
  }, []);

 

  useEffect(() => {
    if (perfilSelecionado !== null) {
      AsyncStorage.setItem('@perfilSelecionado', perfilSelecionado);
    }
  }, [perfilSelecionado]);

  return (
    <AuthContext.Provider
      value={{
        id,
        token,
        loading,
        perfilSelecionado,
        setPerfilSelecionado,
        saveToken,
        removeToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
