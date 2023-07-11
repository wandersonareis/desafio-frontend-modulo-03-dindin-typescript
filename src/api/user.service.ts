import api from "./api";
import { removeItem } from "../util/storage";
import { AxiosResponse } from "axios";
import { User } from "../dto/user.dto";
import { LoginData } from "../dto/login-data.dto";

export async function getUserInfo(token: string): Promise<User> {
  const response: AxiosResponse<User> = await api.get("/auth/usuario", {
    headers: { Authorization: `Bearer ${token}` },
  }); 
  return response.data;
}

export async function sendUserUpdateInfo(token: string, name: string, email: string, password: string) {
  return await api.put(
    "/auth/usuario",
    { nome: name, email: email, senha: password },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

export async function userLogin(email: string, password: string): Promise<LoginData> {
  const response: AxiosResponse<LoginData> = await api.post("/login", { email, senha: password }); 
  return response.data;
}

export async function userSignUp(name: string, email: string, password: string): Promise<AxiosResponse> {
  const response: AxiosResponse = await api.post("/usuario", { nome: name, email, senha: password });
  return response.data;
}

export function userLogout(): void {
  removeItem();
}
