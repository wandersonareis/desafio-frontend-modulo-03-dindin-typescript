import { AxiosResponse } from "axios";
import api from "./api";
import { Category } from "../dto/category.dto";

export async function getCategoriesList(token: string): Promise<Category[]> {
  const response: AxiosResponse = await api.get("/auth/categoria", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
}
