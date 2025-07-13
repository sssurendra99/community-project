export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  productName: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  image?: string;
  sku: string;
  stock: number;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export interface CheckoutForm {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  billingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  notes?: string;
}

export interface MockOrder {
  id: string;
  userId: string;
  status:
    | "PENDING"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED"
    | "RETURNED";
  totalAmount: number;
  shippingAddress: string;
  billingAddress: string;
  paymentStatus: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  paymentMethod: string;
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  items: {
    id: string;
    productId: string;
    variantId?: string;
    quantity: number;
    priceAtTime: number;
    productName: string;
    size?: string;
    color?: string;
  }[];
}
