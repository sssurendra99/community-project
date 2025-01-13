// types/product.ts
export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  sku: string;
  stock: number;
  brandId: string | null;
  categoryId: string | null;
  createdAt: Date;
  updatedAt: Date;
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

// types/category.ts
export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  description: string | null;
  children?: Category[];
}

// Response type for nested categories
export interface CategoryWithChildren extends Category {
  children: CategoryWithChildren[];
}

// Form data interface for category creation/editing
export interface CategoryFormData {
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
}

// Type for category selection in dropdowns
export interface CategoryOption {
  id: string;
  name: string;
  level?: number;  // For nested category display
  parentId?: string | null;
}

// API response types
export interface CategoryApiResponse {
  data: Category[];
  message?: string;
  error?: string;
}

export interface SingleCategoryApiResponse {
  data: Category;
  message?: string;
  error?: string;
}