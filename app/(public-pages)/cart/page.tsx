"use client";

import { useCart } from "@/lib/hooks/useCart";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const CartPage = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const router = useRouter();

  const totalPrice = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    localStorage.setItem("order", JSON.stringify(cart.items));
    clearCart();
    toast.success("Order placed successfully!");
    router.push("/checkout");
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Your Shopping Cart</h1>
        <Link href="/collections" className="flex items-center text-sm text-gray-500 mt-2 hover:text-black">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Continue Shopping
        </Link>
      </div>
      
      {cart.items.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
          <Button asChild>
            <Link href="/collections">Browse Products</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {cart.items.map((item) => (
                <div key={`${item.productId}-${item.variantId}`} className="flex flex-col sm:flex-row gap-4 border-b pb-6">
                  <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-md overflow-hidden">
                    <img 
                      src={item.image || '/placeholder-product.jpg'} 
                      alt={item.productName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{item.productName}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {item.size && `Size: ${item.size}`}
                          {item.color && ` • Color: ${item.color}`}
                        </p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.productId)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center border rounded-md w-fit">
                        <button
                          onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-gray-50"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 border-x text-center min-w-[40px]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-gray-50"
                          disabled={item.quantity >= item.stock}
                        >
                          +
                        </button>
                      </div>
                      <p className="font-medium">Rs {(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6 bg-gray-50">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>Rs {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between border-t pt-4">
                  <span className="font-medium">Total</span>
                  <span className="font-medium">Rs {totalPrice.toLocaleString()}</span>
                </div>
              </div>
              
              <Button 
                onClick={handleCheckout}
                className="w-full mt-6 py-6 text-lg"
              >
                Proceed to Checkout
              </Button>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                By placing your order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;