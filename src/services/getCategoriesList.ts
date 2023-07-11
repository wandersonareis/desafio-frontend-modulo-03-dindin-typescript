import { getCategoriesList } from "../api";
import { Category } from "../dto/category.dto";
import { getObjectItem } from "../util/storage";

export async function categoriesList(): Promise<Category[]> { 
  const { token } = getObjectItem();
  let categoriesList: Category[] = [];

  if (token) {
    categoriesList = await getCategoriesList(token);
  }
  return categoriesList;
}
