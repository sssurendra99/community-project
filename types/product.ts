export interface Product {
  id: string;
  productName: string;
  description: string | null;
  price: number;
  sku: string;
  stock: number;
  brandId: string | null;
  categoryId: string | null;
  createdAt: Date;
  updatedAt: Date;
  isNew?: boolean;
  colors?: string[];
  brand?: {
    name: string;
  };
  images?: {
    publicUrl: string;
    altText?: string;
  }[];
  variants?: ProductVariant[];
}

export interface ProductImage {
  id: string;
  productId: string;
  filename: string;
  filepath: string;
  publicUrl: string;
  altText: string | null;
  displayOrder: number;
  isPrimary: boolean;
  createdAt: Date;
}

export interface Image {
  url: string;
  id: string;
}

export interface FormData {
  categoryId: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  size: string | null;
  color: string | null;
  stockQuantity: number;
  priceAdjustment: number | null;
  sku: string;
}

// Form data interface (used in CreateProduct component)
export interface ProductFormData {
  name: string;
  description: string;
  price: string;
  sku: string;
  stock: string;
  categoryId: string;
}

