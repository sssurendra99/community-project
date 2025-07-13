import { useQuery } from "@tanstack/react-query";
import { fetchProduct, fetchProducts } from "../queries/product-queries";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};

export const useProductById = ({ productId }: { productId: string }) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProduct({ productId }),
    enabled: !!productId,
  });
};
