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
  level?: number; // For nested category display
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
