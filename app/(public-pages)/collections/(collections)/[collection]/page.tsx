import ProductGrid from "@/components/ui-tools/ProductGridComponent";
import React from "react";
import { fetchProducts } from "@/features/queries/product-queries";
import { fetchCategories } from "@/features/queries/category-queries";
import { Product } from "@/types/product";
import { Category } from "@/types/category";
import { notFound } from "next/navigation";

interface CollectionPageProps {
  params: { collection : string }
}

export default async function CollectionPage({ params } : CollectionPageProps) {

  const { collection } = params; // This comes from the URL

  console.log("path : " +  collection)

  const data: Product[] = await fetchProducts()

  const categories: Category[] = await fetchCategories()

  const currentCategory = categories.find(cat => 
    cat.slug === collection || 
    cat.name.toLowerCase() === collection.toLowerCase()
  );

  if (!currentCategory) {
    notFound();
  }

  const categoryProducts = data.filter(product => 
    product.categoryId === currentCategory.id
  );
 
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
  console.log("categories", categories)
  console.log("category names:", categories.map(category => category.name))
  return (
    <div>
      <ProductGrid products={categoryProducts} category={currentCategory}/>
    </div>
  );
}
