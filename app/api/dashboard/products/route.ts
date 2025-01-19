import { prisma } from "@/lib/prisma";
import { stockStatusMapper } from "@/utils/stockstatusmapper";
import { ClothSize, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  try {
    const data = await prisma.product.findMany({
      relationLoadStrategy: "join",
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        productName: "desc",
      },
    });

    const transformedData = data.map((product) => ({
      id: product.id,
      productName: product.productName,
      category: product.category?.name,
      stock: product.stock,
      price: product.price,
      status: stockStatusMapper({ productCount: product.stock }),
    }));

    return NextResponse.json(transformedData);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch categories!",
      },
      {
        status: 500,
      }
    );
  }
}

const productSchema = z.object({
  productName: z.string().min(2),
  description: z.string().optional(),
  price: z.number().min(0),
  sku: z.string().min(1),
  stock: z.number().min(0),
  brandId: z.string().optional(),
  categoryId: z.string().optional(),
  variants: z
    .array(
      z.object({
        size: z.string(),
        color: z.string().optional(),
        stockQuantity: z.number().min(0),
        priceAdjustment: z.number().optional(),
        sku: z.string().min(1),
      })
    )
    .optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = productSchema.parse(body);
    console.log("Body: ", body);

    let productData;
    let variantIds: { [key: number]: string } = {};

    // Perform the transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create the product
      const newProduct = await tx.product.create({
        data: {
          productName: validatedData.productName,
          description: validatedData.description,
          price: validatedData.price,
          sku: validatedData.sku,
          stock: validatedData.stock,
          brandId: validatedData.brandId,
          categoryId: validatedData.categoryId,
        },
      });

      // Create variants if they exist
      if (validatedData.variants && validatedData.variants.length > 0) {
        const variantPromises = validatedData.variants.map(
          async (variant, index) => {
            const newVariant = await tx.productVariant.create({
              data: {
                productId: newProduct.id,
                size: variant.size as ClothSize,
                color: variant.color,
                stockQuantity: variant.stockQuantity,
                priceAdjustment: variant.priceAdjustment,
                sku: variant.sku,
              },
            });
            return { index, variant: newVariant };
          }
        );

        const createdVariants = await Promise.all(variantPromises);
        console.log("variants: ", createdVariants)
        createdVariants.forEach(({ index, variant }) => {
          variantIds[index] = variant.id;
        });
      }

      return { product: newProduct, variantIds };
    });

    return NextResponse.json(
      {
        message: "Product created successfully",
        productId: result.product.id,
        variantIds: result.variantIds,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.errors },
        { status: 400 }
      );
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "A product with this SKU already exists" },
          { status: 409 }
        );
      }
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
