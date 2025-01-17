import { prisma } from "@/lib/prisma";
import { stockStatusMapper } from "@/utils/stockstatusmapper";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await prisma.product.findMany({
        relationLoadStrategy: 'join',
        include: {
          category: {
            select: {
              name: true
            }
          }
        },
        orderBy: {
            productName: 'desc'
        }
    });

    const transformedData = data.map(product => ({
        id: product.id,
        name: product.productName,
        category: product.category?.name,
        stock: product.stock,
        price: product.price,
        status: stockStatusMapper({productCount: product.stock})

    }));

    return NextResponse.json(transformedData);
    
  } catch(error) {
    return NextResponse.json(
      {
        error: "Failed to fetch categories!"
      },
      {
        status: 500
      }
    )
  }
}