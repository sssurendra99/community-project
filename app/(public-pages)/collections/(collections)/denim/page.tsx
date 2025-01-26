import ProductGrid from "@/components/ui-tools/ProductGridComponent";
import React from "react";
import { fetchProducts } from "@/features/queries/product-queries";
import { Product } from "@/types/product";

export default async function DenimCollectionPage() {

  const data: Product[] = await fetchProducts()
  // const products = [
  //     {
  //         id: 1,
  //         name: "Boho Breeze Linen Dress",
  //         brand: "EIGHTY %",
  //         price: 7500,
  //         imageUrl: "/path-to-image.jpg",
  //         isNew: true,
  //         colors: ["#8B4513", "#D2B48C"]
  //     },
  // ]
  console.log("")

  return (
    <div>
      <ProductGrid products={data} />
    </div>
  );
}
