import { useContext } from "react";
import { AuthContext, AuthContextProps } from "./authProvider";

export function useAuth(): AuthContextProps {
  return useContext(AuthContext);
}