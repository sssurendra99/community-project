import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await prisma.category.findMany({
      relationLoadStrategy: "join",
      include: {
        products: true,
      },
      orderBy: {
        name: "desc",
      },
    });

    data.map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      size: category.products.length,
    }));

    return NextResponse.json(data);
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
