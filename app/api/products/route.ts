// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { Decimal } from '@prisma/client/runtime/library';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'price', 'sku'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate SKU uniqueness
    const existingSku = await prisma.product.findUnique({
      where: { sku: data.sku }
    });

    if (existingSku) {
      return NextResponse.json(
        { error: 'SKU must be unique' },
        { status: 400 }
      );
    }

    // Create product
    const product = await prisma.product.create({
      data: {
        productName: data.name,
        description: data.description,
        price: new Decimal(data.price),
        sku: data.sku,
        stock: parseInt(data.stock) || 0,
        categoryId: data.categoryId || null,
      },
    });

    return NextResponse.json(product);

  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

// app/api/categories/route.ts
