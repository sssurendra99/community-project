"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useState } from "react";
import { useProductById } from "@/features/hooks/products";
import { useCart } from "@/lib/hooks/useCart";
import { useCart } from "@/lib/hooks/useCart";
import { ProductPageCarousel } from "@/components/ui-tools/ProductPageCarousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Star, Truck, CheckCircle, Shield } from "lucide-react";

const ProductPage = () => {
  const params = useParams();
  const productId = params.productId as string;
  const { data, isLoading, error } = useProductById({ productId });
  const { addToCart, isLoading: cartLoading } = useCart();

  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  if (!productId) return <div className="container mx-auto p-8">No product ID provided</div>;
  
  if (isLoading) return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <Skeleton className="w-full aspect-square" />
        </div>
        <div className="w-full md:w-1/2 space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
  
  if (error) return <div className="container mx-auto p-8 text-red-500">Error loading product: {error.message}</div>;
  if (!data) return <div className="container mx-auto p-8">Product not found</div>;

  const product = data;
  const selectedVar = product.variants?.find((v) => v.id === selectedVariant);
  const price = selectedVar ? product.price + (selectedVar.priceAdjustment || 0) : product.price;
  const availableStock = selectedVar ? selectedVar.stockQuantity : product.stock;

  const handleAddToCart = () => {
    if (cartLoading) return;
    if (!product) return;

    if (availableStock < quantity) {
      toast.error("Not enough stock available");
      return;
    }

    const cartItem = {
      productId: product.id,
      variantId: selectedVariant || undefined,
      productName: product.productName,
      price,
      quantity,
      size: selectedVar?.size || undefined,
      color: selectedVar?.color || undefined,
      image: product.images?.[0]?.publicUrl,
      sku: selectedVar?.sku || product.sku,
      stock: availableStock,
    };

    addToCart(cartItem);
    toast.success("Added to cart!", {
      action: {
        label: "View Cart",
        onClick: () => window.location.href = "/cart",
      },
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row w-full gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="w-full md:w-1/2">
          {product.images && product.images.length > 0 ? (
            <ProductPageCarousel images={product.images} />
          ) : (
            <div className="w-full aspect-square bg-gray-100 flex items-center justify-center rounded-lg">
              <span className="text-gray-400">No images available</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2">
          <div className="flex flex-col space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{product.productName}</h1>
              <div className="flex items-center mt-2 space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">(24 reviews)</span>
              </div>
              <span className="text-sm text-gray-500 mt-1 block">SKU: {product.sku}</span>
            </div>

            <div>
              <span className="text-3xl font-semibold">Rs {price.toLocaleString()}</span>
              {selectedVar?.priceAdjustment && (
                <span className="ml-2 text-sm text-gray-500 line-through">
                  Rs {product.price.toLocaleString()}
                </span>
              )}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-gray-700" />
                <span className="text-sm">Free shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-gray-700" />
                <span className="text-sm">In stock</span>
              </div>
            </div>

            {/* Variant Selection */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Size:</label>
                  {selectedVariant && (
                    <span className="text-sm text-gray-500">
                      {availableStock} available
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant.id)}
                      className={`px-4 py-2 border rounded-md transition-all ${
                        selectedVariant === variant.id
                          ? "border-black bg-black text-white"
                          : "border-gray-300 hover:border-gray-400"
                      } ${variant.stockQuantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={variant.stockQuantity === 0}
                    >
                      {variant.size || "N/A"}
                      {variant.stockQuantity === 0 && ' (Sold out)'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Quantity:</label>
              <div className="flex items-center space-x-2 w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 py-1 border border-gray-300 rounded-md min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  disabled={quantity >= availableStock}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex flex-col space-y-4 pt-4">
              <button
                onClick={handleAddToCart}
                disabled={availableStock === 0 || cartLoading}
                className="px-6 py-3 w-full bg-black text-white hover:bg-gray-800 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors rounded-md"
              >
                {cartLoading ? (
                  <span>Adding...</span>
                ) : availableStock === 0 ? (
                  <span>Out of Stock</span>
                ) : (
                  <span>ADD TO CART</span>
                )}
              </button>
              
              <button className="px-6 py-3 w-full border border-black text-black hover:bg-gray-50 font-medium transition-colors rounded-md">
                BUY NOW
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="description" className="w-full mt-16">
        <TabsList className="grid w-full max-w-md grid-cols-2 bg-transparent p-0 h-auto">
          <TabsTrigger 
            value="description" 
            className="py-4 data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none"
          >
            Description
          </TabsTrigger>
          <TabsTrigger 
            value="shipping" 
            className="py-4 data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none"
          >
            Shipping & Returns
          </TabsTrigger>
        </TabsList>
        
        <div className="border-t border-gray-200 pt-8">
          <TabsContent value="description">
            <div className="prose max-w-none">
              {product.description?.split("\n").map(
                (line, index) =>
                  line.trim() && (
                    <p key={index} className="text-gray-700 mb-4">
                      {line.trim().toString()}
                    </p>
                  )
              )}
            </div>
          </TabsContent>

          <TabsContent value="shipping">
            <div className="space-y-8">
              <div>
                <h3 className="font-bold text-lg mb-4">Returns Policy</h3>
                <div className="space-y-4 text-gray-700">
                  <p>
                    You may return most new, unopened items within 14 days of
                    delivery for a full refund. We'll also pay the return
                    shipping costs if the return is a result of our error.
                  </p>
                  <p>
                    Items purchased with a BLACK FRIDAY SALE category are final
                    sale and cannot be returned.
                  </p>
                  <p>
                    You should expect to receive your refund within four weeks
                    of giving your package to the return shipper.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4">Shipping</h3>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We can ship to virtually any address in the world. Note that
                    there are restrictions on some products.
                  </p>
                  <p>
                    When you place an order, we will estimate shipping and
                    delivery dates for you based on the availability of your
                    items and the shipping options you choose.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ProductPage;