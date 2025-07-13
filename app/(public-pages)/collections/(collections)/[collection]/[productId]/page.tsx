"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useProductById } from "@/features/hooks/products";
import { useCart } from "@/lib/hooks/useCart";
import { ProductPageCarousel } from "@/components/ui-tools/ProductPageCarousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // Assuming you're using sonner for notifications

const ProductPage = () => {
  const params = useParams();
  const productId = params.productId as string;
  const { data, isLoading, error } = useProductById({ productId });
  const { addToCart, isLoading: cartLoading } = useCart();

  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  if (!productId) return <div>No product ID provided</div>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product: {error.message}</div>;
  if (!data) return <div>Product not found</div>;

  const product = data;

  const handleAddToCart = () => {
    if (cartLoading) return;

    if (!product) return;
    const selectedVar = product.variants?.find((v) => v.id === selectedVariant);
    const availableStock = selectedVar
      ? selectedVar.stockQuantity
      : product.stock;

    if (availableStock < quantity) {
      toast.error("Not enough stock available");
      return;
    }

    const cartItem = {
      productId: product.id,
      variantId: selectedVariant || undefined,
      productName: product.productName,
      price: selectedVar
        ? product.price + (selectedVar.priceAdjustment || 0)
        : product.price,
      quantity,
      size: selectedVar?.size || undefined,
      color: selectedVar?.color || undefined,
      image: product.images?.[0]?.publicUrl,
      sku: selectedVar?.sku || product.sku,
      stock: availableStock,
    };

    addToCart(cartItem);
    toast.success("Added to cart!");
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row w-full gap-8">
          <div className="w-full md:w-1/2">
            {product.images && product.images.length > 0 ? (
              <ProductPageCarousel images={product.images} />
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                <span>No images available</span>
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2">
            <div className="flex flex-col space-y-4">
              <h1 className="text-2xl font-bold">{product.productName}</h1>
              <span className="text-sm text-gray-500">{product.sku}</span>
              <span className="text-xl font-semibold">
                Rs {product.price.toString()}
              </span>

              {/* Variant Selection */}
              {product.variants && product.variants.length > 0 && (
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium">Size:</label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant.id)}
                        className={`px-4 py-2 border rounded hover:bg-gray-100 ${
                          selectedVariant === variant.id
                            ? "border-black bg-black text-white"
                            : "border-gray-300"
                        }`}
                      >
                        {variant.size || "N/A"}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selection */}
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium">Quantity:</label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border border-gray-300 rounded">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <span className="text-sm">
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="px-6 py-2 w-fit bg-black text-white hover:bg-gray-800 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs section remains the same */}
        <Tabs
          defaultValue="description"
          className="w-full mt-24 border-none shadow-none rounded-none"
        >
          <TabsList className="grid-cols-2 border-b border-gray-300 w-full flex gap-8 bg-transparent py-2">
            <TabsTrigger
              value="description"
              className="pb-1 px-0 data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none bg-transparent hover:bg-transparent text-xl font-semibold"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="shipping"
              className="pb-1 px-0 data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none bg-transparent hover:bg-transparent text-xl font-semibold"
            >
              Shipping & Returns
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-8">
            <div className="space-y-4">
              {product.description?.split("\n").map(
                (line, index) =>
                  line.trim() && (
                    <p key={index} className="text-sm text-gray-500">
                      {line.trim().toString()}
                    </p>
                  )
              )}
            </div>
          </TabsContent>

          <TabsContent value="shipping" className="mt-8 text-sm text-gray-500">
            <div className="space-y-8">
              <div>
                <h3 className="font-bold text-base mb-4 text-black">
                  Returns Policy
                </h3>
                <div className="space-y-4 text-base">
                  <p>
                    You may return most new, unopened items within 14 days of
                    delivery for a full refund. We'll also pay the return
                    shipping costs if the return is a result of our error (you
                    received an incorrect or defective item, etc.).
                  </p>
                  <p>
                    Items purchased with a BLACK FRIDAY SALE category are final
                    sale and cannot be returned.
                  </p>
                  <p>
                    You should expect to receive your refund within four weeks
                    of giving your package to the return shipper, however, in
                    many cases you will receive a refund more quickly. This time
                    period includes the transit time for us to receive your
                    return from the shipper (5 to 10 business days), the time it
                    takes us to process your return once we receive it (3 to 5
                    business days), and the time it takes your bank to process
                    our refund request (5 to 10 business days).
                  </p>
                  <p>
                    If you need to return an item, simply login to your account,
                    view the order using the "Complete Orders" link under the My
                    Account menu and click the Return Item(s) button. We'll
                    notify you via e-mail of your refund once we've received and
                    processed the returned item.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-base mb-4 text-black">
                  Shipping
                </h3>
                <div className="space-y-4 text-base">
                  <p>
                    We can ship to virtually any address in the world. Note that
                    there are restrictions on some products, and some products
                    cannot be shipped to international destinations.
                  </p>
                  <p>
                    When you place an order, we will estimate shipping and
                    delivery dates for you based on the availability of your
                    items and the shipping options you choose. Depending on the
                    shipping provider you choose, shipping date estimates may
                    appear on the shipping quotes page.
                  </p>
                  <p>
                    Please also note that the shipping rates for many items we
                    sell are weight-based. The weight of any such item can be
                    found on its detail page. To reflect the policies of the
                    shipping companies we use, all weights will be rounded up to
                    the next full pound.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ProductPage;
