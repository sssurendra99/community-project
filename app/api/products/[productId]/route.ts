import { isNewProduct } from "@/lib/helpers/is_new_product";
import { prisma } from "@/lib/providers/prisma";
import { Product } from "@/types/product";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: (await params).productId
      },
      include: {
        brand: true,
        images: true,
        variants: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    const mappedProduct: Product = {
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
      variants: product.variants.map(variant => ({
        id: variant.id,
        productId: variant.productId,
        size: variant.size,
        color: variant.color,
        stockQuantity: variant.stockQuantity,
        priceAdjustment: variant.priceAdjustment ? parseFloat(variant.priceAdjustment.toString()) : null,
        sku: variant.sku,
      })),
    };

    return NextResponse.json(mappedProduct);
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product!" },
      { status: 500 }
    );
  }
}