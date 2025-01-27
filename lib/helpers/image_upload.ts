import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

interface ImageUploadResult {
  filename: string;
  filepath: string;
  publicUrl: string;
}

export async function uploadProductImage(
  file: File,
  productId: string
): Promise<ImageUploadResult> {
  // Define base paths
  const publicDir = path.join(process.cwd(), "public");
  const uploadsDir = path.join(publicDir, "uploads", "products");

  // Create directories if they don't exist
  await fs.mkdir(path.join(uploadsDir, productId), { recursive: true });

  // Generate unique filename
  const timestamp = Date.now();
  const originalName = file.name.replace(/[^a-zA-Z0-9.]/g, "-");
  const filename = `${timestamp}-${originalName}`;

  // Process and save different sizes
  const buffer = await file.arrayBuffer();

  // Save original
  const originalPath = path.join(uploadsDir, productId, `original-${filename}`);
  await sharp(buffer).jpeg({ quality: 90 }).toFile(originalPath);

  // Save thumbnail
  const thumbnailPath = path.join(uploadsDir, productId, `thumb-${filename}`);
  await sharp(buffer)
    .resize(200, 200, { fit: "inside" })
    .jpeg({ quality: 80 })
    .toFile(thumbnailPath);

  // Save medium size
  const mediumPath = path.join(uploadsDir, productId, `medium-${filename}`);
  await sharp(buffer)
    .resize(800, 800, { fit: "inside" })
    .jpeg({ quality: 85 })
    .toFile(mediumPath);

  return {
    filename,
    filepath: path.join("uploads", "products", productId, filename),
    publicUrl: `/uploads/products/${productId}/${filename}`,
  };
}
