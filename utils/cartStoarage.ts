import { CartItem, CartState, CheckoutForm, MockOrder } from "@/types/cart";

export class CartStorage {
    private static CART_KEY = 'shopping_cart';
    private static ORDERS_KEY = 'user_orders';
  
    static getCart(): CartState {
      if (typeof window === 'undefined') return { items: [], totalItems: 0, totalPrice: 0 };
      
      const stored = sessionStorage.getItem(this.CART_KEY);
      if (!stored) return { items: [], totalItems: 0, totalPrice: 0 };
      
      try {
        const cart = JSON.parse(stored);
        return {
          items: cart.items || [],
          totalItems: cart.items?.reduce((sum: number, item: CartItem) => sum + item.quantity, 0) || 0,
          totalPrice: cart.items?.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0) || 0
        };
      } catch {
        return { items: [], totalItems: 0, totalPrice: 0 };
      }
    }
  
    static saveCart(cart: CartState): void {
      if (typeof window === 'undefined') return;
      sessionStorage.setItem(this.CART_KEY, JSON.stringify(cart));
    }
  
    static addItem(item: Omit<CartItem, 'id'>): CartState {
      const cart = this.getCart();
      
      // Check if item already exists (same product and variant)
      const existingItemIndex = cart.items.findIndex(
        cartItem => cartItem.productId === item.productId && 
                   cartItem.variantId === item.variantId
      );
  
      if (existingItemIndex > -1) {
        // Update quantity
        cart.items[existingItemIndex].quantity += item.quantity;
      } else {
        // Add new item
        const newItem: CartItem = {
          id: `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          ...item
        };
        cart.items.push(newItem);
      }
  
      // Recalculate totals
      cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
      cart.totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
      this.saveCart(cart);
      return cart;
    }
  
    static removeItem(itemId: string): CartState {
      const cart = this.getCart();
      cart.items = cart.items.filter(item => item.id !== itemId);
      
      // Recalculate totals
      cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
      cart.totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
      this.saveCart(cart);
      return cart;
    }
  
    static updateQuantity(itemId: string, quantity: number): CartState {
      const cart = this.getCart();
      const itemIndex = cart.items.findIndex(item => item.id === itemId);
      
      if (itemIndex > -1) {
        if (quantity <= 0) {
          return this.removeItem(itemId);
        }
        cart.items[itemIndex].quantity = quantity;
        
        // Recalculate totals
        cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
        cart.totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        this.saveCart(cart);
      }
      
      return cart;
    }
  
    static clearCart(): void {
      if (typeof window === 'undefined') return;
      sessionStorage.removeItem(this.CART_KEY);
    }
  
    static getOrders(): MockOrder[] {
      if (typeof window === 'undefined') return [];
      
      const stored = localStorage.getItem(this.ORDERS_KEY);
      if (!stored) return [];
      
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
  
    static saveOrder(order: MockOrder): void {
      if (typeof window === 'undefined') return;
      
      const orders = this.getOrders();
      orders.push(order);
      localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));
    }
  
    static createOrder(checkoutForm: CheckoutForm): MockOrder {
      const cart = this.getCart();
      const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const order: MockOrder = {
        id: orderId,
        userId: `user_${Date.now()}`, // Mock user ID
        status: 'PENDING',
        totalAmount: cart.totalPrice,
        shippingAddress: `${checkoutForm.shippingAddress.street}, ${checkoutForm.shippingAddress.city}, ${checkoutForm.shippingAddress.state} ${checkoutForm.shippingAddress.postalCode}, ${checkoutForm.shippingAddress.country}`,
        billingAddress: `${checkoutForm.billingAddress.street}, ${checkoutForm.billingAddress.city}, ${checkoutForm.billingAddress.state} ${checkoutForm.billingAddress.postalCode}, ${checkoutForm.billingAddress.country}`,
        paymentStatus: 'PENDING',
        paymentMethod: checkoutForm.paymentMethod,
        notes: checkoutForm.notes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        items: cart.items.map(item => ({
          id: `order_item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
          priceAtTime: item.price,
          productName: item.productName,
          size: item.size,
          color: item.color
        }))
      };
  
      this.saveOrder(order);
      this.clearCart(); // Clear cart after successful order
      
      return order;
    }
  }

  