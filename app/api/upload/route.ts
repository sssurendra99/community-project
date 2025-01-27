import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const productId = formData.get('productId');
    const variantId = formData.get('variantId');
    
    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    if (!variantId) {
      return NextResponse.json(
        { error: 'Variant ID is required' },
        { status: 400 }
      );
    }

    const files = formData.getAll('files');
    // Create nested directory structure with both IDs
    const uploadDir = path.join(
      process.cwd(), 
      'public', 
      'uploads',
      'products', 
      productId.toString(),
      variantId.toString()
    );
    
    // Create directory recursively
    await mkdir(uploadDir, { recursive: true });
    
    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        if (!(file instanceof File)) {
          throw new Error('Invalid file');
        }

        const buffer = await file.arrayBuffer();
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = path.join(uploadDir, fileName);
        
        await writeFile(filePath, Buffer.from(buffer));
        
        // Create URL-friendly path
        const relativePath = path.relative(
          path.join(process.cwd(), 'public'),
          filePath
        );
        
        return `/${relativePath.replace(/\\/g, '/')}`;
      })
    );

    return NextResponse.json({
      success: true,
      files: uploadedFiles,
      metadata: {
        productId,
        variantId,
        directory: uploadDir.replace(process.cwd(), '')
      }
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { 
        error: 'Upload failed', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
    responseLimit: '50mb',
  },
};