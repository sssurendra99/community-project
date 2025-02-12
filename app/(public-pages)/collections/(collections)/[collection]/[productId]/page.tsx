"use client";

import { useParams } from "next/navigation";
import { useProductById } from "@/features/hooks/products";
import { ProductPageCarousel } from "@/components/ui-tools/ProductPageCarousel";

const ProductPage = () => {
  const params = useParams();
  const productId = params.productId as string;
  const { data, isLoading, error } = useProductById({ productId });

  console.log("productId:", productId); // Debug log
  console.log("data:", data); // Debug log

  if (!productId) return <div>No product ID provided</div>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product: {error.message}</div>;
  if (!data) return <div>Product not found</div>;

  const product = data; 

  return (
    <div>
      <div className="flex flex-row w-full gap-8">
        <div className="w-1/2">
          {product.images && product.images.length > 0 ? (
            <ProductPageCarousel images={product.images} />
          ) : (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
              <span>No images available</span>
            </div>
          )}
        </div>
        <div className="w-full">
          <div className="flex flex-col space-y-4">
            <h1 className="text-2xl font-bold">{product.productName}</h1>
            <span className="text-sm text-gray-500">{product.sku}</span>
            <span className="text-xl font-semibold">
              Rs {product.price.toString()}
            </span>
            <div className="flex flex-col space-y-2">
              <div className="flex flex-wrap gap-2">
                {(product.variants || []).map((variant, index) => (
                  <button
                    key={variant.id}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                  >
                    {variant.size || "N/A"}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="text-sm">
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
              <button className="px-6 py-2 w-fit bg-black text-white hover:bg-gray-800 font-medium">
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
