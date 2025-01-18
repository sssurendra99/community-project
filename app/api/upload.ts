// pages/api/upload.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { Fields, Files, File } from 'formidable';
import fs from 'fs';
import path from 'path';

// Disable the default body parser to handle form data
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const fields = await parseRequest(req);
    const productId = fields.productId as unknown as string;
    
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', productId);

    // Create upload directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const form = formidable({
      uploadDir,
      keepExtensions: true,
      filename: (name, ext, part) => {
        return `${Date.now()}-${part.originalFilename}`;
      },
    });

    const [formFields, files] = await new Promise<[Fields, Files]>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    // Handle both single file and multiple files cases
    const uploadedFiles = files.files
      ? (Array.isArray(files.files) ? files.files : [files.files])
      : [];

    // Filter out any undefined values and ensure all files have filepath
    const validFiles = uploadedFiles.filter((file): file is File => {
      return file !== undefined && 'filepath' in file;
    });

    const fileUrls = validFiles.map((file) => {
      const relativePath = path.relative(
        path.join(process.cwd(), 'public'),
        file.filepath
      );
      return `/${relativePath.replace(/\\/g, '/')}`;
    });

    return res.status(200).json({ 
      success: true, 
      files: fileUrls 
    });

  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Upload failed' });
  }
}

async function parseRequest(req: NextApiRequest): Promise<Fields> {
  const contentType = req.headers['content-type'];
  if (contentType && contentType.includes('multipart/form-data')) {
    const form = formidable();
    const [fields] = await new Promise<[Fields, Files]>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });
    return fields;
  }
  return req.query as Fields;
}