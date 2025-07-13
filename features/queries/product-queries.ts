import { Product } from "@/types/product";
import { get } from "@/utils/api";

export const fetchProducts = async (): Promise<Product[]> => {
  const baseUrl = typeof window !== 'undefined'
  ?''
  : process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/products`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json()
  // const response = await get("/products");
  // return response as Product[];
};

export const fetchProduct = async ({
  productId,
}: {
  productId: string
}) => {
  const response = await get(`/products/${productId}`);
  return response as Product;
};

export const fetchProductsByCategory = async ({
  categoryId,
}: {
  categoryId: string
}) => {
  const response = await get(`/products?categoryId=${categoryId}`);
  return response as Product[];
}

