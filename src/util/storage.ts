import { LoginData } from "../dto/login-data.dto";
import { User } from "../dto/user.dto";

export function setItem(value: string): void {
  localStorage.setItem("dindin-auth", value);
}

export function setObjectItem(user?: User, token?: string): void {
  const storedData: LoginData = getObjectItem();

  const updatedData: LoginData = {
    usuario: { ...storedData.usuario, ...user },
    token: token || storedData.token,
  };
  localStorage.setItem("dindin-auth", JSON.stringify(updatedData));
}

export function getItem(key: string): string | null {
  return localStorage.getItem(key);
}

export function getObjectItem(): LoginData {
  const value: string | null = localStorage.getItem("dindin-auth");
  return value ? JSON.parse(value) : "";
}

export function removeItem(): void {
  localStorage.removeItem("dindin-auth");
}

export function clear(): void {
  localStorage.clear();
}
