import { createContext, useContext, useReducer } from "react";

export const AuthDataContext = createContext();

export const AuthData = ({ initialState, reducer, children }) => (
  <AuthDataContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </AuthDataContext.Provider>
);

export const useAuthDataValue = () => useContext(AuthDataContext);
