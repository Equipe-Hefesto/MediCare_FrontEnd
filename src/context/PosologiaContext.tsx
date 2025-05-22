import React, { createContext, useReducer, ReactNode, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext"; // ajusta o caminho
import {jwtDecode} from "jwt-decode";

type PosologiaState = {
  idRemedio: number;
  idUtilizador: number;
  quantidade: string;
  idTipoFarmaceutico: string;
  quantidadeDose: string;
  idTipoGrandeza: string;
  idTipoAgendamento: number;
  horarios: string[];
  dataInicio: string;
  dataFim: string;
  intervalo: string;
  diasSemana: number[];
  diasUso: string;
  diasPausa: string;
};

const initialState: PosologiaState = {
  idRemedio: 0,
  idUtilizador: 0,
  quantidade: "",
  idTipoFarmaceutico: "",
  quantidadeDose: "",
  idTipoGrandeza: "",
  idTipoAgendamento: 0,
  horarios: [],
  dataInicio: "",
  dataFim: "",
  intervalo: "",
  diasSemana: [],
  diasUso: "",
  diasPausa: "",
};

type Action =
  | { campo: keyof PosologiaState; valor: any }
  | { campo: "horarios" | "diasSemana"; valor: string[] };

function reducer(state: PosologiaState, action: Action): PosologiaState {
  return {
    ...state,
    [action.campo]: action.valor,
  };
}

export const PosologiaContext = createContext<{
  state: PosologiaState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => {},
});

export const PosologiaProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (authContext?.token) {
      try {
        const decoded: any = jwtDecode(authContext.token);
        const userId = decoded?.id || decoded?.userId || decoded?.sub;

        if (userId) {
          dispatch({ campo: "idUtilizador", valor: userId });
        }
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    }
  }, [authContext?.token]);

  return (
    <PosologiaContext.Provider value={{ state, dispatch }}>
      {children}
    </PosologiaContext.Provider>
  );
};
