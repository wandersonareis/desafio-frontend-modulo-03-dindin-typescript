import { useCallback, useEffect, useState } from "react";
import { getObjectItem, setObjectItem } from "../util/storage";
import { getUserInfo, userLogin, userLogout } from "../api";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { UserContext } from "../type";
import { User } from "../dto/user.dto";

export function useUserContext(): UserContext {
  const navigate = useNavigate();

  const [token, setToken] = useState<string>("");
  const [userData, setUserData] = useState<User>(new User());
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  const handleLogout = useCallback(() => {
    userLogout();
    setLoggedIn(false);
    navigate("/");
  }, [setLoggedIn, navigate]);

  useEffect(() => {
    const { usuario: user, token } = getObjectItem();

    if (token && user) {
      tokenValidation();
      setToken(token);
      setUserData(user);
      navigate("/main");
    }

    async function tokenValidation() {
      try {
        const userInfo: User = await getUserInfo(token);
        if (!token || !userInfo) return setLoggedIn(false);
        setLoggedIn(true);
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 419) {
          handleLogout();
        }
      }
    }
  }, [token, handleLogout, navigate]);

  async function handleLogin(email: string, password: string): Promise<void> {
    const { token, usuario: user } = await userLogin(email, password);

    setToken(token);
    setObjectItem(user, token);

    setLoggedIn(true);
    navigate("/main");
  }

  return {
    token,
    user: userData,
    setUserData,
    isLoggedIn,
    handleLogin,
    handleLogout,
  };
}
