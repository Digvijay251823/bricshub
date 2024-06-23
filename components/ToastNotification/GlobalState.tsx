// GlobalContext.tsx
import React, {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useContext,
} from "react";
import { GlobalState, Action } from "./types";
import { globalReducer, initialState } from "./reducer";

interface GlobalContextProps {
  state: GlobalState;
  dispatch: Dispatch<Action>;
}

export const GlobalContext = createContext<GlobalContextProps | undefined>(
  undefined
);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }

  return context;
};
