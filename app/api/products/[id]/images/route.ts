import { NextResponse } from 'next/server';
import { uploadProductImage } from '../../../.../../../lib/image_upload';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const productId = params.id;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type' },
        { status: 400 }
      );
    }

    const result = await uploadProductImage(file, productId);

    // Get current image count for display order
    const imageCount = await prisma.productImage.count({
      where: { productId }
    });

    // Save to database using Prisma
    const image = await prisma.productImage.create({
      data: {
        productId,
        filename: result.filename,
        filepath: result.filepath,
        publicUrl: result.publicUrl,
        altText: file.name,
        displayOrder: imageCount,
        isPrimary: imageCount === 0 // First image is primary
      }
    });

    return NextResponse.json(image);
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}
