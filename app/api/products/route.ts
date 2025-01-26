import { isNewProduct } from "@/lib/helpers/is_new_product";
import { prisma } from "@/lib/providers/prisma";
import { NextResponse } from "next/server";
import { Product } from "@/types/product";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        brand: true,
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const mappedProducts: Product[] = products.map((product) => ({
      id: product.id,
      productName: product.productName,
      description: product.description,
      price: parseFloat(product.price.toString()),
      sku: product.sku,
      stock: product.stock,
      brandId: product.brandId,
      categoryId: product.categoryId,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      isNew: isNewProduct(product.createdAt),
      brand: product.brand
        ? {
            name: product.brand.name,
          }
        : undefined,
      images: product.images.map(({ publicUrl, altText }) => ({
        publicUrl,
        altText: altText || undefined,
      })),
    }));

    return NextResponse.json(mappedProducts);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch products!",
      },
      {
        status: 500,
      }
    );
  }
}
