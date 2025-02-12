import { Product, ProductVariant } from "./product";
import { User } from "./user";

export interface Order {
  id: string;
  userId: string;
  status: string;
  totalAmount: number;
  shippingAddress: string;
  billingAddress: string;
  paymentStatus: string;
  paymentMethod?: string;
  trackingNumber?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  items: OrderItem[];
  user: User;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId?: string;
  quantity: number;
  priceAtTime: number;
  order: Order;
  product: Product;
  variant?: ProductVariant;
}
