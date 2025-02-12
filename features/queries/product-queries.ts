import { Product } from "@/types/product";
import { get } from "@/utils/api";

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await get("/products");
  return response as Product[];
};

export const fetchProduct = async ({
  productId,
}: {
  productId: string
}) => {
  const response = await get(`/products/${productId}`);
  return response as Product;
};
