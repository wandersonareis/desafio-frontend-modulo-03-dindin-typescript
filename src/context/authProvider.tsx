import { createContext } from "react";
import { useToggle } from "../lib/customHooks";
import { useUserContext } from "./userContext";
import { UserContext } from "../type";

export interface AuthContextProps extends UserContext {
  isLoading: boolean;
  setLoading: () => void;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setLoading] = useToggle();

  const { token, user, setUserData, isLoggedIn, handleLogin, handleLogout } =
    useUserContext();

  const value: AuthContextProps = {
    token,
    user,
    setUserData,
    isLoggedIn,
    isLoading,
    setLoading,
    handleLogin,
    handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};