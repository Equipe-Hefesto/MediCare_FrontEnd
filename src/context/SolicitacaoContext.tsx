// src/context/solicitacoesContext.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface SolicitacoesContextType {
  solicitacoes: any[];
  setSolicitacoes: React.Dispatch<React.SetStateAction<any[]>>;
}

const SolicitacoesContext = createContext<SolicitacoesContextType | undefined>(undefined);

export function SolicitacoesProvider({ children }: { children: ReactNode }) {
  const [solicitacoes, setSolicitacoes] = useState<any[]>([]);

  // simula fetch inicial — substitua com seu fetch real
  useEffect(() => {
    const mockSolicitacoes = [
      { id: 1, nome: "Solicitação 1" },
      { id: 2, nome: "Solicitação 2" },
    ];
    setSolicitacoes(mockSolicitacoes);
  }, []);

  return (
    <SolicitacoesContext.Provider value={{ solicitacoes, setSolicitacoes }}>
      {children}
    </SolicitacoesContext.Provider>
  );
}

export function useSolicitacoes() {
  const context = useContext(SolicitacoesContext);
  if (!context) throw new Error("useSolicitacoes deve ser usado dentro do SolicitacoesProvider");
  return context;
}
