import { useContext } from "react";
import { AuthenticationContext, AuthenticationContextValue } from "./context";

export function useAuthentication(): AuthenticationContextValue {
  return useContext(AuthenticationContext);
}
