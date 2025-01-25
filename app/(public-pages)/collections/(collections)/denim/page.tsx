import ProductGrid from '@/components/ui-tools/ProductGridComponent';
import React from 'react';
import { prisma} from '../../../../../lib/prisma';
import { Product } from '@/app/types/product';

async function getProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    include: {
      brand: true,
      images: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Transform the Prisma result to match your Product interface
  return products.map(product => ({
    id: product.id,
    productName: product.productName,
    description: product.description,
    price: parseFloat(product.price.toString()), // Convert Decimal to number
    sku: product.sku,
    stock: product.stock,
    brandId: product.brandId,
    categoryId: product.categoryId,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    isNew: isNewProduct(product.createdAt), // Helper function to determine if product is new
    brand: product.brand ? {
      name: product.brand.name,
    } : undefined,
    images: product.images.map(image => ({
      publicUrl: image.publicUrl,
      altText: image.altText || undefined,
    })),
    // Add any other transformations needed for your UI
  }));
}

// Helper function to determine if a product is new (e.g., added in the last 7 days)
function isNewProduct(createdAt: Date): boolean {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  return createdAt >= sevenDaysAgo;
}

export default async function DenimCollectionPage (){

    const products = await getProducts();
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

  return (
    <div>
        <ProductGrid products={products} />
    </div>
  )
}