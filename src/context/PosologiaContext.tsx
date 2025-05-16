import React, { createContext, useReducer, ReactNode } from "react";

type PosologiaState = {
  idRemedio:number;
  idUtilizador: number;
  quantidade: string;
  idTipoFarmaceutico: string;
  quantidadeDose: string;
  idTipoGrandeza: string;
  idTipoAgendamento: string;
  horarios: string[];
  dataInicio: string;
  dataFim: string;
  intervalo: string;
  diasSemana: string[];
  diasUso: string;
  diasPausa: string;
};

const initialState: PosologiaState = {
  idRemedio: 0,
  idUtilizador: 0,
  quantidade: "",
  idTipoFarmaceutico:"",
  quantidadeDose: "",
  idTipoGrandeza: "",
  idTipoAgendamento: "",
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

  return (
    <PosologiaContext.Provider value={{ state, dispatch }}>
      {children}
    </PosologiaContext.Provider>
  );
};
