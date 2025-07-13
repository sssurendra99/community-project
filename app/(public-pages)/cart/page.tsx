"use client";

import { useCart } from "@/lib/hooks/useCart";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  const totalPrice = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    localStorage.setItem("order", JSON.stringify(cart.items));
    clearCart();
    router.push("/orders");
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center border-b py-4">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.productName} className="w-16 h-16 object-cover" />
                  <div>
                    <p className="font-semibold">{item.productName}</p>
                    <p className="text-sm text-gray-500">{item.size} / {item.color}</p>
                    <p className="text-sm">Qty: {item.quantity}</p>
                  </div>
                </div>
                <div>
                  <p className="font-semibold">Rs {item.price * item.quantity}</p>
                  <Button variant="link" onClick={() => removeFromCart(item.productId)}>
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-between items-center">
            <p className="text-xl font-bold">Total: Rs {totalPrice}</p>
            <Button onClick={handleCheckout}>Checkout</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;

