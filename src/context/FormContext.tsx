// context/FormContext.tsx
import React, { createContext, useReducer, ReactNode } from "react";

type FormState = {
  cpf: string;
  nome: string;
  sobrenome: string;
  dtNascimento: string;
  email: string;
  telefone: string;
  username: string;
  senhaString: string;
};

const initialState: FormState = {
  cpf: "",
  nome: "",
  sobrenome: "",
  dtNascimento: "",
  email: "",
  telefone: "",
  username: "",
  senhaString: "",
};

type Action = {
  campo: keyof FormState;
  valor: string;
};

function reducer(state: FormState, action: Action): FormState {
  return {
    ...state,
    [action.campo]: action.valor,
  };
}

export const FormContext = createContext<{
  state: FormState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => {},
});

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
};
