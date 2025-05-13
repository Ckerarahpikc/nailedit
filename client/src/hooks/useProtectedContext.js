import { createContext, useContext } from "react";

export const ProtectedRouteContext = createContext();

export function useProtectedContext() {
  return useContext(ProtectedRouteContext);
}
