import { Category } from "@/types/category";
import { get } from "@/utils/api";

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await get("/categories");
  return response as Category[];
};