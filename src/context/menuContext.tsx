// src/context/menuContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type MenuContextType = {
  menuAberto: boolean;
  setMenuAberto: (value: boolean) => void;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <MenuContext.Provider value={{ menuAberto, setMenuAberto }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error('useMenu precisa estar dentro de MenuProvider');
  return context;
};
