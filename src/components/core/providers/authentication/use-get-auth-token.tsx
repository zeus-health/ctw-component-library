import { useContext } from "react";
import { AuthenticationContext, AuthenticationContextValue } from "./context";

export function useGetAuthToken(): AuthenticationContextValue["getAuthToken"] {
  const context = useContext(AuthenticationContext);
  return context.getAuthToken;
}
